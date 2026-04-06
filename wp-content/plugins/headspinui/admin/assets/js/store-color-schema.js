'use strict';
document.addEventListener( 'alpine:init', () => {
	Alpine.store( 'schema', {
		contrastWhite( color ) {
			return chroma
				.contrast(
					chroma( Alpine.store( 'appView' ).contrastColor ).hex(),
					color
				)
				.toFixed( 2 );
		},
		randomSlider() {},
	} );
} );
