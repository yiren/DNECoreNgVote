using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using CoreMVC.Data.Vega;

namespace CoreMVC.data.vega.Migrations
{
    [DbContext(typeof(VegaDbContext))]
    [Migration("20170512071132_modelInit")]
    partial class modelInit
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CoreMVC.Models.Vega.VegaFeature", b =>
                {
                    b.Property<int>("VegaFeatureId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .HasMaxLength(100);

                    b.HasKey("VegaFeatureId");

                    b.ToTable("VegaFeatures");
                });

            modelBuilder.Entity("CoreMVC.Models.Vega.VegaMake", b =>
                {
                    b.Property<int>("VegaMakeId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .HasMaxLength(100);

                    b.HasKey("VegaMakeId");

                    b.ToTable("VegaMakes");
                });

            modelBuilder.Entity("CoreMVC.Models.Vega.VegaModel", b =>
                {
                    b.Property<int>("ModalId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .HasMaxLength(100);

                    b.Property<int>("VegaMakeId");

                    b.HasKey("ModalId");

                    b.HasIndex("VegaMakeId");

                    b.ToTable("VegaModels");
                });

            modelBuilder.Entity("CoreMVC.Models.Vega.VegaModel", b =>
                {
                    b.HasOne("CoreMVC.Models.Vega.VegaMake", "VegaMake")
                        .WithMany("VegaModels")
                        .HasForeignKey("VegaMakeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
