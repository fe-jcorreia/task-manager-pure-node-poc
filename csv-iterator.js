import { parse } from "csv-parse";
import fs from "node:fs";
import { finished } from "node:stream/promises";

(async () => {
  const parser = fs
    .createReadStream("./file.csv")
    .pipe(parse({ columns: true }));

  parser.on("readable", async function () {
    let record;
    while ((record = parser.read()) !== null) {
      await fetch("http://localhost:3333/tasks", {
        method: "POST",
        body: Buffer.from(JSON.stringify(Object.assign(record))),
        duplex: "half",
      }).then((response) => {
        response.text().then((data) => console.log(data));
      });
    }
  });

  await finished(parser);
})();
