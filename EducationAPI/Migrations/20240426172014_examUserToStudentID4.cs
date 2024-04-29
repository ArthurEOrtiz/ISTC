using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EducationAPI.Migrations
{
    public partial class examUserToStudentID4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Exams_student_id",
                table: "Exams",
                column: "student_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Students_student_id",
                table: "Exams",
                column: "student_id",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Students_student_id",
                table: "Exams");

            migrationBuilder.DropIndex(
                name: "IX_Exams_student_id",
                table: "Exams");
        }
    }
}
