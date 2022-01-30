namespace Dealer.Server.Model
{
    public class DealerDbSettings
    {
        public string NetworkId { get; set; } = null!;
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;
    }
}
