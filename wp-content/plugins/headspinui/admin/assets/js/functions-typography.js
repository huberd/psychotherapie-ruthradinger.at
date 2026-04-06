'use strict';
window.headspin = {};

headspin.generate = function () {
	generateTypography();
};

/************** */
function generateTypography() {
	var errors = [];
	var cssVar = [];
	var cssRule;
	var cqRule;
	var font = '';
	Alpine.store( 'typography' ).preview = [];
	Alpine.store( 'typography' ).output = [];
	var hx = 6;
	const {
		typographyMinFont,
		typographyMaxFont,
		minViewport,
		maxViewport,
		typographyMinScale,
		typographyMaxScale,
		activeLock,
		baseFontSize,
	} = Alpine.store( 'pd' );
	const { smallSteps, largeSteps, breakpoints, output } =
		Alpine.store( 'typography' );
	var n = 0;

	/*This is text fluid typography*/
	for ( var i = -1; i < 2; i++ ) {
		let ymin,
			ymax,
			min,
			r,
			v,
			max,
			n,
			f = 3;

		if ( i < 0 ) {
			cssVar.push( '--hfs-text-s' );
			font = 's';
			ymin =
				typographyMinFont * Math.pow( Number( typographyMinScale ), i );
			ymax =
				typographyMaxFont * Math.pow( Number( typographyMaxScale ), i );
			if ( ymin < 14 ) ymin = 14;
			if ( ymax < 14 ) ymax = 14;
			min = ymax / baseFontSize;
			max = ymin / baseFontSize;
		} else {
			if ( i == 0 ) {
				cssVar.push( '--hfs-text-m' );
				font = 'm';
			}
			if ( i == 1 ) {
				cssVar.push( '--hfs-text-l' );
				font = 'l';
			}
			ymin =
				typographyMinFont * Math.pow( Number( typographyMinScale ), i );
			ymax =
				typographyMaxFont * Math.pow( Number( typographyMaxScale ), i );
			min = ymin / baseFontSize;
			max = ymax / baseFontSize;
		}

		v = 100 * ( ( ymax - ymin ) / ( maxViewport - minViewport ) );
		r =
			( minViewport * ymax - maxViewport * ymin ) /
			( ( minViewport - maxViewport ) * baseFontSize );

		min = min.toFixed( f );
		v = v.toFixed( f );
		r = r.toFixed( f );
		max = max.toFixed( f );
		cssRule = `clamp(${ min }rem, ${ r }rem + ${ v }vw, ${ max }rem)`;
		cqRule = `clamp(${ min }rem, ${ r }rem + ${ v }cqi, ${ max }rem)`;
		output.push( {
			min: min,
			font: font,
			type: 'size',
			category: 'text size',
			max: max,
			v: v,
			r: r,
			cssVars: cssVar,
			cssRule: cssRule,
			cqRule: cqRule,
		} );
		document.documentElement.style.setProperty(
			'--preview' + cssVar,
			cqRule
		);
		cssVar = [];
		font = '';
		generateTypographyPreviewTable( min, max, r, v );
	}

	/* Non working part */

	for ( var i = 0; i < 6 + 1; i++ ) {
		let ymin,
			ymax,
			min,
			r,
			v,
			max,
			f = 3;
		font = 'H' + hx;

		if ( 6 - i > activeLock ) {
			n = 0;
		} else {
			n++;
		}
		cssVar.push( `--hfs-h${ hx }` );
		ymin = typographyMinFont * Math.pow( Number( typographyMinScale ), n );
		ymax = typographyMaxFont * Math.pow( Number( typographyMaxScale ), n );
		min = ymin / baseFontSize;
		max = ymax / baseFontSize;
		v = 100 * ( ( ymax - ymin ) / ( maxViewport - minViewport ) );
		r =
			( minViewport * ymax - maxViewport * ymin ) /
			( ( minViewport - maxViewport ) * baseFontSize );

		/* Round numbers to f decimals */
		min = min.toFixed( f );
		v = v.toFixed( f );
		r = r.toFixed( f );
		max = max.toFixed( f );
		cssRule = `clamp(${ min }rem, ${ r }rem + ${ v }vw, ${ max }rem)`;
		cqRule = `clamp(${ min }rem, ${ r }rem + ${ v }cqi, ${ max }rem)`;
		output.push( {
			min: min,
			font: font,
			type: 'size',
			category: 'heading size',
			max: max,
			v: v,
			r: r,
			cssVars: cssVar,
			cssRule: cssRule,
			cqRule: cqRule,
		} );
		document.documentElement.style.setProperty(
			'--preview' + cssVar,
			cqRule
		);

		cssVar = [];
		hx--;
		generateTypographyPreviewTable( min, max, r, v );
		//generateRootTypography();
	}

	generateTypographyPreviewSelectors();
}

