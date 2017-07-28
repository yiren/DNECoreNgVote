using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMVC.Models.Voting
{
    public class VoteRecord
    {
        [Key]
        public Guid RecordId { get; set; }
        [Display(Name="投票人開機帳號")]
        public string VoterName { get; set; }
        [Display(Name = "圈選項目")]
        public Guid SelectedOptionId { get; set; }

        
        public VoteItem VoteItem { get; set; }
        public Guid EventId { get; set; }
        public string EventName { get; set; }
        public VoteEvent VoteEvent { get; set; }
    }
}
