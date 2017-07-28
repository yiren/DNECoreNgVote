using CoreMVC.Models.Contoso;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMVC.Data.Contoso
{
    public class ContosoDbContext:DbContext
    {
        
        public ContosoDbContext(DbContextOptions<ContosoDbContext> options) :base(options)
        {

        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Course> Courses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }

    public class ContosoDbContextFactory : IDbContextFactory<ContosoDbContext>
    {
        public ContosoDbContext Create(DbContextFactoryOptions options)
        {
            var optionBuilder = new DbContextOptionsBuilder<ContosoDbContext>();
            optionBuilder.UseSqlServer("Server=.\\SQLEXPRESS2014;Database=ContosoDataStore;user id=sa;password=LGA2011;persist security info=True;MultipleActiveResultSets=true");
            return new ContosoDbContext(optionBuilder.Options);
        }
    }

}
