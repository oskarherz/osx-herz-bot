import express from "express";

import { PromptAction } from "./actions/prompt-action";
import { registerHandlers } from "./action-handlers";

import { ShellHandler } from "./action-handlers/file-handler";
import { StatusHandler } from "./action-handlers/status-handler";
import { TalkHandler } from "./action-handlers/talk-handler";
import { ShareShortcutHandler } from "./action-handlers/share-shortcut-handler";
import { HelloHandler } from "./action-handlers/hello-handler";
import { HelpHandler } from "./action-handlers/help-handler";


const app = express();
const port = process.env.PORT ?? 8008;


app.get("/bot", (_, res) => {
  const helloAction = PromptAction({
    action: "hello",
    prompt: "Hey, I'm Oskar's bot! How can I assist you? 🤖"
  });
  
  res.send(helloAction);
});

/* Replace with folder listener! */
registerHandlers(app, [
  { action: "hello", handler: HelloHandler },
  { action: "help", handler: HelpHandler() },
  { action: "talk", handler: TalkHandler },
  { action: "shell", handler: ShellHandler },
  { action: "status", handler: StatusHandler },
  { action: "share", handler: ShareShortcutHandler },
]);

app.listen(port, () => {
  console.log(`Bot listening on port ${port}. 🤖`)
});
