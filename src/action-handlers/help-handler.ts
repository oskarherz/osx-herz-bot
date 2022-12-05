import { ResultAction } from "../actions";
import { ActionHandler } from "../../lib/action-handler";

export const HelpHandler: () => ActionHandler = () => {
  return (req, res) => {

    const routes: string[] = [];

    const resultAction = ResultAction({
      action: "help",
      prompt: routes.join("\n")
    });

    res.send(resultAction);
  };
};