using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hihihiha.Migrations
{
    /// <inheritdoc />
    public partial class namerefactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CapmusId",
                table: "TimeTables",
                newName: "CampusId");

            migrationBuilder.RenameColumn(
                name: "terms",
                table: "Classes",
                newName: "Terms");

            migrationBuilder.RenameColumn(
                name: "hours",
                table: "Classes",
                newName: "Hours");

            migrationBuilder.CreateIndex(
                name: "IX_Users_GroupId",
                table: "Users",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Groups_GroupId",
                table: "Users",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Roles_RoleId",
                table: "Users",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Groups_GroupId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Roles_RoleId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_GroupId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_RoleId",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "CampusId",
                table: "TimeTables",
                newName: "CapmusId");

            migrationBuilder.RenameColumn(
                name: "Terms",
                table: "Classes",
                newName: "terms");

            migrationBuilder.RenameColumn(
                name: "Hours",
                table: "Classes",
                newName: "hours");
        }
    }
}
