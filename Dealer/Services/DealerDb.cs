using Dealer.Server.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Lyra.Data.API.Identity;
using MongoDB.Bson.Serialization;
using Dealer.Server.Models;
using MongoDB.Bson;
using Lyra.Data.Crypto;
using Lyra.Data.API.WorkFlow;
using Lyra.Data.API.ODR;

namespace Dealer.Server.Services
{
    public class DealerDb
    {
        private readonly IOptions<DealerDbSettings> _dbSettings;

        private readonly IMongoCollection<PaymentPlatform> _paymentsCollection;
        private readonly IMongoCollection<LyraUser> _usersCollection;
        private readonly IMongoCollection<TxRecord> _txRecordsCollection;
        private readonly IMongoCollection<TxRoom> _txRoomsCollection;
        private readonly IMongoCollection<TxComment> _txCommentsCollection;
        private readonly IMongoCollection<ImageData> _txImageDataCollection;

        private readonly IMongoCollection<TGChat> _tgChatCollection;

        private string _networkId;
        public string NetworkId { get => _networkId; set => _networkId = value; }

        private string _dealerOwnerId, _dealerKey;
        public DealerDb(IConfiguration Configuration, IOptions<DealerDbSettings> dbSettings)
        {
            _dbSettings = dbSettings;
            _networkId = Configuration["network"];
            _dealerOwnerId = Signatures.GetAccountIdFromPrivateKey(Configuration["DealerKey"]);
            _dealerKey = Configuration["DealerKey"];

            BsonClassMap.RegisterClassMap<TxRecord>(cm =>
            {
                cm.AutoMap();
                cm.SetIsRootClass(true);
            });
            BsonClassMap.RegisterClassMap<TxMessage>();
            BsonClassMap.RegisterClassMap<TxFile>();
            BsonClassMap.RegisterClassMap<TxImage>();

            var mongoClient = new MongoClient(
                _dbSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                _dbSettings.Value.DatabaseName);

            _paymentsCollection = mongoDatabase.GetCollection<PaymentPlatform>(
                _networkId + "_paymentMethods");

            _usersCollection = mongoDatabase.GetCollection<LyraUser>(
                _networkId + "_lyraUsers");

            _txRecordsCollection = mongoDatabase.GetCollection<TxRecord>(
                _networkId + "_txRecords");

            _txCommentsCollection = mongoDatabase.GetCollection<TxComment>(
                _networkId + "_txComments");

            _txRoomsCollection = mongoDatabase.GetCollection<TxRoom>(
                _networkId + "_txRooms");

            _txImageDataCollection = mongoDatabase.GetCollection<ImageData>(
                _networkId + "_imageData");

            _tgChatCollection = mongoDatabase.GetCollection<TGChat>(
                _networkId + "_tgChat");
        }

        #region payments methods
        public async Task<List<PaymentPlatform>> GetPaymentsAsync() =>
            await _paymentsCollection.Find(_ => true).ToListAsync();

        public async Task<PaymentPlatform?> GetPaymentAsync(string id) =>
            await _paymentsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreatePaymentAsync(PaymentPlatform newBook) =>
            await _paymentsCollection.InsertOneAsync(newBook);

        public async Task UpdatePaymentAsync(string id, PaymentPlatform updatedBook) =>
            await _paymentsCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

        public async Task RemovePaymentAsync(string id) =>
            await _paymentsCollection.DeleteOneAsync(x => x.Id == id);
        #endregion

        #region Lyra User management
        public async Task<List<LyraUser>> GetUsersAsync() =>
            await _usersCollection.Find(_ => true).ToListAsync();

        public async Task<LyraUser?> GetUserAsync(string id) =>
            await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<LyraUser?> GetUserByAccountIdAsync(string accountId) =>
            await _usersCollection.Find(x => x.AccountId == accountId).FirstOrDefaultAsync();

        public async Task CreateUserAsync(LyraUser newUser) =>
            await _usersCollection.InsertOneAsync(newUser);

        public async Task UpdateUserAsync(LyraUser updatedUser) =>
            await _usersCollection.ReplaceOneAsync(x => x.AccountId == updatedUser.AccountId, updatedUser);

