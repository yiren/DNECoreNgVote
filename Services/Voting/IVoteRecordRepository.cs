using CoreMVC.Models.Voting;
using CoreMVC.ViewModel.Voting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMVC.Data.Voting.Service
{
    public interface IVoteRecordRepository
    {
        Task AddVoteRecordAsync(VoteRecord record);
        Task<VoteResultViewModel> GetVoteResultByEventId(Guid eventId);
        Task<IEnumerable<VoteRecord>> GetVoteRecordListAsync();
    }
}
