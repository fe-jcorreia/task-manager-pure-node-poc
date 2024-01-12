import fs from "node:fs/promises";

const databasePath = new URL("db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((file) => (this.#database = JSON.parse(file)))
      .catch(() => this.#persist());
  }

  #persist() {
    fs.writeFile("db.json", JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table];

    return data ?? [];
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
  }

  update(table, id, data) {
    if (Array.isArray(this.#database[table])) {
      const index = this.#database[table].findIndex((row) => row.id === id);

      if (index > -1) {
        this.#database[table][index] = {
          ...this.#database[table][index],
          ...data,
          updatedAt: new Date(),
        };
        this.#persist();
      }
    }
  }

  delete(table, id) {
    if (Array.isArray(this.#database[table])) {
      const index = this.#database[table].findIndex((row) => row.id === id);

      if (index > -1) {
        this.#database[table].splice(index, 1);
        this.#persist();
      }
    }
  }
}
