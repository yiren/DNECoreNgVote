using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngVoteCore.Data.Voting.Service
{
    interface IVoteUnitOfWork
    {
        Task Complete();
    }
}
