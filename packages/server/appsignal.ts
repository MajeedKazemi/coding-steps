import { Appsignal } from "@appsignal/nodejs";

import env from "./utils/env";

export const appSignal = new Appsignal({
    active: true,
    name: "coding-steps",
    pushApiKey: env.APP_SIGNAL_KEY,
});
