import { Action } from "./action";

export type ResultActionFormat = "plain" | "qr-code" | "share";
export interface ResultAction extends Action {
  type: "result";
  format?: ResultActionFormat;
}

export function ResultAction({ action, format = "plain", prompt }: Omit<ResultAction, "type">): ResultAction {
  return { type: "result", action, format, prompt };
}

export function isResultAction(action: Action): action is ResultAction {
  return action.type === "result";
}