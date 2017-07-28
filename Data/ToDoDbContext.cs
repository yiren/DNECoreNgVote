using CoreMVC.Models.ToDo;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMVC.Data
{
    public class ToDoDbContext:DbContext
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options):base(options)
        {

        }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
