using Lyra.Core.API;
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
        public async Task<APIResult> GetUserByAccountIdAsync(string accountId)
        {
            var user = await _db.GetUserByAccountIdAsync(accountId);
            return new APIResult
            {
                ResultCode = user == null ? Lyra.Core.Blocks.APIResultCodes.NotFound : Lyra.Core.Blocks.APIResultCodes.Success,
                ResultMessage = user == null ? null : user.UserName,
            };
        }

        [HttpGet]
        [Route("Register")]
        public async Task<APIResult> RegisterAsync(string accountId,
            string userName, string firstName, string? middleName, string lastName,
            string email, string mibilePhone, string? avatarId)
        {
            // validate data
            if (userName.ToLower().Contains("dealer"))
                return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.InvalidName };
            
            // validate hash


            var user = new LyraUser
            {
                UserName = userName,
                FirstName = firstName,
                MiddleName = middleName,
                LastName = lastName,
                Email = email,
                MobilePhone = mibilePhone,
                AvatarId = avatarId,
                AccountId = accountId,
                RegistedTime = DateTime.UtcNow,
            };

            user.RegistedTime = DateTime.UtcNow;
            await _db.CreateUserAsync(user);
            return APIResult.Success;
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
