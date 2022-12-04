import { ActionHandler } from "./action-handler";
import { OptionsAction, ResultAction, ResultActionFormat } from "../actions";


export const ShareShortcutHandler: ActionHandler = (req, res) => {

  const userResponse = req.query.response as ResultActionFormat | undefined;
  if (userResponse) {
    const resultAction = ResultAction({
      action: "share",
      format: userResponse,
      prompt: "https://www.icloud.com/shortcuts/599ae482082a4fad862225da3dd3ac1f"
    });

    res.send(resultAction);
  } else {
    const optionsAction = OptionsAction({
      action: "share",
      prompt: "How do you want to share the shortcut link? 🤖",
      options: {
        "Share...": "share",
        "Open in Browser": "url",
        "Show QR-Code": "qr-code",
      }
    });
  
    res.send(optionsAction);
  }
};