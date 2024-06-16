-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(10),
    "avatar_url" TEXT NOT NULL,
    "profesion" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "skills" TEXT[],
    "descriptionLong" VARCHAR(80) NOT NULL,
    "about" VARCHAR(300) NOT NULL,
    "social" TEXT[],
    "workExperienceId" INTEGER,
    "ownerProjectId" INTEGER,
    "companyName" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "titleWork" VARCHAR(50) NOT NULL,
    "isCurrent" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(230) NOT NULL,
    "titleProject" VARCHAR(50) NOT NULL,
    "descriptionProject" VARCHAR(230) NOT NULL,
    "workSkills" TEXT[],
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example" (
    "id" SERIAL NOT NULL,
    "username" TEXT,

    CONSTRAINT "example_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_workExperienceId_key" ON "User"("workExperienceId");

-- CreateIndex
CREATE UNIQUE INDEX "User_ownerProjectId_key" ON "User"("ownerProjectId");
