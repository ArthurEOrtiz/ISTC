using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ETL.Migrations
{
    public partial class StudentHistoryChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_StudentHistory_student_ID",
                table: "StudentHistory",
                column: "student_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentHistory_Students_student_ID",
                table: "StudentHistory",
                column: "student_ID",
                principalTable: "Students",
                principalColumn: "student_ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentHistory_Students_student_ID",
                table: "StudentHistory");

            migrationBuilder.DropIndex(
                name: "IX_StudentHistory_student_ID",
                table: "StudentHistory");
        }
    }
}
