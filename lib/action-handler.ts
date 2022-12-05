import { Express, Request, Response } from "express";

export function WithProps(handler: ActionHandler, props: ActionHandlerProps) {
  const decoratedHandler = handler as ActionHandler<ActionHandlerProps>;
  decoratedHandler.props = props;
  return decoratedHandler;
}

export type ActionHandlerProps<T = {}> = T & {
  keywords: string[];
  active?: boolean;
};

export type ActionHandler<T extends ActionHandlerProps | undefined = undefined> =
  T extends ActionHandlerProps ? 
    ((req: Request, res: Response) => void) & { props: T }:
    ((req: Request, res: Response) => void);

export function looksLikeActionHandler<T extends ActionHandlerProps>(obj: unknown): obj is ActionHandler<T> {
  if (typeof obj === "function") {
    return obj.name.endsWith("Handler");
  }

  return false;
}

type HandlerConfig = {
  handler: ActionHandler;
  action: string;
};
export function registerHandler(app: Express, { action, handler }: HandlerConfig) {
  app.get(`/bot/actions/${action}`, handler);
}