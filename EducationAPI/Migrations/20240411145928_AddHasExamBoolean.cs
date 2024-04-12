using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EducationAPI.Migrations
{
    public partial class AddHasExamBoolean : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasExam",
                table: "Courses",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasExam",
                table: "Courses")
                .Annotation("SqlServer:IsTemporal", true)
                .Annotation("SqlServer:TemporalHistoryTableName", "CoursesHistory")
                .Annotation("SqlServer:TemporalHistoryTableSchema", null);
        }
    }
}
