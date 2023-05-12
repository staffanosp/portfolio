import { lerp } from "./utils.js";

function startParallax() {
  const parallaxCouples = [
    ...document.querySelectorAll("[data-parallax-factor]"),
  ].map((parallaxWrapperElement) => ({
    parallaxWrapperElement,
    parallaxAnchorElement:
      parallaxWrapperElement.closest("[data-parallax-anchor]") ||
      parallaxWrapperElement,
  }));

  function updateParallaxPositions() {
    for (let parallaxCouple of parallaxCouples) {
      const { parallaxWrapperElement, parallaxAnchorElement } = parallaxCouple;

      const parallaxFactor = Number(
        parallaxWrapperElement.getAttribute("data-parallax-factor")
      );

      const parallaxElement = parallaxWrapperElement.firstElementChild;
      const parallaxElementRect = parallaxElement.getBoundingClientRect();

      const parallaxAnchorElementRect =
        parallaxAnchorElement.getBoundingClientRect();

      const anchorRatioX =
        (parallaxAnchorElementRect.x + parallaxAnchorElementRect.width / 2) /
        window.innerWidth;

      const anchorRatioY =
        (parallaxAnchorElementRect.y + parallaxAnchorElementRect.height / 2) /
        window.innerHeight;

      //calculate delta
      const maxDx = window.innerWidth * (parallaxFactor - 1);
      const dx = lerp(anchorRatioX, (maxDx / 2) * -1, maxDx / 2);

      const maxDy = window.innerHeight * (parallaxFactor - 1);
      const dy = lerp(anchorRatioY, (maxDy / 2) * -1, maxDy / 2);

      //   const parallaxDx = window.innerWidth * (parallaxFactor - 1);

      //   const dx = lerp(posRatio, (parallaxDx / 2) * -1, parallaxDx / 2);

      parallaxElement.style.transform = `translate(${dx}px, ${dy}px)`;

      // parallaxElement.innerHTML = parallaxElement.getBoundingClientRect().x;
      // console.log(rect.x);
    }
  }

  // Event based solution
  addEventListener("scroll", () => {
    requestAnimationFrame(() => updateParallaxPositions());
  });

  addEventListener("resize", () => {
    requestAnimationFrame(() => updateParallaxPositions());
  });

  //frame based solution
  // function frame() {
  //   updateParallaxPositions();
  //   requestAnimationFrame(frame);
  // }
  // frame();

  //init
  updateParallaxPositions();
}

export { startParallax };
