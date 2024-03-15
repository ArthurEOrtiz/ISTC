﻿// <auto-generated />
using System;
using EducationAPI.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EducationAPI.Migrations
{
    [DbContext(typeof(EducationProgramContext))]
    [Migration("20240315160221_AddCityToContacts")]
    partial class AddCityToContacts
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("CourseTopic", b =>
                {
                    b.Property<int>("CoursesCourseId")
                        .HasColumnType("int");

                    b.Property<int>("TopicsTopicId")
                        .HasColumnType("int");

                    b.Property<DateTime>("PeriodEnd")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodEnd");

                    b.Property<DateTime>("PeriodStart")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodStart");

                    b.HasKey("CoursesCourseId", "TopicsTopicId");

                    b.HasIndex("TopicsTopicId");

                    b.ToTable("CourseTopic");

                    b.ToTable(tb => tb.IsTemporal(ttb =>
                        {
                            ttb
                                .HasPeriodStart("PeriodStart")
                                .HasColumnName("PeriodStart");
                            ttb
                                .HasPeriodEnd("PeriodEnd")
                                .HasColumnName("PeriodEnd");
                        }
                    ));
                });

            modelBuilder.Entity("EducationAPI.Models.Attendance", b =>
                {
                    b.Property<int>("AttendanceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AttendanceId"), 1L, 1);

                    b.Property<bool>("Attended")
                        .HasColumnType("bit");

                    b.Property<int>("ClassId")
                        .HasColumnType("int")
                        .HasColumnName("class_id");

                    b.Property<DateTime>("PeriodEnd")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodEnd");

                    b.Property<DateTime>("PeriodStart")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodStart");

                    b.Property<int>("StudentId")
                        .HasColumnType("int")
                        .HasColumnName("student_id");

                    b.HasKey("AttendanceId");

                    b.HasIndex("ClassId");

                    b.HasIndex("StudentId");

                    b.ToTable("Attendance", (string)null);

                    b.ToTable(tb => tb.IsTemporal(ttb =>
                        {
                            ttb
                                .HasPeriodStart("PeriodStart")
                                .HasColumnName("PeriodStart");
                            ttb
                                .HasPeriodEnd("PeriodEnd")
                                .HasColumnName("PeriodEnd");
                        }
                    ));
                });

            modelBuilder.Entity("EducationAPI.Models.Class", b =>
                {
                    b.Property<int>("ClassId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ClassId"), 1L, 1);

                    b.Property<int>("CourseId")
                        .HasColumnType("int");

                    b.Property<DateTime>("PeriodEnd")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodEnd");

                    b.Property<DateTime>("PeriodStart")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodStart");

                    b.Property<DateTime>("ScheduleEnd")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ScheduleStart")
                        .HasColumnType("datetime2");

                    b.HasKey("ClassId");

                    b.HasIndex("CourseId");

                    b.ToTable("Classes", (string)null);

                    b.ToTable(tb => tb.IsTemporal(ttb =>
                        {
                            ttb
                                .HasPeriodStart("PeriodStart")
                                .HasColumnName("PeriodStart");
                            ttb
                                .HasPeriodEnd("PeriodEnd")
                                .HasColumnName("PeriodEnd");
                        }
                    ));
                });

            modelBuilder.Entity("EducationAPI.Models.Contact", b =>
                {
                    b.Property<int>("ContactId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ContactId"), 1L, 1);

                    b.Property<string>("AddressLine1")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("AddressLine2")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("City")
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<DateTime>("PeriodEnd")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodEnd");

                    b.Property<DateTime>("PeriodStart")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodStart");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("Zip")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.HasKey("ContactId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Contact", (string)null);

                    b.ToTable(tb => tb.IsTemporal(ttb =>
                        {
                            ttb
                                .HasPeriodStart("PeriodStart")
                                .HasColumnName("PeriodStart");
                            ttb
                                .HasPeriodEnd("PeriodEnd")
                                .HasColumnName("PeriodEnd");
                        }
                    ));
                });

            modelBuilder.Entity("EducationAPI.Models.Course", b =>
                {
                    b.Property<int>("CourseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CourseId"), 1L, 1);

                    b.Property<int>("AttendanceCredit")
                        .HasColumnType("int");

                    b.Property<int>("CompletionCredit")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime?>("EnrollmentDeadline")
                        .HasColumnType("datetime2");

                    b.Property<string>("InstructorEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InstructorName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("LocationId")
                        .HasColumnType("int");

                    b.Property<int>("MaxAttendance")
                        .HasColumnType("int");

                    b.Property<string>("Pdf")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("PeriodEnd")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodEnd");

                    b.Property<DateTime>("PeriodStart")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodStart");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("CourseId");

                    b.HasIndex("LocationId");

                    b.ToTable("Courses", (string)null);

                    b.ToTable(tb => tb.IsTemporal(ttb =>
                        {
                            ttb
                                .HasPeriodStart("PeriodStart")
                                .HasColumnName("PeriodStart");
                            ttb
                                .HasPeriodEnd("PeriodEnd")
                                .HasColumnName("PeriodEnd");
                        }
                    ));
                });

            modelBuilder.Entity("EducationAPI.Models.Location", b =>
                {
                    b.Property<int>("LocationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LocationId"), 1L, 1);

                    b.Property<string>("AddressLine1")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("AddressLine2")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("City")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Description")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime>("PeriodEnd")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodEnd");

                    b.Property<DateTime>("PeriodStart")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodStart");

                    b.Property<string>("PostalCode")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("RemoteLink")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Room")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("State")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.HasKey("LocationId");

                    b.ToTable("Location", (string)null);

                    b.ToTable(tb => tb.IsTemporal(ttb =>
                        {
                            ttb
                                .HasPeriodStart("PeriodStart")
                                .HasColumnName("PeriodStart");
                            ttb
                                .HasPeriodEnd("PeriodEnd")
                                .HasColumnName("PeriodEnd");
                        }
                    ));
                });

            modelBuilder.Entity("EducationAPI.Models.Student", b =>
                {
                    b.Property<int>("StudentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StudentId"), 1L, 1);

                    b.Property<int>("AccumulatedCredit")
                        .HasColumnType("int");

                    b.Property<bool>("AppraisalCertified")
                        .HasColumnType("bit");

                    b.Property<bool>("MappingCertified")
                        .HasColumnType("bit");

                    b.Property<DateTime>("PeriodEnd")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodEnd");

                    b.Property<DateTime>("PeriodStart")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodStart");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("StudentId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Students", (string)null);

                    b.ToTable(tb => tb.IsTemporal(ttb =>
                        {
                            ttb
                                .HasPeriodStart("PeriodStart")
                                .HasColumnName("PeriodStart");
                            ttb
                                .HasPeriodEnd("PeriodEnd")
                                .HasColumnName("PeriodEnd");
                        }
                    ));
                });

            modelBuilder.Entity("EducationAPI.Models.Topic", b =>
                {
                    b.Property<int>("TopicId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TopicId"), 1L, 1);

                    b.Property<string>("Description")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime>("PeriodEnd")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodEnd");

                    b.Property<DateTime>("PeriodStart")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodStart");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("TopicId");

                    b.ToTable("Topics", (string)null);

                    b.ToTable(tb => tb.IsTemporal(ttb =>
                        {
                            ttb
                                .HasPeriodStart("PeriodStart")
                                .HasColumnName("PeriodStart");
                            ttb
                                .HasPeriodEnd("PeriodEnd")
                                .HasColumnName("PeriodEnd");
                        }
                    ));
                });

            modelBuilder.Entity("EducationAPI.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"), 1L, 1);

                    b.Property<string>("ClerkId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("bit");

                    b.Property<bool>("IsStudent")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("MiddleName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime>("PeriodEnd")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodEnd");

                    b.Property<DateTime>("PeriodStart")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("PeriodStart");

                    b.HasKey("UserId");

                    b.ToTable("Users", (string)null);

                    b.ToTable(tb => tb.IsTemporal(ttb =>
                        {
                            ttb
                                .HasPeriodStart("PeriodStart")
                                .HasColumnName("PeriodStart");
                            ttb
                                .HasPeriodEnd("PeriodEnd")
                                .HasColumnName("PeriodEnd");
                        }
                    ));
                });

            modelBuilder.Entity("CourseTopic", b =>
                {
                    b.HasOne("EducationAPI.Models.Course", null)
                        .WithMany()
                        .HasForeignKey("CoursesCourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EducationAPI.Models.Topic", null)
                        .WithMany()
                        .HasForeignKey("TopicsTopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EducationAPI.Models.Attendance", b =>
                {
                    b.HasOne("EducationAPI.Models.Class", "Class")
                        .WithMany("Attendances")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EducationAPI.Models.Student", "Student")
                        .WithMany("Attendances")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Class");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("EducationAPI.Models.Class", b =>
                {
                    b.HasOne("EducationAPI.Models.Course", null)
                        .WithMany("Classes")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EducationAPI.Models.Contact", b =>
                {
                    b.HasOne("EducationAPI.Models.User", null)
                        .WithOne("Contact")
                        .HasForeignKey("EducationAPI.Models.Contact", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EducationAPI.Models.Course", b =>
                {
                    b.HasOne("EducationAPI.Models.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Location");
                });

            modelBuilder.Entity("EducationAPI.Models.Student", b =>
                {
                    b.HasOne("EducationAPI.Models.User", null)
                        .WithOne("Student")
                        .HasForeignKey("EducationAPI.Models.Student", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EducationAPI.Models.Class", b =>
                {
                    b.Navigation("Attendances");
                });

            modelBuilder.Entity("EducationAPI.Models.Course", b =>
                {
                    b.Navigation("Classes");
                });

            modelBuilder.Entity("EducationAPI.Models.Student", b =>
                {
                    b.Navigation("Attendances");
                });

            modelBuilder.Entity("EducationAPI.Models.User", b =>
                {
                    b.Navigation("Contact");

                    b.Navigation("Student");
                });
#pragma warning restore 612, 618
        }
    }
}
