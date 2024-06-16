-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(10) NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "profesion" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "skills" TEXT[],
    "descriptionLong" VARCHAR(80) NOT NULL,
    "about" VARCHAR(300) NOT NULL,
    "social" TEXT[],
    "workExperience" TEXT NOT NULL,
    "ownerProjectId" TEXT NOT NULL,
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
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "projectTitle" TEXT NOT NULL,
    "projectLocation" TEXT NOT NULL,
    "isProjectRemote" BOOLEAN NOT NULL DEFAULT false,
    "salaryRange" DECIMAL(65,30) NOT NULL,
    "isPayment" BOOLEAN NOT NULL DEFAULT false,
    "skills" TEXT[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
