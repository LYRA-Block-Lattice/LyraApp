using Lyra.Data.API.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Dealer.Server.Services
{
    [Route("api/[controller]")]
    [ApiController]
    public class DealerController : ControllerBase
    {
        private DealerDb _db;
        public DealerController(DealerDb db)
        {
            _db = db;
        }

        [Route("GetUserByAccountId")]
        [HttpGet]
        public async Task<LyraUser?> GetUserByAccountIdAsync(string accountId)
        {
            return await _db.GetUserByAccountIdAsync(accountId);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<bool> RegisterAsync([FromBody] LyraUser user)
        {
            // validate data
            // validate hash

            user.RegistedTime = DateTime.UtcNow;
            await _db.CreateUserAsync(user);
            return true;
        }


        // GET: api/<TransactionController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<TransactionController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TransactionController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TransactionController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TransactionController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
