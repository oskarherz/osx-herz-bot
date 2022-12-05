import { ActionHandler, WithProps } from "../../lib/action-handler";

export const HelloHandler: ActionHandler = (req, res) => {
  const userQuery = req.query.response as string;

  const [command, ...params] = userQuery.split(" ");
  const response = encodeURIComponent(params.join(" "));

  res.redirect(`/bot/actions/${command}?response=${response}`);
};

export default WithProps(HelloHandler, {
  keywords: ["hello"]
});