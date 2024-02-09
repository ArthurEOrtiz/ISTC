using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ETL.Migrations
{
    public partial class ChangeStudentInfoToEnrollInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentInfo");

            migrationBuilder.CreateTable(
                name: "EnrollInfo",
                columns: table => new
                {
                    enroll_info_ID = table.Column<int>(type: "int", nullable: false)
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
                    FaxNmbr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateRegistered = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateSchool = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SchoolType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Seq = table.Column<int>(type: "int", nullable: false),
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
                    C40 = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnrollInfo", x => x.enroll_info_ID);
                    table.ForeignKey(
                        name: "FK_EnrollInfo_Students_student_ID",
                        column: x => x.student_ID,
                        principalTable: "Students",
                        principalColumn: "student_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EnrollInfo_student_ID",
                table: "EnrollInfo",
                column: "student_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EnrollInfo");

            migrationBuilder.CreateTable(
                name: "StudentInfo",
                columns: table => new
                {
                    student_info_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    student_ID = table.Column<int>(type: "int", nullable: false),
                    AddrCity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrState = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrSteNmbr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrStreet = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrZip = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    EmailAddr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Employer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FaxAc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FaxNmbr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FaxPrfx = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SchoolType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Seq = table.Column<int>(type: "int", nullable: false),
                    TelAc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelNmbr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelPrfx = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentInfo", x => x.student_info_ID);
                    table.ForeignKey(
                        name: "FK_StudentInfo_Students_student_ID",
                        column: x => x.student_ID,
                        principalTable: "Students",
                        principalColumn: "student_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentInfo_student_ID",
                table: "StudentInfo",
                column: "student_ID");
        }
    }
}
