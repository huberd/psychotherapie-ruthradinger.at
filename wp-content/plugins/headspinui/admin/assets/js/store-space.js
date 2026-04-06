document.addEventListener( 'alpine:init', () => {
	Alpine.store( 'space', {
		previewSize( size ) {
			var preview = size * Alpine.store( 'project' ).baseFontSize;
			preview = preview.toFixed( 0 ) + 'px';
			return preview;
		},
		generateSectionSpacing() {
			const {
				spacingMinScale,
				spacingMaxScale,
				spacingMinFontSize,
				spacingMaxFontSize,
				smallSteps,
				largeSteps,
				boilerplate,
				generateSectionSpacingArray,
			} = Alpine.store( 'space' );
			const { minViewport, maxViewport } = Alpine.store( 'project' );
			var prefix = '';
			var cssRule, cqRule;
			Alpine.store( 'space' ).outputSection = [];
			for ( var i = 0 - smallSteps; i < 0; i++ ) {
				var N = Math.abs( i ) - 1;
				var buffer = '';
				for ( var n = 0; n < N; n++ ) {
					buffer = buffer + 'x';
				}
				prefix = buffer + 's';

				generateSectionSpacingArray( i, buffer, prefix, 'small', true );
			}
			generateSectionSpacingArray( 0, '', 'm', 'medium', false );
			prefix = '';
			for ( var i = 1; i < largeSteps + 1; i++ ) {
				var N = Math.abs( i ) - 1;
				var buffer = '';
				for ( var n = 0; n < N; n++ ) {
					buffer = buffer + 'x';
				}
				prefix = buffer + 'l';
				generateSectionSpacingArray(
					i,
					buffer,
					prefix,
					'large',
					false
				);
			}
		},
		generateSectionSpacingArray( i, step, prefix, name, swap ) {
			var _push;
			const f = 2;
			const {
				spacingMinScale,
				spacingMaxScale,
				spacingMinFontSize,
				spacingMaxFontSize,
				spacingMinSectionMultiplier,
				spacingMaxSectionMultiplier,
			} = Alpine.store( 'pd' );
			const {
				smallSteps,
				largeSteps,
				boilerplate,
				sectionMinMultiplier,
				sectionMaxMultiplier,
			} = Alpine.store( 'space' );
			const { minViewport, maxViewport, baseFontSize } =
				Alpine.store( 'pd' );

			var ymax, ymin, min, max, v, r, cssRule, cqRule;

			//ymin = (spacingMinFontSize * Math.pow(Number(spacingMinScale), i));
			//ymax = (spacingMaxFontSize * Math.pow(Number(spacingMaxScale), i));

			ymin =
				spacingMinFontSize *
				Math.pow( Number( spacingMinScale ), i ) *
				spacingMinSectionMultiplier;
			ymax =
				spacingMaxFontSize *
				Math.pow( Number( spacingMaxScale ), i ) *
				spacingMaxSectionMultiplier;

			if ( swap ) {
				ymin =
					spacingMinFontSize *
					Math.pow( Number( spacingMinScale ), i ) *
					spacingMinSectionMultiplier;
				ymax =
					spacingMaxFontSize *
					Math.pow( Number( spacingMaxScale ), i ) *
					spacingMaxSectionMultiplier;
			}
			//max = (ymax / baseFontSize) * spacingMaxSectionMultiplier;
			//min = (ymin / baseFontSize) * spacingMinSectionMultiplier;

			max = ymax / baseFontSize;
			min = ymin / baseFontSize;

			v = 100 * ( ( ymax - ymin ) / ( maxViewport - minViewport ) );
			r =
				( minViewport * ymax - maxViewport * ymin ) /
				( ( minViewport - maxViewport ) * baseFontSize );

			/* Round numbers to f decimals */
			min = min.toFixed( f );
			v = v.toFixed( f );
			r = r.toFixed( f );
			max = max.toFixed( f );
			var _push = Object.assign(
				{},
				Alpine.store( 'space' ).boilerplate,
				{}
			);
			_push.step = step;
			_push.prefix = prefix;
			_push.name = name;
			_push.min = min;
			_push.max = max;
			_push.v = v;
			_push.r = r;

			//cssRule = `clamp(${min}rem, ${r}rem + ${v}vw, ${max}rem)`;
			//cqRule = `clamp(${min}rem, ${r}rem + ${v}cqi, ${max}rem)`;
			Alpine.store( 'space' ).outputSection.push( _push );
		},
		generateSpacing() {
			const {
				spacingMinScale,
				spacingMaxScale,
				spacingMinFontSize,
				spacingMaxFontSize,
			} = Alpine.store( 'pd' );
			const {
				smallSteps,
				largeSteps,
				boilerplate,
				generateSpacingArray,
			} = Alpine.store( 'space' );
			const { minViewport, maxViewport } = Alpine.store( 'pd' );
			var prefix = '';
			Alpine.store( 'space' ).output = [];
			for ( var i = 0 - smallSteps; i < 0; i++ ) {
				var N = Math.abs( i ) - 1;
				var buffer = '';
				for ( var n = 0; n < N; n++ ) {
					buffer = buffer + 'x';
				}
				prefix = buffer + 's';
				generateSpacingArray( i, buffer, prefix, 'small', true );
			}
			generateSpacingArray( 0, '', 'm', 'medium', false );
			prefix = '';
			for ( var i = 1; i < largeSteps + 1; i++ ) {
				var N = Math.abs( i ) - 1;
				var buffer = '';
				for ( var n = 0; n < N; n++ ) {
					buffer = buffer + 'x';
				}
				prefix = buffer + 'l';
				generateSpacingArray( i, buffer, prefix, 'large', false );
			}
		},
		generateSpacingArray( i, step, prefix, name, swap ) {
			var _push;
			const f = 2;
			const {
				spacingMinScale,
				spacingMaxScale,
				spacingMinFontSize,
				spacingMaxFontSize,
			} = Alpine.store( 'pd' );
			const { smallSteps, largeSteps, boilerplate } =
				Alpine.store( 'space' );
			const { minViewport, maxViewport, baseFontSize } =
				Alpine.store( 'pd' );
			var output = Alpine.store( 'space' ).output;
			var ymax, ymin, min, max, v, r, cssRule, cqRule;
			ymin =
				spacingMinFontSize * Math.pow( Number( spacingMinScale ), i );
			ymax =
				spacingMaxFontSize * Math.pow( Number( spacingMaxScale ), i );
			if ( swap ) {
				ymin =
					spacingMinFontSize *
					Math.pow( Number( spacingMinScale ), i );
				ymax =
					spacingMaxFontSize *
					Math.pow( Number( spacingMinScale ), i );
			}
			max = ymax / baseFontSize;
			min = ymin / baseFontSize;
			v = 100 * ( ( ymax - ymin ) / ( maxViewport - minViewport ) );
			r =
				( minViewport * ymax - maxViewport * ymin ) /
				( ( minViewport - maxViewport ) * baseFontSize );

			/* Round numbers to f decimals */
			min = min.toFixed( f );
			v = v.toFixed( f );
			r = r.toFixed( f );
			max = max.toFixed( f );
			var _push = Object.assign(
				{},
				Alpine.store( 'space' ).boilerplate,
				{}
			);
			_push.step = step;
			_push.prefix = prefix;
			_push.name = name;
			_push.min = min;
			_push.max = max;
			_push.v = v;
			_push.r = r;
			//cssRule = `clamp(${min}rem, ${r}rem + ${v}vw, ${max}rem)`;
			//cqRule = `clamp(${min}rem, ${r}rem + ${v}cqi, ${max}rem)`;
			Alpine.store( 'space' ).output.push( _push );
		},
		boilerplate: {
			space: {
				step: 'xx',
				prefix: 's',
				name: 'small',
				type: 'size',
				category: 'space',
				min: 24,
				max: 34,
				v: 2,
				r: 2,
			},
			section: {
				name: 'normal',
				type: 'size',
				category: 'section-space',
				min: 24,
				max: 34,
				v: 2,
				r: 2,
			},
		},

		prefix: '--hsf-',
		generated: false,
		formulaVW: '100*(y2-y1) / (x2-x1)',
		formulaREM: '(xy1*y2 - x2*y1) / root*(x1 - x2)',
		containerQueryUnit: 'cqi',
		prototype: { min: 40, v: 3, r: 2, slope: 4, max: 60 },
		smallSteps: 3,
		breakpoints: [ 479, 767, 1023, 1119 ],
		largeSteps: 3,
		tablePreview: true,
		baseFontSize: 16,
		onComponentSpaceChange( preset ) {
			var o = preset.toLowerCase();
			if ( o == 'custom' ) return;
			var select = Alpine.store( 'space' ).componentSpacePresets[ o ];
			Alpine.store( 'pd' ).spacingMinFontSize = select.minFont;
			Alpine.store( 'pd' ).spacingMaxFontSize = select.maxFont;
			Alpine.store( 'pd' ).spacingMinScale = select.minScale;
			Alpine.store( 'pd' ).spacingMaxScale = select.maxScale;
			headspinRegenerate();
		},
		onSectionSpaceChange( preset ) {
			var o = preset.toLowerCase();
			if ( o == 'custom' ) return;
			var select = Alpine.store( 'space' ).sectionSpacePresets[ o ];

			Alpine.store( 'pd' ).spacingMinSectionMultiplier = select.min;
			Alpine.store( 'pd' ).spacingMaxSectionMultiplier = select.max;
			headspinRegenerate();
		},
		componentSpacePresets: {
			xxs: {
				minScale: '1.333',
				maxScale: '1.333',
				minFont: 18,
				maxFont: 26,
			},
			xs: {
				minScale: '1.333',
				maxScale: '1.333',
				minFont: 20,
				maxFont: 28,
			},
			s: {
				minScale: '1.333',
				maxScale: '1.333',
				minFont: 22,
				maxFont: 30,
			},
			m: {
				minScale: '1.333',
				maxScale: '1.333',
				minFont: 24,
				maxFont: 32,
			},
			l: {
				minScale: '1.333',
				maxScale: '1.333',
				minFont: 26,
				maxFont: 34,
			},
			xl: {
				minScale: '1.333',
				maxScale: '1.333',
				minFont: 28,
				maxFont: 36,
			},
			xxl: {
				minScale: '1.333',
				maxScale: '1.333',
				minFont: 30,
				maxFont: 38,
			},
		},
		sectionSpacePresets: {
			xxs: {
				min: '2.15',
				max: '2.15',
			},
			xs: {
				min: '2.25',
				max: '2.25',
			},
			s: {
				min: '2.50',
				max: '2.50',
			},
			m: {
				min: '2.75',
				max: '2.75',
			},
			l: {
				min: '3.00',
				max: '3.00',
			},
			xl: {
				min: '3.25',
				max: '3.25',
			},
			xxl: {
				min: '3.50',
				max: '3.50',
			},
		},
		method: 'clamp',
		scales: {
			'Minor Second - 1.067': '1.067',
			'Major Second - 1.125': '1.125',
			'Minor Third - 1.200': '1.2',
			'Major Third - 1.250': '1.25',
			'Perfect Fourth - 1.333': '1.333',
			'Augmented Fourth - 1.414': '1.414',
			'Perfect Fifth - 1.500': '1.5',
			'Golden Ratio - 1.618': '1.618',
		},
		output: [],
		outputSection: [],
		preview: [],
		typoSelectors: [],
		codeRoot: '',
		codeFluidCQ: '',
	} );
} );
/*
TODO => Make page generation CSS (page width, offset, gap)
TODO => Make containers directives
TODO => Make directives for (elevate, inset)
TODO => icon directives
TODO => Card container query directive
TODO => Breakpout mechanism
** padding:   calc((100vw - (var(--bde-section-width) + )) / 2 )
**paddingRight: max(calc((100vw - (var(--bde-section-width) + 0px)) / 2),calc(var(--bde-section-horizontal-padding) + 5px))
** fullwidth:  
    width: 100vw;
    max-width: 100vw;
    margin-left: calc(50% - 50vw);
TODO => Add browse palette
TODO => Add palette from Hex
TODO => Add brand/neutral schema
TODO =>
TODO => 
*/
