using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizAPI.Migrations
{
    /// <inheritdoc />
    public partial class UserTrack : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "questions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false),
                    question = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    category = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    difficulty = table.Column<int>(type: "int(32)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false),
                    email = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "answers",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false),
                    question_id = table.Column<Guid>(type: "char(36)", nullable: false),
                    answer_text = table.Column<string>(type: "varchar(60)", maxLength: 60, nullable: false),
                    correct = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "answers_ibfk_1",
                        column: x => x.question_id,
                        principalTable: "questions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "attempts",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false),
                    uid = table.Column<Guid>(type: "char(36)", nullable: false),
                    score = table.Column<int>(type: "int(11)", nullable: false),
                    time = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "attempts_ibfk_1",
                        column: x => x.uid,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "question_id",
                table: "answers",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "uid",
                table: "attempts",
                column: "uid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "answers");

            migrationBuilder.DropTable(
                name: "attempts");

            migrationBuilder.DropTable(
                name: "questions");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
