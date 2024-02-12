using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ETL.Migrations
{
    public partial class RemoveCourseHistoryTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EnrollContact_EnrollStudents_enroll_student_ID",
                table: "EnrollContact");

            migrationBuilder.DropTable(
                name: "CourseHistory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EnrollContact",
                table: "EnrollContact");

            migrationBuilder.RenameTable(
                name: "EnrollContact",
                newName: "EnrollContacts");

            migrationBuilder.RenameIndex(
                name: "IX_EnrollContact_enroll_student_ID",
                table: "EnrollContacts",
                newName: "IX_EnrollContacts_enroll_student_ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EnrollContacts",
                table: "EnrollContacts",
                column: "enroll_contact_ID");

            migrationBuilder.CreateTable(
                name: "CourseInfo",
                columns: table => new
                {
                    enroll_contact_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CSchoolType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CDateSchool = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CSSeq = table.Column<int>(type: "int", nullable: false),
                    CSeq = table.Column<int>(type: "int", nullable: false),
                    CName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CRoom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CLink = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cwkday1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cwkday2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cwkday3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cwkday4 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cwkday5 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cwkday6 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cwkday7 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CAllow = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CFullCredit = table.Column<int>(type: "int", nullable: false),
                    CAttendCredit = table.Column<int>(type: "int", nullable: false),
                    CPabclass = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CCertType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CMaxStudents = table.Column<int>(type: "int", nullable: false),
                    Cprereq = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseInfo", x => x.enroll_contact_ID);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_EnrollContacts_EnrollStudents_enroll_student_ID",
                table: "EnrollContacts",
                column: "enroll_student_ID",
                principalTable: "EnrollStudents",
                principalColumn: "enroll_student_ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EnrollContacts_EnrollStudents_enroll_student_ID",
                table: "EnrollContacts");

            migrationBuilder.DropTable(
                name: "CourseInfo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EnrollContacts",
                table: "EnrollContacts");

            migrationBuilder.RenameTable(
                name: "EnrollContacts",
                newName: "EnrollContact");

            migrationBuilder.RenameIndex(
                name: "IX_EnrollContacts_enroll_student_ID",
                table: "EnrollContact",
                newName: "IX_EnrollContact_enroll_student_ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EnrollContact",
                table: "EnrollContact",
                column: "enroll_contact_ID");

            migrationBuilder.CreateTable(
                name: "CourseHistory",
                columns: table => new
                {
                    course_history_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    enroll_student_ID = table.Column<int>(type: "int", nullable: false),
                    C01 = table.Column<bool>(type: "bit", nullable: true),
                    C02 = table.Column<bool>(type: "bit", nullable: true),
                    C03 = table.Column<bool>(type: "bit", nullable: true),
                    C04 = table.Column<bool>(type: "bit", nullable: true),
                    C05 = table.Column<bool>(type: "bit", nullable: true),
                    C06 = table.Column<bool>(type: "bit", nullable: true),
                    C07 = table.Column<bool>(type: "bit", nullable: true),
                    C08 = table.Column<bool>(type: "bit", nullable: true),
                    C09 = table.Column<bool>(type: "bit", nullable: true),
                    C10 = table.Column<bool>(type: "bit", nullable: true),
                    C11 = table.Column<bool>(type: "bit", nullable: true),
                    C12 = table.Column<bool>(type: "bit", nullable: true),
                    C13 = table.Column<bool>(type: "bit", nullable: true),
                    C14 = table.Column<bool>(type: "bit", nullable: true),
                    C15 = table.Column<bool>(type: "bit", nullable: true),
                    C16 = table.Column<bool>(type: "bit", nullable: true),
                    C17 = table.Column<bool>(type: "bit", nullable: true),
                    C18 = table.Column<bool>(type: "bit", nullable: true),
                    C19 = table.Column<bool>(type: "bit", nullable: true),
                    C20 = table.Column<bool>(type: "bit", nullable: true),
                    C21 = table.Column<bool>(type: "bit", nullable: true),
                    C22 = table.Column<bool>(type: "bit", nullable: true),
                    C23 = table.Column<bool>(type: "bit", nullable: true),
                    C24 = table.Column<bool>(type: "bit", nullable: true),
                    C25 = table.Column<bool>(type: "bit", nullable: true),
                    C26 = table.Column<bool>(type: "bit", nullable: true),
                    C27 = table.Column<bool>(type: "bit", nullable: true),
                    C28 = table.Column<bool>(type: "bit", nullable: true),
                    C29 = table.Column<bool>(type: "bit", nullable: true),
                    C30 = table.Column<bool>(type: "bit", nullable: true),
                    C31 = table.Column<bool>(type: "bit", nullable: true),
                    C32 = table.Column<bool>(type: "bit", nullable: true),
                    C33 = table.Column<bool>(type: "bit", nullable: true),
                    C34 = table.Column<bool>(type: "bit", nullable: true),
                    C35 = table.Column<bool>(type: "bit", nullable: true),
                    C36 = table.Column<bool>(type: "bit", nullable: true),
                    C37 = table.Column<bool>(type: "bit", nullable: true),
                    C38 = table.Column<bool>(type: "bit", nullable: true),
                    C39 = table.Column<bool>(type: "bit", nullable: true),
                    C40 = table.Column<bool>(type: "bit", nullable: true),
                    DateRegistered = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateSchool = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SchoolType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Seq = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseHistory", x => x.course_history_ID);
                    table.ForeignKey(
                        name: "FK_CourseHistory_EnrollStudents_enroll_student_ID",
                        column: x => x.enroll_student_ID,
                        principalTable: "EnrollStudents",
                        principalColumn: "enroll_student_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseHistory_enroll_student_ID",
                table: "CourseHistory",
                column: "enroll_student_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_EnrollContact_EnrollStudents_enroll_student_ID",
                table: "EnrollContact",
                column: "enroll_student_ID",
                principalTable: "EnrollStudents",
                principalColumn: "enroll_student_ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
