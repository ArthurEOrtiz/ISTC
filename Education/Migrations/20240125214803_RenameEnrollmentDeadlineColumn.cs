using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Education.Migrations
{
	public partial class RenameEnrollmentDeadlineColumn : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.RenameColumn(
				name: "enrollment_deadling",
				table: "Courses",
				newName: "enrollment_deadline"
				);

		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.RenameColumn(
				name: "enrollment_deadline",
				table: "Courses",
				newName: "enrollment_deadling"
				);
		}
	}
}
