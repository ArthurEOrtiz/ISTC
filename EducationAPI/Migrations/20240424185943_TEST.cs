using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EducationAPI.Migrations
{
    public partial class TEST : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WaitLists_Users_user_id",
                table: "WaitLists");

            migrationBuilder.DropIndex(
                name: "IX_WaitLists_user_id",
                table: "WaitLists");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_WaitLists_user_id",
                table: "WaitLists",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_WaitLists_Users_user_id",
                table: "WaitLists",
                column: "user_id",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
