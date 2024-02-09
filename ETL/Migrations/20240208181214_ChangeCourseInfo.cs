using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ETL.Migrations
{
    public partial class ChangeCourseInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CSseq",
                table: "CourseInfo",
                newName: "CSSeq");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CSSeq",
                table: "CourseInfo",
                newName: "CSseq");
        }
    }
}
