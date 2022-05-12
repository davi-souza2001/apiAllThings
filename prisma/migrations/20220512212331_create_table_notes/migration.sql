-- CreateTable
CREATE TABLE "notes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "idPage" INTEGER NOT NULL,
    CONSTRAINT "notes_idPage_fkey" FOREIGN KEY ("idPage") REFERENCES "pages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
