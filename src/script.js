import { startColorMixer } from "./utils/colorMixer.js";
import { startParallax } from "./utils/parallax.js";
import { lerp } from "./utils/utils.js";

//hack to prevent click on links to start the color generator
document
  .querySelectorAll("a")
  .forEach((element) =>
    element.addEventListener("click", (e) => e.stopPropagation())
  );

startParallax();
startColorMixer();
