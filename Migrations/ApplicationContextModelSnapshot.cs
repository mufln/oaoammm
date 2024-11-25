﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using hihihiha.Context;

#nullable disable

namespace hihihiha.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("hihihiha.Models.Campus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<int>("AffiliationId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Campus");
                });

            modelBuilder.Entity("hihihiha.Models.Class", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Hours")
                        .HasColumnType("integer");

                    b.Property<int?>("LecturerId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<int>("SlotType")
                        .HasColumnType("integer");

                    b.Property<int>("SpecialtyId")
                        .HasColumnType("integer");

                    b.Property<int[]>("Terms")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.HasKey("Id");

                    b.HasIndex("LecturerId");

                    b.HasIndex("SpecialtyId");

                    b.ToTable("Classes");
                });

            modelBuilder.Entity("hihihiha.Models.Database.Elective", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AffiliationId")
                        .HasColumnType("integer");

                    b.Property<int>("CampusId")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AffiliationId");

                    b.HasIndex("CampusId");

                    b.ToTable("Electives");
                });

            modelBuilder.Entity("hihihiha.Models.Database.ElectiveMembers", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ElectiveId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ElectiveId");

                    b.HasIndex("UserId");

                    b.ToTable("ElectiveMembers");
                });

            modelBuilder.Entity("hihihiha.Models.Database.Exercise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("LecturerId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("RepoLink")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("StudentId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("LecturerId");

                    b.HasIndex("StudentId");

                    b.ToTable("Exercises");
                });

            modelBuilder.Entity("hihihiha.Models.Database.Gpa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<double>("Value")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Gpas");
                });

            modelBuilder.Entity("hihihiha.Models.Database.Specialty", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("InstitutId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("InstitutId");

                    b.ToTable("Specialty");
                });

            modelBuilder.Entity("hihihiha.Models.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Course")
                        .HasColumnType("integer");

                    b.Property<int>("InstitutId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<int>("SpecialtyId")
                        .HasColumnType("integer");

                    b.Property<int?>("TimeTableId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("InstitutId");

                    b.HasIndex("SpecialtyId");

                    b.HasIndex("TimeTableId");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("hihihiha.Models.Institut", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AffiliationId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("AffiliationId");

                    b.ToTable("Instituts");
                });

            modelBuilder.Entity("hihihiha.Models.Lecturer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int[]>("ClassesId")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<int>("HoursPerWeek")
                        .HasColumnType("integer");

                    b.Property<int?>("InstitutId")
                        .HasColumnType("integer");

                    b.Property<int>("InstitutionId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("InstitutId");

                    b.HasIndex("UserId");

                    b.ToTable("Lecturers");
                });

            modelBuilder.Entity("hihihiha.Models.Performance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Attendance")
                        .HasColumnType("integer");

                    b.Property<int>("Points")
                        .HasColumnType("integer");

                    b.Property<int>("TimeTableId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TimeTableId");

                    b.HasIndex("UserId");

                    b.ToTable("Performances");
                });

            modelBuilder.Entity("hihihiha.Models.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CampusId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("character varying(64)");

                    b.HasKey("Id");

                    b.HasIndex("CampusId");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("hihihiha.Models.TimeTable", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AffiliationId")
                        .HasColumnType("integer");

                    b.Property<int>("CampusId")
                        .HasColumnType("integer");

                    b.Property<int>("ClassId")
                        .HasColumnType("integer");

                    b.Property<int>("Day")
                        .HasColumnType("integer");

                    b.Property<int[]>("GroupIds")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<int>("LecturerId")
                        .HasColumnType("integer");

                    b.Property<int>("RoomId")
                        .HasColumnType("integer");

                    b.Property<int>("Slot")
                        .HasColumnType("integer");

                    b.Property<int>("SlotType")
                        .HasColumnType("integer");

                    b.Property<int>("Week")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AffiliationId");

                    b.HasIndex("CampusId");

                    b.HasIndex("ClassId");

                    b.HasIndex("LecturerId");

                    b.HasIndex("RoomId");

                    b.ToTable("TimeTables");
                });

            modelBuilder.Entity("hihihiha.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)");

                    b.Property<int>("GroupId")
                        .HasColumnType("integer");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("character varying(64)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("character varying(64)");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("hihihiha.Routers.Affiliate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Affiliates");
                });

            modelBuilder.Entity("hihihiha.Models.Class", b =>
                {
                    b.HasOne("hihihiha.Models.Lecturer", null)
                        .WithMany("Classes")
                        .HasForeignKey("LecturerId");

                    b.HasOne("hihihiha.Models.Database.Specialty", "Specialty")
                        .WithMany()
                        .HasForeignKey("SpecialtyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Specialty");
                });

            modelBuilder.Entity("hihihiha.Models.Database.Elective", b =>
                {
                    b.HasOne("hihihiha.Routers.Affiliate", "Affiliation")
                        .WithMany()
                        .HasForeignKey("AffiliationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("hihihiha.Models.Campus", "Campus")
                        .WithMany()
                        .HasForeignKey("CampusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Affiliation");

                    b.Navigation("Campus");
                });

            modelBuilder.Entity("hihihiha.Models.Database.ElectiveMembers", b =>
                {
                    b.HasOne("hihihiha.Models.Database.Elective", "Elective")
                        .WithMany()
                        .HasForeignKey("ElectiveId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("hihihiha.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Elective");

                    b.Navigation("User");
                });

            modelBuilder.Entity("hihihiha.Models.Database.Exercise", b =>
                {
                    b.HasOne("hihihiha.Models.Lecturer", "Lecturer")
                        .WithMany()
                        .HasForeignKey("LecturerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("hihihiha.Models.User", "Student")
                        .WithMany()
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Lecturer");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("hihihiha.Models.Database.Gpa", b =>
                {
                    b.HasOne("hihihiha.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("hihihiha.Models.Database.Specialty", b =>
                {
                    b.HasOne("hihihiha.Models.Institut", "Institut")
                        .WithMany()
                        .HasForeignKey("InstitutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Institut");
                });

            modelBuilder.Entity("hihihiha.Models.Group", b =>
                {
                    b.HasOne("hihihiha.Models.Institut", "Institut")
                        .WithMany()
                        .HasForeignKey("InstitutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("hihihiha.Models.Database.Specialty", "Specialty")
                        .WithMany()
                        .HasForeignKey("SpecialtyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("hihihiha.Models.TimeTable", null)
                        .WithMany("Groups")
                        .HasForeignKey("TimeTableId");

                    b.Navigation("Institut");

                    b.Navigation("Specialty");
                });

            modelBuilder.Entity("hihihiha.Models.Institut", b =>
                {
                    b.HasOne("hihihiha.Routers.Affiliate", "Affiliation")
                        .WithMany()
                        .HasForeignKey("AffiliationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Affiliation");
                });

            modelBuilder.Entity("hihihiha.Models.Lecturer", b =>
                {
                    b.HasOne("hihihiha.Models.Institut", "Institut")
                        .WithMany()
                        .HasForeignKey("InstitutId");

                    b.HasOne("hihihiha.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Institut");

                    b.Navigation("User");
                });

            modelBuilder.Entity("hihihiha.Models.Performance", b =>
                {
                    b.HasOne("hihihiha.Models.TimeTable", "TimeTable")
                        .WithMany()
                        .HasForeignKey("TimeTableId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("hihihiha.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TimeTable");

                    b.Navigation("User");
                });

            modelBuilder.Entity("hihihiha.Models.Room", b =>
                {
                    b.HasOne("hihihiha.Models.Campus", "Campus")
                        .WithMany()
                        .HasForeignKey("CampusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Campus");
                });

            modelBuilder.Entity("hihihiha.Models.TimeTable", b =>
                {
                    b.HasOne("hihihiha.Routers.Affiliate", "Affiliation")
                        .WithMany()
                        .HasForeignKey("AffiliationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("hihihiha.Models.Campus", "Campus")
                        .WithMany()
                        .HasForeignKey("CampusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("hihihiha.Models.Class", "Class")
                        .WithMany()
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("hihihiha.Models.Lecturer", "Lecturer")
                        .WithMany()
                        .HasForeignKey("LecturerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("hihihiha.Models.Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Affiliation");

                    b.Navigation("Campus");

                    b.Navigation("Class");

                    b.Navigation("Lecturer");

                    b.Navigation("Room");
                });

            modelBuilder.Entity("hihihiha.Models.User", b =>
                {
                    b.HasOne("hihihiha.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Group");
                });

            modelBuilder.Entity("hihihiha.Models.Lecturer", b =>
                {
                    b.Navigation("Classes");
                });

            modelBuilder.Entity("hihihiha.Models.TimeTable", b =>
                {
                    b.Navigation("Groups");
                });
#pragma warning restore 612, 618
        }
    }
}
