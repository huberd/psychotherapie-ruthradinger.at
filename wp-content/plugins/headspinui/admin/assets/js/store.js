document.addEventListener('alpine:init', () => {

	Alpine.store('defaults', {
		data: {},
		showReset(key) {
			var c = Alpine.store('pd');
			var d = Alpine.store('defaults').data;
			if (!c.hasOwnProperty(key)) return false;
			if (!d.hasOwnProperty(key)) return false;
			if (c[key] != d[key]) return true;
			else return false;
		},
		doReset(key) {
			var c = Alpine.store('pd');
			var d = Alpine.store('defaults').data;
			if (!c.hasOwnProperty(key)) return false;
			if (!d.hasOwnProperty(key)) return false;
			c[key] = d[key];
		},
	});
	Alpine.store('appView', {
		setTheme() {
			const store = 'headspinTheme';
			const t = localStorage.getItem(store);
			if (t === undefined || t == 'undefined' || t === null) {
				localStorage.setItem(store, Alpine.store('appView').theme);
			} else {
				Alpine.store('appView').theme = t;
			}
			document
				.querySelector('body')
				.setAttribute('data-theme', Alpine.store('appView').theme);
			this.setChartTheme(Alpine.store('appView').theme)
		},
		toggleTheme() {
			const store = 'headspinTheme';
			if (Alpine.store('appView').theme == 'light')
				Alpine.store('appView').theme = 'dark';
			else Alpine.store('appView').theme = 'light';

			localStorage.setItem(store, Alpine.store('appView').theme);
			this.updateAllCharts()
			document
				.querySelector('body')
				.setAttribute('data-theme', Alpine.store('appView').theme);
		},
		getChartColors() {
			const isDarkMode = Alpine.store('appView').theme === 'dark';

			return {
				text: isDarkMode ? 'white' : 'black',
				grid: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
				tooltipBg: isDarkMode ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
				backgroundColors: isDarkMode
					? ['rgba(101, 80, 185, 1)', 'rgba(101, 80, 185, 1)', 'rgba(101, 80, 185, 1)']
					: ['rgba(87, 83, 198, 0.8)', 'rgba(87, 83, 198, 0.8)', 'rgba(87, 83, 198, 0.8)']
			};
		},
		updateChartColors(chart) {
			const colors = this.getChartColors();

			chart.data.datasets[0].backgroundColor = colors.backgroundColors;
			chart.data.datasets[0].borderColor = colors.backgroundColors.map(color => color.replace('0.8', '1'));
			chart.options.plugins.legend.labels.color = colors.text;
			chart.options.scales.x.ticks.color = colors.text;
			chart.options.scales.y.ticks.color = colors.text;
			chart.options.scales.x.grid.color = colors.grid;
			chart.options.scales.y.grid.color = colors.grid;
			chart.update();
		},
		updateAllCharts() {
			Object.values(Chart.instances).forEach(chart => {
				this.updateChartColors(chart);
			});
		},
		setChartTheme(option) {
			if (!window.hasOwnProperty('fluidChartsJS')) fluidChartsJS = [];
			Chart.defaults.backgroundColor = '#008FF519';
			Chart.defaults.borderColor = '#70B8FF';
			Chart.defaults.scale.grid.color = 'rgba(200, 200, 200, 0.15)';
			Chart.defaults.color = 'rgba(200, 200, 200, 0.5)';

			fluidChartsJS.forEach(c => { c.update() })
		},
		getScrollbarWidth() {
			const outer = document.createElement('div');
			outer.style.visibility = 'hidden';
			outer.style.overflow = 'scroll'; // forcing scrollbar to appear
			outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
			document.body.appendChild(outer);
			const inner = document.createElement('div');
			outer.appendChild(inner);
			const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
			outer.parentNode.removeChild(outer);
			return document
				.querySelector('html')
				.style.setProperty(
					'--hs-scrollbar-width',
					scrollbarWidth + 'px'
				);
		},
		switchTab() {

			Alpine.store('appView').activeSubtab = 'false';
			if (this._throttleTimeout) return; // Skip if already waiting

			this._throttleTimeout = setTimeout(() => {
				headspinPresave();
				this._throttleTimeout = null;
			}, 2000); // 250ms throttle
		},

		scrollWidth: window.innerWidth - document.documentElement.offsetWidth,
		theme: 'dark',
		adminUrl: hajax_var.adminUrl,
		sidebarCollapse: false,
		themeFocus: true,
		fullscreen: false,
		playgroundMode: false,
		schemaAdjust: 'light',
		activeTab: 'theme',
		pgSecondary: {
			"monochromatic": [0, 0],
			"analogous": [15, 30],
			"complementary": [150, 180],
			"split_complementary": [125, 150],
			"triadic": [110, 140],
			"tetriadic": [80, 100]

		},
		pgTertiary: {
			"monochromatic": [0, 0],
			"analogous": [-15, -30],
			"complementary": [180, 210],
			"split_complementary": [-125, -150],
			"triadic": [220, 260],
			"tetriadic": [160, 200]

		},
		activeSubtab: 'false',
		activeColorTab: '',
		paletteColorWheel: false,
		contrastPreview: false,
		contrastColor: 'white',
		colorPalettePicker: false,
		chartView: 'luminance',
		tokens: true,
		sizeLabels: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
		scaleArr: [
			{
				label: 'XXS',
				name: 'Minor Second',
				value: '1.067',
			},
			{
				label: 'XXS',
				name: 'Major Second',
				value: '1.125',
			},
			{
				label: 'S',
				name: 'Minor Third',
				value: '1.200',
			},
			{
				label: 'M',
				name: 'Major Third',
				value: '1.250',
			},
			{
				label: 'L',
				name: 'Perfect Fourth',
				value: '1.333',
			},
			{
				label: 'XL',
				name: 'Augmented Fourth',
				value: '1.414',
			},
			{
				label: 'XXL',
				name: 'Golden Ratio',
				value: '1.618',
			},
		],
		tabs: [
			{
				id: 'project',
				name: 'Project',
				svg: '#ii-project',
			},
			{
				id: 'theme',
				name: 'Theme',
				svg: '#ii-theme',
			},
			{
				id: 'schema',
				name: 'Color Palette',
				svg: '#ii-palette',
			},
			{
				id: 'vars_colors',
				name: 'Tokens',
				svg: '#ii-token',
			},
			//TODO {snaps Snapshots ii-revision} {user_access Client access ii-client}
		],
		activeSpacePreview: 'component',
		tokenIcons: {
			background: 'ii-palette',
			foreground: 'ii-palette-fill',
		},
	});
	//TODO: USED ' only for definition
	Alpine.store('pd', {
		version: "2.0.1",
		prefix: 'hsx-',
		suffix: '-hsx',
		colorView: 'column',
		builderConnectors: ['breakdance'],
		pageWidth: '1366',
		containerQueries: false,
		minViewport: '479',
		maxViewport: '1366',
		contextMenuCloseOn: "outside",
		//project-settings
		settingsPaletteOutputFormat: "hex",
		/*prokect */
		generateThemeMods: true,
		generateDirectives: 'theme',
		///typography
		baseFontSize: '16',
		activeLock: '4',
		typographyMinFont: '16',
		typographyMinScale: '1.25',
		typographyMaxFont: '18',
		typographyMaxScale: '1.333',
		typographyMinCustomScale: false,
		typographyMaxCustomScale: false,
		typographyLineHeight: [4, 2],
		//

		//spacing
		spacingMinFontSize: 24,
		spacingMinSectionMultiplier: 3,
		spacingMinScale: '1.333',
		spacingMaxFontSize: 32,
		spacingMaxSectionMultiplier: 3,
		spacingMaxScale: '1.333',
		spacingMinCustomScale: false,
		spacingMaxCustomScale: false,
		//colors
		colorViewModel: '',
		colorContrastMethod: 'perceptual_contrast',
		enterpriseWorkflows: false,
		//a11y queries
		//userPrefersModeMode: false,
		//userPrefersModeHighContrast: false,
		//userPrefersReducedAnimations: false,
		"colorNormalization": {
			"light": "luminance",
			"dark": "oklch_lightness",
			"mode": "light"
		},
		"luminance_normalization": {
			"enabled": false,
			"uswds_grades_normalization": true,
			"light": [

				//backgrounds
				{
					"enabled": true,
					"step": 1,
					"min": 0.75,
					"max": 1.000,
					"value": 0.980,
					"defValue": 0.980
				},
				{
					"enabled": true,
					"step": 2,
					"min": 0.75,
					"max": 1.000,
					"value": 0.947,
					"defValue": 0.947
				},
				{
					"enabled": true,
					"step": 3,
					"min": 0.75,
					"max": 1.000,
					"value": 0.887,
					"defValue": 0.887
				},
				{
					"enabled": true,
					"step": 4,
					"min": 0.75,
					"max": 1.000,
					"value": 0.812,
					"defValue": 0.812
				},
				{
					"enabled": true,
					"step": 5,
					"min": 0.75,
					"max": 1.000,
					"value": 0.732,
					"defValue": 0.732
				},


				//borders, separators
				{
					"enabled": true,
					"step": 6,
					"min": 0.350,
					"max": 0.650,
					"value": 0.636,
					"defValue": 0.636
				},
				{
					"enabled": true,
					"step": 7,
					"min": 0.350,
					"max": 0.650,
					"value": 0.523,
					"defValue": 0.523
				},
				{
					"enabled": true,
					"step": 8,
					"min": 0.350,
					"max": 0.650,
					"value": 0.397,
					"defValue": 0.397
				},


				//solid
				{
					"enabled": false,
					"step": 9,
					"min": 0.100,
					"max": 0.650,
					"value": 0.248,
					"defValue": 0.248
				},
				{
					"enabled": false,
					"step": 10,
					"min": 0.100,
					"max": 0.650,
					"value": 0.208,
					"defValue": 0.208
				},

				//foreground
				{
					"enabled": true,
					"step": 11,
					"min": 0.005,
					"max": 0.125,
					"value": 0.125,
					"defValue": 0.125
				},
				{
					"enabled": true,
					"step": 12,
					"min": 0.000,
					"max": 0.100,
					"value": 0.036,
					"defValue": 0.036
				},
			],
			"dark": [

				//backgrounds
				{
					"enabled": true,
					"step": 1,
					"min": 0,
					"max": 0.040,
					"value": 0.007,
					"defValue": 0.007
				},
				{
					"enabled": true,
					"step": 2,
					"min": 0,
					"max": 0.040,
					"value": 0.009,
					"defValue": 0.009
				},
				{
					"enabled": true,
					"step": 3,
					"min": 0,
					"max": 0.040,
					"value": 0.018,
					"defValue": 0.018
				},
				{
					"enabled": true,
					"step": 4,
					"min": 0,
					"max": 0.040,
					"value": 0.027,
					"defValue": 0.027
				},
				{
					"enabled": true,
					"step": 5,
					"min": 0,
					"max": 0.040,
					"value": 0.037,
					"defValue": 0.037
				},


				//borders, separators
				{
					"enabled": true,
					"step": 6,
					"min": 0.050,
					"max": 0.125,
					"value": 0.056,
					"defValue": 0.056
				},
				{
					"enabled": true,
					"step": 7,
					"min": 0.050,
					"max": 0.125,
					"value": 0.087,
					"defValue": 0.087
				},
				{
					"enabled": true,
					"step": 8,
					"min": 0.050,
					"max": 0.125,
					"value": 0.149,
					"defValue": 0.149
				},


				//solid
				{
					"enabled": false,
					"step": 9,
					"min": 0.175,
					"max": 0.650,
					"value": 0.248,
					"defValue": 0.248
				},
				{
					"enabled": false,
					"step": 10,
					"min": 0.175,
					"max": 0.650,
					"value": 0.299,
					"defValue": 0.299
				},

				//foreground
				{
					"enabled": true,
					"step": 11,
					"min": 0.500,
					"max": 1.000,
					"value": 0.490,
					"defValue": 0.490
				},
				{
					"enabled": true,
					"step": 12,
					"min": 0.500,
					"max": 1.000,
					"value": 0.763,
					"defValue": 0.763
				},
			],
		},
		"lightness_normalization": {
			"dark": [
				{
					"enabled": true,
					"step": 1,
					"min": "0",
					"min": "0",
					"max": "0.373",
					"defValue": "0.188"
				},
				{
					"enabled": true,
					"step": 2,
					"min": "0",
					"max": "0.373",
					"value": "0.211",
					"defValue": "0.211"
				},
				{
					"enabled": true,
					"step": 3,
					"min": "0",
					"max": "0.373",
					"value": "0.267",
					"defValue": "0.267"
				},
				{
					"enabled": true,
					"step": 4,
					"min": "0",
					"max": "0.373",
					"value": "0.309",
					"defValue": "0.309"
				},
				{
					"enabled": true,
					"step": 5,
					"min": "0",
					"max": "0.373",
					"value": "0.345",
					"defValue": "0.345"
				},
				{
					"enabled": true,
					"step": 6,
					"min": "0.371",
					"max": "0.426",
					"value": "0.389",
					"defValue": "0.389"
				},
				{
					"enabled": true,
					"step": 7,
					"min": "0.429",
					"max": "0.488",
					"value": "0.452",
					"defValue": "0.452"
				},
				{
					"enabled": true,
					"step": 8,
					"min": "0.499",
					"max": "0.557",
					"value": "0.537",
					"defValue": "0.537"
				},
				{
					"enabled": false,
					"step": 9,
					"min": "0.540",
					"max": "0.918",
					"value": "0.634",
					"defValue": "0.634"
				},
				{
					"enabled": false,
					"step": 10,
					"min": "0.587",
					"max": "0.971",
					"value": "0.673",
					"defValue": "0.673"
				},
				{
					"enabled": true,
					"step": 11,
					"min": "0.764",
					"max": "1",
					"value": "0.785",
					"defValue": "0.785"
				},
				{
					"enabled": true,
					"step": 12,
					"min": "0.899",
					"max": "1",
					"value": "0.911",
					"defValue": "0.911"
				}
			],
			"light": [
				{
					"enabled": true,
					"step": 1,
					"min": "0.888",
					"max": "1",
					"value": "0.994",
					"defValue": "0.994"
				},
				{
					"enabled": true,
					"step": 2,
					"min": "0.888",
					"max": "1",
					"value": "0.982",
					"defValue": "0.982"
				},
				{
					"enabled": true,
					"step": 3,
					"min": "0.888",
					"max": "1",
					"value": "0.959",
					"defValue": "0.959"
				},
				{
					"enabled": true,
					"step": 4,
					"min": "0.888",
					"max": "1",
					"value": "0.932",
					"defValue": "0.932"
				},
				{
					"enabled": true,
					"step": 5,
					"min": "0.888",
					"max": "1",
					"value": "0.899",
					"defValue": "0.899"
				},
				{
					"enabled": true,
					"step": 6,
					"min": "0.853",
					"max": "0.881",
					"value": "0.859",
					"defValue": "0.859"
				},
				{
					"enabled": true,
					"step": 7,
					"min": "0.795",
					"max": "0.835",
					"value": "0.806",
					"defValue": "0.806"
				},
				{
					"enabled": true,
					"step": 8,
					"min": "0.716",
					"max": "0.766",
					"value": "0.734",
					"defValue": "0.734"
				},
				{
					"enabled": false,
					"step": 9,
					"min": "0.540",
					"max": "0.918",
					"value": "0.634",
					"defValue": "0.634"
				},
				{
					"enabled": false,
					"step": 10,
					"min": "0.509",
					"max": "0.897",
					"value": "0.607",
					"defValue": "0.607"
				},
				{
					"enabled": true,
					"step": 11,
					"min": "0",
					"max": "0.586",
					"value": "0.544",
					"defValue": "0.544"
				},
				{
					"enabled": true,
					"step": 12,
					"min": "0",
					"max": "0.586",
					"value": "0.332",
					"defValue": "0.332"
				}
			]
		},
		"palette_contrast": [
			{
				"scope": "all", // all | current
				"algorithm": "1",
				"bg": 5, // 1, 2, 3, 4, 5
				"fg": 12, // 6, 7, 8, 9, 10, 11, 12
				"wcag2": 4.5,
				"perceptual": 70,

			},
		],
		brandColorSchema: {
			name: 'brand',
			system: 'true',
			neutral: 'false',
			linktype: '',
			linked: 'false',
			type: 'radix',
			transparentVariants: false,
			data: {
				name: 'Blue',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#0d1520',
					},
					{
						step: 2,
						value: '#111927',
					},
					{
						step: 3,
						value: '#0d2847',
					},
					{
						step: 4,
						value: '#003362',
					},
					{
						step: 5,
						value: '#004074',
					},
					{
						step: 6,
						value: '#104d87',
					},
					{
						step: 7,
						value: '#205d9e',
					},
					{
						step: 8,
						value: '#2870bd',
					},
					{
						step: 9,
						value: '#0090ff',
					},
					{
						step: 10,
						value: '#3b9eff',
					},
					{
						step: 11,
						value: '#70b8ff',
					},
					{
						step: 12,
						value: '#c2e6ff',
					},
				],
				light: [
					{
						step: 1,
						value: '#fbfdff',
					},
					{
						step: 2,
						value: '#f4faff',
					},
					{
						step: 3,
						value: '#e6f4fe',
					},
					{
						step: 4,
						value: '#d5efff',
					},
					{
						step: 5,
						value: '#c2e5ff',
					},
					{
						step: 6,
						value: '#acd8fc',
					},
					{
						step: 7,
						value: '#8ec8f6',
					},
					{
						step: 8,
						value: '#5eb1ef',
					},
					{
						step: 9,
						value: '#0090ff',
					},
					{
						step: 10,
						value: '#0588f0',
					},
					{
						step: 11,
						value: '#0d74ce',
					},
					{
						step: 12,
						value: '#113264',
					},
				],
				darkAlpha: [
					{
						value: 'hsla(0, 0%, 0%, 0)',
						step: 1,
						h: '0',
						s: '0.00',
						l: '0.00',
						a: ' 0',
					},
					{
						value: 'hsla(221, 97.8%, 52.4%, 0.059)',
						step: 2,
						h: '221',
						s: '0.98',
						l: '0.52',
						a: ' 0.059',
					},
					{
						value: 'hsla(215, 99.3%, 54.2%, 0.135)',
						step: 3,
						h: '215',
						s: '0.99',
						l: '0.54',
						a: ' 0.135',
					},
					{
						value: 'hsla(215, 99.3%, 53.8%, 0.198)',
						step: 4,
						h: '215',
						s: '0.99',
						l: '0.54',
						a: ' 0.198',
					},
					{
						value: 'hsla(213, 99.4%, 52.8%, 0.252)',
						step: 5,
						h: '213',
						s: '0.99',
						l: '0.53',
						a: ' 0.252',
					},
					{
						value: 'hsla(212, 99.9%, 51.7%, 0.323)',
						step: 6,
						h: '212',
						s: '1.00',
						l: '0.52',
						a: ' 0.323',
					},
					{
						value: 'hsla(211, 100%, 50.7%, 0.435)',
						step: 7,
						h: '211',
						s: '1.00',
						l: '0.51',
						a: ' 0.435',
					},
					{
						value: 'hsla(211, 99.8%, 50.9%, 0.597)',
						step: 8,
						h: '211',
						s: '1.00',
						l: '0.51',
						a: ' 0.597',
					},
					{
						value: 'hsla(205, 100%, 50.0%, 0.980)',
						step: 9,
						h: '205',
						s: '1.00',
						l: '0.50',
						a: ' 0.980',
					},
					{
						value: 'hsla(208, 100%, 60.7%, 0.980)',
						step: 10,
						h: '208',
						s: '1.00',
						l: '0.61',
						a: ' 0.980',
					},
					{
						value: 'hsla(209, 100%, 66.3%, 0.980)',
						step: 11,
						h: '209',
						s: '1.00',
						l: '0.66',
						a: ' 0.980',
					},
					{
						value: 'hsla(196, 100%, 96.8%, 0.980)',
						step: 12,
						h: '196',
						s: '1.00',
						l: '0.97',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(210, 100%, 51.0%, 0.016)',
						step: 1,
						h: '210',
						s: '1.00',
						l: '0.51',
						a: ' 0.016',
					},
					{
						value: 'hsla(210, 100%, 51.0%, 0.040)',
						step: 2,
						h: '210',
						s: '1.00',
						l: '0.51',
						a: ' 0.040',
					},
					{
						value: 'hsla(210, 100%, 50.3%, 0.071)',
						step: 3,
						h: '210',
						s: '1.00',
						l: '0.50',
						a: ' 0.071',
					},
					{
						value: 'hsla(210, 100%, 50.1%, 0.118)',
						step: 4,
						h: '210',
						s: '1.00',
						l: '0.50',
						a: ' 0.118',
					},
					{
						value: 'hsla(208, 99.1%, 47.1%, 0.189)',
						step: 5,
						h: '208',
						s: '0.99',
						l: '0.47',
						a: ' 0.189',
					},
					{
						value: 'hsla(209, 99.5%, 45.3%, 0.283)',
						step: 6,
						h: '209',
						s: '0.99',
						l: '0.45',
						a: ' 0.283',
					},
					{
						value: 'hsla(208, 99.9%, 43.8%, 0.412)',
						step: 7,
						h: '208',
						s: '1.00',
						l: '0.44',
						a: ' 0.412',
					},
					{
						value: 'hsla(206, 99.8%, 45.1%, 0.632)',
						step: 8,
						h: '206',
						s: '1.00',
						l: '0.45',
						a: ' 0.632',
					},
					{
						value: 'hsla(206, 100%, 50.0%, 0.980)',
						step: 9,
						h: '206',
						s: '1.00',
						l: '0.50',
						a: ' 0.980',
					},
					{
						value: 'hsla(208, 100%, 47.2%, 0.980)',
						step: 10,
						h: '208',
						s: '1.00',
						l: '0.47',
						a: ' 0.980',
					},
					{
						value: 'hsla(212, 100%, 43.0%, 0.980)',
						step: 11,
						h: '212',
						s: '1.00',
						l: '0.43',
						a: ' 0.980',
					},
					{
						value: 'hsla(213, 100%, 14.4%, 0.980)',
						step: 12,
						h: '213',
						s: '1.00',
						l: '0.14',
						a: ' 0.980',
					},
				],
				onWcag: '#000000',
			},
		},
		neutralColorSchema: {
			name: 'neutral',
			system: 'true',
			neutral: 'true',
			linktype: '',
			linked: true,
			type: 'radix',
			transparentVariants: false,
			data: {
				name: 'Mauve',
				pairing: [
					'Tomato',
					'Red',
					'Ruby',
					'Crimson',
					'Pink',
					'Plum',
					'Purple',
					'Violet',
				],
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#121113',
					},
					{
						step: 2,
						value: '#1a191b',
					},
					{
						step: 3,
						value: '#232225',
					},
					{
						step: 4,
						value: '#2b292d',
					},
					{
						step: 5,
						value: '#323035',
					},
					{
						step: 6,
						value: '#3c393f',
					},
					{
						step: 7,
						value: '#49474e',
					},
					{
						step: 8,
						value: '#625f69',
					},
					{
						step: 9,
						value: '#6f6d78',
					},
					{
						step: 10,
						value: '#7c7a85',
					},
					{
						step: 11,
						value: '#b5b2bc',
					},
					{
						step: 12,
						value: '#eeeef0',
					},
				],
				light: [
					{
						step: 1,
						value: '#fdfcfd',
					},
					{
						step: 2,
						value: '#faf9fb',
					},
					{
						step: 3,
						value: '#f2eff3',
					},
					{
						step: 4,
						value: '#eae7ec',
					},
					{
						step: 5,
						value: '#e3dfe6',
					},
					{
						step: 6,
						value: '#dbd8e0',
					},
					{
						step: 7,
						value: '#d0cdd7',
					},
					{
						step: 8,
						value: '#bcbac7',
					},
					{
						step: 9,
						value: '#8e8c99',
					},
					{
						step: 10,
						value: '#84828e',
					},
					{
						step: 11,
						value: '#65636d',
					},
					{
						step: 12,
						value: '#211f26',
					},
				],
				darkAlpha: [
					{
						value: 'hsla(0, 0%, 0%, 0)',
						step: 1,
						h: '0',
						s: '0.00',
						l: '0.00',
						a: ' 0',
					},
					{
						value: 'hsla(240, 76.7%, 91.2%, 0.031)',
						step: 2,
						h: '240',
						s: '0.77',
						l: '0.91',
						a: ' 0.031',
					},
					{
						value: 'hsla(240, 86.0%, 95.8%, 0.061)',
						step: 3,
						h: '240',
						s: '0.86',
						l: '0.96',
						a: ' 0.061',
					},
					{
						value: 'hsla(240, 91.8%, 94.7%, 0.087)',
						step: 4,
						h: '240',
						s: '0.92',
						l: '0.95',
						a: ' 0.087',
					},
					{
						value: 'hsla(240, 91.5%, 95.8%, 0.113)',
						step: 5,
						h: '240',
						s: '0.92',
						l: '0.96',
						a: ' 0.113',
					},
					{
						value: 'hsla(240, 92.0%, 93.8%, 0.148)',
						step: 6,
						h: '240',
						s: '0.92',
						l: '0.94',
						a: ' 0.148',
					},
					{
						value: 'hsla(240, 94.8%, 95.3%, 0.191)',
						step: 7,
						h: '240',
						s: '0.95',
						l: '0.95',
						a: ' 0.191',
					},
					{
						value: 'hsla(249, 98.1%, 95.2%, 0.273)',
						step: 8,
						h: '249',
						s: '0.98',
						l: '0.95',
						a: ' 0.273',
					},
					{
						value: 'hsla(248, 97.6%, 96.2%, 0.416)',
						step: 9,
						h: '248',
						s: '0.98',
						l: '0.96',
						a: ' 0.416',
					},
					{
						value: 'hsla(248, 95.5%, 96.6%, 0.477)',
						step: 10,
						h: '248',
						s: '0.95',
						l: '0.97',
						a: ' 0.477',
					},
					{
						value: 'hsla(250, 98.0%, 98.0%, 0.615)',
						step: 11,
						h: '250',
						s: '0.98',
						l: '0.98',
						a: ' 0.615',
					},
					{
						value: 'hsla(240, 93.9%, 99.6%, 0.931)',
						step: 12,
						h: '240',
						s: '0.94',
						l: '1.00',
						a: ' 0.931',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(300, 89.3%, 18.3%, 0.012)',
						step: 1,
						h: '300',
						s: '0.89',
						l: '0.18',
						a: ' 0.012',
					},
					{
						value: 'hsla(300, 78.1%, 9.0%, 0.028)',
						step: 2,
						h: '300',
						s: '0.78',
						l: '0.09',
						a: ' 0.028',
					},
					{
						value: 'hsla(300, 99.5%, 7.7%, 0.051)',
						step: 3,
						h: '300',
						s: '0.99',
						l: '0.08',
						a: ' 0.051',
					},
					{
						value: 'hsla(270, 90.5%, 6.1%, 0.071)',
						step: 4,
						h: '270',
						s: '0.91',
						l: '0.06',
						a: ' 0.071',
					},
					{
						value: 'hsla(270, 83.0%, 5.2%, 0.091)',
						step: 5,
						h: '270',
						s: '0.83',
						l: '0.05',
						a: ' 0.091',
					},
					{
						value: 'hsla(300, 93.5%, 3.7%, 0.114)',
						step: 6,
						h: '300',
						s: '0.94',
						l: '0.04',
						a: ' 0.114',
					},
					{
						value: 'hsla(270, 82.6%, 3.3%, 0.142)',
						step: 7,
						h: '270',
						s: '0.83',
						l: '0.03',
						a: ' 0.142',
					},
					{
						value: 'hsla(255, 95.2%, 3.7%, 0.220)',
						step: 8,
						h: '255',
						s: '0.95',
						l: '0.04',
						a: ' 0.220',
					},
					{
						value: 'hsla(255, 94.8%, 3.7%, 0.444)',
						step: 9,
						h: '255',
						s: '0.95',
						l: '0.04',
						a: ' 0.444',
					},
					{
						value: 'hsla(253, 96.5%, 3.8%, 0.483)',
						step: 10,
						h: '253',
						s: '0.96',
						l: '0.04',
						a: ' 0.483',
					},
					{
						value: 'hsla(247, 97.9%, 3.2%, 0.569)',
						step: 11,
						h: '247',
						s: '0.98',
						l: '0.03',
						a: ' 0.569',
					},
					{
						value: 'hsla(261, 98.7%, 3.0%, 0.918)',
						step: 12,
						h: '261',
						s: '0.99',
						l: '0.03',
						a: ' 0.918',
					},
				],
				onWcag: '#000000',
			},
		},

		colorSchemas: [
			{
				"name": "primary",
				"system": "false",
				"neutral": "false",
				"presetColor": true,
				"enabled": false,
				"transparentVariants": true,
				"exposeInBuilder": "true",
				"type": "radix",
				"linked": "false",
				"linktype": "",
				"dynamicPaths": [],
				"data": {
					"name": "Orange",
					"onColor": "#ffffff",
					"dark": [
						{
							"step": 1,
							"value": "#17120e",
							"output": "#000000"
						},
						{
							"step": 2,
							"value": "#1e160f",
							"output": "#1f1710"
						},
						{
							"step": 3,
							"value": "#331e0b",
							"output": "#35200d"
						},
						{
							"step": 4,
							"value": "#462100",
							"output": "#4a2503"
						},
						{
							"step": 5,
							"value": "#562800",
							"output": "#592b03"
						},
						{
							"step": 6,
							"value": "#66350c",
							"output": "#67360e"
						},
						{
							"step": 7,
							"value": "#7e451d",
							"output": "#7e451d"
						},
						{
							"step": 8,
							"value": "#a35829",
							"output": "#a25728"
						},
						{
							"step": 9,
							"value": "#f76b15",
							"output": "#f76b15"
						},
						{
							"step": 10,
							"value": "#ff801f",
							"output": "#ff801f"
						},
						{
							"step": 11,
							"value": "#ffa057",
							"output": "#fe9f56"
						},
						{
							"step": 12,
							"value": "#ffe0c2",
							"output": "#fadbbe"
						}
					],
					"light": [
						{
							"step": 1,
							"value": "#fefcfb",
							"output": "#fefcfc"
						},
						{
							"step": 2,
							"value": "#fff7ed",
							"output": "#fff8ef"
						},
						{
							"step": 3,
							"value": "#ffefd6",
							"output": "#fff0d9"
						},
						{
							"step": 4,
							"value": "#ffdfb5",
							"output": "#ffe5c3"
						},
						{
							"step": 5,
							"value": "#ffd19a",
							"output": "#ffd8a9"
						},
						{
							"step": 6,
							"value": "#ffc182",
							"output": "#ffc68c"
						},
						{
							"step": 7,
							"value": "#f5ae73",
							"output": "#f5b178"
						},
						{
							"step": 8,
							"value": "#ec9455",
							"output": "#ec9455"
						},
						{
							"step": 9,
							"value": "#f76b15",
							"output": "#f76b15"
						},
						{
							"step": 10,
							"value": "#ef5f00",
							"output": "#ef5f00"
						},
						{
							"step": 11,
							"value": "#cc4e00",
							"output": "#ab4100"
						},
						{
							"step": 12,
							"value": "#582d1d",
							"output": "#532a1b"
						}
					],
					"darkAlpha": [
						{
							"value": "hsla(0, 0%, 0%, 0)",
							"step": 1,
							"h": "0",
							"s": "0.00",
							"l": "0.00",
							"a": " 0"
						},
						{
							"value": "hsla(13, 100%, 49.7%, 0.054)",
							"step": 2,
							"h": "13",
							"s": "1.00",
							"l": "0.50",
							"a": " 0.054"
						},
						{
							"value": "hsla(20, 100%, 49.7%, 0.117)",
							"step": 3,
							"h": "20",
							"s": "1.00",
							"l": "0.50",
							"a": " 0.117"
						},
						{
							"value": "hsla(23, 100%, 49.8%, 0.166)",
							"step": 4,
							"h": "23",
							"s": "1.00",
							"l": "0.50",
							"a": " 0.166"
						},
						{
							"value": "hsla(23, 99.4%, 50.1%, 0.215)",
							"step": 5,
							"h": "23",
							"s": "0.99",
							"l": "0.50",
							"a": " 0.215"
						},
						{
							"value": "hsla(23, 99.8%, 51.1%, 0.286)",
							"step": 6,
							"h": "23",
							"s": "1.00",
							"l": "0.51",
							"a": " 0.286"
						},
						{
							"value": "hsla(23, 99.7%, 50.6%, 0.389)",
							"step": 7,
							"h": "23",
							"s": "1.00",
							"l": "0.51",
							"a": " 0.389"
						},
						{
							"value": "hsla(24, 100%, 49.9%, 0.523)",
							"step": 8,
							"h": "24",
							"s": "1.00",
							"l": "0.50",
							"a": " 0.523"
						},
						{
							"value": "hsla(24, 99.9%, 51.6%, 0.965)",
							"step": 9,
							"h": "24",
							"s": "1.00",
							"l": "0.52",
							"a": " 0.965"
						},
						{
							"value": "hsla(25, 100%, 58.6%, 0.980)",
							"step": 10,
							"h": "25",
							"s": "1.00",
							"l": "0.59",
							"a": " 0.980"
						},
						{
							"value": "hsla(24, 100%, 62.4%, 0.980)",
							"step": 11,
							"h": "24",
							"s": "1.00",
							"l": "0.62",
							"a": " 0.980"
						},
						{
							"value": "hsla(26, 100%, 94.2%, 0.980)",
							"step": 12,
							"h": "26",
							"s": "1.00",
							"l": "0.94",
							"a": " 0.980"
						}
					],
					"lightAlpha": [
						{
							"value": "hsla(20, 94.9%, 38.7%, 0.016)",
							"step": 1,
							"h": "20",
							"s": "0.95",
							"l": "0.39",
							"a": " 0.016"
						},
						{
							"value": "hsla(24, 95.8%, 46.5%, 0.044)",
							"step": 2,
							"h": "24",
							"s": "0.96",
							"l": "0.47",
							"a": " 0.044"
						},
						{
							"value": "hsla(25, 100%, 50.5%, 0.095)",
							"step": 3,
							"h": "25",
							"s": "1.00",
							"l": "0.51",
							"a": " 0.095"
						},
						{
							"value": "hsla(26, 100%, 50.0%, 0.157)",
							"step": 4,
							"h": "26",
							"s": "1.00",
							"l": "0.50",
							"a": " 0.157"
						},
						{
							"value": "hsla(25, 100%, 50.1%, 0.236)",
							"step": 5,
							"h": "25",
							"s": "1.00",
							"l": "0.50",
							"a": " 0.236"
						},
						{
							"value": "hsla(25, 100%, 50.1%, 0.346)",
							"step": 6,
							"h": "25",
							"s": "1.00",
							"l": "0.50",
							"a": " 0.346"
						},
						{
							"value": "hsla(24, 100%, 50.1%, 0.495)",
							"step": 7,
							"h": "24",
							"s": "1.00",
							"l": "0.50",
							"a": " 0.495"
						},
						{
							"value": "hsla(24, 99.7%, 48.7%, 0.695)",
							"step": 8,
							"h": "24",
							"s": "1.00",
							"l": "0.49",
							"a": " 0.695"
						},
						{
							"value": "hsla(24, 99.9%, 48.4%, 0.969)",
							"step": 9,
							"h": "24",
							"s": "1.00",
							"l": "0.48",
							"a": " 0.969"
						},
						{
							"value": "hsla(23, 100%, 46.4%, 0.980)",
							"step": 10,
							"h": "23",
							"s": "1.00",
							"l": "0.46",
							"a": " 0.980"
						},
						{
							"value": "hsla(23, 100%, 36.8%, 0.980)",
							"step": 11,
							"h": "23",
							"s": "1.00",
							"l": "0.37",
							"a": " 0.980"
						},
						{
							"value": "hsla(15, 99.4%, 11.0%, 0.934)",
							"step": 12,
							"h": "15",
							"s": "0.99",
							"l": "0.11",
							"a": " 0.934"
						}
					],
					"onWcag": "#000000"
				},
				"themeDirectivesPaths": [
					{
						"target": "brand",
						"validation": [],
						"paths": []
					}
				]
			},
			{
				"name": "secondary",
				"system": "false",
				"neutral": "false",
				"presetColor": true,
				"enabled": false,
				"transparentVariants": true,
				"exposeInBuilder": "true",
				"type": "radix",
				"linked": "false",
				"linktype": "",
				"dynamicPaths": [],
				"data": {
					"name": "Indigo",
					"onColor": "#fff",
					"dark": [
						{
							"step": 1,
							"value": "#11131f",
							"output": "#000000"
						},
						{
							"step": 2,
							"value": "#141726",
							"output": "#141726"
						},
						{
							"step": 3,
							"value": "#182449",
							"output": "#172348"
						},
						{
							"step": 4,
							"value": "#1d2e62",
							"output": "#1b2b5f"
						},
						{
							"step": 5,
							"value": "#253974",
							"output": "#21346f"
						},
						{
							"step": 6,
							"value": "#304384",
							"output": "#2c3f80"
						},
						{
							"step": 7,
							"value": "#3a4f97",
							"output": "#3b5098"
						},
						{
							"step": 8,
							"value": "#435db1",
							"output": "#4c67bc"
						},
						{
							"step": 9,
							"value": "#3e63dd",
							"output": "#3e63dd"
						},
						{
							"step": 10,
							"value": "#5472e4",
							"output": "#5472e4"
						},
						{
							"step": 11,
							"value": "#9eb1ff",
							"output": "#a1b4ff"
						},
						{
							"step": 12,
							"value": "#d6e1ff",
							"output": "#d6e1ff"
						}
					],
					"light": [
						{
							"step": 1,
							"value": "#fdfdfe",
							"output": "#fdfdfe"
						},
						{
							"step": 2,
							"value": "#f7f9ff",
							"output": "#f7f9ff"
						},
						{
							"step": 3,
							"value": "#edf2fe",
							"output": "#edf2fe"
						},
						{
							"step": 4,
							"value": "#e1e9ff",
							"output": "#e1e9ff"
						},
						{
							"step": 5,
							"value": "#d2deff",
							"output": "#d2deff"
						},
						{
							"step": 6,
							"value": "#c1d0ff",
							"output": "#c1d0ff"
						},
						{
							"step": 7,
							"value": "#abbdf9",
							"output": "#acbef9"
						},
						{
							"step": 8,
							"value": "#8da4ef",
							"output": "#90a7ef"
						},
						{
							"step": 9,
							"value": "#3e63dd",
							"output": "#3e63dd"
						},
						{
							"step": 10,
							"value": "#3358d4",
							"output": "#3358d4"
						},
						{
							"step": 11,
							"value": "#3a5bc7",
							"output": "#3a5bc7"
						},
						{
							"step": 12,
							"value": "#1f2d5c",
							"output": "#253360"
						}
					],
					"darkAlpha": [
						{
							"value": "hsla(0, 0%, 0%, 0)",
							"step": 1,
							"h": "0",
							"s": "0.00",
							"l": "0.00",
							"a": " 0"
						},
						{
							"value": "hsla(234, 97.4%, 59.9%, 0.059)",
							"step": 2,
							"h": "234",
							"s": "0.97",
							"l": "0.60",
							"a": " 0.059"
						},
						{
							"value": "hsla(228, 99.2%, 61.7%, 0.144)",
							"step": 3,
							"h": "228",
							"s": "0.99",
							"l": "0.62",
							"a": " 0.144"
						},
						{
							"value": "hsla(227, 99.7%, 62.0%, 0.211)",
							"step": 4,
							"h": "227",
							"s": "1.00",
							"l": "0.62",
							"a": " 0.211"
						},
						{
							"value": "hsla(227, 99.2%, 62.3%, 0.270)",
							"step": 5,
							"h": "227",
							"s": "0.99",
							"l": "0.62",
							"a": " 0.270"
						},
						{
							"value": "hsla(226, 99.9%, 62.1%, 0.350)",
							"step": 6,
							"h": "226",
							"s": "1.00",
							"l": "0.62",
							"a": " 0.350"
						},
						{
							"value": "hsla(226, 99.9%, 62.0%, 0.471)",
							"step": 7,
							"h": "226",
							"s": "1.00",
							"l": "0.62",
							"a": " 0.471"
						},
						{
							"value": "hsla(226, 99.9%, 62.1%, 0.655)",
							"step": 8,
							"h": "226",
							"s": "1.00",
							"l": "0.62",
							"a": " 0.655"
						},
						{
							"value": "hsla(226, 99.9%, 63.6%, 0.848)",
							"step": 9,
							"h": "226",
							"s": "1.00",
							"l": "0.64",
							"a": " 0.848"
						},
						{
							"value": "hsla(227, 99.8%, 67.7%, 0.893)",
							"step": 10,
							"h": "227",
							"s": "1.00",
							"l": "0.68",
							"a": " 0.893"
						},
						{
							"value": "hsla(227, 100%, 76.3%, 0.980)",
							"step": 11,
							"h": "227",
							"s": "1.00",
							"l": "0.76",
							"a": " 0.980"
						},
						{
							"value": "hsla(226, 100%, 97.5%, 0.980)",
							"step": 12,
							"h": "226",
							"s": "1.00",
							"l": "0.97",
							"a": " 0.980"
						}
					],
					"lightAlpha": [
						{
							"value": "hsla(240, 92.6%, 26.5%, 0.008)",
							"step": 1,
							"h": "240",
							"s": "0.93",
							"l": "0.27",
							"a": " 0.008"
						},
						{
							"value": "hsla(223, 100%, 51.0%, 0.028)",
							"step": 2,
							"h": "223",
							"s": "1.00",
							"l": "0.51",
							"a": " 0.028"
						},
						{
							"value": "hsla(224, 100%, 50.1%, 0.059)",
							"step": 3,
							"h": "224",
							"s": "1.00",
							"l": "0.50",
							"a": " 0.059"
						},
						{
							"value": "hsla(223, 98.0%, 48.5%, 0.099)",
							"step": 4,
							"h": "223",
							"s": "0.98",
							"l": "0.48",
							"a": " 0.099"
						},
						{
							"value": "hsla(225, 98.6%, 46.4%, 0.150)",
							"step": 5,
							"h": "225",
							"s": "0.99",
							"l": "0.46",
							"a": " 0.150"
						},
						{
							"value": "hsla(224, 99.5%, 44.9%, 0.224)",
							"step": 6,
							"h": "224",
							"s": "0.99",
							"l": "0.45",
							"a": " 0.224"
						},
						{
							"value": "hsla(225, 99.7%, 43.9%, 0.318)",
							"step": 7,
							"h": "225",
							"s": "1.00",
							"l": "0.44",
							"a": " 0.318"
						},
						{
							"value": "hsla(226, 99.5%, 43.1%, 0.448)",
							"step": 8,
							"h": "226",
							"s": "0.99",
							"l": "0.43",
							"a": " 0.448"
						},
						{
							"value": "hsla(226, 100%, 41.2%, 0.757)",
							"step": 9,
							"h": "226",
							"s": "1.00",
							"l": "0.41",
							"a": " 0.757"
						},
						{
							"value": "hsla(226, 99.8%, 37.1%, 0.773)",
							"step": 10,
							"h": "226",
							"s": "1.00",
							"l": "0.37",
							"a": " 0.773"
						},
						{
							"value": "hsla(226, 99.6%, 31.1%, 0.797)",
							"step": 11,
							"h": "226",
							"s": "1.00",
							"l": "0.31",
							"a": " 0.797"
						},
						{
							"value": "hsla(226, 99.3%, 11.4%, 0.938)",
							"step": 12,
							"h": "226",
							"s": "0.99",
							"l": "0.11",
							"a": " 0.938"
						}
					],
					"onWcag": "#ffffff"
				},
				"themeDirectivesPaths": [
					{
						"target": "brand",
						"validation": [],
						"paths": []
					}
				]
			},
			{
				"name": "tertiary",
				"system": "false",
				"neutral": "false",
				"presetColor": true,
				"enabled": false,
				"transparentVariants": true,
				"exposeInBuilder": "true",
				"type": "radix",
				"linked": "false",
				"linktype": "",
				"dynamicPaths": [],
				"data": {
					"name": "Crimson",
					"onColor": "#fff",
					"dark": [
						{
							"step": 1,
							"value": "#191114",
							"output": "#191114"
						},
						{
							"step": 2,
							"value": "#201318",
							"output": "#201318"
						},
						{
							"step": 3,
							"value": "#381525",
							"output": "#381525"
						},
						{
							"step": 4,
							"value": "#4d122f",
							"output": "#4d122f"
						},
						{
							"step": 5,
							"value": "#5c1839",
							"output": "#5c1839"
						},
						{
							"step": 6,
							"value": "#6d2545",
							"output": "#6d2545"
						},
						{
							"step": 7,
							"value": "#873356",
							"output": "#873356"
						},
						{
							"step": 8,
							"value": "#b0436e",
							"output": "#b0436e"
						},
						{
							"step": 9,
							"value": "#e93d82",
							"output": "#e93d82"
						},
						{
							"step": 10,
							"value": "#ee518a",
							"output": "#ee518a"
						},
						{
							"step": 11,
							"value": "#ff92ad",
							"output": "#ff92ad"
						},
						{
							"step": 12,
							"value": "#fdd3e8",
							"output": "#fdd3e8"
						}
					],
					"light": [
						{
							"step": 1,
							"value": "#fffcfd",
							"output": "#fffcfd"
						},
						{
							"step": 2,
							"value": "#fef7f9",
							"output": "#fef7f9"
						},
						{
							"step": 3,
							"value": "#ffe9f0",
							"output": "#ffe9f0"
						},
						{
							"step": 4,
							"value": "#fedce7",
							"output": "#fedce7"
						},
						{
							"step": 5,
							"value": "#facedd",
							"output": "#facedd"
						},
						{
							"step": 6,
							"value": "#f3bed1",
							"output": "#f3bed1"
						},
						{
							"step": 7,
							"value": "#eaacc3",
							"output": "#eaacc3"
						},
						{
							"step": 8,
							"value": "#e093b2",
							"output": "#e093b2"
						},
						{
							"step": 9,
							"value": "#e93d82",
							"output": "#e93d82"
						},
						{
							"step": 10,
							"value": "#df3478",
							"output": "#df3478"
						},
						{
							"step": 11,
							"value": "#cb1d63",
							"output": "#cb1d63"
						},
						{
							"step": 12,
							"value": "#621639",
							"output": "#621639"
						}
					],
					"darkAlpha": [
						{
							"value": "hsla(0, 0%, 0%, 0)",
							"step": 1,
							"h": "0",
							"s": "0.00",
							"l": "0.00",
							"a": " 0"
						},
						{
							"value": "hsla(336, 96.8%, 53.2%, 0.045)",
							"step": 2,
							"h": "336",
							"s": "0.97",
							"l": "0.53",
							"a": " 0.045"
						},
						{
							"value": "hsla(335, 98.7%, 59.3%, 0.138)",
							"step": 3,
							"h": "335",
							"s": "0.99",
							"l": "0.59",
							"a": " 0.138"
						},
						{
							"value": "hsla(336, 99.1%, 59.9%, 0.191)",
							"step": 4,
							"h": "336",
							"s": "0.99",
							"l": "0.60",
							"a": " 0.191"
						},
						{
							"value": "hsla(335, 99.4%, 59.4%, 0.244)",
							"step": 5,
							"h": "335",
							"s": "0.99",
							"l": "0.59",
							"a": " 0.244"
						},
						{
							"value": "hsla(335, 99.4%, 59.4%, 0.315)",
							"step": 6,
							"h": "335",
							"s": "0.99",
							"l": "0.59",
							"a": " 0.315"
						},
						{
							"value": "hsla(336, 99.5%, 57.8%, 0.439)",
							"step": 7,
							"h": "336",
							"s": "0.99",
							"l": "0.58",
							"a": " 0.439"
						},
						{
							"value": "hsla(336, 99.9%, 55.4%, 0.642)",
							"step": 8,
							"h": "336",
							"s": "1.00",
							"l": "0.55",
							"a": " 0.642"
						},
						{
							"value": "hsla(336, 99.9%, 62.8%, 0.903)",
							"step": 9,
							"h": "336",
							"s": "1.00",
							"l": "0.63",
							"a": " 0.903"
						},
						{
							"value": "hsla(339, 99.9%, 66.3%, 0.934)",
							"step": 10,
							"h": "339",
							"s": "1.00",
							"l": "0.66",
							"a": " 0.934"
						},
						{
							"value": "hsla(341, 99.9%, 69.5%, 0.965)",
							"step": 11,
							"h": "341",
							"s": "1.00",
							"l": "0.69",
							"a": " 0.965"
						},
						{
							"value": "hsla(327, 100%, 97.1%, 0.980)",
							"step": 12,
							"h": "327",
							"s": "1.00",
							"l": "0.97",
							"a": " 0.980"
						}
					],
					"lightAlpha": [
						{
							"value": "hsla(340, 100%, 51.0%, 0.012)",
							"step": 1,
							"h": "340",
							"s": "1.00",
							"l": "0.51",
							"a": " 0.012"
						},
						{
							"value": "hsla(330, 100%, 51.0%, 0.032)",
							"step": 2,
							"h": "330",
							"s": "1.00",
							"l": "0.51",
							"a": " 0.032"
						},
						{
							"value": "hsla(332, 99.1%, 47.1%, 0.063)",
							"step": 3,
							"h": "332",
							"s": "0.99",
							"l": "0.47",
							"a": " 0.063"
						},
						{
							"value": "hsla(331, 99.9%, 44.3%, 0.102)",
							"step": 4,
							"h": "331",
							"s": "1.00",
							"l": "0.44",
							"a": " 0.102"
						},
						{
							"value": "hsla(333, 99.9%, 42.3%, 0.153)",
							"step": 5,
							"h": "333",
							"s": "1.00",
							"l": "0.42",
							"a": " 0.153"
						},
						{
							"value": "hsla(333, 99.5%, 40.5%, 0.224)",
							"step": 6,
							"h": "333",
							"s": "0.99",
							"l": "0.41",
							"a": " 0.224"
						},
						{
							"value": "hsla(335, 99.7%, 39.1%, 0.322)",
							"step": 7,
							"h": "335",
							"s": "1.00",
							"l": "0.39",
							"a": " 0.322"
						},
						{
							"value": "hsla(336, 99.5%, 38.5%, 0.440)",
							"step": 8,
							"h": "336",
							"s": "0.99",
							"l": "0.39",
							"a": " 0.440"
						},
						{
							"value": "hsla(336, 99.9%, 44.3%, 0.761)",
							"step": 9,
							"h": "336",
							"s": "1.00",
							"l": "0.44",
							"a": " 0.761"
						},
						{
							"value": "hsla(336, 100%, 42.5%, 0.808)",
							"step": 10,
							"h": "336",
							"s": "1.00",
							"l": "0.42",
							"a": " 0.808"
						},
						{
							"value": "hsla(336, 99.8%, 40.3%, 0.883)",
							"step": 11,
							"h": "336",
							"s": "1.00",
							"l": "0.40",
							"a": " 0.883"
						},
						{
							"value": "hsla(340, 99.0%, 10.0%, 0.950)",
							"step": 12,
							"h": "340",
							"s": "0.99",
							"l": "0.10",
							"a": " 0.950"
						}
					],
					"onWcag": "#000000"
				},
				"themeDirectivesPaths": [
					{
						"target": "brand",
						"validation": [],
						"paths": []
					}
				]
			}
		],
		defaultTheme: 'light',
		enableDarkLightMode: false,
		//playground
		playgroundColorschemeType: "random",
		playgroundRandomSchema: "analogous",
		playgroundLockP: false,
		playgroundLockS: false,
		playgroundLockT: false,

		//#theme
		themePageWidth: 1366,
		themeGap: 20,
		themeOffset: 20,
		themeFontSize: 'm',
		themeLineHeight: 'm',
		themeSectionSpace: 'm',
		themeComponentSpace: 'm',
		themeLineHeightEnabled: true,
		themeSelectionBackground: "var(--hcl-neutral-12)",
		themeSelectionForeground: "var(--hcl-neutral-1)",

		themeSelectionStyle: "background",
		themeSelectionShadowColor: "",
		themeSelectionShadowStrenght: .1,

		themeSelectionAltEnabled: false,
		themeSelectionAltArray: [
			{
				themeSelectionAltBackground: "var(--hcl-brand-9)",
				themeSelectionAltForeground: "var(--hcl-on-brand)",
				themeSelectionSelectorType: "preset",
				themeSelectionAltSelectors: [],
				themeSelectionAltCustomSelectors: "",
				themeSelectionStyle: "shadow",
				themeSelectionShadowColor: "var(--hcl-brand-9)",
				themeSelectionShadowStrenght: .1,
			}
		],
		themeSiteBackground: {
			light: "#ffffff",
			dark: "#121212",
		},
		themeSiteText: {
			light: "#080808",
			dark: "#adacac",
		},
		themeSiteHeadings: {
			light: "#000000",
			dark: "#fafafa",
		},
		//update before

		themeTokens: {
			tokenView: 'label',
			folders: [
				{
					"name": "Headspin",
					"uuid": "headspin-system",
					"id": "6c4caef0-f5ff-4859-8077-5a8e3882031a",
					"active": true,
					"system": true,
					"icon": "ii-headspin-logo",
					"groups": [
						{
							"id": "b6c102ef-62de-4595-85b0-907389994411",
							"uuid": "742fb747-a8cb-4ea6-877a-565d4ee8772e",
							"name": "Headings font size",
							"system": true,
							"note": "",
							"public": false,
							"icon": "ii-typography",
							"group": "dsadasd655das",
							"data": [
								{
									"id": "76c9f5aa-6ad1-42c7-9da7-577004a34483",
									"uuid": "6c61c21e-7de1-4aa5-a6f2-ddf2b0cfc67f",
									"label": "Heading size H0",
									"cssVar": "--hfs-h0",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 49,
									"fluidMax": 76
								},
								{
									"id": "3cfbede7-cfbe-4c97-a0c9-36e9e2eb036c",
									"uuid": "254b2e6b-c4ab-4951-91db-ef3aec1ac322",
									"label": "Heading size H1",
									"cssVar": "--hfs-h1",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 39,
									"fluidMax": 57
								},
								{
									"id": "dba6696d-0c10-4c98-b31b-578c27860c60",
									"uuid": "51ec0faa-a69a-4a09-a21c-e77493ae93e7",
									"label": "Heading size H2",
									"cssVar": "--hfs-h2",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 31,
									"fluidMax": 43
								},
								{
									"id": "8e83d8c7-9bc3-470b-adf5-65248420281b",
									"uuid": "f3d6c99b-c8bf-4f44-b7e8-3a9bf0c5706f",
									"label": "Heading size H3",
									"cssVar": "--hfs-h3",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 25,
									"fluidMax": 32
								},
								{
									"id": "b5366ad2-99b2-4931-bb54-0ec2aec1180e",
									"uuid": "6935eaf2-927f-4f5d-a97e-879070ca4b90",
									"label": "Heading size H4",
									"cssVar": "--hfs-h4",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 20,
									"fluidMax": 24
								},
								{
									"id": "16dd424c-2d49-4231-b53f-5bddf161a5d9",
									"uuid": "761dbafe-86ba-41ce-8ce7-dabbef136072",
									"label": "Heading size H5",
									"cssVar": "--hfs-h5",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 16,
									"fluidMax": 18
								},
								{
									"id": "88c5816f-156e-4494-8ef5-7f0bc7d7d29c",
									"uuid": "6ed8c5d5-90a1-4a49-b724-01d911489379",
									"label": "Heading size H6",
									"cssVar": "--hfs-h6",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 16,
									"fluidMax": 18
								}
							],
							"convention": "--hfs-h"
						},
						{
							"id": "299ae9ba-6a6b-468e-a5ed-6417307ac5fe",
							"uuid": "49c2d9d4-7717-434b-8d61-a7a9977abd6a",
							"name": "Text font sizes",
							"system": true,
							"note": "",
							"public": false,
							"icon": "ii-typography",
							"group": "dsadasd655das",
							"data": [
								{
									"id": "3794f03d-0708-40e7-a38a-528bb7dd96b4",
									"uuid": "7842f0c4-10f6-433c-bb39-7a506d784910",
									"label": "Text size L",
									"cssVar": "--hfs-text-l",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 20,
									"fluidMax": 24
								},
								{
									"id": "567dfe24-6f89-40c2-bf39-5afd4126c8d4",
									"uuid": "6834d931-073f-4028-af4a-ed7228c06fa3",
									"label": "Text size M",
									"cssVar": "--hfs-text-m",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 16,
									"fluidMax": 18
								},
								{
									"id": "1a0c61ed-05c0-45a7-8256-4f5950035853",
									"uuid": "133b7eeb-9fe1-4159-a853-faab25aa25a2",
									"label": "Text size S",
									"cssVar": "--hfs-text-s",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 14,
									"fluidMax": 14
								}
							],
							"convention": "--hfs-text-"
						},
						{
							"id": "a56a5343-e7ae-4825-b60e-20a002fb484a",
							"uuid": "f280e62c-08ef-4e59-a869-acad2d632a2b",
							"name": "Spacing",
							"system": true,
							"note": "",
							"public": false,
							"icon": "ii-size",
							"group": "dsadasd655das",
							"data": [
								{
									"id": "52c090e6-464d-48a0-90df-a743d104a6d7",
									"uuid": "7d4adb26-ed81-46a7-81e9-e85883c43798",
									"label": "Space XXL",
									"cssVar": "--hsp-xxl",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 57,
									"fluidMax": 76
								},
								{
									"id": "21bd9649-3623-475b-b7be-172059100e35",
									"uuid": "6f2f4895-7773-4dd0-88ae-3081efde7371",
									"label": "Space XL",
									"cssVar": "--hsp-xl",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 43,
									"fluidMax": 57
								},
								{
									"id": "97685578-7e08-4cba-97d5-2af78e56d383",
									"uuid": "579df2db-47e4-4e90-9025-6f51441c360a",
									"label": "Space L",
									"cssVar": "--hsp-l",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 32,
									"fluidMax": 43
								},
								{
									"id": "b40e90cc-2dcc-4779-881e-539a37828e71",
									"uuid": "022c37ba-47f2-4407-ae27-aeb6f1760a21",
									"label": "Space M",
									"cssVar": "--hsp-m",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 24,
									"fluidMax": 32
								},
								{
									"id": "ee3cef46-7d13-46c5-8d66-2dc10053b6a5",
									"uuid": "c263f46c-cbcd-4cb8-9b7f-59eb522af9c4",
									"label": "Space S",
									"cssVar": "--hsp-s",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 18,
									"fluidMax": 24
								},
								{
									"id": "c6c282e7-09ea-45dd-aada-9c09926610f6",
									"uuid": "4c6e1b8c-827b-41b1-b978-26c107b3a596",
									"label": "Space XS",
									"cssVar": "--hsp-xs",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 13,
									"fluidMax": 18
								},
								{
									"id": "8109c4c6-046c-4512-b696-19c678203beb",
									"uuid": "47ece1f6-14d3-4e93-ab9a-b869eb3e4e5b",
									"label": "Space XXS",
									"cssVar": "--hsp-xxs",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 10,
									"fluidMax": 13
								}
							],
							"convention": "--hsp-"
						},
						{
							"id": "4a6cd9d7-9b80-4131-ab07-b153b70a901a",
							"uuid": "ecc81da5-53de-4abb-9bb4-6585e93fcab9",
							"name": "Section Spacing",
							"system": true,
							"note": "",
							"public": false,
							"icon": "ii-line-height",
							"group": "dsadasd655das",
							"data": [
								{
									"id": "5faf393b-d48d-4e18-8d6f-b6b95b80df49",
									"uuid": "e4acd40c-3e2d-4c26-a577-4a93b7a35269",
									"label": "Section space XXL",
									"cssVar": "--hss-xxl",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 156,
									"fluidMax": 208
								},
								{
									"id": "7077bda8-1e3d-4a51-b9d5-8068eb99f160",
									"uuid": "7f75fca7-7470-4d6c-891c-4564f8caca37",
									"label": "Section space XL",
									"cssVar": "--hss-xl",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 117,
									"fluidMax": 156
								},
								{
									"id": "f9e5c221-f16d-43c0-858c-bf2a98b244ab",
									"uuid": "43999cba-9bf1-4f7d-80ea-46144dc76b21",
									"label": "Section space L",
									"cssVar": "--hss-l",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 88,
									"fluidMax": 117
								},
								{
									"id": "90f8b640-9a25-4037-b603-d17a542f0be4",
									"uuid": "a4165d71-3827-463b-a50a-9dbdb2d5f15e",
									"label": "Section space M",
									"cssVar": "--hss-m",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 66,
									"fluidMax": 88
								},
								{
									"id": "f2fd8241-d1a6-4f18-bc8e-b663cf5b2351",
									"uuid": "50a35b7b-433e-476a-bc76-54ef3608588a",
									"label": "Section space S",
									"cssVar": "--hss-s",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 49,
									"fluidMax": 66
								},
								{
									"id": "129c891b-f854-4273-8627-b14ab3f2d829",
									"uuid": "70196ab9-ed04-4638-9dd7-b21951a0e537",
									"label": "Section space XS",
									"cssVar": "--hss-xs",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 37,
									"fluidMax": 50
								},
								{
									"id": "c09a7a05-8299-4943-9f8a-30110ac0eb3c",
									"uuid": "a32e9518-2e8e-4150-b22a-ce4de728768f",
									"label": "Section space XXS",
									"cssVar": "--hss-xxs",
									"method": "fluid2",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"fluidMin": 28,
									"fluidMax": 37
								}
							],
							"convention": "--hss-"
						},
						{
							"id": "abec4310-68fe-4aaf-8f24-2d5a9dc9e686",
							"uuid": "08e5a5b8-bb6f-4ca1-9263-1fd2d8e74488",
							"name": "Border radius",
							"system": true,
							"note": "",
							"public": false,
							"icon": "ii-border",
							"group": "dsadasd655das",
							"data": [
								{
									"id": "62e9cf66-a61f-4563-8883-273a5484cfdc",
									"uuid": "0f940c92-d679-4870-92e2-681ecf8ec611",
									"label": "Radius S",
									"cssVar": "--hrd-s",
									"method": "plainText",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"plainText": "10px"
								},
								{
									"id": "c3fae00c-bc8e-4be7-a039-f48cfa23ea7a",
									"uuid": "d59a182e-181b-4fbb-8505-5c18630c3157",
									"label": "Radius M",
									"cssVar": "--hrd-m",
									"method": "plainText",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"plainText": "16px"
								},
								{
									"id": "8eb971bf-6880-472e-8a1b-dc3448be5ddb",
									"uuid": "0b8f7c41-c90c-4831-af2a-e3f7de61ded2",
									"label": "Radius L",
									"cssVar": "--hrd-l",
									"method": "plainText",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"plainText": "24px"
								},
								{
									"id": "1a882bf1-c429-444e-84c9-f041122aa4e7",
									"uuid": "9c735dfb-1d18-4203-8e21-e5bb25bc9f5c",
									"label": "Radius PILL",
									"cssVar": "--hrd-pill",
									"method": "plainText",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"plainText": "500px"
								},
								{
									"id": "bcc1c5dd-120d-4381-856f-a4a4e6ae1a7b",
									"uuid": "c06eb55e-f75e-4be7-be91-cd659eb13cbd",
									"label": "Radius ATOM",
									"cssVar": "--hrd-atom",
									"method": "plainText",
									"public": true,
									"system": true,
									"linked": true,
									"dark": "",
									"light": "",
									"plainText": "500px"
								}
							],
							"convention": "--hrd-"
						}
					]
				},
				{
					"name": "Breakdance",
					"uuid": "50bf896c-939a-4e1c-bf53-771089e8d668",
					"id": "068675c1-d501-41a3-9843-aa01b5b65f05",
					"system": false,
					"active": false,
					"icon": "ii-breakdance",
					"groups": [
						{
							"id": "257cb3d6-be38-4b8f-9734-fff62a0e5a7a",
							"uuid": "2c9a64b5-5017-4228-825d-2ea3c9a99289",
							"name": "Global colors",
							"icon": "ii-palette",
							"note": "",
							"public": false,
							"group": "dsadasd655das",
							"data": [
								{
									"id": "a41e2864-1480-44ae-8c05-85c9aee8173d",
									"label": "Headings color",
									"cssVar": "--bde-headings-color",
									"method": "colorTable",
									"light": "var(--hsx-headings-color)",
									"dark": "var(--hsx-headings-color)",
									"important": true,
									"desc": "Foreground color used for heading elements on the site",
									"uuid": "addfcb40-9e71-41e1-96e7-aafd59e9181d"
								},
								{
									"id": "b04430cc-451b-45f8-b09a-a049ad4b9dce",
									"label": "Text color",
									"cssVar": "--bde-body-text-color",
									"method": "colorTable",
									"light": "var(--hsx-body-text-color)",
									"dark": "var(--hsx-body-text-color)",
									"important": true,
									"desc": "Foreground color used for text elements on the site",
									"uuid": "ac0f2fc3-5030-4098-8126-ac099c2f6010"
								},
								{
									"id": "81a9a23b-64dd-4015-b6fe-6512fd3f086d",
									"label": "Site main background",
									"cssVar": "--bde-background-color",
									"method": "colorTable",
									"light": "var(--hsx-site-background)",
									"dark": "var(--hsx-site-background)",
									"important": true,
									"desc": "Foreground color used for text elements on the site",
									"uuid": "9b75f219-e96d-4093-8267-3f7eceb64baf"
								},
								{
									"id": "595450be-16f7-4afb-a45a-51f3d90b84bb",
									"label": "Brand color",
									"cssVar": "--bde-brand-primary-color",
									"method": "colorTable",
									"light": "var(--hcl-brand-9)",
									"dark": "var(--hcl-brand-9)",
									"desc": "Foreground color used for text elements on the site",
									"uuid": "69b5cd8e-b9e9-4d6c-a18c-74e54c74d6b0"
								},
								{
									"id": "9f82d452-7480-43a8-a9a0-c76a42d71346",
									"label": "Brand hover color",
									"cssVar": "--bde-brand-primary-color-hover",
									"method": "colorTable",
									"light": "var(--hcl-brand-10)",
									"dark": "var(--hcl-brand-10)",
									"desc": "Foreground color used for text elements on the site",
									"uuid": "99a80a04-6c82-42c6-b7ee-0967eeb0473f"
								},
								{
									"id": "595450be-16f7-4afb-a45a-51y7d90b84bb",
									"label": "Links color",
									"cssVar": "--bde-links-color",
									"method": "colorTable",
									"light": "var(--hcl-brand-9)",
									"dark": "var(--hcl-brand-9)",
									"desc": "Foreground color used for links",
									"uuid": "69b5cd8e-b9e9-4d6c-a18c-74e54c74d6b0"
								},
								{
									"id": "9f82d452-7480-43a8-a9a0-c76x92d71346",
									"label": "Links hover color",
									"cssVar": "--bde-links-color-hover",
									"method": "colorTable",
									"light": "var(--hcl-brand-10)",
									"dark": "var(--hcl-brand-10)",
									"desc": "Foreground color used for links when hovered",
									"uuid": "99a80a04-6c82-42c6-b7ee-0967eeb0473f"
								}
							],
							"convention": ""
						},
						{
							"id": "23d33ffe-5520-49c7-acdc-e31a9ba08fde",
							"uuid": "ee3540e4-115c-47d1-8949-d1c0e55d616c",
							"name": "Font sizes",
							"note": "",
							"public": false,
							"group": "dsadasd655das",
							"data": [
								{
									"id": "7aad44ea-ced3-47da-a4a7-54d5686dcc0b",
									"label": "H1 Headings",
									"cssVar": "--bde-h1-font-size",
									"method": "plainText",
									"dark": "",
									"light": "",
									"plainText": "var(--hfs-h1)",
									"uuid": "ee0704fd-4b8f-4fa7-be69-a3e1646486d1"
								},
								{
									"id": "1d467a1a-8207-4bcc-b769-b1b25060ccb1",
									"label": "H2 Headings",
									"cssVar": "--bde-h2-font-size",
									"method": "plainText",
									"dark": "",
									"light": "",
									"plainText": "var(--hfs-h2)",
									"uuid": "f45b39b4-c5b0-4d1b-9d5d-697a064610f7"
								},
								{
									"id": "bd1551a0-2aa9-4816-8fdc-6df7d3ec3e43",
									"label": "H3 Headings",
									"cssVar": "--bde-h3-font-size",
									"method": "plainText",
									"dark": "",
									"light": "",
									"plainText": "var(--hfs-h3)",
									"uuid": "c1d5e4cf-91db-4e52-ac57-14837c68f036"
								},
								{
									"id": "acfcea26-0a0b-4196-abb4-9c754f0cd6f1",
									"label": "H4 Headings",
									"cssVar": "--bde-h4-font-size",
									"method": "plainText",
									"dark": "",
									"light": "",
									"plainText": "var(--hfs-h4)",
									"uuid": "291f1d47-fb2b-4c8a-aab4-d9052b39b68c"
								},
								{
									"id": "80324c8a-0f86-4367-bc8a-8e5bef5339df",
									"label": "H5 Headings",
									"cssVar": "--bde-h5-font-size",
									"method": "plainText",
									"dark": "",
									"light": "",
									"plainText": "var(--hfs-h5)",
									"uuid": "3d0f729c-dd9e-43d5-b6f2-0f59b85f7a2b"
								},
								{
									"id": "4274a841-4118-495a-b9a3-7d570abfdb23",
									"label": "H6 Headings",
									"cssVar": "--bde-h6-font-size",
									"method": "plainText",
									"dark": "",
									"light": "",
									"plainText": "var(--hfs-h6)",
									"uuid": "01fb5e44-735d-406b-8597-562cf273d406"
								},
								{
									"id": "211d4df4-9e72-48fd-8c1e-73d8a21217a4",
									"label": "Text (body)",
									"cssVar": "--bde-body-font-size",
									"method": "plainText",
									"dark": "",
									"light": "",
									"plainText": "var(--hfs-text-m)",
									"uuid": "688785fe-f5c7-4b4d-a7df-c1cd53210384"
								}
							],
							"icon": "ii-typography",
							"convention": ""
						}
					]
				},

			],
		},

		projectRadius: 'none',
		themeEnablePairing: false,
		//radius
		radiusActive: 'medium',
		radiusSettings: {
			radius1: {
				varName: '--hrd-s',
				label: 's',
				value: '6px',
			},
			radius2: {
				varName: '--hrd-m',
				label: 'm',
				value: '8px',
			},
			radius3: {
				varName: '--hrd-l',
				label: 'l',
				value: '12px',
			},
			radiusPill: {
				varName: '--hrd-pill',
				label: 'pill',
				value: '500px',
			},
			radiusbutton: {
				varName: '--hrd-atom',
				label: 'atom',
				value: '6px',
			},
		},
	});
	Alpine.store('colorWheel', {
		wheel: '',
		colorToEdit: '',
		mode: '',
		tcpValue: '',
		tcpRef: null,
		tcpEditing: '',
		tcpIndex: null,
		tcpMode: 'picker',
		neutralMatcher() {
			if (!Alpine.store('pd').neutralColorSchema.linked) return false;
			let val = Alpine.store('pd').brandColorSchema.data.light[8].value;
			let hue = chroma(val).hsv()[0];
			let p = chroma.hsv(hue, 0.15, 0.35, 'hsv').hex();
			Alpine.store('project').applyRadixColor(p, Alpine.store('pd').neutralColorSchema);
			this.neutralsOptimizer();

		},
		neutralsOptimizer() {
			Alpine.store('pd').version = '2.0.2';
			//=== DARK
			Alpine.store('pd').neutralColorSchema.data.dark[8].value = "#ffffff";
			Alpine.store('pd').neutralColorSchema.data.darkAlpha[8].value = "#ffffff";
			Alpine.store('pd').neutralColorSchema.data.dark[8].output = "#ffffff";
			Alpine.store('pd').neutralColorSchema.data.darkAlpha[8].output = "#ffffff";


			//#aeaeae
			Alpine.store('pd').neutralColorSchema.data.dark[9].value = "#aeaeae";
			Alpine.store('pd').neutralColorSchema.data.darkAlpha[9].value = "#aeaeae";
			Alpine.store('pd').neutralColorSchema.data.dark[9].output = "#aeaeae";
			Alpine.store('pd').neutralColorSchema.data.darkAlpha[9].output = "#aeaeae";

			//=== LIGHT
			Alpine.store('pd').neutralColorSchema.data.light[8].value = "#000000";
			Alpine.store('pd').neutralColorSchema.data.lightAlpha[8].value = "#000000";
			Alpine.store('pd').neutralColorSchema.data.light[8].output = "#000000";
			Alpine.store('pd').neutralColorSchema.data.lightAlpha[8].output = "#000000";

			//#1e1e1e
			Alpine.store('pd').neutralColorSchema.data.light[9].value = "#1e1e1e";
			Alpine.store('pd').neutralColorSchema.data.lightAlpha[9].value = "#1e1e1e";
			Alpine.store('pd').neutralColorSchema.data.light[9].output = "#1e1e1e";
			Alpine.store('pd').neutralColorSchema.data.lightAlpha[9].output = "#1e1e1e";

		},
		tcpShow(t, ref, index) {
			let val = false;
			this.tcpRef = null;
			this.tcpEditing = t;
			this.tcpMode = 'picker';
			if (t === 'brand') {
				val = Alpine.store('pd').brandColorSchema.data.light[8].value;
			}
			else if (t === 'neutral') {
				val = Alpine.store('pd').neutralColorSchema.data.light[8].value;
			}
			else if (t === 'customSchema') {
				//Problematic: problem with tcpRef = null
				this.tcpRef = ref;
				val = ref.data.light[8].output;
			}
			else if (t === 'customSchemaIndex') {
				this.tcpIndex = index;
				val = Alpine.store('pd').colorSchemas[index].data.light[8].output;
			}
			else if (t === '$store') {
				//Problematic because of pass by value
				val = ref;
				this.tcpRef = ref;
			}
			else if (t === 'ref') {
				this.tcpRef = ref.closest('.ref').querySelector('input')
				val = this.tcpRef.value;
			}
			if (val) {
				tippyColorpicker.hex = val;
			}
		},
		tcpOnChange() {
			tippyColorpicker.hex = this.tcpValue;
			let t = this.tcpEditing;
			let p = this.tcpValue;
			let targetScheme = null;
			if (t === 'brand') {
				targetScheme = Alpine.store('pd').brandColorSchema;
				Alpine.store('project').applyRadixColor(p, targetScheme);
				this.neutralMatcher();
			}
			else if (t === 'neutral') {
				targetScheme = Alpine.store('pd').neutralColorSchema;
				Alpine.store('project').applyRadixColor(p, targetScheme);
			}
			else if (t === 'customSchema') {
				targetScheme = this.tcpRef;
				Alpine.store('project').applyRadixColor(p, targetScheme);
			}
			else if (t === 'customSchemaIndex') {
				targetScheme = Alpine.store('pd').colorSchemas[this.tcpIndex];
				Alpine.store('project').applyRadixColor(p, targetScheme);
			}
			else if (t === '$store') {
				this.tcpRef = p;
			}
			else if (t === 'ref') {
				this.tcpRef.value = p;
				this.tcpRef.dispatchEvent(new Event('input', { bubbles: true }));
			}
			this.neutralsOptimizer();
		},
		tcpBlank() { },
	});

	Alpine.store('project', {
		defSelector: ':root:root',
		lightSelector:
			':root:root[data-hsx=\x22light\x22], [data-hsx=\x22light\x22]',
		darkSelector:
			':root:root[data-hsx=\x22dark\x22], [data-hsx=\x22dark\x22]',
		pageWidth: 1366,
		baseFontSize: 16,
		prefix: '--b',
		minViewport: 479,
		maxViewport: 1119,
		layoutDisplay: {
			"variable": '--hsx-page-display',
			"root": "grid",
			"page": "flex"
		},
		proMode: false,
		paletteOutput: true,
		containerQueries: true,
		vars: [],
		invalidColorSchemaInput: false,
		invalidMSG: '',
		schemaMode: 'creating',
		schemaEditorTab: 'radix',
		schemaToEdit: 'none',
		schemaEditIndex: -1,
		newSchemaName: '',
		previewLight: [],
		previewDark: [],
		previewOnColor: '#ffffff',
		previewSchemaName: '',
		editingSchemaName: '',
		editingSchemaData: {},
		brandIndex: -1,
		customColorPrototype: {},
		newColorType: 'radix',
		neutralIndex: -1,
		colorIndex: -1,
		customColorProfile: 'null',
		schemaEdit: false,
		advancedTypography: false,
		advancedSpacing: false,
		customColorErrors: [],
		generateSelectionCSS() {
			let a, b;
			a = this.generateBaseSelectionCSS();
			b = this.generateAltSelectionCSS();
			return a + b;
		},
		generateBaseSelectionCSS() {
			let css = '';
			let out = '';
			if (Alpine.store('pd').themeSelectionStyle == 'background') {
				if (Alpine.store('pd')?.themeSelectionBackground?.length > 2) {
					css += `background-color: ${Alpine.store('pd')?.themeSelectionBackground};`;

				}
			}
			else {
				if (Alpine.store('pd')?.themeSelectionShadowColor?.length > 2) {
					let shadow = this.generateSelectionShadow(Alpine.store('pd')?.themeSelectionShadowColor, 0, Alpine.store('pd')?.themeSelectionShadowStrenght)
					css += `text-shadow: ${shadow};`;
				}
			}

			if (Alpine.store('pd')?.themeSelectionForeground?.length > 3) {
				css += `color: ${Alpine.store('pd')?.themeSelectionForeground};`;
				css += `-webkit-text-fill-color: ${Alpine.store('pd')?.themeSelectionForeground};`;
			}
			out = `\n::selection{ ${css} }`;
			return out;
		},
		generateAltSelectionCSS() {
			return '';
			let css = '';
			let out = '';
			if (Alpine.store('pd').themeSelectionStyle == 'background') {
				if (Alpine.store('pd')?.themeSelectionBackground?.length > 2) {
					css += `background-color: ${Alpine.store('pd')?.themeSelectionBackground};`;

				}
			}
			else {
				if (Alpine.store('pd')?.themeSelectionShadowColor?.length > 2) {
					let shadow = this.generateSelectionShadow(Alpine.store('pd')?.themeSelectionShadowColor, 0, Alpine.store('pd')?.themeSelectionShadowStrenght)
					css += `text-shadow: ${shadow};`;
				}
			}

			if (Alpine.store('pd')?.themeSelectionForeground?.length > 3) {
				css += `color: ${Alpine.store('pd')?.themeSelectionForeground};`;
				css += `-webkit-text-fill-color: ${Alpine.store('pd')?.themeSelectionForeground};`;
			}
			return '';
		},
		generateSelectionShadow(sColor, sStart, sWidth) {
			let output = '';
			let a = sStart;
			let x = a;
			let y = a;
			const i = 0.0025; // em
			const sSize = sWidth + sStart;

			while (x <= sSize + i) {
				output += `${x.toFixed(4)}em ${y.toFixed(4)}em 0 ${sColor}`;
				if (sSize >= x) {
					output += ', ';
				}
				y += i;
				x += i;
			}
			return output.trim().replace(/, $/, '');

		},
		conicGradient(colors) {
			const borderColor = 'rgba(0,0,0,0.1)';
			const borderWidth = 0.0;
			const n = colors.data[Alpine.store('pd').defaultTheme].length;
			const step = 100 / n;
			const gap = borderWidth;
			const stops = colors.data[Alpine.store('pd').defaultTheme]
				.map((color, i) => {
					const start = i * step;
					const end = (i + 1) * step - gap;
					const borderStart = end;
					const borderEnd = end + gap;
					return `${color.output} ${start}% ${end}%, ${borderColor} ${borderStart}% ${borderEnd}%`;
				})
				.join(', ');
			return `conic-gradient(${stops})`;
		},
		previewColor(m, v) {
			let r = "#ffffff"
			try {
				r = chroma(v).hex()

			} catch (error) {
				r = Alpine.store('project').tokens__getColorVal(m, v);
			}
			return r;
		},
		mixEmphasisColor(targetColor, contrastColor, backgroundColor) {
			let step = 0.02;
			let ratioStart = 0;
			let contrastRatio = 3;
			let mixedColor = targetColor;

			while (true) {
				const currentContrast = chroma.contrast(mixedColor, backgroundColor);

				if (currentContrast >= contrastRatio || ratioStart >= 1) {
					break;
				}

				ratioStart += step;
				mixedColor = chroma.mix(targetColor, contrastColor, ratioStart, "lrgb").hex();
			}



		},
		getContrastColor() {

		},
		getWcagContrastColor() {

		},
		getAccentColor() {

		},
		getColorSchemaNames() {
			let arr = ['brand'];
			Alpine.store('pd').colorSchemas.forEach(s => {
				arr.push(s.name)
			});
			return arr;
		},
		getColorPalettes() {
			let arr = ['brand'];
			Alpine.store('pd').colorSchemas.forEach(s => {
				arr.push(s.name)
			});
			return arr;
		},
		baseThemeSelector() {
			var base = Alpine.store('pd').defaultTheme;
			var alt = 'dark';
			if (base == 'dark') alt = 'light';
			return `html:root, [data-hsx*="${base}"], html:root[data-hsx*="${alt}"] [data-hsx*="inverted"]`;
			//
		},
		altThemeSelector() {
			var base = Alpine.store('pd').defaultTheme;
			var alt = 'dark';
			if (base == 'dark') alt = 'light';
			return `:root:root[data-hsx*="${alt}"], [data-hsx*="${alt}"], html:root[data-hsx*="${base}"] [data-hsx*="invert"]`;
		},

		access: {
			license: "invalid",
			type: "inactive"
		},
		dynamicThemeDirectivesEditor: {
			show: false,
			source: null,
			palette: Alpine.store('pd').brandColorSchema,
			openSchema(i) {
				this.show = true;
				this.index = i;
				if (this.index < 0) {
					if (typeof Alpine.store('pd').brandColorSchema['themeDirectivesPaths'] === 'undefined' || Alpine.store('pd').brandColorSchema['themeDirectivesPaths'].length == 0) {
						Alpine.store('pd').brandColorSchema['themeDirectivesPaths'] = []
					}
					this.source = Alpine.store('pd').brandColorSchema['themeDirectivesPaths']
					this.palette = Alpine.store('pd').brandColorSchema;
				}
				else {
					if (typeof Alpine.store('pd').colorSchemas[i]['themeDirectivesPaths'] === 'undefined' || Alpine.store('pd').colorSchemas[i]['themeDirectivesPaths'].length == 0) {
						Alpine.store('pd').colorSchemas[i]['themeDirectivesPaths'] = []
					}
					this.source = Alpine.store('pd').colorSchemas[i]['themeDirectivesPaths']
					this.palette = Alpine.store('pd').colorSchemas[i];
				}
				this.validator()
			},
			index: -1,
			addGroup() {
				let group = {
					'target': 'brand',
					'validation': [],
					'paths': []
				}
				if (this.source == undefined || (typeof this.source === 'undefined')) {
					this.source = []
				}
				this.source.push(group)
				this.validator()
			},
			addItem(source) {
				let sample = {
					'type': 'data-hsx',
					'value': ''
				}
				if (source == undefined || (typeof source === 'undefined')) {
					source = []
				}
				source.push(sample);
				this.validator()
			},
			deleteItem(paths, index) {
				paths.splice(index, 1);
				this.validator()
			},
			deleteGroup(index) {
				this.source.splice(index, 1);
				this.validator()
			},
			generateValidation(i) {
				let str = '';
				if (this.source == undefined) return false;
				if (this.source[i] == undefined) return false;
				if (this.source[i].validation && this.source[i].validation.length > 0) {
					this.source[i].validation.forEach(v => {
						str += v.message + '\n';
					})
				}
				return str;
			},
			validator() {
				if (this.source == undefined) return false;
				this.source.forEach(s => {
					s.validation = [];
				})
				this.targetVallidator();

			},
			targetVallidator() {
				let array = [];
				const duplicateIndexes = [];
				if (this.source == undefined) return false;
				this.source.forEach(s => {
					array.push(s.target);
				})
				array.forEach((item, index) => {
					if (item == this.palette.name) {
						this.source[index].validation.push({ "type": "TG", "message": "Palette unable override itself" });
					}
					if (array.indexOf(item) !== index) {
						duplicateIndexes.push(index);
					}
				});
				duplicateIndexes.forEach(i => {
					if (this.source[i].validation == undefined) {
						this.source[i].validation = [];
					}
					this.source[i].validation.push({ "type": "TG", "message": "Duplicated target, please remove one of them, first one will be used only" });


				})
			},
			errorAtts(i) {
				let atts = [];
				if (this.source == undefined) return false;
				if (this.source[i].validation == undefined) {
					this.source[i].validation = [];
				}
				this.source[i].validation.forEach(v => {
					atts.push(v.type);
				});
				return atts
			},
			replaceMagic(source, target, str) {
				str = str.trim();
				str = str.replaceAll(' ', '');
				str = str.replaceAll('{source}', source);
				str = str.replaceAll('{s}', source);
				str = str.replaceAll('{src}', source);
				str = str.replaceAll('{target}', target);
				str = str.replaceAll('{t}', target);
				str = str.replaceAll('{tg}', target);

				return str;
			},

			activateTransparentVariantsIfNeeded() {
				if (Alpine.store('pd').brandColorSchema.themeDirectivesPaths == undefined) Alpine.store('pd').brandColorSchema.themeDirectivesPaths = [];
				Alpine.store("pd").colorSchemas.forEach(schema => {
					if (schema.themeDirectivesPaths == undefined) schema.themeDirectivesPaths = [];
				})
				let sourceTargetMap = []
				//TODO: If target does has transparent variant, and source not we have a conflict
				//Instead of doing this at value level and creating chains of conditions, much easier would be to just activate them before dynamic themes are generated
				Alpine.store("pd").brandColorSchema.themeDirectivesPaths.forEach(p => {
					if (p.validation == undefined || p.validation.length == 0) {
						sourceTargetMap.push({ source: 'brand', target: p.target, si: -100, ti: -100 })
					}
				})
				Alpine.store("pd").colorSchemas.forEach(s => {
					s.themeDirectivesPaths.forEach(p => {
						if (p.validation == undefined || p.validation.length == 0) {
							sourceTargetMap.push({ source: s.name, target: p.target })
						}
					})
				})
				sourceTargetMap.forEach(src => {
					if (src.source == 'brand') src.si = -1;
					if (src.target == 'brand') src.ti = -1;
					Alpine.store("pd").colorSchemas.forEach((schema, i) => {
						if (schema.name == src.source) src.si = i;
						if (schema.name == src.target) src.ti = i;
					})
				})
				sourceTargetMap.forEach(src => {
					if (src.si > -2 && src.ti > -2) {
						if (src.ti == -1 && Alpine.store('pd').brandColorSchema.transparentVariants) {
							if (src.si == -1) Alpine.store('pd').brandColorSchema.transparentVariants = true;
							else if (src.si > -1) Alpine.store("pd").colorSchemas[src.si].transparentVariants = true;
						}
						else if (src.ti > -1 && Alpine.store("pd").colorSchemas[src.ti].transparentVariants) {
							if (src.si == -1) Alpine.store('pd').brandColorSchema.transparentVariants = true;
							else if (src.si > -1) Alpine.store("pd").colorSchemas[src.si].transparentVariants = true;
						}

					}
				})
			},
			rulesGeneratorSimple(selectors, source, target) {
				let selBuffer = '', selRulesBuffer = '';

				selectors.forEach((s, i) => {
					if (i > 0) selBuffer = selBuffer + ',\n';
					selBuffer += s;
				})
				source.data['light'].forEach((c, i) => {
					selRulesBuffer += `--hcl-${target.name}-${i + 1}` + ': ' + `var(--hcl-${source.name}-${i + 1});\n`;
					selRulesBuffer += `--hcl-${target.name}-${i + 1}a` + ': ' + `var(--hcl-${source.name}-${i + 1}a);\n`;

				})
				selRulesBuffer += `--hcl-on-${target.name}` + ': ' + `var(--hcl-on-${source.name});\n`;
				selRulesBuffer += `--hcl-${target.name}-emphasis` + ': ' + `var(--hcl-${source.name}-emphasis);\n`;
				return selBuffer + '{ \n' + selRulesBuffer + '\n}'
			},
			errorMessage(validation) {
				let e = {};
				let errors = Alpine.store('project').inbox.errors;
				validation.forEach(err => {
					e['title'] = 'Failed theme override generation';
					e['url'] = '';
					e['level'] = 'Colors: ';
					e['message'] = 'Please navigate: Color Panel > {{error}} palette. Please update configuration';
				});
				errors.push(e);
				e = {};
			},
			generateOutputCSS() {
				this.ensureBasePaths();
				let css = '',
					source = Alpine.store('pd').brandColorSchema,
					e = {},
					errors = Alpine.store('project').inbox.errors;

				Alpine.store('pd').brandColorSchema.themeDirectivesPaths.forEach(p => {
					if (p.validation == undefined || p.validation.length == 0) {
						css += this.generateFragmentCSS(p, Alpine.store('pd').brandColorSchema);
					}
					else { this.errorMessage(p.validation); }
				})
				Alpine.store('pd').neutralColorSchema.themeDirectivesPaths.forEach(p => {
					if (p.validation == undefined || p.validation.length == 0) {
						css += this.generateFragmentCSS(p, Alpine.store('pd').neutralColorSchema);
					}
					else { this.errorMessage(p.validation); }
				})
				Alpine.store('pd').colorSchemas.forEach(schema => {
					source = schema;
					schema.themeDirectivesPaths.forEach(p => {
						if (schema.enabled) {
							if (p.validation == undefined || p.validation.length == 0) {
								css += this.generateFragmentCSS(p, schema);
							}
							else { this.errorMessage(p.validation); }
						}
					})
				})
				return css;
			},
			ensureBasePaths() {
				/* for 
				Alpine.store('pd').neutralColorSchema
				and
				Alpine.store('pd').colorSchemas[n].themeDirectivesPaths

				ensure they have data which is base data
				[{"target":"brand","validation":[],"paths":[]}]
				*/
				const baseBrandData = { "target": "brand", "validation": [], "paths": [] };

				// Helper function to ensure "brand" target exists in paths array
				const ensureBrandTarget = (paths) => {
					if (!paths || !Array.isArray(paths)) {
						return [{ ...baseBrandData }];
					}
					const hasBrand = paths.some(p => p.target === 'brand');
					if (!hasBrand) {
						paths.unshift({ ...baseBrandData });
					}
					return paths;
				};

				// Ensure neutralColorSchema has "brand" target in themeDirectivesPaths
				Alpine.store('pd').neutralColorSchema.themeDirectivesPaths =
					ensureBrandTarget(Alpine.store('pd').neutralColorSchema.themeDirectivesPaths);

				// Ensure each colorSchema has "brand" target in themeDirectivesPaths
				Alpine.store('pd').colorSchemas.forEach(schema => {
					schema.themeDirectivesPaths = ensureBrandTarget(schema.themeDirectivesPaths);
				});
			},
			doesTargetExist(name) {
				let exists = false;
				if (name == 'brand') return true;
				Alpine.store('pd').colorSchemas.forEach(s => {
					if (s.name.toLowerCase() == name.toLowerCase()) exists = true;
				})
				return exists;
			},
			findTarget(name) {
				let target = undefined;
				if (name == 'brand') return Alpine.store('pd').brandColorSchema;
				Alpine.store('pd').colorSchemas.forEach(s => {
					if (s.name.toLowerCase() == name.toLowerCase()) target = s;
				})
				return target;
			},
			/**
			 * 
			 * @param {object} group
			 * paths is array of objects, each object {target<string> name of targeted color palette, 
			 * validation<array> of error which are handled in errorMessage function, 
			 * paths<array> of strings, each string is selector}
			 * @param {object} source 
			 * source is object, which is color palette, which is used as source for generation
			 * @returns {string}
			 */
			generateFragmentCSS(group, source) {
				let selProto = '';
				let css = '';
				let selectors = [];
				let defSelector = `[data-hsx-${group.target.toLowerCase()}="${source.name.toLowerCase()}"]`;
				let targetName = group.target.toLowerCase();
				let sourceName = source.name.toLowerCase();
				let traget;
				//source = source.name.toLowerCase();
				selectors.push(defSelector);
				if (!this.doesTargetExist(targetName)) return css;
				target = this.findTarget(targetName);
				if (target == undefined) return css;
				group.paths.forEach(p => {
					selProto = '';
					if (p.type == 'data-hsx') {
						//add magic to prototype
						selProto = this.replaceMagic(sourceName.toLocaleLowerCase(), targetName.toLowerCase(), `[data-hsx-${targetName.toLowerCase()}="${p.value}"]`);
						if (this.isValidSelector(selProto) && p.value.length > 2) {
							selectors.push(selProto);
						}
					}
					if (p.type == 'custom') {
						//add magic to prototype
						selProto = this.replaceMagic(sourceName.toLocaleLowerCase(), targetName.toLowerCase(), p.value);
						if (this.isValidSelector(selProto) && p.value.length > 2) {
							selectors.push(p.value);
						}
					}
				})
				css = this.rulesGeneratorSimple(selectors, source, target)

				return css;

			},
			isValidSelector(selector) {

				try {
					document.querySelectorAll(selector);
					return true;
				} catch (e) {
					return false;
				}
			}

		},
		tokensColor: {},
		tokenIcons: [
			{
				label: 'Color',
				value: 'ii-palette',
			},
			{
				label: 'Size',
				value: 'ii-size',
			},
			{
				label: 'Radius',
				value: 'ii-border',
			},
			{
				label: 'Font',
				value: 'ii-typography',
			},
			{
				label: 'Line Height',
				value: 'ii-line-height',
			},
			{
				label: 'Line Height',
				value: 'ii-line-height',
			},
			{
				label: 'Token group',
				value: 'ii-token-group',
			},
			{
				label: 'Token group',
				value: 'ii-token',
			},
			{
				label: 'Breakdance',
				value: 'ii-breakdance',
			},
		],
		onInitErrorChecker() {
			this.onInitLicense();
			var e = {};
			var errors = Alpine.store('project').inbox.errors;
			var warnings = Alpine.store('project').inbox.warnings;
			/* 1: Site loaded via https, site URL made as http  */
			if (
				!HeadspinloadData.siteURL.includes('https') &&
				window.location.href.includes('https')
			) {
				e['title'] =
					'An incorrect site URL will result in site resources being blocked and not loading properly.';
				e['url'] = '';
				e['level'] = 'Critical: ';
				e['message'] =
					'Please navigate: WordPress Admin > Settings > and change url to https';
				swal_h({
					title: "WordPress Configuration Error",
					text: e.title + "\n" + e.message,
					button: false,
					icon: 'error',
				});
				errors.push(e);
			}
			if (HeadspinloadData.license.copilot_free == "invalid") {
				e['title'] =
					'Inactive License Key';
				e['url'] = '';
				e['level'] = 'Critical: ';
				e['message'] =
					'Please navigate: Headspin > Settings > License and activate your license in order to receive automatic updates.';

				errors.push(e);
			}
		},
		onInitLicense() {
			if (HeadspinloadData.license.copilot_free == "valid") {
				this.access.license = "valid";
				this.access.type = "free"
			}
			if (HeadspinloadData.license.copilot_pro == "valid") {
				this.access.license = "valid";
				this.access.type = "pro"
			}
		},
		inbox: {
			show: false,
			errors: [],
			warnings: [],
		},
		colorLabel(num) {
			num = num.toString();
			switch (num) {
				case '1':
					return 'Site background'
					break;
				case '2':
					return 'Subtle background'
					break;
				case '3':
					return 'UI element background'
					break;
				case '4':
					return 'Hovered UI element background'
					break;
				case '5':
					return 'Active / Selected UI element background'
					break;
				case '6':
					return 'Subtle borders and separators'
					break;
				case '7':
					return 'UI element border and focus rings'
					break;
				case '8':
					return 'Hovered UI element border'
					break;
				case '9':
					return 'Solid backgrounds (main color)'
					break;
				case '10':
					return 'Hovered solid backgrounds'
					break;
				case '11':
					return 'Low-contrast text'
					break;
				case '12':
					return 'High-contrast text'
					break;

				default:
					return '';
					break;
			}
		},
		colorPreview(color) {
			if (!color?.output) {
				color['output'] = color.value;
			}
			return color.output;

		},
		regenratePaletteOutput() {
			this.toolchainReset();
			if (Alpine.store('pd').enterpriseWorkflows) {
				this.luminanceNormalization();
				this.lightnessNormalization();
			}

		},
		luminanceNormalization() {
			if (!Alpine.store('pd').enterpriseWorkflows) return false;
			//light
			if (Alpine.store('pd').colorNormalization.light == 'luminance') {
				Alpine.store('pd').brandColorSchema.data.light.forEach((bc, i) => {
					var l = Alpine.store('pd').luminance_normalization.light[i].value;
					l = parseFloat(l);
					if (!bc.output) bc['output'] = bc.value;

					if (Alpine.store('pd').luminance_normalization.light[i].enabled) bc.output = chroma(bc.output).luminance(l).hex();


				});

				Alpine.store('pd').neutralColorSchema.data.light.forEach((bc, i) => {
					var l = Alpine.store('pd').luminance_normalization.light[i].value;
					l = parseFloat(l);
					if (!bc.output) bc['output'] = bc.value;
					if (Alpine.store('pd').luminance_normalization.light[i].enabled) bc.output = chroma(bc.output).luminance(l).hex();
				});
				Alpine.store('pd').colorSchemas.forEach(s => {
					s.data.light.forEach((bc, i) => {
						var l = Alpine.store('pd').luminance_normalization.light[i].value;
						l = parseFloat(l);
						if (!bc.output) bc['output'] = bc.value;

						if (Alpine.store('pd').luminance_normalization.light[i].enabled) bc.output = chroma(bc.output).luminance(l).hex();
					});
				})
			}


			//dark
			if (Alpine.store('pd').colorNormalization.dark == 'luminance') {
				Alpine.store('pd').brandColorSchema.data.dark.forEach((bc, i) => {
					var l = Alpine.store('pd').luminance_normalization.dark[i].value;
					l = parseFloat(l)
					if (Alpine.store('pd').luminance_normalization.dark[i].enabled) bc.output = chroma(bc.output).luminance(l).hex();
				});

				Alpine.store('pd').neutralColorSchema.data.dark.forEach((bc, i) => {
					var l = Alpine.store('pd').luminance_normalization.dark[i].value;
					l = parseFloat(l)
					if (Alpine.store('pd').luminance_normalization.dark[i].enabled) bc.output = chroma(bc.output).luminance(l).hex();
				});
				Alpine.store('pd').colorSchemas.forEach(s => {
					s.data.dark.forEach((bc, i) => {
						var l = Alpine.store('pd').luminance_normalization.dark[i].value;
						l = parseFloat(l);
						if (Alpine.store('pd').luminance_normalization.dark[i].enabled) bc.output = chroma(bc.output).luminance(l).hex();
					});
				})
			}



		},
		toolchainReset() {
			Alpine.store('pd').brandColorSchema.data.light.forEach((bc, i) => {
				bc.output = bc.value;
			});

			Alpine.store('pd').neutralColorSchema.data.light.forEach((bc, i) => {
				bc.output = bc.value;
			});
			Alpine.store('pd').colorSchemas.forEach(s => {
				s.data.light.forEach((bc, i) => {
					bc.output = bc.value;
				});
			})
			Alpine.store('pd').brandColorSchema.data.dark.forEach((bc, i) => {
				bc.output = bc.value;
			});

			Alpine.store('pd').neutralColorSchema.data.dark.forEach((bc, i) => {
				bc.output = bc.value;
			});
			Alpine.store('pd').colorSchemas.forEach(s => {
				s.data.dark.forEach((bc, i) => {
					bc.output = bc.value;
				});
			})
		},
		lightnessNormalization() {
			if (!Alpine.store('pd').enterpriseWorkflows) return false;
			//light
			if (Alpine.store('pd').colorNormalization.light == 'oklch_lightness') {
				Alpine.store('pd').brandColorSchema.data.light.forEach((bc, i) => {
					var targetL = Alpine.store('pd').lightness_normalization.light[i].value;
					const { enabled } = Alpine.store('pd').lightness_normalization.light[i]
					targetL = parseFloat(targetL)
					let [l, c, h] = chroma(bc.output).oklch();
					if (enabled) bc.output = chroma.oklch(targetL, c, h).hex();
				});

				Alpine.store('pd').neutralColorSchema.data.light.forEach((bc, i) => {
					var targetL = Alpine.store('pd').lightness_normalization.light[i].value;
					const { enabled } = Alpine.store('pd').lightness_normalization.light[i]
					targetL = parseFloat(targetL)
					let [l, c, h] = chroma(bc.output).oklch();
					if (enabled) bc.output = chroma.oklch(targetL, c, h).hex();
				});
				Alpine.store('pd').colorSchemas.forEach(s => {
					s.data.light.forEach((bc, i) => {
						var targetL = Alpine.store('pd').lightness_normalization.light[i].value;
						const { enabled } = Alpine.store('pd').lightness_normalization.light[i]
						targetL = parseFloat(targetL)
						let [l, c, h] = chroma(bc.output).oklch();
						if (enabled) bc.output = chroma.oklch(targetL, c, h).hex();
					});
				})
			}
			console.log(Alpine.store('pd').brandColorSchema.data.light[0])

			//dark
			if (Alpine.store('pd').colorNormalization.dark == 'oklch_lightness') {
				Alpine.store('pd').brandColorSchema.data.dark.forEach((bc, i) => {
					var targetL = Alpine.store('pd').lightness_normalization.dark[i].value;
					const { enabled } = Alpine.store('pd').lightness_normalization.dark[i]
					targetL = parseFloat(targetL)
					let [l, c, h] = chroma(bc.output).oklch();
					if (enabled) bc.output = chroma.oklch(targetL, c, h).hex();
				});

				Alpine.store('pd').neutralColorSchema.data.dark.forEach((bc, i) => {
					var targetL = Alpine.store('pd').lightness_normalization.dark[i].value;
					const { enabled } = Alpine.store('pd').lightness_normalization.dark[i]
					targetL = parseFloat(targetL)
					let [l, c, h] = chroma(bc.output).oklch();
					if (enabled) bc.output = chroma.oklch(targetL, c, h).hex();
				});
				Alpine.store('pd').colorSchemas.forEach(s => {
					s.data.dark.forEach((bc, i) => {
						var targetL = Alpine.store('pd').lightness_normalization.dark[i].value;
						const { enabled } = Alpine.store('pd').lightness_normalization.dark[i]
						targetL = parseFloat(targetL)
						let [l, c, h] = chroma(bc.output).oklch();
						if (enabled) bc.output = chroma.oklch(targetL, c, h).hex();
					});
				})
			}

		},
		getTokensPreview(pattern) {
			var arr = [];

			var token = {};
			Alpine.store("pd").themeTokens.folders.forEach(c => {
				if (c.name == "Headspin") {
					c.groups.forEach(g => {
						if (g.convention.includes(pattern)) {
							g.data.forEach(t => {
								token['label'] = t['label'];
								token['plainText'] = t['plainText'];
								if (t['method'] == 'fluid2') {
									token['min'] = t['fluidMin'] + 'px';
									token['max'] = t['fluidMax'] + 'px';
								}
								else {
									token['min'] = t['plainText'];
									token['max'] = t['plainText'];
								}

								token['linked'] = t['linked'];
								arr.push(token)
								token = {};
							})
						}
					})
				}
			});
			return arr;
		},
		colorContainsToken(color) {
			if (!color) return false;
			if (color.includes('var(--hcl-') && color.includes(')'))
				return true;
			return false;
		},
		colorTokenFormat(color) {
			if (!color) return false;
			color = color.replaceAll('var(--hcl-', '');
			color = color.replaceAll(')', '');
			color = color.replaceAll('-', ' / ');
			return color;
		},
		plainTokenFormat(t) {
			if (t == undefined || t == null) return t;
			t = t.replaceAll('var(--hfs-', 'Font Size / ');
			t = t.replaceAll('var(--hrd-', 'Radius / ');
			t = t.replaceAll('var(--hsp-', 'Spacing / ');
			t = t.replaceAll('var(--hss-', 'Section Spacing / ');
			t = t.replaceAll(')', '');
			t = t.replaceAll('-', ' / ');
			return t;
		},
		plainContainsToken(t) {
			if (t == undefined || t == null) return false;
			if (t.includes('var(--hfs-') && t.includes(')')) return true;
			else if (t.includes('var(--hrd-') && t.includes(')'))
				return true;
			else if (t.includes('var(--hsp-') && t.includes(')'))
				return true;
			else if (t.includes('var(--hss-') && t.includes(')'))
				return true;
			return false;
		},
		systemTokenEngine(target, token) {
			var c = undefined;
			var g = undefined;
			var t = undefined;
			//var t = this.tokenBoilerplate();
			var key = "";

			//locate Headspin collection
			Alpine.store("pd").themeTokens.folders.forEach(f => {
				if (f.uuid == 'headspin-system') c = f;
			})
			//locate right token group
			c.groups.forEach(gr => {
				if (token['var'].includes(gr['convention'])) g = gr;
			})
			//we have some problem
			if (!g) return false;
			g.data.forEach(tokenVar => {
				if (tokenVar.cssVar == token['var']) t = tokenVar;
			})

			if (target == 'radius' && g['convention'] == "--hrd-" && t && t['linked'] == true) {
				key = "--hrd-";
				t['method'] = "plainText";
				t['cssVar'] = token['var'];
				t['plainText'] = token['value'];
			}
			else if (target == 'heading size' && g['convention'] == "--hfs-h" && g['convention'] != "--hfs-text-" && t && t['linked'] == true) {
				key = "--hfs-h";
				t['method'] = "fluid2";
				t['cssVar'] = token['var'];
				t['fluidMin'] = token['min'];
				t['fluidMax'] = token['max'];
			}
			else if (target == 'text size' && g['convention'] == "--hfs-text-" && t && t['linked'] == true) {

				key = "--hfs-text";
				t['method'] = "fluid2";
				t['cssVar'] = token['var'];
				t['fluidMin'] = token['min'];
				t['fluidMax'] = token['max'];
			}
			else if (target == 'space' && g['convention'] == "--hsp-" && t && t['linked'] == true) {
				key = "--hfs-text";
				t['method'] = "fluid2";
				t['cssVar'] = token['var'];
				t['fluidMin'] = token['min'];
				t['fluidMax'] = token['max'];
			}
			else if (target == 'section space' && g['convention'] == "--hss-" && t && t['linked'] == true) {
				key = "--hfs-text";
				t['method'] = "fluid2";
				t['cssVar'] = token['var'];
				t['fluidMin'] = token['min'];
				t['fluidMax'] = token['max'];
			}
		},

		systemTokenEngine_generate(target, token) {
			var c = undefined;
			var g = undefined;
			var t = this.tokenBoilerplate();
			var key = "";

			//locate Headspin collection
			Alpine.store("pd").themeTokens.folders.forEach(f => {
				if (f.uuid == 'headspin-system') c = f;
			})
			//locate right token group
			c.groups.forEach(gr => {
				if (token['var'].includes(gr['convention'])) g = gr;
			})

			if (!g) return false;

			if (target == 'radius' && g['convention'] == "--hrd-") {
				//check if radius is changed, or we are going to skip that
				//danger, when checking oldVal != newVal because of settings change
				//we need reliable way to check is this value from the system
				key = "--hrd-";
				t['method'] = "plainText";
				t['system'] = true;
				t['linked'] = true;
				t['cssVar'] = token['var'];
				t['plainText'] = token['value'];
				t['label'] = "Radius " + token['label'].toUpperCase();
				g.data.push(t)
			}
			else if (target == 'heading size' && g['convention'] == "--hfs-h" && g['convention'] != "--hfs-text") {
				//check if radius is changed, or we are going to skip that
				//danger, when checking oldVal != newVal because of settings change
				//we need reliable way to check is this value from the system
				key = "--hfs-h";
				t['method'] = "fluid2";
				t['system'] = true;
				t['linked'] = true;
				t['cssVar'] = token['var'];
				t['fluidMin'] = token['min'];
				t['fluidMax'] = token['max'];
				t['label'] = "Heading size " + token['label'].toUpperCase();
				g.data.unshift(t)
				//TODO: RESOLVE Headings lock, there could be missing headings, or maybe generate all of them???
				//All of them would be much easier to tackle
			}
			else if (target == 'text size' && g['convention'] == "--hfs-text") {
				key = "--hfs-text";
				t['method'] = "fluid2";
				t['system'] = true;
				t['linked'] = true;
				t['cssVar'] = token['var'];
				t['fluidMin'] = token['min'];
				t['fluidMax'] = token['max'];
				t['label'] = "Text size " + token['label'].toUpperCase();
				g.data.unshift(t)
			}
			else if (target == 'space' && g['convention'] == "--hsp-") {
				//check if radius is changed, or we are going to skip that
				//danger, when checking oldVal != newVal because of settings change
				//we need reliable way to check is this value from the system
				key = "--hfs-text";
				t['method'] = "fluid2";
				t['system'] = true;
				t['linked'] = true;
				t['cssVar'] = token['var'];
				t['fluidMin'] = token['min'];
				t['fluidMax'] = token['max'];
				t['label'] = "Space " + token['label'].toUpperCase();
				g.data.unshift(t)
			}
			else if (target == 'section space' && g['convention'] == "--hss-") {
				//check if radius is changed, or we are going to skip that
				//danger, when checking oldVal != newVal because of settings change
				//we need reliable way to check is this value from the system
				key = "--hfs-text";
				t['method'] = "fluid2";
				t['system'] = true;
				t['linked'] = true;
				t['cssVar'] = token['var'];
				t['fluidMin'] = token['min'];
				t['fluidMax'] = token['max'];
				t['label'] = "Section space " + token['label'].toUpperCase();
				g.data.unshift(t)
			}
			//console.log(target)
			//console.log(token)

			/*FONT SIZE: Headings */
			/*FONT SIZE: Text */
			/*SPACING */
			/*SPACING SECTION */
		},
		tokenDetails(token) {
			var str = '';
			str += 'Name: ' + token.label + '\n';
			str += '------------------------' + '\n';
			str += 'Target: ' + token.cssVar + '\n';
			return str;
		},
		tokens__switchView() {
			var view = Alpine.store('pd').themeTokens.tokenView;
			if (view == 'label')
				Alpine.store('pd').themeTokens.tokenView = 'cssVar';
			else Alpine.store('pd').themeTokens.tokenView = 'label';
		},
		tokens__AddCollection() {
			var collection = {
				name: 'Collection',
				icon: 'ii-token',
				uuid: Alpine.store('project').generateUUID(),
				id: Alpine.store('project').generateUUID(),
				active: false,
				system: false,
				groups: [],
			};
			if (Alpine.store('pd').themeTokens['folders'] == undefined)
				Alpine.store('pd').themeTokens['folders'] = [];
			Alpine.store('pd').themeTokens['folders'].push(collection);
			//Alpine.store("project").rebuildUUID_all();
		},
		tokens__AddGroup() {
			var group = {
				id: Alpine.store('project').generateUUID(),
				uuid: Alpine.store('project').generateUUID(),
				name: 'Group',
				system: false,
				convention: "",
				note: '',
				public: true,
				icon: 'ii-token-group',
				group: 'dsadasd655das',
				data: [],
			};
			if (Alpine.store('pd').themeTokens['folders'] == undefined)
				Alpine.store('pd').themeTokens['folders'] = [];
			Alpine.store('pd').themeTokens.folders.forEach((f) => {
				if (f.active) {
					if (f['groups'] === undefined) f['groups'] = [];
					f['groups'].push(group);
				}
			});
			//Alpine.store("project").rebuildUUID_all();
		},
		tokenBoilerplate() {
			const randomValue = parseInt(Math.random() * (1000 - 50) + 50, 10);;
			var token = {
				id: Alpine.store('project').generateUUID(),
				uuid: Alpine.store('project').generateUUID(),
				label: 'Custom token ' + randomValue,
				cssVar: '',
				method: 'colorTable',
				public: true,
				system: false,
				linked: false,
				tags: [],
				dark: '',
				light: '',
			};
			token['cssVar'] = "--custom-" + randomValue;
			return token;
		},
		tokens__AddToken(x, y) {

			var token = this.tokenBoilerplate();
			var group = Alpine.store('pd').themeTokens.folders[x]['groups'][y];
			var dt = Alpine.store('pd').themeTokens.folders[x]['groups'][y]['data'];

			var label = "", enumType = "";
			//check
			if (dt === undefined) dt = [];
			/*if it is system group we should copy token for group
			* Generate new id, and uuid
			* Custom tokens are not system and not linked
			* Set random name
			* Set random var
			*/
			if (group['system'] && group['convention']) {


				token = JSON.parse(JSON.stringify(dt[dt.length - 1]));

				//

				token['id'] = this.generateUUID();
				token['uuid'] = this.generateUUID();
				token['system'] = false;
				token['linked'] = false;


				if (group['convention'] == '--hsp-') { label = "Space {placeholder}"; this.helper_tshirt_naming(token['cssVar'], group['convention'], dt, token, label); }
				else if (group['convention'] == '--hss-') { label = "Section space {placeholder}"; this.helper_tshirt_naming(token['cssVar'], group['convention'], dt, token, label); }
				else if (group['convention'] == '--hfs-h') { label = "Heading font size {placeholder}"; this.helper_tshirt_naming(token['cssVar'], group['convention'], dt, token, label); }
				else if (group['convention'] == '--hfs-text-') { label = "Text font size {placeholder}"; this.helper_tshirt_naming(token['cssVar'], group['convention'], dt, token, label); }
				else if (group['convention'] == '--hrd-') { label = "Radius {placeholder}"; this.helper_tshirt_naming(token['cssVar'], group['convention'], dt, token, label); }
			}
			dt.push(token);
			//Alpine.store("project").rebuildUUID_all();
		},
		helper_tshirt_naming(nameX, convention, dt, token, namePlaceholder) {
			var index = -1;
			var res = ""
			var name = nameX;
			var flag = true;
			var checkPassed = true;
			var fromArray = false;
			var iterations = 0;
			var arrayCheckIndex = 0;
			var nameBuff = "";
			var newMark = "";
			var n;
			const randVal = parseInt(Math.random() * (1000 - 50) + 50, 10);
			var array = ['5xl', '4xl', '3xl', 'xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs', '3xs', '4xs', '5xs'];
			var lenHelper = parseInt(array.length / 2, 10);
			if (convention == "--hfs-h-") convention[convention.length - 1]
			name = name.replaceAll(convention, "").replaceAll("-", "");
			nameBuff = name;
			res = convention + "m";
			newMark = "m";
			//console.log({name},{convention})
			index = array.indexOf(name);
			//console.log({index}, {name})
			//problem
			if (index > lenHelper && index != (array.length - 1)) {

				res = convention + array[index + 1];
				newMark = array[index + 1];
			}
			else if (index > -1) {
				n = index - 1;
				if (index == 0) n = 1;
				res = convention + array[n];
				newMark = array[n];
			}
			//while is dangerous, we need to use flag, and also have emergency terminate switch which will throw nonsense name, but keep system working
			while (flag && iterations < 1000) {
				iterations++;
				//1=> Lets do check if res exists in our token manager
				checkPassed = true;
				dt.forEach(tk => {
					if (tk['cssVar'] == res) {
						checkPassed = false;
					}
				})
				//Step 2: Wee need try all names before we proceed to renaming 
				if (!checkPassed) {
					if (arrayCheckIndex > -1 && arrayCheckIndex < (array.length - 1)) {
						res = convention + array[arrayCheckIndex];
						newMark = array[arrayCheckIndex];
					}
				}
				if (iterations > 950) {
					flag = false;
					res = convention + randVal;
					newMark = randVal;
				}
				if (checkPassed) flag = false;

				arrayCheckIndex++;
			}
			//we should also use mechanism to replace this in label
			token['cssVar'] = res;
			token['label'] = namePlaceholder.replaceAll("{placeholder}", newMark.toString().toUpperCase());

			token['sysVar'] = res.replaceAll(convention, "");
			//const 
		},
		token_validate_css_var_partial(group, token) {
			var convention = group['convention'];
			token['cssVar'] = convention + token['sysVar'];
			this.token_validate_css_var(group, token)

		},
		token_validate_css_var(group, token) {
			//should we check event target or app value maybe
			//ev = ev || window.event;
			var val = token['cssVar'];
			var convention = "";
			var pfix = "";
			var duplicates = 0;

			if (val.length < 4) {
				toast(`Too short CSS variable name`, { type: "danger", description: `Please check CSS variable name, there is potential error as name is too short!` });
			}
			if (val[0] != "-" || val[1] != "-") {

				if (val[0] != "-") token['cssVar'] = "-" + token['cssVar'];
				if (val[1] != "-") token['cssVar'] = "-" + token['cssVar'];
				toast(`CSS variable name error`, { type: "danger", description: `Every CSS variable name should start with double dash "--", system applied automatic fix!` });
			}
			if (val.includes(" ")) {
				token['cssVar'] = val.replaceAll(" ", "-")
				toast(`CSS Variable name: Automatic fix applied`, { type: "danger", description: `Name should not include whitespaces, system applied automatic fix!` });
			}
			if (group['system'] == true) {
				convention = group['convention'];
				if (!val.includes(convention)) {

					toast(`Naming error: ${convention}, Automatic fix applied`, { type: "danger", description: `CSS Variable name should start with ${convention}` });
					token['cssVar'] = convention + "-" + parseInt(Math.random() * (1000 - 50) + 50, 10);
				}
			}
			Alpine.store("pd").themeTokens.folders.forEach(collection => {
				collection.groups.forEach(group => {
					group.data.forEach(t => {

						if (t['cssVar'] == token['cssVar']) {
							duplicates++;
						}
					})
				})
			})
			if (duplicates > 1) {
				pfix = parseInt(Math.random() * (1000 - 50) + 50, 10);
				token['cssVar'] = token['cssVar'] + pfix;
				if (token['sysVar']) token['sysVar'] = token['sysVar'] + pfix;
				toast(`Naming error: Duplicated CSS Variable, Automatic fix applied`, { type: "danger", description: `Variable name should be unique` });
			}
		},
		tokens__DeleteCollection(index) {
			var active = true;
			var activeCount = 0;
			var folderCount = 0;
			swal_h(
				'Please confirm that you want delete collection and all data within collection (groups, tokens)',
				{
					title: 'Are you sure?',
					icon: 'warning',
					buttons: {
						cancel: 'Cancel',
						delete: {
							text: 'Yes, delete',
							value: 'delete',
						},
					},
				}
			).then((value) => {
				switch (value) {
					case 'delete':
						Alpine.store('pd').themeTokens.folders.splice(
							index,
							1
						);
						Alpine.store('pd').themeTokens.folders.forEach(
							(f) => {
								folderCount++;
								if (f.active) activeCount++;
							}
						);
						if (activeCount == 0 && folderCount > 0)
							Alpine.store(
								'pd'
							).themeTokens.folders[0].active = true;
						break;
					default:
						return false;
				}
			});
			//$store.pd
		},
		tokens__copyToken(cssVar) {
			cssVar = 'var(' + cssVar + ')';
			copyToClipboard(cssVar, undefined, cssVar);
		},
		tokens__DeleteToken(folder, index) {
			swal_h(
				'Please confirm that you want token',
				{
					title: 'Are you sure?',
					icon: 'warning',
					buttons: {
						cancel: 'Cancel',
						delete: {
							text: 'Yes, delete',
							value: 'delete',
						},
					},
				}
			).then((value) => {
				switch (value) {
					case 'delete':
						folder.data.splice(index, 1);
						window.dispatchEvent(headspinReloadTokenAPP);
						break;
					default:
						return false;
				}
			});
			//$store.pd
		},
		tokens__getColorVal(type, token) {
			var out = 'var(--neutral-1)';
			var cssVar = token;
			var typeAlpha = type + 'Alpha';
			var customSchemaVar = '';
			if (token.includes('$')) {
				return resolveChromaColor(token);
			}
			else if (Alpine.store('project').colorContainsToken(token)) {
				if (token.includes('brand')) {
					cssVar = cssVar
						.replaceAll('var(--hcl-brand-', '')
						.replaceAll(')', '');
					if (cssVar.includes('a')) {
						cssVar = cssVar.replaceAll('a', '');
						Alpine.store('pd').brandColorSchema.data[
							typeAlpha
						].forEach((clr) => {
							if (cssVar == clr.step.toString())
								out = clr.value;
						});
					} else {
						Alpine.store('pd').brandColorSchema.data[
							type
						].forEach((clr) => {
							if (cssVar == clr.step.toString())
								out = clr.value;
						});
					}
				} else if (token.includes('neutral')) {
					cssVar = cssVar
						.replaceAll('var(--hcl-neutral-', '')
						.replaceAll(')', '');
					if (cssVar.includes('a')) {
						cssVar = cssVar.replaceAll('a', '');
						Alpine.store('pd').neutralColorSchema.data[
							typeAlpha
						].forEach((clr) => {
							if (cssVar == clr.step.toString())
								out = clr.value;
						});
					} else {
						Alpine.store('pd').neutralColorSchema.data[
							type
						].forEach((clr) => {
							if (cssVar == clr.step.toString())
								out = clr.value;
						});
					}
				} else {
					Alpine.store('pd').colorSchemas.forEach((schema) => {
						if (cssVar.includes(schema.name.toLowerCase())) {
							customSchemaVar =
								'var(--hcl-' + schema.name.toLowerCase() + '-';
							cssVar = cssVar
								.replaceAll(customSchemaVar, '')
								.replaceAll(')', '');

							if (cssVar.includes('a')) {
								cssVar = cssVar.replaceAll('a', '');
								schema.data[typeAlpha].forEach((clr) => {
									if (cssVar == clr.step.toString())
										out = clr.value;
								});
							} else {
								schema.data[type].forEach((clr) => {
									if (cssVar == clr.step.toString())
										out = clr.value;
								});
							}
						}
					});
				}
			} else {
				return token;
			}

			return out;
		},
		tokens__DeleteGroup(collectionIndex, index) {
			swal_h(
				'Please confirm that you want delete collection and all data within group (all tokens under this group will be also removed)',
				{
					title: 'Are you sure?',
					icon: 'warning',
					buttons: {
						cancel: 'Cancel',
						delete: {
							text: 'Yes, delete',
							value: 'delete',
						},
					},
				}
			).then((value) => {
				switch (value) {
					case 'delete':
						Alpine.store('pd').themeTokens.folders[
							collectionIndex
						].groups.splice(index, 1);
						break;
					default:
						return false;
				}
			});
			//$store.pd
		},
		colorTokenDeleteValueLight(colorVar) {
			//add warning about empty defualt theme tokens, we should give freedom to make this mistake because of UX and productivity and some edge cases, but they could see small warning with explanation why is that bad and to fix that
			colorVar.light = '';
		},
		colorTokenDeleteValueDark(colorVar) {
			//add warning about empty defualt theme tokens, we should give freedom to make this mistake because of UX and productivity and some edge cases, but they could see small warning with explanation why is that bad and to fix that
			colorVar.dark = '';
		},
		tokenDeleteValuePlain(colorVar) {
			colorVar.plainText = '';
		},
		sortingSidebarVirtualCollection(c) {
			const tree = document.querySelector('.hs-token-tree');
			var collections = tree.querySelectorAll(
				'[data-tree-collection-index]'
			);
			const select = c;
			var dataCopy = JSON.parse(JSON.stringify(select));
			var ind = 0;
			var cMap = [];
			/* Step 2: Check for Collections  */

			collections &&
				collections.forEach((collection, index) => {
					index = collection.getAttribute(
						'data-tree-collection-index'
					);
					cMap.push(index);
				});

			c = cMap.map((i) => c[i]);
			Alpine.store('pd').themeTokens.folders = c;
			setTimeout(() => {
				window.dispatchEvent(headspinReloadTokenAPP);
			}, 120);
		},
		sortingSidebarVirtualGroup(c) {
			const tree = document.querySelector('.hs-token-tree');
			var collections = tree.querySelectorAll(
				'[data-tree-collection-index]'
			);
			const select = Alpine.store('pd').themeTokens.folders;
			var dataCopy = JSON.parse(JSON.stringify(select));

			collections &&
				collections.forEach((collection, index) => {
					var groups =
						collection.querySelectorAll('[data-v--group]');
					dataCopy[index]['groups'] = [];
					groups.forEach((group) => {
						var id = group
							.getAttribute('data-v--group')
							.split('-');
						var i = Number(id[0]);
						var y = Number(id[1]);
						dataCopy[index]['groups'].push(
							select[i]['groups'][y]
						);
					});
				});
			//Alpine.store("pd").themeTokens.folders = JSON.parse(JSON.stringify(dataCopy));
			Alpine.store('pd').themeTokens.folders = JSON.parse(
				JSON.stringify(dataCopy)
			);
			c = JSON.parse(JSON.stringify(dataCopy));
			//Alpine.store("project").rebuildUUID_all();
			setTimeout(() => {
				window.dispatchEvent(headspinReloadTokenAPP);
			}, 120);
		},
		sortingColorTokensCallback(cx) {
			var dataSelector =
				Alpine.store('pd').themeTokens.folders[cx]['groups'];
			const groupSelector = document.querySelectorAll(
				"[data-collectionactive='true'] [data-colorgroup]"
			);
			var dataCopy = JSON.parse(JSON.stringify(dataSelector));
			var dataSource = JSON.parse(JSON.stringify(dataSelector));

			groupSelector.forEach((group, index) => {
				var cssVars = group.querySelectorAll('[data-colorkey]');
				dataCopy[index]['data'] = [];
				cssVars.forEach((variable) => {
					var id = variable
						.getAttribute('data-colorkey')
						.split('-');
					var i = Number(id[0]);
					var y = Number(id[1]);
					var t = dataSource[i].data[y];
					var obj = Object.assign({}, t);
					obj.id = '10000000-1000-4000-8000-100000000000'.replace(
						/[018]/g,
						(c) =>
							(
								+c ^
								(crypto.getRandomValues(
									new Uint8Array(1)
								)[0] &
									(15 >> (+c / 4)))
							).toString(16)
					);
					dataCopy[index].data.push(obj);
				});
				//group
			});
			Alpine.store('pd').themeTokens.folders[cx]['groups'] =
				JSON.parse(JSON.stringify(dataCopy));
		},
		generateUUID() {
			return '10000000-1000-4000-8000-100000000000'.replace(
				/[018]/g,
				(c) =>
					(
						+c ^
						(crypto.getRandomValues(new Uint8Array(1))[0] &
							(15 >> (+c / 4)))
					).toString(16)
			);
		},
		activateFolder(index) {
			var i = 0;
			Alpine.store('pd').themeTokens.folders.forEach((folder) => {
				folder['active'] = false;
				if (i == index) folder['active'] = true;
				i++;
			});
			//Alpine.store("project").rebuildUUID_all();
		},
		scrollToGroup(id) {
			setTimeout(() => {
				document
					.querySelector(`[data-colorgroup='${id}']`)
					.scrollIntoView();
			}, 20);
		},
		returnActiveCollection(type) {
			var activeCount = 0;
			var retName = '';
			var retIcon = 'ii-token';
			var notSystem = true;
			var folders = Alpine.store('pd').themeTokens.folders;
			folders &&
				folders.forEach((f) => {
					if (f.active) {
						retName = f.name;
						retIcon = f.icon;
						activeCount++;
						if (f['system']) notSystem = false;
					}
				});
			if (activeCount == 0 && folders.length > 0) {
				retName = folders[0].name;
				retIcon = folders[0].icon;
			}
			if (type == 'name') return retName;
			if (type == 'system') return notSystem;
			return retIcon;
		},
		rebuildUUID_all() {
			//return false;
			//console.log( 'Rebuilding UUID' );
			if (Alpine.store('pd').themeTokens['folders'] == undefined)
				Alpine.store('pd').themeTokens['folders'] = [];
			Alpine.store('pd').themeTokens.folders.forEach((folder) => {
				folder['id'] = Alpine.store('project').generateUUID();
				if (folder['groups'] == undefined) folder['groups'] = [];
				folder.groups &&
					folder.groups.forEach((group) => {
						group['id'] =
							Alpine.store('project').generateUUID();
						if (group['data'] == undefined)
							group['data'] = [];
						group.data &&
							group.data.forEach((variable) => {
								variable['id'] =
									Alpine.store('project').generateUUID();
							});
					});
			});
		},
		getGroupedTokens() {
			const items = [
				{
					var: '--hsp-xxs',
					label: 'xxs',
					category: 'space',
					desc: '(gap, margin, padding)',
				},
				{
					var: '--hsp-xs',
					label: 'xs',
					category: 'space',
					desc: '(gap, margin, padding)',
				},
				{
					var: '--hsp-s',
					label: 's',
					category: 'space',
					desc: '(gap, margin, padding)',
				},
				{
					var: '--hsp-m',
					label: 'm',
					category: 'space',
					desc: '(gap, margin, padding)',
				},
				{
					var: '--hsp-l',
					label: 'l',
					category: 'space',
					desc: '(gap, margin, padding)',
				},
				{
					var: '--hsp-xl',
					label: 'xl',
					category: 'space',
					desc: '(gap, margin, padding)',
				},
				{
					var: '--hsp-xxl',
					label: 'xxl',
					category: 'space',
					desc: '(gap, margin, padding)',
				},
				{
					var: '--hss-xxs',
					label: 'xxs',
					category: 'section space',
				},
				{
					var: '--hss-xs',
					label: 'xs',
					category: 'section space',
				},
				{
					var: '--hss-s',
					label: 's',
					category: 'section space',
				},
				{
					var: '--hss-m',
					label: 'm',
					category: 'section space',
				},
				{
					var: '--hss-l',
					label: 'l',
					category: 'section space',
				},
				{
					var: '--hss-xl',
					label: 'xl',
					category: 'section space',
				},
				{
					var: '--hss-xxl',
					label: 'xxl',
					category: 'section space',
				},
				{
					var: '--hrd-s',
					label: 's',
					category: 'radius',
				},
				{
					var: '--hrd-m',
					label: 'm',
					category: 'radius',
				},
				{
					var: '--hrd-l',
					label: 'l',
					category: 'radius',
				},
				{
					var: '--hrd-pill',
					label: 'pill',
					category: 'radius',
				},
				{
					var: '--hrd-atom',
					label: 'atom',
					category: 'radius',
				},
				{
					var: '--hfs-text-s',
					label: 's',
					category: 'text size',
				},
				{
					var: '--hfs-text-m',
					label: 'm',
					category: 'text size',
				},
				{
					var: '--hfs-text-l',
					label: 'l',
					category: 'text size',
				},
				{
					var: '--hfs-h4',
					label: 'H4',
					category: 'heading size',
				},
				{
					var: '--hfs-h3',
					label: 'H3',
					category: 'heading size',
				},
				{
					var: '--hfs-h2',
					label: 'H2',
					category: 'heading size',
				},
				{
					var: '--hfs-h1',
					label: 'H1',
					category: 'heading size',
				},
				{
					var: '--hfs-h0',
					label: 'H0',
					category: 'heading size',
				},
			];

			const groupedArr = items.reduce(
				(prev, { category, ...items }) => {
					const id = prev.findIndex(
						(item) => item.category === category
					);
					id >= 0
						? prev[id].items.push(items)
						: prev.push({ category, items: [items] });
					return prev;
				},
				[]
			);

			return groupedArr;
		},
		copyColorToClipboard(name, step) {
			var color = `var(--hcl-${name}-${step})`;
			copyToClipboard(color);
			copyToClipboard(color, undefined, color);
		},
		clampGeneratorBasic(desktopSize, mobileSize) {
			const { minViewport, maxViewport, baseFontSize } =
				Alpine.store('pd');
			var ymax, ymin, min, max, v, r, cssRule, cqRule;
			var obj = {};
			ymin = mobileSize / baseFontSize;
			ymax = desktopSize / baseFontSize;

			v = 100 * ((this.remToPX(ymax) - this.remToPX(ymin)) / (maxViewport - minViewport));

			r =
				(minViewport * this.remToPX(ymax) - maxViewport * this.remToPX(ymin)) /
				((minViewport - maxViewport) * baseFontSize);
			v = v.toFixed(3);
			r = r.toFixed(3);
			cssRule = `clamp(${ymin}rem, ${r}rem + ${v}vw, ${ymax}rem)`;
			cqRule = `clamp(${ymin}rem, ${r}rem + ${v}cqi, ${ymax}rem)`;
			//console.log({ymin}, {r}, {v}, {ymax})
			obj['max'] = ymax;
			obj['min'] = ymin;
			obj['v'] = v;
			obj['r'] = r;
			obj['cssRule'] = cssRule;
			obj['cqRule'] = cqRule;

			return obj;
		},
		remToPX(rem) {
			return rem * 16;
		},

		browseColorCatalogue() {
			BrowseSchema();
		},
		addFromCatalog(index) {
			var duplicates = 0;
			var newSchema = JSON.parse(
				JSON.stringify(Alpine.store('project').newSchemaPrototype)
			);
			var _data = JSON.parse(
				JSON.stringify(Alpine.store('radix').colors[index])
			);
			newSchema.data = _data;
			newSchema.name = _data.name.toLowerCase();
			Alpine.store('pd').colorSchemas.forEach((schema) => {
				if (
					schema.name.toLowerCase() ==
					newSchema.name.toLocaleLowerCase()
				)
					duplicates++;
			});
			if (duplicates == 0)
				Alpine.store('pd').colorSchemas.push(newSchema);
			else {
				swal_h({
					title: 'Error!',
					text: 'Color with that name already exists!',
					button: false,
					icon: 'error',
				});
			}
			duplicates = 0;
			setTimeout(() => {
				Alpine.store('project').regenratePaletteOutput();
			}, 250);
		},
		getMatchingColorByLightness(v) {
			var v = chroma(v).hex();
			var hue = chroma(v).hsv()[2];
			var colors = Alpine.store('radix').colors;
			var i = 0;
			var diff = 1000;
			var index = 0;
			var mode = 'light';
			colors.forEach((color) => {
				var h = chroma(color.light[9].value).hsv()[2];
				var _diff = Math.abs(hue - h);
				if (_diff < diff) {
					diff = _diff;
					index = i;
				}
				i++;
			});
			i = 0;
			colors.forEach((color) => {
				var h = chroma(color.dark[9].value).hsv()[2];
				var _diff = Math.abs(hue - h);
				if (_diff < diff) {
					diff = _diff;
					index = i;
					mode = 'dark';
				}
				i++;
			});
			return index;
		},
		getMatchingColorBySaturation(v) {
			var v = chroma(v).hex();
			var hue = chroma(v).hsv()[2];
			var colors = Alpine.store('radix').colors;
			var i = 0;
			var diff = 1000;
			var index = 0;
			var mode = 'light';
			colors.forEach((color) => {
				var h = chroma(color.light[9].value).hsv()[1];
				var _diff = Math.abs(hue - h);
				if (_diff < diff) {
					diff = _diff;
					index = i;
				}
				i++;
			});
			i = 0;
			colors.forEach((color) => {
				var h = chroma(color.dark[9].value).hsv()[1];
				var _diff = Math.abs(hue - h);
				if (_diff < diff) {
					diff = _diff;
					index = i;
					mode = 'dark';
				}
				i++;
			});
			return index;
		},
		generateCustomColor(clr) {
			Alpine.store('project').newColorType = 'custom';
			var v = chroma(clr).hex();
			var _bi =
				Alpine.store('project').getMatchingColorByLightness(v);
			var _si = Alpine.store("project").getMatchingColorBySaturation(v)
			var _hi = Alpine.store('project').getMatchingColorByHue(v);
			var newColor = Alpine.store('project').customColorProfile;
			var hue;
			var hueOffset;
			var saturation;
			var lighness;
			var hslObj;
			const _DARKEN = 0.35;
			const _BRIGHTEN = 0.35;

			var color = Alpine.store('radix').colors[_hi];
			var color_s = Alpine.store('radix').colors[_si];
			var color_b = Alpine.store('radix').colors[_bi];
			Alpine.store("project").customColorErrors = [];
			if (chroma(v).hsv()[1] < 0.5) {
				Alpine.store("project").customColorErrors.push({
					type: 'Saturation problem',
					message: "You are trying to generate a base color that is too desaturated. This may result in poor color generation as it is out of the algorithm's range. If you only need a single color, you may want to try using a color token instead."
				});

			}
			if (chroma(v).hsv()[2] < 0.5) {
				Alpine.store("project").customColorErrors.push({
					type: 'Brightness problem',
					message: "You are attempting to generate a base color that is too dark. This may result in poor color generation outcomes as it is outside of the algorithm's range. If you only require a single color, consider using a color token instead."
				});
			}


			var z = 0;
			newColor = JSON.parse(
				JSON.stringify(Alpine.store('radix').colors[_hi])
			);

			color.light.forEach((shade) => {
				var l = chroma(shade.value).luminance();
				var newClrLight;
				if (z == '8') {
					newClrLight = chroma(v).hex();
				} else if (z == '9') {
					newClrLight = chroma(v).darken(_DARKEN).hex();
				} else {
					hueOffset =
						chroma(color.light[9].value).hsl()[0] -
						chroma(color.light[z].value).hsl()[0];
					hue = chroma(v).hsl()[0] - hueOffset;
					saturation = chroma(color_s.light[z].value).hsl()[1];
					lighness = chroma(color_b.light[z].value).hsl()[2];
					hslObj = chroma(v).hsl();
					hslObj[0] = hue;
					hslObj[1] = saturation;
					hslObj[2] = lighness;
					//console.log(saturation)
					newClrLight = chroma
						.hsl(hslObj[0], hslObj[1], hslObj[2])
						.hex();
				}
				//Alpine.store("project").previewLight[z]['value'] = newClrLight;
				newColor.light[z]['value'] = newClrLight;
				z++;
			});
			newColor.onColor = '#ffffff';
			if (
				headspinChromaLc(
					newColor.onColor,
					chroma(newColor.light[8]['value']).hex()
				) < 60
			)
				newColor.onColor = '#000000';
			z = 0;
			color.dark.forEach((shade) => {
				var l = chroma(shade.value).luminance();
				var newClrLight;
				if (z == '8') {
					newClrLight = chroma(v).hex();
				} else if (z == '9') {
					newClrLight = chroma(v).brighten(_BRIGHTEN).hex();
				} else {
					hueOffset =
						chroma(color.dark[9].value).hsl()[1] -
						chroma(color.dark[z].value).hsl()[1];
					hue = chroma(v).hsl()[0] - hueOffset;
					saturation = chroma(color_s.dark[z].value).hsl()[1];
					lighness = chroma(color_b.dark[z].value).hsl()[2];
					hslObj = chroma(v).hsl();
					hslObj[0] = hue;
					hslObj[1] = saturation;
					hslObj[2] = lighness;
					newClrLight = chroma
						.hsl(hslObj[0], hslObj[1], hslObj[2])
						.hex();
				}
				//Alpine.store("project").previewDark[z]['value'] = newClrLight;
				newColor.dark[z]['value'] = newClrLight;
				z++;
			});
			z = 0;
			//alpha light custom color
			color_b.lightAlpha.forEach((shade) => {
				var hslObj = {};
				hueOffset = color_b.lightAlpha[9].h - shade.h;
				hue = chroma(v).hsl()[0] - hueOffset;

				if (hue < 0) hue = 360 + hue;

				hslObj[0] = Number(hue);
				hslObj[1] = Number(shade.s.trim());
				hslObj[2] = Number(shade.l.trim());
				hslObj[3] = Number(shade.a.trim());
				newClrLight = chroma
					.hsl(hslObj[0], hslObj[1], hslObj[2], hslObj[3])
					.css('hsl');

				//Alpine.store("project").previewLight[z]['value'] = newClrLight;
				//newColor.lightAlpha[z]['value'] = newClrLight;
				hslObj = null;
				z++;
			});
			z = 0;
			//alpha light custom color
			color_b.darkAlpha.forEach((shade) => {
				var hslObj = {};
				hueOffset = color_b.lightAlpha[9].h - shade.h;
				hue = chroma(v).hsl()[0] - hueOffset;

				if (hue < 0) hue = 360 + hue;

				hslObj[0] = Number(hue);
				hslObj[1] = Number(shade.s.trim());
				hslObj[2] = Number(shade.l.trim());
				hslObj[3] = Number(shade.a.trim());
				newClrLight = chroma
					.hsl(hslObj[0], hslObj[1], hslObj[2], hslObj[3])
					.css('hsl');

				//Alpine.store("project").previewDark[z]['value'] = newClrLight;
				newColor.darkAlpha[z]['value'] = newClrLight;
				z++;
				hslObj = null;
			});
			//sync preview
			Alpine.store('project').previewLight = newColor.light;
			Alpine.store('project').previewDark = newColor.dark;

			Alpine.store('project').customColorProfile = JSON.parse(
				JSON.stringify(newColor)
			);
			newColor = null;
			z = null;
			hslObj = null;
			v = null;
			_bi = null;
			_hi = null;
			hue = null;
			hueOffset = null;
			saturation = null;
			lighness = null;
		},
		getMatchingColorByHue(v) {
			var v = chroma(v).hex();
			var hue = chroma(v).hsl()[0];
			var colors = Alpine.store('radix').colors;
			var i = 0;
			var diff = 1000;
			var indexToReturn = 0;
			colors.forEach((color) => {
				var h = chroma(color.light[9].value).hsl()[0];
				var _diff = Math.abs(hue - h);
				if (_diff < diff) {
					diff = _diff;
					indexToReturn = i;
				}
				i++;
			});
			return indexToReturn;
		},
		getMatchingColorNeutral(v) {
			var v = chroma(v).hex();
			var hue = chroma(v).hsl()[0];
			var colors = Alpine.store('radix').neutrals;
			var i = 0;
			var diff = 1000;
			var indexToReturn = 0;
			colors.forEach((color) => {
				var h = chroma(color.light[9].value).hsl()[0];
				var _diff = Math.abs(hue - h);
				if (_diff < diff) {
					diff = _diff;
					indexToReturn = i;
				}
				i++;
			});
			return indexToReturn;
		},
		loadRandomSchema() {
			var items = Alpine.store('radix').colors;
			var item = items[Math.floor(Math.random() * items.length)];
			document.getElementById('sc-hex').value = item.light[9].value;
			schemaWheel.hex = item.light[9].value;
			Alpine.store('project').setSchemaColor(item.light[9].value);
			Alpine.store('project').newSchemaName = '';
			Alpine.store('project').previewDark = item.dark;
			Alpine.store('project').previewLight = item.light;
		},
		addNewSchema() {
			//TODO generate random preview
			Alpine.store('project').loadRandomSchema();
			Alpine.store('project').schemaMode = 'creating';
			Alpine.store('project').schemaToEdit = 'none';
		},
		editSchema(type, index) {
			Alpine.store('project').schemaMode = 'editing';
			Alpine.store('project').schemaEdit = true;
			Alpine.store('project').schemaToEdit = type;
			Alpine.store('project').schemaEditIndex = index;

			if (type === 'brand') {
				var item = Alpine.store('pd').brandColorSchema;
			} else if (type === 'neutrals') {
				Alpine.store('project').schemaEditorTab = 'radix';
				var item = Alpine.store('pd').neutralColorSchema;
			} else if (type === 'custom') {
				var item = Alpine.store('pd').colorSchemas[index];
				schemaWheel.hex =
					Alpine.store('pd').colorSchemas[
						index
					].data.light[8].value;
			}
			if (item.type == 'custom')
				Alpine.store('project').schemaEditorTab = item.type;

			//document.getElementById('sc-hex').value = item.data.light[8].value;
			console.log('edit-schema:', item.data.light[8].value)
			schemaWheel.hex = item.data.light[8].value;
			Alpine.store('project').editingSchemaData = JSON.parse(
				JSON.stringify(item)
			);
			//todo: lock editing
			Alpine.store('project').newSchemaName = item.name.toLowerCase();
			Alpine.store('project').previewDark = item.data.dark;
			Alpine.store('project').previewLight = item.data.light;
			Alpine.store('project').previewSchemaName = item.data.name;
			Alpine.store('project').previewOnColor = item.data.onColor;
		},
		/*Function triggered on UPDATE button click*/
		onSchemaUpdate() {
			var duplicates = 0;
			var pairing = 0;
			if (Alpine.store('project').schemaToEdit === 'brand') {
				var item = Alpine.store('pd').brandColorSchema;
				item.data.name = Alpine.store('project').previewSchemaName;
			} else if (
				Alpine.store('project').schemaToEdit === 'neutrals'
			) {
				var item = Alpine.store('pd').neutralColorSchema;
			} else if (Alpine.store('project').schemaToEdit === 'custom') {
				var item =
					Alpine.store('pd').colorSchemas[
					Alpine.store('project').schemaEditIndex
					];
				item.type = Alpine.store('project').schemaEditorTab;
			}

			//If we are using Radix color default
			if (
				Alpine.store('project').schemaToEdit == 'neutrals' &&
				Alpine.store('project').schemaMode == 'editing'
			) {
				var val = Alpine.store('project').previewDark[8].value;
				var _hi =
					Alpine.store('project').getMatchingColorNeutral(val);
				item.data = JSON.parse(
					JSON.stringify(
						Alpine.store('radix').neutrals[_hi]
					)
				);
			} else {
				var val = Alpine.store('project').previewDark[8].value;
				var _hi =
					Alpine.store('project').getMatchingColorByHue(val);
				item.data = JSON.parse(
					JSON.stringify(Alpine.store('radix').colors[_hi])
				);
			}

			//item.data.dark = Alpine.store("project").previewDark;
			//item.data.light = Alpine.store("project").previewLight;
			//custom color logic
			Alpine.store('project').newSchemaName = Alpine.store(
				'project'
			).schemaValidateName(
				Alpine.store('project').newSchemaName.toLocaleLowerCase()
			);
			//If
			if (
				Alpine.store('project').customColorProfile != 'null' &&
				Alpine.store('project').customColorProfile != null
			) {
				item.data = Alpine.store('project').customColorProfile;
				Alpine.store('project').customColorProfile = null;
			}
			Alpine.store('pd').colorSchemas.forEach((schema) => {
				if (
					schema.name.toLowerCase() ==
					Alpine.store('project').newSchemaName.toLocaleLowerCase()
				)
					duplicates++;
			});
			if (
				duplicates == 0 ||
				item.name == Alpine.store('project').newSchemaName
			) {
				item.name = Alpine.store('project').newSchemaName;
			} else {
				swal_h({
					title: 'Error!',
					text: 'Color with that name already exists!',
					button: false,
					icon: 'error',
				});
			}
			duplicates = 0;

			//Neutral matching algorithm
			if (Alpine.store('project').schemaToEdit === 'brand') {
				if (Alpine.store('pd').neutralColorSchema.linked) {
					Alpine.store('radix').neutrals.forEach(
						(maybeNeutralPair) => {
							if (
								maybeNeutralPair.pairing.includes(
									item.data.name
								)
							) {
								pairing++;

								Alpine.store('pd').neutralColorSchema.data =
									maybeNeutralPair;
							}
						}
					);
				}
			}
			Alpine.store('project').schemaMode = 'creating';
			Alpine.store('project').schemaEdit = false;
			Alpine.store('project').schemaToEdit = 'none';

			setTimeout(() => {
				Alpine.store('project').regenratePaletteOutput();
			}, 250);
		},
		//END:: onSchemaUpdate
		deleteSchema(index) {
			// deletes palette by index
			Alpine.store('pd').colorSchemas.splice(index, 1);
		},
		disableSchema(index) {
			// deletes palette by index
			Alpine.store('pd').colorSchemas[index]['enabled'] = false;
			console.log(Alpine.store('pd').colorSchemas[index])
		},
		setCustomColor(v) {
			try {
				var v = chroma(v).hex();
			} catch (err) {
				return false;
			}
			var lumaIndex =
				Alpine.store('project').getMatchingColorByLightness(v);
			var _hi = Alpine.store('project').getMatchingColorByHue(v);

			Alpine.store('project').generateCustomColor(v);
			if (schemaWheel.hex != v) schemaWheel.hex = v;
		},
		setSchemaColor(v) {
			//Only executed in Radix colors
			try {
				var v = chroma(v).hex();
			} catch (error) {
				return false;
			}
			Alpine.store('project').newColorType = 'radix';

			//todo checkk if is editing neutral
			if (
				Alpine.store('project').schemaToEdit == 'neutrals' &&
				Alpine.store('project').schemaMode == 'editing'
			) {
				Alpine.store('project').colorIndex =
					Alpine.store('project').getMatchingColorNeutral(v);
				var _COLOR =
					Alpine.store('radix').neutrals[
					Alpine.store('project').colorIndex
					];
			} else {
				Alpine.store('project').colorIndex =
					Alpine.store('project').getMatchingColorByHue(v);
				var _COLOR =
					Alpine.store('radix').colors[
					Alpine.store('project').colorIndex
					];
			}

			schemaWheel.hex = chroma(_COLOR.light[9].value).hex();

			Alpine.store('project').previewLight = _COLOR.light;
			Alpine.store('project').previewDark = _COLOR.dark;
			Alpine.store('project').previewSchemaName = _COLOR.name;
			Alpine.store('project').previewOnColor = _COLOR.onColor;
		},
		setCustomColorRadix(v) {

			try {
				var v = chroma(v).hex();
			} catch (err) {
				return false;
			}
			const grayValue = "#8B8D98"; // Your custom gray color
			const lightBgValue = this.tryColor(Alpine.store('pd').themeSiteBackground.light, "#FFFFFF"); // Light theme background
			const darkBgValue = this.tryColor(Alpine.store('pd').themeSiteBackground.dark, "#111111"); // Dark theme background

			const lightColors = HUI.generateRadixColors({
				appearance: "light",
				accent: v,
				gray: grayValue,
				background: lightBgValue,
			})

			const darkColors = HUI.generateRadixColors({
				appearance: "dark",
				accent: v,
				gray: grayValue,
				background: darkBgValue,
			})

			lightColors.accentScale.forEach((lv, i) => {
				Alpine.store('project').previewLight[i].value = lv;
			})
			darkColors.accentScale.forEach((lv, i) => {
				Alpine.store('project').previewDark[i].value = lv;
			})
			console.log({ v, lightColors, darkColors })

		},
		mixRadixColor(v) {
			const grayValue = "#8B8D98"; // Your custom gray color
			const lightBgValue = this.tryColor(Alpine.store('pd').themeSiteBackground.light, "#FFFFFF"); // Light theme background
			const darkBgValue = this.tryColor(Alpine.store('pd').themeSiteBackground.dark, "#111111"); // Dark theme background

			try {
				v = chroma(v).hex();
			} catch (err) {
				return false;
			}
			const lightColors = HUI.generateRadixColors({
				appearance: "light",
				accent: v,
				gray: grayValue,
				background: lightBgValue,
			})

			const darkColors = HUI.generateRadixColors({
				appearance: "dark",
				accent: v,
				gray: grayValue,
				background: darkBgValue,
			})
			return [lightColors, darkColors];
		},
		tryColor(color, fallback) {
			try {
				return chroma(color).hex();
			} catch (err) {
				return fallback;
			}
		},
		mixRadixColorNeutral(v) {
			const grayValue = "#8B8D98"; // Your custom gray color
			const lightBgValue = this.tryColor(Alpine.store('pd').themeSiteBackground.light, "#FFFFFF"); // Light theme background
			const darkBgValue = this.tryColor(Alpine.store('pd').themeSiteBackground.dark, "#111111"); // Dark theme background

			try {
				v = chroma(v).hex();
			} catch (err) {
				return false;
			}
			const lightColors = HUI.generateRadixColors({
				appearance: "light",
				accent: Alpine.store('pd').brandColorSchema.data.light[8].value,
				gray: v,
				background: lightBgValue,
			})

			const darkColors = HUI.generateRadixColors({
				appearance: "dark",
				accent: Alpine.store('pd').brandColorSchema.data.dark[8].value,
				gray: v,
				background: darkBgValue,
			})
			return [lightColors, darkColors];
		},
		applyRadixColor(p, targetScheme) {
			let d = this.mixRadixColor(p);
			console.log({ p }, { d })
			let steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
			steps.forEach((element, i) => {
				targetScheme.data.light[i].value = d[0].accentScale[i];
				targetScheme.data.lightAlpha[i].value = d[0].accentScaleAlpha[i];
				targetScheme.data.dark[i].value = d[1].accentScale[i];
				targetScheme.data.darkAlpha[i].value = d[1].accentScaleAlpha[i];


			});
			targetScheme.data.onColor = d[0].accentContrast;
			targetScheme.data.onWcag = d[0].accentContrast;
			Alpine.store('project').regenratePaletteOutput()
		},
		applyNeutralColor(p, targetScheme) {
			let d = this.mixRadixColorNeutral(p);
			let steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
			steps.forEach((element, i) => {
				targetScheme.data.light[i].value = d[0].grayScale[i];
				targetScheme.data.lightAlpha[i].value = d[0].grayScaleAlpha[i];
				targetScheme.data.dark[i].value = d[1].grayScale[i];
				targetScheme.data.darkAlpha[i].value = d[1].grayScaleAlpha[i];
			});
			targetScheme.data.onColor = d[0].accentContrast;
			targetScheme.data.onWcag = d[0].accentContrast;
			Alpine.store('project').regenratePaletteOutput()
		},
		playgroundRandomSchema() {
			const schemes = ['monochromatic', 'analogous', 'complementary', 'split_complementary', 'triadic', 'tetriadic'];
			const randomScheme = schemes[Math.floor(Math.random() * schemes.length)];
			Alpine.store('pd').playgroundRandomSchema = randomScheme;
		},
		playgroundSecondaryHex(v) {
			let s = 'analogous'
			let shift = 0;
			if (Alpine.store('pd').playgroundColorschemeType == 'random') {
				s = Alpine.store('pd').playgroundRandomSchema
			}
			else {
				s = Alpine.store('pd').playgroundColorschemeType;
			}
			let min = Alpine.store('appView').pgSecondary[s][0];
			let max = Alpine.store('appView').pgSecondary[s][1]
			shift = this.randomIntInRange(min, max);
			let h2 = chroma(v).hsl()[0] + shift;
			return chroma('#7ead62').set('hsl.h', h2).hex();

		},
		playgroundTertiaryHex(v) {
			let s = 'analogous'
			let shift = 0;
			if (Alpine.store('pd').playgroundColorschemeType == 'random') {
				s = Alpine.store('pd').playgroundRandomSchema
			}
			else {
				s = Alpine.store('pd').playgroundColorschemeType;
			}
			let min = Alpine.store('appView').pgTertiary[s][0];
			let max = Alpine.store('appView').pgTertiary[s][1]
			shift = this.randomIntInRange(min, max);
			let h2 = chroma(v).hsl()[0] + shift;
			return chroma('#7ead62').set('hsl.h', h2).hex();
		},
		randomIntInRange(min, max) {
			// Swap if min is greater than max
			if (min > max) [min, max] = [max, min];

			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		mixPrimary(v) {
			let targetScheme;
			let p;
			let keyword = "primary";
			Alpine.store('pd').colorSchemas.forEach(s => {
				if (s.name.includes(keyword)) targetScheme = s;
			})

			if (!v) {
				const colors = Alpine.store('radix').colors;
				const randomColor = colors[Math.floor(Math.random() * colors.length)];
				p = randomColor.light[8].value;
			}
			else p = v;
			let d = this.mixRadixColor(p);
			let steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
			steps.forEach((element, i) => {
				targetScheme.data.light[i].value = d[0].accentScale[i];
				targetScheme.data.lightAlpha[i].value = d[0].accentScaleAlpha[i];
				targetScheme.data.dark[i].value = d[1].accentScale[i];
				targetScheme.data.darkAlpha[i].value = d[1].accentScaleAlpha[i];
			});
			targetScheme.data.onColor = d[0].accentContrast;
			targetScheme.data.onWcag = d[0].accentContrast;
			return p;
		},
		mixSecondary(v) {
			let targetScheme;
			let p;
			let keyword = "secondary";
			Alpine.store('pd').colorSchemas.forEach(s => {
				if (s.name.includes(keyword)) targetScheme = s;
			})

			p = this.playgroundSecondaryHex(v);
			let d = this.mixRadixColor(p);
			let steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
			steps.forEach((element, i) => {
				targetScheme.data.light[i].value = d[0].accentScale[i];
				targetScheme.data.lightAlpha[i].value = d[0].accentScaleAlpha[i];
				targetScheme.data.dark[i].value = d[1].accentScale[i];
				targetScheme.data.darkAlpha[i].value = d[1].accentScaleAlpha[i];
			});

			targetScheme.data.onColor = d[0].accentContrast;
			targetScheme.data.onWcag = d[0].accentContrast;
		},
		mixTertiary(v) {
			let targetScheme;
			let p;
			let keyword = "tertiary";
			Alpine.store('pd').colorSchemas.forEach(s => {
				if (s.name.includes(keyword)) targetScheme = s;
			})

			p = this.playgroundTertiaryHex(v);
			let d = this.mixRadixColor(p);
			let steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
			steps.forEach((element, i) => {
				targetScheme.data.light[i].value = d[0].accentScale[i];
				targetScheme.data.lightAlpha[i].value = d[0].accentScaleAlpha[i];
				targetScheme.data.dark[i].value = d[1].accentScale[i];
				targetScheme.data.darkAlpha[i].value = d[1].accentScaleAlpha[i];
			});
			targetScheme.data.onColor = d[0].accentContrast;
			targetScheme.data.onWcag = d[0].accentContrast;
		},
		mixRandomColorsPST() {
			let s = 'analogous';
			var p;
			if (Alpine.store('pd').playgroundColorschemeType == 'random') {
				this.playgroundRandomSchema();
			}

			p = this.mixPrimary();
			this.mixSecondary(p);
			this.mixTertiary(p);
		},
		setSchemaFromPreset(color, name) {
			Alpine.store('project').newColorType = 'radix';
			Alpine.store('project').customColorProfile = null;
			if (!color) return false;
			if (Alpine.store('project').schemaMode === 'creating') {
				if (!name) return false;
				//Alpine.store("project").newSchemaName = name.toString().toLowerCase();
				if (schemaWheel.hex != chroma(color).hex())
					schemaWheel.hex = chroma(color).hex();
			}
			Alpine.store('project').setSchemaColor(color);
		},
		newSchemaPrototype: {
			name: 'customSchema',
			//used to make color non-editable
			system: 'false',
			//indicate that color is neutral
			neutral: 'false',
			//preset slots are reserved for Primary, Secondary and Tertiary - here should be always false
			presetColor: 'false',
			// we should set enabled to true, if there is existing color we should set as true by default
			enabled: 'true',
			//enable/disable transparent variants
			transparentVariants: 'true',
			//should color be exposed in builder
			exposeInBuilder: 'true',
			//type (radix or custom)
			type: 'radix',
			//should color should regenerate on another color change
			linked: 'false',
			//if linked, define relation to another color
			linktype: '',
			//used to extend data-attributes
			dynamicPaths: [],
			//color data slot, for future upgrades
			//data -> name, onColor, onWcag, dark[], light[], darkAlpha[], lightAlpha[]
			data: {},
		},
		onNewSchemaConfirm() {
			var duplicates = 0;
			var newSchema = JSON.parse(
				JSON.stringify(Alpine.store('project').newSchemaPrototype)
			);

			newSchema.name =
				Alpine.store('project').newSchemaName.toLowerCase();
			if (newSchema.name.length < 3) {
				Alpine.store('project').invalidColorSchemaInput = true;
				Alpine.store('project').invalidMSG =
					'Please enter color name';
				return;
			} else {
				Alpine.store('project').invalidColorSchemaInput = false;
				Alpine.store('project').invalidMSG = '';
			}
			//Validate name: Remove white space
			newSchema.name = Alpine.store('project').schemaValidateName(
				newSchema.name
			);
			//if custom
			if (
				Alpine.store('project').customColorProfile != 'null' &&
				Alpine.store('project').customColorProfile != null
			) {
				newSchema.data = Alpine.store('project').customColorProfile;
				Alpine.store('project').customColorProfile = null;
			} else
				newSchema.data =
					Alpine.store('radix').colors[
					Alpine.store('project').colorIndex
					];

			Alpine.store('pd').colorSchemas.forEach((schema) => {
				if (
					schema.name.toLowerCase() ==
					newSchema.name.toLocaleLowerCase()
				)
					duplicates++;
			});
			if (duplicates == 0)
				Alpine.store('pd').colorSchemas.push(newSchema);
			else {
				swal_h({
					title: 'Error!',
					text: 'Color with that name already exists!',
					button: false,
					icon: 'error',
				});
			}
			duplicates = 0;
			Alpine.store('project').colorIndex = -1;
		},
		/* Added v1.1 - Name validation, also validate name when generating CSS */
		schemaValidateName(name) {
			name = name.trim().replaceAll(' ', '-');
			return name;
		},
		onNewSchemaCancel() {
			Alpine.store('project').colorIndex = -1;
			Alpine.store('project').schemaEdit = false;
			Alpine.store('project').schemaToEdit = 'none';
			Alpine.store('project').customColorProfile = null;
		},
		radiusPreset: {
			none: {
				preview: '0px',
				r1: '0px',
				r2: '0px',
				r3: '0px',
				rpill: '500px',
				rbutton: '0px',
			},
			small: {
				preview: '5px',
				r1: '4px',
				r2: '6px',
				r3: '9px',
				rpill: '500px',
				rbutton: '4px',
			},
			medium: {
				preview: '10px',
				r1: '6px',
				r2: '8px',
				r3: '12px',
				rpill: '500px',
				rbutton: '6px',
			},
			large: {
				preview: '16px',
				r1: '9px',
				r2: '12px',
				r3: '18px',
				rpill: '500px',
				rbutton: '12px',
			},
			full: {
				preview: '80%',
				r1: '10px',
				r2: '16px',
				r3: '24px',
				rpill: '500px',
				rbutton: '500px',
			},
		},
		schemaPresets: [
			{
				name: 'Brand',
				data: [
					{
						name: 'Gold',
						value: '#978365',
					},
					{
						name: 'Bronze',
						value: '#957468',
					},
					{
						name: 'Brown',
						value: '#AD7F58',
					},
					{
						name: 'Yellow',
						value: '#FFE629',
					},
					{
						name: 'Amber',
						value: '#FFC53D',
					},
					{
						name: 'Orange',
						value: '#F76B15',
					},
					{
						name: 'Tomato',
						value: '#E54D2E',
					},
					{
						name: 'Red',
						value: '#E5484D',
					},
					{
						name: 'Ruby',
						value: '#E54666',
					},
					{
						name: 'Crimson',
						value: '#E93D82',
					},
					{
						name: 'Pink',
						value: '#D6409F',
					},
					{
						name: 'Plum',
						value: '#AB4ABA',
					},
					{
						name: 'Purple',
						value: '#8E4EC6',
					},
					{
						name: 'Violet',
						value: '#6E56CF',
					},
					{
						name: 'Iris',
						value: '#5B5BD6',
					},
					{
						name: 'Indigo',
						value: '#3E63DD',
					},
					{
						name: 'Blue',
						value: '#0090FF',
					},
					{
						name: 'Cyan',
						value: '#00A2C7',
					},
					{
						name: 'Teal',
						value: '#12A594',
					},
					{
						name: 'Jade',
						value: '#29A383',
					},
					{
						name: 'Green',
						value: '#30A46C',
					},
					{
						name: 'Grass',
						value: '#46A758',
					},
					{
						name: 'Lime',
						value: '#BDEE63',
					},
					{
						name: 'Mint',
						value: '#86EAD4',
					},
					{
						name: 'Sky',
						value: '#7CE2FE',
					},
				],
			},
			{
				name: 'Neutral',
				data: [
					{
						name: 'Mauve',
						value: '#8E8C99',
						base: '#8E4EC6',
					},
					{
						name: 'Slate',
						value: '#8B8D98',
						base: '#0090FF',
					},
					{
						name: 'Sage',
						value: '#868E8B',
						base: '#30A46C',
					},
					{
						name: 'Sand',
						value: '#8D8D86',
						base: '#FFE629',
					},
					{
						name: 'Olive',
						value: '#898E87',
						base: '#BDEE63',
					},
					{
						name: 'Gray',
						value: '#8D8D8D',
						base: '#8D8D8D',
					},
				],
			},
		],

		setRadius() {
			const { radiusSettings, radiusActive } = Alpine.store('pd');
			const active =
				Alpine.store('project').radiusPreset[radiusActive];
			if (radiusActive != 'custom') {
				radiusSettings.radius1.value = active.r1;
				radiusSettings.radius2.value = active.r2;
				radiusSettings.radius3.value = active.r3;
				radiusSettings.radiusPill.value = active.rpill;
				radiusSettings.radiusbutton.value = active.rbutton;
			}
			regenerateTokenSystem();
			//TODO: Add custom radius option
		},
	});

	/**
	 * Chroma JS
	 * MODES: lrgb | lch | lab | hsl
	 * PADDING [left,right]
	 * Bezier: b = chroma.scale(['white', chroma(220, 0.72, 0.5, 'hsl'), 'black']).mode('lch').colors(9);
	 * Normal scale: b = chroma.bezier(['white', chroma(220, 0.72, 0.5, 'hsl'), 'black']).scale().padding([0.25, 0.15]).colors(9);
	 * Correct Lightness - This makes sure the lightness range is spread evenly across a color scale
	 * Accessibility: automatic contrast calculator
	 */

	/**
   *** Color Palette Prototype ***
   {
	  name: "primary"
	  steps: 10,
	  base: "#fff",
	  mode: "lch",
	  padding: "0.15",
	  padding: "0.15",
  
   }
   */
});
