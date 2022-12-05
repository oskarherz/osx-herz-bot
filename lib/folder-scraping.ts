import fs from "fs";
import path from "path";

import { Express } from "express";

import { ActionHandler, ActionHandlerProps, looksLikeActionHandler } from "./action-handler";

function tryGettingHandlersFromFolder(dirPath: string): Record<string, ActionHandler<ActionHandlerProps>> {
  const handlersFound: Record<string, ActionHandler<ActionHandlerProps>> = {};

  fs.readdirSync(dirPath)
    .filter(file => !!file.match(/-handler(\.(js|ts)|\..*\.(js|ts))$/))
    .forEach(file => {
      const pathToFile = path.join(dirPath, file);
      try {
        const { default: handler } = require(pathToFile);
        if (looksLikeActionHandler(handler)) {
          if (handler.props.active !== false) {
            handlersFound[file] = handler;
          }
        }
      } catch (e: unknown) { }
    });

  return handlersFound;
}


type Options = { dirPath: string, log?: { onInit?: boolean}; routePrefix?: string };
export function registerHandlersFromFolder(app: Express, options: Options): Express {

  function log(handlers: Record<string, ActionHandler>): void {
    const handlerNames = Object.keys(handlers);
    const heading = `Successfully loaded ${handlerNames.length} handler${handlerNames.length === 1 ? "" : "s"}:`;
    const body = handlerNames.map(handlerName => `  -> ${handlerName}`).join("\n");
    console.log(`- "registerHandlersFromFolder" ----------`);
    console.log(`\n${heading}\n\n${body}\n`);
    console.log(`-----------------------------------------`);
  }
  
  const handlers = tryGettingHandlersFromFolder(options.dirPath);
  if (options.log?.onInit) { log(handlers); }
  
  Object
    .values(handlers)
    .forEach(handler => {
      const [keyword, ...aliases] = handler.props.keywords;
      app.get(`${options.routePrefix ?? ""}${keyword}`, handler);
      aliases.forEach(alias => {
        app.get(`${options.routePrefix ?? ""}${alias}`, (_, res) => { res.redirect(`../${alias}`); });
      });
  });

  return app;
}
