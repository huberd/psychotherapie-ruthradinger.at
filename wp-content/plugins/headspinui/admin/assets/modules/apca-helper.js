import {
	APCAcontrast,
	reverseAPCA,
	sRGBtoY,
	displayP3toY,
	adobeRGBtoY,
	alphaBlend,
	calcAPCA,
	fontLookupAPCA,
} from './apca-v3.js';
document.addEventListener( 'DOMContentLoaded', function () {
	window.headspinChromaLc = function ( textColor, backgroundColor ) {
		let textColor_rgba = chroma( textColor ).rgba();
		let backgroundColor_rgba = chroma( backgroundColor ).rgba();
		let Lc = APCAcontrast(
			sRGBtoY( textColor_rgba ),
			sRGBtoY( backgroundColor_rgba )
		);
		return Math.abs( Lc );
	};
} );
