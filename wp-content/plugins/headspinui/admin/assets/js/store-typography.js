document.addEventListener( 'alpine:init', () => {
	Alpine.store( 'typography', {
		onLineHeightPresetChange( index ) {},
		onFontSizePresetChange( preset ) {
			var o = preset.toLowerCase();
			var {
				activeLock,
				typographyMinFont,
				typographyMaxFont,
				typographyMinScale,
				typographyMaxScale,
			} = Alpine.store( 'pd' );
			if ( o == 'custom' ) return;
			var select = this.fontSizePresets[ o ];
			Alpine.store( 'pd' ).activeLock = select.activeLock;
			Alpine.store( 'pd' ).typographyMinFont = select.minFont;
			Alpine.store( 'pd' ).typographyMaxFont = select.maxFont;
			Alpine.store( 'pd' ).typographyMinScale = select.minScale;
			Alpine.store( 'pd' ).typographyMaxScale = select.maxScale;
		

			headspinRegenerate();
		},
		onLineHeightPresetChange( preset ) {
			var o = preset.toLowerCase();
			var lh = Alpine.store( 'pd' ).typographyLineHeight;
			if ( o == 'custom' ) return;
			var select = Alpine.store( 'typography' ).lineHeiightPresets[ o ];
			lh[ 0 ] = select.px;
			lh[ 1 ] = select.ex;
		},
		fontSizePresets: {
			xxs: {
				minScale: '1.125',
				maxScale: '1.200',
				minFont: 16,
				maxFont: 16,
				activeLock: 5,
			},
			xs: {
				minScale: '1.125',
				maxScale: '1.250',
				minFont: 16,
				maxFont: 16,
				activeLock: 5,
			},
			s: {
				minScale: '1.200',
				maxScale: '1.333',
				minFont: 16,
				maxFont: 16,
				activeLock: 4,
			},
			m: {
				minScale: '1.250',
				maxScale: '1.333',
				minFont: 16,
				maxFont: 18,
				activeLock: 4,
			},
			l: {
				minScale: '1.250',
				maxScale: '1.414',
				minFont: 18,
				maxFont: 18,
				activeLock: 4,
			},
			xl: {
				minScale: '1.333',
				maxScale: '1.500',
				minFont: 18,
				maxFont: 20,
				activeLock: 3,
			},
			xxl: {
				minScale: '1.333',
				maxScale: '1.618',
				minFont: 18,
				maxFont: 20,
				activeLock: 3,
			},
		},
		lineHeiightPresets: {
			xxs: {
				px: 6,
				ex: 1.75,
			},
			xs: {
				px: 6,
				ex: 1.85,
			},
			s: {
				px: 4,
				ex: 2,
			},
			m: {
				px: 6,
				ex: 2,
			},
			l: {
				px: 6,
				ex: 2.1,
			},
			xl: {
				px: 8,
				ex: 2.15,
			},
			xxl: {
				px: 10,
				ex: 2.2,
			},
		},
		prefix: '--hsf-',
		generated: false,
		formulaVW: '100*(y2-y1) / (x2-x1)',
		formulaREM: '(xy1*y2 - x2*y1) / root*(x1 - x2)',
		containerQueryUnit: 'cqi',
		prototype: { min: 40, v: 3, r: 2, slope: 4, max: 60 },
		smallSteps: 1,
		breakpoints: [ 479, 767, 1023, 1119 ],
		lineHeight: 'calc(2px + 2ex + 2px)',
		largeSteps: 0,
		tablePreview: 'table',
		previewContainer: 1366,
		baseFontSize: 16,
		method: 'clamp',
		activeScale: '1.250',
		minFontSize: 16,
		maxFontSize: 18,
		minViewport: 479,
		maxViewport: 1119,
		minDefaultScale: '1.125',
		maxDefaultScale: '1.125',
		minCustomScale: false,
		maxCustomScale: false,
		minScale: '1.125',
		maxScale: '1.333',

		activeLock: 4,
		locks: {
			H6: 6,
			H5: 5,
			H4: 4,
			H3: 3,
		},
		lockSelectors: [ 'h6, h5, h4, h3', 'h6, h5, h4', 'h6, h5', 'h6' ],
		extraSteps: 0,
		output: [],
		preview: [],
		typoSelectors: [],
		codeRoot: '',
		codeFluidCQ: '',
	} );
} );
