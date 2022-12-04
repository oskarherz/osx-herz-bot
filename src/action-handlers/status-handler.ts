import { fetch } from "cross-fetch";

import { OptionsAction, ResultAction } from "../actions";
import { ActionHandler } from "./action-handler";


export const StatusHandler: ActionHandler = async (req, res) => {

  const SERVICES = {
    "homeserver": "http://192.168.178.2",
    "google": "https://www.google.com"
  } as const;
  
  const userQuery = req.query.response as string;
  if (userQuery) {

    const serviceOnline = await checkStatusForService(userQuery, SERVICES);
    const prompt = getPromptForStatus(userQuery, serviceOnline);

    const statusAction = ResultAction({
      action: "status",
      prompt
    });

    res.send(statusAction);

  } else {
    const optionsAction = OptionsAction({
      action: "status",
      prompt: "What service's status do you want to check? 🤖",
      options: {
        "Homeserver": "homeserver",
        "Google": "google"
      }
    });

    res.send(optionsAction);
  }
};

async function checkStatusForService(serviceName: string, services: Record<string, string>): Promise<boolean | null> {
  if (!(serviceName in services)) {
    return null;
  }
  
  try {
    const { status } = await fetch(services[serviceName]);
    return status < 300;
  } catch (e: unknown) {
    return false;
  }
}

function getPromptForStatus(serviceName: string, status: boolean | null): string {
  switch (status) {
    case null: return `Service "" could not been found! 🤖`;
    case true: return `Service "${serviceName}" is online! 🤖`;
    case false: return `Service "${serviceName}" appears to be offline! 🤖`;
  }
}