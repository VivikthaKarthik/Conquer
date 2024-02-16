/****** Object:  Table [dbo].[User]    Script Date: 11-01-2024 23:20:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[User](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [nvarchar](128) NOT NULL,
	[UserName] [nvarchar](256) NOT NULL,
	[Password] [nvarchar](256) NOT NULL,
	[Email] [nvarchar](128) NOT NULL,
	[RoleId] [bigint] NOT NULL,
	[CreatedBy] [nvarchar](50) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](50) NOT NULL,
	[UpdateDate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([ID])
GO

ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Role]
GO



IF NOT EXISTS (Select 1 From [User] Where UserName = 'VVR')
BEGIN
	Insert into [User] Values ('34b75d94-ce31-43cf-8143-04562fcbf468', 'VVR', '123', 'abc@xyz.com', 1, 'SYSTEM', GETDATE(), 'SYSTEM', GETDATE(), 1, 'Vamsi', 'Krishna' )
END
GO


