using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ngVoteCore.Data.Voting.Migrations
{
    public partial class initForVoting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VoteEvents",
                columns: table => new
                {
                    EventId = table.Column<Guid>(nullable: false),
                    CreateDate = table.Column<string>(nullable: true),
                    DneUsers = table.Column<int>(nullable: false),
                    DueDate = table.Column<string>(nullable: true),
                    EventName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoteEvents", x => x.EventId);
                });

            migrationBuilder.CreateTable(
                name: "ItemFiles",
                columns: table => new
                {
                    FileId = table.Column<Guid>(nullable: false),
                    FileName = table.Column<string>(maxLength: 200, nullable: false),
                    ItemId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemFiles", x => x.FileId);
                });

            migrationBuilder.CreateTable(
                name: "VoteItems",
                columns: table => new
                {
                    ItemId = table.Column<Guid>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    EventId = table.Column<Guid>(nullable: false),
                    ItemName = table.Column<string>(nullable: true),
                    Note = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoteItems", x => x.ItemId);
                    table.ForeignKey(
                        name: "FK_VoteItems_VoteEvents_EventId",
                        column: x => x.EventId,
                        principalTable: "VoteEvents",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VoteRecords",
                columns: table => new
                {
                    RecordId = table.Column<Guid>(nullable: false),
                    EventId = table.Column<Guid>(nullable: false),
                    EventName = table.Column<string>(nullable: true),
                    SelectedOptionId = table.Column<Guid>(nullable: false),
                    VoteItemItemId = table.Column<Guid>(nullable: true),
                    VoterName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoteRecords", x => x.RecordId);
                    table.ForeignKey(
                        name: "FK_VoteRecords_VoteEvents_EventId",
                        column: x => x.EventId,
                        principalTable: "VoteEvents",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VoteRecords_VoteItems_VoteItemItemId",
                        column: x => x.VoteItemItemId,
                        principalTable: "VoteItems",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VoteItems_EventId",
                table: "VoteItems",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_VoteRecords_EventId",
                table: "VoteRecords",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_VoteRecords_VoteItemItemId",
                table: "VoteRecords",
                column: "VoteItemItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VoteRecords");

            migrationBuilder.DropTable(
                name: "ItemFiles");

            migrationBuilder.DropTable(
                name: "VoteItems");

            migrationBuilder.DropTable(
                name: "VoteEvents");
        }
    }
}
