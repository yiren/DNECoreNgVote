using CoreMVC.Models.Voting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMVC.Data.Voting
{
    public static class VoteSeedData
    {
        public static void addVoteSeedData(VotingDbContext db)
        {
            var voteEvent = new VoteEvent()
            {
                EventId=Guid.NewGuid(),
                EventName=".Net Core Backend DB Voting Test",
                IsDue=false,
                CreateDate=DateTime.Now.ToString("yyyy/MM/dd")
            };
            var voteEvent2 = new VoteEvent()
            {
                EventId = Guid.NewGuid(),
                EventName = "pp",
                IsDue = false,
                CreateDate = DateTime.Now.ToString("yyyy/MM/dd")
            };
            var voteEvent3 = new VoteEvent()
            {
                EventId = Guid.NewGuid(),
                EventName = "xx",
                IsDue = false,
                CreateDate = DateTime.Now.ToString("yyyy/MM/dd")
            };
            var voteEvent4 = new VoteEvent()
            {
                EventId = Guid.NewGuid(),
                EventName = "yy",
                IsDue = false,
                CreateDate = DateTime.Now.ToString("yyyy/MM/dd")
            };
            var voteEvent5 = new VoteEvent()
            {
                EventId = Guid.NewGuid(),
                EventName = "zz",
                IsDue = false,
                CreateDate = DateTime.Now.ToString("yyyy/MM/dd")
            };
            var voteItems = new List<VoteItem>();
            voteItems.Add(new VoteItem()
            {
                ItemId=Guid.NewGuid(),
                ItemName="MS SQL Server",
                EventId=voteEvent.EventId
            });
            voteItems.Add(new VoteItem()
            {
                ItemId = Guid.NewGuid(),
                ItemName = "MySQL/MariaDB",
                EventId = voteEvent.EventId
            });
            voteItems.Add(new VoteItem()
            {
                ItemId = Guid.NewGuid(),
                ItemName = "PostgreSQL",
                EventId = voteEvent.EventId
            });
            voteItems.Add(new VoteItem()
            {
                ItemId = Guid.NewGuid(),
                ItemName = "MongoDB",
                EventId = voteEvent.EventId
            });

            var voteRecords = new List<VoteRecord>();
            voteRecords.Add(new VoteRecord(){
                RecordId=Guid.NewGuid(),
                VoterName="joombuopre",
                SelectedOptionId=voteItems[0].ItemId,
                EventId=voteEvent.EventId
            });
            voteRecords.Add(new VoteRecord()
            {
                RecordId = Guid.NewGuid(),
                VoterName = "ggyy",
                SelectedOptionId = voteItems[0].ItemId,
                EventId = voteEvent.EventId
            });
            voteRecords.Add(new VoteRecord()
            {
                RecordId = Guid.NewGuid(),
                VoterName = "8787",
                SelectedOptionId = voteItems[1].ItemId,
                EventId = voteEvent.EventId
            });
            voteRecords.Add(new VoteRecord()
            {
                RecordId = Guid.NewGuid(),
                VoterName = "TMD",
                SelectedOptionId = voteItems[2].ItemId,
                EventId = voteEvent.EventId
            });
            voteRecords.Add(new VoteRecord()
            {
                RecordId = Guid.NewGuid(),
                VoterName = "2266",
                SelectedOptionId = voteItems[1].ItemId,
                EventId = voteEvent.EventId,
            });
            voteRecords.Add(new VoteRecord()
            {
                RecordId = Guid.NewGuid(),
                VoterName = "487",
                SelectedOptionId = voteItems[3].ItemId,
                EventId = voteEvent.EventId,
            });

           
            db.VoteItems.AddRange(voteItems);
            db.VoteRecords.AddRange(voteRecords);
            db.VoteEvents.Add(voteEvent);
            db.VoteEvents.Add(voteEvent2);
            db.VoteEvents.Add(voteEvent3);
            db.VoteEvents.Add(voteEvent4);
            db.VoteEvents.Add(voteEvent5);
            db.SaveChanges();
            
        }
    }
}
