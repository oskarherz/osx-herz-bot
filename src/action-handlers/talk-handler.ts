import { ResultAction } from "../actions";
import { PromptAction } from "../actions/prompt-action";
import { ActionHandler } from "./action-handler";

export const TalkHandler: ActionHandler = (req, res) => {
  
  const userQuery = req.query.response as string;
  if (!userQuery) {
    const helloAction = PromptAction({
      action: "talk",
      prompt: "Alright, let's chat! 🤖"
    });
    
    res.send(helloAction);
  } else {
    const TERMINATION_WORDS = ["goodbye", "bye", "see you", "exit", "close"];
    if (TERMINATION_WORDS.includes(userQuery.toLowerCase())) {
      const goodbyeAction = ResultAction({
        action: "talk",
        prompt: "Alright, nice talking to ya! 🤖"
      });

      res.send(goodbyeAction);
    } else {
      const replyAction = PromptAction({
        action: "talk",
        prompt: `You said: "${userQuery}"! 🤖`
      });
      
      res.send(replyAction);
    }
  }
};