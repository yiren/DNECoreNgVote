using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using CoreMVC.Data.Voting.Service;
using CoreMVC.Models.Voting;
using CoreMVC.ViewModel.Voting;
using System.Collections;

namespace CoreMVC.Controllers
{
    [Produces("application/json")]
    [Route("api/VoteEvents")]
    [EnableCors("AllowAll")]
    public class VoteEventsController : Controller
    {
        private readonly IVoteEventRepository repo;
        // GET: api/VoteEvents
        public VoteEventsController(IVoteEventRepository _repo)
        {
            repo = _repo;
        }
        [HttpGet]
        public async Task<IEnumerable<VoteEvent>> Get()
        {
            return await repo.GetVoteList();
        }

        //Test Attribute Routing
        [HttpGet("getmore/{eventId?}")]
        public IEnumerable<string> GetMore(string eventId)
        {
            return new string[] {
                "Get More",
                eventId
            };
        }

        [HttpGet("{eventId}/voteresult")]
        public async Task<IEnumerable> GetVoteResultByEventId(string eventId)
        {

            return await repo.GetVoteResultByEventId(eventId);
        }

        // GET: api/VoteEvents/5
        [HttpGet("{id}")]
        public async Task<VoteEvent> Get(string id)
        {
            return await repo.GetVoteEventById(id);
        }

        // POST: api/VoteEvents
        //[HttpPost]
        //public void Post([FromBody]VoteEvent voteEvent)
        //{
        //    repo.AddVoteEvent(voteEvent);
        //}
        [HttpPost]
        public void Post([FromBody]VoteEventPostViewModel newEvent)
        {
            repo.AddVoteEvent(newEvent);
        }
        // PUT: api/VoteEvents/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody]VoteEventPostViewModel updatedEvent)
        {
            repo.UpdateEvent(id, updatedEvent);
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            repo.DeleteEvent(id);
        }

    }
}
