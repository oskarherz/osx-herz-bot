import { Express } from "express";
import { Server } from "http";

import { ActionHandler } from "../../lib/action-handler";
import { OptionsAction, SilentResultAction } from "../actions";


export const RestartServerHandler: (getServer: () => Server, app: Express) => ActionHandler =
  (server, app) => (req, res) => {

    // const restartServer = () => {
    //   const prompt = `Restarting Server... Bzzzt. 🤖`;
    //   console.log(prompt);
    //   res.send(ResultAction({ action: "restart", prompt }));
    //   server().close();
    //   server().listen(() => {
    //     console.log(`Restarted Server... Ding. 🤖`);
    //   });
    // };

    const userQuery = req.query.response as string | undefined;
    if (userQuery) {
      if (userQuery.toLowerCase() === "yes") {
        res.redirect("/bot/restart");
      } else {
        res.send(SilentResultAction());
      }
    } else {
      const optionsAction = OptionsAction({
        action: "restart",
        prompt: "What service's status do you want to check? 🤖",
        options: {
          "Exactly.": "yes",
          "Noooo...!": "no"
        }
      });
  
      res.send(optionsAction);
    }
  };