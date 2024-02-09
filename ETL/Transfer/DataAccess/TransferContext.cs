using ETL.Transfer.Models;
using Microsoft.EntityFrameworkCore;

namespace ETL.Transfer.DataAccess
{
	public class TransferContext : DbContext
	{
		public TransferContext(DbContextOptions<TransferContext> options) : base(options) { }

		public DbSet<EnrollStudent> EnrollStudents { get; set; } = null!;
		public DbSet<EnrollInfo> EnrollInfo { get; set; } = null!;
		public DbSet<EnrollContact> EnrollContacts { get; set; } = null!;
		public DbSet<CourseHistory> CourseHistory { get; set; } = null!;
		public DbSet<EnrollHistory> EnrollHistory { get; set; } = null!;
		public DbSet<EnrollContact> CourseInfo { get; set; } = null!;

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
		}
	}
}
