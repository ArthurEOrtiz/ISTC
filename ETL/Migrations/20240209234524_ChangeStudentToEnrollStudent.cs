using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ETL.Migrations
{
    public partial class ChangeStudentToEnrollStudent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseHistory_Students_student_ID",
                table: "CourseHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_EnrollContact_Students_student_ID",
                table: "EnrollContact");

            migrationBuilder.DropForeignKey(
                name: "FK_EnrollHistory_Students_student_ID",
                table: "EnrollHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_EnrollInfo_Students_student_ID",
                table: "EnrollInfo");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.RenameColumn(
                name: "student_ID",
                table: "EnrollInfo",
                newName: "enroll_student_ID");

            migrationBuilder.RenameIndex(
                name: "IX_EnrollInfo_student_ID",
                table: "EnrollInfo",
                newName: "IX_EnrollInfo_enroll_student_ID");

            migrationBuilder.RenameColumn(
                name: "student_ID",
                table: "EnrollHistory",
                newName: "enroll_student_ID");

            migrationBuilder.RenameIndex(
                name: "IX_EnrollHistory_student_ID",
                table: "EnrollHistory",
                newName: "IX_EnrollHistory_enroll_student_ID");

            migrationBuilder.RenameColumn(
                name: "student_ID",
                table: "EnrollContact",
                newName: "enroll_student_ID");

            migrationBuilder.RenameIndex(
                name: "IX_EnrollContact_student_ID",
                table: "EnrollContact",
                newName: "IX_EnrollContact_enroll_student_ID");

            migrationBuilder.RenameColumn(
                name: "student_ID",
                table: "CourseHistory",
                newName: "enroll_student_ID");

            migrationBuilder.RenameIndex(
                name: "IX_CourseHistory_student_ID",
                table: "CourseHistory",
                newName: "IX_CourseHistory_enroll_student_ID");

            migrationBuilder.CreateTable(
                name: "EnrollStudents",
                columns: table => new
                {
                    enroll_student_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    first_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    last_name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnrollStudents", x => x.enroll_student_ID);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_CourseHistory_EnrollStudents_enroll_student_ID",
                table: "CourseHistory",
                column: "enroll_student_ID",
                principalTable: "EnrollStudents",
                principalColumn: "enroll_student_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EnrollContact_EnrollStudents_enroll_student_ID",
                table: "EnrollContact",
                column: "enroll_student_ID",
                principalTable: "EnrollStudents",
                principalColumn: "enroll_student_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EnrollHistory_EnrollStudents_enroll_student_ID",
                table: "EnrollHistory",
                column: "enroll_student_ID",
                principalTable: "EnrollStudents",
                principalColumn: "enroll_student_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EnrollInfo_EnrollStudents_enroll_student_ID",
                table: "EnrollInfo",
                column: "enroll_student_ID",
                principalTable: "EnrollStudents",
                principalColumn: "enroll_student_ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseHistory_EnrollStudents_enroll_student_ID",
                table: "CourseHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_EnrollContact_EnrollStudents_enroll_student_ID",
                table: "EnrollContact");

            migrationBuilder.DropForeignKey(
                name: "FK_EnrollHistory_EnrollStudents_enroll_student_ID",
                table: "EnrollHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_EnrollInfo_EnrollStudents_enroll_student_ID",
                table: "EnrollInfo");

            migrationBuilder.DropTable(
                name: "EnrollStudents");

            migrationBuilder.RenameColumn(
                name: "enroll_student_ID",
                table: "EnrollInfo",
                newName: "student_ID");

            migrationBuilder.RenameIndex(
                name: "IX_EnrollInfo_enroll_student_ID",
                table: "EnrollInfo",
                newName: "IX_EnrollInfo_student_ID");

            migrationBuilder.RenameColumn(
                name: "enroll_student_ID",
                table: "EnrollHistory",
                newName: "student_ID");

            migrationBuilder.RenameIndex(
                name: "IX_EnrollHistory_enroll_student_ID",
                table: "EnrollHistory",
                newName: "IX_EnrollHistory_student_ID");

            migrationBuilder.RenameColumn(
                name: "enroll_student_ID",
                table: "EnrollContact",
                newName: "student_ID");

            migrationBuilder.RenameIndex(
                name: "IX_EnrollContact_enroll_student_ID",
                table: "EnrollContact",
                newName: "IX_EnrollContact_student_ID");

            migrationBuilder.RenameColumn(
                name: "enroll_student_ID",
                table: "CourseHistory",
                newName: "student_ID");

            migrationBuilder.RenameIndex(
                name: "IX_CourseHistory_enroll_student_ID",
                table: "CourseHistory",
                newName: "IX_CourseHistory_student_ID");

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    student_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    first_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    last_name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.student_ID);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_CourseHistory_Students_student_ID",
                table: "CourseHistory",
                column: "student_ID",
                principalTable: "Students",
                principalColumn: "student_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EnrollContact_Students_student_ID",
                table: "EnrollContact",
                column: "student_ID",
                principalTable: "Students",
                principalColumn: "student_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EnrollHistory_Students_student_ID",
                table: "EnrollHistory",
                column: "student_ID",
                principalTable: "Students",
                principalColumn: "student_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EnrollInfo_Students_student_ID",
                table: "EnrollInfo",
                column: "student_ID",
                principalTable: "Students",
                principalColumn: "student_ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
