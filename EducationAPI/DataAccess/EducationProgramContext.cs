using EducationAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EducationAPI.DataAccess
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
		public DbSet<User> Users { get; set; } = null!;
		public DbSet<Topic> Topics { get; set; } = null!;

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			/*
				Temporal tables automatically keep track of all data ever stored in a table 
				even after data has been updated or deleted. This is achieved by creating parallel
				"history table" into which timestamped historical data is stored whenever a change is 
				made to the main table. This allows historical data to be queried. This also guards against 
				accidental mutation or deletion. 
			  learn more about it here. 

				https://learn.microsoft.com/en-us/ef/core/providers/sql-server/temporal-tables

				!!!! IT'S IMPORTANT THAT YOU DO THIS ON SQL SERVER 2017 OR HIGHER !!!!
			*/

			modelBuilder.Entity<Attendance>()
				.ToTable("Attendance", b => b.IsTemporal());
			modelBuilder.Entity<Class>()
				.ToTable("Classes", b => b.IsTemporal());
			modelBuilder.Entity<Contact>()
				.ToTable("Contact", b => b.IsTemporal());
			modelBuilder.Entity<Course>()
				.ToTable("Courses", b => b.IsTemporal());
			modelBuilder.Entity<Location>()
				.ToTable("Location", b => b.IsTemporal());
			modelBuilder.Entity<Student>()
				.ToTable("Students", b => b.IsTemporal());
			modelBuilder.Entity<User>()
				.ToTable("Users", b => b.IsTemporal());
			modelBuilder.Entity<Topic>()
				.ToTable("Topics", b => b.IsTemporal());
		}
	}
}
