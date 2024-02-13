-- CreateTable
CREATE TABLE "GameRoom" (
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
    CONSTRAINT "users_gameRoomId_fkey" FOREIGN KEY ("gameRoomId") REFERENCES "GameRoom" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("_uuid", "email", "isVerified", "password", "username", "verificationCode", "verifiedAt") SELECT "_uuid", "email", "isVerified", "password", "username", "verificationCode", "verifiedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "GameRoom_roomId_key" ON "GameRoom"("roomId");
