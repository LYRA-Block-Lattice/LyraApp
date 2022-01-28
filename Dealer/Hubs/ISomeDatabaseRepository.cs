namespace Dealer.Server.Hubs
{
    public interface ISomeDatabaseRepository
    {
        Task<List<string>> GetHistory();
    }
}
