import { startParallax } from "./utils/parallax.js";
import { lerp } from "./utils/utils.js";

// addEventListener("scroll", () => {
//   requestAnimationFrame(() => updateWrapperXposX());
//   // updateWrapperXposX();
// });

function init() {
  updateWrapperYHeight();
}

// init();

//LAB

startParallax();
