import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS} from "angular2/router";

import {App} from "./app/app";

System.import("//localhost:4412/ng2-hot-loader")
  .then((module:any) => {
    module.ng2HotLoaderBootstrap(App, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
  });