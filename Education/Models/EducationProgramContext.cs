using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Education.Models
{
    public partial class EducationProgramContext : DbContext
    {
        //public EducationProgramContext()
        //{
        //}

        public EducationProgramContext(DbContextOptions<EducationProgramContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Attendance> Attendances { get; set; } = null!;
        public virtual DbSet<Class> Classes { get; set; } = null!;
        public virtual DbSet<Contact> Contacts { get; set; } = null!;
        public virtual DbSet<Course> Courses { get; set; } = null!;
        public virtual DbSet<Location> Locations { get; set; } = null!;
        public virtual DbSet<Student> Students { get; set; } = null!;
        public virtual DbSet<Topic> Topics { get; set; } = null!;

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        optionsBuilder.UseSqlServer();
        //    }
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Attendance>(entity =>
            {
                entity.ToTable("Attendance");

                entity.Property(e => e.AttendanceId)
                    .ValueGeneratedNever()
                    .HasColumnName("Attendance_ID");

                entity.Property(e => e.Attended).HasColumnName("attended");

                entity.Property(e => e.ClassId).HasColumnName("class_id");

                entity.Property(e => e.StudentId).HasColumnName("student_id");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.Attendances)
                    .HasForeignKey(d => d.StudentId)
                    .HasConstraintName("FK_Attendance_Students");
            });

            modelBuilder.Entity<Class>(entity =>
            {
                entity.Property(e => e.ClassId)
                    .ValueGeneratedNever()
                    .HasColumnName("class_ID");

                entity.Property(e => e.CourseId).HasColumnName("course_id");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.EndTime).HasColumnName("end_time");

                entity.Property(e => e.StartTime).HasColumnName("start_time");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.Classes)
                    .HasForeignKey(d => d.CourseId)
                    .HasConstraintName("FK_Courses_Class");
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.ToTable("Contact");

                entity.Property(e => e.ContactId)
                    .ValueGeneratedNever()
                    .HasColumnName("contact_ID");

                entity.Property(e => e.AddressLine1)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("address_line_1");

                entity.Property(e => e.AddressLine2)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("address_line_2");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Phone)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("phone");

                entity.Property(e => e.State)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("state");

                entity.Property(e => e.Zip)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("zip");
            });

            modelBuilder.Entity<Course>(entity =>
            {
                entity.Property(e => e.CourseId)
                    .ValueGeneratedNever()
                    .HasColumnName("course_ID");

                entity.Property(e => e.AttendanceCredit).HasColumnName("attendance_credit");

                entity.Property(e => e.CompletionCredit).HasColumnName("completion_credit");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.EnrollmentDeadling)
                    .HasColumnType("datetime")
                    .HasColumnName("enrollment_deadling");

                entity.Property(e => e.LocationId).HasColumnName("location_id");

                entity.Property(e => e.TopicId).HasColumnName("topic_id");

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.Courses)
                    .HasForeignKey(d => d.LocationId)
                    .HasConstraintName("FK_Courses_Locations");

                entity.HasOne(d => d.Topic)
                    .WithMany(p => p.Courses)
                    .HasForeignKey(d => d.TopicId)
                    .HasConstraintName("FK_Courses_Topic");
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.ToTable("Location");

                entity.Property(e => e.LocationId)
                    .ValueGeneratedNever()
                    .HasColumnName("location_ID");

                entity.Property(e => e.AddressLine1)
                    .HasMaxLength(25)
                    .HasColumnName("address_line_1");

                entity.Property(e => e.AddressLine2)
                    .HasMaxLength(25)
                    .HasColumnName("address_line_2");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.PostalCode)
                    .HasMaxLength(10)
                    .HasColumnName("postal_code");

                entity.Property(e => e.Room)
                    .HasMaxLength(25)
                    .HasColumnName("room");

                entity.Property(e => e.State)
                    .HasMaxLength(10)
                    .HasColumnName("state");
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.Property(e => e.StudentId)
                    .ValueGeneratedNever()
                    .HasColumnName("student_ID");

                entity.Property(e => e.AppraisalCertified).HasColumnName("appraisal_certified");

                entity.Property(e => e.ContactId).HasColumnName("contact_id");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("first_name");

                entity.Property(e => e.LastName)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("last_name");

                entity.Property(e => e.MappingCertified).HasColumnName("mapping_certified");

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("middle_name");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.Students)
                    .HasForeignKey(d => d.ContactId)
                    .HasConstraintName("FK_Students_Contact");
            });

            modelBuilder.Entity<Topic>(entity =>
            {
                entity.Property(e => e.TopicId)
                    .ValueGeneratedNever()
                    .HasColumnName("topic_ID");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Title)
                    .HasMaxLength(50)
                    .HasColumnName("title");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
