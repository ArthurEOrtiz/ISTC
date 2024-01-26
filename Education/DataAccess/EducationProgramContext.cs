using Education.Models;
using Microsoft.EntityFrameworkCore;

namespace Education.DataAccess
{
	public partial class EducationProgramContext : DbContext
	{

		public EducationProgramContext(DbContextOptions<EducationProgramContext> options)
						: base(options)
		{
		}

		public DbSet<Attendance> Attendances { get; set; } = null!;
		public DbSet<Class> Classes { get; set; } = null!;
		public DbSet<Contact> Contacts { get; set; } = null!;
		public DbSet<Course> Courses { get; set; } = null!;
		public DbSet<Location> Locations { get; set; } = null!;
		public DbSet<Student> Students { get; set; } = null!;
		public DbSet<Topic> Topics { get; set; } = null!;

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
		}
	}
}
