/****** Object:  Table [dbo].[CallVolume]    Script Date: 10-01-2024 21:24:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CallVolume](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[CallVolumeID] [nvarchar](128) NOT NULL,
	[CustomerName] [nvarchar](256) NULL,
	[PhoneNumber] [varchar](10) NULL,
	[Email] [nvarchar](128) NULL,
	[PAN] [nvarchar](50) NULL,
	[CardNumber] [nvarchar](20) NULL,
	[AccountNumber] [nvarchar](50) NULL,
	[OutStanding] [decimal](18, 0) NULL,
	[LastPaidDate] [datetime] NULL,
	[LastPaidAmount] [decimal](18, 0) NULL,
	[AllocatedTo] [int] NULL,
	[CreatedBy] [nvarchar](50) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](50) NOT NULL,
	[UpdateDate] [datetime] NOT NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_CallVolume] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


