using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ETL.Migrations
{
    public partial class AddFKStudentStudentInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_StudentInfo_student_ID",
                table: "StudentInfo",
                column: "student_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentInfo_Students_student_ID",
                table: "StudentInfo",
                column: "student_ID",
                principalTable: "Students",
                principalColumn: "student_ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentInfo_Students_student_ID",
                table: "StudentInfo");

            migrationBuilder.DropIndex(
                name: "IX_StudentInfo_student_ID",
                table: "StudentInfo");
        }
    }
}
