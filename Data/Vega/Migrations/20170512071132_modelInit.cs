using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CoreMVC.data.vega.Migrations
{
    public partial class modelInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VegaFeatures",
                columns: table => new
                {
                    VegaFeatureId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VegaFeatures", x => x.VegaFeatureId);
                });

            migrationBuilder.CreateTable(
                name: "VegaMakes",
                columns: table => new
                {
                    VegaMakeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VegaMakes", x => x.VegaMakeId);
                });

            migrationBuilder.CreateTable(
                name: "VegaModels",
                columns: table => new
                {
                    ModalId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: true),
                    VegaMakeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VegaModels", x => x.ModalId);
                    table.ForeignKey(
                        name: "FK_VegaModels_VegaMakes_VegaMakeId",
                        column: x => x.VegaMakeId,
                        principalTable: "VegaMakes",
                        principalColumn: "VegaMakeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VegaModels_VegaMakeId",
                table: "VegaModels",
                column: "VegaMakeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VegaFeatures");

            migrationBuilder.DropTable(
                name: "VegaModels");

            migrationBuilder.DropTable(
                name: "VegaMakes");
        }
    }
}
