import { Action } from "../../lib/action";

export interface PromptAction extends Action {
  type: "prompt";
}

export function PromptAction(params: Omit<PromptAction, "type">): PromptAction {
  return { type: "prompt", ...params };
}

export function isPromptAction(action: Action): action is PromptAction {
  return action.type === "prompt";
}