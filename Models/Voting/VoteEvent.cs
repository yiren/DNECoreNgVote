using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMVC.Models.Voting
{
    public class VoteEvent
    {
        [Key]
        public Guid EventId { get; set; }
        [Display(Name = "活動名稱")]
        public string EventName { get; set; }
        [Display(Name = "活動開始日期")]
        public string CreateDate { get; set; }
        [Display(Name = "活動結束日期")]
        public string DueDate { get; set; }
        [Display(Name ="參加投票人數(可至電話簿查詢)")]
        public int DneUsers { get; set; }

                                           //[Display(Name = "活動發起人")]
                                           //public string CreatedBy { get; set; }
                                           //[Display(Name = "最後修改人員")]
                                           //public string LastModifiedBy { get; set; }
                                           //[Display(Name = "最後修改日期")]
                                           //public string LastModifiedDate { get; set; }
                                           //[Display(Name ="是否可一票多選")]
                                           //public bool IsMultipleChoice { get; set; }
                                           //[Display(Name = "最多可選幾票")]
                                           //public int Choices { get; set; }


        public ICollection<VoteItem> VoteItems { get; set; }
        
        public ICollection<VoteRecord> VoteRecords { get; set; }
        
    }
}
