-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "levelType" TEXT NOT NULL,
    "idUser" INTEGER NOT NULL,
    CONSTRAINT "pages_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pages" ("id", "idUser", "levelType", "name") SELECT "id", "idUser", "levelType", "name" FROM "pages";
DROP TABLE "pages";
ALTER TABLE "new_pages" RENAME TO "pages";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
