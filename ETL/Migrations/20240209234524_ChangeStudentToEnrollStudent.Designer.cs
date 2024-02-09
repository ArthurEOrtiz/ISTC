﻿// <auto-generated />
using System;
using ETL.Transfer.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ETL.Migrations
{
    [DbContext(typeof(TransferContext))]
    [Migration("20240209234524_ChangeStudentToEnrollStudent")]
    partial class ChangeStudentToEnrollStudent
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("ETL.Transfer.Models.CourseHistory", b =>
                {
                    b.Property<int>("CourseHistoryID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("course_history_ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CourseHistoryID"), 1L, 1);

                    b.Property<bool?>("C01")
                        .HasColumnType("bit");

                    b.Property<bool?>("C02")
                        .HasColumnType("bit");

                    b.Property<bool?>("C03")
                        .HasColumnType("bit");

                    b.Property<bool?>("C04")
                        .HasColumnType("bit");

                    b.Property<bool?>("C05")
                        .HasColumnType("bit");

                    b.Property<bool?>("C06")
                        .HasColumnType("bit");

                    b.Property<bool?>("C07")
                        .HasColumnType("bit");

                    b.Property<bool?>("C08")
                        .HasColumnType("bit");

                    b.Property<bool?>("C09")
                        .HasColumnType("bit");

                    b.Property<bool?>("C10")
                        .HasColumnType("bit");

                    b.Property<bool?>("C11")
                        .HasColumnType("bit");

                    b.Property<bool?>("C12")
                        .HasColumnType("bit");

                    b.Property<bool?>("C13")
                        .HasColumnType("bit");

                    b.Property<bool?>("C14")
                        .HasColumnType("bit");

                    b.Property<bool?>("C15")
                        .HasColumnType("bit");

                    b.Property<bool?>("C16")
                        .HasColumnType("bit");

                    b.Property<bool?>("C17")
                        .HasColumnType("bit");

                    b.Property<bool?>("C18")
                        .HasColumnType("bit");

                    b.Property<bool?>("C19")
                        .HasColumnType("bit");

                    b.Property<bool?>("C20")
                        .HasColumnType("bit");

                    b.Property<bool?>("C21")
                        .HasColumnType("bit");

                    b.Property<bool?>("C22")
                        .HasColumnType("bit");

                    b.Property<bool?>("C23")
                        .HasColumnType("bit");

                    b.Property<bool?>("C24")
                        .HasColumnType("bit");

                    b.Property<bool?>("C25")
                        .HasColumnType("bit");

                    b.Property<bool?>("C26")
                        .HasColumnType("bit");

                    b.Property<bool?>("C27")
                        .HasColumnType("bit");

                    b.Property<bool?>("C28")
                        .HasColumnType("bit");

                    b.Property<bool?>("C29")
                        .HasColumnType("bit");

                    b.Property<bool?>("C30")
                        .HasColumnType("bit");

                    b.Property<bool?>("C31")
                        .HasColumnType("bit");

                    b.Property<bool?>("C32")
                        .HasColumnType("bit");

                    b.Property<bool?>("C33")
                        .HasColumnType("bit");

                    b.Property<bool?>("C34")
                        .HasColumnType("bit");

                    b.Property<bool?>("C35")
                        .HasColumnType("bit");

                    b.Property<bool?>("C36")
                        .HasColumnType("bit");

                    b.Property<bool?>("C37")
                        .HasColumnType("bit");

                    b.Property<bool?>("C38")
                        .HasColumnType("bit");

                    b.Property<bool?>("C39")
                        .HasColumnType("bit");

                    b.Property<bool?>("C40")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("DateRegistered")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateSchool")
                        .HasColumnType("datetime2");

                    b.Property<int>("EnrollStudentID")
                        .HasColumnType("int")
                        .HasColumnName("enroll_student_ID");

                    b.Property<string>("SchoolType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Seq")
                        .HasColumnType("int");

                    b.HasKey("CourseHistoryID");

                    b.HasIndex("EnrollStudentID");

                    b.ToTable("CourseHistory");
                });

            modelBuilder.Entity("ETL.Transfer.Models.EnrollContact", b =>
                {
                    b.Property<int>("EnrollContactID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("enroll_contact_ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EnrollContactID"), 1L, 1);

                    b.Property<string>("AddrCity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AddrState")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AddrSteNmbr")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AddrStreet")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AddrZip")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmailAddr")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Employer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EnrollStudentID")
                        .HasColumnType("int")
                        .HasColumnName("enroll_student_ID");

                    b.Property<string>("FaxAc")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FaxNmbr")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FaxPrfx")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JobTitle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TelAc")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TelNmbr")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TelPrfx")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EnrollContactID");

                    b.HasIndex("EnrollStudentID");

                    b.ToTable("EnrollContact");
                });

            modelBuilder.Entity("ETL.Transfer.Models.EnrollHistory", b =>
                {
                    b.Property<int>("EnrollHistoryID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Enroll_history_ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EnrollHistoryID"), 1L, 1);

                    b.Property<int?>("CSeq")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DateRegistered")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateSchool")
                        .HasColumnType("datetime2");

                    b.Property<int>("EnrollStudentID")
                        .HasColumnType("int")
                        .HasColumnName("enroll_student_ID");

                    b.Property<string>("SchoolType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Seq")
                        .HasColumnType("int");

                    b.HasKey("EnrollHistoryID");

                    b.HasIndex("EnrollStudentID");

                    b.ToTable("EnrollHistory");
                });

            modelBuilder.Entity("ETL.Transfer.Models.EnrollInfo", b =>
                {
                    b.Property<int>("EnrollInfoID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("enroll_info_ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EnrollInfoID"), 1L, 1);

                    b.Property<string>("AddrCity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AddrState")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AddrSteNmbr")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AddrStreet")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AddrZip")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("C01")
                        .HasColumnType("bit");

                    b.Property<bool?>("C02")
                        .HasColumnType("bit");

                    b.Property<bool?>("C03")
                        .HasColumnType("bit");

                    b.Property<bool?>("C04")
                        .HasColumnType("bit");

                    b.Property<bool?>("C05")
                        .HasColumnType("bit");

                    b.Property<bool?>("C06")
                        .HasColumnType("bit");

                    b.Property<bool?>("C07")
                        .HasColumnType("bit");

                    b.Property<bool?>("C08")
                        .HasColumnType("bit");

                    b.Property<bool?>("C09")
                        .HasColumnType("bit");

                    b.Property<bool?>("C10")
                        .HasColumnType("bit");

                    b.Property<bool?>("C11")
                        .HasColumnType("bit");

                    b.Property<bool?>("C12")
                        .HasColumnType("bit");

                    b.Property<bool?>("C13")
                        .HasColumnType("bit");

                    b.Property<bool?>("C14")
                        .HasColumnType("bit");

                    b.Property<bool?>("C15")
                        .HasColumnType("bit");

                    b.Property<bool?>("C16")
                        .HasColumnType("bit");

                    b.Property<bool?>("C17")
                        .HasColumnType("bit");

                    b.Property<bool?>("C18")
                        .HasColumnType("bit");

                    b.Property<bool?>("C19")
                        .HasColumnType("bit");

                    b.Property<bool?>("C20")
                        .HasColumnType("bit");

                    b.Property<bool?>("C21")
                        .HasColumnType("bit");

                    b.Property<bool?>("C22")
                        .HasColumnType("bit");

                    b.Property<bool?>("C23")
                        .HasColumnType("bit");

                    b.Property<bool?>("C24")
                        .HasColumnType("bit");

                    b.Property<bool?>("C25")
                        .HasColumnType("bit");

                    b.Property<bool?>("C26")
                        .HasColumnType("bit");

                    b.Property<bool?>("C27")
                        .HasColumnType("bit");

                    b.Property<bool?>("C28")
                        .HasColumnType("bit");

                    b.Property<bool?>("C29")
                        .HasColumnType("bit");

                    b.Property<bool?>("C30")
                        .HasColumnType("bit");

                    b.Property<bool?>("C31")
                        .HasColumnType("bit");

                    b.Property<bool?>("C32")
                        .HasColumnType("bit");

                    b.Property<bool?>("C33")
                        .HasColumnType("bit");

                    b.Property<bool?>("C34")
                        .HasColumnType("bit");

                    b.Property<bool?>("C35")
                        .HasColumnType("bit");

                    b.Property<bool?>("C36")
                        .HasColumnType("bit");

                    b.Property<bool?>("C37")
                        .HasColumnType("bit");

                    b.Property<bool?>("C38")
                        .HasColumnType("bit");

                    b.Property<bool?>("C39")
                        .HasColumnType("bit");

                    b.Property<bool?>("C40")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("DateRegistered")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateSchool")
                        .HasColumnType("datetime2");

                    b.Property<string>("EmailAddr")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Employer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EnrollStudentID")
                        .HasColumnType("int")
                        .HasColumnName("enroll_student_ID");

                    b.Property<string>("FaxAc")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FaxNmbr")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FaxPrfx")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JobTitle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SchoolType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Seq")
                        .HasColumnType("int");

                    b.Property<string>("TelAc")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TelNmbr")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TelPrfx")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EnrollInfoID");

                    b.HasIndex("EnrollStudentID");

                    b.ToTable("EnrollInfo");
                });

            modelBuilder.Entity("ETL.Transfer.Models.EnrollStudent", b =>
                {
                    b.Property<int>("EnrollStudentID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("enroll_student_ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EnrollStudentID"), 1L, 1);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("first_name");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("last_name");

                    b.HasKey("EnrollStudentID");

                    b.ToTable("EnrollStudents");
                });

            modelBuilder.Entity("ETL.Transfer.Models.CourseHistory", b =>
                {
                    b.HasOne("ETL.Transfer.Models.EnrollStudent", "EnrollStudent")
                        .WithMany()
                        .HasForeignKey("EnrollStudentID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EnrollStudent");
                });

            modelBuilder.Entity("ETL.Transfer.Models.EnrollContact", b =>
                {
                    b.HasOne("ETL.Transfer.Models.EnrollStudent", "EnrollStudent")
                        .WithMany("EnrollContacts")
                        .HasForeignKey("EnrollStudentID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EnrollStudent");
                });

            modelBuilder.Entity("ETL.Transfer.Models.EnrollHistory", b =>
                {
                    b.HasOne("ETL.Transfer.Models.EnrollStudent", "EnrollStudent")
                        .WithMany("EnrollHistory")
                        .HasForeignKey("EnrollStudentID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EnrollStudent");
                });

            modelBuilder.Entity("ETL.Transfer.Models.EnrollInfo", b =>
                {
                    b.HasOne("ETL.Transfer.Models.EnrollStudent", "EnrollStudent")
                        .WithMany("EnrollInfo")
                        .HasForeignKey("EnrollStudentID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EnrollStudent");
                });

            modelBuilder.Entity("ETL.Transfer.Models.EnrollStudent", b =>
                {
                    b.Navigation("EnrollContacts");

                    b.Navigation("EnrollHistory");

                    b.Navigation("EnrollInfo");
                });
#pragma warning restore 612, 618
        }
    }
}
