using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ETL.Migrations
{
    public partial class AddContactInfoTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContactInfo",
                columns: table => new
                {
                    contact_info_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    student_ID = table.Column<int>(type: "int", nullable: false),
                    JobTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Employer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailAddr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddrStreet = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrSteNmbr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrCity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrState = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddrZip = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelAc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelPrfx = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelNmbr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FaxAc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FaxPrfx = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FaxNmbr = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactInfo", x => x.contact_info_ID);
                    table.ForeignKey(
                        name: "FK_ContactInfo_Students_student_ID",
                        column: x => x.student_ID,
                        principalTable: "Students",
                        principalColumn: "student_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContactInfo_student_ID",
                table: "ContactInfo",
                column: "student_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactInfo");
        }
    }
}
