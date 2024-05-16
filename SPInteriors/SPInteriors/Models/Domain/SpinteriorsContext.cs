using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SPInteriors.Models.Domain;

public partial class SpinteriorsContext : DbContext
{
    public SpinteriorsContext()
    {
    }

    public SpinteriorsContext(DbContextOptions<SpinteriorsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<DesignType> DesignTypes { get; set; }

    public virtual DbSet<DucoPaintType> DucoPaintTypes { get; set; }

    public virtual DbSet<Hardware> Hardwares { get; set; }

    public virtual DbSet<HouseType> HouseTypes { get; set; }

    public virtual DbSet<LaminateType> LaminateTypes { get; set; }

    public virtual DbSet<MaterialType> MaterialTypes { get; set; }

    public virtual DbSet<OuterFrameType> OuterFrameTypes { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<Quotation> Quotations { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    public virtual DbSet<RoomType> RoomTypes { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<VwProject> VwProjects { get; set; }

    public virtual DbSet<VwRoom> VwRooms { get; set; }

    public virtual DbSet<VwWorkOrder> VwWorkOrders { get; set; }

    public virtual DbSet<WorkOrder> WorkOrders { get; set; }

    public virtual DbSet<WorkOrderItem> WorkOrderItems { get; set; }

    public virtual DbSet<WorkOrderType> WorkOrderTypes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("name=SqlConnectionString");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Client>(entity =>
        {
            entity.ToTable("Client");

            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.MobileNumber).HasMaxLength(12);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<DesignType>(entity =>
        {
            entity.ToTable("DesignType");

            entity.Property(e => e.Name).HasMaxLength(100);

            entity.HasOne(d => d.WorkOrderItem).WithMany(p => p.DesignTypes)
                .HasForeignKey(d => d.WorkOrderItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DesignType_WorkOrderItem");
        });

        modelBuilder.Entity<DucoPaintType>(entity =>
        {
            entity.ToTable("DucoPaintType");

            entity.Property(e => e.Name).HasMaxLength(500);
        });

        modelBuilder.Entity<Hardware>(entity =>
        {
            entity.ToTable("Hardware");

            entity.Property(e => e.Name).HasMaxLength(500);
        });

        modelBuilder.Entity<HouseType>(entity =>
        {
            entity.ToTable("HouseType");

            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<LaminateType>(entity =>
        {
            entity.ToTable("LaminateType");

            entity.Property(e => e.Name).HasMaxLength(500);
        });

        modelBuilder.Entity<MaterialType>(entity =>
        {
            entity.ToTable("MaterialType");

            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<OuterFrameType>(entity =>
        {
            entity.ToTable("OuterFrameType");

            entity.Property(e => e.Name).HasMaxLength(500);
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.ToTable("Project");

            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Quotation>(entity =>
        {
            entity.ToTable("Quotation");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Name).HasMaxLength(100);

            entity.HasOne(d => d.Project).WithMany(p => p.Quotations)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Quotation_Project");
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.ToTable("Room");

            entity.Property(e => e.Name).HasMaxLength(250);

            entity.HasOne(d => d.Project).WithMany(p => p.Rooms)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Room_Project");
        });

        modelBuilder.Entity<RoomType>(entity =>
        {
            entity.ToTable("RoomType");

            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.ToTable("Status");

            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ResoUser");

            entity.ToTable("User");

            entity.Property(e => e.Email).HasMaxLength(128);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.LastLoginDate).HasColumnType("datetime");
            entity.Property(e => e.Password).HasMaxLength(128);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.Property(e => e.UserName).HasMaxLength(128);
        });

        modelBuilder.Entity<VwProject>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vwProjects");

            entity.Property(e => e.ClientName).HasMaxLength(100);
            entity.Property(e => e.HouseType).HasMaxLength(100);
            entity.Property(e => e.MaterialType).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.OuterFrameType).HasMaxLength(500);
            entity.Property(e => e.Status).HasMaxLength(100);
        });

        modelBuilder.Entity<VwRoom>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vwRooms");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.MaterialType).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(250);
            entity.Property(e => e.OuterFrameType).HasMaxLength(500);
            entity.Property(e => e.ProjectName).HasMaxLength(100);
        });

        modelBuilder.Entity<VwWorkOrder>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vwWorkOrders");

            entity.Property(e => e.DesignType).HasMaxLength(500);
            entity.Property(e => e.Height).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.MaterialType).HasMaxLength(500);
            entity.Property(e => e.Name).HasMaxLength(500);
            entity.Property(e => e.OuterFrameType).HasMaxLength(500);
            entity.Property(e => e.Room).HasMaxLength(250);
            entity.Property(e => e.Width).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.WorkOrderItem).HasMaxLength(100);
            entity.Property(e => e.WorkOrderType).HasMaxLength(500);
        });

        modelBuilder.Entity<WorkOrder>(entity =>
        {
            entity.ToTable("WorkOrder");

            entity.Property(e => e.DesignType).HasMaxLength(500);
            entity.Property(e => e.Height).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.MaterialType).HasMaxLength(500);
            entity.Property(e => e.Name).HasMaxLength(500);
            entity.Property(e => e.OuterFrameType).HasMaxLength(500);
            entity.Property(e => e.Width).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.WorkOrderType).HasMaxLength(500);

            entity.HasOne(d => d.Room).WithMany(p => p.WorkOrders)
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WorkOrder_Room");

            entity.HasOne(d => d.WorkOrderItem).WithMany(p => p.WorkOrders)
                .HasForeignKey(d => d.WorkOrderItemId)
                .HasConstraintName("FK_WorkOrder_WorkOrderItem");
        });

        modelBuilder.Entity<WorkOrderItem>(entity =>
        {
            entity.ToTable("WorkOrderItem");

            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<WorkOrderType>(entity =>
        {
            entity.ToTable("WorkOrderType");

            entity.Property(e => e.Name).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
