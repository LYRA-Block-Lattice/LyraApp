using Dealer.Server.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Lyra.Data.API.Identity;
using MongoDB.Bson.Serialization;

namespace Dealer.Server.Services
{
    public class DealerDb
    {
        private readonly IOptions<DealerDbSettings> _dbSettings;

        private readonly IMongoCollection<PaymentPlatform> _paymentsCollection;
        private readonly IMongoCollection<LyraUser> _usersCollection;
        private readonly IMongoCollection<TxRecord> _txRecordsCollection;
        private readonly IMongoCollection<TxRoom> _txRoomsCollection;
        private readonly IMongoCollection<ImageData> _txImageDataCollection;

        private string _networkId;
        public string NetworkId { get => _networkId; set => _networkId = value; }

        public DealerDb(IOptions<DealerDbSettings> dbSettings)
        {
            _dbSettings = dbSettings;
            _networkId = dbSettings.Value.NetworkId;

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
                _dbSettings.Value.NetworkId + "_paymentMethods");

            _usersCollection = mongoDatabase.GetCollection<LyraUser>(
                _dbSettings.Value.NetworkId + "_lyraUsers");

            _txRecordsCollection = mongoDatabase.GetCollection<TxRecord>(
                _dbSettings.Value.NetworkId + "_txRecords");

            _txRoomsCollection = mongoDatabase.GetCollection<TxRoom>(
                _dbSettings.Value.NetworkId + "_txRooms");

            _txImageDataCollection = mongoDatabase.GetCollection<ImageData>(
                _dbSettings.Value.NetworkId + "_imageData");
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

        public async Task UpdateUserAsync(string id, LyraUser updatedUser) =>
            await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);

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

            record.Initialize(last, Consts.DEALER_KEY, Consts.DEALER_ACCOUNTID);
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
    }
}
