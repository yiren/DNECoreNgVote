using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using CoreMVC.Data.Voting;

namespace ngVoteCore.Data.Voting.Migrations
{
    [DbContext(typeof(VotingDbContext))]
    partial class VotingDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CoreMVC.Models.Voting.VoteEvent", b =>
                {
                    b.Property<Guid>("EventId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CreateDate");

                    b.Property<int>("DneUsers");

                    b.Property<string>("DueDate");

                    b.Property<string>("EventName");

                    b.HasKey("EventId");

                    b.ToTable("VoteEvents");
                });

            modelBuilder.Entity("CoreMVC.Models.Voting.VoteItem", b =>
                {
                    b.Property<Guid>("ItemId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<Guid>("EventId");

                    b.Property<string>("ItemName");

                    b.Property<string>("Note");

                    b.Property<string>("Url");

                    b.HasKey("ItemId");

                    b.HasIndex("EventId");

                    b.ToTable("VoteItems");
                });

            modelBuilder.Entity("CoreMVC.Models.Voting.VoteRecord", b =>
                {
                    b.Property<Guid>("RecordId")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("EventId");

                    b.Property<string>("EventName");

                    b.Property<Guid>("SelectedOptionId");

                    b.Property<Guid?>("VoteItemItemId");

                    b.Property<string>("VoterName");

                    b.HasKey("RecordId");

                    b.HasIndex("EventId");

                    b.HasIndex("VoteItemItemId");

                    b.ToTable("VoteRecords");
                });

            modelBuilder.Entity("ngVoteCore.Models.Voting.ItemFile", b =>
                {
                    b.Property<Guid>("FileId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<Guid?>("ItemId");

                    b.HasKey("FileId");

                    b.ToTable("ItemFiles");
                });

            modelBuilder.Entity("CoreMVC.Models.Voting.VoteItem", b =>
                {
                    b.HasOne("CoreMVC.Models.Voting.VoteEvent", "VoteEvent")
                        .WithMany("VoteItems")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CoreMVC.Models.Voting.VoteRecord", b =>
                {
                    b.HasOne("CoreMVC.Models.Voting.VoteEvent", "VoteEvent")
                        .WithMany("VoteRecords")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CoreMVC.Models.Voting.VoteItem", "VoteItem")
                        .WithMany()
                        .HasForeignKey("VoteItemItemId");
                });
        }
    }
}
