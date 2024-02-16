using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Conquer.Models.Domain;

public partial class ConquerContext : DbContext
{
    public ConquerContext()
    {
    }

    public ConquerContext(DbContextOptions<ConquerContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CallVolume> CallVolumes { get; set; }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-IGJ0C36\\SQLEXPRESS;Database=Conquer;Trusted_Connection=True;TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CallVolume>(entity =>
        {
            entity.ToTable("CallVolume");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AccountNumber).HasMaxLength(50);
            entity.Property(e => e.AllocatedTo).HasMaxLength(128);
            entity.Property(e => e.CallVolumeId)
                .HasMaxLength(128)
                .HasColumnName("CallVolumeID");
            entity.Property(e => e.CardNumber).HasMaxLength(20);
            entity.Property(e => e.CreatedBy).HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.CustomerName).HasMaxLength(256);
            entity.Property(e => e.Email).HasMaxLength(128);
            entity.Property(e => e.LastPaidAmount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.LastPaidDate).HasColumnType("datetime");
            entity.Property(e => e.OutStanding).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Pan)
                .HasMaxLength(50)
                .HasColumnName("PAN");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedBy).HasMaxLength(50);
        });

        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.CompanyId).HasName("PK__Company__2D971CAC39A2DC01");

            entity.ToTable("Company");

            entity.Property(e => e.CompanyId).ValueGeneratedNever();
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.ParentCompany).WithMany(p => p.InverseParentCompany)
                .HasForeignKey(d => d.ParentCompanyId)
                .HasConstraintName("FK__Company__ParentC__398D8EEE");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Role");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Name).HasMaxLength(128);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.CreatedBy).HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(128);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(256);
            entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedBy).HasMaxLength(50);
            entity.Property(e => e.UserId)
                .HasMaxLength(128)
                .HasColumnName("UserID");
            entity.Property(e => e.UserName).HasMaxLength(256);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_User_Role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
