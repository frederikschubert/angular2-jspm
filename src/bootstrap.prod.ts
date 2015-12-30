import {enableProdMode} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {PROVIDERS} from "./providers";

import {App} from "./app/app";

enableProdMode();

bootstrap(App, PROVIDERS);