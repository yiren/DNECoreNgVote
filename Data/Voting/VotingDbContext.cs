using CoreMVC.Models.Voting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using ngVoteCore.Models.Voting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMVC.Data.Voting
{
    public class VotingDbContext:DbContext
    {
        public VotingDbContext(DbContextOptions<VotingDbContext> options):base(options)
        {

        }
        public DbSet<VoteEvent> VoteEvents { get; set; }
        public DbSet<VoteItem> VoteItems { get; set; }
        public DbSet<VoteRecord> VoteRecords { get; set; }
        public DbSet<ItemFile> ItemFiles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<VoteEvent>()
                   .HasMany(e => e.VoteItems)
                   .WithOne(i => i.VoteEvent)
                   .HasForeignKey(i => i.EventId);
            builder.Entity<VoteEvent>()
                   .HasMany(e => e.VoteRecords)
                   .WithOne(r=>r.VoteEvent)
                   .HasForeignKey(r=>r.EventId);

            builder.Entity<VoteItem>()
                    .HasKey(i => i.ItemId);

            builder.Entity<ItemFile>(o =>
            {
                o.HasKey(f => f.FileId);
            });

            //builder.Entity<VoteItem>()
            //       .Property(i => i.ItemId)
            //       .ValueGeneratedOnAdd();


        }
        public VotingDbContext Create(DbContextFactoryOptions options)
        {
            var optionBuilder = new DbContextOptionsBuilder<VotingDbContext>();
            optionBuilder.UseSqlServer("Server=10.20.1.4\\SQLEXPRESS04;Database=DneVotingData;user id=sa;password=LGA2011;persist security info=True;MultipleActiveResultSets=true");
            return new VotingDbContext(optionBuilder.Options);
        }
    }
    
}
