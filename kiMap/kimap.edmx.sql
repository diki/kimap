
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, and Azure
-- --------------------------------------------------
-- Date Created: 04/15/2012 19:30:18
-- Generated from EDMX file: C:\Users\dkc\documents\visual studio 2010\Projects\kiMap\kiMap\kimap.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [kiks];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_ServiceItemServiceItemMapping]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ServiceItemMappingSet] DROP CONSTRAINT [FK_ServiceItemServiceItemMapping];
GO
IF OBJECT_ID(N'[dbo].[FK_ServiceItemServiceItemMapping1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ServiceItemMappingSet] DROP CONSTRAINT [FK_ServiceItemServiceItemMapping1];
GO
IF OBJECT_ID(N'[dbo].[FK_ServiceItemEntryTypeServiceItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ServiceItemSet] DROP CONSTRAINT [FK_ServiceItemEntryTypeServiceItem];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[ServiceItemSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ServiceItemSet];
GO
IF OBJECT_ID(N'[dbo].[ServiceItemMappingSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ServiceItemMappingSet];
GO
IF OBJECT_ID(N'[dbo].[ServiceItemEntryTypeSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ServiceItemEntryTypeSet];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'ServiceItemSet'
CREATE TABLE [dbo].[ServiceItemSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Sentence] nvarchar(255)  NOT NULL,
    [EntryTypeId] int  NOT NULL,
    [ServiceItemEntryType_Id] int  NOT NULL
);
GO

-- Creating table 'ServiceItemMappingSet'
CREATE TABLE [dbo].[ServiceItemMappingSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [ParentId] int  NOT NULL,
    [ChildId] int  NOT NULL,
    [ServiceItem_Id] int  NOT NULL,
    [ServiceItem_1_Id] int  NOT NULL
);
GO

-- Creating table 'ServiceItemEntryTypeSet'
CREATE TABLE [dbo].[ServiceItemEntryTypeSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Caption] nvarchar(max)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'ServiceItemSet'
ALTER TABLE [dbo].[ServiceItemSet]
ADD CONSTRAINT [PK_ServiceItemSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ServiceItemMappingSet'
ALTER TABLE [dbo].[ServiceItemMappingSet]
ADD CONSTRAINT [PK_ServiceItemMappingSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ServiceItemEntryTypeSet'
ALTER TABLE [dbo].[ServiceItemEntryTypeSet]
ADD CONSTRAINT [PK_ServiceItemEntryTypeSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [ServiceItem_Id] in table 'ServiceItemMappingSet'
ALTER TABLE [dbo].[ServiceItemMappingSet]
ADD CONSTRAINT [FK_ServiceItemServiceItemMapping]
    FOREIGN KEY ([ServiceItem_Id])
    REFERENCES [dbo].[ServiceItemSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ServiceItemServiceItemMapping'
CREATE INDEX [IX_FK_ServiceItemServiceItemMapping]
ON [dbo].[ServiceItemMappingSet]
    ([ServiceItem_Id]);
GO

-- Creating foreign key on [ServiceItem_1_Id] in table 'ServiceItemMappingSet'
ALTER TABLE [dbo].[ServiceItemMappingSet]
ADD CONSTRAINT [FK_ServiceItemServiceItemMapping1]
    FOREIGN KEY ([ServiceItem_1_Id])
    REFERENCES [dbo].[ServiceItemSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ServiceItemServiceItemMapping1'
CREATE INDEX [IX_FK_ServiceItemServiceItemMapping1]
ON [dbo].[ServiceItemMappingSet]
    ([ServiceItem_1_Id]);
GO

-- Creating foreign key on [ServiceItemEntryType_Id] in table 'ServiceItemSet'
ALTER TABLE [dbo].[ServiceItemSet]
ADD CONSTRAINT [FK_ServiceItemEntryTypeServiceItem]
    FOREIGN KEY ([ServiceItemEntryType_Id])
    REFERENCES [dbo].[ServiceItemEntryTypeSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ServiceItemEntryTypeServiceItem'
CREATE INDEX [IX_FK_ServiceItemEntryTypeServiceItem]
ON [dbo].[ServiceItemSet]
    ([ServiceItemEntryType_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------