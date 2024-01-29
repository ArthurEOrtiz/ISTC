using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Education.Migrations
{
    public partial class changeNameOfColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "start_time",
                table: "Classes",
                newName: "schedule_start");

            migrationBuilder.RenameColumn(
                name: "end_time",
                table: "Classes",
                newName: "schedule_end");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "schedule_start",
                table: "Classes",
                newName: "start_time");

            migrationBuilder.RenameColumn(
                name: "schedule_end",
                table: "Classes",
                newName: "end_time");
        }
    }
}
