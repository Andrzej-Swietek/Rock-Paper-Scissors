-- CreateTable
CREATE TABLE "users" (
    "_uuid" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verificationCode" TEXT NOT NULL,
    "verifiedAt" DATETIME,
    "isVerified" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("_uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "rocks" INTEGER NOT NULL,
    "papers" INTEGER NOT NULL,
    "scissors" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "games" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "exp" INTEGER NOT NULL,
    CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("_uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserStats_id_key" ON "UserStats"("id");
