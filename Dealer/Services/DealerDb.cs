using Dealer.Server.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Dealer.Server.Services
{
    public class DealerDb
    {
        private readonly IOptions<DealerDbSettings> _dbSettings;

        private readonly IMongoCollection<PaymentPlatform> _paymentsCollection;

        public DealerDb(IOptions<DealerDbSettings> dbSettings)
        {
            _dbSettings = dbSettings;

            var mongoClient = new MongoClient(
                _dbSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                _dbSettings.Value.DatabaseName);

            _paymentsCollection = mongoDatabase.GetCollection<PaymentPlatform>(
                _dbSettings.Value.PaymentPlatformCollectionName);
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
    }
}
