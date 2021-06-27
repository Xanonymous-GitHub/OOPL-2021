import {c as r} from "./container.ts.8e3ebc7f.js";
import {c as e} from "./command.ts.dbf1f3a4.js";
import {c as s} from "./sprite.ts.18f96a33.js";
import {c} from "./texture.ts.09f43082.js";
import {c as t} from "./controllers.ts.8762d6d4.js";
import {c as o} from "./screen.ts.f386c096.js";
import {c as i} from "./scanner.ts.8ab03c82.js";
import {c as m} from "./builder.ts.0cad9750.js";

const createServices = () => ({
  containerService: r(),
  commandService: e(),
  spriteService: s(),
  textureService: c(),
  controllerService: t(),
  screenService: o(),
  scannerService: i(),
  builderService: m()
});
export {createServices as c};
