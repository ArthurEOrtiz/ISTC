using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EducationAPI.Migrations
{
    public partial class RefactorTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classes_Courses_course_id",
                table: "Classes");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Location_location_id",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Topics_topic_id",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Contact_contact_id",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "Topics",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Topics",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "topic_ID",
                table: "Topics",
                newName: "TopicId");

            migrationBuilder.RenameColumn(
                name: "middle_name",
                table: "Students",
                newName: "MiddleName");

            migrationBuilder.RenameColumn(
                name: "mapping_certified",
                table: "Students",
                newName: "MappingCertified");

            migrationBuilder.RenameColumn(
                name: "last_name",
                table: "Students",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "first_name",
                table: "Students",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "contact_id",
                table: "Students",
                newName: "ContactId");

            migrationBuilder.RenameColumn(
                name: "appraisal_certified",
                table: "Students",
                newName: "AppraisalCertified");

            migrationBuilder.RenameColumn(
                name: "accumulated_credit",
                table: "Students",
                newName: "AccumulatedCredit");

            migrationBuilder.RenameColumn(
                name: "student_ID",
                table: "Students",
                newName: "StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_contact_id",
                table: "Students",
                newName: "IX_Students_ContactId");

            migrationBuilder.RenameColumn(
                name: "state",
                table: "Location",
                newName: "State");

            migrationBuilder.RenameColumn(
                name: "room",
                table: "Location",
                newName: "Room");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Location",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "postal_code",
                table: "Location",
                newName: "PostalCode");

            migrationBuilder.RenameColumn(
                name: "address_line_2",
                table: "Location",
                newName: "AddressLine2");

            migrationBuilder.RenameColumn(
                name: "address_line_1",
                table: "Location",
                newName: "AddressLine1");

            migrationBuilder.RenameColumn(
                name: "location_ID",
                table: "Location",
                newName: "LocationId");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "Courses",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Courses",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "topic_id",
                table: "Courses",
                newName: "TopicId");

            migrationBuilder.RenameColumn(
                name: "location_id",
                table: "Courses",
                newName: "LocationId");

            migrationBuilder.RenameColumn(
                name: "enrollment_deadline",
                table: "Courses",
                newName: "EnrollmentDeadline");

            migrationBuilder.RenameColumn(
                name: "completion_credit",
                table: "Courses",
                newName: "CompletionCredit");

            migrationBuilder.RenameColumn(
                name: "attendance_credit",
                table: "Courses",
                newName: "AttendanceCredit");

            migrationBuilder.RenameColumn(
                name: "course_ID",
                table: "Courses",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Courses_topic_id",
                table: "Courses",
                newName: "IX_Courses_TopicId");

            migrationBuilder.RenameIndex(
                name: "IX_Courses_location_id",
                table: "Courses",
                newName: "IX_Courses_LocationId");

            migrationBuilder.RenameColumn(
                name: "state",
                table: "Contact",
                newName: "State");

            migrationBuilder.RenameColumn(
                name: "phone",
                table: "Contact",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "Contact",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "postal_code",
                table: "Contact",
                newName: "Zip");

            migrationBuilder.RenameColumn(
                name: "address_line_2",
                table: "Contact",
                newName: "AddressLine2");

            migrationBuilder.RenameColumn(
                name: "address_line_1",
                table: "Contact",
                newName: "AddressLine1");

            migrationBuilder.RenameColumn(
                name: "contact_ID",
                table: "Contact",
                newName: "ContactId");

            migrationBuilder.RenameColumn(
                name: "schedule_start",
                table: "Classes",
                newName: "ScheduleStart");

            migrationBuilder.RenameColumn(
                name: "schedule_end",
                table: "Classes",
                newName: "ScheduleEnd");

            migrationBuilder.RenameColumn(
                name: "course_id",
                table: "Classes",
                newName: "CourseId");

            migrationBuilder.RenameColumn(
                name: "class_ID",
                table: "Classes",
                newName: "ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_Classes_course_id",
                table: "Classes",
                newName: "IX_Classes_CourseId");

            migrationBuilder.RenameColumn(
                name: "attended",
                table: "Attendance",
                newName: "Attended");

            migrationBuilder.RenameColumn(
                name: "attendance_ID",
                table: "Attendance",
                newName: "AttendanceId");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Students",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Students",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "remoteLink",
                table: "Location",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "LocationId",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CompletionCredit",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AttendanceCredit",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InstructorEmail",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "pdf",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Contact",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(15)",
                oldMaxLength: 15,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Contact",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ScheduleStart",
                table: "Classes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ScheduleEnd",
                table: "Classes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Classes_Courses_CourseId",
                table: "Classes",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "CourseId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Location_LocationId",
                table: "Courses",
                column: "LocationId",
                principalTable: "Location",
                principalColumn: "LocationId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Topics_TopicId",
                table: "Courses",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Contact_ContactId",
                table: "Students",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "ContactId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classes_Courses_CourseId",
                table: "Classes");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Location_LocationId",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Topics_TopicId",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Contact_ContactId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "remoteLink",
                table: "Location")
                .Annotation("SqlServer:IsTemporal", true)
                .Annotation("SqlServer:TemporalHistoryTableName", "LocationHistory")
                .Annotation("SqlServer:TemporalHistoryTableSchema", null);

            migrationBuilder.DropColumn(
                name: "InstructorEmail",
                table: "Courses")
                .Annotation("SqlServer:IsTemporal", true)
                .Annotation("SqlServer:TemporalHistoryTableName", "CoursesHistory")
                .Annotation("SqlServer:TemporalHistoryTableSchema", null);

            migrationBuilder.DropColumn(
                name: "pdf",
                table: "Courses")
                .Annotation("SqlServer:IsTemporal", true)
                .Annotation("SqlServer:TemporalHistoryTableName", "CoursesHistory")
                .Annotation("SqlServer:TemporalHistoryTableSchema", null);

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Topics",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Topics",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "TopicId",
                table: "Topics",
                newName: "topic_ID");

            migrationBuilder.RenameColumn(
                name: "MiddleName",
                table: "Students",
                newName: "middle_name");

            migrationBuilder.RenameColumn(
                name: "MappingCertified",
                table: "Students",
                newName: "mapping_certified");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Students",
                newName: "last_name");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Students",
                newName: "first_name");

            migrationBuilder.RenameColumn(
                name: "ContactId",
                table: "Students",
                newName: "contact_id");

            migrationBuilder.RenameColumn(
                name: "AppraisalCertified",
                table: "Students",
                newName: "appraisal_certified");

            migrationBuilder.RenameColumn(
                name: "AccumulatedCredit",
                table: "Students",
                newName: "accumulated_credit");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                table: "Students",
                newName: "student_ID");

            migrationBuilder.RenameIndex(
                name: "IX_Students_ContactId",
                table: "Students",
                newName: "IX_Students_contact_id");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "Location",
                newName: "state");

            migrationBuilder.RenameColumn(
                name: "Room",
                table: "Location",
                newName: "room");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Location",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "PostalCode",
                table: "Location",
                newName: "postal_code");

            migrationBuilder.RenameColumn(
                name: "AddressLine2",
                table: "Location",
                newName: "address_line_2");

            migrationBuilder.RenameColumn(
                name: "AddressLine1",
                table: "Location",
                newName: "address_line_1");

            migrationBuilder.RenameColumn(
                name: "LocationId",
                table: "Location",
                newName: "location_ID");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Courses",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Courses",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "TopicId",
                table: "Courses",
                newName: "topic_id");

            migrationBuilder.RenameColumn(
                name: "LocationId",
                table: "Courses",
                newName: "location_id");

            migrationBuilder.RenameColumn(
                name: "EnrollmentDeadline",
                table: "Courses",
                newName: "enrollment_deadline");

            migrationBuilder.RenameColumn(
                name: "CompletionCredit",
                table: "Courses",
                newName: "completion_credit");

            migrationBuilder.RenameColumn(
                name: "AttendanceCredit",
                table: "Courses",
                newName: "attendance_credit");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "Courses",
                newName: "course_ID");

            migrationBuilder.RenameIndex(
                name: "IX_Courses_TopicId",
                table: "Courses",
                newName: "IX_Courses_topic_id");

            migrationBuilder.RenameIndex(
                name: "IX_Courses_LocationId",
                table: "Courses",
                newName: "IX_Courses_location_id");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "Contact",
                newName: "state");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Contact",
                newName: "phone");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Contact",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "Zip",
                table: "Contact",
                newName: "postal_code");

            migrationBuilder.RenameColumn(
                name: "AddressLine2",
                table: "Contact",
                newName: "address_line_2");

            migrationBuilder.RenameColumn(
                name: "AddressLine1",
                table: "Contact",
                newName: "address_line_1");

            migrationBuilder.RenameColumn(
                name: "ContactId",
                table: "Contact",
                newName: "contact_ID");

            migrationBuilder.RenameColumn(
                name: "ScheduleStart",
                table: "Classes",
                newName: "schedule_start");

            migrationBuilder.RenameColumn(
                name: "ScheduleEnd",
                table: "Classes",
                newName: "schedule_end");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "Classes",
                newName: "course_id");

            migrationBuilder.RenameColumn(
                name: "ClassId",
                table: "Classes",
                newName: "class_ID");

            migrationBuilder.RenameIndex(
                name: "IX_Classes_CourseId",
                table: "Classes",
                newName: "IX_Classes_course_id");

            migrationBuilder.RenameColumn(
                name: "Attended",
                table: "Attendance",
                newName: "attended");

            migrationBuilder.RenameColumn(
                name: "AttendanceId",
                table: "Attendance",
                newName: "attendance_ID");

            migrationBuilder.AlterColumn<string>(
                name: "last_name",
                table: "Students",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "first_name",
                table: "Students",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<int>(
                name: "contact_id",
                table: "Students",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "location_id",
                table: "Courses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "completion_credit",
                table: "Courses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "attendance_credit",
                table: "Courses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "phone",
                table: "Contact",
                type: "nvarchar(15)",
                maxLength: 15,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "Contact",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "schedule_start",
                table: "Classes",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "schedule_end",
                table: "Classes",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddForeignKey(
                name: "FK_Classes_Courses_course_id",
                table: "Classes",
                column: "course_id",
                principalTable: "Courses",
                principalColumn: "course_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Location_location_id",
                table: "Courses",
                column: "location_id",
                principalTable: "Location",
                principalColumn: "location_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Topics_topic_id",
                table: "Courses",
                column: "topic_id",
                principalTable: "Topics",
                principalColumn: "topic_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Contact_contact_id",
                table: "Students",
                column: "contact_id",
                principalTable: "Contact",
                principalColumn: "contact_ID");
        }
    }
}
