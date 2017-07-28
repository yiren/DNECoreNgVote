using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMVC.Models.Voting
{
    public class VoteItem
    {
        [Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ItemId { get; set; }
        [Display(Name ="選項名稱")]
        public string ItemName { get; set; }
        [Display(Name = "網址")]
        public string Url { get; set; }
        [Display(Name = "簡介")]
        public string Description { get; set; }
        [Display(Name = "備註")]
        public string Note { get; set; }

        public Guid EventId { get; set; }
        
        public VoteEvent VoteEvent { get; set; }
    }
}
