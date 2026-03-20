import { applyUtilities, createComponent, initEngine as baseInitEngine } from "./src/core/engine.js";
import { initTalwinder, registerComponents } from "./src/components/registerComponents.js";

export function initEngine() {
  registerComponents();
  baseInitEngine();
}

export { applyUtilities, createComponent, initTalwinder, registerComponents };
