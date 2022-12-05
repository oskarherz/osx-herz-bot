import { ResultAction, OptionsAction } from "../actions";
import { ActionHandler } from "../../lib/action-handler";

type UserResponse = `option-${1 | 2 | 3}`;

export const OptionsHandler: ActionHandler = (req, res) => {
  const userResponse = req.query.response as UserResponse;
  if (userResponse) {
    const predefinedResponses: Record<UserResponse, string> = {
      "option-1": "You picked 1, a very wise choice indeed... 🤖",
      "option-2": "You picked 2, quite the interesting choice... 🤖",
      "option-3": "You picked 3, a very obvious choice... 🤖",
    };
  
    const response = ResultAction({
      action: "options",
      format: "plain",
      prompt: predefinedResponses[userResponse]
    });

    res.send(response);
  } else {
    const optionsAction: OptionsAction = OptionsAction({
      prompt: "Yeeeet, select an option! 🤖",
      action: "options",
      options: {
        "Option 1": "option-1",
        "Option 2": "option-2",
        "Option 3": "option-3"
      }
    });

    res.send(optionsAction);
  }
};