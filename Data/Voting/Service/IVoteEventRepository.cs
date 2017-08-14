using CoreMVC.Models.Voting;
using CoreMVC.ViewModel.Voting;
using ngVoteCore.Models.Voting;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMVC.Data.Voting.Service
{
    public interface IVoteEventRepository
    {
        Task<VoteEvent> GetVoteEventById(string id);
        Task<IList<VoteEvent>> GetVoteList();
        //Task AddVoteEvent(VoteEvent voteEvent);
        Task AddVoteEvent(VoteEventPostViewModel newEvent);
        //Task<IList<VoteResultViewModel>> GetVoteResultByEventId(string eventId);
        Task<IEnumerable> GetVoteResultByEventId(string eventId);
        Task UpdateEvent(string id, VoteEventPostViewModel updatedEvent);
        Task DeleteEvent(string id);
        Task<ItemFile> SaveUploadedItemFile(string fileName);
        Task<IList<ItemFile>> GetItemFileList();
    }
}
