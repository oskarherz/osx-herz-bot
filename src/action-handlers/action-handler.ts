import { Express, Request, Response } from "express";

export type ActionHandler = (req: Request, res: Response) => void;

type HandlerConfig = {
  handler: ActionHandler;
  action: string;
};
export function registerHandler(app: Express, { action, handler }: HandlerConfig) {
  app.get(`/bot/actions/${action}`, handler);
}

export function registerHandlers(app: Express, configs: HandlerConfig[]) {
  configs.forEach(({ action, handler }) => app.get(`/bot/actions/${action}`, handler));
}