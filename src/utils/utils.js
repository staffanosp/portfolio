const lerp = (x, v0, v1) => v0 + x * (v1 - v0);

const luminance = (r, g, b) => {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const colorContrast = (color1luminance, color2luminance) => {
  return color1luminance > color2luminance
    ? (color2luminance + 0.05) / (color1luminance + 0.05)
    : (color1luminance + 0.05) / (color2luminance + 0.05);
};

const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return {
    r: 255 * f(0),
    g: 255 * f(8),
    b: 255 * f(4),
  };
};

const hslToHex = (h, s, l) => {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, "0");
  g = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, "0");
  b = Math.round((b + m) * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${r}${g}${b}`;
};

const colorToCssHsl = ({ hue, saturation, lightness, alpha }) =>
  `hsl(${hue} ${saturation}% ${lightness}%${
    alpha !== undefined ? ` / ${alpha}` : ""
  })`;

const colorToHex = ({ hue, saturation, lightness }) =>
  hslToHex(hue, saturation, lightness);

const colorToRgb = ({ hue, saturation, lightness }) =>
  hslToRgb(hue, saturation, lightness);

const colorsContrast = (color01, color02) => {
  const color01rgb = hslToRgb(
    color01.hue,
    color01.saturation,
    color01.lightness
  );
  const color02rgb = hslToRgb(
    color02.hue,
    color02.saturation,
    color02.lightness
  );

  const color01luminance = luminance(color01rgb.r, color01rgb.g, color01rgb.b);
  const color02luminance = luminance(color02rgb.r, color02rgb.g, color02rgb.b);

  return colorContrast(color01luminance, color02luminance);
};

export { lerp, colorToCssHsl, colorToHex, colorToRgb, colorsContrast };
