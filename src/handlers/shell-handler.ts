import { exec } from "child_process";

import { ResultAction } from "../actions";
import { PromptAction } from "../actions/prompt-action";
import { ActionHandler, WithProps } from "../../lib/action-handler";


export const ShellHandler: ActionHandler = async (req, res) => {
  
  const userQuery = req.query.response as string;
  if (userQuery) {

    /* This is sooooo fcking usafe right here: */
    const commandResult = await runShellCommand(userQuery);
    const nextPrompt = PromptAction({
      action: "shell",
      prompt: commandResult
    });

    res.send(nextPrompt);

  } else {
    const helpAction = ResultAction({
      action: "file",
      prompt: "For help on how to use the 'file-action', see the documentation."
    });

    res.send(helpAction);
  }
};

async function runShellCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error ?? stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

export default WithProps(ShellHandler, {
  keywords: ["shell", "sh"]
});