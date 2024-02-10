-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tokens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_revoked" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("_uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tokens" ("created_at", "id", "token", "userId") SELECT "created_at", "id", "token", "userId" FROM "tokens";
DROP TABLE "tokens";
ALTER TABLE "new_tokens" RENAME TO "tokens";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
