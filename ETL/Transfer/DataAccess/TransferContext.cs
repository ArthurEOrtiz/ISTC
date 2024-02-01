using ETL.Transfer.Models;
using Microsoft.EntityFrameworkCore;

namespace ETL.Transfer.DataAccess
{
	public class TransferContext : DbContext
	{
		public TransferContext(DbContextOptions<TransferContext> options) : base(options) { }

		public DbSet<Student> Students { get; set; } = null!;

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
		}

	}
}
