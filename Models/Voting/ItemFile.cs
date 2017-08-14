using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ngVoteCore.Models.Voting
{
    public class ItemFile
    {
        
        public Guid FileId { get; set; }

        [Required]
        [StringLength(200)]
        public string FileName { get; set; }

        public Guid? ItemId { get; set; }
    }
}
