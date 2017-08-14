using CoreMVC.Data.Voting;
using Microsoft.EntityFrameworkCore;
using ngVoteCore.Data.Voting.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngVoteCore.Data.Voting
{
    public class VoteUnitOfWork:IVoteUnitOfWork
    {
        private readonly VotingDbContext db;

        public VoteUnitOfWork(VotingDbContext db)
        {
            this.db = db;
        }
        public async Task Complete()
        {
            await db.SaveChangesAsync();
        }
    }
}
