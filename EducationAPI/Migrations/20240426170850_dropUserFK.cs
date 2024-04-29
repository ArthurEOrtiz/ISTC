using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EducationAPI.Migrations
{
    public partial class dropUserFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Users_user_id",
                table: "Exams");

            migrationBuilder.DropIndex(
                name: "IX_Exams_user_id",
                table: "Exams");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Exams_user_id",
                table: "Exams",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Users_user_id",
                table: "Exams",
                column: "user_id",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