function generateTypographyPreviewTable( min, max, r, v ) {
	let computed, p, x, y, z;
	const {
		typographyMinFont,
		typographyMaxFont,
		minViewport,
		maxViewport,
		typographyMinScale,
		typographyMaxScale,
		activeLock,
		baseFontSize,
	} = Alpine.store( 'pd' );
	const { smallSteps, largeSteps, breakpoints } =
		Alpine.store( 'typography' );
	const store = Alpine.store( 'typography' ).preview;
	breakpoints[ 0 ] = Alpine.store( 'pd' ).minViewport;
	breakpoints[ breakpoints.length - 1 ] = Alpine.store( 'pd' ).maxViewport;
	x = max * baseFontSize;
	y = min * baseFontSize;
	z = r * baseFontSize;
	breakpoints.forEach( ( b ) => {
		if ( Number(b) >= maxViewport ) {
			p = x;
			store.push( Math.round( p ) );
		
		} else if ( Number(b) <= Number(minViewport) ) {
			p = y;
			store.push( Math.round( p ) );
		
		} else {
	
			computed = ( v / 100 ) * b + z;
			p = computed;
			store.push( Math.round( p ) );
		
		}
	} );
}
function generateTypographyPreviewSelectors() {
	var { activeLock } = Alpine.store( 'pd' );
	var { typoSelectors } = Alpine.store( 'typography' );

	Alpine.store( 'typography' ).typoSelectors = [];
	Alpine.store( 'typography' ).typoSelectors.push( 'Text Small' );
	Alpine.store( 'typography' ).typoSelectors.push( 'Text Normal' );
	Alpine.store( 'typography' ).typoSelectors.push( 'Text Big' );
	Alpine.store( 'typography' ).typoSelectors.push( 'H6' );
	Alpine.store( 'typography' ).typoSelectors.push( 'H5' );
	Alpine.store( 'typography' ).typoSelectors.push( 'H4' );
	Alpine.store( 'typography' ).typoSelectors.push( 'H3' );
	Alpine.store( 'typography' ).typoSelectors.push( 'H2' );
	Alpine.store( 'typography' ).typoSelectors.push( 'H1' );
	Alpine.store( 'typography' ).typoSelectors.push( 'H0' );
}
function validateTypographyInputs( errArray ) {
	// returns array of errors or empty array
	const {
		typographyMinFont,
		typographyMaxFont,
		minViewport,
		maxViewport,
		typographyMinScale,
		typographyMaxScale,
		activeLock,
		smallSteps,
		largeSteps,
		baseFontSize,
		breakpoints,
	} = Alpine.store( 'typography' );

	if ( typographyMinFont > typographyMaxFont )
		errArray.push( 'Min Font Size is greater than Max Font Size' );
	if ( typographyMinFont > typographyMaxFont )
		errArray.push( 'Min Font Size is greater than Max Font Size' );
	return errArray;
}
function generateRootTypography() {
	const { codeRoot } = Alpine.store( 'typography' );
}
function roundNumber( params ) {}
window.preventNonNumericalInput = function ( e ) {
	e.target.value = e.target.value
		.replace( /[^0-9.]/g, '' )
		.replace( /(\..*?)\..*/g, '$1' );
};
