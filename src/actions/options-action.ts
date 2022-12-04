import { Action } from "./action";

export interface OptionsAction extends Action {
  type: "options";
  options: Record<string, string>;
}

export function isOptionsAction(action: Action): action is OptionsAction {
  return action.type === "options";
}

export function OptionsAction(params: Omit<OptionsAction, "type">): OptionsAction {
  return { type: "options", ...params };
}