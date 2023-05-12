import { lerp, colorToCssHsl, colorToHex } from "./utils.js";

//  elements
const rootEl = document.documentElement;
// const textColor02El = document.getElementById("textColor02");
// const textColor03El = document.getElementById("textColor03");
// const textColor04El = document.getElementById("textColor04");
// const textColor05El = document.getElementById("textColor05");
// const colorInspectColor01LabelEl = document.getElementById(
//   "colorInspectColor01Label"
// );
// const colorInspectColor02LabelEl = document.getElementById(
//   "colorInspectColor02Label"
// );
// const colorInspectColor03LabelEl = document.getElementById(
//   "colorInspectColor03Label"
// );
// const colorInspectColor04LabelEl = document.getElementById(
//   "colorInspectColor04Label"
// );
// const colorInspectColor05LabelEl = document.getElementById(
//   "colorInspectColor05Label"
// );

//  functions
const getScreenSize = () => ({ w: window.innerWidth, h: window.innerHeight });

const updateColors = (e) => {
  const hasEvent = !!e;

  const mousePosRatio = {
    x: hasEvent ? e.clientX / screenSize.w : 0.5,
    y: hasEvent ? e.clientY / screenSize.h : 0.5,
  };

  //  generate colors
  const colors = {
    color01: {
      hue: lerp(mousePosRatio.x, 0, 360),
      saturation: 100,
      lightness: lerp(mousePosRatio.y, 0, 100),
    },

    color02: {
      hue: lerp((mousePosRatio.x + 0.5) % 1, 0, 360),
      saturation: 100,
      lightness: lerp((mousePosRatio.y + 0.5) % 1, 0, 100),
    },

    color03: {
      hue: lerp(mousePosRatio.x, 0, 360),
      saturation: 100,
      lightness: lerp((mousePosRatio.y + 0.5) % 1, 25, 75),
    },

    color04: {
      hue: lerp((mousePosRatio.x + 0.5) % 1, 0, 360),
      saturation: 50,
      lightness: lerp((mousePosRatio.y + 0.5) % 1, 25, 75),
    },

    color05: {
      hue: lerp((mousePosRatio.x + 0.5) % 1, 0, 360),
      saturation: 50,
      lightness: lerp((mousePosRatio.y + 0.5) % 1, 50, 100),
    },
  };

  const blendingMode = mousePosRatio.y > 0.5 ? "multiply" : "screen";
  console.log(blendingMode);
  //  update DOM
  rootEl.style.setProperty("--color01", colorToCssHsl(colors.color01));
  rootEl.style.setProperty("--color02", colorToCssHsl(colors.color02));
  // rootEl.style.setProperty(
  //   "--color02-alpha20",
  //   colorToCssHsl({ ...colors.color02, alpha: 0.2 })
  // );
  rootEl.style.setProperty("--color03", colorToCssHsl(colors.color03));
  rootEl.style.setProperty("--color04", colorToCssHsl(colors.color04));
  rootEl.style.setProperty("--color05", colorToCssHsl(colors.color05));
  rootEl.style.setProperty("--img-blending-mode", blendingMode);

  // textColor02El.innerHTML = colorToHex(colors.color02);
  // textColor03El.innerHTML = colorToHex(colors.color03);
  // textColor04El.innerHTML = colorToHex(colors.color04);
  // textColor05El.innerHTML = colorToHex(colors.color05);

  // colorInspectColor01LabelEl.innerHTML = colorToHex(colors.color01);
  // colorInspectColor02LabelEl.innerHTML = colorToHex(colors.color02);
  // colorInspectColor03LabelEl.innerHTML = colorToHex(colors.color03);
  // colorInspectColor04LabelEl.innerHTML = colorToHex(colors.color04);
  // colorInspectColor05LabelEl.innerHTML = colorToHex(colors.color05);
};

const setIsActive = (v) => {
  isActive = v;

  if (isActive) {
    rootEl.classList.add("active");
  } else {
    rootEl.classList.remove("active");
  }
};

const toggleActive = (e) => {
  setIsActive(!isActive);
  if (isActive) updateColors(e);
};

//  event listeners
addEventListener("resize", () => (screenSize = getScreenSize()));
addEventListener("click", toggleActive);
addEventListener("mousemove", (e) => {
  if (!isActive) return;

  //throttle the updates, no need to update faster than the frame rate
  if (!isUpdating) {
    requestAnimationFrame(() => {
      updateColors(e);
      isUpdating = false;
    });
  }
  isUpdating = true;
});

//  init
let screenSize, isActive, isUpdating;

function startColorMixer() {
  screenSize = getScreenSize();
  isUpdating = false;
  setIsActive(false);
  updateColors();
}

export { startColorMixer };
