using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Education.Migrations
{
    public partial class UpdateStudentModelAccCredit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "accumulated_credit",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "accumulated_credit",
                table: "Students")
                .Annotation("SqlServer:IsTemporal", true)
                .Annotation("SqlServer:TemporalHistoryTableName", "StudentsHistory")
                .Annotation("SqlServer:TemporalHistoryTableSchema", null);
        }
    }
}