        public async Task RemoveUserAsync(string id) =>
            await _usersCollection.DeleteOneAsync(x => x.Id == id);
        #endregion

        #region Lyra Tx Record
        public async Task<List<TxRecord>> GetTxRecordsAsync() =>
            await _txRecordsCollection.Find(_ => true).ToListAsync();

        public async Task<List<TxRecord>?> GetTxRecordsByTradeAsync(string tradeId) =>
            await _txRecordsCollection.Find(x => x.TradeID == tradeId)
                .SortBy(a => a.TimeStamp)
                .ToListAsync();

        public async Task CreateTxRecordAsync(TxRecord newUser) =>
            await _txRecordsCollection.InsertOneAsync(newUser);

        public TxRecord? GetLastRecordForTrade(string tradeId) =>
            _txRecordsCollection.AsQueryable()
                .Where(a => a.TradeID == tradeId)
                .OrderByDescending(x => x.Height)
                .FirstOrDefault();

        public async Task<TxRecord> AppendTxRecordAsync(TxRecord record)
        {
            var prevMsgs = await GetTxRecordsByTradeAsync(record.TradeID);

            var last = GetLastRecordForTrade(record.TradeID);

            record.Initialize(last, _dealerKey, _dealerOwnerId);
            await CreateTxRecordAsync(record);

            return GetLastRecordForTrade(record.TradeID);
        }


        #endregion

        #region Lyra Tx Room
        public async Task<List<TxRoom>> GetRoomsAsync() =>
            await _txRoomsCollection.Find(_ => true).ToListAsync();

        public async Task<TxRoom?> GetRoomByTradeAsync(string tradeId) =>
            await _txRoomsCollection.Find(x => x.TradeId == tradeId).FirstOrDefaultAsync();
        public async Task<TxRoom?> GetRoomByIdAsync(string id) =>
            await _txRoomsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateRoomAsync(TxRoom newUser) =>
            await _txRoomsCollection.InsertOneAsync(newUser);

        public async Task<TxRoom?> CreateRoomAsync(IOtcTrade trade)
        {
            var seller = await GetUserByAccountIdAsync(trade.Trade.dir == TradeDirection.Buy ? trade.Trade.orderOwnerId : trade.OwnerAccountId);
            var buyer = await GetUserByAccountIdAsync(trade.Trade.dir == TradeDirection.Sell ? trade.Trade.orderOwnerId : trade.OwnerAccountId);

            if (seller != null && buyer != null)
            {
                var crroom = new TxRoom
                {
                    TradeId = trade.AccountID,
                    Dir = trade.Trade.dir,
                    Members = new[] { seller, buyer },
                    TimeStamp = DateTime.UtcNow,
                    DisputeLevel = DisputeLevels.None,
                };
                await CreateRoomAsync(crroom);
                return await GetRoomByTradeAsync(trade.AccountID);
            }
            return null;
        }

        public async Task UpdateRoomAsync(string id, TxRoom updatedUser) =>
            await _txRoomsCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);

        public async Task RemoveRoomAsync(string id) =>
            await _txRoomsCollection.DeleteOneAsync(x => x.Id == id);
        #endregion

        #region Image Data
        public async Task<List<ImageData>> GetImageDataAsync() =>
            await _txImageDataCollection.Find(_ => true).ToListAsync();

        public async Task<ImageData?> GetImageDataByTradeAsync(string tradeId) =>
            await _txImageDataCollection.Find(x => x.TradeId == tradeId).FirstOrDefaultAsync();
        public async Task<ImageData?> GetImageDataByIdAsync(string hash) =>
            await _txImageDataCollection.Find(x => x.Hash == hash).FirstOrDefaultAsync();

        public async Task CreateImageDataAsync(ImageData bin) =>
            await _txImageDataCollection.InsertOneAsync(bin);

        public async Task UpdateImageDataAsync(string hash, ImageData updatedUser) =>
            await _txImageDataCollection.ReplaceOneAsync(x => x.Hash == hash, updatedUser);

