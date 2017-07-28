using CoreMVC.Models.Vega;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMVC.Data.Vega
{
    public class VegaDbContext:DbContext
    {
        public VegaDbContext(DbContextOptions<VegaDbContext> options):base(options)
            
        {

        }

        public DbSet<VegaMake> VegaMakes { get; set; }
        public DbSet<VegaModel> VegaModels { get; set; }
        public DbSet<VegaFeature> VegaFeatures { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VegaMake>()
                        .HasMany(m => m.VegaModels)
                        .WithOne(m => m.VegaMake)
                        .HasForeignKey(m => m.VegaMakeId);
            
                        
        }

    }
    public class VegaDbContextFactory : IDbContextFactory<VegaDbContext>
    {
        public VegaDbContext Create(DbContextFactoryOptions options)
        {
            var optionBuilder = new DbContextOptionsBuilder<VegaDbContext>();
            optionBuilder.UseSqlServer("Server=.\\SQLEXPRESS2014;Database=VegaDataStore;user id=sa;password=LGA2011;persist security info=True;MultipleActiveResultSets=true");
            return new VegaDbContext(optionBuilder.Options);
        }
    }
}
