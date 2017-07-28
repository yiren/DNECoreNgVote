using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoreMVC.Models.Voting;
using CoreMVC.Data.Voting.Service;

namespace CoreMVC.Controllers
{
    [Produces("application/json")]
    [Route("api/VoteRecords")]
    public class VoteRecordsController : Controller
    {
        private readonly IVoteRecordRepository repo;

        public VoteRecordsController(IVoteRecordRepository _repo)
        {
            repo = _repo;
        }
        // GET: api/VoteRecords
        [HttpGet]
        public async Task<IEnumerable<VoteRecord>> Get()
        {
            return await repo.GetVoteRecordListAsync();
        }

        // GET: api/VoteRecords/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
        
        // POST: api/VoteRecords
        [HttpPost]
        public async Task Post([FromBody]VoteRecord voteRecord)
        {
            await repo.AddVoteRecordAsync(voteRecord);
        }
        
        // PUT: api/VoteRecords/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
