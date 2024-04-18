using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EducationAPI.Migrations
{
    public partial class EnrollmentDeadlineNonNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			      // Turn off system versioning
			      migrationBuilder.Sql("ALTER TABLE Courses SET (SYSTEM_VERSIONING = OFF)");

			      // Update null values in the Courses and CoursesHistory tables
			      migrationBuilder.Sql("UPDATE Courses SET EnrollmentDeadline = '2000-01-01T00:00:00.000' WHERE EnrollmentDeadline IS NULL");
			      migrationBuilder.Sql("UPDATE CoursesHistory SET EnrollmentDeadline = '2000-01-01T00:00:00.000' WHERE EnrollmentDeadline IS NULL");

			      migrationBuilder.AlterColumn<DateTime>(
                      name: "EnrollmentDeadline",
                      table: "Courses",
                      type: "datetime2",
                      nullable: false,
                      defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                      oldClrType: typeof(DateTime),
                      oldType: "datetime2",
                      oldNullable: true);

			      migrationBuilder.AlterColumn<DateTime>(
	                    name: "EnrollmentDeadline",
	                    table: "CoursesHistory",
	                    type: "datetime2",
	                    nullable: false,
	                    defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
	                    oldClrType: typeof(DateTime),
	                    oldType: "datetime2",
	                    oldNullable: true);

			      // Turn on system versioning
			      migrationBuilder.Sql("ALTER TABLE Courses SET (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.CoursesHistory))");
		    }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "EnrollmentDeadline",
                table: "Courses",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }
    }
}
