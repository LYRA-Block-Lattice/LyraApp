using Dealer.Server.Hubs;
using ImageMagick;
using Lyra.Core.API;
using Lyra.Data.API;
using Lyra.Data.API.Identity;
using Lyra.Data.Crypto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Drawing;
using System.Security.Cryptography;
using UserLibrary.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Dealer.Server.Services
{
    [Route("api/[controller]")]
    [ApiController]
    public class DealerController : ControllerBase
    {
        private Keeper _keeper;
        private IConfiguration _config;
        private DealerDb _db;
        private IHubContext<DealerHub, IHubPushMethods> _hub;
        ILyraAPI _client;

        public DealerController(DealerDb db, IHubContext<DealerHub, IHubPushMethods> hub,
            IConfiguration Configuration, Keeper keeper, ILyraAPI client)
        {
            _db = db;
            _hub = hub;
            _config = Configuration;
            _keeper = keeper;
            _client = client;
        }

        [Route("GetPrices")]
        [HttpGet]
        public Task<SimpleJsonAPIResult> GetPricesAsync()
        {
            return Task.FromResult(SimpleJsonAPIResult.Create(_keeper.Prices));
        }

        [Route("GetUserByAccountId")]
        [HttpGet]
        public async Task<SimpleJsonAPIResult> GetUserByAccountIdAsync(string accountId)
        {
            var user = await _db.GetUserByAccountIdAsync(accountId);
            if (user == null)
                return new SimpleJsonAPIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.NotFound };

            return SimpleJsonAPIResult.Create(new UserStats
            {
                UserName = user.UserName,
                Total = 100,
                Ratio = 98.1m
            });
        }

        [Route("GetUserDetailsByAccountId")]
        [HttpGet]
        public async Task<SimpleJsonAPIResult> GetUserDetailsByAccountIdAsync(string accountId, string signature)
        {
            // validate signature
            var lsb = await _client.GetLastServiceBlockAsync();
            if (!Signatures.VerifyAccountSignature(lsb.GetBlock().Hash, accountId, signature))
                return new SimpleJsonAPIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Unauthorized };

            var user = await _db.GetUserByAccountIdAsync(accountId);
            if (user == null)
                return new SimpleJsonAPIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.NotFound };

            return SimpleJsonAPIResult.Create(user);
        }

        [HttpGet]
        [Route("Register")]
        public async Task<APIResult> RegisterAsync(string accountId,
            string userName, string firstName, string? middleName, string lastName,
            string email, string mibilePhone, string? avatarId, string signature)
        {
            // validate data
            if (userName.ToLower().Contains("dealer"))
                return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.InvalidName };

            // validate signature
            var lsb = await _client.GetLastServiceBlockAsync();
            if(!Signatures.VerifyAccountSignature(lsb.GetBlock().Hash, accountId, signature))
                return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Unauthorized };

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
            if (_db.GetUserByAccountIdAsync(user.AccountId) == null)
                await _db.CreateUserAsync(user);
            else
                await _db.UpdateUserAsync(user);

            return APIResult.Success;
        }

        public class ImageModel
        {
            public IFormFile file { get; set; }
            public string accountId { get; set; }
            public string signature { get; set; }
            public string tradeId { get; set; }
        }

        [HttpPost]
        [Route("UploadFile")]
        public async Task<APIResult> UploadFileAsync([FromForm] ImageModel model)
        {
            //ImageModel model = new ImageModel();
            try
            {
                using (var ms = new MemoryStream())
                {
                    model.file.CopyTo(ms);
                    var bindata = ms.ToArray();
                    using (var img = new MagickImage(bindata))
                    {
                        using (var sha = SHA256.Create())
                        {
                            byte[] hash_bytes = sha.ComputeHash(bindata);
                            string hash = Base58Encoding.Encode(hash_bytes);

                            if (Signatures.VerifyAccountSignature(hash, model.accountId, model.signature))
                            {
                                // check image hash exists
                                if (null == await _db.GetImageDataByIdAsync(hash))
                                {
                                    var bin = new ImageData
                                    {
                                        FileName = model.file.FileName,
                                        Data = bindata,
                                        Format = img.Format.ToString(),
                                        Mime = $"image/{img.Format.ToString().ToLower()}",
                                        Hash = hash,
                                        TimeStamp = DateTime.UtcNow,
                                        TradeId = model.tradeId,
                                        OwnerAccountId = model.accountId,
                                    };
                                    await _db.CreateImageDataAsync(bin);
                                }

                                return new ImageUploadResult
                                {
                                    ResultCode = Lyra.Core.Blocks.APIResultCodes.Success,
                                    Hash = hash,
                                    Url = $"{_config["baseUrl"]}/api/dealer/img?hash={hash}",
                                };
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Exception, ResultMessage = ex.ToString() };
            }

            return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.InvalidParameterFormat };
        }

        [Route("GetTradeBrief")]
        [HttpGet]
        public async Task<SimpleJsonAPIResult> GetTradeBriefAsync(string tradeId, string accountId, string signature)
        {
            // validate signature
            var lsb = await _client.GetLastServiceBlockAsync();
            if (!Signatures.VerifyAccountSignature(lsb.GetBlock().Hash, accountId, signature))
                return new SimpleJsonAPIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Unauthorized };

            var room = await _db.GetRoomByTradeAsync(tradeId);
            if (room == null)
                return new SimpleJsonAPIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.NotFound };

            // construct roles
            var brief = new TradeBrief
            {
                TradeId = room.TradeId,
                Members = room.Members.Select(a => a.AccountId).ToList(),
                DisputeHistory = room.DisputeHistory,
            };

            return SimpleJsonAPIResult.Create(brief);
        }
/*
        [HttpGet]
        [Route("img")]
        public async Task<ActionResult> ViewAsync(string hash)
        {
            var image = await _db.GetImageDataByIdAsync(hash); //Pull image from the database.
            if (image == null)
                return NotFound();
            return File(image.Data, image.Mime);
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
        }*/
    }
}
