/****** Object:  Table [dbo].[Company]    Script Date: 11-01-2024 23:43:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Company](
	[CompanyId] [int] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[ParentCompanyId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[CompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Company]  WITH CHECK ADD FOREIGN KEY([ParentCompanyId])
REFERENCES [dbo].[Company] ([CompanyId])
GO


