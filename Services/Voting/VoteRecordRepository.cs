using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreMVC.Models.Voting;
using CoreMVC.ViewModel.Voting;
using Microsoft.EntityFrameworkCore;

namespace CoreMVC.Data.Voting.Service
{
    public class VoteRecordRepository : IVoteRecordRepository
    {
        private readonly VotingDbContext db;
        public VoteRecordRepository(VotingDbContext _db)
        {
            db = _db;
        }

        public async Task AddVoteRecordAsync(VoteRecord record)
        {
            var voted = db.VoteRecords.SingleOrDefault(r => r.VoterName.Equals(record.VoterName)&& r.EventId.Equals(record.EventId));
            if (voted==null)
            {
                record.RecordId = Guid.NewGuid();

                db.VoteRecords.Add(record);
            }
            else
            {
                voted.SelectedOptionId = record.SelectedOptionId;
            }
            
            await db.SaveChangesAsync();
        }


        public async Task<IEnumerable<VoteRecord>> GetVoteRecordListAsync()
        {
            return await db.VoteRecords.AsNoTracking().ToListAsync();
        }

        public Task<VoteResultViewModel> GetVoteResultByEventId(Guid eventId)
        {
            throw new NotImplementedException();
        }
    }
}
