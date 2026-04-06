import {
    generateRadixColors,
    getColorScaleCss,
    getBackgroundColorCss,
  } from "radix-theme-generator";
import { apcach, crToBgBlack, crToBg, crToFg, maxChroma, setContrast, setChroma, setHue, cssToApcach, apcachToCss } from "apcach";

  
//https://github.com/antiflasher/apcach
window.HUI = {}
window.HUI.generateRadixColors = generateRadixColors;
window.HUI['apcach'] = apcach;
window.HUI['crToBgBlack'] = crToBgBlack;
window.HUI['crToBg'] = crToBg;
window.HUI['crToFg'] = crToFg;
window.HUI['maxChroma'] = maxChroma;
window.HUI['setContrast'] = setContrast;

window.HUI['setChroma'] = setChroma;
window.HUI['setHue'] = setHue;
window.HUI['cssToApcach'] = cssToApcach;

window.HUI['apcachToCss'] = apcachToCss;

/*
Generates desired contrast
var bg = "red";
var clr = HUI.apcachToCss(HUI.apcach(HUI.crToBg(bg, 5, "wcag","auto"), 0, 145, "srgb"), "hex")
console.log(clr)
chroma.contrast(bg,clr)

*/