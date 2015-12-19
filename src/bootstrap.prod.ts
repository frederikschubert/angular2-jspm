import {enableProdMode} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS} from "angular2/router";
import {bootstrap} from "angular2/platform/browser";

import {App} from "./app/app";

enableProdMode();

bootstrap(App, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);