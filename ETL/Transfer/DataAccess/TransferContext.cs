using ETL.Transfer.Models;
using Microsoft.EntityFrameworkCore;

namespace ETL.Transfer.DataAccess
{
	public class TransferContext : DbContext
	{
		public TransferContext(DbContextOptions<TransferContext> options) : base(options) { }

		public DbSet<Student> Students { get; set; } = null!;
		public DbSet<StudentInfo> StudentInfo { get; set; } = null!;
		public DbSet<ContactInfo> ContactInfo { get; set; } = null!;
		public DbSet<CourseHistory> CourseHistory { get; set; } = null!;
		public DbSet<CourseInfo> CourseInfo { get; set; } = null!;

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
		}
	}
}
