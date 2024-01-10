import fs from "node:fs/promises";

export class Database {
  persist(data) {
    fs.writeFile("db.json", data);
  }

  select(table) {
    const data = fs.readFile("db.json");

    return data[table];
  }
}
