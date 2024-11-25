using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hihihiha.Migrations
{
    /// <inheritdoc />
    public partial class Exercises : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RepoLink",
                table: "Exercises",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RepoLink",
                table: "Exercises");
        }
    }
}
