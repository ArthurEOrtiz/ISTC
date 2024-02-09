using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ETL.Migrations
{
    public partial class ChangeTableNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactInfo");

            migrationBuilder.DropTable(
                name: "CourseInfo");

            migrationBuilder.DropTable(
                name: "StudentHistory");

            migrationBuilder.CreateTable(
                name: "EnrollContact",
                columns: table => new
                {
                    enroll_contact_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    student_ID = table.Column<int>(type: "int", nullable: false),
                    JobTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Employer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailAddr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddrStreet = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrSteNmbr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrCity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrState = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrZip = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelAc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelPrfx = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelNmbr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FaxAc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FaxPrfx = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FaxNmbr = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnrollContact", x => x.enroll_contact_ID);
                    table.ForeignKey(
                        name: "FK_EnrollContact_Students_student_ID",
                        column: x => x.student_ID,
                        principalTable: "Students",
                        principalColumn: "student_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EnrollHistory",
                columns: table => new
                {
                    Enroll_history_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    student_ID = table.Column<int>(type: "int", nullable: false),
                    DateRegistered = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateSchool = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SchoolType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Seq = table.Column<int>(type: "int", nullable: false),
                    CSeq = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnrollHistory", x => x.Enroll_history_ID);
                    table.ForeignKey(
                        name: "FK_EnrollHistory_Students_student_ID",
                        column: x => x.student_ID,
                        principalTable: "Students",
                        principalColumn: "student_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EnrollContact_student_ID",
                table: "EnrollContact",
                column: "student_ID");

            migrationBuilder.CreateIndex(
                name: "IX_EnrollHistory_student_ID",
                table: "EnrollHistory",
                column: "student_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EnrollContact");

            migrationBuilder.DropTable(
                name: "EnrollHistory");

            migrationBuilder.CreateTable(
                name: "ContactInfo",
                columns: table => new
                {
                    contact_info_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    student_ID = table.Column<int>(type: "int", nullable: false),
                    AddrCity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrState = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrSteNmbr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrStreet = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrZip = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailAddr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Employer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FaxAc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FaxNmbr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FaxPrfx = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelAc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelNmbr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelPrfx = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactInfo", x => x.contact_info_ID);
                    table.ForeignKey(
                        name: "FK_ContactInfo_Students_student_ID",
                        column: x => x.student_ID,
                        principalTable: "Students",
                        principalColumn: "student_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseInfo",
                columns: table => new
                {
                    course_info_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CAllow = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CAttendCredit = table.Column<int>(type: "int", nullable: false),
                    CCertType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CDateSchool = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CFullCredit = table.Column<int>(type: "int", nullable: false),
                    CLink = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CMaxStudents = table.Column<int>(type: "int", nullable: false),
                    CName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CPabclass = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CRoom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CSSeq = table.Column<int>(type: "int", nullable: false),
                    CSchoolType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CSeq = table.Column<int>(type: "int", nullable: false),
                    CTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cprereq = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cwkday1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cwkday2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cwkday3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cwkday4 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cwkday5 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cwkday6 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cwkday7 = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseInfo", x => x.course_info_ID);
                });

            migrationBuilder.CreateTable(
                name: "StudentHistory",
                columns: table => new
                {
                    student_history_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    student_ID = table.Column<int>(type: "int", nullable: false),
                    CSeq = table.Column<int>(type: "int", nullable: true),
                    DateRegistered = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateSchool = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SchoolType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Seq = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentHistory", x => x.student_history_ID);
                    table.ForeignKey(
                        name: "FK_StudentHistory_Students_student_ID",
                        column: x => x.student_ID,
                        principalTable: "Students",
                        principalColumn: "student_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContactInfo_student_ID",
                table: "ContactInfo",
                column: "student_ID");

            migrationBuilder.CreateIndex(
                name: "IX_StudentHistory_student_ID",
                table: "StudentHistory",
                column: "student_ID");
        }
    }
}
