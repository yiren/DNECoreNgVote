using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMVC.Models.Vega
{
    public class VegaFeature
    {
        [Key]
        public int VegaFeatureId { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
    }
}
