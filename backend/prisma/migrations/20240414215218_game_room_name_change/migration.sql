/*
  Warnings:

  - You are about to drop the `GameRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "GameRoom_roomId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GameRoom";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "gameRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomId" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "_uuid" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verificationCode" TEXT NOT NULL,
    "verifiedAt" DATETIME,
    "isVerified" BOOLEAN NOT NULL,
    "gameRoomId" INTEGER,
    CONSTRAINT "users_gameRoomId_fkey" FOREIGN KEY ("gameRoomId") REFERENCES "gameRoom" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("_uuid", "email", "gameRoomId", "isVerified", "password", "username", "verificationCode", "verifiedAt") SELECT "_uuid", "email", "gameRoomId", "isVerified", "password", "username", "verificationCode", "verifiedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "gameRoom_roomId_key" ON "gameRoom"("roomId");
