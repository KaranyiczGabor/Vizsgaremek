using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizAPI.Migrations
{
    /// <inheritdoc />
    public partial class UserTrack2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "attempts",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_attempts_UserId",
                table: "attempts",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_attempts_user_UserId",
                table: "attempts",
                column: "UserId",
                principalTable: "user",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_attempts_user_UserId",
                table: "attempts");

            migrationBuilder.DropIndex(
                name: "IX_attempts_UserId",
                table: "attempts");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "attempts");
        }
    }
}
