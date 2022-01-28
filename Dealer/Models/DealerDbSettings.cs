namespace Dealer.Server.Model
{
    public class DealerDbSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string PaymentPlatformCollectionName { get; set; } = null!;
    }
}
