using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ETL.Transfer.Models
{
	public class ContactInfo
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("contact_info_ID")]
		public int ContactInfoID { get; set; }
	}
}
