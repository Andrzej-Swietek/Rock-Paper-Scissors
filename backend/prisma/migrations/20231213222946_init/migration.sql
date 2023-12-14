-- CreateTable
CREATE TABLE "OAuthClient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientID" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "redirectUri" TEXT NOT NULL,
    "grants" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,
    CONSTRAINT "OAuthClient_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "users" ("_uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OAuthAccessToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accessToken" TEXT NOT NULL,
    "accessTokenExpiresAt" DATETIME NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "refreshTokenExpiresAt" DATETIME NOT NULL,
    "scope" TEXT NOT NULL,
    "userUUID" TEXT NOT NULL,
    "clientID" INTEGER NOT NULL,
    CONSTRAINT "OAuthAccessToken_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "users" ("_uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OAuthAccessToken_clientID_fkey" FOREIGN KEY ("clientID") REFERENCES "OAuthClient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OAuthCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorizationCode" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "scope" TEXT NOT NULL,
    "userUUID" TEXT NOT NULL,
    "clientID" INTEGER NOT NULL,
    CONSTRAINT "OAuthCode_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "users" ("_uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OAuthCode_clientID_fkey" FOREIGN KEY ("clientID") REFERENCES "OAuthClient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuthClient_id_key" ON "OAuthClient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccessToken_id_key" ON "OAuthAccessToken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthCode_id_key" ON "OAuthCode"("id");
