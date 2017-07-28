using System.ComponentModel.DataAnnotations;

namespace CoreMVC.Models.Vega
{
    public class VegaModel
    {
        [Key]
        public int ModalId { get; set; }
        [StringLength(100)]
        public string Name { get; set; }

        public int VegaMakeId { get; set; }
        public VegaMake VegaMake { get; set; }
    }
}