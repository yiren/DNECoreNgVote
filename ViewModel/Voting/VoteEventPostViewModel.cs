using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMVC.ViewModel.Voting
{
    public class VoteEventPostViewModel
    {
       
        public string EventName { get; set; }
        public bool isDue { get; set; }
        public string DueDate { get; set; }
        public int DneUsers { get; set; }
        public ICollection<String> ItemNames { get; set; }
    }
}
