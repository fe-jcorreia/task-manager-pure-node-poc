import { parse } from "csv-parse";
import fs from "node:fs";
import { finished } from "node:stream/promises";
import { Readable } from "node:stream";

class CreateCSVEntries extends Readable {
  _read() {
    let record;
    console.log("--------------------");
    while ((record = this.parser.read()) !== null) {
      console.log(record);
      this._postData(record);
    }
  }

  async _postData(record) {
    try {
      const response = await fetch("http://localhost:3333/tasks", {
        method: "POST",
        body: Buffer.from(JSON.stringify(Object.assign(record))),
        duplex: "half",
      }).then((response) => {
        response.text().then((data) => console.log(data));
      });

      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error("Error while posting data:", error);
    }
  }
}

(async () => {
  const parser = fs
    .createReadStream("./file.csv")
    .pipe(parse({ columns: true }))
    .pipe(new CreateCSVEntries());

  // parser.on("readable", async function () {
  //   let record;
  //   while ((record = parser.read()) !== null) {
  //     await fetch("http://localhost:3333/tasks", {
  //       method: "POST",
  //       body: Buffer.from(JSON.stringify(Object.assign(record))),
  //       duplex: "half",
  //     }).then((response) => {
  //       response.text().then((data) => console.log(data));
  //     });
  //   }
  // });

  await finished(parser);
})();
