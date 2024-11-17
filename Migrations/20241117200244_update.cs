using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hihihiha.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Capmus",
                table: "Capmus");

            migrationBuilder.RenameTable(
                name: "Capmus",
                newName: "Campus");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Campus",
                table: "Campus",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Campus",
                table: "Campus");

            migrationBuilder.RenameTable(
                name: "Campus",
                newName: "Capmus");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Capmus",
                table: "Capmus",
                column: "Id");
        }
    }
}
