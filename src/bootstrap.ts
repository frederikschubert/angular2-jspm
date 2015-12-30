import {App} from "./app/app";
import {PROVIDERS} from "./providers";

System.import("//localhost:4412/ng2-hot-loader")
  .then((module:any) => {
    module.ng2HotLoaderBootstrap(App, PROVIDERS);
  });