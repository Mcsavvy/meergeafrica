/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const next = require("next");

const dev = false;
const port = process.env.PORT || 3000;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log("> MODE: ", dev ? "Development" : "Production");
    console.log(`> Ready on http://localhost:${port}`);
  });
});
