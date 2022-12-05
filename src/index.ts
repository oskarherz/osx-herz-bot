import path from "path";
import express from "express";

import { PromptAction } from "./actions/prompt-action";
import { registerHandlersFromFolder } from "../lib/folder-scraping";


const app = express();
const port = process.env.PORT ?? 8008;

const handlersPath = path.join(__dirname, "handlers/");
registerHandlersFromFolder(app, {
  dirPath: handlersPath,
  log: { onInit: true },
  routePrefix: "/bot/actions/"
});

app.get("/bot", (_, res) => {
  const helloAction = PromptAction({
    action: "hello",
    prompt: "Hey, I'm Oskar's bot! How can I assist you? 🤖"
  });
  
  res.send(helloAction);
});

app.listen(port, () => {
  console.log(`Bot listening on port ${port}. 🤖`);
});

// app.get("/bot/restart", () => {
//   function removeMiddlewares(routes: any[]) {
//     routes.forEach((route: any, i: number) => {
//       if (route.handle.props) {
//         routes.splice(i, 1);
//         if (route.route) {
//           removeMiddlewares(route.route.stack);
//         }
//       }
//     });
//   }

//   var routes = app._router.stack;
//   removeMiddlewares(routes);
// });