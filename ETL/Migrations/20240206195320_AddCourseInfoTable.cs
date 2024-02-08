using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ETL.Migrations
{
    public partial class AddCourseInfoTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CourseInfo",
                columns: table => new
                {
                    course_info_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CDateSchool = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CSchoolType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CSseq = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_CourseInfo", x => x.course_info_ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseInfo");
        }
    }
}
