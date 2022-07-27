export type RGBColor = {
  r: number;
  g: number;
  b: number;
}

export function getRelativeLuminance({ r, g, b } : RGBColor): number {
  // From https://www.w3.org/TR/WCAG20/#relativeluminancedef

  const RsRGB = r / 255;
  const GsRGB = g / 255;
  const BsRGB = b / 255;
  console.log();
  let R, G, B;

  if (RsRGB <= 0.03928) R = RsRGB / 12.92;
  else R = ((RsRGB + 0.055) / 1.055) ** 2.4;

  if (GsRGB <= 0.03928) G = GsRGB / 12.92;
  else G = ((GsRGB + 0.055) / 1.055) ** 2.4;

  if (BsRGB <= 0.03928) B = BsRGB / 12.92;
  else B = ((BsRGB + 0.055) / 1.055) ** 2.4;

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * It returns the contrast between two colors.
 * @param {RGBColor} colorA - RGBColor, colorB: RGBColor, precise = false
 * @param {RGBColor} colorB - RGBColor,
 * @param [precise=false] - boolean - If true, the contrast will be returned
 * as a float. If false, the contrast will be returned as a string, with 2 decimals.
 */
export function getContrastBetween(colorA: RGBColor, colorB: RGBColor, precise = false): string | number {
  // From https://medium.muz.li/the-science-of-color-contrast-an-expert-designers-guide-33e84c41d156#553f
  const [L1, L2] = [
    getRelativeLuminance(colorA),
    getRelativeLuminance(colorB),
  ].sort((a, b) => b - a);
  const contrast = (L1 + 0.05) / (L2 + 0.05);
  if(precise) return contrast
  const str = contrast.toString()
  if(contrast >= 10) return str.slice(0,5)
  return str.slice(0,4)
}

export default getContrastBetween