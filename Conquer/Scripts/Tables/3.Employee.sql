/****** Object:  Table [dbo].[Employee]    Script Date: 11-01-2024 23:23:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Employee](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [nvarchar](128) NOT NULL,
	[UserID] [bigint] NOT NULL,
	[FirstName] [nvarchar](128) NULL,
	[LastName] [nvarchar](128) NULL,
	[Email] [nvarchar](128) NULL,
	[CreatedBy] [nvarchar](50) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](50) NOT NULL,
	[UpdateDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [FK_Employee_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [FK_Employee_User]
GO


