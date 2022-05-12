/*
  Warnings:

  - The primary key for the `pages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `notes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "levelType" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    CONSTRAINT "pages_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pages" ("id", "idUser", "levelType", "name") SELECT "id", "idUser", "levelType", "name" FROM "pages";
DROP TABLE "pages";
ALTER TABLE "new_pages" RENAME TO "pages";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUser" TEXT,
    "description" TEXT
);
INSERT INTO "new_users" ("description", "email", "id", "imageUser", "name") SELECT "description", "email", "id", "imageUser", "name" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_notes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "idPage" TEXT NOT NULL,
    CONSTRAINT "notes_idPage_fkey" FOREIGN KEY ("idPage") REFERENCES "pages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_notes" ("content", "id", "idPage", "title", "type") SELECT "content", "id", "idPage", "title", "type" FROM "notes";
DROP TABLE "notes";
ALTER TABLE "new_notes" RENAME TO "notes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