        public async Task RemoveImageDataAsync(string hash) =>
            await _txImageDataCollection.DeleteOneAsync(x => x.Hash == hash);
        #endregion

        #region Comment
        public async Task CreateTxCommentAsync(TxComment newComment) =>
            await _txCommentsCollection.InsertOneAsync(newComment);

        public async Task<TxComment> GetTxCommentByIdAsync(string id) =>
            await _txCommentsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<TxComment?> FindTxCommentByAuthorAsync(string tradeId, string accountId) =>
            await _txCommentsCollection.Find(a => a.TradeId == tradeId
                    && a.ByAccountId == accountId).FirstOrDefaultAsync();

        public async Task<List<TxComment>> GetTxCommentsForTradeAsync(string tradeId) =>
            await _txCommentsCollection.Find(a => a.TradeId == tradeId)
                .ToListAsync();

        #endregion

        #region Telegram Chat IDs
        public async Task<List<TGChat>> GetTGChatAsync() =>
            await _tgChatCollection.Find(_ => true).ToListAsync();

        public async Task<TGChat?> GetTGChatByUserIDAsync(string userId) =>
            await _tgChatCollection.Find(x => x.Username == userId).FirstOrDefaultAsync();
        public async Task<TGChat?> GetTGChatByChatIdAsync(long chatId) =>
            await _tgChatCollection.Find(x => x.ChatID == chatId).FirstOrDefaultAsync();

        public async Task CreateTGChatAsync(TGChat chat) =>
            await _tgChatCollection.InsertOneAsync(chat);

        public async Task CreateOrUpdateTGChatAsync(TGChat chat) => await _tgChatCollection.ReplaceOneAsync(
                            filter: new BsonDocument("ChatID", chat.ChatID),
                            options: new ReplaceOptions { IsUpsert = true },
                            replacement: chat);

        public async Task UpdateTGChatAsync(long chatId, TGChat updatedChat) =>
            await _tgChatCollection.ReplaceOneAsync(x => x.ChatID == chatId, updatedChat);

        public async Task RemoveTGChatAsync(long chatId) =>
            await _tgChatCollection.DeleteOneAsync(x => x.ChatID == chatId);
        #endregion

        //#region ODR Negociation Rounds
        //public async Task<List<ODRNegotiationRound>> GetODRNegotiationRoundAsync() =>
        //    await _odrRoundCollection.Find(_ => true).ToListAsync();

        //public async Task<ODRNegotiationRound?> GetPendingODRNegotiationRoundByTradeIDAsync(string tradeid) =>
        //    await _odrRoundCollection.Find(x => x.TradeId == tradeid 
        //            && x.State != ODRNegotiationStatus.Executed
        //            && x.State != ODRNegotiationStatus.Failed
        //        ).FirstOrDefaultAsync();

        //public async Task<ODRNegotiationRound?> GetODRNegotiationRoundByTradeIDAsync(string tradeid) =>
        //    await _odrRoundCollection.Find(x => x.TradeId == tradeid).FirstOrDefaultAsync();
        ////public async Task<ODRNegotiationRound?> GetODRNegotiationRoundByCreatorIdAsync(string creatorId) =>
        ////    await _odrRoundCollection.Find(x => x.resoluteBy == creatorId).FirstOrDefaultAsync();

        //public async Task CreateODRNegotiationRoundAsync(ODRNegotiationRound round) =>
        //    await _odrRoundCollection.InsertOneAsync(round);

        ////public async Task CreateOrUpdateODRNegotiationRoundAsync(ODRNegotiationRound round) => await _odrRoundCollection.ReplaceOneAsync(
        ////                    filter: new BsonDocument("Id", round.Id),
        ////                    options: new ReplaceOptions { IsUpsert = true },
        ////                    replacement: round);

        //public async Task UpdateODRNegotiationRoundAsync(ODRNegotiationRound updatedRound) =>
        //    await _odrRoundCollection.ReplaceOneAsync(x => x.Id == updatedRound.Id, updatedRound);

        //public async Task RemoveODRNegotiationRoundAsync(string roundId) =>
        //    await _odrRoundCollection.DeleteOneAsync(x => x.Id == roundId);
        //#endregion
    }
}
