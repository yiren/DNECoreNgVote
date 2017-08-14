using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreMVC.Models.Voting;
using CoreMVC.ViewModel.Voting;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using ngVoteCore.Models.Voting;

namespace CoreMVC.Data.Voting.Service
{
    public class VoteEventRepository : IVoteEventRepository
    {
        private readonly VotingDbContext db;

        public VoteEventRepository(VotingDbContext _db)
        {
            db = _db;
        }

        public async Task AddVoteEvent(VoteEventPostViewModel newEvent)
        {
            var record = new VoteEvent();
            record.EventId = Guid.NewGuid();
            record.EventName = newEvent.EventName;
            record.IsDue = false;
            record.CreateDate = DateTime.Now.ToString("yyyy/MM/dd");
            record.DueDate = DateTime.Parse(newEvent.DueDate).ToString("yyyy/MM/dd");
            var items = new List<VoteItem>();
            foreach (var ItemName in newEvent.ItemNames)
            {
                VoteItem v = new VoteItem();
                v.ItemId = Guid.NewGuid();
                v.ItemName = ItemName;
                v.EventId = record.EventId;
                //await db.VoteItems.AddAsync(v);
                db.VoteItems.Add(v);
                
            }
            
            try
            {
                
                db.VoteEvents.Add(record);

                var a = db.SaveChanges();
                var b = a;
            }
            catch (Exception e)
            {

                throw;
            }
            

        }

        public async Task UpdateEvent(string id, VoteEventPostViewModel updatedEvent)
        {
            var eventId = new Guid(id);
            var e =db.VoteEvents.Include(t=>t.VoteItems).Include(t=>t.VoteRecords).Single(t => t.EventId.Equals(eventId));
            e.EventName = updatedEvent.EventName;
            e.IsDue = updatedEvent.isDue;
            e.DueDate = DateTime.Parse(updatedEvent.DueDate).ToString("yyyy/MM/dd");
            List<string> dbItems = new List<string>();
            List<string> updatedItems = new List<string>();
            List<VoteItem> items = new List<VoteItem>();
            if (updatedEvent.ItemNames != null)
            {
                foreach (var ItemName in updatedEvent.ItemNames)
                {
                    updatedItems.Add(ItemName);
                }

                if (e.VoteItems != null)
                {
                    foreach (var item in e.VoteItems)
                    {
                        dbItems.Add(item.ItemName);
                    }
                }

                IEnumerable<string> itemsToAdd = updatedItems.Except(dbItems);
                foreach (var itemName in itemsToAdd)
                {
                    VoteItem v = new VoteItem();
                    v.ItemId = Guid.NewGuid();
                    v.ItemName = itemName;
                    v.EventId = e.EventId;
                    items.Add(v);
                }

                
                IEnumerable<string> itemsToDelete = dbItems.Except(updatedItems);
                foreach (var itemName in itemsToDelete)
                {
                    db.VoteItems.Remove(db.VoteItems.SingleOrDefault(i => i.ItemName.Equals(itemName)));
                }
               
            }

            try
            {
                db.VoteItems.AddRange(items);
                
                db.VoteEvents.Update(e);
                var a=await db.SaveChangesAsync();
                
            }
            catch (Exception ex)
            {
               
            }
            
        }
        public async Task AddVoteEvent(VoteEvent voteEvent)
        {
            voteEvent.EventId = Guid.NewGuid();
            //voteEvent.LastModifiedDate = DateTime.Now.ToString("yyyy/MM/dd");
            foreach (var item in voteEvent.VoteItems)
            {
                item.EventId = voteEvent.EventId;
            }
            db.VoteEvents.Add(voteEvent);
            await db.SaveChangesAsync();
        }

        public async Task<IList<VoteEvent>> GetVoteList()
        {
            var data= await db.VoteEvents.AsNoTracking().Include(e => e.VoteItems).Include(e => e.VoteRecords).ToListAsync();
            return data;
        }

        public async Task<VoteEvent> GetVoteEventById(string id)
        {
            Guid eventId = new Guid(id);
            return await db.VoteEvents.Where(e=>e.EventId.Equals(eventId)).AsNoTracking().Include(e=>e.VoteItems).Include(e=>e.VoteRecords).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable> GetVoteResultByEventId(string id)
        {
            Guid eventId = new Guid(id);
            var joinData = db.VoteItems.Where(i=>i.EventId.Equals(eventId)).AsNoTracking()
                             .GroupJoin(db.VoteRecords.Where(e => e.EventId.Equals(eventId)).AsNoTracking(),
                             
                             m => m.ItemId,
                             r => r.SelectedOptionId,
                             (c, r) => new
                             {
                                 Name = c.ItemName,
                                 Value=r.Count()
                             });

            //var result = from r in db.VoteRecords.Where(e => e.EventId.Equals(eventId)).AsNoTracking()
            //             join m in db.VoteItems on r.SelectedOptionId equals m.ItemId
            //             group r.VoteItem by m.ItemName into g
            //             select new VoteResultViewModel
            //             {
            //                 Name = g.Key,
            //                 Value = g.ToList().Count
            //             };
            
            return await joinData.ToListAsync();
        }

        public async Task DeleteEvent(string id)
        {
            var eventId = new Guid(id);
            var e = db.VoteEvents.Where(v => v.EventId.Equals(eventId)).Include(v => v.VoteItems).Include(v => v.VoteRecords).SingleOrDefault();
            db.VoteEvents.Remove(e);
            await db.SaveChangesAsync();
        }

        public async Task<ItemFile> SaveUploadedItemFile(string fileName)
        {
            ItemFile file= new ItemFile()
            {
                FileId=Guid.NewGuid(),
                FileName=fileName
            };
            await db.ItemFiles.AddAsync(file);
            
            if (await db.SaveChangesAsync() > 0) {
                return file;
            } else {
                return null;
            };
        }

        public async Task<IList<ItemFile>> GetItemFileList()
        {
            return await db.ItemFiles.ToListAsync();
        }
    }
}
