'use strict';
document.addEventListener('alpine:init', () => {
	Alpine.store('radix', {
		suggestions: {
			complementary: '180',
			'split-complementary': '30',
			triadic: '120',
			tetriadic: '90',
			analogous: '30',
		},
		uswdsGradeByLuminace(l) {
			if (!Alpine.store('pd').luminance_normalization.uswds_grades_normalization) return 'NO';
			let uswds_grades = this.uswds_grades;
			l = parseFloat(l);

			for (let i = 0; i < uswds_grades.length; i++) {
				const grade = uswds_grades[i];

				if (l >= grade.min && l <= grade.max) {
					return grade.points; // Return the correct grade
				}
			}

			return "NN";
		},
		setClosestGradeLuminance(l) {
			setTimeout(() => {
				Alpine.store('project').regenratePaletteOutput()
			}, 150);
			if (!Alpine.store('pd').luminance_normalization.uswds_grades_normalization) return l;
			let uswds_grades = this.uswds_grades;
			l = parseFloat(l)
			for (const grade of uswds_grades) {
				if (l >= grade.min && l <= grade.max) {
					return l; // Luminance fits within this range
				}
			}

			// If l doesn't fit, find the closest min or max value
			let closest = uswds_grades[0].min; // Start with the first value

			for (const grade of uswds_grades) {
				const distances = [
					{ value: grade.min, distance: Math.abs(l - grade.min) },
					{ value: grade.max, distance: Math.abs(l - grade.max) },
				];

				for (const d of distances) {
					if (d.distance < Math.abs(l - closest)) {
						closest = d.value;
					}
				}
			}

			l = closest;
			return closest;
		},
		"uswds_grades": [
			{
				"points": "00",
				"min": 1.000,
				"max": 1.000
			},
			{
				"points": "05",
				"min": 0.850,
				"max": 0.930
			},
			{
				"points": "10",
				"min": 0.750,
				"max": 0.820
			},
			{
				"points": "20",
				"min": 0.500,
				"max": 0.650
			},
			{
				"points": "30",
				"min": 0.350,
				"max": 0.450
			},
			{
				"points": "40",
				"min": 0.250,
				"max": 0.300
			},
			{
				"points": "50",
				"min": 0.175,
				"max": 0.183
			},
			{
				"points": "60",
				"min": 0.100,
				"max": 0.125
			},
			{
				"points": "70",
				"min": 0.050,
				"max": 0.070
			},
			{
				"points": "80",
				"min": 0.020,
				"max": 0.040
			},

			{
				"points": "90",
				"min": 0.005,
				"max": 0.015
			},

			{
				"points": "100",
				"min": 0.000,
				"max": 0.000
			},
		],


		scales: [
			{
				step: '1',
				usage: 'Background',
				pairsWith: 'Text, steps 11-12',
			},
			{
				step: '2',
				usage: 'Background',
				pairsWith: 'Text, steps 11-12',
			},
			{
				step: '3',
				usage: 'Interactive components',
				pairsWith: 'Steps 11 labels, Step 12 text',
			},
			{
				step: '4',
				usage: 'Interactive components',
				pairsWith: 'Steps 11 labels, Step 12 text',
			},
			{
				step: '5',
				usage: 'Interactive components',
				pairsWith: 'Step 12 text',
			},
			{
				step: '6',
				usage: 'Borders and separators',
				pairsWith: 'Steps 1–5 backgrounds',
			},
			{
				step: '7',
				usage: 'Borders and separators',
				pairsWith: 'Steps 1–5 backgrounds',
			},
			{
				step: '8',
				usage: 'Borders and separators',
				pairsWith: 'Steps 1–5 backgrounds',
			},
			{
				step: '9',
				step: 'Solid backgrounds, disabled textr',
				pairsWith: '{onColor} text',
			},
			{
				step: '10',
				usage: 'Solid backgrounds, disabled textr',
				pairsWith: '{onColor} text',
			},
			{
				step: '11',
				usage: 'Secondary text, links',
				pairsWith: 'Background colors, steps 1, 2',
			},
			{
				step: '12',
				usage: 'High-contrast text',
				pairsWith: 'Background colors, steps 1, 2',
			},
		],
		suggestionArray: [],
		colors: [
			{
				name: 'Tomato',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#181111',
					},
					{
						step: 2,
						value: '#1f1513',
					},
					{
						step: 3,
						value: '#391714',
					},
					{
						step: 4,
						value: '#4e1511',
					},
					{
						step: 5,
						value: '#5e1c16',
					},
					{
						step: 6,
						value: '#6e2920',
					},
					{
						step: 7,
						value: '#853a2d',
					},
					{
						step: 8,
						value: '#ac4d39',
					},
					{
						step: 9,
						value: '#e54d2e',
					},
					{
						step: 10,
						value: '#ec6142',
					},
					{
						step: 11,
						value: '#ff977d',
					},
					{
						step: 12,
						value: '#fbd3cb',
					},
				],
				light: [
					{
						step: 1,
						value: '#fffcfc',
					},
					{
						step: 2,
						value: '#fff8f7',
					},
					{
						step: 3,
						value: '#feebe7',
					},
					{
						step: 4,
						value: '#ffdcd3',
					},
					{
						step: 5,
						value: '#ffcdc2',
					},
					{
						step: 6,
						value: '#fdbdaf',
					},
					{
						step: 7,
						value: '#f5a898',
					},
					{
						step: 8,
						value: '#ec8e7b',
					},
					{
						step: 9,
						value: '#e54d2e',
					},
					{
						step: 10,
						value: '#dd4425',
					},
					{
						step: 11,
						value: '#d13415',
					},
					{
						step: 12,
						value: '#5c271f',
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
						value: 'hsla(5, 100%, 49.6%, 0.058)',
						step: 2,
						h: '5',
						s: '1.00',
						l: '0.50',
						a: ' 0.058',
					},
					{
						value: 'hsla(6, 99.6%, 54.9%, 0.133)',
						step: 3,
						h: '6',
						s: '1.00',
						l: '0.55',
						a: ' 0.133',
					},
					{
						value: 'hsla(6, 99.2%, 55.4%, 0.191)',
						step: 4,
						h: '6',
						s: '0.99',
						l: '0.55',
						a: ' 0.191',
					},
					{
						value: 'hsla(6, 99.5%, 55.8%, 0.244)',
						step: 5,
						h: '6',
						s: '0.99',
						l: '0.56',
						a: ' 0.244',
					},
					{
						value: 'hsla(7, 99.7%, 55.9%, 0.319)',
						step: 6,
						h: '7',
						s: '1.00',
						l: '0.56',
						a: ' 0.319',
					},
					{
						value: 'hsla(8, 99.8%, 54.8%, 0.434)',
						step: 7,
						h: '8',
						s: '1.00',
						l: '0.55',
						a: ' 0.434',
					},
					{
						value: 'hsla(10, 99.8%, 53.5%, 0.598)',
						step: 8,
						h: '10',
						s: '1.00',
						l: '0.54',
						a: ' 0.598',
					},
					{
						value: 'hsla(10, 100%, 59.7%, 0.885)',
						step: 9,
						h: '10',
						s: '1.00',
						l: '0.60',
						a: ' 0.885',
					},
					{
						value: 'hsla(10, 100%, 63.6%, 0.916)',
						step: 10,
						h: '10',
						s: '1.00',
						l: '0.64',
						a: ' 0.916',
					},
					{
						value: 'hsla(10, 99.7%, 66.4%, 0.939)',
						step: 11,
						h: '10',
						s: '1.00',
						l: '0.66',
						a: ' 0.939',
					},
					{
						value: 'hsla(12, 100%, 97.1%, 0.980)',
						step: 12,
						h: '12',
						s: '1.00',
						l: '0.97',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(0, 100%, 51.0%, 0.012)',
						step: 1,
						h: '0',
						s: '1.00',
						l: '0.51',
						a: ' 0.012',
					},
					{
						value: 'hsla(8, 100%, 51.0%, 0.032)',
						step: 2,
						h: '8',
						s: '1.00',
						l: '0.51',
						a: ' 0.032',
					},
					{
						value: 'hsla(7, 100%, 50.2%, 0.067)',
						step: 3,
						h: '7',
						s: '1.00',
						l: '0.50',
						a: ' 0.067',
					},
					{
						value: 'hsla(8, 100%, 50.1%, 0.114)',
						step: 4,
						h: '8',
						s: '1.00',
						l: '0.50',
						a: ' 0.114',
					},
					{
						value: 'hsla(7, 99.5%, 47.9%, 0.173)',
						step: 5,
						h: '7',
						s: '0.99',
						l: '0.48',
						a: ' 0.173',
					},
					{
						value: 'hsla(9, 99.9%, 46.2%, 0.255)',
						step: 6,
						h: '9',
						s: '1.00',
						l: '0.46',
						a: ' 0.255',
					},
					{
						value: 'hsla(10, 99.8%, 43.6%, 0.365)',
						step: 7,
						h: '10',
						s: '1.00',
						l: '0.44',
						a: ' 0.365',
					},
					{
						value: 'hsla(10, 99.5%, 41.8%, 0.499)',
						step: 8,
						h: '10',
						s: '0.99',
						l: '0.42',
						a: ' 0.499',
					},
					{
						value: 'hsla(10, 99.9%, 43.8%, 0.820)',
						step: 9,
						h: '10',
						s: '1.00',
						l: '0.44',
						a: ' 0.820',
					},
					{
						value: 'hsla(10, 100%, 41.8%, 0.859)',
						step: 10,
						h: '10',
						s: '1.00',
						l: '0.42',
						a: ' 0.859',
					},
					{
						value: 'hsla(10, 99.9%, 38.8%, 0.922)',
						step: 11,
						h: '10',
						s: '1.00',
						l: '0.39',
						a: ' 0.922',
					},
					{
						value: 'hsla(10, 99.0%, 7.4%, 0.934)',
						step: 12,
						h: '10',
						s: '0.99',
						l: '0.07',
						a: ' 0.934',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Red',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#191111',
					},
					{
						step: 2,
						value: '#201314',
					},
					{
						step: 3,
						value: '#3b1219',
					},
					{
						step: 4,
						value: '#500f1c',
					},
					{
						step: 5,
						value: '#611623',
					},
					{
						step: 6,
						value: '#72232d',
					},
					{
						step: 7,
						value: '#8c333a',
					},
					{
						step: 8,
						value: '#b54548',
					},
					{
						step: 9,
						value: '#e5484d',
					},
					{
						step: 10,
						value: '#ec5d5e',
					},
					{
						step: 11,
						value: '#ff9592',
					},
					{
						step: 12,
						value: '#ffd1d9',
					},
				],
				light: [
					{
						step: 1,
						value: '#fffcfc',
					},
					{
						step: 2,
						value: '#fff7f7',
					},
					{
						step: 3,
						value: '#feebec',
					},
					{
						step: 4,
						value: '#ffdbdc',
					},
					{
						step: 5,
						value: '#ffcdce',
					},
					{
						step: 6,
						value: '#fdbdbe',
					},
					{
						step: 7,
						value: '#f4a9aa',
					},
					{
						step: 8,
						value: '#eb8e90',
					},
					{
						step: 9,
						value: '#e5484d',
					},
					{
						step: 10,
						value: '#dc3e42',
					},
					{
						step: 11,
						value: '#ce2c31',
					},
					{
						step: 12,
						value: '#641723',
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
						value: 'hsla(5, 98.5%, 53.8%, 0.045)',
						step: 2,
						h: '5',
						s: '0.98',
						l: '0.54',
						a: ' 0.045',
					},
					{
						value: 'hsla(359, 99.1%, 61.1%, 0.130)',
						step: 3,
						h: '359',
						s: '0.99',
						l: '0.61',
						a: ' 0.130',
					},
					{
						value: 'hsla(358, 98.8%, 61.0%, 0.184)',
						step: 4,
						h: '358',
						s: '0.99',
						l: '0.61',
						a: ' 0.184',
					},
					{
						value: 'hsla(357, 99.6%, 60.3%, 0.237)',
						step: 5,
						h: '357',
						s: '1.00',
						l: '0.60',
						a: ' 0.237',
					},
					{
						value: 'hsla(358, 99.6%, 60.3%, 0.322)',
						step: 6,
						h: '358',
						s: '1.00',
						l: '0.60',
						a: ' 0.322',
					},
					{
						value: 'hsla(357, 100%, 59.5%, 0.442)',
						step: 7,
						h: '357',
						s: '1.00',
						l: '0.59',
						a: ' 0.442',
					},
					{
						value: 'hsla(358, 99.8%, 59.1%, 0.621)',
						step: 8,
						h: '358',
						s: '1.00',
						l: '0.59',
						a: ' 0.621',
					},
					{
						value: 'hsla(358, 100%, 65.5%, 0.884)',
						step: 9,
						h: '358',
						s: '1.00',
						l: '0.66',
						a: ' 0.884',
					},
					{
						value: 'hsla(358, 100%, 67.5%, 0.942)',
						step: 10,
						h: '358',
						s: '1.00',
						l: '0.68',
						a: ' 0.942',
					},
					{
						value: 'hsla(358, 100%, 69.7%, 0.980)',
						step: 11,
						h: '358',
						s: '1.00',
						l: '0.70',
						a: ' 0.980',
					},
					{
						value: 'hsla(352, 100%, 97.1%, 0.980)',
						step: 12,
						h: '352',
						s: '1.00',
						l: '0.97',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(0, 100%, 51.0%, 0.012)',
						step: 1,
						h: '0',
						s: '1.00',
						l: '0.51',
						a: ' 0.012',
					},
					{
						value: 'hsla(0, 100%, 51.0%, 0.032)',
						step: 2,
						h: '0',
						s: '1.00',
						l: '0.51',
						a: ' 0.032',
					},
					{
						value: 'hsla(0, 100%, 50.2%, 0.063)',
						step: 3,
						h: '0',
						s: '1.00',
						l: '0.50',
						a: ' 0.063',
					},
					{
						value: 'hsla(0, 100%, 50.0%, 0.102)',
						step: 4,
						h: '0',
						s: '1.00',
						l: '0.50',
						a: ' 0.102',
					},
					{
						value: 'hsla(0, 99.9%, 47.5%, 0.153)',
						step: 5,
						h: '0',
						s: '1.00',
						l: '0.47',
						a: ' 0.153',
					},
					{
						value: 'hsla(0, 99.5%, 44.9%, 0.224)',
						step: 6,
						h: '0',
						s: '0.99',
						l: '0.45',
						a: ' 0.224',
					},
					{
						value: 'hsla(359, 99.7%, 42.7%, 0.318)',
						step: 7,
						h: '359',
						s: '1.00',
						l: '0.43',
						a: ' 0.318',
					},
					{
						value: 'hsla(359, 99.6%, 41.1%, 0.436)',
						step: 8,
						h: '359',
						s: '1.00',
						l: '0.41',
						a: ' 0.436',
					},
					{
						value: 'hsla(358, 99.9%, 42.9%, 0.718)',
						step: 9,
						h: '358',
						s: '1.00',
						l: '0.43',
						a: ' 0.718',
					},
					{
						value: 'hsla(358, 99.9%, 41.0%, 0.761)',
						step: 10,
						h: '358',
						s: '1.00',
						l: '0.41',
						a: ' 0.761',
					},
					{
						value: 'hsla(358, 99.8%, 38.3%, 0.832)',
						step: 11,
						h: '358',
						s: '1.00',
						l: '0.38',
						a: ' 0.832',
					},
					{
						value: 'hsla(355, 99.3%, 7.9%, 0.926)',
						step: 12,
						h: '355',
						s: '0.99',
						l: '0.08',
						a: ' 0.926',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Ruby',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#191113',
					},
					{
						step: 2,
						value: '#1e1517',
					},
					{
						step: 3,
						value: '#3a141e',
					},
					{
						step: 4,
						value: '#4e1325',
					},
					{
						step: 5,
						value: '#5e1a2e',
					},
					{
						step: 6,
						value: '#6f2539',
					},
					{
						step: 7,
						value: '#883447',
					},
					{
						step: 8,
						value: '#b3445a',
					},
					{
						step: 9,
						value: '#e54666',
					},
					{
						step: 10,
						value: '#ec5a72',
					},
					{
						step: 11,
						value: '#ff949d',
					},
					{
						step: 12,
						value: '#fed2e1',
					},
				],
				light: [
					{
						step: 1,
						value: '#fffcfd',
					},
					{
						step: 2,
						value: '#fff7f8',
					},
					{
						step: 3,
						value: '#feeaed',
					},
					{
						step: 4,
						value: '#ffdce1',
					},
					{
						step: 5,
						value: '#ffced6',
					},
					{
						step: 6,
						value: '#f8bfc8',
					},
					{
						step: 7,
						value: '#efacb8',
					},
					{
						step: 8,
						value: '#e592a3',
					},
					{
						step: 9,
						value: '#e54666',
					},
					{
						step: 10,
						value: '#dc3b5d',
					},
					{
						step: 11,
						value: '#ca244d',
					},
					{
						step: 12,
						value: '#64172b',
					},
				],
				darkAlpha: [
					{
						value: 'hsla(345.13,91.13%,51.37%,0.04)',
						step: 1,
						h: '345.13',
						s: '0.91',
						l: '0.51',
						a: '0.04',
					},
					{
						value: 'hsla(346.46,98.8%,67.45%,0.05)',
						step: 2,
						h: '346.46',
						s: '0.99',
						l: '0.67',
						a: '0.05',
					},
					{
						value: 'hsla(344.18,100%,56.86%,0.17)',
						step: 3,
						h: '344.18',
						s: '1.00',
						l: '0.57',
						a: '0.17',
					},
					{
						value: 'hsla(341.84,98.28%,54.51%,0.26)',
						step: 4,
						h: '341.84',
						s: '0.98',
						l: '0.55',
						a: '0.26',
					},
					{
						value: 'hsla(342.2,99.05%,58.63%,0.33)',
						step: 5,
						h: '342.2',
						s: '0.99',
						l: '0.59',
						a: '0.33',
					},
					{
						value: 'hsla(343.96,100%,63.33%,0.4)',
						step: 6,
						h: '343.96',
						s: '1.00',
						l: '0.63',
						a: '0.4',
					},
					{
						value: 'hsla(346.43,100%,67.06%,0.5)',
						step: 7,
						h: '346.43',
						s: '1.00',
						l: '0.67',
						a: '0.5',
					},
					{
						value: 'hsla(348.22,100%,68.04%,0.68)',
						step: 8,
						h: '348.22',
						s: '1.00',
						l: '0.68',
						a: '0.68',
					},
					{
						value: 'hsla(347.87,98.89%,64.71%,0.89)',
						step: 9,
						h: '347.87',
						s: '0.99',
						l: '0.65',
						a: '0.89',
					},
					{
						value: 'hsla(350.13,100%,69.02%,0.92)',
						step: 10,
						h: '350.13',
						s: '1.00',
						l: '0.69',
						a: '0.92',
					},
					{
						value: 'hsla(354.95,100%,79.02%,1)',
						step: 11,
						h: '354.95',
						s: '1.00',
						l: '0.79',
						a: '1',
					},
					{
						value: 'hsla(339.55,100%,91.37%,1)',
						step: 12,
						h: '339.55',
						s: '1.00',
						l: '0.91',
						a: '1',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(340,100%,50%,0.01)',
						step: 1,
						h: '340',
						s: '1.00',
						l: '0.50',
						a: '0.01',
					},
					{
						value: 'hsla(352.47,100%,50%,0.03)',
						step: 2,
						h: '352.47',
						s: '1.00',
						l: '0.50',
						a: '0.03',
					},
					{
						value: 'hsla(350.86,100%,47.65%,0.08)',
						step: 3,
						h: '350.86',
						s: '1.00',
						l: '0.48',
						a: '0.08',
					},
					{
						value: 'hsla(351.29,100%,50%,0.14)',
						step: 4,
						h: '351.29',
						s: '1.00',
						l: '0.50',
						a: '0.14',
					},
					{
						value: 'hsla(350.12,100%,50%,0.19)',
						step: 5,
						h: '350.12',
						s: '1.00',
						l: '0.50',
						a: '0.19',
					},
					{
						value: 'hsla(350.53,100%,44.71%,0.25)',
						step: 6,
						h: '350.53',
						s: '1.00',
						l: '0.45',
						a: '0.25',
					},
					{
						value: 'hsla(349.22,100%,40.39%,0.33)',
						step: 7,
						h: '349.22',
						s: '1.00',
						l: '0.40',
						a: '0.33',
					},
					{
						value: 'hsla(347.69,100%,38.24%,0.43)',
						step: 8,
						h: '347.69',
						s: '1.00',
						l: '0.38',
						a: '0.43',
					},
					{
						value: 'hsla(347.95,100%,42.94%,0.73)',
						step: 9,
						h: '347.95',
						s: '1.00',
						l: '0.43',
						a: '0.73',
					},
					{
						value: 'hsla(347.43,100%,41.18%,0.77)',
						step: 10,
						h: '347.43',
						s: '1.00',
						l: '0.41',
						a: '0.77',
					},
					{
						value: 'hsla(345.08,100%,37.84%,0.86)',
						step: 11,
						h: '345.08',
						s: '1.00',
						l: '0.38',
						a: '0.86',
					},
					{
						value: 'hsla(344.47,100%,16.67%,0.91)',
						step: 12,
						h: '344.47',
						s: '1.00',
						l: '0.17',
						a: '0.91',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Crimson',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#191114',
					},
					{
						step: 2,
						value: '#201318',
					},
					{
						step: 3,
						value: '#381525',
					},
					{
						step: 4,
						value: '#4d122f',
					},
					{
						step: 5,
						value: '#5c1839',
					},
					{
						step: 6,
						value: '#6d2545',
					},
					{
						step: 7,
						value: '#873356',
					},
					{
						step: 8,
						value: '#b0436e',
					},
					{
						step: 9,
						value: '#e93d82',
					},
					{
						step: 10,
						value: '#ee518a',
					},
					{
						step: 11,
						value: '#ff92ad',
					},
					{
						step: 12,
						value: '#fdd3e8',
					},
				],
				light: [
					{
						step: 1,
						value: '#fffcfd',
					},
					{
						step: 2,
						value: '#fef7f9',
					},
					{
						step: 3,
						value: '#ffe9f0',
					},
					{
						step: 4,
						value: '#fedce7',
					},
					{
						step: 5,
						value: '#facedd',
					},
					{
						step: 6,
						value: '#f3bed1',
					},
					{
						step: 7,
						value: '#eaacc3',
					},
					{
						step: 8,
						value: '#e093b2',
					},
					{
						step: 9,
						value: '#e93d82',
					},
					{
						step: 10,
						value: '#df3478',
					},
					{
						step: 11,
						value: '#cb1d63',
					},
					{
						step: 12,
						value: '#621639',
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
						value: 'hsla(336, 96.8%, 53.2%, 0.045)',
						step: 2,
						h: '336',
						s: '0.97',
						l: '0.53',
						a: ' 0.045',
					},
					{
						value: 'hsla(335, 98.7%, 59.3%, 0.138)',
						step: 3,
						h: '335',
						s: '0.99',
						l: '0.59',
						a: ' 0.138',
					},
					{
						value: 'hsla(336, 99.1%, 59.9%, 0.191)',
						step: 4,
						h: '336',
						s: '0.99',
						l: '0.60',
						a: ' 0.191',
					},
					{
						value: 'hsla(335, 99.4%, 59.4%, 0.244)',
						step: 5,
						h: '335',
						s: '0.99',
						l: '0.59',
						a: ' 0.244',
					},
					{
						value: 'hsla(335, 99.4%, 59.4%, 0.315)',
						step: 6,
						h: '335',
						s: '0.99',
						l: '0.59',
						a: ' 0.315',
					},
					{
						value: 'hsla(336, 99.5%, 57.8%, 0.439)',
						step: 7,
						h: '336',
						s: '0.99',
						l: '0.58',
						a: ' 0.439',
					},
					{
						value: 'hsla(336, 99.9%, 55.4%, 0.642)',
						step: 8,
						h: '336',
						s: '1.00',
						l: '0.55',
						a: ' 0.642',
					},
					{
						value: 'hsla(336, 99.9%, 62.8%, 0.903)',
						step: 9,
						h: '336',
						s: '1.00',
						l: '0.63',
						a: ' 0.903',
					},
					{
						value: 'hsla(339, 99.9%, 66.3%, 0.934)',
						step: 10,
						h: '339',
						s: '1.00',
						l: '0.66',
						a: ' 0.934',
					},
					{
						value: 'hsla(341, 99.9%, 69.5%, 0.965)',
						step: 11,
						h: '341',
						s: '1.00',
						l: '0.69',
						a: ' 0.965',
					},
					{
						value: 'hsla(327, 100%, 97.1%, 0.980)',
						step: 12,
						h: '327',
						s: '1.00',
						l: '0.97',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(340, 100%, 51.0%, 0.012)',
						step: 1,
						h: '340',
						s: '1.00',
						l: '0.51',
						a: ' 0.012',
					},
					{
						value: 'hsla(330, 100%, 51.0%, 0.032)',
						step: 2,
						h: '330',
						s: '1.00',
						l: '0.51',
						a: ' 0.032',
					},
					{
						value: 'hsla(332, 99.1%, 47.1%, 0.063)',
						step: 3,
						h: '332',
						s: '0.99',
						l: '0.47',
						a: ' 0.063',
					},
					{
						value: 'hsla(331, 99.9%, 44.3%, 0.102)',
						step: 4,
						h: '331',
						s: '1.00',
						l: '0.44',
						a: ' 0.102',
					},
					{
						value: 'hsla(333, 99.9%, 42.3%, 0.153)',
						step: 5,
						h: '333',
						s: '1.00',
						l: '0.42',
						a: ' 0.153',
					},
					{
						value: 'hsla(333, 99.5%, 40.5%, 0.224)',
						step: 6,
						h: '333',
						s: '0.99',
						l: '0.41',
						a: ' 0.224',
					},
					{
						value: 'hsla(335, 99.7%, 39.1%, 0.322)',
						step: 7,
						h: '335',
						s: '1.00',
						l: '0.39',
						a: ' 0.322',
					},
					{
						value: 'hsla(336, 99.5%, 38.5%, 0.440)',
						step: 8,
						h: '336',
						s: '0.99',
						l: '0.39',
						a: ' 0.440',
					},
					{
						value: 'hsla(336, 99.9%, 44.3%, 0.761)',
						step: 9,
						h: '336',
						s: '1.00',
						l: '0.44',
						a: ' 0.761',
					},
					{
						value: 'hsla(336, 100%, 42.5%, 0.808)',
						step: 10,
						h: '336',
						s: '1.00',
						l: '0.42',
						a: ' 0.808',
					},
					{
						value: 'hsla(336, 99.8%, 40.3%, 0.883)',
						step: 11,
						h: '336',
						s: '1.00',
						l: '0.40',
						a: ' 0.883',
					},
					{
						value: 'hsla(340, 99.0%, 10.0%, 0.950)',
						step: 12,
						h: '340',
						s: '0.99',
						l: '0.10',
						a: ' 0.950',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Pink',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#191117',
					},
					{
						step: 2,
						value: '#21121d',
					},
					{
						step: 3,
						value: '#37172f',
					},
					{
						step: 4,
						value: '#4b143d',
					},
					{
						step: 5,
						value: '#591c47',
					},
					{
						step: 6,
						value: '#692955',
					},
					{
						step: 7,
						value: '#833869',
					},
					{
						step: 8,
						value: '#a84885',
					},
					{
						step: 9,
						value: '#d6409f',
					},
					{
						step: 10,
						value: '#de51a8',
					},
					{
						step: 11,
						value: '#ff8dcc',
					},
					{
						step: 12,
						value: '#fdd1ea',
					},
				],
				light: [
					{
						step: 1,
						value: '#fffcfe',
					},
					{
						step: 2,
						value: '#fef7fb',
					},
					{
						step: 3,
						value: '#fee9f5',
					},
					{
						step: 4,
						value: '#fbdcef',
					},
					{
						step: 5,
						value: '#f6cee7',
					},
					{
						step: 6,
						value: '#efbfdd',
					},
					{
						step: 7,
						value: '#e7acd0',
					},
					{
						step: 8,
						value: '#dd93c2',
					},
					{
						step: 9,
						value: '#d6409f',
					},
					{
						step: 10,
						value: '#cf3897',
					},
					{
						step: 11,
						value: '#c2298a',
					},
					{
						step: 12,
						value: '#651249',
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
						value: 'hsla(320, 98.1%, 64.1%, 0.036)',
						step: 2,
						h: '320',
						s: '0.98',
						l: '0.64',
						a: ' 0.036',
					},
					{
						value: 'hsla(320, 99.1%, 63.1%, 0.121)',
						step: 3,
						h: '320',
						s: '0.99',
						l: '0.63',
						a: ' 0.121',
					},
					{
						value: 'hsla(320, 99.5%, 62.7%, 0.170)',
						step: 4,
						h: '320',
						s: '0.99',
						l: '0.63',
						a: ' 0.170',
					},
					{
						value: 'hsla(319, 99.7%, 61.5%, 0.219)',
						step: 5,
						h: '319',
						s: '1.00',
						l: '0.61',
						a: ' 0.219',
					},
					{
						value: 'hsla(322, 99.4%, 60.8%, 0.291)',
						step: 6,
						h: '322',
						s: '0.99',
						l: '0.61',
						a: ' 0.291',
					},
					{
						value: 'hsla(321, 99.6%, 58.7%, 0.407)',
						step: 7,
						h: '321',
						s: '1.00',
						l: '0.59',
						a: ' 0.407',
					},
					{
						value: 'hsla(322, 99.7%, 55.4%, 0.608)',
						step: 8,
						h: '322',
						s: '1.00',
						l: '0.55',
						a: ' 0.608',
					},
					{
						value: 'hsla(322, 100%, 64.6%, 0.817)',
						step: 9,
						h: '322',
						s: '1.00',
						l: '0.65',
						a: ' 0.817',
					},
					{
						value: 'hsla(323, 100%, 66.3%, 0.875)',
						step: 10,
						h: '323',
						s: '1.00',
						l: '0.66',
						a: ' 0.875',
					},
					{
						value: 'hsla(325, 99.9%, 68.6%, 0.960)',
						step: 11,
						h: '325',
						s: '1.00',
						l: '0.69',
						a: ' 0.960',
					},
					{
						value: 'hsla(314, 100%, 96.9%, 0.980)',
						step: 12,
						h: '314',
						s: '1.00',
						l: '0.97',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(320, 100%, 51.0%, 0.012)',
						step: 1,
						h: '320',
						s: '1.00',
						l: '0.51',
						a: ' 0.012',
					},
					{
						value: 'hsla(323, 100%, 51.0%, 0.032)',
						step: 2,
						h: '323',
						s: '1.00',
						l: '0.51',
						a: ' 0.032',
					},
					{
						value: 'hsla(323, 98.9%, 47.3%, 0.067)',
						step: 3,
						h: '323',
						s: '0.99',
						l: '0.47',
						a: ' 0.067',
					},
					{
						value: 'hsla(323, 99.9%, 44.3%, 0.102)',
						step: 4,
						h: '323',
						s: '1.00',
						l: '0.44',
						a: ' 0.102',
					},
					{
						value: 'hsla(324, 99.9%, 42.3%, 0.153)',
						step: 5,
						h: '324',
						s: '1.00',
						l: '0.42',
						a: ' 0.153',
					},
					{
						value: 'hsla(323, 99.5%, 39.6%, 0.224)',
						step: 6,
						h: '323',
						s: '0.99',
						l: '0.40',
						a: ' 0.224',
					},
					{
						value: 'hsla(323, 99.7%, 38.5%, 0.322)',
						step: 7,
						h: '323',
						s: '1.00',
						l: '0.39',
						a: ' 0.322',
					},
					{
						value: 'hsla(323, 99.5%, 37.7%, 0.444)',
						step: 8,
						h: '323',
						s: '0.99',
						l: '0.38',
						a: ' 0.444',
					},
					{
						value: 'hsla(322, 99.7%, 39.3%, 0.750)',
						step: 9,
						h: '322',
						s: '1.00',
						l: '0.39',
						a: ' 0.750',
					},
					{
						value: 'hsla(322, 100%, 39.1%, 0.808)',
						step: 10,
						h: '322',
						s: '1.00',
						l: '0.39',
						a: ' 0.808',
					},
					{
						value: 'hsla(322, 99.8%, 39.0%, 0.887)',
						step: 11,
						h: '322',
						s: '1.00',
						l: '0.39',
						a: ' 0.887',
					},
					{
						value: 'hsla(321, 99.8%, 10.0%, 0.961)',
						step: 12,
						h: '321',
						s: '1.00',
						l: '0.10',
						a: ' 0.961',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Plum',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#181118',
					},
					{
						step: 2,
						value: '#201320',
					},
					{
						step: 3,
						value: '#351a35',
					},
					{
						step: 4,
						value: '#451d47',
					},
					{
						step: 5,
						value: '#512454',
					},
					{
						step: 6,
						value: '#5e3061',
					},
					{
						step: 7,
						value: '#734079',
					},
					{
						step: 8,
						value: '#92549c',
					},
					{
						step: 9,
						value: '#ab4aba',
					},
					{
						step: 10,
						value: '#b658c4',
					},
					{
						step: 11,
						value: '#e796f3',
					},
					{
						step: 12,
						value: '#f4d4f4',
					},
				],
				light: [
					{
						step: 1,
						value: '#fefcff',
					},
					{
						step: 2,
						value: '#fdf7fd',
					},
					{
						step: 3,
						value: '#fbebfb',
					},
					{
						step: 4,
						value: '#f7def8',
					},
					{
						step: 5,
						value: '#f2d1f3',
					},
					{
						step: 6,
						value: '#e9c2ec',
					},
					{
						step: 7,
						value: '#deade3',
					},
					{
						step: 8,
						value: '#cf91d8',
					},
					{
						step: 9,
						value: '#ab4aba',
					},
					{
						step: 10,
						value: '#a144af',
					},
					{
						step: 11,
						value: '#953ea3',
					},
					{
						step: 12,
						value: '#53195d',
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
						value: 'hsla(300, 96.4%, 58.4%, 0.036)',
						step: 2,
						h: '300',
						s: '0.96',
						l: '0.58',
						a: ' 0.036',
					},
					{
						value: 'hsla(300, 99.4%, 67.1%, 0.102)',
						step: 3,
						h: '300',
						s: '0.99',
						l: '0.67',
						a: ' 0.102',
					},
					{
						value: 'hsla(295, 99.8%, 66.3%, 0.155)',
						step: 4,
						h: '295',
						s: '1.00',
						l: '0.66',
						a: ' 0.155',
					},
					{
						value: 'hsla(295, 99.4%, 67.1%, 0.204)',
						step: 5,
						h: '295',
						s: '0.99',
						l: '0.67',
						a: ' 0.204',
					},
					{
						value: 'hsla(294, 99.0%, 67.8%, 0.262)',
						step: 6,
						h: '294',
						s: '0.99',
						l: '0.68',
						a: ' 0.262',
					},
					{
						value: 'hsla(294, 99.9%, 67.7%, 0.363)',
						step: 7,
						h: '294',
						s: '1.00',
						l: '0.68',
						a: ' 0.363',
					},
					{
						value: 'hsla(292, 99.8%, 67.5%, 0.527)',
						step: 8,
						h: '292',
						s: '1.00',
						l: '0.68',
						a: ' 0.527',
					},
					{
						value: 'hsla(292, 99.9%, 69.2%, 0.695)',
						step: 9,
						h: '292',
						s: '1.00',
						l: '0.69',
						a: ' 0.695',
					},
					{
						value: 'hsla(295, 99.9%, 70.8%, 0.748)',
						step: 10,
						h: '295',
						s: '1.00',
						l: '0.71',
						a: ' 0.748',
					},
					{
						value: 'hsla(300, 99.8%, 72.9%, 0.828)',
						step: 11,
						h: '300',
						s: '1.00',
						l: '0.73',
						a: ' 0.828',
					},
					{
						value: 'hsla(300, 100%, 97.1%, 0.980)',
						step: 12,
						h: '300',
						s: '1.00',
						l: '0.97',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(280, 100%, 51.0%, 0.012)',
						step: 1,
						h: '280',
						s: '1.00',
						l: '0.51',
						a: ' 0.012',
					},
					{
						value: 'hsla(300, 100%, 51.0%, 0.028)',
						step: 2,
						h: '300',
						s: '1.00',
						l: '0.51',
						a: ' 0.028',
					},
					{
						value: 'hsla(300, 99.0%, 40.9%, 0.063)',
						step: 3,
						h: '300',
						s: '0.99',
						l: '0.41',
						a: ' 0.063',
					},
					{
						value: 'hsla(300, 99.9%, 38.5%, 0.102)',
						step: 4,
						h: '300',
						s: '1.00',
						l: '0.39',
						a: ' 0.102',
					},
					{
						value: 'hsla(298, 98.2%, 35.9%, 0.150)',
						step: 5,
						h: '298',
						s: '0.98',
						l: '0.36',
						a: ' 0.150',
					},
					{
						value: 'hsla(297, 99.6%, 33.7%, 0.216)',
						step: 6,
						h: '297',
						s: '1.00',
						l: '0.34',
						a: ' 0.216',
					},
					{
						value: 'hsla(295, 99.7%, 32.6%, 0.314)',
						step: 7,
						h: '295',
						s: '1.00',
						l: '0.33',
						a: ' 0.314',
					},
					{
						value: 'hsla(292, 99.6%, 32.4%, 0.432)',
						step: 8,
						h: '292',
						s: '1.00',
						l: '0.32',
						a: ' 0.432',
					},
					{
						value: 'hsla(292, 99.9%, 31.0%, 0.710)',
						step: 9,
						h: '292',
						s: '1.00',
						l: '0.31',
						a: ' 0.710',
					},
					{
						value: 'hsla(292, 99.9%, 30.8%, 0.765)',
						step: 10,
						h: '292',
						s: '1.00',
						l: '0.31',
						a: ' 0.765',
					},
					{
						value: 'hsla(292, 99.8%, 30.7%, 0.832)',
						step: 11,
						h: '292',
						s: '1.00',
						l: '0.31',
						a: ' 0.832',
					},
					{
						value: 'hsla(291, 99.9%, 9.7%, 0.953)',
						step: 12,
						h: '291',
						s: '1.00',
						l: '0.10',
						a: ' 0.953',
					},
				],
				onWcag: '#ffffff',
			},
			{
				name: 'Purple',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#18111b',
					},
					{
						step: 2,
						value: '#1e1523',
					},
					{
						step: 3,
						value: '#301c3b',
					},
					{
						step: 4,
						value: '#3d224e',
					},
					{
						step: 5,
						value: '#48295c',
					},
					{
						step: 6,
						value: '#54346b',
					},
					{
						step: 7,
						value: '#664282',
					},
					{
						step: 8,
						value: '#8457aa',
					},
					{
						step: 9,
						value: '#8e4ec6',
					},
					{
						step: 10,
						value: '#9a5cd0',
					},
					{
						step: 11,
						value: '#d19dff',
					},
					{
						step: 12,
						value: '#ecd9fa',
					},
				],
				light: [
					{
						step: 1,
						value: '#fefcfe',
					},
					{
						step: 2,
						value: '#fbf7fe',
					},
					{
						step: 3,
						value: '#f7edfe',
					},
					{
						step: 4,
						value: '#f2e2fc',
					},
					{
						step: 5,
						value: '#ead5f9',
					},
					{
						step: 6,
						value: '#e0c4f4',
					},
					{
						step: 7,
						value: '#d1afec',
					},
					{
						step: 8,
						value: '#be93e4',
					},
					{
						step: 9,
						value: '#8e4ec6',
					},
					{
						step: 10,
						value: '#8347b9',
					},
					{
						step: 11,
						value: '#8145b5',
					},
					{
						step: 12,
						value: '#402060',
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
						value: 'hsla(280, 96.5%, 57.5%, 0.045)',
						step: 2,
						h: '280',
						s: '0.96',
						l: '0.57',
						a: ' 0.045',
					},
					{
						value: 'hsla(279, 98.7%, 62.8%, 0.129)',
						step: 3,
						h: '279',
						s: '0.99',
						l: '0.63',
						a: ' 0.129',
					},
					{
						value: 'hsla(279, 99.1%, 64.0%, 0.191)',
						step: 4,
						h: '279',
						s: '0.99',
						l: '0.64',
						a: ' 0.191',
					},
					{
						value: 'hsla(278, 99.8%, 64.2%, 0.248)',
						step: 5,
						h: '278',
						s: '1.00',
						l: '0.64',
						a: ' 0.248',
					},
					{
						value: 'hsla(276, 99.6%, 64.6%, 0.328)',
						step: 6,
						h: '276',
						s: '1.00',
						l: '0.65',
						a: ' 0.328',
					},
					{
						value: 'hsla(274, 99.9%, 64.6%, 0.456)',
						step: 7,
						h: '274',
						s: '1.00',
						l: '0.65',
						a: ' 0.456',
					},
					{
						value: 'hsla(272, 99.7%, 64.6%, 0.660)',
						step: 8,
						h: '272',
						s: '1.00',
						l: '0.65',
						a: ' 0.660',
					},
					{
						value: 'hsla(272, 99.9%, 69.1%, 0.748)',
						step: 9,
						h: '272',
						s: '1.00',
						l: '0.69',
						a: ' 0.748',
					},
					{
						value: 'hsla(273, 100%, 71.3%, 0.801)',
						step: 10,
						h: '273',
						s: '1.00',
						l: '0.71',
						a: ' 0.801',
					},
					{
						value: 'hsla(275, 99.9%, 75.3%, 0.934)',
						step: 11,
						h: '275',
						s: '1.00',
						l: '0.75',
						a: ' 0.934',
					},
					{
						value: 'hsla(286, 100%, 97.1%, 0.980)',
						step: 12,
						h: '286',
						s: '1.00',
						l: '0.97',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(300, 94.3%, 34.6%, 0.012)',
						step: 1,
						h: '300',
						s: '0.94',
						l: '0.35',
						a: ' 0.012',
					},
					{
						value: 'hsla(276, 100%, 51.0%, 0.020)',
						step: 2,
						h: '276',
						s: '1.00',
						l: '0.51',
						a: ' 0.020',
					},
					{
						value: 'hsla(277, 99.6%, 46.5%, 0.055)',
						step: 3,
						h: '277',
						s: '1.00',
						l: '0.47',
						a: ' 0.055',
					},
					{
						value: 'hsla(274, 97.9%, 44.3%, 0.095)',
						step: 4,
						h: '274',
						s: '0.98',
						l: '0.44',
						a: ' 0.095',
					},
					{
						value: 'hsla(276, 98.6%, 42.0%, 0.142)',
						step: 5,
						h: '276',
						s: '0.99',
						l: '0.42',
						a: ' 0.142',
					},
					{
						value: 'hsla(275, 100%, 39.2%, 0.200)',
						step: 6,
						h: '275',
						s: '1.00',
						l: '0.39',
						a: ' 0.200',
					},
					{
						value: 'hsla(273, 99.2%, 38.2%, 0.295)',
						step: 7,
						h: '273',
						s: '0.99',
						l: '0.38',
						a: ' 0.295',
					},
					{
						value: 'hsla(272, 99.7%, 37.6%, 0.424)',
						step: 8,
						h: '272',
						s: '1.00',
						l: '0.38',
						a: ' 0.424',
					},
					{
						value: 'hsla(272, 99.6%, 34.0%, 0.695)',
						step: 9,
						h: '272',
						s: '1.00',
						l: '0.34',
						a: ' 0.695',
					},
					{
						value: 'hsla(272, 99.7%, 32.0%, 0.730)',
						step: 10,
						h: '272',
						s: '1.00',
						l: '0.32',
						a: ' 0.730',
					},
					{
						value: 'hsla(272, 99.8%, 29.7%, 0.773)',
						step: 11,
						h: '272',
						s: '1.00',
						l: '0.30',
						a: ' 0.773',
					},
					{
						value: 'hsla(272, 99.2%, 11.3%, 0.946)',
						step: 12,
						h: '272',
						s: '0.99',
						l: '0.11',
						a: ' 0.946',
					},
				],
				onWcag: '#ffffff',
			},
			{
				name: 'Violet',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#14121f',
					},
					{
						step: 2,
						value: '#1b1525',
					},
					{
						step: 3,
						value: '#291f43',
					},
					{
						step: 4,
						value: '#33255b',
					},
					{
						step: 5,
						value: '#3c2e69',
					},
					{
						step: 6,
						value: '#473876',
					},
					{
						step: 7,
						value: '#56468b',
					},
					{
						step: 8,
						value: '#6958ad',
					},
					{
						step: 9,
						value: '#6e56cf',
					},
					{
						step: 10,
						value: '#7d66d9',
					},
					{
						step: 11,
						value: '#baa7ff',
					},
					{
						step: 12,
						value: '#e2ddfe',
					},
				],
				light: [
					{
						step: 1,
						value: '#fdfcfe',
					},
					{
						step: 2,
						value: '#faf8ff',
					},
					{
						step: 3,
						value: '#f4f0fe',
					},
					{
						step: 4,
						value: '#ebe4ff',
					},
					{
						step: 5,
						value: '#e1d9ff',
					},
					{
						step: 6,
						value: '#d4cafe',
					},
					{
						step: 7,
						value: '#c2b5f5',
					},
					{
						step: 8,
						value: '#aa99ec',
					},
					{
						step: 9,
						value: '#6e56cf',
					},
					{
						step: 10,
						value: '#654dc4',
					},
					{
						step: 11,
						value: '#6550b9',
					},
					{
						step: 12,
						value: '#2f265f',
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
						value: 'hsla(258, 98.2%, 61.0%, 0.054)',
						step: 2,
						h: '258',
						s: '0.98',
						l: '0.61',
						a: ' 0.054',
					},
					{
						value: 'hsla(252, 98.8%, 65.8%, 0.148)',
						step: 3,
						h: '252',
						s: '0.99',
						l: '0.66',
						a: ' 0.148',
					},
					{
						value: 'hsla(253, 99.7%, 65.7%, 0.219)',
						step: 4,
						h: '253',
						s: '1.00',
						l: '0.66',
						a: ' 0.219',
					},
					{
						value: 'hsla(252, 99.7%, 66.4%, 0.286)',
						step: 5,
						h: '252',
						s: '1.00',
						l: '0.66',
						a: ' 0.286',
					},
					{
						value: 'hsla(251, 99.7%, 66.2%, 0.371)',
						step: 6,
						h: '251',
						s: '1.00',
						l: '0.66',
						a: ' 0.371',
					},
					{
						value: 'hsla(250, 99.7%, 66.3%, 0.514)',
						step: 7,
						h: '250',
						s: '1.00',
						l: '0.66',
						a: ' 0.514',
					},
					{
						value: 'hsla(250, 99.7%, 66.1%, 0.733)',
						step: 8,
						h: '250',
						s: '1.00',
						l: '0.66',
						a: ' 0.733',
					},
					{
						value: 'hsla(252, 99.9%, 70.3%, 0.786)',
						step: 9,
						h: '252',
						s: '1.00',
						l: '0.70',
						a: ' 0.786',
					},
					{
						value: 'hsla(251, 99.9%, 72.9%, 0.844)',
						step: 10,
						h: '251',
						s: '1.00',
						l: '0.73',
						a: ' 0.844',
					},
					{
						value: 'hsla(250, 100%, 77.9%, 0.980)',
						step: 11,
						h: '250',
						s: '1.00',
						l: '0.78',
						a: ' 0.980',
					},
					{
						value: 'hsla(254, 100%, 97.5%, 0.980)',
						step: 12,
						h: '254',
						s: '1.00',
						l: '0.97',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(270, 94.3%, 34.6%, 0.012)',
						step: 1,
						h: '270',
						s: '0.94',
						l: '0.35',
						a: ' 0.012',
					},
					{
						value: 'hsla(252, 100%, 51.0%, 0.020)',
						step: 2,
						h: '252',
						s: '1.00',
						l: '0.51',
						a: ' 0.020',
					},
					{
						value: 'hsla(254, 100%, 50.0%, 0.051)',
						step: 3,
						h: '254',
						s: '1.00',
						l: '0.50',
						a: ' 0.051',
					},
					{
						value: 'hsla(251, 98.3%, 48.2%, 0.087)',
						step: 4,
						h: '251',
						s: '0.98',
						l: '0.48',
						a: ' 0.087',
					},
					{
						value: 'hsla(252, 99.0%, 45.7%, 0.130)',
						step: 5,
						h: '252',
						s: '0.99',
						l: '0.46',
						a: ' 0.130',
					},
					{
						value: 'hsla(251, 99.1%, 44.0%, 0.189)',
						step: 6,
						h: '251',
						s: '0.99',
						l: '0.44',
						a: ' 0.189',
					},
					{
						value: 'hsla(252, 99.5%, 41.7%, 0.279)',
						step: 7,
						h: '252',
						s: '0.99',
						l: '0.42',
						a: ' 0.279',
					},
					{
						value: 'hsla(252, 100%, 40.7%, 0.400)',
						step: 8,
						h: '252',
						s: '1.00',
						l: '0.41',
						a: ' 0.400',
					},
					{
						value: 'hsla(252, 99.9%, 35.8%, 0.663)',
						step: 9,
						h: '252',
						s: '1.00',
						l: '0.36',
						a: ' 0.663',
					},
					{
						value: 'hsla(251, 99.6%, 32.5%, 0.691)',
						step: 10,
						h: '251',
						s: '1.00',
						l: '0.33',
						a: ' 0.691',
					},
					{
						value: 'hsla(250, 99.8%, 28.4%, 0.726)',
						step: 11,
						h: '250',
						s: '1.00',
						l: '0.28',
						a: ' 0.726',
					},
					{
						value: 'hsla(254, 99.5%, 11.9%, 0.926)',
						step: 12,
						h: '254',
						s: '0.99',
						l: '0.12',
						a: ' 0.926',
					},
				],
				onWcag: '#ffffff',
			},
			{
				name: 'Iris',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#13131e',
					},
					{
						step: 2,
						value: '#171625',
					},
					{
						step: 3,
						value: '#202248',
					},
					{
						step: 4,
						value: '#262a65',
					},
					{
						step: 5,
						value: '#303374',
					},
					{
						step: 6,
						value: '#3d3e82',
					},
					{
						step: 7,
						value: '#4a4a95',
					},
					{
						step: 8,
						value: '#5958b1',
					},
					{
						step: 9,
						value: '#5b5bd6',
					},
					{
						step: 10,
						value: '#6e6ade',
					},
					{
						step: 11,
						value: '#b1a9ff',
					},
					{
						step: 12,
						value: '#e0dffe',
					},
				],
				light: [
					{
						step: 1,
						value: '#fdfdff',
					},
					{
						step: 2,
						value: '#f8f8ff',
					},
					{
						step: 3,
						value: '#f0f1fe',
					},
					{
						step: 4,
						value: '#e6e7ff',
					},
					{
						step: 5,
						value: '#dadcff',
					},
					{
						step: 6,
						value: '#cbcdff',
					},
					{
						step: 7,
						value: '#b8baf8',
					},
					{
						step: 8,
						value: '#9b9ef0',
					},
					{
						step: 9,
						value: '#5b5bd6',
					},
					{
						step: 10,
						value: '#5151cd',
					},
					{
						step: 11,
						value: '#5753c6',
					},
					{
						step: 12,
						value: '#272962',
					},
				],
				darkAlpha: [
					{
						value: 'hsla(240,99.01%,60.39%,0.05)',
						step: 1,
						h: '240',
						s: '0.99',
						l: '0.60',
						a: '0.05',
					},
					{
						value: 'hsla(243.79,93.55%,63.53%,0.09)',
						step: 2,
						h: '243.79',
						s: '0.94',
						l: '0.64',
						a: '0.09',
					},
					{
						value: 'hsla(236.88,100%,66.08%,0.23)',
						step: 3,
						h: '236.88',
						s: '1.00',
						l: '0.66',
						a: '0.23',
					},
					{
						value: 'hsla(236.29,100%,65.1%,0.35)',
						step: 4,
						h: '236.29',
						s: '1.00',
						l: '0.65',
						a: '0.35',
					},
					{
						value: 'hsla(237.41,97.59%,67.45%,0.42)',
						step: 5,
						h: '237.41',
						s: '0.98',
						l: '0.67',
						a: '0.42',
					},
					{
						value: 'hsla(239.17,97.3%,70.98%,0.48)',
						step: 6,
						h: '239.17',
						s: '0.97',
						l: '0.71',
						a: '0.48',
					},
					{
						value: 'hsla(240,98.54%,73.14%,0.56)',
						step: 7,
						h: '240',
						s: '0.99',
						l: '0.73',
						a: '0.56',
					},
					{
						value: 'hsla(240.45,98.51%,73.73%,0.67)',
						step: 8,
						h: '240.45',
						s: '0.99',
						l: '0.74',
						a: '0.67',
					},
					{
						value: 'hsla(240,98.67%,70.59%,0.83)',
						step: 9,
						h: '240',
						s: '0.99',
						l: '0.71',
						a: '0.83',
					},
					{
						value: 'hsla(241.79,100%,73.73%,0.86)',
						step: 10,
						h: '241.79',
						s: '1.00',
						l: '0.74',
						a: '0.86',
					},
					{
						value: 'hsla(245.58,100%,83.14%,1)',
						step: 11,
						h: '245.58',
						s: '1.00',
						l: '0.83',
						a: '1',
					},
					{
						value: 'hsla(241.94,100%,93.92%,1)',
						step: 12,
						h: '241.94',
						s: '1.00',
						l: '0.94',
						a: '1',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(240,100%,50%,0.01)',
						step: 1,
						h: '240',
						s: '1.00',
						l: '0.50',
						a: '0.01',
					},
					{
						value: 'hsla(240,100%,50%,0.03)',
						step: 2,
						h: '240',
						s: '1.00',
						l: '0.50',
						a: '0.03',
					},
					{
						value: 'hsla(235.71,100%,46.67%,0.06)',
						step: 3,
						h: '235.71',
						s: '1.00',
						l: '0.47',
						a: '0.06',
					},
					{
						value: 'hsla(237.41,100%,50%,0.1)',
						step: 4,
						h: '237.41',
						s: '1.00',
						l: '0.50',
						a: '0.1',
					},
					{
						value: 'hsla(236.71,100%,50%,0.15)',
						step: 5,
						h: '236.71',
						s: '1.00',
						l: '0.50',
						a: '0.15',
					},
					{
						value: 'hsla(237.65,100%,50%,0.2)',
						step: 6,
						h: '237.65',
						s: '1.00',
						l: '0.50',
						a: '0.2',
					},
					{
						value: 'hsla(237.91,100%,45.1%,0.28)',
						step: 7,
						h: '237.91',
						s: '1.00',
						l: '0.45',
						a: '0.28',
					},
					{
						value: 'hsla(237.79,100%,42.55%,0.39)',
						step: 8,
						h: '237.79',
						s: '1.00',
						l: '0.43',
						a: '0.39',
					},
					{
						value: 'hsla(240,100%,37.65%,0.64)',
						step: 9,
						h: '240',
						s: '1.00',
						l: '0.38',
						a: '0.64',
					},
					{
						value: 'hsla(240,100%,35.69%,0.68)',
						step: 10,
						h: '240',
						s: '1.00',
						l: '0.36',
						a: '0.68',
					},
					{
						value: 'hsla(242.11,100%,33.53%,0.67)',
						step: 11,
						h: '242.11',
						s: '1.00',
						l: '0.34',
						a: '0.67',
					},
					{
						value: 'hsla(238.29,100%,13.73%,0.85)',
						step: 12,
						h: '238.29',
						s: '1.00',
						l: '0.14',
						a: '0.85',
					},
				],
				onWcag: '#ffffff',
			},
			{
				name: 'Indigo',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#11131f',
					},
					{
						step: 2,
						value: '#141726',
					},
					{
						step: 3,
						value: '#182449',
					},
					{
						step: 4,
						value: '#1d2e62',
					},
					{
						step: 5,
						value: '#253974',
					},
					{
						step: 6,
						value: '#304384',
					},
					{
						step: 7,
						value: '#3a4f97',
					},
					{
						step: 8,
						value: '#435db1',
					},
					{
						step: 9,
						value: '#3e63dd',
					},
					{
						step: 10,
						value: '#5472e4',
					},
					{
						step: 11,
						value: '#9eb1ff',
					},
					{
						step: 12,
						value: '#d6e1ff',
					},
				],
				light: [
					{
						step: 1,
						value: '#fdfdfe',
					},
					{
						step: 2,
						value: '#f7f9ff',
					},
					{
						step: 3,
						value: '#edf2fe',
					},
					{
						step: 4,
						value: '#e1e9ff',
					},
					{
						step: 5,
						value: '#d2deff',
					},
					{
						step: 6,
						value: '#c1d0ff',
					},
					{
						step: 7,
						value: '#abbdf9',
					},
					{
						step: 8,
						value: '#8da4ef',
					},
					{
						step: 9,
						value: '#3e63dd',
					},
					{
						step: 10,
						value: '#3358d4',
					},
					{
						step: 11,
						value: '#3a5bc7',
					},
					{
						step: 12,
						value: '#1f2d5c',
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
						value: 'hsla(234, 97.4%, 59.9%, 0.059)',
						step: 2,
						h: '234',
						s: '0.97',
						l: '0.60',
						a: ' 0.059',
					},
					{
						value: 'hsla(228, 99.2%, 61.7%, 0.144)',
						step: 3,
						h: '228',
						s: '0.99',
						l: '0.62',
						a: ' 0.144',
					},
					{
						value: 'hsla(227, 99.7%, 62.0%, 0.211)',
						step: 4,
						h: '227',
						s: '1.00',
						l: '0.62',
						a: ' 0.211',
					},
					{
						value: 'hsla(227, 99.2%, 62.3%, 0.270)',
						step: 5,
						h: '227',
						s: '0.99',
						l: '0.62',
						a: ' 0.270',
					},
					{
						value: 'hsla(226, 99.9%, 62.1%, 0.350)',
						step: 6,
						h: '226',
						s: '1.00',
						l: '0.62',
						a: ' 0.350',
					},
					{
						value: 'hsla(226, 99.9%, 62.0%, 0.471)',
						step: 7,
						h: '226',
						s: '1.00',
						l: '0.62',
						a: ' 0.471',
					},
					{
						value: 'hsla(226, 99.9%, 62.1%, 0.655)',
						step: 8,
						h: '226',
						s: '1.00',
						l: '0.62',
						a: ' 0.655',
					},
					{
						value: 'hsla(226, 99.9%, 63.6%, 0.848)',
						step: 9,
						h: '226',
						s: '1.00',
						l: '0.64',
						a: ' 0.848',
					},
					{
						value: 'hsla(227, 99.8%, 67.7%, 0.893)',
						step: 10,
						h: '227',
						s: '1.00',
						l: '0.68',
						a: ' 0.893',
					},
					{
						value: 'hsla(227, 100%, 76.3%, 0.980)',
						step: 11,
						h: '227',
						s: '1.00',
						l: '0.76',
						a: ' 0.980',
					},
					{
						value: 'hsla(226, 100%, 97.5%, 0.980)',
						step: 12,
						h: '226',
						s: '1.00',
						l: '0.97',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(240, 92.6%, 26.5%, 0.008)',
						step: 1,
						h: '240',
						s: '0.93',
						l: '0.27',
						a: ' 0.008',
					},
					{
						value: 'hsla(223, 100%, 51.0%, 0.028)',
						step: 2,
						h: '223',
						s: '1.00',
						l: '0.51',
						a: ' 0.028',
					},
					{
						value: 'hsla(224, 100%, 50.1%, 0.059)',
						step: 3,
						h: '224',
						s: '1.00',
						l: '0.50',
						a: ' 0.059',
					},
					{
						value: 'hsla(223, 98.0%, 48.5%, 0.099)',
						step: 4,
						h: '223',
						s: '0.98',
						l: '0.48',
						a: ' 0.099',
					},
					{
						value: 'hsla(225, 98.6%, 46.4%, 0.150)',
						step: 5,
						h: '225',
						s: '0.99',
						l: '0.46',
						a: ' 0.150',
					},
					{
						value: 'hsla(224, 99.5%, 44.9%, 0.224)',
						step: 6,
						h: '224',
						s: '0.99',
						l: '0.45',
						a: ' 0.224',
					},
					{
						value: 'hsla(225, 99.7%, 43.9%, 0.318)',
						step: 7,
						h: '225',
						s: '1.00',
						l: '0.44',
						a: ' 0.318',
					},
					{
						value: 'hsla(226, 99.5%, 43.1%, 0.448)',
						step: 8,
						h: '226',
						s: '0.99',
						l: '0.43',
						a: ' 0.448',
					},
					{
						value: 'hsla(226, 100%, 41.2%, 0.757)',
						step: 9,
						h: '226',
						s: '1.00',
						l: '0.41',
						a: ' 0.757',
					},
					{
						value: 'hsla(226, 99.8%, 37.1%, 0.773)',
						step: 10,
						h: '226',
						s: '1.00',
						l: '0.37',
						a: ' 0.773',
					},
					{
						value: 'hsla(226, 99.6%, 31.1%, 0.797)',
						step: 11,
						h: '226',
						s: '1.00',
						l: '0.31',
						a: ' 0.797',
					},
					{
						value: 'hsla(226, 99.3%, 11.4%, 0.938)',
						step: 12,
						h: '226',
						s: '0.99',
						l: '0.11',
						a: ' 0.938',
					},
				],
				onWcag: '#ffffff',
			},
			{
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
			{
				name: 'Cyan',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#0b161a',
					},
					{
						step: 2,
						value: '#101b20',
					},
					{
						step: 3,
						value: '#082c36',
					},
					{
						step: 4,
						value: '#003848',
					},
					{
						step: 5,
						value: '#004558',
					},
					{
						step: 6,
						value: '#045468',
					},
					{
						step: 7,
						value: '#12677e',
					},
					{
						step: 8,
						value: '#11809c',
					},
					{
						step: 9,
						value: '#00a2c7',
					},
					{
						step: 10,
						value: '#23afd0',
					},
					{
						step: 11,
						value: '#4ccce6',
					},
					{
						step: 12,
						value: '#b6ecf7',
					},
				],
				light: [
					{
						step: 1,
						value: '#fafdfe',
					},
					{
						step: 2,
						value: '#f2fafb',
					},
					{
						step: 3,
						value: '#def7f9',
					},
					{
						step: 4,
						value: '#caf1f6',
					},
					{
						step: 5,
						value: '#b5e9f0',
					},
					{
						step: 6,
						value: '#9ddde7',
					},
					{
						step: 7,
						value: '#7dcedc',
					},
					{
						step: 8,
						value: '#3db9cf',
					},
					{
						step: 9,
						value: '#00a2c7',
					},
					{
						step: 10,
						value: '#0797b9',
					},
					{
						step: 11,
						value: '#107d98',
					},
					{
						step: 12,
						value: '#0d3c48',
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
						value: 'hsla(196, 100%, 50.0%, 0.031)',
						step: 2,
						h: '196',
						s: '1.00',
						l: '0.50',
						a: ' 0.031',
					},
					{
						value: 'hsla(192, 98.0%, 50.9%, 0.085)',
						step: 3,
						h: '192',
						s: '0.98',
						l: '0.51',
						a: ' 0.085',
					},
					{
						value: 'hsla(194, 99.6%, 51.3%, 0.133)',
						step: 4,
						h: '194',
						s: '1.00',
						l: '0.51',
						a: ' 0.133',
					},
					{
						value: 'hsla(192, 99.5%, 51.3%, 0.173)',
						step: 5,
						h: '192',
						s: '0.99',
						l: '0.51',
						a: ' 0.173',
					},
					{
						value: 'hsla(193, 99.7%, 50.4%, 0.226)',
						step: 6,
						h: '193',
						s: '1.00',
						l: '0.50',
						a: ' 0.226',
					},
					{
						value: 'hsla(192, 100%, 50.0%, 0.310)',
						step: 7,
						h: '192',
						s: '1.00',
						l: '0.50',
						a: ' 0.310',
					},
					{
						value: 'hsla(193, 100%, 50.0%, 0.425)',
						step: 8,
						h: '193',
						s: '1.00',
						l: '0.50',
						a: ' 0.425',
					},
					{
						value: 'hsla(190, 99.8%, 50.8%, 0.731)',
						step: 9,
						h: '190',
						s: '1.00',
						l: '0.51',
						a: ' 0.731',
					},
					{
						value: 'hsla(188, 100%, 50.0%, 0.775)',
						step: 10,
						h: '188',
						s: '1.00',
						l: '0.50',
						a: ' 0.775',
					},
					{
						value: 'hsla(186, 100%, 49.9%, 0.824)',
						step: 11,
						h: '186',
						s: '1.00',
						l: '0.50',
						a: ' 0.824',
					},
					{
						value: 'hsla(185, 99.8%, 95.1%, 0.978)',
						step: 12,
						h: '185',
						s: '1.00',
						l: '0.95',
						a: ' 0.978',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(195, 95.2%, 41.2%, 0.020)',
						step: 1,
						h: '195',
						s: '0.95',
						l: '0.41',
						a: ' 0.020',
					},
					{
						value: 'hsla(185, 99.9%, 42.3%, 0.051)',
						step: 2,
						h: '185',
						s: '1.00',
						l: '0.42',
						a: ' 0.051',
					},
					{
						value: 'hsla(186, 97.8%, 42.2%, 0.095)',
						step: 3,
						h: '186',
						s: '0.98',
						l: '0.42',
						a: ' 0.095',
					},
					{
						value: 'hsla(186, 99.9%, 38.5%, 0.153)',
						step: 4,
						h: '186',
						s: '1.00',
						l: '0.39',
						a: ' 0.153',
					},
					{
						value: 'hsla(187, 99.3%, 36.6%, 0.232)',
						step: 5,
						h: '187',
						s: '0.99',
						l: '0.37',
						a: ' 0.232',
					},
					{
						value: 'hsla(188, 99.4%, 35.4%, 0.334)',
						step: 6,
						h: '188',
						s: '0.99',
						l: '0.35',
						a: ' 0.334',
					},
					{
						value: 'hsla(189, 99.6%, 35.0%, 0.483)',
						step: 7,
						h: '189',
						s: '1.00',
						l: '0.35',
						a: ' 0.483',
					},
					{
						value: 'hsla(189, 99.9%, 37.6%, 0.761)',
						step: 8,
						h: '189',
						s: '1.00',
						l: '0.38',
						a: ' 0.761',
					},
					{
						value: 'hsla(190, 100%, 37.8%, 0.980)',
						step: 9,
						h: '190',
						s: '1.00',
						l: '0.38',
						a: ' 0.980',
					},
					{
						value: 'hsla(191, 99.9%, 34.6%, 0.969)',
						step: 10,
						h: '191',
						s: '1.00',
						l: '0.35',
						a: ' 0.969',
					},
					{
						value: 'hsla(192, 100%, 27.6%, 0.953)',
						step: 11,
						h: '192',
						s: '1.00',
						l: '0.28',
						a: ' 0.953',
					},
					{
						value: 'hsla(192, 100%, 11.0%, 0.980)',
						step: 12,
						h: '192',
						s: '1.00',
						l: '0.11',
						a: ' 0.980',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Teal',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#0d1514',
					},
					{
						step: 2,
						value: '#111c1b',
					},
					{
						step: 3,
						value: '#0d2d2a',
					},
					{
						step: 4,
						value: '#023b37',
					},
					{
						step: 5,
						value: '#084843',
					},
					{
						step: 6,
						value: '#145750',
					},
					{
						step: 7,
						value: '#1c6961',
					},
					{
						step: 8,
						value: '#207e73',
					},
					{
						step: 9,
						value: '#12a594',
					},
					{
						step: 10,
						value: '#0eb39e',
					},
					{
						step: 11,
						value: '#0bd8b6',
					},
					{
						step: 12,
						value: '#adf0dd',
					},
				],
				light: [
					{
						step: 1,
						value: '#fafefd',
					},
					{
						step: 2,
						value: '#f3fbf9',
					},
					{
						step: 3,
						value: '#e0f8f3',
					},
					{
						step: 4,
						value: '#ccf3ea',
					},
					{
						step: 5,
						value: '#b8eae0',
					},
					{
						step: 6,
						value: '#a1ded2',
					},
					{
						step: 7,
						value: '#83cdc1',
					},
					{
						step: 8,
						value: '#53b9ab',
					},
					{
						step: 9,
						value: '#12a594',
					},
					{
						step: 10,
						value: '#0d9b8a',
					},
					{
						step: 11,
						value: '#008573',
					},
					{
						step: 12,
						value: '#0d3d38',
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
						value: 'hsla(171, 100%, 49.2%, 0.031)',
						step: 2,
						h: '171',
						s: '1.00',
						l: '0.49',
						a: ' 0.031',
					},
					{
						value: 'hsla(172, 100%, 49.7%, 0.070)',
						step: 3,
						h: '172',
						s: '1.00',
						l: '0.50',
						a: ' 0.070',
					},
					{
						value: 'hsla(175, 100%, 49.7%, 0.105)',
						step: 4,
						h: '175',
						s: '1.00',
						l: '0.50',
						a: ' 0.105',
					},
					{
						value: 'hsla(174, 98.9%, 50.1%, 0.140)',
						step: 5,
						h: '174',
						s: '0.99',
						l: '0.50',
						a: ' 0.140',
					},
					{
						value: 'hsla(174, 100%, 51.8%, 0.187)',
						step: 6,
						h: '174',
						s: '1.00',
						l: '0.52',
						a: ' 0.187',
					},
					{
						value: 'hsla(173, 99.6%, 53.2%, 0.257)',
						step: 7,
						h: '173',
						s: '1.00',
						l: '0.53',
						a: ' 0.257',
					},
					{
						value: 'hsla(174, 99.6%, 53.3%, 0.366)',
						step: 8,
						h: '174',
						s: '1.00',
						l: '0.53',
						a: ' 0.366',
					},
					{
						value: 'hsla(173, 99.9%, 54.6%, 0.609)',
						step: 9,
						h: '173',
						s: '1.00',
						l: '0.55',
						a: ' 0.609',
					},
					{
						value: 'hsla(174, 99.9%, 53.8%, 0.670)',
						step: 10,
						h: '174',
						s: '1.00',
						l: '0.54',
						a: ' 0.670',
					},
					{
						value: 'hsla(174, 100%, 52.0%, 0.748)',
						step: 11,
						h: '174',
						s: '1.00',
						l: '0.52',
						a: ' 0.748',
					},
					{
						value: 'hsla(166, 98.6%, 95.0%, 0.979)',
						step: 12,
						h: '166',
						s: '0.99',
						l: '0.95',
						a: ' 0.979',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(165, 95.2%, 41.2%, 0.020)',
						step: 1,
						h: '165',
						s: '0.95',
						l: '0.41',
						a: ' 0.020',
					},
					{
						value: 'hsla(169, 99.5%, 39.4%, 0.055)',
						step: 2,
						h: '169',
						s: '0.99',
						l: '0.39',
						a: ' 0.055',
					},
					{
						value: 'hsla(167, 97.6%, 38.1%, 0.095)',
						step: 3,
						h: '167',
						s: '0.98',
						l: '0.38',
						a: ' 0.095',
					},
					{
						value: 'hsla(168, 98.1%, 34.6%, 0.150)',
						step: 4,
						h: '168',
						s: '0.98',
						l: '0.35',
						a: ' 0.150',
					},
					{
						value: 'hsla(170, 99.4%, 32.3%, 0.220)',
						step: 5,
						h: '170',
						s: '0.99',
						l: '0.32',
						a: ' 0.220',
					},
					{
						value: 'hsla(170, 99.7%, 30.1%, 0.314)',
						step: 6,
						h: '170',
						s: '1.00',
						l: '0.30',
						a: ' 0.314',
					},
					{
						value: 'hsla(170, 99.3%, 28.7%, 0.448)',
						step: 7,
						h: '170',
						s: '0.99',
						l: '0.29',
						a: ' 0.448',
					},
					{
						value: 'hsla(172, 99.8%, 29.7%, 0.675)',
						step: 8,
						h: '172',
						s: '1.00',
						l: '0.30',
						a: ' 0.675',
					},
					{
						value: 'hsla(173, 99.8%, 31.1%, 0.930)',
						step: 9,
						h: '173',
						s: '1.00',
						l: '0.31',
						a: ' 0.930',
					},
					{
						value: 'hsla(173, 99.7%, 28.7%, 0.946)',
						step: 10,
						h: '173',
						s: '1.00',
						l: '0.29',
						a: ' 0.946',
					},
					{
						value: 'hsla(174, 99.8%, 23.3%, 0.977)',
						step: 11,
						h: '174',
						s: '1.00',
						l: '0.23',
						a: ' 0.977',
					},
					{
						value: 'hsla(171, 98.8%, 6.8%, 0.938)',
						step: 12,
						h: '171',
						s: '0.99',
						l: '0.07',
						a: ' 0.938',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Jade',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#0d1512',
					},
					{
						step: 2,
						value: '#121c18',
					},
					{
						step: 3,
						value: '#0f2e22',
					},
					{
						step: 4,
						value: '#0b3b2c',
					},
					{
						step: 5,
						value: '#114837',
					},
					{
						step: 6,
						value: '#1b5745',
					},
					{
						step: 7,
						value: '#246854',
					},
					{
						step: 8,
						value: '#2a7e68',
					},
					{
						step: 9,
						value: '#29a383',
					},
					{
						step: 10,
						value: '#27b08b',
					},
					{
						step: 11,
						value: '#1fd8a4',
					},
					{
						step: 12,
						value: '#adf0d4',
					},
				],
				light: [
					{
						step: 1,
						value: '#fbfefd',
					},
					{
						step: 2,
						value: '#f4fbf7',
					},
					{
						step: 3,
						value: '#e6f7ed',
					},
					{
						step: 4,
						value: '#d6f1e3',
					},
					{
						step: 5,
						value: '#c3e9d7',
					},
					{
						step: 6,
						value: '#acdec8',
					},
					{
						step: 7,
						value: '#8bceb6',
					},
					{
						step: 8,
						value: '#56ba9f',
					},
					{
						step: 9,
						value: '#29a383',
					},
					{
						step: 10,
						value: '#26997b',
					},
					{
						step: 11,
						value: '#208368',
					},
					{
						step: 12,
						value: '#1d3b31',
					},
				],
				darkAlpha: [
					{
						value: 'hsla(138.65,100%,43.53%,0.02)',
						step: 1,
						h: '138.65',
						s: '1.00',
						l: '0.44',
						a: '0.02',
					},
					{
						value: 'hsla(155.94,96.36%,56.86%,0.05)',
						step: 2,
						h: '155.94',
						s: '0.96',
						l: '0.57',
						a: '0.05',
					},
					{
						value: 'hsla(156.68,98.41%,49.22%,0.13)',
						step: 3,
						h: '156.68',
						s: '0.98',
						l: '0.49',
						a: '0.13',
					},
					{
						value: 'hsla(160,100%,50%,0.18)',
						step: 4,
						h: '160',
						s: '1.00',
						l: '0.50',
						a: '0.18',
					},
					{
						value: 'hsla(161.6,100%,53.33%,0.23)',
						step: 5,
						h: '161.6',
						s: '1.00',
						l: '0.53',
						a: '0.23',
					},
					{
						value: 'hsla(161.97,100%,60.2%,0.29)',
						step: 6,
						h: '161.97',
						s: '1.00',
						l: '0.60',
						a: '0.29',
					},
					{
						value: 'hsla(162.39,97.87%,63.14%,0.37)',
						step: 7,
						h: '162.39',
						s: '0.98',
						l: '0.63',
						a: '0.37',
					},
					{
						value: 'hsla(164.26,100%,64.12%,0.46)',
						step: 8,
						h: '164.26',
						s: '1.00',
						l: '0.64',
						a: '0.46',
					},
					{
						value: 'hsla(164.24,99%,60.78%,0.62)',
						step: 9,
						h: '164.24',
						s: '0.99',
						l: '0.61',
						a: '0.62',
					},
					{
						value: 'hsla(163.9,99.03%,59.41%,0.67)',
						step: 10,
						h: '163.9',
						s: '0.99',
						l: '0.59',
						a: '0.67',
					},
					{
						value: 'hsla(163.17,99.1%,56.27%,0.84)',
						step: 11,
						h: '163.17',
						s: '0.99',
						l: '0.56',
						a: '0.84',
					},
					{
						value: 'hsla(154.65,100%,86.08%,0.94)',
						step: 12,
						h: '154.65',
						s: '1.00',
						l: '0.86',
						a: '0.94',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(160,100%,37.65%,0.02)',
						step: 1,
						h: '160',
						s: '1.00',
						l: '0.38',
						a: '0.02',
					},
					{
						value: 'hsla(145.77,100%,31.96%,0.04)',
						step: 2,
						h: '145.77',
						s: '1.00',
						l: '0.32',
						a: '0.04',
					},
					{
						value: 'hsla(144.83,100%,34.12%,0.1)',
						step: 3,
						h: '144.83',
						s: '1.00',
						l: '0.34',
						a: '0.1',
					},
					{
						value: 'hsla(148.93,100%,32.94%,0.16)',
						step: 4,
						h: '148.93',
						s: '1.00',
						l: '0.33',
						a: '0.16',
					},
					{
						value: 'hsla(151.48,100%,31.76%,0.24)',
						step: 5,
						h: '151.48',
						s: '1.00',
						l: '0.32',
						a: '0.24',
					},
					{
						value: 'hsla(153.9,100%,30.2%,0.33)',
						step: 6,
						h: '153.9',
						s: '1.00',
						l: '0.30',
						a: '0.33',
					},
					{
						value: 'hsla(158.51,100%,29.02%,0.45)',
						step: 7,
						h: '158.51',
						s: '1.00',
						l: '0.29',
						a: '0.45',
					},
					{
						value: 'hsla(163.71,100%,29.61%,0.66)',
						step: 8,
						h: '163.71',
						s: '1.00',
						l: '0.30',
						a: '0.66',
					},
					{
						value: 'hsla(164.28,100%,28.43%,0.84)',
						step: 9,
						h: '164.28',
						s: '1.00',
						l: '0.28',
						a: '0.84',
					},
					{
						value: 'hsla(164.44,100%,26.47%,0.85)',
						step: 10,
						h: '164.44',
						s: '1.00',
						l: '0.26',
						a: '0.85',
					},
					{
						value: 'hsla(163.54,100%,22.16%,0.87)',
						step: 11,
						h: '163.54',
						s: '1.00',
						l: '0.22',
						a: '0.87',
					},
					{
						value: 'hsla(160.59,100%,6.67%,0.89)',
						step: 12,
						h: '160.59',
						s: '1.00',
						l: '0.07',
						a: '0.89',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Green',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#0e1512',
					},
					{
						step: 2,
						value: '#121b17',
					},
					{
						step: 3,
						value: '#132d21',
					},
					{
						step: 4,
						value: '#113b29',
					},
					{
						step: 5,
						value: '#174933',
					},
					{
						step: 6,
						value: '#20573e',
					},
					{
						step: 7,
						value: '#28684a',
					},
					{
						step: 8,
						value: '#2f7c57',
					},
					{
						step: 9,
						value: '#30a46c',
					},
					{
						step: 10,
						value: '#33b074',
					},
					{
						step: 11,
						value: '#3dd68c',
					},
					{
						step: 12,
						value: '#b1f1cb',
					},
				],
				light: [
					{
						step: 1,
						value: '#fbfefc',
					},
					{
						step: 2,
						value: '#f4fbf6',
					},
					{
						step: 3,
						value: '#e6f6eb',
					},
					{
						step: 4,
						value: '#d6f1df',
					},
					{
						step: 5,
						value: '#c4e8d1',
					},
					{
						step: 6,
						value: '#adddc0',
					},
					{
						step: 7,
						value: '#8eceaa',
					},
					{
						step: 8,
						value: '#5bb98b',
					},
					{
						step: 9,
						value: '#30a46c',
					},
					{
						step: 10,
						value: '#2b9a66',
					},
					{
						step: 11,
						value: '#218358',
					},
					{
						step: 12,
						value: '#193b2d',
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
						value: 'hsla(169, 100%, 48.5%, 0.027)',
						step: 2,
						h: '169',
						s: '1.00',
						l: '0.48',
						a: ' 0.027',
					},
					{
						value: 'hsla(162, 98.7%, 57.9%, 0.070)',
						step: 3,
						h: '162',
						s: '0.99',
						l: '0.58',
						a: ' 0.070',
					},
					{
						value: 'hsla(158, 98.6%, 59.7%, 0.105)',
						step: 4,
						h: '158',
						s: '0.99',
						l: '0.60',
						a: ' 0.105',
					},
					{
						value: 'hsla(158, 98.6%, 60.7%, 0.140)',
						step: 5,
						h: '158',
						s: '0.99',
						l: '0.61',
						a: ' 0.140',
					},
					{
						value: 'hsla(156, 99.9%, 62.0%, 0.187)',
						step: 6,
						h: '156',
						s: '1.00',
						l: '0.62',
						a: ' 0.187',
					},
					{
						value: 'hsla(154, 99.5%, 63.1%, 0.257)',
						step: 7,
						h: '154',
						s: '0.99',
						l: '0.63',
						a: ' 0.257',
					},
					{
						value: 'hsla(152, 99.7%, 64.2%, 0.370)',
						step: 8,
						h: '152',
						s: '1.00',
						l: '0.64',
						a: ' 0.370',
					},
					{
						value: 'hsla(151, 99.7%, 63.8%, 0.605)',
						step: 9,
						h: '151',
						s: '1.00',
						l: '0.64',
						a: ' 0.605',
					},
					{
						value: 'hsla(152, 99.9%, 66.5%, 0.661)',
						step: 10,
						h: '152',
						s: '1.00',
						l: '0.67',
						a: ' 0.661',
					},
					{
						value: 'hsla(151, 99.7%, 69.2%, 0.740)',
						step: 11,
						h: '151',
						s: '1.00',
						l: '0.69',
						a: ' 0.740',
					},
					{
						value: 'hsla(137, 100%, 95.8%, 0.980)',
						step: 12,
						h: '137',
						s: '1.00',
						l: '0.96',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(140, 94.9%, 38.7%, 0.016)',
						step: 1,
						h: '140',
						s: '0.95',
						l: '0.39',
						a: ' 0.016',
					},
					{
						value: 'hsla(138, 99.9%, 38.5%, 0.051)',
						step: 2,
						h: '138',
						s: '1.00',
						l: '0.39',
						a: ' 0.051',
					},
					{
						value: 'hsla(139, 97.7%, 36.9%, 0.087)',
						step: 3,
						h: '139',
						s: '0.98',
						l: '0.37',
						a: ' 0.087',
					},
					{
						value: 'hsla(139, 98.5%, 32.7%, 0.134)',
						step: 4,
						h: '139',
						s: '0.98',
						l: '0.33',
						a: ' 0.134',
					},
					{
						value: 'hsla(141, 100%, 30.4%, 0.200)',
						step: 5,
						h: '141',
						s: '1.00',
						l: '0.30',
						a: ' 0.200',
					},
					{
						value: 'hsla(142, 99.0%, 28.9%, 0.295)',
						step: 6,
						h: '142',
						s: '0.99',
						l: '0.29',
						a: ' 0.295',
					},
					{
						value: 'hsla(146, 99.5%, 27.6%, 0.428)',
						step: 7,
						h: '146',
						s: '0.99',
						l: '0.28',
						a: ' 0.428',
					},
					{
						value: 'hsla(151, 99.5%, 28.8%, 0.644)',
						step: 8,
						h: '151',
						s: '0.99',
						l: '0.29',
						a: ' 0.644',
					},
					{
						value: 'hsla(151, 99.9%, 28.0%, 0.812)',
						step: 9,
						h: '151',
						s: '1.00',
						l: '0.28',
						a: ' 0.812',
					},
					{
						value: 'hsla(152, 99.6%, 25.8%, 0.840)',
						step: 10,
						h: '152',
						s: '1.00',
						l: '0.26',
						a: ' 0.840',
					},
					{
						value: 'hsla(153, 99.9%, 21.0%, 0.906)',
						step: 11,
						h: '153',
						s: '1.00',
						l: '0.21',
						a: ' 0.906',
					},
					{
						value: 'hsla(155, 99.4%, 6.2%, 0.918)',
						step: 12,
						h: '155',
						s: '0.99',
						l: '0.06',
						a: ' 0.918',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Grass',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#0e1511',
					},
					{
						step: 2,
						value: '#141a15',
					},
					{
						step: 3,
						value: '#1b2a1e',
					},
					{
						step: 4,
						value: '#1d3a24',
					},
					{
						step: 5,
						value: '#25482d',
					},
					{
						step: 6,
						value: '#2d5736',
					},
					{
						step: 7,
						value: '#366740',
					},
					{
						step: 8,
						value: '#3e7949',
					},
					{
						step: 9,
						value: '#46a758',
					},
					{
						step: 10,
						value: '#53b365',
					},
					{
						step: 11,
						value: '#71d083',
					},
					{
						step: 12,
						value: '#c2f0c2',
					},
				],
				light: [
					{
						step: 1,
						value: '#fbfefb',
					},
					{
						step: 2,
						value: '#f5fbf5',
					},
					{
						step: 3,
						value: '#e9f6e9',
					},
					{
						step: 4,
						value: '#daf1db',
					},
					{
						step: 5,
						value: '#c9e8ca',
					},
					{
						step: 6,
						value: '#b2ddb5',
					},
					{
						step: 7,
						value: '#94ce9a',
					},
					{
						step: 8,
						value: '#65ba74',
					},
					{
						step: 9,
						value: '#46a758',
					},
					{
						step: 10,
						value: '#3e9b4f',
					},
					{
						step: 11,
						value: '#2a7e3b',
					},
					{
						step: 12,
						value: '#203c25',
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
						value: 'hsla(107, 97.2%, 61.9%, 0.022)',
						step: 2,
						h: '107',
						s: '0.97',
						l: '0.62',
						a: ' 0.022',
					},
					{
						value: 'hsla(128, 96.5%, 69.8%, 0.066)',
						step: 3,
						h: '128',
						s: '0.96',
						l: '0.70',
						a: ' 0.066',
					},
					{
						value: 'hsla(130, 100%, 70.2%, 0.100)',
						step: 4,
						h: '130',
						s: '1.00',
						l: '0.70',
						a: ' 0.100',
					},
					{
						value: 'hsla(130, 98.2%, 69.1%, 0.140)',
						step: 5,
						h: '130',
						s: '0.98',
						l: '0.69',
						a: ' 0.140',
					},
					{
						value: 'hsla(132, 99.9%, 69.3%, 0.187)',
						step: 6,
						h: '132',
						s: '1.00',
						l: '0.69',
						a: ' 0.187',
					},
					{
						value: 'hsla(132, 99.9%, 69.8%, 0.261)',
						step: 7,
						h: '132',
						s: '1.00',
						l: '0.70',
						a: ' 0.261',
					},
					{
						value: 'hsla(130, 99.6%, 70.5%, 0.370)',
						step: 8,
						h: '130',
						s: '1.00',
						l: '0.70',
						a: ' 0.370',
					},
					{
						value: 'hsla(130, 99.7%, 70.6%, 0.618)',
						step: 9,
						h: '130',
						s: '1.00',
						l: '0.71',
						a: ' 0.618',
					},
					{
						value: 'hsla(131, 100%, 73.5%, 0.674)',
						step: 10,
						h: '131',
						s: '1.00',
						l: '0.73',
						a: ' 0.674',
					},
					{
						value: 'hsla(130, 99.7%, 75.6%, 0.731)',
						step: 11,
						h: '130',
						s: '1.00',
						l: '0.76',
						a: ' 0.731',
					},
					{
						value: 'hsla(137, 100%, 95.8%, 0.980)',
						step: 12,
						h: '137',
						s: '1.00',
						l: '0.96',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(120, 94.9%, 38.7%, 0.016)',
						step: 1,
						h: '120',
						s: '0.95',
						l: '0.39',
						a: ' 0.016',
					},
					{
						value: 'hsla(120, 94.9%, 38.7%, 0.048)',
						step: 2,
						h: '120',
						s: '0.95',
						l: '0.39',
						a: ' 0.048',
					},
					{
						value: 'hsla(120, 98.0%, 35.5%, 0.079)',
						step: 3,
						h: '120',
						s: '0.98',
						l: '0.35',
						a: ' 0.079',
					},
					{
						value: 'hsla(120, 98.7%, 31.5%, 0.126)',
						step: 4,
						h: '120',
						s: '0.99',
						l: '0.32',
						a: ' 0.126',
					},
					{
						value: 'hsla(122, 98.5%, 29.9%, 0.193)',
						step: 5,
						h: '122',
						s: '0.98',
						l: '0.30',
						a: ' 0.193',
					},
					{
						value: 'hsla(125, 99.2%, 27.9%, 0.283)',
						step: 6,
						h: '125',
						s: '0.99',
						l: '0.28',
						a: ' 0.283',
					},
					{
						value: 'hsla(125, 99.9%, 27.0%, 0.408)',
						step: 7,
						h: '125',
						s: '1.00',
						l: '0.27',
						a: ' 0.408',
					},
					{
						value: 'hsla(131, 100%, 27.6%, 0.604)',
						step: 8,
						h: '131',
						s: '1.00',
						l: '0.28',
						a: ' 0.604',
					},
					{
						value: 'hsla(131, 99.7%, 26.3%, 0.726)',
						step: 9,
						h: '131',
						s: '1.00',
						l: '0.26',
						a: ' 0.726',
					},
					{
						value: 'hsla(132, 99.9%, 24.0%, 0.761)',
						step: 10,
						h: '132',
						s: '1.00',
						l: '0.24',
						a: ' 0.761',
					},
					{
						value: 'hsla(133, 99.5%, 19.5%, 0.840)',
						step: 11,
						h: '133',
						s: '0.99',
						l: '0.20',
						a: ' 0.840',
					},
					{
						value: 'hsla(128, 98.0%, 4.9%, 0.895)',
						step: 12,
						h: '128',
						s: '0.98',
						l: '0.05',
						a: ' 0.895',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Bronze',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#141110',
					},
					{
						step: 2,
						value: '#1c1917',
					},
					{
						step: 3,
						value: '#262220',
					},
					{
						step: 4,
						value: '#302a27',
					},
					{
						step: 5,
						value: '#3b3330',
					},
					{
						step: 6,
						value: '#493e3a',
					},
					{
						step: 7,
						value: '#5a4c47',
					},
					{
						step: 8,
						value: '#6f5f58',
					},
					{
						step: 9,
						value: '#a18072',
					},
					{
						step: 10,
						value: '#ae8c7e',
					},
					{
						step: 11,
						value: '#d4b3a5',
					},
					{
						step: 12,
						value: '#ede0d9',
					},
				],
				light: [
					{
						step: 1,
						value: '#fdfcfc',
					},
					{
						step: 2,
						value: '#fdf7f5',
					},
					{
						step: 3,
						value: '#f6edea',
					},
					{
						step: 4,
						value: '#efe4df',
					},
					{
						step: 5,
						value: '#e7d9d3',
					},
					{
						step: 6,
						value: '#dfcdc5',
					},
					{
						step: 7,
						value: '#d3bcb3',
					},
					{
						step: 8,
						value: '#c2a499',
					},
					{
						step: 9,
						value: '#a18072',
					},
					{
						step: 10,
						value: '#957468',
					},
					{
						step: 11,
						value: '#7d5e54',
					},
					{
						step: 12,
						value: '#43302b',
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
						value: 'hsla(20, 88.2%, 74.2%, 0.027)',
						step: 2,
						h: '20',
						s: '0.88',
						l: '0.74',
						a: ' 0.027',
					},
					{
						value: 'hsla(10, 99.4%, 83.0%, 0.074)',
						step: 3,
						h: '10',
						s: '0.99',
						l: '0.83',
						a: ' 0.074',
					},
					{
						value: 'hsla(18, 96.0%, 81.1%, 0.114)',
						step: 4,
						h: '18',
						s: '0.96',
						l: '0.81',
						a: ' 0.114',
					},
					{
						value: 'hsla(18, 99.4%, 81.7%, 0.148)',
						step: 5,
						h: '18',
						s: '0.99',
						l: '0.82',
						a: ' 0.148',
					},
					{
						value: 'hsla(15, 98.1%, 82.4%, 0.192)',
						step: 6,
						h: '15',
						s: '0.98',
						l: '0.82',
						a: ' 0.192',
					},
					{
						value: 'hsla(16, 99.2%, 82.9%, 0.270)',
						step: 7,
						h: '16',
						s: '0.99',
						l: '0.83',
						a: ' 0.270',
					},
					{
						value: 'hsla(18, 99.5%, 82.6%, 0.396)',
						step: 8,
						h: '18',
						s: '0.99',
						l: '0.83',
						a: ' 0.396',
					},
					{
						value: 'hsla(18, 99.3%, 85.0%, 0.592)',
						step: 9,
						h: '18',
						s: '0.99',
						l: '0.85',
						a: ' 0.592',
					},
					{
						value: 'hsla(18, 99.6%, 85.2%, 0.657)',
						step: 10,
						h: '18',
						s: '1.00',
						l: '0.85',
						a: ' 0.657',
					},
					{
						value: 'hsla(17, 99.9%, 86.1%, 0.774)',
						step: 11,
						h: '17',
						s: '1.00',
						l: '0.86',
						a: ' 0.774',
					},
					{
						value: 'hsla(20, 99.8%, 96.4%, 0.974)',
						step: 12,
						h: '20',
						s: '1.00',
						l: '0.96',
						a: ' 0.974',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(0, 89.3%, 18.3%, 0.012)',
						step: 1,
						h: '0',
						s: '0.89',
						l: '0.18',
						a: ' 0.012',
					},
					{
						value: 'hsla(17, 95.1%, 40.1%, 0.036)',
						step: 2,
						h: '17',
						s: '0.95',
						l: '0.40',
						a: ' 0.036',
					},
					{
						value: 'hsla(18, 98.3%, 29.8%, 0.067)',
						step: 3,
						h: '18',
						s: '0.98',
						l: '0.30',
						a: ' 0.067',
					},
					{
						value: 'hsla(17, 99.6%, 26.0%, 0.106)',
						step: 4,
						h: '17',
						s: '1.00',
						l: '0.26',
						a: ' 0.106',
					},
					{
						value: 'hsla(19, 99.6%, 23.8%, 0.157)',
						step: 5,
						h: '19',
						s: '1.00',
						l: '0.24',
						a: ' 0.157',
					},
					{
						value: 'hsla(17, 99.2%, 22.5%, 0.220)',
						step: 6,
						h: '17',
						s: '0.99',
						l: '0.23',
						a: ' 0.220',
					},
					{
						value: 'hsla(18, 99.7%, 21.6%, 0.310)',
						step: 7,
						h: '18',
						s: '1.00',
						l: '0.22',
						a: ' 0.310',
					},
					{
						value: 'hsla(17, 99.5%, 20.2%, 0.420)',
						step: 8,
						h: '17',
						s: '0.99',
						l: '0.20',
						a: ' 0.420',
					},
					{
						value: 'hsla(18, 99.9%, 16.7%, 0.553)',
						step: 9,
						h: '18',
						s: '1.00',
						l: '0.17',
						a: ' 0.553',
					},
					{
						value: 'hsla(17, 99.2%, 15.4%, 0.589)',
						step: 10,
						h: '17',
						s: '0.99',
						l: '0.15',
						a: ' 0.589',
					},
					{
						value: 'hsla(15, 99.9%, 13.2%, 0.655)',
						step: 11,
						h: '15',
						s: '1.00',
						l: '0.13',
						a: ' 0.655',
					},
					{
						value: 'hsla(12, 98.7%, 5.7%, 0.832)',
						step: 12,
						h: '12',
						s: '0.99',
						l: '0.06',
						a: ' 0.832',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Gold',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#121211',
					},
					{
						step: 2,
						value: '#1b1a17',
					},
					{
						step: 3,
						value: '#24231f',
					},
					{
						step: 4,
						value: '#2d2b26',
					},
					{
						step: 5,
						value: '#38352e',
					},
					{
						step: 6,
						value: '#444039',
					},
					{
						step: 7,
						value: '#544f46',
					},
					{
						step: 8,
						value: '#696256',
					},
					{
						step: 9,
						value: '#978365',
					},
					{
						step: 10,
						value: '#a39073',
					},
					{
						step: 11,
						value: '#cbb99f',
					},
					{
						step: 12,
						value: '#e8e2d9',
					},
				],
				light: [
					{
						step: 1,
						value: '#fdfdfc',
					},
					{
						step: 2,
						value: '#faf9f2',
					},
					{
						step: 3,
						value: '#f2f0e7',
					},
					{
						step: 4,
						value: '#eae6db',
					},
					{
						step: 5,
						value: '#e1dccf',
					},
					{
						step: 6,
						value: '#d8d0bf',
					},
					{
						step: 7,
						value: '#cbc0aa',
					},
					{
						step: 8,
						value: '#b9a88d',
					},
					{
						step: 9,
						value: '#978365',
					},
					{
						step: 10,
						value: '#8c7a5e',
					},
					{
						step: 11,
						value: '#71624b',
					},
					{
						step: 12,
						value: '#3b352b',
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
						value: 'hsla(40, 93.7%, 70.6%, 0.022)',
						step: 2,
						h: '40',
						s: '0.94',
						l: '0.71',
						a: ' 0.022',
					},
					{
						value: 'hsla(40, 97.5%, 80.6%, 0.065)',
						step: 3,
						h: '40',
						s: '0.97',
						l: '0.81',
						a: ' 0.065',
					},
					{
						value: 'hsla(40, 95.9%, 80.8%, 0.100)',
						step: 4,
						h: '40',
						s: '0.96',
						l: '0.81',
						a: ' 0.100',
					},
					{
						value: 'hsla(38, 97.3%, 82.1%, 0.130)',
						step: 5,
						h: '38',
						s: '0.97',
						l: '0.82',
						a: ' 0.130',
					},
					{
						value: 'hsla(39, 97.2%, 82.5%, 0.169)',
						step: 6,
						h: '39',
						s: '0.97',
						l: '0.82',
						a: ' 0.169',
					},
					{
						value: 'hsla(37, 99.3%, 82.4%, 0.246)',
						step: 7,
						h: '37',
						s: '0.99',
						l: '0.82',
						a: ' 0.246',
					},
					{
						value: 'hsla(35, 98.7%, 82.2%, 0.363)',
						step: 8,
						h: '35',
						s: '0.99',
						l: '0.82',
						a: ' 0.363',
					},
					{
						value: 'hsla(36, 99.7%, 82.8%, 0.552)',
						step: 9,
						h: '36',
						s: '1.00',
						l: '0.83',
						a: ' 0.552',
					},
					{
						value: 'hsla(35, 99.2%, 83.7%, 0.613)',
						step: 10,
						h: '35',
						s: '0.99',
						l: '0.84',
						a: ' 0.613',
					},
					{
						value: 'hsla(35, 99.3%, 85.3%, 0.725)',
						step: 11,
						h: '35',
						s: '0.99',
						l: '0.85',
						a: ' 0.725',
					},
					{
						value: 'hsla(49, 98.6%, 96.7%, 0.966)',
						step: 12,
						h: '49',
						s: '0.99',
						l: '0.97',
						a: ' 0.966',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(60, 89.3%, 18.3%, 0.012)',
						step: 1,
						h: '60',
						s: '0.89',
						l: '0.18',
						a: ' 0.012',
					},
					{
						value: 'hsla(47, 99.9%, 34.6%, 0.051)',
						step: 2,
						h: '47',
						s: '1.00',
						l: '0.35',
						a: ' 0.051',
					},
					{
						value: 'hsla(45, 97.0%, 27.9%, 0.087)',
						step: 3,
						h: '45',
						s: '0.97',
						l: '0.28',
						a: ' 0.087',
					},
					{
						value: 'hsla(46, 98.0%, 25.4%, 0.134)',
						step: 4,
						h: '46',
						s: '0.98',
						l: '0.25',
						a: ' 0.134',
					},
					{
						value: 'hsla(43, 98.4%, 22.6%, 0.185)',
						step: 5,
						h: '43',
						s: '0.98',
						l: '0.23',
						a: ' 0.185',
					},
					{
						value: 'hsla(41, 99.7%, 22.0%, 0.259)',
						step: 6,
						h: '41',
						s: '1.00',
						l: '0.22',
						a: ' 0.259',
					},
					{
						value: 'hsla(38, 99.8%, 21.5%, 0.357)',
						step: 7,
						h: '38',
						s: '1.00',
						l: '0.21',
						a: ' 0.357',
					},
					{
						value: 'hsla(36, 99.3%, 21.5%, 0.487)',
						step: 8,
						h: '36',
						s: '0.99',
						l: '0.21',
						a: ' 0.487',
					},
					{
						value: 'hsla(36, 99.9%, 16.2%, 0.604)',
						step: 9,
						h: '36',
						s: '1.00',
						l: '0.16',
						a: ' 0.604',
					},
					{
						value: 'hsla(36, 99.2%, 14.6%, 0.636)',
						step: 10,
						h: '36',
						s: '0.99',
						l: '0.15',
						a: ' 0.636',
					},
					{
						value: 'hsla(35, 99.1%, 11.2%, 0.687)',
						step: 11,
						h: '35',
						s: '0.99',
						l: '0.11',
						a: ' 0.687',
					},
					{
						value: 'hsla(38, 98.0%, 3.8%, 0.832)',
						step: 12,
						h: '38',
						s: '0.98',
						l: '0.04',
						a: ' 0.832',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Brown',
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#12110f',
					},
					{
						step: 2,
						value: '#1c1816',
					},
					{
						step: 3,
						value: '#28211d',
					},
					{
						step: 4,
						value: '#322922',
					},
					{
						step: 5,
						value: '#3e3128',
					},
					{
						step: 6,
						value: '#4d3c2f',
					},
					{
						step: 7,
						value: '#614a39',
					},
					{
						step: 8,
						value: '#7c5f46',
					},
					{
						step: 9,
						value: '#ad7f58',
					},
					{
						step: 10,
						value: '#b88c67',
					},
					{
						step: 11,
						value: '#dbb594',
					},
					{
						step: 12,
						value: '#f2e1ca',
					},
				],
				light: [
					{
						step: 1,
						value: '#fefdfc',
					},
					{
						step: 2,
						value: '#fcf9f6',
					},
					{
						step: 3,
						value: '#f6eee7',
					},
					{
						step: 4,
						value: '#f0e4d9',
					},
					{
						step: 5,
						value: '#ebdaca',
					},
					{
						step: 6,
						value: '#e4cdb7',
					},
					{
						step: 7,
						value: '#dcbc9f',
					},
					{
						step: 8,
						value: '#cea37e',
					},
					{
						step: 9,
						value: '#ad7f58',
					},
					{
						step: 10,
						value: '#a07553',
					},
					{
						step: 11,
						value: '#815e46',
					},
					{
						step: 12,
						value: '#3e332e',
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
						value: 'hsla(22, 99.6%, 53.6%, 0.035)',
						step: 2,
						h: '22',
						s: '1.00',
						l: '0.54',
						a: ' 0.035',
					},
					{
						value: 'hsla(18, 97.8%, 69.0%, 0.088)',
						step: 3,
						h: '18',
						s: '0.98',
						l: '0.69',
						a: ' 0.088',
					},
					{
						value: 'hsla(21, 98.2%, 71.0%, 0.123)',
						step: 4,
						h: '21',
						s: '0.98',
						l: '0.71',
						a: ' 0.123',
					},
					{
						value: 'hsla(25, 98.4%, 72.1%, 0.158)',
						step: 5,
						h: '25',
						s: '0.98',
						l: '0.72',
						a: ' 0.158',
					},
					{
						value: 'hsla(25, 98.7%, 73.5%, 0.206)',
						step: 6,
						h: '25',
						s: '0.99',
						l: '0.73',
						a: ' 0.206',
					},
					{
						value: 'hsla(25, 99.0%, 74.6%, 0.289)',
						step: 7,
						h: '25',
						s: '0.99',
						l: '0.75',
						a: ' 0.289',
					},
					{
						value: 'hsla(28, 99.2%, 75.3%, 0.407)',
						step: 8,
						h: '28',
						s: '0.99',
						l: '0.75',
						a: ' 0.407',
					},
					{
						value: 'hsla(28, 100%, 74.8%, 0.642)',
						step: 9,
						h: '28',
						s: '1.00',
						l: '0.75',
						a: ' 0.642',
					},
					{
						value: 'hsla(28, 99.9%, 74.9%, 0.712)',
						step: 10,
						h: '28',
						s: '1.00',
						l: '0.75',
						a: ' 0.712',
					},
					{
						value: 'hsla(28, 99.9%, 74.9%, 0.843)',
						step: 11,
						h: '28',
						s: '1.00',
						l: '0.75',
						a: ' 0.843',
					},
					{
						value: 'hsla(32, 98.2%, 95.7%, 0.979)',
						step: 12,
						h: '32',
						s: '0.98',
						l: '0.96',
						a: ' 0.979',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(30, 94.3%, 34.6%, 0.012)',
						step: 1,
						h: '30',
						s: '0.94',
						l: '0.35',
						a: ' 0.012',
					},
					{
						value: 'hsla(30, 94.3%, 34.6%, 0.036)',
						step: 2,
						h: '30',
						s: '0.94',
						l: '0.35',
						a: ' 0.036',
					},
					{
						value: 'hsla(30, 97.7%, 33.9%, 0.083)',
						step: 3,
						h: '30',
						s: '0.98',
						l: '0.34',
						a: ' 0.083',
					},
					{
						value: 'hsla(31, 98.5%, 34.2%, 0.134)',
						step: 4,
						h: '31',
						s: '0.98',
						l: '0.34',
						a: ' 0.134',
					},
					{
						value: 'hsla(29, 100%, 34.3%, 0.200)',
						step: 5,
						h: '29',
						s: '1.00',
						l: '0.34',
						a: ' 0.200',
					},
					{
						value: 'hsla(28, 99.2%, 34.6%, 0.291)',
						step: 6,
						h: '28',
						s: '0.99',
						l: '0.35',
						a: ' 0.291',
					},
					{
						value: 'hsla(29, 99.8%, 33.8%, 0.412)',
						step: 7,
						h: '29',
						s: '1.00',
						l: '0.34',
						a: ' 0.412',
					},
					{
						value: 'hsla(28, 100%, 33.3%, 0.553)',
						step: 8,
						h: '28',
						s: '1.00',
						l: '0.33',
						a: ' 0.553',
					},
					{
						value: 'hsla(28, 99.9%, 25.5%, 0.655)',
						step: 9,
						h: '28',
						s: '1.00',
						l: '0.26',
						a: ' 0.655',
					},
					{
						value: 'hsla(27, 99.7%, 22.4%, 0.675)',
						step: 10,
						h: '27',
						s: '1.00',
						l: '0.22',
						a: ' 0.675',
					},
					{
						value: 'hsla(25, 99.8%, 17.3%, 0.714)',
						step: 11,
						h: '25',
						s: '1.00',
						l: '0.17',
						a: ' 0.714',
					},
					{
						value: 'hsla(21, 99.4%, 6.6%, 0.867)',
						step: 12,
						h: '21',
						s: '0.99',
						l: '0.07',
						a: ' 0.867',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Orange',
				onColor: '#ffffff',
				dark: [
					{
						step: 1,
						value: '#17120e',
					},
					{
						step: 2,
						value: '#1e160f',
					},
					{
						step: 3,
						value: '#331e0b',
					},
					{
						step: 4,
						value: '#462100',
					},
					{
						step: 5,
						value: '#562800',
					},
					{
						step: 6,
						value: '#66350c',
					},
					{
						step: 7,
						value: '#7e451d',
					},
					{
						step: 8,
						value: '#a35829',
					},
					{
						step: 9,
						value: '#f76b15',
					},
					{
						step: 10,
						value: '#ff801f',
					},
					{
						step: 11,
						value: '#ffa057',
					},
					{
						step: 12,
						value: '#ffe0c2',
					},
				],
				light: [
					{
						step: 1,
						value: '#fefcfb',
					},
					{
						step: 2,
						value: '#fff7ed',
					},
					{
						step: 3,
						value: '#ffefd6',
					},
					{
						step: 4,
						value: '#ffdfb5',
					},
					{
						step: 5,
						value: '#ffd19a',
					},
					{
						step: 6,
						value: '#ffc182',
					},
					{
						step: 7,
						value: '#f5ae73',
					},
					{
						step: 8,
						value: '#ec9455',
					},
					{
						step: 9,
						value: '#f76b15',
					},
					{
						step: 10,
						value: '#ef5f00',
					},
					{
						step: 11,
						value: '#cc4e00',
					},
					{
						step: 12,
						value: '#582d1d',
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
						value: 'hsla(13, 100%, 49.7%, 0.054)',
						step: 2,
						h: '13',
						s: '1.00',
						l: '0.50',
						a: ' 0.054',
					},
					{
						value: 'hsla(20, 100%, 49.7%, 0.117)',
						step: 3,
						h: '20',
						s: '1.00',
						l: '0.50',
						a: ' 0.117',
					},
					{
						value: 'hsla(23, 100%, 49.8%, 0.166)',
						step: 4,
						h: '23',
						s: '1.00',
						l: '0.50',
						a: ' 0.166',
					},
					{
						value: 'hsla(23, 99.4%, 50.1%, 0.215)',
						step: 5,
						h: '23',
						s: '0.99',
						l: '0.50',
						a: ' 0.215',
					},
					{
						value: 'hsla(23, 99.8%, 51.1%, 0.286)',
						step: 6,
						h: '23',
						s: '1.00',
						l: '0.51',
						a: ' 0.286',
					},
					{
						value: 'hsla(23, 99.7%, 50.6%, 0.389)',
						step: 7,
						h: '23',
						s: '1.00',
						l: '0.51',
						a: ' 0.389',
					},
					{
						value: 'hsla(24, 100%, 49.9%, 0.523)',
						step: 8,
						h: '24',
						s: '1.00',
						l: '0.50',
						a: ' 0.523',
					},
					{
						value: 'hsla(24, 99.9%, 51.6%, 0.965)',
						step: 9,
						h: '24',
						s: '1.00',
						l: '0.52',
						a: ' 0.965',
					},
					{
						value: 'hsla(25, 100%, 58.6%, 0.980)',
						step: 10,
						h: '25',
						s: '1.00',
						l: '0.59',
						a: ' 0.980',
					},
					{
						value: 'hsla(24, 100%, 62.4%, 0.980)',
						step: 11,
						h: '24',
						s: '1.00',
						l: '0.62',
						a: ' 0.980',
					},
					{
						value: 'hsla(26, 100%, 94.2%, 0.980)',
						step: 12,
						h: '26',
						s: '1.00',
						l: '0.94',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(20, 94.9%, 38.7%, 0.016)',
						step: 1,
						h: '20',
						s: '0.95',
						l: '0.39',
						a: ' 0.016',
					},
					{
						value: 'hsla(24, 95.8%, 46.5%, 0.044)',
						step: 2,
						h: '24',
						s: '0.96',
						l: '0.47',
						a: ' 0.044',
					},
					{
						value: 'hsla(25, 100%, 50.5%, 0.095)',
						step: 3,
						h: '25',
						s: '1.00',
						l: '0.51',
						a: ' 0.095',
					},
					{
						value: 'hsla(26, 100%, 50.0%, 0.157)',
						step: 4,
						h: '26',
						s: '1.00',
						l: '0.50',
						a: ' 0.157',
					},
					{
						value: 'hsla(25, 100%, 50.1%, 0.236)',
						step: 5,
						h: '25',
						s: '1.00',
						l: '0.50',
						a: ' 0.236',
					},
					{
						value: 'hsla(25, 100%, 50.1%, 0.346)',
						step: 6,
						h: '25',
						s: '1.00',
						l: '0.50',
						a: ' 0.346',
					},
					{
						value: 'hsla(24, 100%, 50.1%, 0.495)',
						step: 7,
						h: '24',
						s: '1.00',
						l: '0.50',
						a: ' 0.495',
					},
					{
						value: 'hsla(24, 99.7%, 48.7%, 0.695)',
						step: 8,
						h: '24',
						s: '1.00',
						l: '0.49',
						a: ' 0.695',
					},
					{
						value: 'hsla(24, 99.9%, 48.4%, 0.969)',
						step: 9,
						h: '24',
						s: '1.00',
						l: '0.48',
						a: ' 0.969',
					},
					{
						value: 'hsla(23, 100%, 46.4%, 0.980)',
						step: 10,
						h: '23',
						s: '1.00',
						l: '0.46',
						a: ' 0.980',
					},
					{
						value: 'hsla(23, 100%, 36.8%, 0.980)',
						step: 11,
						h: '23',
						s: '1.00',
						l: '0.37',
						a: ' 0.980',
					},
					{
						value: 'hsla(15, 99.4%, 11.0%, 0.934)',
						step: 12,
						h: '15',
						s: '0.99',
						l: '0.11',
						a: ' 0.934',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Amber',
				onColor: '#000000',
				dark: [
					{
						step: 1,
						value: '#16120c',
					},
					{
						step: 2,
						value: '#1d180f',
					},
					{
						step: 3,
						value: '#302008',
					},
					{
						step: 4,
						value: '#3f2700',
					},
					{
						step: 5,
						value: '#4d3000',
					},
					{
						step: 6,
						value: '#5c3d05',
					},
					{
						step: 7,
						value: '#714f19',
					},
					{
						step: 8,
						value: '#8f6424',
					},
					{
						step: 9,
						value: '#ffc53d',
					},
					{
						step: 10,
						value: '#ffd60a',
					},
					{
						step: 11,
						value: '#ffca16',
					},
					{
						step: 12,
						value: '#ffe7b3',
					},
				],
				light: [
					{
						step: 1,
						value: '#fefdfb',
					},
					{
						step: 2,
						value: '#fefbe9',
					},
					{
						step: 3,
						value: '#fff7c2',
					},
					{
						step: 4,
						value: '#ffee9c',
					},
					{
						step: 5,
						value: '#fbe577',
					},
					{
						step: 6,
						value: '#f3d673',
					},
					{
						step: 7,
						value: '#e9c162',
					},
					{
						step: 8,
						value: '#e2a336',
					},
					{
						step: 9,
						value: '#ffc53d',
					},
					{
						step: 10,
						value: '#ffba18',
					},
					{
						step: 11,
						value: '#ab6400',
					},
					{
						step: 12,
						value: '#4f3422',
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
						value: 'hsla(31, 100%, 49.7%, 0.036)',
						step: 2,
						h: '31',
						s: '1.00',
						l: '0.50',
						a: ' 0.036',
					},
					{
						value: 'hsla(27, 100%, 49.9%, 0.094)',
						step: 3,
						h: '27',
						s: '1.00',
						l: '0.50',
						a: ' 0.094',
					},
					{
						value: 'hsla(29, 100%, 50.0%, 0.143)',
						step: 4,
						h: '29',
						s: '1.00',
						l: '0.50',
						a: ' 0.143',
					},
					{
						value: 'hsla(31, 100%, 50.0%, 0.192)',
						step: 5,
						h: '31',
						s: '1.00',
						l: '0.50',
						a: ' 0.192',
					},
					{
						value: 'hsla(35, 100%, 50.0%, 0.250)',
						step: 6,
						h: '35',
						s: '1.00',
						l: '0.50',
						a: ' 0.250',
					},
					{
						value: 'hsla(34, 99.6%, 52.9%, 0.331)',
						step: 7,
						h: '34',
						s: '1.00',
						l: '0.53',
						a: ' 0.331',
					},
					{
						value: 'hsla(36, 100%, 50.0%, 0.442)',
						step: 8,
						h: '36',
						s: '1.00',
						l: '0.50',
						a: ' 0.442',
					},
					{
						value: 'hsla(40, 100%, 57.2%, 0.980)',
						step: 9,
						h: '40',
						s: '1.00',
						l: '0.57',
						a: ' 0.980',
					},
					{
						value: 'hsla(44, 100%, 64.2%, 0.980)',
						step: 10,
						h: '44',
						s: '1.00',
						l: '0.64',
						a: ' 0.980',
					},
					{
						value: 'hsla(39, 99.9%, 52.7%, 0.938)',
						step: 11,
						h: '39',
						s: '1.00',
						l: '0.53',
						a: ' 0.938',
					},
					{
						value: 'hsla(45, 100%, 94.2%, 0.980)',
						step: 12,
						h: '45',
						s: '1.00',
						l: '0.94',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(40, 94.9%, 38.7%, 0.016)',
						step: 1,
						h: '40',
						s: '0.95',
						l: '0.39',
						a: ' 0.016',
					},
					{
						value: 'hsla(40, 100%, 50.3%, 0.071)',
						step: 2,
						h: '40',
						s: '1.00',
						l: '0.50',
						a: ' 0.071',
					},
					{
						value: 'hsla(44, 100%, 50.1%, 0.165)',
						step: 3,
						h: '44',
						s: '1.00',
						l: '0.50',
						a: ' 0.165',
					},
					{
						value: 'hsla(43, 100%, 50.0%, 0.263)',
						step: 4,
						h: '43',
						s: '1.00',
						l: '0.50',
						a: ' 0.263',
					},
					{
						value: 'hsla(42, 100%, 50.0%, 0.365)',
						step: 5,
						h: '42',
						s: '1.00',
						l: '0.50',
						a: ' 0.365',
					},
					{
						value: 'hsla(38, 100%, 50.1%, 0.475)',
						step: 6,
						h: '38',
						s: '1.00',
						l: '0.50',
						a: ' 0.475',
					},
					{
						value: 'hsla(36, 99.9%, 46.2%, 0.612)',
						step: 7,
						h: '36',
						s: '1.00',
						l: '0.46',
						a: ' 0.612',
					},
					{
						value: 'hsla(35, 99.8%, 46.0%, 0.832)',
						step: 8,
						h: '35',
						s: '1.00',
						l: '0.46',
						a: ' 0.832',
					},
					{
						value: 'hsla(39, 100%, 50.0%, 0.859)',
						step: 9,
						h: '39',
						s: '1.00',
						l: '0.50',
						a: ' 0.859',
					},
					{
						value: 'hsla(35, 100%, 50.0%, 0.891)',
						step: 10,
						h: '35',
						s: '1.00',
						l: '0.50',
						a: ' 0.891',
					},
					{
						value: 'hsla(29, 100%, 33.6%, 0.980)',
						step: 11,
						h: '29',
						s: '1.00',
						l: '0.34',
						a: ' 0.980',
					},
					{
						value: 'hsla(20, 99.8%, 14.1%, 0.965)',
						step: 12,
						h: '20',
						s: '1.00',
						l: '0.14',
						a: ' 0.965',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Yellow',
				onColor: '#000000',
				dark: [
					{
						step: 1,
						value: '#14120b',
					},
					{
						step: 2,
						value: '#1b180f',
					},
					{
						step: 3,
						value: '#2d2305',
					},
					{
						step: 4,
						value: '#362b00',
					},
					{
						step: 5,
						value: '#433500',
					},
					{
						step: 6,
						value: '#524202',
					},
					{
						step: 7,
						value: '#665417',
					},
					{
						step: 8,
						value: '#836a21',
					},
					{
						step: 9,
						value: '#ffe629',
					},
					{
						step: 10,
						value: '#ffff57',
					},
					{
						step: 11,
						value: '#f5e147',
					},
					{
						step: 12,
						value: '#f6eeb4',
					},
				],
				light: [
					{
						step: 1,
						value: '#fdfdf9',
					},
					{
						step: 2,
						value: '#fefce9',
					},
					{
						step: 3,
						value: '#fffab8',
					},
					{
						step: 4,
						value: '#fff394',
					},
					{
						step: 5,
						value: '#ffe770',
					},
					{
						step: 6,
						value: '#f3d768',
					},
					{
						step: 7,
						value: '#e4c767',
					},
					{
						step: 8,
						value: '#d5ae39',
					},
					{
						step: 9,
						value: '#ffe629',
					},
					{
						step: 10,
						value: '#ffdc00',
					},
					{
						step: 11,
						value: '#9e6c00',
					},
					{
						step: 12,
						value: '#473b1f',
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
						value: 'hsla(49, 100%, 49.1%, 0.027)',
						step: 2,
						h: '49',
						s: '1.00',
						l: '0.49',
						a: ' 0.027',
					},
					{
						value: 'hsla(45, 100%, 49.7%, 0.071)',
						step: 3,
						h: '45',
						s: '1.00',
						l: '0.50',
						a: ' 0.071',
					},
					{
						value: 'hsla(46, 100%, 49.7%, 0.111)',
						step: 4,
						h: '46',
						s: '1.00',
						l: '0.50',
						a: ' 0.111',
					},
					{
						value: 'hsla(47, 100%, 49.9%, 0.150)',
						step: 5,
						h: '47',
						s: '1.00',
						l: '0.50',
						a: ' 0.150',
					},
					{
						value: 'hsla(51, 100%, 49.8%, 0.199)',
						step: 6,
						h: '51',
						s: '1.00',
						l: '0.50',
						a: ' 0.199',
					},
					{
						value: 'hsla(51, 99.8%, 53.6%, 0.269)',
						step: 7,
						h: '51',
						s: '1.00',
						l: '0.54',
						a: ' 0.269',
					},
					{
						value: 'hsla(51, 100%, 49.9%, 0.371)',
						step: 8,
						h: '51',
						s: '1.00',
						l: '0.50',
						a: ' 0.371',
					},
					{
						value: 'hsla(53, 100%, 52.0%, 0.956)',
						step: 9,
						h: '53',
						s: '1.00',
						l: '0.52',
						a: ' 0.956',
					},
					{
						value: 'hsla(56, 100%, 68.4%, 0.980)',
						step: 10,
						h: '56',
						s: '1.00',
						l: '0.68',
						a: ' 0.980',
					},
					{
						value: 'hsla(48, 100%, 50.0%, 0.934)',
						step: 11,
						h: '48',
						s: '1.00',
						l: '0.50',
						a: ' 0.934',
					},
					{
						value: 'hsla(60, 100%, 91.8%, 0.980)',
						step: 12,
						h: '60',
						s: '1.00',
						l: '0.92',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(60, 94.3%, 34.6%, 0.024)',
						step: 1,
						h: '60',
						s: '0.94',
						l: '0.35',
						a: ' 0.024',
					},
					{
						value: 'hsla(52, 100%, 50.4%, 0.091)',
						step: 2,
						h: '52',
						s: '1.00',
						l: '0.50',
						a: ' 0.091',
					},
					{
						value: 'hsla(55, 100%, 50.2%, 0.181)',
						step: 3,
						h: '55',
						s: '1.00',
						l: '0.50',
						a: ' 0.181',
					},
					{
						value: 'hsla(54, 100%, 50.1%, 0.267)',
						step: 4,
						h: '54',
						s: '1.00',
						l: '0.50',
						a: ' 0.267',
					},
					{
						value: 'hsla(52, 99.9%, 49.5%, 0.357)',
						step: 5,
						h: '52',
						s: '1.00',
						l: '0.49',
						a: ' 0.357',
					},
					{
						value: 'hsla(50, 100%, 47.4%, 0.451)',
						step: 6,
						h: '50',
						s: '1.00',
						l: '0.47',
						a: ' 0.451',
					},
					{
						value: 'hsla(47, 99.8%, 44.6%, 0.577)',
						step: 7,
						h: '47',
						s: '1.00',
						l: '0.45',
						a: ' 0.577',
					},
					{
						value: 'hsla(48, 100%, 46.0%, 0.980)',
						step: 8,
						h: '48',
						s: '1.00',
						l: '0.46',
						a: ' 0.980',
					},
					{
						value: 'hsla(53, 100%, 48.0%, 0.961)',
						step: 9,
						h: '53',
						s: '1.00',
						l: '0.48',
						a: ' 0.961',
					},
					{
						value: 'hsla(50, 100%, 48.4%, 0.980)',
						step: 10,
						h: '50',
						s: '1.00',
						l: '0.48',
						a: ' 0.980',
					},
					{
						value: 'hsla(42, 100%, 28.6%, 0.980)',
						step: 11,
						h: '42',
						s: '1.00',
						l: '0.29',
						a: ' 0.980',
					},
					{
						value: 'hsla(41, 98.9%, 8.0%, 0.942)',
						step: 12,
						h: '41',
						s: '0.99',
						l: '0.08',
						a: ' 0.942',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Lime',
				onColor: '#000',
				dark: [
					{
						step: 1,
						value: '#11130c',
					},
					{
						step: 2,
						value: '#151a10',
					},
					{
						step: 3,
						value: '#1f2917',
					},
					{
						step: 4,
						value: '#29371d',
					},
					{
						step: 5,
						value: '#334423',
					},
					{
						step: 6,
						value: '#3d522a',
					},
					{
						step: 7,
						value: '#496231',
					},
					{
						step: 8,
						value: '#577538',
					},
					{
						step: 9,
						value: '#bdee63',
					},
					{
						step: 10,
						value: '#d4ff70',
					},
					{
						step: 11,
						value: '#bde56c',
					},
					{
						step: 12,
						value: '#e3f7ba',
					},
				],
				light: [
					{
						step: 1,
						value: '#fcfdfa',
					},
					{
						step: 2,
						value: '#f8faf3',
					},
					{
						step: 3,
						value: '#eef6d6',
					},
					{
						step: 4,
						value: '#e2f0bd',
					},
					{
						step: 5,
						value: '#d3e7a6',
					},
					{
						step: 6,
						value: '#c2da91',
					},
					{
						step: 7,
						value: '#abc978',
					},
					{
						step: 8,
						value: '#8db654',
					},
					{
						step: 9,
						value: '#bdee63',
					},
					{
						step: 10,
						value: '#b0e64c',
					},
					{
						step: 11,
						value: '#5c7c2f',
					},
					{
						step: 12,
						value: '#37401c',
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
						value: 'hsla(75, 96.4%, 59.6%, 0.022)',
						step: 2,
						h: '75',
						s: '0.96',
						l: '0.60',
						a: ' 0.022',
					},
					{
						value: 'hsla(88, 98.0%, 70.4%, 0.061)',
						step: 3,
						h: '88',
						s: '0.98',
						l: '0.70',
						a: ' 0.061',
					},
					{
						value: 'hsla(81, 97.8%, 67.4%, 0.096)',
						step: 4,
						h: '81',
						s: '0.98',
						l: '0.67',
						a: ' 0.096',
					},
					{
						value: 'hsla(82, 98.4%, 65.6%, 0.135)',
						step: 5,
						h: '82',
						s: '0.98',
						l: '0.66',
						a: ' 0.135',
					},
					{
						value: 'hsla(79, 99.7%, 64.3%, 0.182)',
						step: 6,
						h: '79',
						s: '1.00',
						l: '0.64',
						a: ' 0.182',
					},
					{
						value: 'hsla(77, 99.1%, 62.1%, 0.252)',
						step: 7,
						h: '77',
						s: '0.99',
						l: '0.62',
						a: ' 0.252',
					},
					{
						value: 'hsla(75, 100%, 60.0%, 0.342)',
						step: 8,
						h: '75',
						s: '1.00',
						l: '0.60',
						a: ' 0.342',
					},
					{
						value: 'hsla(81, 99.8%, 59.7%, 0.819)',
						step: 9,
						h: '81',
						s: '1.00',
						l: '0.60',
						a: ' 0.819',
					},
					{
						value: 'hsla(75, 99.8%, 63.7%, 0.936)',
						step: 10,
						h: '75',
						s: '1.00',
						l: '0.64',
						a: ' 0.936',
					},
					{
						value: 'hsla(81, 99.9%, 58.7%, 0.719)',
						step: 11,
						h: '81',
						s: '1.00',
						l: '0.59',
						a: ' 0.719',
					},
					{
						value: 'hsla(83, 100%, 94.2%, 0.980)',
						step: 12,
						h: '83',
						s: '1.00',
						l: '0.94',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(80, 93.8%, 31.4%, 0.020)',
						step: 1,
						h: '80',
						s: '0.94',
						l: '0.31',
						a: ' 0.020',
					},
					{
						value: 'hsla(85, 99.3%, 40.2%, 0.059)',
						step: 2,
						h: '85',
						s: '0.99',
						l: '0.40',
						a: ' 0.059',
					},
					{
						value: 'hsla(84, 98.7%, 43.2%, 0.138)',
						step: 3,
						h: '84',
						s: '0.99',
						l: '0.43',
						a: ' 0.138',
					},
					{
						value: 'hsla(84, 99.6%, 43.0%, 0.220)',
						step: 4,
						h: '84',
						s: '1.00',
						l: '0.43',
						a: ' 0.220',
					},
					{
						value: 'hsla(85, 99.8%, 41.8%, 0.310)',
						step: 5,
						h: '85',
						s: '1.00',
						l: '0.42',
						a: ' 0.310',
					},
					{
						value: 'hsla(82, 99.8%, 39.3%, 0.420)',
						step: 6,
						h: '82',
						s: '1.00',
						l: '0.39',
						a: ' 0.420',
					},
					{
						value: 'hsla(79, 99.7%, 34.6%, 0.585)',
						step: 7,
						h: '79',
						s: '1.00',
						l: '0.35',
						a: ' 0.585',
					},
					{
						value: 'hsla(76, 99.8%, 33.7%, 0.828)',
						step: 8,
						h: '76',
						s: '1.00',
						l: '0.34',
						a: ' 0.828',
					},
					{
						value: 'hsla(81, 99.8%, 40.2%, 0.836)',
						step: 9,
						h: '81',
						s: '1.00',
						l: '0.40',
						a: ' 0.836',
					},
					{
						value: 'hsla(80, 100%, 37.6%, 0.851)',
						step: 10,
						h: '80',
						s: '1.00',
						l: '0.38',
						a: ' 0.851',
					},
					{
						value: 'hsla(75, 99.5%, 22.0%, 0.950)',
						step: 11,
						h: '75',
						s: '0.99',
						l: '0.22',
						a: ' 0.950',
					},
					{
						value: 'hsla(78, 99.6%, 8.4%, 0.965)',
						step: 12,
						h: '78',
						s: '1.00',
						l: '0.08',
						a: ' 0.965',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Mint',
				onColor: '#000',
				dark: [
					{
						step: 1,
						value: '#0e1515',
					},
					{
						step: 2,
						value: '#0f1b1b',
					},
					{
						step: 3,
						value: '#092c2b',
					},
					{
						step: 4,
						value: '#003a38',
					},
					{
						step: 5,
						value: '#004744',
					},
					{
						step: 6,
						value: '#105650',
					},
					{
						step: 7,
						value: '#1e685f',
					},
					{
						step: 8,
						value: '#277f70',
					},
					{
						step: 9,
						value: '#86ead4',
					},
					{
						step: 10,
						value: '#a8f5e5',
					},
					{
						step: 11,
						value: '#58d5ba',
					},
					{
						step: 12,
						value: '#c4f5e1',
					},
				],
				light: [
					{
						step: 1,
						value: '#f9fefd',
					},
					{
						step: 2,
						value: '#f2fbf9',
					},
					{
						step: 3,
						value: '#ddf9f2',
					},
					{
						step: 4,
						value: '#c8f4e9',
					},
					{
						step: 5,
						value: '#b3ecde',
					},
					{
						step: 6,
						value: '#9ce0d0',
					},
					{
						step: 7,
						value: '#7ecfbd',
					},
					{
						step: 8,
						value: '#4cbba5',
					},
					{
						step: 9,
						value: '#86ead4',
					},
					{
						step: 10,
						value: '#7de0cb',
					},
					{
						step: 11,
						value: '#027864',
					},
					{
						step: 12,
						value: '#16433c',
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
						value: 'hsla(180, 100%, 49.2%, 0.031)',
						step: 2,
						h: '180',
						s: '1.00',
						l: '0.49',
						a: ' 0.031',
					},
					{
						value: 'hsla(176, 100%, 49.7%, 0.070)',
						step: 3,
						h: '176',
						s: '1.00',
						l: '0.50',
						a: ' 0.070',
					},
					{
						value: 'hsla(173, 100%, 49.7%, 0.105)',
						step: 4,
						h: '173',
						s: '1.00',
						l: '0.50',
						a: ' 0.105',
					},
					{
						value: 'hsla(173, 100%, 49.8%, 0.144)',
						step: 5,
						h: '173',
						s: '1.00',
						l: '0.50',
						a: ' 0.144',
					},
					{
						value: 'hsla(172, 100%, 49.8%, 0.192)',
						step: 6,
						h: '172',
						s: '1.00',
						l: '0.50',
						a: ' 0.192',
					},
					{
						value: 'hsla(171, 100%, 49.9%, 0.266)',
						step: 7,
						h: '171',
						s: '1.00',
						l: '0.50',
						a: ' 0.266',
					},
					{
						value: 'hsla(169, 100%, 49.9%, 0.366)',
						step: 8,
						h: '169',
						s: '1.00',
						l: '0.50',
						a: ' 0.366',
					},
					{
						value: 'hsla(167, 99.8%, 75.0%, 0.870)',
						step: 9,
						h: '167',
						s: '1.00',
						l: '0.75',
						a: ' 0.870',
					},
					{
						value: 'hsla(163, 99.9%, 80.7%, 0.948)',
						step: 10,
						h: '163',
						s: '1.00',
						l: '0.81',
						a: ' 0.948',
					},
					{
						value: 'hsla(167, 99.9%, 58.7%, 0.796)',
						step: 11,
						h: '167',
						s: '1.00',
						l: '0.59',
						a: ' 0.796',
					},
					{
						value: 'hsla(169, 100%, 96.2%, 0.980)',
						step: 12,
						h: '169',
						s: '1.00',
						l: '0.96',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(168, 95.4%, 42.8%, 0.024)',
						step: 1,
						h: '168',
						s: '0.95',
						l: '0.43',
						a: ' 0.024',
					},
					{
						value: 'hsla(164, 99.1%, 47.1%, 0.063)',
						step: 2,
						h: '164',
						s: '0.99',
						l: '0.47',
						a: ' 0.063',
					},
					{
						value: 'hsla(164, 99.3%, 43.5%, 0.118)',
						step: 3,
						h: '164',
						s: '0.99',
						l: '0.43',
						a: ' 0.118',
					},
					{
						value: 'hsla(164, 99.3%, 41.3%, 0.177)',
						step: 4,
						h: '164',
						s: '0.99',
						l: '0.41',
						a: ' 0.177',
					},
					{
						value: 'hsla(165, 99.0%, 37.5%, 0.248)',
						step: 5,
						h: '165',
						s: '0.99',
						l: '0.38',
						a: ' 0.248',
					},
					{
						value: 'hsla(165, 100%, 35.0%, 0.353)',
						step: 6,
						h: '165',
						s: '1.00',
						l: '0.35',
						a: ' 0.353',
					},
					{
						value: 'hsla(166, 99.9%, 33.5%, 0.510)',
						step: 7,
						h: '166',
						s: '1.00',
						l: '0.34',
						a: ' 0.510',
					},
					{
						value: 'hsla(168, 99.6%, 34.6%, 0.750)',
						step: 8,
						h: '168',
						s: '1.00',
						l: '0.35',
						a: ' 0.750',
					},
					{
						value: 'hsla(167, 99.9%, 39.5%, 0.561)',
						step: 9,
						h: '167',
						s: '1.00',
						l: '0.40',
						a: ' 0.561',
					},
					{
						value: 'hsla(167, 99.7%, 37.4%, 0.589)',
						step: 10,
						h: '167',
						s: '1.00',
						l: '0.37',
						a: ' 0.589',
					},
					{
						value: 'hsla(172, 99.8%, 22.4%, 0.922)',
						step: 11,
						h: '172',
						s: '1.00',
						l: '0.22',
						a: ' 0.922',
					},
					{
						value: 'hsla(172, 99.7%, 8.8%, 0.965)',
						step: 12,
						h: '172',
						s: '1.00',
						l: '0.09',
						a: ' 0.965',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Sky',
				onColor: '#000',
				dark: [
					{
						step: 1,
						value: '#0d141f',
					},
					{
						step: 2,
						value: '#111a27',
					},
					{
						step: 3,
						value: '#112840',
					},
					{
						step: 4,
						value: '#113555',
					},
					{
						step: 5,
						value: '#154467',
					},
					{
						step: 6,
						value: '#1b537b',
					},
					{
						step: 7,
						value: '#1f6692',
					},
					{
						step: 8,
						value: '#197cae',
					},
					{
						step: 9,
						value: '#7ce2fe',
					},
					{
						step: 10,
						value: '#a8eeff',
					},
					{
						step: 11,
						value: '#75c7f0',
					},
					{
						step: 12,
						value: '#c2f3ff',
					},
				],
				light: [
					{
						step: 1,
						value: '#f9feff',
					},
					{
						step: 2,
						value: '#f1fafd',
					},
					{
						step: 3,
						value: '#e1f6fd',
					},
					{
						step: 4,
						value: '#d1f0fa',
					},
					{
						step: 5,
						value: '#bee7f5',
					},
					{
						step: 6,
						value: '#a9daed',
					},
					{
						step: 7,
						value: '#8dcae3',
					},
					{
						step: 8,
						value: '#60b3d7',
					},
					{
						step: 9,
						value: '#7ce2fe',
					},
					{
						step: 10,
						value: '#74daf8',
					},
					{
						step: 11,
						value: '#00749e',
					},
					{
						step: 12,
						value: '#1d3e56',
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
						value: 'hsla(208, 100%, 49.8%, 0.045)',
						step: 2,
						h: '208',
						s: '1.00',
						l: '0.50',
						a: ' 0.045',
					},
					{
						value: 'hsla(201, 100%, 49.8%, 0.099)',
						step: 3,
						h: '201',
						s: '1.00',
						l: '0.50',
						a: ' 0.099',
					},
					{
						value: 'hsla(201, 100%, 50.0%, 0.148)',
						step: 4,
						h: '201',
						s: '1.00',
						l: '0.50',
						a: ' 0.148',
					},
					{
						value: 'hsla(200, 100%, 49.8%, 0.198)',
						step: 5,
						h: '200',
						s: '1.00',
						l: '0.50',
						a: ' 0.198',
					},
					{
						value: 'hsla(199, 100%, 49.9%, 0.256)',
						step: 6,
						h: '199',
						s: '1.00',
						l: '0.50',
						a: ' 0.256',
					},
					{
						value: 'hsla(199, 100%, 49.9%, 0.337)',
						step: 7,
						h: '199',
						s: '1.00',
						l: '0.50',
						a: ' 0.337',
					},
					{
						value: 'hsla(199, 100%, 50.0%, 0.453)',
						step: 8,
						h: '199',
						s: '1.00',
						l: '0.50',
						a: ' 0.453',
					},
					{
						value: 'hsla(192, 100%, 70.8%, 0.980)',
						step: 9,
						h: '192',
						s: '1.00',
						l: '0.71',
						a: ' 0.980',
					},
					{
						value: 'hsla(190, 100%, 77.6%, 0.980)',
						step: 10,
						h: '190',
						s: '1.00',
						l: '0.78',
						a: ' 0.980',
					},
					{
						value: 'hsla(192, 99.9%, 59.6%, 0.924)',
						step: 11,
						h: '192',
						s: '1.00',
						l: '0.60',
						a: ' 0.924',
					},
					{
						value: 'hsla(189, 100%, 96.8%, 0.980)',
						step: 12,
						h: '189',
						s: '1.00',
						l: '0.97',
						a: ' 0.980',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(190, 100%, 51.0%, 0.024)',
						step: 1,
						h: '190',
						s: '1.00',
						l: '0.51',
						a: ' 0.024',
					},
					{
						value: 'hsla(193, 100%, 50.1%, 0.055)',
						step: 2,
						h: '193',
						s: '1.00',
						l: '0.50',
						a: ' 0.055',
					},
					{
						value: 'hsla(193, 100%, 50.1%, 0.106)',
						step: 3,
						h: '193',
						s: '1.00',
						l: '0.50',
						a: ' 0.106',
					},
					{
						value: 'hsla(194, 99.6%, 47.7%, 0.165)',
						step: 4,
						h: '194',
						s: '1.00',
						l: '0.48',
						a: ' 0.165',
					},
					{
						value: 'hsla(194, 99.2%, 45.4%, 0.244)',
						step: 5,
						h: '194',
						s: '0.99',
						l: '0.45',
						a: ' 0.244',
					},
					{
						value: 'hsla(194, 99.9%, 42.3%, 0.357)',
						step: 6,
						h: '194',
						s: '1.00',
						l: '0.42',
						a: ' 0.357',
					},
					{
						value: 'hsla(194, 99.8%, 42.2%, 0.526)',
						step: 7,
						h: '194',
						s: '1.00',
						l: '0.42',
						a: ' 0.526',
					},
					{
						value: 'hsla(193, 99.9%, 43.8%, 0.820)',
						step: 8,
						h: '193',
						s: '1.00',
						l: '0.44',
						a: ' 0.820',
					},
					{
						value: 'hsla(193, 99.7%, 49.4%, 0.593)',
						step: 9,
						h: '193',
						s: '1.00',
						l: '0.49',
						a: ' 0.593',
					},
					{
						value: 'hsla(193, 99.8%, 46.6%, 0.628)',
						step: 10,
						h: '193',
						s: '1.00',
						l: '0.47',
						a: ' 0.628',
					},
					{
						value: 'hsla(196, 100%, 31.2%, 0.980)',
						step: 11,
						h: '196',
						s: '1.00',
						l: '0.31',
						a: ' 0.980',
					},
					{
						value: 'hsla(196, 100%, 12.2%, 0.980)',
						step: 12,
						h: '196',
						s: '1.00',
						l: '0.12',
						a: ' 0.980',
					},
				],
				onWcag: '#000000',
			},
		],
		neutrals: [
			{
				name: 'Gray',
				pairing: [],
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#111',
					},
					{
						step: 2,
						value: '#191919',
					},
					{
						step: 3,
						value: '#222',
					},
					{
						step: 4,
						value: '#2a2a2a',
					},
					{
						step: 5,
						value: '#313131',
					},
					{
						step: 6,
						value: '#3a3a3a',
					},
					{
						step: 7,
						value: '#484848',
					},
					{
						step: 8,
						value: '#606060',
					},
					{
						step: 9,
						value: '#6e6e6e',
					},
					{
						step: 10,
						value: '#7b7b7b',
					},
					{
						step: 11,
						value: '#b4b4b4',
					},
					{
						step: 12,
						value: '#eee',
					},
				],
				light: [
					{
						step: 1,
						value: '#fcfcfc',
					},
					{
						step: 2,
						value: '#f9f9f9',
					},
					{
						step: 3,
						value: '#f0f0f0',
					},
					{
						step: 4,
						value: '#e8e8e8',
					},
					{
						step: 5,
						value: '#e0e0e0',
					},
					{
						step: 6,
						value: '#d9d9d9',
					},
					{
						step: 7,
						value: '#cecece',
					},
					{
						step: 8,
						value: '#bbb',
					},
					{
						step: 9,
						value: '#8d8d8d',
					},
					{
						step: 10,
						value: '#838383',
					},
					{
						step: 11,
						value: '#646464',
					},
					{
						step: 12,
						value: '#202020',
					},
				],
				darkAlpha: [
					{
						value: 'hsla(0, 0%, 100%, 0)',
						step: 1,
						h: '0',
						s: '0.00',
						l: '1.00',
						a: ' 0',
					},
					{
						value: 'hsla(0, 0%, 100%, 0.026)',
						step: 2,
						h: '0',
						s: '0.00',
						l: '1.00',
						a: ' 0.026',
					},
					{
						value: 'hsla(0, 0%, 100%, 0.056)',
						step: 3,
						h: '0',
						s: '0.00',
						l: '1.00',
						a: ' 0.056',
					},
					{
						value: 'hsla(0, 0%, 100%, 0.077)',
						step: 4,
						h: '0',
						s: '0.00',
						l: '1.00',
						a: ' 0.077',
					},
					{
						value: 'hsla(0, 0%, 100%, 0.103)',
						step: 5,
						h: '0',
						s: '0.00',
						l: '1.00',
						a: ' 0.103',
					},
					{
						value: 'hsla(0, 0%, 100%, 0.129)',
						step: 6,
						h: '0',
						s: '0.00',
						l: '1.00',
						a: ' 0.129',
					},
					{
						value: 'hsla(0, 0%, 100%, 0.172)',
						step: 7,
						h: '0',
						s: '0.00',
						l: '1.00',
						a: ' 0.172',
					},
					{
						value: 'hsla(0, 0%, 100%, 0.249)',
						step: 8,
						h: '0',
						s: '0.00',
						l: '1.00',
						a: ' 0.249',
					},
					{
						value: 'hsla(0, 0%, 100%, 0.386)',
						step: 9,
						h: '0',
						s: '0.00',
						l: '1.00',
						a: ' 0.386',
					},
					{
						value: 'hsla(0, 0%, 100%, 0.446)',
						step: 10,
						h: '0',
						s: '0.00',
						l: '1.00',
						a: ' 0.446',
					},
					{
						value: 'hsla(0, 0%, 100%, 0.592)',
						step: 11,
						h: '0',
						s: '0.00',
						l: '1.00',
						a: ' 0.592',
					},
					{
						value: 'hsla(0, 0%, 100%, 0.923)',
						step: 12,
						h: '0',
						s: '0.00',
						l: '1.00',
						a: ' 0.923',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(0, 0%, 0%, 0.012)',
						step: 1,
						h: '0',
						s: '0.00',
						l: '0.00',
						a: ' 0.012',
					},
					{
						value: 'hsla(0, 0%, 0%, 0.027)',
						step: 2,
						h: '0',
						s: '0.00',
						l: '0.00',
						a: ' 0.027',
					},
					{
						value: 'hsla(0, 0%, 0%, 0.047)',
						step: 3,
						h: '0',
						s: '0.00',
						l: '0.00',
						a: ' 0.047',
					},
					{
						value: 'hsla(0, 0%, 0%, 0.071)',
						step: 4,
						h: '0',
						s: '0.00',
						l: '0.00',
						a: ' 0.071',
					},
					{
						value: 'hsla(0, 0%, 0%, 0.090)',
						step: 5,
						h: '0',
						s: '0.00',
						l: '0.00',
						a: ' 0.090',
					},
					{
						value: 'hsla(0, 0%, 0%, 0.114)',
						step: 6,
						h: '0',
						s: '0.00',
						l: '0.00',
						a: ' 0.114',
					},
					{
						value: 'hsla(0, 0%, 0%, 0.141)',
						step: 7,
						h: '0',
						s: '0.00',
						l: '0.00',
						a: ' 0.141',
					},
					{
						value: 'hsla(0, 0%, 0%, 0.220)',
						step: 8,
						h: '0',
						s: '0.00',
						l: '0.00',
						a: ' 0.220',
					},
					{
						value: 'hsla(0, 0%, 0%, 0.439)',
						step: 9,
						h: '0',
						s: '0.00',
						l: '0.00',
						a: ' 0.439',
					},
					{
						value: 'hsla(0, 0%, 0%, 0.478)',
						step: 10,
						h: '0',
						s: '0.00',
						l: '0.00',
						a: ' 0.478',
					},
					{
						value: 'hsla(0, 0%, 0%, 0.565)',
						step: 11,
						h: '0',
						s: '0.00',
						l: '0.00',
						a: ' 0.565',
					},
					{
						value: 'hsla(0, 0%, 0%, 0.910)',
						step: 12,
						h: '0',
						s: '0.00',
						l: '0.00',
						a: ' 0.910',
					},
				],
				onWcag: '#000000',
			},
			{
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
			{
				name: 'Slate',
				pairing: ['Iris', 'Indigo', 'Blue', 'Sky'],
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#111113',
					},
					{
						step: 2,
						value: '#18191b',
					},
					{
						step: 3,
						value: '#212225',
					},
					{
						step: 4,
						value: '#272a2d',
					},
					{
						step: 5,
						value: '#2e3135',
					},
					{
						step: 6,
						value: '#363a3f',
					},
					{
						step: 7,
						value: '#43484e',
					},
					{
						step: 8,
						value: '#5a6169',
					},
					{
						step: 9,
						value: '#696e77',
					},
					{
						step: 10,
						value: '#777b84',
					},
					{
						step: 11,
						value: '#b0b4ba',
					},
					{
						step: 12,
						value: '#edeef0',
					},
				],
				light: [
					{
						step: 1,
						value: '#fcfcfd',
					},
					{
						step: 2,
						value: '#f9f9fb',
					},
					{
						step: 3,
						value: '#f0f0f3',
					},
					{
						step: 4,
						value: '#e8e8ec',
					},
					{
						step: 5,
						value: '#e0e1e6',
					},
					{
						step: 6,
						value: '#d9d9e0',
					},
					{
						step: 7,
						value: '#cdced6',
					},
					{
						step: 8,
						value: '#b9bbc6',
					},
					{
						step: 9,
						value: '#8b8d98',
					},
					{
						step: 10,
						value: '#80838d',
					},
					{
						step: 11,
						value: '#60646c',
					},
					{
						step: 12,
						value: '#1c2024',
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
						value: 'hsla(181, 98.9%, 91.8%, 0.026)',
						step: 2,
						h: '181',
						s: '0.99',
						l: '0.92',
						a: ' 0.026',
					},
					{
						value: 'hsla(182, 86.7%, 91.4%, 0.057)',
						step: 3,
						h: '182',
						s: '0.87',
						l: '0.91',
						a: ' 0.057',
					},
					{
						value: 'hsla(209, 86.7%, 93.9%, 0.083)',
						step: 4,
						h: '209',
						s: '0.87',
						l: '0.94',
						a: ' 0.083',
					},
					{
						value: 'hsla(200, 90.3%, 93.4%, 0.109)',
						step: 5,
						h: '200',
						s: '0.90',
						l: '0.93',
						a: ' 0.109',
					},
					{
						value: 'hsla(209, 95.3%, 93.5%, 0.139)',
						step: 6,
						h: '209',
						s: '0.95',
						l: '0.94',
						a: ' 0.139',
					},
					{
						value: 'hsla(204, 98.5%, 93.9%, 0.182)',
						step: 7,
						h: '204',
						s: '0.98',
						l: '0.94',
						a: ' 0.182',
					},
					{
						value: 'hsla(209, 94.0%, 94.7%, 0.265)',
						step: 8,
						h: '209',
						s: '0.94',
						l: '0.95',
						a: ' 0.265',
					},
					{
						value: 'hsla(207, 97.3%, 94.0%, 0.412)',
						step: 9,
						h: '207',
						s: '0.97',
						l: '0.94',
						a: ' 0.412',
					},
					{
						value: 'hsla(209, 99.4%, 95.2%, 0.472)',
						step: 10,
						h: '209',
						s: '0.99',
						l: '0.95',
						a: ' 0.472',
					},
					{
						value: 'hsla(208, 98.7%, 96.8%, 0.615)',
						step: 11,
						h: '208',
						s: '0.99',
						l: '0.97',
						a: ' 0.615',
					},
					{
						value: 'hsla(211, 86.7%, 99.6%, 0.927)',
						step: 12,
						h: '211',
						s: '0.87',
						l: '1.00',
						a: ' 0.927',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(210, 92.6%, 26.5%, 0.016)',
						step: 1,
						h: '210',
						s: '0.93',
						l: '0.27',
						a: ' 0.016',
					},
					{
						value: 'hsla(210, 87.7%, 16.0%, 0.028)',
						step: 2,
						h: '210',
						s: '0.88',
						l: '0.16',
						a: ' 0.028',
					},
					{
						value: 'hsla(210, 98.8%, 14.4%, 0.055)',
						step: 3,
						h: '210',
						s: '0.99',
						l: '0.14',
						a: ' 0.055',
					},
					{
						value: 'hsla(210, 94.1%, 11.1%, 0.075)',
						step: 4,
						h: '210',
						s: '0.94',
						l: '0.11',
						a: ' 0.075',
					},
					{
						value: 'hsla(216, 91.1%, 10.9%, 0.099)',
						step: 5,
						h: '216',
						s: '0.91',
						l: '0.11',
						a: ' 0.099',
					},
					{
						value: 'hsla(206, 96.4%, 11.3%, 0.126)',
						step: 6,
						h: '206',
						s: '0.96',
						l: '0.11',
						a: ' 0.126',
					},
					{
						value: 'hsla(210, 99.1%, 10.1%, 0.157)',
						step: 7,
						h: '210',
						s: '0.99',
						l: '0.10',
						a: ' 0.157',
					},
					{
						value: 'hsla(205, 96.5%, 10.0%, 0.244)',
						step: 8,
						h: '205',
						s: '0.96',
						l: '0.10',
						a: ' 0.244',
					},
					{
						value: 'hsla(206, 98.8%, 5.9%, 0.467)',
						step: 9,
						h: '206',
						s: '0.99',
						l: '0.06',
						a: ' 0.467',
					},
					{
						value: 'hsla(206, 99.6%, 5.4%, 0.506)',
						step: 10,
						h: '206',
						s: '1.00',
						l: '0.05',
						a: ' 0.506',
					},
					{
						value: 'hsla(206, 97.0%, 4.8%, 0.593)',
						step: 11,
						h: '206',
						s: '0.97',
						l: '0.05',
						a: ' 0.593',
					},
					{
						value: 'hsla(202, 97.0%, 2.4%, 0.934)',
						step: 12,
						h: '202',
						s: '0.97',
						l: '0.02',
						a: ' 0.934',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Sage',
				pairing: ['Mint', 'Teal', 'Jade', 'Green'],
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#101211',
					},
					{
						step: 2,
						value: '#171918',
					},
					{
						step: 3,
						value: '#202221',
					},
					{
						step: 4,
						value: '#272a29',
					},
					{
						step: 5,
						value: '#2e3130',
					},
					{
						step: 6,
						value: '#373b39',
					},
					{
						step: 7,
						value: '#444947',
					},
					{
						step: 8,
						value: '#5b625f',
					},
					{
						step: 9,
						value: '#63706b',
					},
					{
						step: 10,
						value: '#717d79',
					},
					{
						step: 11,
						value: '#adb5b2',
					},
					{
						step: 12,
						value: '#eceeed',
					},
				],
				light: [
					{
						step: 1,
						value: '#fbfdfc',
					},
					{
						step: 2,
						value: '#f7f9f8',
					},
					{
						step: 3,
						value: '#eef1f0',
					},
					{
						step: 4,
						value: '#e6e9e8',
					},
					{
						step: 5,
						value: '#dfe2e0',
					},
					{
						step: 6,
						value: '#d7dad9',
					},
					{
						step: 7,
						value: '#cbcfcd',
					},
					{
						step: 8,
						value: '#b8bcba',
					},
					{
						step: 9,
						value: '#868e8b',
					},
					{
						step: 10,
						value: '#7c8481',
					},
					{
						step: 11,
						value: '#5f6563',
					},
					{
						step: 12,
						value: '#1a211e',
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
						value: 'hsla(123, 94.4%, 91.4%, 0.026)',
						step: 2,
						h: '123',
						s: '0.94',
						l: '0.91',
						a: ' 0.026',
					},
					{
						value: 'hsla(123, 82.9%, 91.0%, 0.057)',
						step: 3,
						h: '123',
						s: '0.83',
						l: '0.91',
						a: ' 0.057',
					},
					{
						value: 'hsla(124, 97.9%, 94.5%, 0.082)',
						step: 4,
						h: '124',
						s: '0.98',
						l: '0.94',
						a: ' 0.082',
					},
					{
						value: 'hsla(125, 90.0%, 95.2%, 0.104)',
						step: 5,
						h: '125',
						s: '0.90',
						l: '0.95',
						a: ' 0.104',
					},
					{
						value: 'hsla(142, 95.1%, 94.8%, 0.134)',
						step: 6,
						h: '142',
						s: '0.95',
						l: '0.95',
						a: ' 0.134',
					},
					{
						value: 'hsla(143, 92.8%, 95.7%, 0.173)',
						step: 7,
						h: '143',
						s: '0.93',
						l: '0.96',
						a: ' 0.173',
					},
					{
						value: 'hsla(146, 94.7%, 95.3%, 0.255)',
						step: 8,
						h: '146',
						s: '0.95',
						l: '0.95',
						a: ' 0.255',
					},
					{
						value: 'hsla(151, 98.2%, 94.4%, 0.397)',
						step: 9,
						h: '151',
						s: '0.98',
						l: '0.94',
						a: ' 0.397',
					},
					{
						value: 'hsla(148, 99.5%, 95.5%, 0.457)',
						step: 10,
						h: '148',
						s: '0.99',
						l: '0.95',
						a: ' 0.457',
					},
					{
						value: 'hsla(152, 95.1%, 97.3%, 0.600)',
						step: 11,
						h: '152',
						s: '0.95',
						l: '0.97',
						a: ' 0.600',
					},
					{
						value: 'hsla(149, 93.3%, 99.6%, 0.927)',
						step: 12,
						h: '149',
						s: '0.93',
						l: '1.00',
						a: ' 0.927',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(150, 92.6%, 26.5%, 0.016)',
						step: 1,
						h: '150',
						s: '0.93',
						l: '0.27',
						a: ' 0.016',
					},
					{
						value: 'hsla(150, 87.7%, 16.0%, 0.028)',
						step: 2,
						h: '150',
						s: '0.88',
						l: '0.16',
						a: ' 0.028',
					},
					{
						value: 'hsla(160, 98.4%, 10.9%, 0.055)',
						step: 3,
						h: '160',
						s: '0.98',
						l: '0.11',
						a: ' 0.055',
					},
					{
						value: 'hsla(140, 92.3%, 8.5%, 0.075)',
						step: 4,
						h: '140',
						s: '0.92',
						l: '0.09',
						a: ' 0.075',
					},
					{
						value: 'hsla(160, 86.0%, 6.9%, 0.099)',
						step: 5,
						h: '160',
						s: '0.86',
						l: '0.07',
						a: ' 0.099',
					},
					{
						value: 'hsla(156, 95.1%, 8.2%, 0.126)',
						step: 6,
						h: '156',
						s: '0.95',
						l: '0.08',
						a: ' 0.126',
					},
					{
						value: 'hsla(156, 98.6%, 6.3%, 0.157)',
						step: 7,
						h: '156',
						s: '0.99',
						l: '0.06',
						a: ' 0.157',
					},
					{
						value: 'hsla(154, 94.6%, 6.0%, 0.240)',
						step: 8,
						h: '154',
						s: '0.95',
						l: '0.06',
						a: ' 0.240',
					},
					{
						value: 'hsla(154, 98.7%, 3.0%, 0.459)',
						step: 9,
						h: '154',
						s: '0.99',
						l: '0.03',
						a: ' 0.459',
					},
					{
						value: 'hsla(154, 93.5%, 2.9%, 0.499)',
						step: 10,
						h: '154',
						s: '0.94',
						l: '0.03',
						a: ' 0.499',
					},
					{
						value: 'hsla(154, 95.2%, 2.5%, 0.585)',
						step: 11,
						h: '154',
						s: '0.95',
						l: '0.03',
						a: ' 0.585',
					},
					{
						value: 'hsla(158, 97.0%, 2.4%, 0.934)',
						step: 12,
						h: '158',
						s: '0.97',
						l: '0.02',
						a: ' 0.934',
					},
				],
				onWcag: '#000000',
			},
			{
				name: 'Olive',
				pairing: ['Grass', 'Lime'],
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#111210',
					},
					{
						step: 2,
						value: '#181917',
					},
					{
						step: 3,
						value: '#212220',
					},
					{
						step: 4,
						value: '#282a27',
					},
					{
						step: 5,
						value: '#2f312e',
					},
					{
						step: 6,
						value: '#383a36',
					},
					{
						step: 7,
						value: '#454843',
					},
					{
						step: 8,
						value: '#5c625b',
					},
					{
						step: 9,
						value: '#687066',
					},
					{
						step: 10,
						value: '#767d74',
					},
					{
						step: 11,
						value: '#afb5ad',
					},
					{
						step: 12,
						value: '#eceeec',
					},
				],
				light: [
					{
						step: 1,
						value: '#fcfdfc',
					},
					{
						step: 2,
						value: '#f8faf8',
					},
					{
						step: 3,
						value: '#eff1ef',
					},
					{
						step: 4,
						value: '#e7e9e7',
					},
					{
						step: 5,
						value: '#dfe2df',
					},
					{
						step: 6,
						value: '#d7dad7',
					},
					{
						step: 7,
						value: '#cccfcc',
					},
					{
						step: 8,
						value: '#b9bcb8',
					},
					{
						step: 9,
						value: '#898e87',
					},
					{
						step: 10,
						value: '#7f847d',
					},
					{
						step: 11,
						value: '#60655f',
					},
					{
						step: 12,
						value: '#1d211c',
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
						value: 'hsla(91, 97.0%, 84.0%, 0.026)',
						step: 2,
						h: '91',
						s: '0.97',
						l: '0.84',
						a: ' 0.026',
					},
					{
						value: 'hsla(101, 87.4%, 87.7%, 0.057)',
						step: 3,
						h: '101',
						s: '0.87',
						l: '0.88',
						a: ' 0.057',
					},
					{
						value: 'hsla(92, 91.8%, 94.1%, 0.078)',
						step: 4,
						h: '92',
						s: '0.92',
						l: '0.94',
						a: ' 0.078',
					},
					{
						value: 'hsla(101, 92.6%, 93.5%, 0.104)',
						step: 5,
						h: '101',
						s: '0.93',
						l: '0.94',
						a: ' 0.104',
					},
					{
						value: 'hsla(102, 91.1%, 94.6%, 0.130)',
						step: 6,
						h: '102',
						s: '0.91',
						l: '0.95',
						a: ' 0.130',
					},
					{
						value: 'hsla(102, 92.5%, 95.9%, 0.173)',
						step: 7,
						h: '102',
						s: '0.93',
						l: '0.96',
						a: ' 0.173',
					},
					{
						value: 'hsla(107, 100%, 96.5%, 0.250)',
						step: 8,
						h: '107',
						s: '1.00',
						l: '0.96',
						a: ' 0.250',
					},
					{
						value: 'hsla(110, 98.3%, 94.1%, 0.397)',
						step: 9,
						h: '110',
						s: '0.98',
						l: '0.94',
						a: ' 0.397',
					},
					{
						value: 'hsla(109, 99.6%, 95.3%, 0.457)',
						step: 10,
						h: '109',
						s: '1.00',
						l: '0.95',
						a: ' 0.457',
					},
					{
						value: 'hsla(113, 95.3%, 97.2%, 0.600)',
						step: 11,
						h: '113',
						s: '0.95',
						l: '0.97',
						a: ' 0.600',
					},
					{
						value: 'hsla(120, 93.5%, 99.6%, 0.927)',
						step: 12,
						h: '120',
						s: '0.94',
						l: '1.00',
						a: ' 0.927',
					},
				],
				lightAlpha: [
					{
						value: 'hsla(120, 89.3%, 18.3%, 0.012)',
						step: 1,
						h: '120',
						s: '0.89',
						l: '0.18',
						a: ' 0.012',
					},
					{
						value: 'hsla(120, 87.7%, 16.0%, 0.028)',
						step: 2,
						h: '120',
						s: '0.88',
						l: '0.16',
						a: ' 0.028',
					},
					{
						value: 'hsla(120, 99.5%, 7.7%, 0.051)',
						step: 3,
						h: '120',
						s: '0.99',
						l: '0.08',
						a: ' 0.051',
					},
					{
						value: 'hsla(120, 92.3%, 8.5%, 0.075)',
						step: 4,
						h: '120',
						s: '0.92',
						l: '0.09',
						a: ' 0.075',
					},
					{
						value: 'hsla(120, 86.0%, 6.9%, 0.099)',
						step: 5,
						h: '120',
						s: '0.86',
						l: '0.07',
						a: ' 0.099',
					},
					{
						value: 'hsla(120, 94.8%, 6.8%, 0.122)',
						step: 6,
						h: '120',
						s: '0.95',
						l: '0.07',
						a: ' 0.122',
					},
					{
						value: 'hsla(120, 99.3%, 5.2%, 0.153)',
						step: 7,
						h: '120',
						s: '0.99',
						l: '0.05',
						a: ' 0.153',
					},
					{
						value: 'hsla(110, 93.8%, 5.2%, 0.240)',
						step: 8,
						h: '110',
						s: '0.94',
						l: '0.05',
						a: ' 0.240',
					},
					{
						value: 'hsla(111, 98.7%, 3.0%, 0.459)',
						step: 9,
						h: '111',
						s: '0.99',
						l: '0.03',
						a: ' 0.459',
					},
					{
						value: 'hsla(111, 93.5%, 2.9%, 0.499)',
						step: 10,
						h: '111',
						s: '0.94',
						l: '0.03',
						a: ' 0.499',
					},
					{
						value: 'hsla(111, 95.2%, 2.5%, 0.585)',
						step: 11,
						h: '111',
						s: '0.95',
						l: '0.03',
						a: ' 0.585',
					},
					{
						value: 'hsla(110, 97.6%, 2.6%, 0.930)',
						step: 12,
						h: '110',
						s: '0.98',
						l: '0.03',
						a: ' 0.930',
					},
				],
				onWcag: '#000000',
			},

			{
				name: 'Sand',
				pairing: ['Yellow', 'Amber', 'Orange', 'Brown'],
				onColor: '#fff',
				dark: [
					{
						step: 1,
						value: '#111110',
					},
					{
						step: 2,
						value: '#191918',
					},
					{
						step: 3,
						value: '#222221',
					},
					{
						step: 4,
						value: '#2a2a28',
					},
					{
						step: 5,
						value: '#31312e',
					},
					{
						step: 6,
						value: '#3b3a37',
					},
					{
						step: 7,
						value: '#494844',
					},
					{
						step: 8,
						value: '#62605b',
					},
					{
						step: 9,
						value: '#6f6d66',
					},
					{
						step: 10,
						value: '#7c7b74',
					},
					{
						step: 11,
						value: '#b5b3ad',
					},
					{
						step: 12,
						value: '#eeeeec',
					},
				],
				light: [
					{
						step: 1,
						value: '#fdfdfc',
					},
					{
						step: 2,
						value: '#f9f9f8',
					},
					{
						step: 3,
						value: '#f1f0ef',
					},
					{
						step: 4,
						value: '#e9e8e6',
					},
					{
						step: 5,
						value: '#e2e1de',
					},
					{
						step: 6,
						value: '#dad9d6',
					},
					{
						step: 7,
						value: '#cfceca',
					},
					{
						step: 8,
						value: '#bcbbb5',
					},
					{
						step: 9,
						value: '#8d8d86',
					},
					{
						step: 10,
						value: '#82827c',
					},
					{
						step: 11,
						value: '#63635e',
					},
					{
						step: 12,
						value: '#21201c',
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
						value: 'hsl(60 89.8% 91.4% / 0.026)',
						step: 2,
						h: '60',
						s: '0.898',
						l: '0.914',
						a: ' 0.026',
					},
					{
						value: 'hsl(60 95.5% 92.5% / 0.056)',
						step: 3,
						h: '60',
						s: '0.955',
						l: '0.925',
						a: ' 0.056',
					},
					{
						value: 'hsl(60 75.6% 96.4% / 0.078)',
						step: 4,
						h: '60',
						s: '0.756',
						l: '0.964',
						a: ' 0.078',
					},
					{
						value: 'hsl(60 81.9% 95.2% / 0.104)',
						step: 5,
						h: '60',
						s: '0.819',
						l: '0.952',
						a: ' 0.104',
					},
					{
						value: 'hsl(41 87.6% 94.8% / 0.134)',
						step: 6,
						h: '41',
						s: '0.876',
						l: '0.948',
						a: ' 0.134',
					},
					{
						value: 'hsl(60 95.4% 96.2% / 0.172)',
						step: 7,
						h: '60',
						s: '0.954',
						l: '0.962',
						a: ' 0.172',
					},
					{
						value: 'hsl(49 93.5% 95.7% / 0.254)',
						step: 8,
						h: '6049',
						s: '0.935',
						l: '0.957',
						a: ' 0.254',
					},
					{
						value: 'hsl(52 97.3% 96.2% / 0.391)',
						step: 9,
						h: '52',
						s: '0.973',
						l: '0.962',
						a: ' 0.391',
					},
					{
						value: 'hsl(52 97.8% 96.7% / 0.451)',
						step: 10,
						h: '52',
						s: '0.976',
						l: '0.967',
						a: ' 0.451',
					},
					{
						value: 'hsl(51 97.0% 97.8% / 0.597)',
						step: 11,
						h: '51',
						s: '0.97',
						l: '0.978',
						a: ' 0.597',
					},
					{
						value: 'hsl(60 88.7% 99.8% / 0.923)',
						step: 12,
						h: '60',
						s: '0.887',
						l: '0.998',
						a: ' 0.923',
					},
				],
				lightAlpha: [
					{
						value: 'hsl(60 89.3% 18.3% / 0.012)',
						step: 1,
						h: '60',
						s: '0.89',
						l: '0.18',
						a: ' 0.012',
					},
					{
						value: 'hsl(60 78.1% 9.0% / 0.028)',
						step: 2,
						h: '60',
						s: '0.78',
						l: '0.09',
						a: ' 0.028',
					},
					{
						value: 'hsl(60 99.0% 3.9% / 0.051)',
						step: 3,
						h: '60',
						s: '0.99',
						l: '0.04',
						a: ' 0.051',
					},
					{
						value: 'hsl(60 88.9% 5.9% / 0.075)',
						step: 4,
						h: '60',
						s: '0.89',
						l: '0.06',
						a: ' 0.075',
					},
					{
						value: 'hsl(60 86.0% 6.9% / 0.099)',
						step: 5,
						h: '60',
						s: '0.86',
						l: '0.07',
						a: ' 0.099',
					},
					{
						value: 'hsl(60 93.2% 5.2% / 0.122)',
						step: 6,
						h: '60',
						s: '0.93',
						l: '0.05',
						a: ' 0.112',
					},
					{
						value: 'hsl(60 98.3% 5.1% / 0.157)',
						step: 7,
						h: '60',
						s: '0.98',
						l: '0.05',
						a: ' 0.157',
					},
					{
						value: 'hsl(51 94.1% 6.0% / 0.244)',
						step: 8,
						h: '51',
						s: '0.94',
						l: '0.06',
						a: ' 0.244',
					},
					{
						value: 'hsl(60 99.8% 1.7% / 0.451)',
						step: 9,
						h: '60',
						s: '0.99',
						l: '0.017',
						a: ' 0.451',
					},
					{
						value: 'hsl(60 90.7% 1.8% / 0.491)',
						step: 10,
						h: '60',
						s: '0.91',
						l: '0.018',
						a: ' 0.491',
					},
					{
						value: 'hsl(45 93.7% 1.5% / 0.577)',
						step: 11,
						h: '45',
						s: '0.94',
						l: '0.015',
						a: ' 0.577',
					},
					{
						value: 'hsl(60 98.0% 0.7% / 0.906)',
						step: 12,
						h: '60',
						s: '0.98',
						l: '0.007',
						a: ' 0.906',
					},
				],
				onWcag: '#000000',
			},
		],
	});
});

window.radixColor = {
	color: {
		amber: {
			amber1: {
				value: 'hsl(39, 70.0%, 99.0%)',
				type: 'color',
			},
			amber2: {
				value: 'hsl(40, 100%, 96.5%)',
				type: 'color',
			},
			amber3: {
				value: 'hsl(44, 100%, 91.7%)',
				type: 'color',
			},
			amber4: {
				value: 'hsl(43, 100%, 86.8%)',
				type: 'color',
			},
			amber5: {
				value: 'hsl(42, 100%, 81.8%)',
				type: 'color',
			},
			amber6: {
				value: 'hsl(38, 99.7%, 76.3%)',
				type: 'color',
			},
			amber7: {
				value: 'hsl(36, 86.1%, 67.1%)',
				type: 'color',
			},
			amber8: {
				value: 'hsl(35, 85.2%, 55.1%)',
				type: 'color',
			},
			amber9: {
				value: 'hsl(39, 100%, 57.0%)',
				type: 'color',
			},
			amber10: {
				value: 'hsl(35, 100%, 55.5%)',
				type: 'color',
			},
			amber11: {
				value: 'hsl(30, 100%, 34.0%)',
				type: 'color',
			},
			amber12: {
				value: 'hsl(20, 80.0%, 17.0%)',
				type: 'color',
			},
		},
		amberA: {
			amberA1: {
				value: 'hsla(40, 94.9%, 38.7%, 0.016)',
				type: 'color',
			},
			amberA2: {
				value: 'hsla(40, 100%, 50.3%, 0.071)',
				type: 'color',
			},
			amberA3: {
				value: 'hsla(44, 100%, 50.1%, 0.165)',
				type: 'color',
			},
			amberA4: {
				value: 'hsla(43, 100%, 50.0%, 0.263)',
				type: 'color',
			},
			amberA5: {
				value: 'hsla(42, 100%, 50.0%, 0.365)',
				type: 'color',
			},
			amberA6: {
				value: 'hsla(38, 100%, 50.1%, 0.475)',
				type: 'color',
			},
			amberA7: {
				value: 'hsla(36, 99.9%, 46.2%, 0.612)',
				type: 'color',
			},
			amberA8: {
				value: 'hsla(35, 99.8%, 46.0%, 0.832)',
				type: 'color',
			},
			amberA9: {
				value: 'hsla(39, 100%, 50.0%, 0.859)',
				type: 'color',
			},
			amberA10: {
				value: 'hsla(35, 100%, 50.0%, 0.891)',
				type: 'color',
			},
			amberA11: {
				value: 'hsla(29, 100%, 33.6%, 0.980)',
				type: 'color',
			},
			amberA12: {
				value: 'hsla(20, 99.8%, 14.1%, 0.965)',
				type: 'color',
			},
		},
		amberDark: {
			amber1: {
				value: 'hsl(36, 100%, 6.1%)',
				type: 'color',
			},
			amber2: {
				value: 'hsl(35, 100%, 7.6%)',
				type: 'color',
			},
			amber3: {
				value: 'hsl(32, 100%, 10.2%)',
				type: 'color',
			},
			amber4: {
				value: 'hsl(32, 100%, 12.4%)',
				type: 'color',
			},
			amber5: {
				value: 'hsl(33, 100%, 14.6%)',
				type: 'color',
			},
			amber6: {
				value: 'hsl(35, 100%, 17.1%)',
				type: 'color',
			},
			amber7: {
				value: 'hsl(35, 91.0%, 21.6%)',
				type: 'color',
			},
			amber8: {
				value: 'hsl(36, 100%, 25.5%)',
				type: 'color',
			},
			amber9: {
				value: 'hsl(39, 100%, 57.0%)',
				type: 'color',
			},
			amber10: {
				value: 'hsl(43, 100%, 64.0%)',
				type: 'color',
			},
			amber11: {
				value: 'hsl(39, 90.0%, 49.8%)',
				type: 'color',
			},
			amber12: {
				value: 'hsl(39, 97.0%, 93.2%)',
				type: 'color',
			},
		},
		amberDarkA: {
			amberA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			amberA2: {
				value: 'hsla(31, 100%, 49.7%, 0.036)',
				type: 'color',
			},
			amberA3: {
				value: 'hsla(27, 100%, 49.9%, 0.094)',
				type: 'color',
			},
			amberA4: {
				value: 'hsla(29, 100%, 50.0%, 0.143)',
				type: 'color',
			},
			amberA5: {
				value: 'hsla(31, 100%, 50.0%, 0.192)',
				type: 'color',
			},
			amberA6: {
				value: 'hsla(35, 100%, 50.0%, 0.250)',
				type: 'color',
			},
			amberA7: {
				value: 'hsla(34, 99.6%, 52.9%, 0.331)',
				type: 'color',
			},
			amberA8: {
				value: 'hsla(36, 100%, 50.0%, 0.442)',
				type: 'color',
			},
			amberA9: {
				value: 'hsla(40, 100%, 57.2%, 0.980)',
				type: 'color',
			},
			amberA10: {
				value: 'hsla(44, 100%, 64.2%, 0.980)',
				type: 'color',
			},
			amberA11: {
				value: 'hsla(39, 99.9%, 52.7%, 0.938)',
				type: 'color',
			},
			amberA12: {
				value: 'hsla(45, 100%, 94.2%, 0.980)',
				type: 'color',
			},
		},
		blackA: {
			blackA1: {
				value: 'hsla(0, 0%, 0%, 0.012)',
				type: 'color',
			},
			blackA2: {
				value: 'hsla(0, 0%, 0%, 0.027)',
				type: 'color',
			},
			blackA3: {
				value: 'hsla(0, 0%, 0%, 0.047)',
				type: 'color',
			},
			blackA4: {
				value: 'hsla(0, 0%, 0%, 0.071)',
				type: 'color',
			},
			blackA5: {
				value: 'hsla(0, 0%, 0%, 0.090)',
				type: 'color',
			},
			blackA6: {
				value: 'hsla(0, 0%, 0%, 0.114)',
				type: 'color',
			},
			blackA7: {
				value: 'hsla(0, 0%, 0%, 0.141)',
				type: 'color',
			},
			blackA8: {
				value: 'hsla(0, 0%, 0%, 0.220)',
				type: 'color',
			},
			blackA9: {
				value: 'hsla(0, 0%, 0%, 0.439)',
				type: 'color',
			},
			blackA10: {
				value: 'hsla(0, 0%, 0%, 0.478)',
				type: 'color',
			},
			blackA11: {
				value: 'hsla(0, 0%, 0%, 0.565)',
				type: 'color',
			},
			blackA12: {
				value: 'hsla(0, 0%, 0%, 0.910)',
				type: 'color',
			},
		},
		blue: {
			blue1: {
				value: 'hsl(206, 100%, 99.2%)',
				type: 'color',
			},
			blue2: {
				value: 'hsl(210, 100%, 98.0%)',
				type: 'color',
			},
			blue3: {
				value: 'hsl(209, 100%, 96.5%)',
				type: 'color',
			},
			blue4: {
				value: 'hsl(210, 98.8%, 94.0%)',
				type: 'color',
			},
			blue5: {
				value: 'hsl(209, 95.0%, 90.1%)',
				type: 'color',
			},
			blue6: {
				value: 'hsl(209, 81.2%, 84.5%)',
				type: 'color',
			},
			blue7: {
				value: 'hsl(208, 77.5%, 76.9%)',
				type: 'color',
			},
			blue8: {
				value: 'hsl(206, 81.9%, 65.3%)',
				type: 'color',
			},
			blue9: {
				value: 'hsl(206, 100%, 50.0%)',
				type: 'color',
			},
			blue10: {
				value: 'hsl(208, 100%, 47.3%)',
				type: 'color',
			},
			blue11: {
				value: 'hsl(211, 100%, 43.2%)',
				type: 'color',
			},
			blue12: {
				value: 'hsl(211, 100%, 15.0%)',
				type: 'color',
			},
		},
		blueA: {
			blueA1: {
				value: 'hsla(210, 100%, 51.0%, 0.016)',
				type: 'color',
			},
			blueA2: {
				value: 'hsla(210, 100%, 51.0%, 0.040)',
				type: 'color',
			},
			blueA3: {
				value: 'hsla(210, 100%, 50.3%, 0.071)',
				type: 'color',
			},
			blueA4: {
				value: 'hsla(210, 100%, 50.1%, 0.118)',
				type: 'color',
			},
			blueA5: {
				value: 'hsla(208, 99.1%, 47.1%, 0.189)',
				type: 'color',
			},
			blueA6: {
				value: 'hsla(209, 99.5%, 45.3%, 0.283)',
				type: 'color',
			},
			blueA7: {
				value: 'hsla(208, 99.9%, 43.8%, 0.412)',
				type: 'color',
			},
			blueA8: {
				value: 'hsla(206, 99.8%, 45.1%, 0.632)',
				type: 'color',
			},
			blueA9: {
				value: 'hsla(206, 100%, 50.0%, 0.980)',
				type: 'color',
			},
			blueA10: {
				value: 'hsla(208, 100%, 47.2%, 0.980)',
				type: 'color',
			},
			blueA11: {
				value: 'hsla(212, 100%, 43.0%, 0.980)',
				type: 'color',
			},
			blueA12: {
				value: 'hsla(213, 100%, 14.4%, 0.980)',
				type: 'color',
			},
		},
		blueDark: {
			blue1: {
				value: 'hsl(212, 35.0%, 9.2%)',
				type: 'color',
			},
			blue2: {
				value: 'hsl(216, 50.0%, 11.8%)',
				type: 'color',
			},
			blue3: {
				value: 'hsl(214, 59.4%, 15.3%)',
				type: 'color',
			},
			blue4: {
				value: 'hsl(214, 65.8%, 17.9%)',
				type: 'color',
			},
			blue5: {
				value: 'hsl(213, 71.2%, 20.2%)',
				type: 'color',
			},
			blue6: {
				value: 'hsl(212, 77.4%, 23.1%)',
				type: 'color',
			},
			blue7: {
				value: 'hsl(211, 85.1%, 27.4%)',
				type: 'color',
			},
			blue8: {
				value: 'hsl(211, 89.7%, 34.1%)',
				type: 'color',
			},
			blue9: {
				value: 'hsl(206, 100%, 50.0%)',
				type: 'color',
			},
			blue10: {
				value: 'hsl(209, 100%, 60.6%)',
				type: 'color',
			},
			blue11: {
				value: 'hsl(210, 100%, 66.1%)',
				type: 'color',
			},
			blue12: {
				value: 'hsl(206, 98.0%, 95.8%)',
				type: 'color',
			},
		},
		blueDarkA: {
			blueA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			blueA2: {
				value: 'hsla(221, 97.8%, 52.4%, 0.059)',
				type: 'color',
			},
			blueA3: {
				value: 'hsla(215, 99.3%, 54.2%, 0.135)',
				type: 'color',
			},
			blueA4: {
				value: 'hsla(215, 99.3%, 53.8%, 0.198)',
				type: 'color',
			},
			blueA5: {
				value: 'hsla(213, 99.4%, 52.8%, 0.252)',
				type: 'color',
			},
			blueA6: {
				value: 'hsla(212, 99.9%, 51.7%, 0.323)',
				type: 'color',
			},
			blueA7: {
				value: 'hsla(211, 100%, 50.7%, 0.435)',
				type: 'color',
			},
			blueA8: {
				value: 'hsla(211, 99.8%, 50.9%, 0.597)',
				type: 'color',
			},
			blueA9: {
				value: 'hsla(205, 100%, 50.0%, 0.980)',
				type: 'color',
			},
			blueA10: {
				value: 'hsla(208, 100%, 60.7%, 0.980)',
				type: 'color',
			},
			blueA11: {
				value: 'hsla(209, 100%, 66.3%, 0.980)',
				type: 'color',
			},
			blueA12: {
				value: 'hsla(196, 100%, 96.8%, 0.980)',
				type: 'color',
			},
		},
		bronze: {
			bronze1: {
				value: 'hsl(15, 30.0%, 99.1%)',
				type: 'color',
			},
			bronze2: {
				value: 'hsl(17, 63.6%, 97.8%)',
				type: 'color',
			},
			bronze3: {
				value: 'hsl(17, 42.1%, 95.2%)',
				type: 'color',
			},
			bronze4: {
				value: 'hsl(17, 35.2%, 92.1%)',
				type: 'color',
			},
			bronze5: {
				value: 'hsl(17, 31.5%, 88.2%)',
				type: 'color',
			},
			bronze6: {
				value: 'hsl(17, 29.0%, 83.0%)',
				type: 'color',
			},
			bronze7: {
				value: 'hsl(17, 26.9%, 75.6%)',
				type: 'color',
			},
			bronze8: {
				value: 'hsl(17, 25.1%, 66.5%)',
				type: 'color',
			},
			bronze9: {
				value: 'hsl(17, 20.0%, 54.0%)',
				type: 'color',
			},
			bronze10: {
				value: 'hsl(17, 18.1%, 50.1%)',
				type: 'color',
			},
			bronze11: {
				value: 'hsl(15, 20.0%, 43.1%)',
				type: 'color',
			},
			bronze12: {
				value: 'hsl(12, 22.0%, 21.5%)',
				type: 'color',
			},
		},
		bronzeA: {
			bronzeA1: {
				value: 'hsla(0, 89.3%, 18.3%, 0.012)',
				type: 'color',
			},
			bronzeA2: {
				value: 'hsla(17, 95.1%, 40.1%, 0.036)',
				type: 'color',
			},
			bronzeA3: {
				value: 'hsla(18, 98.3%, 29.8%, 0.067)',
				type: 'color',
			},
			bronzeA4: {
				value: 'hsla(17, 99.6%, 26.0%, 0.106)',
				type: 'color',
			},
			bronzeA5: {
				value: 'hsla(19, 99.6%, 23.8%, 0.157)',
				type: 'color',
			},
			bronzeA6: {
				value: 'hsla(17, 99.2%, 22.5%, 0.220)',
				type: 'color',
			},
			bronzeA7: {
				value: 'hsla(18, 99.7%, 21.6%, 0.310)',
				type: 'color',
			},
			bronzeA8: {
				value: 'hsla(17, 99.5%, 20.2%, 0.420)',
				type: 'color',
			},
			bronzeA9: {
				value: 'hsla(18, 99.9%, 16.7%, 0.553)',
				type: 'color',
			},
			bronzeA10: {
				value: 'hsla(17, 99.2%, 15.4%, 0.589)',
				type: 'color',
			},
			bronzeA11: {
				value: 'hsla(15, 99.9%, 13.2%, 0.655)',
				type: 'color',
			},
			bronzeA12: {
				value: 'hsla(12, 98.7%, 5.7%, 0.832)',
				type: 'color',
			},
		},
		bronzeDark: {
			bronze1: {
				value: 'hsl(17, 10.0%, 8.8%)',
				type: 'color',
			},
			bronze2: {
				value: 'hsl(15, 14.8%, 10.6%)',
				type: 'color',
			},
			bronze3: {
				value: 'hsl(15, 16.3%, 14.3%)',
				type: 'color',
			},
			bronze4: {
				value: 'hsl(16, 17.1%, 17.2%)',
				type: 'color',
			},
			bronze5: {
				value: 'hsl(16, 17.6%, 19.6%)',
				type: 'color',
			},
			bronze6: {
				value: 'hsl(16, 18.1%, 22.9%)',
				type: 'color',
			},
			bronze7: {
				value: 'hsl(17, 18.8%, 28.8%)',
				type: 'color',
			},
			bronze8: {
				value: 'hsl(17, 19.6%, 38.0%)',
				type: 'color',
			},
			bronze9: {
				value: 'hsl(17, 20.0%, 54.0%)',
				type: 'color',
			},
			bronze10: {
				value: 'hsl(18, 24.0%, 59.0%)',
				type: 'color',
			},
			bronze11: {
				value: 'hsl(18, 35.0%, 68.5%)',
				type: 'color',
			},
			bronze12: {
				value: 'hsl(18, 57.0%, 94.1%)',
				type: 'color',
			},
		},
		bronzeDarkA: {
			bronzeA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			bronzeA2: {
				value: 'hsla(20, 88.2%, 74.2%, 0.027)',
				type: 'color',
			},
			bronzeA3: {
				value: 'hsla(10, 99.4%, 83.0%, 0.074)',
				type: 'color',
			},
			bronzeA4: {
				value: 'hsla(18, 96.0%, 81.1%, 0.114)',
				type: 'color',
			},
			bronzeA5: {
				value: 'hsla(18, 99.4%, 81.7%, 0.148)',
				type: 'color',
			},
			bronzeA6: {
				value: 'hsla(15, 98.1%, 82.4%, 0.192)',
				type: 'color',
			},
			bronzeA7: {
				value: 'hsla(16, 99.2%, 82.9%, 0.270)',
				type: 'color',
			},
			bronzeA8: {
				value: 'hsla(18, 99.5%, 82.6%, 0.396)',
				type: 'color',
			},
			bronzeA9: {
				value: 'hsla(18, 99.3%, 85.0%, 0.592)',
				type: 'color',
			},
			bronzeA10: {
				value: 'hsla(18, 99.6%, 85.2%, 0.657)',
				type: 'color',
			},
			bronzeA11: {
				value: 'hsla(17, 99.9%, 86.1%, 0.774)',
				type: 'color',
			},
			bronzeA12: {
				value: 'hsla(20, 99.8%, 96.4%, 0.974)',
				type: 'color',
			},
		},
		brown: {
			brown1: {
				value: 'hsl(30, 40.0%, 99.1%)',
				type: 'color',
			},
			brown2: {
				value: 'hsl(30, 50.0%, 97.6%)',
				type: 'color',
			},
			brown3: {
				value: 'hsl(30, 52.5%, 94.6%)',
				type: 'color',
			},
			brown4: {
				value: 'hsl(30, 53.0%, 91.2%)',
				type: 'color',
			},
			brown5: {
				value: 'hsl(29, 52.9%, 86.8%)',
				type: 'color',
			},
			brown6: {
				value: 'hsl(29, 52.5%, 80.9%)',
				type: 'color',
			},
			brown7: {
				value: 'hsl(29, 51.5%, 72.8%)',
				type: 'color',
			},
			brown8: {
				value: 'hsl(28, 50.0%, 63.1%)',
				type: 'color',
			},
			brown9: {
				value: 'hsl(28, 34.0%, 51.0%)',
				type: 'color',
			},
			brown10: {
				value: 'hsl(27, 31.8%, 47.6%)',
				type: 'color',
			},
			brown11: {
				value: 'hsl(25, 30.0%, 41.0%)',
				type: 'color',
			},
			brown12: {
				value: 'hsl(20, 30.0%, 19.0%)',
				type: 'color',
			},
		},
		brownA: {
			brownA1: {
				value: 'hsla(30, 94.3%, 34.6%, 0.012)',
				type: 'color',
			},
			brownA2: {
				value: 'hsla(30, 94.3%, 34.6%, 0.036)',
				type: 'color',
			},
			brownA3: {
				value: 'hsla(30, 97.7%, 33.9%, 0.083)',
				type: 'color',
			},
			brownA4: {
				value: 'hsla(31, 98.5%, 34.2%, 0.134)',
				type: 'color',
			},
			brownA5: {
				value: 'hsla(29, 100%, 34.3%, 0.200)',
				type: 'color',
			},
			brownA6: {
				value: 'hsla(28, 99.2%, 34.6%, 0.291)',
				type: 'color',
			},
			brownA7: {
				value: 'hsla(29, 99.8%, 33.8%, 0.412)',
				type: 'color',
			},
			brownA8: {
				value: 'hsla(28, 100%, 33.3%, 0.553)',
				type: 'color',
			},
			brownA9: {
				value: 'hsla(28, 99.9%, 25.5%, 0.655)',
				type: 'color',
			},
			brownA10: {
				value: 'hsla(27, 99.7%, 22.4%, 0.675)',
				type: 'color',
			},
			brownA11: {
				value: 'hsla(25, 99.8%, 17.3%, 0.714)',
				type: 'color',
			},
			brownA12: {
				value: 'hsla(21, 99.4%, 6.6%, 0.867)',
				type: 'color',
			},
		},
		brownDark: {
			brown1: {
				value: 'hsl(22, 15.0%, 8.7%)',
				type: 'color',
			},
			brown2: {
				value: 'hsl(20, 28.3%, 10.4%)',
				type: 'color',
			},
			brown3: {
				value: 'hsl(20, 28.0%, 14.0%)',
				type: 'color',
			},
			brown4: {
				value: 'hsl(21, 28.4%, 16.5%)',
				type: 'color',
			},
			brown5: {
				value: 'hsl(22, 28.7%, 18.9%)',
				type: 'color',
			},
			brown6: {
				value: 'hsl(23, 29.0%, 22.3%)',
				type: 'color',
			},
			brown7: {
				value: 'hsl(25, 29.5%, 27.8%)',
				type: 'color',
			},
			brown8: {
				value: 'hsl(27, 30.1%, 35.9%)',
				type: 'color',
			},
			brown9: {
				value: 'hsl(28, 34.0%, 51.0%)',
				type: 'color',
			},
			brown10: {
				value: 'hsl(28, 41.4%, 55.8%)',
				type: 'color',
			},
			brown11: {
				value: 'hsl(28, 60.0%, 64.5%)',
				type: 'color',
			},
			brown12: {
				value: 'hsl(30, 67.0%, 94.0%)',
				type: 'color',
			},
		},
		brownDarkA: {
			brownA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			brownA2: {
				value: 'hsla(22, 99.6%, 53.6%, 0.035)',
				type: 'color',
			},
			brownA3: {
				value: 'hsla(18, 97.8%, 69.0%, 0.088)',
				type: 'color',
			},
			brownA4: {
				value: 'hsla(21, 98.2%, 71.0%, 0.123)',
				type: 'color',
			},
			brownA5: {
				value: 'hsla(25, 98.4%, 72.1%, 0.158)',
				type: 'color',
			},
			brownA6: {
				value: 'hsla(25, 98.7%, 73.5%, 0.206)',
				type: 'color',
			},
			brownA7: {
				value: 'hsla(25, 99.0%, 74.6%, 0.289)',
				type: 'color',
			},
			brownA8: {
				value: 'hsla(28, 99.2%, 75.3%, 0.407)',
				type: 'color',
			},
			brownA9: {
				value: 'hsla(28, 100%, 74.8%, 0.642)',
				type: 'color',
			},
			brownA10: {
				value: 'hsla(28, 99.9%, 74.9%, 0.712)',
				type: 'color',
			},
			brownA11: {
				value: 'hsla(28, 99.9%, 74.9%, 0.843)',
				type: 'color',
			},
			brownA12: {
				value: 'hsla(32, 98.2%, 95.7%, 0.979)',
				type: 'color',
			},
		},
		crimson: {
			crimson1: {
				value: 'hsl(332, 100%, 99.4%)',
				type: 'color',
			},
			crimson2: {
				value: 'hsl(330, 100%, 98.4%)',
				type: 'color',
			},
			crimson3: {
				value: 'hsl(331, 85.6%, 96.6%)',
				type: 'color',
			},
			crimson4: {
				value: 'hsl(331, 78.1%, 94.2%)',
				type: 'color',
			},
			crimson5: {
				value: 'hsl(332, 72.1%, 91.1%)',
				type: 'color',
			},
			crimson6: {
				value: 'hsl(333, 67.0%, 86.7%)',
				type: 'color',
			},
			crimson7: {
				value: 'hsl(335, 63.5%, 80.4%)',
				type: 'color',
			},
			crimson8: {
				value: 'hsl(336, 62.3%, 72.9%)',
				type: 'color',
			},
			crimson9: {
				value: 'hsl(336, 80.0%, 57.8%)',
				type: 'color',
			},
			crimson10: {
				value: 'hsl(336, 73.7%, 53.5%)',
				type: 'color',
			},
			crimson11: {
				value: 'hsl(336, 75.0%, 47.2%)',
				type: 'color',
			},
			crimson12: {
				value: 'hsl(340, 65.0%, 14.5%)',
				type: 'color',
			},
		},
		crimsonA: {
			crimsonA1: {
				value: 'hsla(340, 100%, 51.0%, 0.012)',
				type: 'color',
			},
			crimsonA2: {
				value: 'hsla(330, 100%, 51.0%, 0.032)',
				type: 'color',
			},
			crimsonA3: {
				value: 'hsla(332, 99.1%, 47.1%, 0.063)',
				type: 'color',
			},
			crimsonA4: {
				value: 'hsla(331, 99.9%, 44.3%, 0.102)',
				type: 'color',
			},
			crimsonA5: {
				value: 'hsla(333, 99.9%, 42.3%, 0.153)',
				type: 'color',
			},
			crimsonA6: {
				value: 'hsla(333, 99.5%, 40.5%, 0.224)',
				type: 'color',
			},
			crimsonA7: {
				value: 'hsla(335, 99.7%, 39.1%, 0.322)',
				type: 'color',
			},
			crimsonA8: {
				value: 'hsla(336, 99.5%, 38.5%, 0.440)',
				type: 'color',
			},
			crimsonA9: {
				value: 'hsla(336, 99.9%, 44.3%, 0.761)',
				type: 'color',
			},
			crimsonA10: {
				value: 'hsla(336, 100%, 42.5%, 0.808)',
				type: 'color',
			},
			crimsonA11: {
				value: 'hsla(336, 99.8%, 40.3%, 0.883)',
				type: 'color',
			},
			crimsonA12: {
				value: 'hsla(340, 99.0%, 10.0%, 0.950)',
				type: 'color',
			},
		},
		crimsonDark: {
			crimson1: {
				value: 'hsl(335, 20.0%, 9.6%)',
				type: 'color',
			},
			crimson2: {
				value: 'hsl(335, 32.2%, 11.6%)',
				type: 'color',
			},
			crimson3: {
				value: 'hsl(335, 42.5%, 16.5%)',
				type: 'color',
			},
			crimson4: {
				value: 'hsl(335, 47.2%, 19.3%)',
				type: 'color',
			},
			crimson5: {
				value: 'hsl(335, 50.9%, 21.8%)',
				type: 'color',
			},
			crimson6: {
				value: 'hsl(335, 55.7%, 25.3%)',
				type: 'color',
			},
			crimson7: {
				value: 'hsl(336, 62.9%, 30.8%)',
				type: 'color',
			},
			crimson8: {
				value: 'hsl(336, 74.9%, 39.0%)',
				type: 'color',
			},
			crimson9: {
				value: 'hsl(336, 80.0%, 57.8%)',
				type: 'color',
			},
			crimson10: {
				value: 'hsl(339, 84.1%, 62.6%)',
				type: 'color',
			},
			crimson11: {
				value: 'hsl(341, 90.0%, 67.3%)',
				type: 'color',
			},
			crimson12: {
				value: 'hsl(332, 87.0%, 96.0%)',
				type: 'color',
			},
		},
		crimsonDarkA: {
			crimsonA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			crimsonA2: {
				value: 'hsla(336, 96.8%, 53.2%, 0.045)',
				type: 'color',
			},
			crimsonA3: {
				value: 'hsla(335, 98.7%, 59.3%, 0.138)',
				type: 'color',
			},
			crimsonA4: {
				value: 'hsla(336, 99.1%, 59.9%, 0.191)',
				type: 'color',
			},
			crimsonA5: {
				value: 'hsla(335, 99.4%, 59.4%, 0.244)',
				type: 'color',
			},
			crimsonA6: {
				value: 'hsla(335, 99.4%, 59.4%, 0.315)',
				type: 'color',
			},
			crimsonA7: {
				value: 'hsla(336, 99.5%, 57.8%, 0.439)',
				type: 'color',
			},
			crimsonA8: {
				value: 'hsla(336, 99.9%, 55.4%, 0.642)',
				type: 'color',
			},
			crimsonA9: {
				value: 'hsla(336, 99.9%, 62.8%, 0.903)',
				type: 'color',
			},
			crimsonA10: {
				value: 'hsla(339, 99.9%, 66.3%, 0.934)',
				type: 'color',
			},
			crimsonA11: {
				value: 'hsla(341, 99.9%, 69.5%, 0.965)',
				type: 'color',
			},
			crimsonA12: {
				value: 'hsla(327, 100%, 97.1%, 0.980)',
				type: 'color',
			},
		},
		cyan: {
			cyan1: {
				value: 'hsl(185, 60.0%, 98.7%)',
				type: 'color',
			},
			cyan2: {
				value: 'hsl(185, 73.3%, 97.1%)',
				type: 'color',
			},
			cyan3: {
				value: 'hsl(186, 70.2%, 94.4%)',
				type: 'color',
			},
			cyan4: {
				value: 'hsl(186, 63.8%, 90.6%)',
				type: 'color',
			},
			cyan5: {
				value: 'hsl(187, 58.3%, 85.4%)',
				type: 'color',
			},
			cyan6: {
				value: 'hsl(188, 54.6%, 78.4%)',
				type: 'color',
			},
			cyan7: {
				value: 'hsl(189, 53.7%, 68.7%)',
				type: 'color',
			},
			cyan8: {
				value: 'hsl(189, 60.3%, 52.5%)',
				type: 'color',
			},
			cyan9: {
				value: 'hsl(190, 95.0%, 39.0%)',
				type: 'color',
			},
			cyan10: {
				value: 'hsl(191, 91.2%, 36.8%)',
				type: 'color',
			},
			cyan11: {
				value: 'hsl(192, 85.0%, 31.0%)',
				type: 'color',
			},
			cyan12: {
				value: 'hsl(192, 88.0%, 12.5%)',
				type: 'color',
			},
		},
		cyanA: {
			cyanA1: {
				value: 'hsla(195, 95.2%, 41.2%, 0.020)',
				type: 'color',
			},
			cyanA2: {
				value: 'hsla(185, 99.9%, 42.3%, 0.051)',
				type: 'color',
			},
			cyanA3: {
				value: 'hsla(186, 97.8%, 42.2%, 0.095)',
				type: 'color',
			},
			cyanA4: {
				value: 'hsla(186, 99.9%, 38.5%, 0.153)',
				type: 'color',
			},
			cyanA5: {
				value: 'hsla(187, 99.3%, 36.6%, 0.232)',
				type: 'color',
			},
			cyanA6: {
				value: 'hsla(188, 99.4%, 35.4%, 0.334)',
				type: 'color',
			},
			cyanA7: {
				value: 'hsla(189, 99.6%, 35.0%, 0.483)',
				type: 'color',
			},
			cyanA8: {
				value: 'hsla(189, 99.9%, 37.6%, 0.761)',
				type: 'color',
			},
			cyanA9: {
				value: 'hsla(190, 100%, 37.8%, 0.980)',
				type: 'color',
			},
			cyanA10: {
				value: 'hsla(191, 99.9%, 34.6%, 0.969)',
				type: 'color',
			},
			cyanA11: {
				value: 'hsla(192, 100%, 27.6%, 0.953)',
				type: 'color',
			},
			cyanA12: {
				value: 'hsla(192, 100%, 11.0%, 0.980)',
				type: 'color',
			},
		},
		cyanDark: {
			cyan1: {
				value: 'hsl(192, 60.0%, 7.2%)',
				type: 'color',
			},
			cyan2: {
				value: 'hsl(192, 71.4%, 8.2%)',
				type: 'color',
			},
			cyan3: {
				value: 'hsl(192, 75.9%, 10.8%)',
				type: 'color',
			},
			cyan4: {
				value: 'hsl(192, 79.3%, 12.8%)',
				type: 'color',
			},
			cyan5: {
				value: 'hsl(192, 82.5%, 14.6%)',
				type: 'color',
			},
			cyan6: {
				value: 'hsl(192, 86.6%, 16.9%)',
				type: 'color',
			},
			cyan7: {
				value: 'hsl(192, 92.6%, 20.1%)',
				type: 'color',
			},
			cyan8: {
				value: 'hsl(192, 100%, 24.5%)',
				type: 'color',
			},
			cyan9: {
				value: 'hsl(190, 95.0%, 39.0%)',
				type: 'color',
			},
			cyan10: {
				value: 'hsl(188, 100%, 40.0%)',
				type: 'color',
			},
			cyan11: {
				value: 'hsl(186, 100%, 42.2%)',
				type: 'color',
			},
			cyan12: {
				value: 'hsl(185, 73.0%, 93.2%)',
				type: 'color',
			},
		},
		cyanDarkA: {
			cyanA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			cyanA2: {
				value: 'hsla(196, 100%, 50.0%, 0.031)',
				type: 'color',
			},
			cyanA3: {
				value: 'hsla(192, 98.0%, 50.9%, 0.085)',
				type: 'color',
			},
			cyanA4: {
				value: 'hsla(194, 99.6%, 51.3%, 0.133)',
				type: 'color',
			},
			cyanA5: {
				value: 'hsla(192, 99.5%, 51.3%, 0.173)',
				type: 'color',
			},
			cyanA6: {
				value: 'hsla(193, 99.7%, 50.4%, 0.226)',
				type: 'color',
			},
			cyanA7: {
				value: 'hsla(192, 100%, 50.0%, 0.310)',
				type: 'color',
			},
			cyanA8: {
				value: 'hsla(193, 100%, 50.0%, 0.425)',
				type: 'color',
			},
			cyanA9: {
				value: 'hsla(190, 99.8%, 50.8%, 0.731)',
				type: 'color',
			},
			cyanA10: {
				value: 'hsla(188, 100%, 50.0%, 0.775)',
				type: 'color',
			},
			cyanA11: {
				value: 'hsla(186, 100%, 49.9%, 0.824)',
				type: 'color',
			},
			cyanA12: {
				value: 'hsla(185, 99.8%, 95.1%, 0.978)',
				type: 'color',
			},
		},
		gold: {
			gold1: {
				value: 'hsl(50, 20.0%, 99.1%)',
				type: 'color',
			},
			gold2: {
				value: 'hsl(47, 52.9%, 96.7%)',
				type: 'color',
			},
			gold3: {
				value: 'hsl(46, 38.2%, 93.7%)',
				type: 'color',
			},
			gold4: {
				value: 'hsl(44, 32.7%, 90.1%)',
				type: 'color',
			},
			gold5: {
				value: 'hsl(43, 29.9%, 85.7%)',
				type: 'color',
			},
			gold6: {
				value: 'hsl(41, 28.3%, 79.8%)',
				type: 'color',
			},
			gold7: {
				value: 'hsl(39, 27.6%, 71.9%)',
				type: 'color',
			},
			gold8: {
				value: 'hsl(36, 27.2%, 61.8%)',
				type: 'color',
			},
			gold9: {
				value: 'hsl(36, 20.0%, 49.5%)',
				type: 'color',
			},
			gold10: {
				value: 'hsl(36, 19.8%, 45.7%)',
				type: 'color',
			},
			gold11: {
				value: 'hsl(36, 20.0%, 39.0%)',
				type: 'color',
			},
			gold12: {
				value: 'hsl(36, 16.0%, 20.0%)',
				type: 'color',
			},
		},
		goldA: {
			goldA1: {
				value: 'hsla(60, 89.3%, 18.3%, 0.012)',
				type: 'color',
			},
			goldA2: {
				value: 'hsla(47, 99.9%, 34.6%, 0.051)',
				type: 'color',
			},
			goldA3: {
				value: 'hsla(45, 97.0%, 27.9%, 0.087)',
				type: 'color',
			},
			goldA4: {
				value: 'hsla(46, 98.0%, 25.4%, 0.134)',
				type: 'color',
			},
			goldA5: {
				value: 'hsla(43, 98.4%, 22.6%, 0.185)',
				type: 'color',
			},
			goldA6: {
				value: 'hsla(41, 99.7%, 22.0%, 0.259)',
				type: 'color',
			},
			goldA7: {
				value: 'hsla(38, 99.8%, 21.5%, 0.357)',
				type: 'color',
			},
			goldA8: {
				value: 'hsla(36, 99.3%, 21.5%, 0.487)',
				type: 'color',
			},
			goldA9: {
				value: 'hsla(36, 99.9%, 16.2%, 0.604)',
				type: 'color',
			},
			goldA10: {
				value: 'hsla(36, 99.2%, 14.6%, 0.636)',
				type: 'color',
			},
			goldA11: {
				value: 'hsla(35, 99.1%, 11.2%, 0.687)',
				type: 'color',
			},
			goldA12: {
				value: 'hsla(38, 98.0%, 3.8%, 0.832)',
				type: 'color',
			},
		},
		goldDark: {
			gold1: {
				value: 'hsl(44, 9.0%, 8.3%)',
				type: 'color',
			},
			gold2: {
				value: 'hsl(43, 14.3%, 9.6%)',
				type: 'color',
			},
			gold3: {
				value: 'hsl(42, 15.5%, 13.0%)',
				type: 'color',
			},
			gold4: {
				value: 'hsl(41, 16.4%, 15.6%)',
				type: 'color',
			},
			gold5: {
				value: 'hsl(41, 16.9%, 17.8%)',
				type: 'color',
			},
			gold6: {
				value: 'hsl(40, 17.6%, 20.8%)',
				type: 'color',
			},
			gold7: {
				value: 'hsl(38, 18.5%, 26.4%)',
				type: 'color',
			},
			gold8: {
				value: 'hsl(36, 19.6%, 35.1%)',
				type: 'color',
			},
			gold9: {
				value: 'hsl(36, 20.0%, 49.5%)',
				type: 'color',
			},
			gold10: {
				value: 'hsl(36, 22.3%, 54.5%)',
				type: 'color',
			},
			gold11: {
				value: 'hsl(35, 30.0%, 64.0%)',
				type: 'color',
			},
			gold12: {
				value: 'hsl(49, 52.0%, 93.8%)',
				type: 'color',
			},
		},
		goldDarkA: {
			goldA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			goldA2: {
				value: 'hsla(40, 93.7%, 70.6%, 0.022)',
				type: 'color',
			},
			goldA3: {
				value: 'hsla(40, 97.5%, 80.6%, 0.065)',
				type: 'color',
			},
			goldA4: {
				value: 'hsla(40, 95.9%, 80.8%, 0.100)',
				type: 'color',
			},
			goldA5: {
				value: 'hsla(38, 97.3%, 82.1%, 0.130)',
				type: 'color',
			},
			goldA6: {
				value: 'hsla(39, 97.2%, 82.5%, 0.169)',
				type: 'color',
			},
			goldA7: {
				value: 'hsla(37, 99.3%, 82.4%, 0.246)',
				type: 'color',
			},
			goldA8: {
				value: 'hsla(35, 98.7%, 82.2%, 0.363)',
				type: 'color',
			},
			goldA9: {
				value: 'hsla(36, 99.7%, 82.8%, 0.552)',
				type: 'color',
			},
			goldA10: {
				value: 'hsla(35, 99.2%, 83.7%, 0.613)',
				type: 'color',
			},
			goldA11: {
				value: 'hsla(35, 99.3%, 85.3%, 0.725)',
				type: 'color',
			},
			goldA12: {
				value: 'hsla(49, 98.6%, 96.7%, 0.966)',
				type: 'color',
			},
		},
		grass: {
			grass1: {
				value: 'hsl(116, 50.0%, 98.9%)',
				type: 'color',
			},
			grass2: {
				value: 'hsl(120, 60.0%, 97.1%)',
				type: 'color',
			},
			grass3: {
				value: 'hsl(120, 53.6%, 94.8%)',
				type: 'color',
			},
			grass4: {
				value: 'hsl(121, 47.5%, 91.4%)',
				type: 'color',
			},
			grass5: {
				value: 'hsl(122, 42.6%, 86.5%)',
				type: 'color',
			},
			grass6: {
				value: 'hsl(124, 39.0%, 79.7%)',
				type: 'color',
			},
			grass7: {
				value: 'hsl(126, 37.1%, 70.2%)',
				type: 'color',
			},
			grass8: {
				value: 'hsl(131, 38.1%, 56.3%)',
				type: 'color',
			},
			grass9: {
				value: 'hsl(131, 41.0%, 46.5%)',
				type: 'color',
			},
			grass10: {
				value: 'hsl(132, 43.1%, 42.2%)',
				type: 'color',
			},
			grass11: {
				value: 'hsl(133, 50.0%, 32.5%)',
				type: 'color',
			},
			grass12: {
				value: 'hsl(130, 30.0%, 14.9%)',
				type: 'color',
			},
		},
		grassA: {
			grassA1: {
				value: 'hsla(120, 94.9%, 38.7%, 0.016)',
				type: 'color',
			},
			grassA2: {
				value: 'hsla(120, 94.9%, 38.7%, 0.048)',
				type: 'color',
			},
			grassA3: {
				value: 'hsla(120, 98.0%, 35.5%, 0.079)',
				type: 'color',
			},
			grassA4: {
				value: 'hsla(120, 98.7%, 31.5%, 0.126)',
				type: 'color',
			},
			grassA5: {
				value: 'hsla(122, 98.5%, 29.9%, 0.193)',
				type: 'color',
			},
			grassA6: {
				value: 'hsla(125, 99.2%, 27.9%, 0.283)',
				type: 'color',
			},
			grassA7: {
				value: 'hsla(125, 99.9%, 27.0%, 0.408)',
				type: 'color',
			},
			grassA8: {
				value: 'hsla(131, 100%, 27.6%, 0.604)',
				type: 'color',
			},
			grassA9: {
				value: 'hsla(131, 99.7%, 26.3%, 0.726)',
				type: 'color',
			},
			grassA10: {
				value: 'hsla(132, 99.9%, 24.0%, 0.761)',
				type: 'color',
			},
			grassA11: {
				value: 'hsla(133, 99.5%, 19.5%, 0.840)',
				type: 'color',
			},
			grassA12: {
				value: 'hsla(128, 98.0%, 4.9%, 0.895)',
				type: 'color',
			},
		},
		grassDark: {
			grass1: {
				value: 'hsl(146, 30.0%, 7.4%)',
				type: 'color',
			},
			grass2: {
				value: 'hsl(136, 33.3%, 8.8%)',
				type: 'color',
			},
			grass3: {
				value: 'hsl(137, 36.0%, 11.4%)',
				type: 'color',
			},
			grass4: {
				value: 'hsl(137, 37.6%, 13.7%)',
				type: 'color',
			},
			grass5: {
				value: 'hsl(136, 38.7%, 16.0%)',
				type: 'color',
			},
			grass6: {
				value: 'hsl(135, 39.6%, 19.1%)',
				type: 'color',
			},
			grass7: {
				value: 'hsl(134, 40.3%, 23.8%)',
				type: 'color',
			},
			grass8: {
				value: 'hsl(131, 40.1%, 30.8%)',
				type: 'color',
			},
			grass9: {
				value: 'hsl(131, 41.0%, 46.5%)',
				type: 'color',
			},
			grass10: {
				value: 'hsl(131, 39.0%, 52.1%)',
				type: 'color',
			},
			grass11: {
				value: 'hsl(131, 43.0%, 57.2%)',
				type: 'color',
			},
			grass12: {
				value: 'hsl(137, 72.0%, 94.0%)',
				type: 'color',
			},
		},
		grassDarkA: {
			grassA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			grassA2: {
				value: 'hsla(107, 97.2%, 61.9%, 0.022)',
				type: 'color',
			},
			grassA3: {
				value: 'hsla(128, 96.5%, 69.8%, 0.066)',
				type: 'color',
			},
			grassA4: {
				value: 'hsla(130, 100%, 70.2%, 0.100)',
				type: 'color',
			},
			grassA5: {
				value: 'hsla(130, 98.2%, 69.1%, 0.140)',
				type: 'color',
			},
			grassA6: {
				value: 'hsla(132, 99.9%, 69.3%, 0.187)',
				type: 'color',
			},
			grassA7: {
				value: 'hsla(132, 99.9%, 69.8%, 0.261)',
				type: 'color',
			},
			grassA8: {
				value: 'hsla(130, 99.6%, 70.5%, 0.370)',
				type: 'color',
			},
			grassA9: {
				value: 'hsla(130, 99.7%, 70.6%, 0.618)',
				type: 'color',
			},
			grassA10: {
				value: 'hsla(131, 100%, 73.5%, 0.674)',
				type: 'color',
			},
			grassA11: {
				value: 'hsla(130, 99.7%, 75.6%, 0.731)',
				type: 'color',
			},
			grassA12: {
				value: 'hsla(137, 100%, 95.8%, 0.980)',
				type: 'color',
			},
		},
		gray: {
			gray1: {
				value: 'hsl(0, 0%, 99.0%)',
				type: 'color',
			},
			gray2: {
				value: 'hsl(0, 0%, 97.3%)',
				type: 'color',
			},
			gray3: {
				value: 'hsl(0, 0%, 95.1%)',
				type: 'color',
			},
			gray4: {
				value: 'hsl(0, 0%, 93.0%)',
				type: 'color',
			},
			gray5: {
				value: 'hsl(0, 0%, 90.9%)',
				type: 'color',
			},
			gray6: {
				value: 'hsl(0, 0%, 88.7%)',
				type: 'color',
			},
			gray7: {
				value: 'hsl(0, 0%, 85.8%)',
				type: 'color',
			},
			gray8: {
				value: 'hsl(0, 0%, 78.0%)',
				type: 'color',
			},
			gray9: {
				value: 'hsl(0, 0%, 56.1%)',
				type: 'color',
			},
			gray10: {
				value: 'hsl(0, 0%, 52.3%)',
				type: 'color',
			},
			gray11: {
				value: 'hsl(0, 0%, 43.5%)',
				type: 'color',
			},
			gray12: {
				value: 'hsl(0, 0%, 9.0%)',
				type: 'color',
			},
		},
		grayA: {
			grayA1: {
				value: 'hsla(0, 0%, 0%, 0.012)',
				type: 'color',
			},
			grayA2: {
				value: 'hsla(0, 0%, 0%, 0.027)',
				type: 'color',
			},
			grayA3: {
				value: 'hsla(0, 0%, 0%, 0.047)',
				type: 'color',
			},
			grayA4: {
				value: 'hsla(0, 0%, 0%, 0.071)',
				type: 'color',
			},
			grayA5: {
				value: 'hsla(0, 0%, 0%, 0.090)',
				type: 'color',
			},
			grayA6: {
				value: 'hsla(0, 0%, 0%, 0.114)',
				type: 'color',
			},
			grayA7: {
				value: 'hsla(0, 0%, 0%, 0.141)',
				type: 'color',
			},
			grayA8: {
				value: 'hsla(0, 0%, 0%, 0.220)',
				type: 'color',
			},
			grayA9: {
				value: 'hsla(0, 0%, 0%, 0.439)',
				type: 'color',
			},
			grayA10: {
				value: 'hsla(0, 0%, 0%, 0.478)',
				type: 'color',
			},
			grayA11: {
				value: 'hsla(0, 0%, 0%, 0.565)',
				type: 'color',
			},
			grayA12: {
				value: 'hsla(0, 0%, 0%, 0.910)',
				type: 'color',
			},
		},
		grayDark: {
			gray1: {
				value: 'hsl(0, 0%, 8.5%)',
				type: 'color',
			},
			gray2: {
				value: 'hsl(0, 0%, 11.0%)',
				type: 'color',
			},
			gray3: {
				value: 'hsl(0, 0%, 13.6%)',
				type: 'color',
			},
			gray4: {
				value: 'hsl(0, 0%, 15.8%)',
				type: 'color',
			},
			gray5: {
				value: 'hsl(0, 0%, 17.9%)',
				type: 'color',
			},
			gray6: {
				value: 'hsl(0, 0%, 20.5%)',
				type: 'color',
			},
			gray7: {
				value: 'hsl(0, 0%, 24.3%)',
				type: 'color',
			},
			gray8: {
				value: 'hsl(0, 0%, 31.2%)',
				type: 'color',
			},
			gray9: {
				value: 'hsl(0, 0%, 43.9%)',
				type: 'color',
			},
			gray10: {
				value: 'hsl(0, 0%, 49.4%)',
				type: 'color',
			},
			gray11: {
				value: 'hsl(0, 0%, 62.8%)',
				type: 'color',
			},
			gray12: {
				value: 'hsl(0, 0%, 93.0%)',
				type: 'color',
			},
		},
		grayDarkA: {
			grayA1: {
				value: 'hsla(0, 0%, 100%, 0)',
				type: 'color',
			},
			grayA2: {
				value: 'hsla(0, 0%, 100%, 0.026)',
				type: 'color',
			},
			grayA3: {
				value: 'hsla(0, 0%, 100%, 0.056)',
				type: 'color',
			},
			grayA4: {
				value: 'hsla(0, 0%, 100%, 0.077)',
				type: 'color',
			},
			grayA5: {
				value: 'hsla(0, 0%, 100%, 0.103)',
				type: 'color',
			},
			grayA6: {
				value: 'hsla(0, 0%, 100%, 0.129)',
				type: 'color',
			},
			grayA7: {
				value: 'hsla(0, 0%, 100%, 0.172)',
				type: 'color',
			},
			grayA8: {
				value: 'hsla(0, 0%, 100%, 0.249)',
				type: 'color',
			},
			grayA9: {
				value: 'hsla(0, 0%, 100%, 0.386)',
				type: 'color',
			},
			grayA10: {
				value: 'hsla(0, 0%, 100%, 0.446)',
				type: 'color',
			},
			grayA11: {
				value: 'hsla(0, 0%, 100%, 0.592)',
				type: 'color',
			},
			grayA12: {
				value: 'hsla(0, 0%, 100%, 0.923)',
				type: 'color',
			},
		},
		green: {
			green1: {
				value: 'hsl(136, 50.0%, 98.9%)',
				type: 'color',
			},
			green2: {
				value: 'hsl(138, 62.5%, 96.9%)',
				type: 'color',
			},
			green3: {
				value: 'hsl(139, 55.2%, 94.5%)',
				type: 'color',
			},
			green4: {
				value: 'hsl(140, 48.7%, 91.0%)',
				type: 'color',
			},
			green5: {
				value: 'hsl(141, 43.7%, 86.0%)',
				type: 'color',
			},
			green6: {
				value: 'hsl(143, 40.3%, 79.0%)',
				type: 'color',
			},
			green7: {
				value: 'hsl(146, 38.5%, 69.0%)',
				type: 'color',
			},
			green8: {
				value: 'hsl(151, 40.2%, 54.1%)',
				type: 'color',
			},
			green9: {
				value: 'hsl(151, 55.0%, 41.5%)',
				type: 'color',
			},
			green10: {
				value: 'hsl(152, 57.5%, 37.6%)',
				type: 'color',
			},
			green11: {
				value: 'hsl(153, 67.0%, 28.5%)',
				type: 'color',
			},
			green12: {
				value: 'hsl(155, 40.0%, 14.0%)',
				type: 'color',
			},
		},
		greenA: {
			greenA1: {
				value: 'hsla(140, 94.9%, 38.7%, 0.016)',
				type: 'color',
			},
			greenA2: {
				value: 'hsla(138, 99.9%, 38.5%, 0.051)',
				type: 'color',
			},
			greenA3: {
				value: 'hsla(139, 97.7%, 36.9%, 0.087)',
				type: 'color',
			},
			greenA4: {
				value: 'hsla(139, 98.5%, 32.7%, 0.134)',
				type: 'color',
			},
			greenA5: {
				value: 'hsla(141, 100%, 30.4%, 0.200)',
				type: 'color',
			},
			greenA6: {
				value: 'hsla(142, 99.0%, 28.9%, 0.295)',
				type: 'color',
			},
			greenA7: {
				value: 'hsla(146, 99.5%, 27.6%, 0.428)',
				type: 'color',
			},
			greenA8: {
				value: 'hsla(151, 99.5%, 28.8%, 0.644)',
				type: 'color',
			},
			greenA9: {
				value: 'hsla(151, 99.9%, 28.0%, 0.812)',
				type: 'color',
			},
			greenA10: {
				value: 'hsla(152, 99.6%, 25.8%, 0.840)',
				type: 'color',
			},
			greenA11: {
				value: 'hsla(153, 99.9%, 21.0%, 0.906)',
				type: 'color',
			},
			greenA12: {
				value: 'hsla(155, 99.4%, 6.2%, 0.918)',
				type: 'color',
			},
		},
		greenDark: {
			green1: {
				value: 'hsl(146, 30.0%, 7.4%)',
				type: 'color',
			},
			green2: {
				value: 'hsl(155, 44.2%, 8.4%)',
				type: 'color',
			},
			green3: {
				value: 'hsl(155, 46.7%, 10.9%)',
				type: 'color',
			},
			green4: {
				value: 'hsl(154, 48.4%, 12.9%)',
				type: 'color',
			},
			green5: {
				value: 'hsl(154, 49.7%, 14.9%)',
				type: 'color',
			},
			green6: {
				value: 'hsl(154, 50.9%, 17.6%)',
				type: 'color',
			},
			green7: {
				value: 'hsl(153, 51.8%, 21.8%)',
				type: 'color',
			},
			green8: {
				value: 'hsl(151, 51.7%, 28.4%)',
				type: 'color',
			},
			green9: {
				value: 'hsl(151, 55.0%, 41.5%)',
				type: 'color',
			},
			green10: {
				value: 'hsl(151, 49.3%, 46.5%)',
				type: 'color',
			},
			green11: {
				value: 'hsl(151, 50.0%, 53.2%)',
				type: 'color',
			},
			green12: {
				value: 'hsl(137, 72.0%, 94.0%)',
				type: 'color',
			},
		},
		greenDarkA: {
			greenA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			greenA2: {
				value: 'hsla(169, 100%, 48.5%, 0.027)',
				type: 'color',
			},
			greenA3: {
				value: 'hsla(162, 98.7%, 57.9%, 0.070)',
				type: 'color',
			},
			greenA4: {
				value: 'hsla(158, 98.6%, 59.7%, 0.105)',
				type: 'color',
			},
			greenA5: {
				value: 'hsla(158, 98.6%, 60.7%, 0.140)',
				type: 'color',
			},
			greenA6: {
				value: 'hsla(156, 99.9%, 62.0%, 0.187)',
				type: 'color',
			},
			greenA7: {
				value: 'hsla(154, 99.5%, 63.1%, 0.257)',
				type: 'color',
			},
			greenA8: {
				value: 'hsla(152, 99.7%, 64.2%, 0.370)',
				type: 'color',
			},
			greenA9: {
				value: 'hsla(151, 99.7%, 63.8%, 0.605)',
				type: 'color',
			},
			greenA10: {
				value: 'hsla(152, 99.9%, 66.5%, 0.661)',
				type: 'color',
			},
			greenA11: {
				value: 'hsla(151, 99.7%, 69.2%, 0.740)',
				type: 'color',
			},
			greenA12: {
				value: 'hsla(137, 100%, 95.8%, 0.980)',
				type: 'color',
			},
		},
		indigo: {
			indigo1: {
				value: 'hsl(225, 60.0%, 99.4%)',
				type: 'color',
			},
			indigo2: {
				value: 'hsl(223, 100%, 98.6%)',
				type: 'color',
			},
			indigo3: {
				value: 'hsl(223, 98.4%, 97.1%)',
				type: 'color',
			},
			indigo4: {
				value: 'hsl(223, 92.9%, 95.0%)',
				type: 'color',
			},
			indigo5: {
				value: 'hsl(224, 87.1%, 92.0%)',
				type: 'color',
			},
			indigo6: {
				value: 'hsl(224, 81.9%, 87.8%)',
				type: 'color',
			},
			indigo7: {
				value: 'hsl(225, 77.4%, 82.1%)',
				type: 'color',
			},
			indigo8: {
				value: 'hsl(226, 75.4%, 74.5%)',
				type: 'color',
			},
			indigo9: {
				value: 'hsl(226, 70.0%, 55.5%)',
				type: 'color',
			},
			indigo10: {
				value: 'hsl(226, 58.6%, 51.3%)',
				type: 'color',
			},
			indigo11: {
				value: 'hsl(226, 55.0%, 45.0%)',
				type: 'color',
			},
			indigo12: {
				value: 'hsl(226, 62.0%, 17.0%)',
				type: 'color',
			},
		},
		indigoA: {
			indigoA1: {
				value: 'hsla(240, 92.6%, 26.5%, 0.008)',
				type: 'color',
			},
			indigoA2: {
				value: 'hsla(223, 100%, 51.0%, 0.028)',
				type: 'color',
			},
			indigoA3: {
				value: 'hsla(224, 100%, 50.1%, 0.059)',
				type: 'color',
			},
			indigoA4: {
				value: 'hsla(223, 98.0%, 48.5%, 0.099)',
				type: 'color',
			},
			indigoA5: {
				value: 'hsla(225, 98.6%, 46.4%, 0.150)',
				type: 'color',
			},
			indigoA6: {
				value: 'hsla(224, 99.5%, 44.9%, 0.224)',
				type: 'color',
			},
			indigoA7: {
				value: 'hsla(225, 99.7%, 43.9%, 0.318)',
				type: 'color',
			},
			indigoA8: {
				value: 'hsla(226, 99.5%, 43.1%, 0.448)',
				type: 'color',
			},
			indigoA9: {
				value: 'hsla(226, 100%, 41.2%, 0.757)',
				type: 'color',
			},
			indigoA10: {
				value: 'hsla(226, 99.8%, 37.1%, 0.773)',
				type: 'color',
			},
			indigoA11: {
				value: 'hsla(226, 99.6%, 31.1%, 0.797)',
				type: 'color',
			},
			indigoA12: {
				value: 'hsla(226, 99.3%, 11.4%, 0.938)',
				type: 'color',
			},
		},
		indigoDark: {
			indigo1: {
				value: 'hsl(229, 24.0%, 10.0%)',
				type: 'color',
			},
			indigo2: {
				value: 'hsl(230, 36.4%, 12.9%)',
				type: 'color',
			},
			indigo3: {
				value: 'hsl(228, 43.3%, 17.5%)',
				type: 'color',
			},
			indigo4: {
				value: 'hsl(227, 47.2%, 21.0%)',
				type: 'color',
			},
			indigo5: {
				value: 'hsl(227, 50.0%, 24.1%)',
				type: 'color',
			},
			indigo6: {
				value: 'hsl(226, 52.9%, 28.2%)',
				type: 'color',
			},
			indigo7: {
				value: 'hsl(226, 56.0%, 34.5%)',
				type: 'color',
			},
			indigo8: {
				value: 'hsl(226, 58.2%, 44.1%)',
				type: 'color',
			},
			indigo9: {
				value: 'hsl(226, 70.0%, 55.5%)',
				type: 'color',
			},
			indigo10: {
				value: 'hsl(227, 75.2%, 61.6%)',
				type: 'color',
			},
			indigo11: {
				value: 'hsl(228, 100%, 75.9%)',
				type: 'color',
			},
			indigo12: {
				value: 'hsl(226, 83.0%, 96.3%)',
				type: 'color',
			},
		},
		indigoDarkA: {
			indigoA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			indigoA2: {
				value: 'hsla(234, 97.4%, 59.9%, 0.059)',
				type: 'color',
			},
			indigoA3: {
				value: 'hsla(228, 99.2%, 61.7%, 0.144)',
				type: 'color',
			},
			indigoA4: {
				value: 'hsla(227, 99.7%, 62.0%, 0.211)',
				type: 'color',
			},
			indigoA5: {
				value: 'hsla(227, 99.2%, 62.3%, 0.270)',
				type: 'color',
			},
			indigoA6: {
				value: 'hsla(226, 99.9%, 62.1%, 0.350)',
				type: 'color',
			},
			indigoA7: {
				value: 'hsla(226, 99.9%, 62.0%, 0.471)',
				type: 'color',
			},
			indigoA8: {
				value: 'hsla(226, 99.9%, 62.1%, 0.655)',
				type: 'color',
			},
			indigoA9: {
				value: 'hsla(226, 99.9%, 63.6%, 0.848)',
				type: 'color',
			},
			indigoA10: {
				value: 'hsla(227, 99.8%, 67.7%, 0.893)',
				type: 'color',
			},
			indigoA11: {
				value: 'hsla(227, 100%, 76.3%, 0.980)',
				type: 'color',
			},
			indigoA12: {
				value: 'hsla(226, 100%, 97.5%, 0.980)',
				type: 'color',
			},
		},
		lime: {
			lime1: {
				value: 'hsl(85, 50.0%, 98.7%)',
				type: 'color',
			},
			lime2: {
				value: 'hsl(85, 66.7%, 96.5%)',
				type: 'color',
			},
			lime3: {
				value: 'hsl(85, 76.0%, 92.3%)',
				type: 'color',
			},
			lime4: {
				value: 'hsl(84, 75.3%, 87.5%)',
				type: 'color',
			},
			lime5: {
				value: 'hsl(84, 71.5%, 81.9%)',
				type: 'color',
			},
			lime6: {
				value: 'hsl(82, 65.0%, 74.6%)',
				type: 'color',
			},
			lime7: {
				value: 'hsl(79, 53.2%, 61.8%)',
				type: 'color',
			},
			lime8: {
				value: 'hsl(76, 61.7%, 45.1%)',
				type: 'color',
			},
			lime9: {
				value: 'hsl(81, 67.0%, 50.0%)',
				type: 'color',
			},
			lime10: {
				value: 'hsl(80, 68.3%, 46.9%)',
				type: 'color',
			},
			lime11: {
				value: 'hsl(75, 80.0%, 26.0%)',
				type: 'color',
			},
			lime12: {
				value: 'hsl(78, 70.0%, 11.5%)',
				type: 'color',
			},
		},
		limeA: {
			limeA1: {
				value: 'hsla(80, 93.8%, 31.4%, 0.020)',
				type: 'color',
			},
			limeA2: {
				value: 'hsla(85, 99.3%, 40.2%, 0.059)',
				type: 'color',
			},
			limeA3: {
				value: 'hsla(84, 98.7%, 43.2%, 0.138)',
				type: 'color',
			},
			limeA4: {
				value: 'hsla(84, 99.6%, 43.0%, 0.220)',
				type: 'color',
			},
			limeA5: {
				value: 'hsla(85, 99.8%, 41.8%, 0.310)',
				type: 'color',
			},
			limeA6: {
				value: 'hsla(82, 99.8%, 39.3%, 0.420)',
				type: 'color',
			},
			limeA7: {
				value: 'hsla(79, 99.7%, 34.6%, 0.585)',
				type: 'color',
			},
			limeA8: {
				value: 'hsla(76, 99.8%, 33.7%, 0.828)',
				type: 'color',
			},
			limeA9: {
				value: 'hsla(81, 99.8%, 40.2%, 0.836)',
				type: 'color',
			},
			limeA10: {
				value: 'hsla(80, 100%, 37.6%, 0.851)',
				type: 'color',
			},
			limeA11: {
				value: 'hsla(75, 99.5%, 22.0%, 0.950)',
				type: 'color',
			},
			limeA12: {
				value: 'hsla(78, 99.6%, 8.4%, 0.965)',
				type: 'color',
			},
		},
		limeDark: {
			lime1: {
				value: 'hsl(75, 55.0%, 6.0%)',
				type: 'color',
			},
			lime2: {
				value: 'hsl(74, 56.8%, 7.3%)',
				type: 'color',
			},
			lime3: {
				value: 'hsl(78, 50.2%, 9.9%)',
				type: 'color',
			},
			lime4: {
				value: 'hsl(79, 50.3%, 12.1%)',
				type: 'color',
			},
			lime5: {
				value: 'hsl(79, 52.6%, 14.2%)',
				type: 'color',
			},
			lime6: {
				value: 'hsl(78, 55.7%, 16.7%)',
				type: 'color',
			},
			lime7: {
				value: 'hsl(77, 59.7%, 20.1%)',
				type: 'color',
			},
			lime8: {
				value: 'hsl(75, 64.8%, 24.5%)',
				type: 'color',
			},
			lime9: {
				value: 'hsl(81, 67.0%, 50.0%)',
				type: 'color',
			},
			lime10: {
				value: 'hsl(75, 85.0%, 60.0%)',
				type: 'color',
			},
			lime11: {
				value: 'hsl(81, 70.0%, 43.8%)',
				type: 'color',
			},
			lime12: {
				value: 'hsl(84, 79.0%, 92.6%)',
				type: 'color',
			},
		},
		limeDarkA: {
			limeA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			limeA2: {
				value: 'hsla(75, 96.4%, 59.6%, 0.022)',
				type: 'color',
			},
			limeA3: {
				value: 'hsla(88, 98.0%, 70.4%, 0.061)',
				type: 'color',
			},
			limeA4: {
				value: 'hsla(81, 97.8%, 67.4%, 0.096)',
				type: 'color',
			},
			limeA5: {
				value: 'hsla(82, 98.4%, 65.6%, 0.135)',
				type: 'color',
			},
			limeA6: {
				value: 'hsla(79, 99.7%, 64.3%, 0.182)',
				type: 'color',
			},
			limeA7: {
				value: 'hsla(77, 99.1%, 62.1%, 0.252)',
				type: 'color',
			},
			limeA8: {
				value: 'hsla(75, 100%, 60.0%, 0.342)',
				type: 'color',
			},
			limeA9: {
				value: 'hsla(81, 99.8%, 59.7%, 0.819)',
				type: 'color',
			},
			limeA10: {
				value: 'hsla(75, 99.8%, 63.7%, 0.936)',
				type: 'color',
			},
			limeA11: {
				value: 'hsla(81, 99.9%, 58.7%, 0.719)',
				type: 'color',
			},
			limeA12: {
				value: 'hsla(83, 100%, 94.2%, 0.980)',
				type: 'color',
			},
		},
		mauve: {
			mauve1: {
				value: 'hsl(300, 20.0%, 99.0%)',
				type: 'color',
			},
			mauve2: {
				value: 'hsl(300, 7.7%, 97.5%)',
				type: 'color',
			},
			mauve3: {
				value: 'hsl(294, 5.5%, 95.3%)',
				type: 'color',
			},
			mauve4: {
				value: 'hsl(289, 4.7%, 93.3%)',
				type: 'color',
			},
			mauve5: {
				value: 'hsl(283, 4.4%, 91.3%)',
				type: 'color',
			},
			mauve6: {
				value: 'hsl(278, 4.1%, 89.1%)',
				type: 'color',
			},
			mauve7: {
				value: 'hsl(271, 3.9%, 86.3%)',
				type: 'color',
			},
			mauve8: {
				value: 'hsl(255, 3.7%, 78.8%)',
				type: 'color',
			},
			mauve9: {
				value: 'hsl(252, 4.0%, 57.3%)',
				type: 'color',
			},
			mauve10: {
				value: 'hsl(253, 3.5%, 53.5%)',
				type: 'color',
			},
			mauve11: {
				value: 'hsl(252, 4.0%, 44.8%)',
				type: 'color',
			},
			mauve12: {
				value: 'hsl(260, 25.0%, 11.0%)',
				type: 'color',
			},
		},
		mauveA: {
			mauveA1: {
				value: 'hsla(300, 89.3%, 18.3%, 0.012)',
				type: 'color',
			},
			mauveA2: {
				value: 'hsla(300, 78.1%, 9.0%, 0.028)',
				type: 'color',
			},
			mauveA3: {
				value: 'hsla(300, 99.5%, 7.7%, 0.051)',
				type: 'color',
			},
			mauveA4: {
				value: 'hsla(270, 90.5%, 6.1%, 0.071)',
				type: 'color',
			},
			mauveA5: {
				value: 'hsla(270, 83.0%, 5.2%, 0.091)',
				type: 'color',
			},
			mauveA6: {
				value: 'hsla(300, 93.5%, 3.7%, 0.114)',
				type: 'color',
			},
			mauveA7: {
				value: 'hsla(270, 82.6%, 3.3%, 0.142)',
				type: 'color',
			},
			mauveA8: {
				value: 'hsla(255, 95.2%, 3.7%, 0.220)',
				type: 'color',
			},
			mauveA9: {
				value: 'hsla(255, 94.8%, 3.7%, 0.444)',
				type: 'color',
			},
			mauveA10: {
				value: 'hsla(253, 96.5%, 3.8%, 0.483)',
				type: 'color',
			},
			mauveA11: {
				value: 'hsla(247, 97.9%, 3.2%, 0.569)',
				type: 'color',
			},
			mauveA12: {
				value: 'hsla(261, 98.7%, 3.0%, 0.918)',
				type: 'color',
			},
		},
		mauveDark: {
			mauve1: {
				value: 'hsl(246, 6.0%, 9.0%)',
				type: 'color',
			},
			mauve2: {
				value: 'hsl(240, 5.1%, 11.6%)',
				type: 'color',
			},
			mauve3: {
				value: 'hsl(241, 5.0%, 14.3%)',
				type: 'color',
			},
			mauve4: {
				value: 'hsl(242, 4.9%, 16.5%)',
				type: 'color',
			},
			mauve5: {
				value: 'hsl(243, 4.9%, 18.8%)',
				type: 'color',
			},
			mauve6: {
				value: 'hsl(244, 4.9%, 21.5%)',
				type: 'color',
			},
			mauve7: {
				value: 'hsl(245, 4.9%, 25.4%)',
				type: 'color',
			},
			mauve8: {
				value: 'hsl(247, 4.8%, 32.5%)',
				type: 'color',
			},
			mauve9: {
				value: 'hsl(252, 4.0%, 45.2%)',
				type: 'color',
			},
			mauve10: {
				value: 'hsl(247, 3.4%, 50.7%)',
				type: 'color',
			},
			mauve11: {
				value: 'hsl(253, 4.0%, 63.7%)',
				type: 'color',
			},
			mauve12: {
				value: 'hsl(256, 6.0%, 93.2%)',
				type: 'color',
			},
		},
		mauveDarkA: {
			mauveA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			mauveA2: {
				value: 'hsla(240, 76.7%, 91.2%, 0.031)',
				type: 'color',
			},
			mauveA3: {
				value: 'hsla(240, 86.0%, 95.8%, 0.061)',
				type: 'color',
			},
			mauveA4: {
				value: 'hsla(240, 91.8%, 94.7%, 0.087)',
				type: 'color',
			},
			mauveA5: {
				value: 'hsla(240, 91.5%, 95.8%, 0.113)',
				type: 'color',
			},
			mauveA6: {
				value: 'hsla(240, 92.0%, 93.8%, 0.148)',
				type: 'color',
			},
			mauveA7: {
				value: 'hsla(240, 94.8%, 95.3%, 0.191)',
				type: 'color',
			},
			mauveA8: {
				value: 'hsla(249, 98.1%, 95.2%, 0.273)',
				type: 'color',
			},
			mauveA9: {
				value: 'hsla(248, 97.6%, 96.2%, 0.416)',
				type: 'color',
			},
			mauveA10: {
				value: 'hsla(248, 95.5%, 96.6%, 0.477)',
				type: 'color',
			},
			mauveA11: {
				value: 'hsla(250, 98.0%, 98.0%, 0.615)',
				type: 'color',
			},
			mauveA12: {
				value: 'hsla(240, 93.9%, 99.6%, 0.931)',
				type: 'color',
			},
		},
		mint: {
			mint1: {
				value: 'hsl(165, 80.0%, 98.8%)',
				type: 'color',
			},
			mint2: {
				value: 'hsl(164, 88.2%, 96.7%)',
				type: 'color',
			},
			mint3: {
				value: 'hsl(164, 76.6%, 93.3%)',
				type: 'color',
			},
			mint4: {
				value: 'hsl(165, 68.8%, 89.5%)',
				type: 'color',
			},
			mint5: {
				value: 'hsl(165, 60.6%, 84.5%)',
				type: 'color',
			},
			mint6: {
				value: 'hsl(165, 53.5%, 76.9%)',
				type: 'color',
			},
			mint7: {
				value: 'hsl(166, 50.7%, 66.1%)',
				type: 'color',
			},
			mint8: {
				value: 'hsl(168, 52.8%, 51.0%)',
				type: 'color',
			},
			mint9: {
				value: 'hsl(167, 65.0%, 66.0%)',
				type: 'color',
			},
			mint10: {
				value: 'hsl(167, 59.3%, 63.1%)',
				type: 'color',
			},
			mint11: {
				value: 'hsl(172, 72.0%, 28.5%)',
				type: 'color',
			},
			mint12: {
				value: 'hsl(172, 70.0%, 12.0%)',
				type: 'color',
			},
		},
		mintA: {
			mintA1: {
				value: 'hsla(168, 95.4%, 42.8%, 0.024)',
				type: 'color',
			},
			mintA2: {
				value: 'hsla(164, 99.1%, 47.1%, 0.063)',
				type: 'color',
			},
			mintA3: {
				value: 'hsla(164, 99.3%, 43.5%, 0.118)',
				type: 'color',
			},
			mintA4: {
				value: 'hsla(164, 99.3%, 41.3%, 0.177)',
				type: 'color',
			},
			mintA5: {
				value: 'hsla(165, 99.0%, 37.5%, 0.248)',
				type: 'color',
			},
			mintA6: {
				value: 'hsla(165, 100%, 35.0%, 0.353)',
				type: 'color',
			},
			mintA7: {
				value: 'hsla(166, 99.9%, 33.5%, 0.510)',
				type: 'color',
			},
			mintA8: {
				value: 'hsla(168, 99.6%, 34.6%, 0.750)',
				type: 'color',
			},
			mintA9: {
				value: 'hsla(167, 99.9%, 39.5%, 0.561)',
				type: 'color',
			},
			mintA10: {
				value: 'hsla(167, 99.7%, 37.4%, 0.589)',
				type: 'color',
			},
			mintA11: {
				value: 'hsla(172, 99.8%, 22.4%, 0.922)',
				type: 'color',
			},
			mintA12: {
				value: 'hsla(172, 99.7%, 8.8%, 0.965)',
				type: 'color',
			},
		},
		mintDark: {
			mint1: {
				value: 'hsl(173, 50.0%, 6.6%)',
				type: 'color',
			},
			mint2: {
				value: 'hsl(176, 73.0%, 7.3%)',
				type: 'color',
			},
			mint3: {
				value: 'hsl(175, 79.3%, 8.9%)',
				type: 'color',
			},
			mint4: {
				value: 'hsl(174, 84.8%, 10.3%)',
				type: 'color',
			},
			mint5: {
				value: 'hsl(174, 90.2%, 11.9%)',
				type: 'color',
			},
			mint6: {
				value: 'hsl(173, 96.0%, 13.8%)',
				type: 'color',
			},
			mint7: {
				value: 'hsl(172, 100%, 16.8%)',
				type: 'color',
			},
			mint8: {
				value: 'hsl(170, 100%, 21.4%)',
				type: 'color',
			},
			mint9: {
				value: 'hsl(167, 65.0%, 66.0%)',
				type: 'color',
			},
			mint10: {
				value: 'hsl(163, 80.0%, 77.0%)',
				type: 'color',
			},
			mint11: {
				value: 'hsl(167, 70.0%, 48.0%)',
				type: 'color',
			},
			mint12: {
				value: 'hsl(165, 80.0%, 94.8%)',
				type: 'color',
			},
		},
		mintDarkA: {
			mintA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			mintA2: {
				value: 'hsla(180, 100%, 49.2%, 0.031)',
				type: 'color',
			},
			mintA3: {
				value: 'hsla(176, 100%, 49.7%, 0.070)',
				type: 'color',
			},
			mintA4: {
				value: 'hsla(173, 100%, 49.7%, 0.105)',
				type: 'color',
			},
			mintA5: {
				value: 'hsla(173, 100%, 49.8%, 0.144)',
				type: 'color',
			},
			mintA6: {
				value: 'hsla(172, 100%, 49.8%, 0.192)',
				type: 'color',
			},
			mintA7: {
				value: 'hsla(171, 100%, 49.9%, 0.266)',
				type: 'color',
			},
			mintA8: {
				value: 'hsla(169, 100%, 49.9%, 0.366)',
				type: 'color',
			},
			mintA9: {
				value: 'hsla(167, 99.8%, 75.0%, 0.870)',
				type: 'color',
			},
			mintA10: {
				value: 'hsla(163, 99.9%, 80.7%, 0.948)',
				type: 'color',
			},
			mintA11: {
				value: 'hsla(167, 99.9%, 58.7%, 0.796)',
				type: 'color',
			},
			mintA12: {
				value: 'hsla(169, 100%, 96.2%, 0.980)',
				type: 'color',
			},
		},
		olive: {
			olive1: {
				value: 'hsl(110, 20.0%, 99.0%)',
				type: 'color',
			},
			olive2: {
				value: 'hsl(120, 16.7%, 97.6%)',
				type: 'color',
			},
			olive3: {
				value: 'hsl(119, 10.1%, 95.2%)',
				type: 'color',
			},
			olive4: {
				value: 'hsl(118, 8.1%, 93.0%)',
				type: 'color',
			},
			olive5: {
				value: 'hsl(117, 7.1%, 90.8%)',
				type: 'color',
			},
			olive6: {
				value: 'hsl(115, 6.4%, 88.5%)',
				type: 'color',
			},
			olive7: {
				value: 'hsl(114, 5.9%, 85.4%)',
				type: 'color',
			},
			olive8: {
				value: 'hsl(110, 5.2%, 77.3%)',
				type: 'color',
			},
			olive9: {
				value: 'hsl(110, 3.5%, 55.5%)',
				type: 'color',
			},
			olive10: {
				value: 'hsl(111, 2.8%, 51.7%)',
				type: 'color',
			},
			olive11: {
				value: 'hsl(110, 3.0%, 43.0%)',
				type: 'color',
			},
			olive12: {
				value: 'hsl(110, 25.0%, 9.5%)',
				type: 'color',
			},
		},
		oliveA: {
			oliveA1: {
				value: 'hsla(120, 89.3%, 18.3%, 0.012)',
				type: 'color',
			},
			oliveA2: {
				value: 'hsla(120, 87.7%, 16.0%, 0.028)',
				type: 'color',
			},
			oliveA3: {
				value: 'hsla(120, 99.5%, 7.7%, 0.051)',
				type: 'color',
			},
			oliveA4: {
				value: 'hsla(120, 92.3%, 8.5%, 0.075)',
				type: 'color',
			},
			oliveA5: {
				value: 'hsla(120, 86.0%, 6.9%, 0.099)',
				type: 'color',
			},
			oliveA6: {
				value: 'hsla(120, 94.8%, 6.8%, 0.122)',
				type: 'color',
			},
			oliveA7: {
				value: 'hsla(120, 99.3%, 5.2%, 0.153)',
				type: 'color',
			},
			oliveA8: {
				value: 'hsla(110, 93.8%, 5.2%, 0.240)',
				type: 'color',
			},
			oliveA9: {
				value: 'hsla(111, 98.7%, 3.0%, 0.459)',
				type: 'color',
			},
			oliveA10: {
				value: 'hsla(111, 93.5%, 2.9%, 0.499)',
				type: 'color',
			},
			oliveA11: {
				value: 'hsla(111, 95.2%, 2.5%, 0.585)',
				type: 'color',
			},
			oliveA12: {
				value: 'hsla(110, 97.6%, 2.6%, 0.930)',
				type: 'color',
			},
		},
		oliveDark: {
			olive1: {
				value: 'hsl(110, 5.0%, 8.6%)',
				type: 'color',
			},
			olive2: {
				value: 'hsl(105, 7.4%, 10.6%)',
				type: 'color',
			},
			olive3: {
				value: 'hsl(106, 6.4%, 13.1%)',
				type: 'color',
			},
			olive4: {
				value: 'hsl(106, 5.8%, 15.3%)',
				type: 'color',
			},
			olive5: {
				value: 'hsl(107, 5.3%, 17.4%)',
				type: 'color',
			},
			olive6: {
				value: 'hsl(107, 4.9%, 19.9%)',
				type: 'color',
			},
			olive7: {
				value: 'hsl(108, 4.4%, 23.6%)',
				type: 'color',
			},
			olive8: {
				value: 'hsl(110, 3.8%, 30.6%)',
				type: 'color',
			},
			olive9: {
				value: 'hsl(110, 6.0%, 42.5%)',
				type: 'color',
			},
			olive10: {
				value: 'hsl(111, 4.8%, 48.2%)',
				type: 'color',
			},
			olive11: {
				value: 'hsl(110, 5.0%, 61.8%)',
				type: 'color',
			},
			olive12: {
				value: 'hsl(110, 6.0%, 93.0%)',
				type: 'color',
			},
		},
		oliveDarkA: {
			oliveA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			oliveA2: {
				value: 'hsla(91, 97.0%, 84.0%, 0.026)',
				type: 'color',
			},
			oliveA3: {
				value: 'hsla(101, 87.4%, 87.7%, 0.057)',
				type: 'color',
			},
			oliveA4: {
				value: 'hsla(92, 91.8%, 94.1%, 0.078)',
				type: 'color',
			},
			oliveA5: {
				value: 'hsla(101, 92.6%, 93.5%, 0.104)',
				type: 'color',
			},
			oliveA6: {
				value: 'hsla(102, 91.1%, 94.6%, 0.130)',
				type: 'color',
			},
			oliveA7: {
				value: 'hsla(102, 92.5%, 95.9%, 0.173)',
				type: 'color',
			},
			oliveA8: {
				value: 'hsla(107, 100%, 96.5%, 0.250)',
				type: 'color',
			},
			oliveA9: {
				value: 'hsla(110, 98.3%, 94.1%, 0.397)',
				type: 'color',
			},
			oliveA10: {
				value: 'hsla(109, 99.6%, 95.3%, 0.457)',
				type: 'color',
			},
			oliveA11: {
				value: 'hsla(113, 95.3%, 97.2%, 0.600)',
				type: 'color',
			},
			oliveA12: {
				value: 'hsla(120, 93.5%, 99.6%, 0.927)',
				type: 'color',
			},
		},
		orange: {
			orange1: {
				value: 'hsl(24, 70.0%, 99.0%)',
				type: 'color',
			},
			orange2: {
				value: 'hsl(24, 83.3%, 97.6%)',
				type: 'color',
			},
			orange3: {
				value: 'hsl(24, 100%, 95.3%)',
				type: 'color',
			},
			orange4: {
				value: 'hsl(25, 100%, 92.2%)',
				type: 'color',
			},
			orange5: {
				value: 'hsl(25, 100%, 88.2%)',
				type: 'color',
			},
			orange6: {
				value: 'hsl(25, 100%, 82.8%)',
				type: 'color',
			},
			orange7: {
				value: 'hsl(24, 100%, 75.3%)',
				type: 'color',
			},
			orange8: {
				value: 'hsl(24, 94.5%, 64.3%)',
				type: 'color',
			},
			orange9: {
				value: 'hsl(24, 94.0%, 50.0%)',
				type: 'color',
			},
			orange10: {
				value: 'hsl(24, 100%, 46.5%)',
				type: 'color',
			},
			orange11: {
				value: 'hsl(24, 100%, 37.0%)',
				type: 'color',
			},
			orange12: {
				value: 'hsl(15, 60.0%, 17.0%)',
				type: 'color',
			},
		},
		orangeA: {
			orangeA1: {
				value: 'hsla(20, 94.9%, 38.7%, 0.016)',
				type: 'color',
			},
			orangeA2: {
				value: 'hsla(24, 95.8%, 46.5%, 0.044)',
				type: 'color',
			},
			orangeA3: {
				value: 'hsla(25, 100%, 50.5%, 0.095)',
				type: 'color',
			},
			orangeA4: {
				value: 'hsla(26, 100%, 50.0%, 0.157)',
				type: 'color',
			},
			orangeA5: {
				value: 'hsla(25, 100%, 50.1%, 0.236)',
				type: 'color',
			},
			orangeA6: {
				value: 'hsla(25, 100%, 50.1%, 0.346)',
				type: 'color',
			},
			orangeA7: {
				value: 'hsla(24, 100%, 50.1%, 0.495)',
				type: 'color',
			},
			orangeA8: {
				value: 'hsla(24, 99.7%, 48.7%, 0.695)',
				type: 'color',
			},
			orangeA9: {
				value: 'hsla(24, 99.9%, 48.4%, 0.969)',
				type: 'color',
			},
			orangeA10: {
				value: 'hsla(23, 100%, 46.4%, 0.980)',
				type: 'color',
			},
			orangeA11: {
				value: 'hsla(23, 100%, 36.8%, 0.980)',
				type: 'color',
			},
			orangeA12: {
				value: 'hsla(15, 99.4%, 11.0%, 0.934)',
				type: 'color',
			},
		},
		orangeDark: {
			orange1: {
				value: 'hsl(30, 70.0%, 7.2%)',
				type: 'color',
			},
			orange2: {
				value: 'hsl(28, 100%, 8.4%)',
				type: 'color',
			},
			orange3: {
				value: 'hsl(26, 91.1%, 11.6%)',
				type: 'color',
			},
			orange4: {
				value: 'hsl(25, 88.3%, 14.1%)',
				type: 'color',
			},
			orange5: {
				value: 'hsl(24, 87.6%, 16.6%)',
				type: 'color',
			},
			orange6: {
				value: 'hsl(24, 88.6%, 19.8%)',
				type: 'color',
			},
			orange7: {
				value: 'hsl(24, 92.4%, 24.0%)',
				type: 'color',
			},
			orange8: {
				value: 'hsl(25, 100%, 29.0%)',
				type: 'color',
			},
			orange9: {
				value: 'hsl(24, 94.0%, 50.0%)',
				type: 'color',
			},
			orange10: {
				value: 'hsl(24, 100%, 58.5%)',
				type: 'color',
			},
			orange11: {
				value: 'hsl(24, 100%, 62.2%)',
				type: 'color',
			},
			orange12: {
				value: 'hsl(24, 97.0%, 93.2%)',
				type: 'color',
			},
		},
		orangeDarkA: {
			orangeA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			orangeA2: {
				value: 'hsla(13, 100%, 49.7%, 0.054)',
				type: 'color',
			},
			orangeA3: {
				value: 'hsla(20, 100%, 49.7%, 0.117)',
				type: 'color',
			},
			orangeA4: {
				value: 'hsla(23, 100%, 49.8%, 0.166)',
				type: 'color',
			},
			orangeA5: {
				value: 'hsla(23, 99.4%, 50.1%, 0.215)',
				type: 'color',
			},
			orangeA6: {
				value: 'hsla(23, 99.8%, 51.1%, 0.286)',
				type: 'color',
			},
			orangeA7: {
				value: 'hsla(23, 99.7%, 50.6%, 0.389)',
				type: 'color',
			},
			orangeA8: {
				value: 'hsla(24, 100%, 49.9%, 0.523)',
				type: 'color',
			},
			orangeA9: {
				value: 'hsla(24, 99.9%, 51.6%, 0.965)',
				type: 'color',
			},
			orangeA10: {
				value: 'hsla(25, 100%, 58.6%, 0.980)',
				type: 'color',
			},
			orangeA11: {
				value: 'hsla(24, 100%, 62.4%, 0.980)',
				type: 'color',
			},
			orangeA12: {
				value: 'hsla(26, 100%, 94.2%, 0.980)',
				type: 'color',
			},
		},
		pink: {
			pink1: {
				value: 'hsl(322, 100%, 99.4%)',
				type: 'color',
			},
			pink2: {
				value: 'hsl(323, 100%, 98.4%)',
				type: 'color',
			},
			pink3: {
				value: 'hsl(323, 86.3%, 96.5%)',
				type: 'color',
			},
			pink4: {
				value: 'hsl(323, 78.7%, 94.2%)',
				type: 'color',
			},
			pink5: {
				value: 'hsl(323, 72.2%, 91.1%)',
				type: 'color',
			},
			pink6: {
				value: 'hsl(323, 66.3%, 86.6%)',
				type: 'color',
			},
			pink7: {
				value: 'hsl(323, 62.0%, 80.1%)',
				type: 'color',
			},
			pink8: {
				value: 'hsl(323, 60.3%, 72.4%)',
				type: 'color',
			},
			pink9: {
				value: 'hsl(322, 65.0%, 54.5%)',
				type: 'color',
			},
			pink10: {
				value: 'hsl(322, 63.9%, 50.7%)',
				type: 'color',
			},
			pink11: {
				value: 'hsl(322, 75.0%, 46.0%)',
				type: 'color',
			},
			pink12: {
				value: 'hsl(320, 70.0%, 13.5%)',
				type: 'color',
			},
		},
		pinkA: {
			pinkA1: {
				value: 'hsla(320, 100%, 51.0%, 0.012)',
				type: 'color',
			},
			pinkA2: {
				value: 'hsla(323, 100%, 51.0%, 0.032)',
				type: 'color',
			},
			pinkA3: {
				value: 'hsla(323, 98.9%, 47.3%, 0.067)',
				type: 'color',
			},
			pinkA4: {
				value: 'hsla(323, 99.9%, 44.3%, 0.102)',
				type: 'color',
			},
			pinkA5: {
				value: 'hsla(324, 99.9%, 42.3%, 0.153)',
				type: 'color',
			},
			pinkA6: {
				value: 'hsla(323, 99.5%, 39.6%, 0.224)',
				type: 'color',
			},
			pinkA7: {
				value: 'hsla(323, 99.7%, 38.5%, 0.322)',
				type: 'color',
			},
			pinkA8: {
				value: 'hsla(323, 99.5%, 37.7%, 0.444)',
				type: 'color',
			},
			pinkA9: {
				value: 'hsla(322, 99.7%, 39.3%, 0.750)',
				type: 'color',
			},
			pinkA10: {
				value: 'hsla(322, 100%, 39.1%, 0.808)',
				type: 'color',
			},
			pinkA11: {
				value: 'hsla(322, 99.8%, 39.0%, 0.887)',
				type: 'color',
			},
			pinkA12: {
				value: 'hsla(321, 99.8%, 10.0%, 0.961)',
				type: 'color',
			},
		},
		pinkDark: {
			pink1: {
				value: 'hsl(318, 25.0%, 9.6%)',
				type: 'color',
			},
			pink2: {
				value: 'hsl(319, 32.2%, 11.6%)',
				type: 'color',
			},
			pink3: {
				value: 'hsl(319, 41.0%, 16.0%)',
				type: 'color',
			},
			pink4: {
				value: 'hsl(320, 45.4%, 18.7%)',
				type: 'color',
			},
			pink5: {
				value: 'hsl(320, 49.0%, 21.1%)',
				type: 'color',
			},
			pink6: {
				value: 'hsl(321, 53.6%, 24.4%)',
				type: 'color',
			},
			pink7: {
				value: 'hsl(321, 61.1%, 29.7%)',
				type: 'color',
			},
			pink8: {
				value: 'hsl(322, 74.9%, 37.5%)',
				type: 'color',
			},
			pink9: {
				value: 'hsl(322, 65.0%, 54.5%)',
				type: 'color',
			},
			pink10: {
				value: 'hsl(323, 72.8%, 59.2%)',
				type: 'color',
			},
			pink11: {
				value: 'hsl(325, 90.0%, 66.4%)',
				type: 'color',
			},
			pink12: {
				value: 'hsl(322, 90.0%, 95.8%)',
				type: 'color',
			},
		},
		pinkDarkA: {
			pinkA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			pinkA2: {
				value: 'hsla(320, 98.1%, 64.1%, 0.036)',
				type: 'color',
			},
			pinkA3: {
				value: 'hsla(320, 99.1%, 63.1%, 0.121)',
				type: 'color',
			},
			pinkA4: {
				value: 'hsla(320, 99.5%, 62.7%, 0.170)',
				type: 'color',
			},
			pinkA5: {
				value: 'hsla(319, 99.7%, 61.5%, 0.219)',
				type: 'color',
			},
			pinkA6: {
				value: 'hsla(322, 99.4%, 60.8%, 0.291)',
				type: 'color',
			},
			pinkA7: {
				value: 'hsla(321, 99.6%, 58.7%, 0.407)',
				type: 'color',
			},
			pinkA8: {
				value: 'hsla(322, 99.7%, 55.4%, 0.608)',
				type: 'color',
			},
			pinkA9: {
				value: 'hsla(322, 100%, 64.6%, 0.817)',
				type: 'color',
			},
			pinkA10: {
				value: 'hsla(323, 100%, 66.3%, 0.875)',
				type: 'color',
			},
			pinkA11: {
				value: 'hsla(325, 99.9%, 68.6%, 0.960)',
				type: 'color',
			},
			pinkA12: {
				value: 'hsla(314, 100%, 96.9%, 0.980)',
				type: 'color',
			},
		},
		plum: {
			plum1: {
				value: 'hsl(292, 90.0%, 99.4%)',
				type: 'color',
			},
			plum2: {
				value: 'hsl(300, 100%, 98.6%)',
				type: 'color',
			},
			plum3: {
				value: 'hsl(299, 71.2%, 96.4%)',
				type: 'color',
			},
			plum4: {
				value: 'hsl(299, 62.0%, 93.8%)',
				type: 'color',
			},
			plum5: {
				value: 'hsl(298, 56.1%, 90.5%)',
				type: 'color',
			},
			plum6: {
				value: 'hsl(296, 51.3%, 85.8%)',
				type: 'color',
			},
			plum7: {
				value: 'hsl(295, 48.2%, 78.9%)',
				type: 'color',
			},
			plum8: {
				value: 'hsl(292, 47.7%, 70.8%)',
				type: 'color',
			},
			plum9: {
				value: 'hsl(292, 45.0%, 51.0%)',
				type: 'color',
			},
			plum10: {
				value: 'hsl(292, 50.2%, 46.9%)',
				type: 'color',
			},
			plum11: {
				value: 'hsl(292, 60.0%, 42.5%)',
				type: 'color',
			},
			plum12: {
				value: 'hsl(291, 66.0%, 14.0%)',
				type: 'color',
			},
		},
		plumA: {
			plumA1: {
				value: 'hsla(280, 100%, 51.0%, 0.012)',
				type: 'color',
			},
			plumA2: {
				value: 'hsla(300, 100%, 51.0%, 0.028)',
				type: 'color',
			},
			plumA3: {
				value: 'hsla(300, 99.0%, 40.9%, 0.063)',
				type: 'color',
			},
			plumA4: {
				value: 'hsla(300, 99.9%, 38.5%, 0.102)',
				type: 'color',
			},
			plumA5: {
				value: 'hsla(298, 98.2%, 35.9%, 0.150)',
				type: 'color',
			},
			plumA6: {
				value: 'hsla(297, 99.6%, 33.7%, 0.216)',
				type: 'color',
			},
			plumA7: {
				value: 'hsla(295, 99.7%, 32.6%, 0.314)',
				type: 'color',
			},
			plumA8: {
				value: 'hsla(292, 99.6%, 32.4%, 0.432)',
				type: 'color',
			},
			plumA9: {
				value: 'hsla(292, 99.9%, 31.0%, 0.710)',
				type: 'color',
			},
			plumA10: {
				value: 'hsla(292, 99.9%, 30.8%, 0.765)',
				type: 'color',
			},
			plumA11: {
				value: 'hsla(292, 99.8%, 30.7%, 0.832)',
				type: 'color',
			},
			plumA12: {
				value: 'hsla(291, 99.9%, 9.7%, 0.953)',
				type: 'color',
			},
		},
		plumDark: {
			plum1: {
				value: 'hsl(301, 20.0%, 9.4%)',
				type: 'color',
			},
			plum2: {
				value: 'hsl(300, 29.8%, 11.2%)',
				type: 'color',
			},
			plum3: {
				value: 'hsl(298, 34.4%, 15.3%)',
				type: 'color',
			},
			plum4: {
				value: 'hsl(297, 36.8%, 18.3%)',
				type: 'color',
			},
			plum5: {
				value: 'hsl(296, 38.5%, 21.1%)',
				type: 'color',
			},
			plum6: {
				value: 'hsl(295, 40.4%, 24.7%)',
				type: 'color',
			},
			plum7: {
				value: 'hsl(294, 42.7%, 30.6%)',
				type: 'color',
			},
			plum8: {
				value: 'hsl(292, 45.1%, 40.0%)',
				type: 'color',
			},
			plum9: {
				value: 'hsl(292, 45.0%, 51.0%)',
				type: 'color',
			},
			plum10: {
				value: 'hsl(295, 50.0%, 55.4%)',
				type: 'color',
			},
			plum11: {
				value: 'hsl(300, 60.0%, 62.0%)',
				type: 'color',
			},
			plum12: {
				value: 'hsl(296, 74.0%, 95.7%)',
				type: 'color',
			},
		},
		plumDarkA: {
			plumA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			plumA2: {
				value: 'hsla(300, 96.4%, 58.4%, 0.036)',
				type: 'color',
			},
			plumA3: {
				value: 'hsla(300, 99.4%, 67.1%, 0.102)',
				type: 'color',
			},
			plumA4: {
				value: 'hsla(295, 99.8%, 66.3%, 0.155)',
				type: 'color',
			},
			plumA5: {
				value: 'hsla(295, 99.4%, 67.1%, 0.204)',
				type: 'color',
			},
			plumA6: {
				value: 'hsla(294, 99.0%, 67.8%, 0.262)',
				type: 'color',
			},
			plumA7: {
				value: 'hsla(294, 99.9%, 67.7%, 0.363)',
				type: 'color',
			},
			plumA8: {
				value: 'hsla(292, 99.8%, 67.5%, 0.527)',
				type: 'color',
			},
			plumA9: {
				value: 'hsla(292, 99.9%, 69.2%, 0.695)',
				type: 'color',
			},
			plumA10: {
				value: 'hsla(295, 99.9%, 70.8%, 0.748)',
				type: 'color',
			},
			plumA11: {
				value: 'hsla(300, 99.8%, 72.9%, 0.828)',
				type: 'color',
			},
			plumA12: {
				value: 'hsla(300, 100%, 97.1%, 0.980)',
				type: 'color',
			},
		},
		purple: {
			purple1: {
				value: 'hsl(280, 65.0%, 99.4%)',
				type: 'color',
			},
			purple2: {
				value: 'hsl(276, 100%, 99.0%)',
				type: 'color',
			},
			purple3: {
				value: 'hsl(276, 83.1%, 97.0%)',
				type: 'color',
			},
			purple4: {
				value: 'hsl(275, 76.4%, 94.7%)',
				type: 'color',
			},
			purple5: {
				value: 'hsl(275, 70.8%, 91.8%)',
				type: 'color',
			},
			purple6: {
				value: 'hsl(274, 65.4%, 87.8%)',
				type: 'color',
			},
			purple7: {
				value: 'hsl(273, 61.0%, 81.7%)',
				type: 'color',
			},
			purple8: {
				value: 'hsl(272, 60.0%, 73.5%)',
				type: 'color',
			},
			purple9: {
				value: 'hsl(272, 51.0%, 54.0%)',
				type: 'color',
			},
			purple10: {
				value: 'hsl(272, 46.8%, 50.3%)',
				type: 'color',
			},
			purple11: {
				value: 'hsl(272, 50.0%, 45.8%)',
				type: 'color',
			},
			purple12: {
				value: 'hsl(272, 66.0%, 16.0%)',
				type: 'color',
			},
		},
		purpleA: {
			purpleA1: {
				value: 'hsla(300, 94.3%, 34.6%, 0.012)',
				type: 'color',
			},
			purpleA2: {
				value: 'hsla(276, 100%, 51.0%, 0.020)',
				type: 'color',
			},
			purpleA3: {
				value: 'hsla(277, 99.6%, 46.5%, 0.055)',
				type: 'color',
			},
			purpleA4: {
				value: 'hsla(274, 97.9%, 44.3%, 0.095)',
				type: 'color',
			},
			purpleA5: {
				value: 'hsla(276, 98.6%, 42.0%, 0.142)',
				type: 'color',
			},
			purpleA6: {
				value: 'hsla(275, 100%, 39.2%, 0.200)',
				type: 'color',
			},
			purpleA7: {
				value: 'hsla(273, 99.2%, 38.2%, 0.295)',
				type: 'color',
			},
			purpleA8: {
				value: 'hsla(272, 99.7%, 37.6%, 0.424)',
				type: 'color',
			},
			purpleA9: {
				value: 'hsla(272, 99.6%, 34.0%, 0.695)',
				type: 'color',
			},
			purpleA10: {
				value: 'hsla(272, 99.7%, 32.0%, 0.730)',
				type: 'color',
			},
			purpleA11: {
				value: 'hsla(272, 99.8%, 29.7%, 0.773)',
				type: 'color',
			},
			purpleA12: {
				value: 'hsla(272, 99.2%, 11.3%, 0.946)',
				type: 'color',
			},
		},
		purpleDark: {
			purple1: {
				value: 'hsl(284, 20.0%, 9.6%)',
				type: 'color',
			},
			purple2: {
				value: 'hsl(283, 30.0%, 11.8%)',
				type: 'color',
			},
			purple3: {
				value: 'hsl(281, 37.5%, 16.5%)',
				type: 'color',
			},
			purple4: {
				value: 'hsl(280, 41.2%, 20.0%)',
				type: 'color',
			},
			purple5: {
				value: 'hsl(279, 43.8%, 23.3%)',
				type: 'color',
			},
			purple6: {
				value: 'hsl(277, 46.4%, 27.5%)',
				type: 'color',
			},
			purple7: {
				value: 'hsl(275, 49.3%, 34.6%)',
				type: 'color',
			},
			purple8: {
				value: 'hsl(272, 52.1%, 45.9%)',
				type: 'color',
			},
			purple9: {
				value: 'hsl(272, 51.0%, 54.0%)',
				type: 'color',
			},
			purple10: {
				value: 'hsl(273, 57.3%, 59.1%)',
				type: 'color',
			},
			purple11: {
				value: 'hsl(275, 80.0%, 71.0%)',
				type: 'color',
			},
			purple12: {
				value: 'hsl(279, 75.0%, 95.7%)',
				type: 'color',
			},
		},
		purpleDarkA: {
			purpleA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			purpleA2: {
				value: 'hsla(280, 96.5%, 57.5%, 0.045)',
				type: 'color',
			},
			purpleA3: {
				value: 'hsla(279, 98.7%, 62.8%, 0.129)',
				type: 'color',
			},
			purpleA4: {
				value: 'hsla(279, 99.1%, 64.0%, 0.191)',
				type: 'color',
			},
			purpleA5: {
				value: 'hsla(278, 99.8%, 64.2%, 0.248)',
				type: 'color',
			},
			purpleA6: {
				value: 'hsla(276, 99.6%, 64.6%, 0.328)',
				type: 'color',
			},
			purpleA7: {
				value: 'hsla(274, 99.9%, 64.6%, 0.456)',
				type: 'color',
			},
			purpleA8: {
				value: 'hsla(272, 99.7%, 64.6%, 0.660)',
				type: 'color',
			},
			purpleA9: {
				value: 'hsla(272, 99.9%, 69.1%, 0.748)',
				type: 'color',
			},
			purpleA10: {
				value: 'hsla(273, 100%, 71.3%, 0.801)',
				type: 'color',
			},
			purpleA11: {
				value: 'hsla(275, 99.9%, 75.3%, 0.934)',
				type: 'color',
			},
			purpleA12: {
				value: 'hsla(286, 100%, 97.1%, 0.980)',
				type: 'color',
			},
		},
		red: {
			red1: {
				value: 'hsl(359, 100%, 99.4%)',
				type: 'color',
			},
			red2: {
				value: 'hsl(359, 100%, 98.6%)',
				type: 'color',
			},
			red3: {
				value: 'hsl(360, 100%, 96.8%)',
				type: 'color',
			},
			red4: {
				value: 'hsl(360, 97.9%, 94.8%)',
				type: 'color',
			},
			red5: {
				value: 'hsl(360, 90.2%, 91.9%)',
				type: 'color',
			},
			red6: {
				value: 'hsl(360, 81.7%, 87.8%)',
				type: 'color',
			},
			red7: {
				value: 'hsl(359, 74.2%, 81.7%)',
				type: 'color',
			},
			red8: {
				value: 'hsl(359, 69.5%, 74.3%)',
				type: 'color',
			},
			red9: {
				value: 'hsl(358, 75.0%, 59.0%)',
				type: 'color',
			},
			red10: {
				value: 'hsl(358, 69.4%, 55.2%)',
				type: 'color',
			},
			red11: {
				value: 'hsl(358, 65.0%, 48.7%)',
				type: 'color',
			},
			red12: {
				value: 'hsl(354, 50.0%, 14.6%)',
				type: 'color',
			},
		},
		redA: {
			redA1: {
				value: 'hsla(0, 100%, 51.0%, 0.012)',
				type: 'color',
			},
			redA2: {
				value: 'hsla(0, 100%, 51.0%, 0.032)',
				type: 'color',
			},
			redA3: {
				value: 'hsla(0, 100%, 50.2%, 0.063)',
				type: 'color',
			},
			redA4: {
				value: 'hsla(0, 100%, 50.0%, 0.102)',
				type: 'color',
			},
			redA5: {
				value: 'hsla(0, 99.9%, 47.5%, 0.153)',
				type: 'color',
			},
			redA6: {
				value: 'hsla(0, 99.5%, 44.9%, 0.224)',
				type: 'color',
			},
			redA7: {
				value: 'hsla(359, 99.7%, 42.7%, 0.318)',
				type: 'color',
			},
			redA8: {
				value: 'hsla(359, 99.6%, 41.1%, 0.436)',
				type: 'color',
			},
			redA9: {
				value: 'hsla(358, 99.9%, 42.9%, 0.718)',
				type: 'color',
			},
			redA10: {
				value: 'hsla(358, 99.9%, 41.0%, 0.761)',
				type: 'color',
			},
			redA11: {
				value: 'hsla(358, 99.8%, 38.3%, 0.832)',
				type: 'color',
			},
			redA12: {
				value: 'hsla(355, 99.3%, 7.9%, 0.926)',
				type: 'color',
			},
		},
		redDark: {
			red1: {
				value: 'hsl(353, 23.0%, 9.8%)',
				type: 'color',
			},
			red2: {
				value: 'hsl(357, 34.4%, 12.0%)',
				type: 'color',
			},
			red3: {
				value: 'hsl(356, 43.4%, 16.4%)',
				type: 'color',
			},
			red4: {
				value: 'hsl(356, 47.6%, 19.2%)',
				type: 'color',
			},
			red5: {
				value: 'hsl(356, 51.1%, 21.9%)',
				type: 'color',
			},
			red6: {
				value: 'hsl(356, 55.2%, 25.9%)',
				type: 'color',
			},
			red7: {
				value: 'hsl(357, 60.2%, 31.8%)',
				type: 'color',
			},
			red8: {
				value: 'hsl(358, 65.0%, 40.4%)',
				type: 'color',
			},
			red9: {
				value: 'hsl(358, 75.0%, 59.0%)',
				type: 'color',
			},
			red10: {
				value: 'hsl(358, 85.3%, 64.0%)',
				type: 'color',
			},
			red11: {
				value: 'hsl(358, 100%, 69.5%)',
				type: 'color',
			},
			red12: {
				value: 'hsl(351, 89.0%, 96.0%)',
				type: 'color',
			},
		},
		redDarkA: {
			redA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			redA2: {
				value: 'hsla(5, 98.5%, 53.8%, 0.045)',
				type: 'color',
			},
			redA3: {
				value: 'hsla(359, 99.1%, 61.1%, 0.130)',
				type: 'color',
			},
			redA4: {
				value: 'hsla(358, 98.8%, 61.0%, 0.184)',
				type: 'color',
			},
			redA5: {
				value: 'hsla(357, 99.6%, 60.3%, 0.237)',
				type: 'color',
			},
			redA6: {
				value: 'hsla(358, 99.6%, 60.3%, 0.322)',
				type: 'color',
			},
			redA7: {
				value: 'hsla(357, 100%, 59.5%, 0.442)',
				type: 'color',
			},
			redA8: {
				value: 'hsla(358, 99.8%, 59.1%, 0.621)',
				type: 'color',
			},
			redA9: {
				value: 'hsla(358, 100%, 65.5%, 0.884)',
				type: 'color',
			},
			redA10: {
				value: 'hsla(358, 100%, 67.5%, 0.942)',
				type: 'color',
			},
			redA11: {
				value: 'hsla(358, 100%, 69.7%, 0.980)',
				type: 'color',
			},
			redA12: {
				value: 'hsla(352, 100%, 97.1%, 0.980)',
				type: 'color',
			},
		},
		sage: {
			sage1: {
				value: 'hsl(155, 30.0%, 98.8%)',
				type: 'color',
			},
			sage2: {
				value: 'hsl(150, 16.7%, 97.6%)',
				type: 'color',
			},
			sage3: {
				value: 'hsl(151, 10.6%, 95.2%)',
				type: 'color',
			},
			sage4: {
				value: 'hsl(151, 8.8%, 93.0%)',
				type: 'color',
			},
			sage5: {
				value: 'hsl(151, 7.8%, 90.8%)',
				type: 'color',
			},
			sage6: {
				value: 'hsl(152, 7.2%, 88.4%)',
				type: 'color',
			},
			sage7: {
				value: 'hsl(153, 6.7%, 85.3%)',
				type: 'color',
			},
			sage8: {
				value: 'hsl(154, 6.1%, 77.5%)',
				type: 'color',
			},
			sage9: {
				value: 'hsl(155, 3.5%, 55.5%)',
				type: 'color',
			},
			sage10: {
				value: 'hsl(154, 2.8%, 51.7%)',
				type: 'color',
			},
			sage11: {
				value: 'hsl(155, 3.0%, 43.0%)',
				type: 'color',
			},
			sage12: {
				value: 'hsl(155, 24.0%, 9.0%)',
				type: 'color',
			},
		},
		sageA: {
			sageA1: {
				value: 'hsla(150, 92.6%, 26.5%, 0.016)',
				type: 'color',
			},
			sageA2: {
				value: 'hsla(150, 87.7%, 16.0%, 0.028)',
				type: 'color',
			},
			sageA3: {
				value: 'hsla(160, 98.4%, 10.9%, 0.055)',
				type: 'color',
			},
			sageA4: {
				value: 'hsla(140, 92.3%, 8.5%, 0.075)',
				type: 'color',
			},
			sageA5: {
				value: 'hsla(160, 86.0%, 6.9%, 0.099)',
				type: 'color',
			},
			sageA6: {
				value: 'hsla(156, 95.1%, 8.2%, 0.126)',
				type: 'color',
			},
			sageA7: {
				value: 'hsla(156, 98.6%, 6.3%, 0.157)',
				type: 'color',
			},
			sageA8: {
				value: 'hsla(154, 94.6%, 6.0%, 0.240)',
				type: 'color',
			},
			sageA9: {
				value: 'hsla(154, 98.7%, 3.0%, 0.459)',
				type: 'color',
			},
			sageA10: {
				value: 'hsla(154, 93.5%, 2.9%, 0.499)',
				type: 'color',
			},
			sageA11: {
				value: 'hsla(154, 95.2%, 2.5%, 0.585)',
				type: 'color',
			},
			sageA12: {
				value: 'hsla(158, 97.0%, 2.4%, 0.934)',
				type: 'color',
			},
		},
		sageDark: {
			sage1: {
				value: 'hsl(155, 7.0%, 8.4%)',
				type: 'color',
			},
			sage2: {
				value: 'hsl(150, 7.4%, 10.6%)',
				type: 'color',
			},
			sage3: {
				value: 'hsl(150, 6.7%, 13.1%)',
				type: 'color',
			},
			sage4: {
				value: 'hsl(150, 6.4%, 15.3%)',
				type: 'color',
			},
			sage5: {
				value: 'hsl(150, 6.1%, 17.4%)',
				type: 'color',
			},
			sage6: {
				value: 'hsl(150, 5.8%, 19.9%)',
				type: 'color',
			},
			sage7: {
				value: 'hsl(150, 5.5%, 23.6%)',
				type: 'color',
			},
			sage8: {
				value: 'hsl(150, 5.1%, 30.6%)',
				type: 'color',
			},
			sage9: {
				value: 'hsl(155, 6.0%, 42.5%)',
				type: 'color',
			},
			sage10: {
				value: 'hsl(153, 4.8%, 48.2%)',
				type: 'color',
			},
			sage11: {
				value: 'hsl(155, 5.0%, 61.8%)',
				type: 'color',
			},
			sage12: {
				value: 'hsl(155, 6.0%, 93.0%)',
				type: 'color',
			},
		},
		sageDarkA: {
			sageA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			sageA2: {
				value: 'hsla(123, 94.4%, 91.4%, 0.026)',
				type: 'color',
			},
			sageA3: {
				value: 'hsla(123, 82.9%, 91.0%, 0.057)',
				type: 'color',
			},
			sageA4: {
				value: 'hsla(124, 97.9%, 94.5%, 0.082)',
				type: 'color',
			},
			sageA5: {
				value: 'hsla(125, 90.0%, 95.2%, 0.104)',
				type: 'color',
			},
			sageA6: {
				value: 'hsla(142, 95.1%, 94.8%, 0.134)',
				type: 'color',
			},
			sageA7: {
				value: 'hsla(143, 92.8%, 95.7%, 0.173)',
				type: 'color',
			},
			sageA8: {
				value: 'hsla(146, 94.7%, 95.3%, 0.255)',
				type: 'color',
			},
			sageA9: {
				value: 'hsla(151, 98.2%, 94.4%, 0.397)',
				type: 'color',
			},
			sageA10: {
				value: 'hsla(148, 99.5%, 95.5%, 0.457)',
				type: 'color',
			},
			sageA11: {
				value: 'hsla(152, 95.1%, 97.3%, 0.600)',
				type: 'color',
			},
			sageA12: {
				value: 'hsla(149, 93.3%, 99.6%, 0.927)',
				type: 'color',
			},
		},
		sand: {
			sand1: {
				value: 'hsl(50, 20.0%, 99.0%)',
				type: 'color',
			},
			sand2: {
				value: 'hsl(60, 7.7%, 97.5%)',
				type: 'color',
			},
			sand3: {
				value: 'hsl(59, 6.5%, 95.1%)',
				type: 'color',
			},
			sand4: {
				value: 'hsl(58, 6.1%, 92.9%)',
				type: 'color',
			},
			sand5: {
				value: 'hsl(57, 6.0%, 90.7%)',
				type: 'color',
			},
			sand6: {
				value: 'hsl(56, 5.9%, 88.4%)',
				type: 'color',
			},
			sand7: {
				value: 'hsl(55, 5.9%, 85.2%)',
				type: 'color',
			},
			sand8: {
				value: 'hsl(51, 6.0%, 77.1%)',
				type: 'color',
			},
			sand9: {
				value: 'hsl(50, 2.0%, 55.7%)',
				type: 'color',
			},
			sand10: {
				value: 'hsl(55, 1.7%, 51.9%)',
				type: 'color',
			},
			sand11: {
				value: 'hsl(50, 2.0%, 43.1%)',
				type: 'color',
			},
			sand12: {
				value: 'hsl(50, 6.0%, 10.0%)',
				type: 'color',
			},
		},
		sandA: {
			sandA1: {
				value: 'hsla(60, 89.3%, 18.3%, 0.012)',
				type: 'color',
			},
			sandA2: {
				value: 'hsla(60, 78.1%, 9.0%, 0.028)',
				type: 'color',
			},
			sandA3: {
				value: 'hsla(60, 99.0%, 3.9%, 0.051)',
				type: 'color',
			},
			sandA4: {
				value: 'hsla(60, 88.9%, 5.9%, 0.075)',
				type: 'color',
			},
			sandA5: {
				value: 'hsla(60, 86.0%, 6.9%, 0.099)',
				type: 'color',
			},
			sandA6: {
				value: 'hsla(60, 93.2%, 5.2%, 0.122)',
				type: 'color',
			},
			sandA7: {
				value: 'hsla(60, 98.3%, 5.1%, 0.157)',
				type: 'color',
			},
			sandA8: {
				value: 'hsla(51, 94.1%, 6.0%, 0.244)',
				type: 'color',
			},
			sandA9: {
				value: 'hsla(60, 99.8%, 1.7%, 0.451)',
				type: 'color',
			},
			sandA10: {
				value: 'hsla(60, 90.7%, 1.8%, 0.491)',
				type: 'color',
			},
			sandA11: {
				value: 'hsla(45, 93.7%, 1.5%, 0.577)',
				type: 'color',
			},
			sandA12: {
				value: 'hsla(60, 98.0%, 0.7%, 0.906)',
				type: 'color',
			},
		},
		sandDark: {
			sand1: {
				value: 'hsl(61, 2.0%, 8.3%)',
				type: 'color',
			},
			sand2: {
				value: 'hsl(60, 3.7%, 10.6%)',
				type: 'color',
			},
			sand3: {
				value: 'hsl(58, 3.7%, 13.1%)',
				type: 'color',
			},
			sand4: {
				value: 'hsl(57, 3.6%, 15.3%)',
				type: 'color',
			},
			sand5: {
				value: 'hsl(56, 3.7%, 17.4%)',
				type: 'color',
			},
			sand6: {
				value: 'hsl(55, 3.7%, 19.9%)',
				type: 'color',
			},
			sand7: {
				value: 'hsl(53, 3.7%, 23.6%)',
				type: 'color',
			},
			sand8: {
				value: 'hsl(50, 3.8%, 30.6%)',
				type: 'color',
			},
			sand9: {
				value: 'hsl(50, 4.0%, 42.7%)',
				type: 'color',
			},
			sand10: {
				value: 'hsl(52, 3.1%, 48.3%)',
				type: 'color',
			},
			sand11: {
				value: 'hsl(50, 4.0%, 61.8%)',
				type: 'color',
			},
			sand12: {
				value: 'hsl(56, 4.0%, 92.8%)',
				type: 'color',
			},
		},
		sandDarkA: {
			sandA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			sandA2: {
				value: 'hsla(60, 89.8%, 91.4%, 0.026)',
				type: 'color',
			},
			sandA3: {
				value: 'hsla(60, 95.5%, 92.5%, 0.056)',
				type: 'color',
			},
			sandA4: {
				value: 'hsla(60, 75.6%, 96.4%, 0.078)',
				type: 'color',
			},
			sandA5: {
				value: 'hsla(60, 81.9%, 95.2%, 0.104)',
				type: 'color',
			},
			sandA6: {
				value: 'hsla(41, 87.6%, 94.8%, 0.134)',
				type: 'color',
			},
			sandA7: {
				value: 'hsla(60, 95.4%, 96.2%, 0.172)',
				type: 'color',
			},
			sandA8: {
				value: 'hsla(49, 93.5%, 95.7%, 0.254)',
				type: 'color',
			},
			sandA9: {
				value: 'hsla(52, 97.3%, 96.2%, 0.391)',
				type: 'color',
			},
			sandA10: {
				value: 'hsla(52, 97.8%, 96.7%, 0.451)',
				type: 'color',
			},
			sandA11: {
				value: 'hsla(51, 97.0%, 97.8%, 0.597)',
				type: 'color',
			},
			sandA12: {
				value: 'hsla(60, 88.7%, 99.8%, 0.923)',
				type: 'color',
			},
		},
		sky: {
			sky1: {
				value: 'hsl(193, 100%, 98.8%)',
				type: 'color',
			},
			sky2: {
				value: 'hsl(193, 100%, 97.3%)',
				type: 'color',
			},
			sky3: {
				value: 'hsl(193, 99.0%, 94.7%)',
				type: 'color',
			},
			sky4: {
				value: 'hsl(193, 91.4%, 91.4%)',
				type: 'color',
			},
			sky5: {
				value: 'hsl(194, 82.0%, 86.6%)',
				type: 'color',
			},
			sky6: {
				value: 'hsl(194, 74.1%, 79.5%)',
				type: 'color',
			},
			sky7: {
				value: 'hsl(194, 72.3%, 69.6%)',
				type: 'color',
			},
			sky8: {
				value: 'hsl(193, 77.9%, 53.9%)',
				type: 'color',
			},
			sky9: {
				value: 'hsl(193, 98.0%, 70.0%)',
				type: 'color',
			},
			sky10: {
				value: 'hsl(193, 87.0%, 66.5%)',
				type: 'color',
			},
			sky11: {
				value: 'hsl(195, 100%, 31.5%)',
				type: 'color',
			},
			sky12: {
				value: 'hsl(195, 100%, 13.0%)',
				type: 'color',
			},
		},
		skyA: {
			skyA1: {
				value: 'hsla(190, 100%, 51.0%, 0.024)',
				type: 'color',
			},
			skyA2: {
				value: 'hsla(193, 100%, 50.1%, 0.055)',
				type: 'color',
			},
			skyA3: {
				value: 'hsla(193, 100%, 50.1%, 0.106)',
				type: 'color',
			},
			skyA4: {
				value: 'hsla(194, 99.6%, 47.7%, 0.165)',
				type: 'color',
			},
			skyA5: {
				value: 'hsla(194, 99.2%, 45.4%, 0.244)',
				type: 'color',
			},
			skyA6: {
				value: 'hsla(194, 99.9%, 42.3%, 0.357)',
				type: 'color',
			},
			skyA7: {
				value: 'hsla(194, 99.8%, 42.2%, 0.526)',
				type: 'color',
			},
			skyA8: {
				value: 'hsla(193, 99.9%, 43.8%, 0.820)',
				type: 'color',
			},
			skyA9: {
				value: 'hsla(193, 99.7%, 49.4%, 0.593)',
				type: 'color',
			},
			skyA10: {
				value: 'hsla(193, 99.8%, 46.6%, 0.628)',
				type: 'color',
			},
			skyA11: {
				value: 'hsla(196, 100%, 31.2%, 0.980)',
				type: 'color',
			},
			skyA12: {
				value: 'hsla(196, 100%, 12.2%, 0.980)',
				type: 'color',
			},
		},
		skyDark: {
			sky1: {
				value: 'hsl(205, 45.0%, 8.6%)',
				type: 'color',
			},
			sky2: {
				value: 'hsl(202, 71.4%, 9.6%)',
				type: 'color',
			},
			sky3: {
				value: 'hsl(201, 74.6%, 12.2%)',
				type: 'color',
			},
			sky4: {
				value: 'hsl(201, 77.4%, 14.4%)',
				type: 'color',
			},
			sky5: {
				value: 'hsl(200, 80.3%, 16.5%)',
				type: 'color',
			},
			sky6: {
				value: 'hsl(200, 84.1%, 18.9%)',
				type: 'color',
			},
			sky7: {
				value: 'hsl(199, 90.2%, 22.1%)',
				type: 'color',
			},
			sky8: {
				value: 'hsl(198, 100%, 26.1%)',
				type: 'color',
			},
			sky9: {
				value: 'hsl(193, 98.0%, 70.0%)',
				type: 'color',
			},
			sky10: {
				value: 'hsl(192, 100%, 77.0%)',
				type: 'color',
			},
			sky11: {
				value: 'hsl(192, 85.0%, 55.8%)',
				type: 'color',
			},
			sky12: {
				value: 'hsl(198, 98.0%, 95.8%)',
				type: 'color',
			},
		},
		skyDarkA: {
			skyA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			skyA2: {
				value: 'hsla(208, 100%, 49.8%, 0.045)',
				type: 'color',
			},
			skyA3: {
				value: 'hsla(201, 100%, 49.8%, 0.099)',
				type: 'color',
			},
			skyA4: {
				value: 'hsla(201, 100%, 50.0%, 0.148)',
				type: 'color',
			},
			skyA5: {
				value: 'hsla(200, 100%, 49.8%, 0.198)',
				type: 'color',
			},
			skyA6: {
				value: 'hsla(199, 100%, 49.9%, 0.256)',
				type: 'color',
			},
			skyA7: {
				value: 'hsla(199, 100%, 49.9%, 0.337)',
				type: 'color',
			},
			skyA8: {
				value: 'hsla(199, 100%, 50.0%, 0.453)',
				type: 'color',
			},
			skyA9: {
				value: 'hsla(192, 100%, 70.8%, 0.980)',
				type: 'color',
			},
			skyA10: {
				value: 'hsla(190, 100%, 77.6%, 0.980)',
				type: 'color',
			},
			skyA11: {
				value: 'hsla(192, 99.9%, 59.6%, 0.924)',
				type: 'color',
			},
			skyA12: {
				value: 'hsla(189, 100%, 96.8%, 0.980)',
				type: 'color',
			},
		},
		slate: {
			slate1: {
				value: 'hsl(206, 30.0%, 98.8%)',
				type: 'color',
			},
			slate2: {
				value: 'hsl(210, 16.7%, 97.6%)',
				type: 'color',
			},
			slate3: {
				value: 'hsl(209, 13.3%, 95.3%)',
				type: 'color',
			},
			slate4: {
				value: 'hsl(209, 12.2%, 93.2%)',
				type: 'color',
			},
			slate5: {
				value: 'hsl(208, 11.7%, 91.1%)',
				type: 'color',
			},
			slate6: {
				value: 'hsl(208, 11.3%, 88.9%)',
				type: 'color',
			},
			slate7: {
				value: 'hsl(207, 11.1%, 85.9%)',
				type: 'color',
			},
			slate8: {
				value: 'hsl(205, 10.7%, 78.0%)',
				type: 'color',
			},
			slate9: {
				value: 'hsl(206, 6.0%, 56.1%)',
				type: 'color',
			},
			slate10: {
				value: 'hsl(206, 5.8%, 52.3%)',
				type: 'color',
			},
			slate11: {
				value: 'hsl(206, 6.0%, 43.5%)',
				type: 'color',
			},
			slate12: {
				value: 'hsl(206, 24.0%, 9.0%)',
				type: 'color',
			},
		},
		slateA: {
			slateA1: {
				value: 'hsla(210, 92.6%, 26.5%, 0.016)',
				type: 'color',
			},
			slateA2: {
				value: 'hsla(210, 87.7%, 16.0%, 0.028)',
				type: 'color',
			},
			slateA3: {
				value: 'hsla(210, 98.8%, 14.4%, 0.055)',
				type: 'color',
			},
			slateA4: {
				value: 'hsla(210, 94.1%, 11.1%, 0.075)',
				type: 'color',
			},
			slateA5: {
				value: 'hsla(216, 91.1%, 10.9%, 0.099)',
				type: 'color',
			},
			slateA6: {
				value: 'hsla(206, 96.4%, 11.3%, 0.126)',
				type: 'color',
			},
			slateA7: {
				value: 'hsla(210, 99.1%, 10.1%, 0.157)',
				type: 'color',
			},
			slateA8: {
				value: 'hsla(205, 96.5%, 10.0%, 0.244)',
				type: 'color',
			},
			slateA9: {
				value: 'hsla(206, 98.8%, 5.9%, 0.467)',
				type: 'color',
			},
			slateA10: {
				value: 'hsla(206, 99.6%, 5.4%, 0.506)',
				type: 'color',
			},
			slateA11: {
				value: 'hsla(206, 97.0%, 4.8%, 0.593)',
				type: 'color',
			},
			slateA12: {
				value: 'hsla(202, 97.0%, 2.4%, 0.934)',
				type: 'color',
			},
		},
		slateDark: {
			slate1: {
				value: 'hsl(200, 7.0%, 8.8%)',
				type: 'color',
			},
			slate2: {
				value: 'hsl(195, 7.1%, 11.0%)',
				type: 'color',
			},
			slate3: {
				value: 'hsl(197, 6.8%, 13.6%)',
				type: 'color',
			},
			slate4: {
				value: 'hsl(198, 6.6%, 15.8%)',
				type: 'color',
			},
			slate5: {
				value: 'hsl(199, 6.4%, 17.9%)',
				type: 'color',
			},
			slate6: {
				value: 'hsl(201, 6.2%, 20.5%)',
				type: 'color',
			},
			slate7: {
				value: 'hsl(203, 6.0%, 24.3%)',
				type: 'color',
			},
			slate8: {
				value: 'hsl(207, 5.6%, 31.6%)',
				type: 'color',
			},
			slate9: {
				value: 'hsl(206, 6.0%, 43.9%)',
				type: 'color',
			},
			slate10: {
				value: 'hsl(206, 5.2%, 49.5%)',
				type: 'color',
			},
			slate11: {
				value: 'hsl(206, 6.0%, 63.0%)',
				type: 'color',
			},
			slate12: {
				value: 'hsl(210, 6.0%, 93.0%)',
				type: 'color',
			},
		},
		slateDarkA: {
			slateA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			slateA2: {
				value: 'hsla(181, 98.9%, 91.8%, 0.026)',
				type: 'color',
			},
			slateA3: {
				value: 'hsla(182, 86.7%, 91.4%, 0.057)',
				type: 'color',
			},
			slateA4: {
				value: 'hsla(209, 86.7%, 93.9%, 0.083)',
				type: 'color',
			},
			slateA5: {
				value: 'hsla(200, 90.3%, 93.4%, 0.109)',
				type: 'color',
			},
			slateA6: {
				value: 'hsla(209, 95.3%, 93.5%, 0.139)',
				type: 'color',
			},
			slateA7: {
				value: 'hsla(204, 98.5%, 93.9%, 0.182)',
				type: 'color',
			},
			slateA8: {
				value: 'hsla(209, 94.0%, 94.7%, 0.265)',
				type: 'color',
			},
			slateA9: {
				value: 'hsla(207, 97.3%, 94.0%, 0.412)',
				type: 'color',
			},
			slateA10: {
				value: 'hsla(209, 99.4%, 95.2%, 0.472)',
				type: 'color',
			},
			slateA11: {
				value: 'hsla(208, 98.7%, 96.8%, 0.615)',
				type: 'color',
			},
			slateA12: {
				value: 'hsla(211, 86.7%, 99.6%, 0.927)',
				type: 'color',
			},
		},
		teal: {
			teal1: {
				value: 'hsl(165, 60.0%, 98.8%)',
				type: 'color',
			},
			teal2: {
				value: 'hsl(169, 64.7%, 96.7%)',
				type: 'color',
			},
			teal3: {
				value: 'hsl(169, 59.8%, 94.0%)',
				type: 'color',
			},
			teal4: {
				value: 'hsl(169, 53.1%, 90.2%)',
				type: 'color',
			},
			teal5: {
				value: 'hsl(170, 47.1%, 85.0%)',
				type: 'color',
			},
			teal6: {
				value: 'hsl(170, 42.6%, 77.9%)',
				type: 'color',
			},
			teal7: {
				value: 'hsl(170, 39.9%, 68.1%)',
				type: 'color',
			},
			teal8: {
				value: 'hsl(172, 42.1%, 52.5%)',
				type: 'color',
			},
			teal9: {
				value: 'hsl(173, 80.0%, 36.0%)',
				type: 'color',
			},
			teal10: {
				value: 'hsl(173, 83.4%, 32.5%)',
				type: 'color',
			},
			teal11: {
				value: 'hsl(174, 90.0%, 25.2%)',
				type: 'color',
			},
			teal12: {
				value: 'hsl(170, 50.0%, 12.5%)',
				type: 'color',
			},
		},
		tealA: {
			tealA1: {
				value: 'hsla(165, 95.2%, 41.2%, 0.020)',
				type: 'color',
			},
			tealA2: {
				value: 'hsla(169, 99.5%, 39.4%, 0.055)',
				type: 'color',
			},
			tealA3: {
				value: 'hsla(167, 97.6%, 38.1%, 0.095)',
				type: 'color',
			},
			tealA4: {
				value: 'hsla(168, 98.1%, 34.6%, 0.150)',
				type: 'color',
			},
			tealA5: {
				value: 'hsla(170, 99.4%, 32.3%, 0.220)',
				type: 'color',
			},
			tealA6: {
				value: 'hsla(170, 99.7%, 30.1%, 0.314)',
				type: 'color',
			},
			tealA7: {
				value: 'hsla(170, 99.3%, 28.7%, 0.448)',
				type: 'color',
			},
			tealA8: {
				value: 'hsla(172, 99.8%, 29.7%, 0.675)',
				type: 'color',
			},
			tealA9: {
				value: 'hsla(173, 99.8%, 31.1%, 0.930)',
				type: 'color',
			},
			tealA10: {
				value: 'hsla(173, 99.7%, 28.7%, 0.946)',
				type: 'color',
			},
			tealA11: {
				value: 'hsla(174, 99.8%, 23.3%, 0.977)',
				type: 'color',
			},
			tealA12: {
				value: 'hsla(171, 98.8%, 6.8%, 0.938)',
				type: 'color',
			},
		},
		tealDark: {
			teal1: {
				value: 'hsl(168, 48.0%, 6.5%)',
				type: 'color',
			},
			teal2: {
				value: 'hsl(169, 77.8%, 7.1%)',
				type: 'color',
			},
			teal3: {
				value: 'hsl(170, 76.1%, 9.2%)',
				type: 'color',
			},
			teal4: {
				value: 'hsl(171, 75.8%, 11.0%)',
				type: 'color',
			},
			teal5: {
				value: 'hsl(171, 75.7%, 12.8%)',
				type: 'color',
			},
			teal6: {
				value: 'hsl(172, 75.8%, 15.1%)',
				type: 'color',
			},
			teal7: {
				value: 'hsl(172, 76.7%, 18.6%)',
				type: 'color',
			},
			teal8: {
				value: 'hsl(173, 80.2%, 23.7%)',
				type: 'color',
			},
			teal9: {
				value: 'hsl(173, 80.0%, 36.0%)',
				type: 'color',
			},
			teal10: {
				value: 'hsl(174, 83.9%, 38.2%)',
				type: 'color',
			},
			teal11: {
				value: 'hsl(174, 90.0%, 40.7%)',
				type: 'color',
			},
			teal12: {
				value: 'hsl(166, 73.0%, 93.1%)',
				type: 'color',
			},
		},
		tealDarkA: {
			tealA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			tealA2: {
				value: 'hsla(171, 100%, 49.2%, 0.031)',
				type: 'color',
			},
			tealA3: {
				value: 'hsla(172, 100%, 49.7%, 0.070)',
				type: 'color',
			},
			tealA4: {
				value: 'hsla(175, 100%, 49.7%, 0.105)',
				type: 'color',
			},
			tealA5: {
				value: 'hsla(174, 98.9%, 50.1%, 0.140)',
				type: 'color',
			},
			tealA6: {
				value: 'hsla(174, 100%, 51.8%, 0.187)',
				type: 'color',
			},
			tealA7: {
				value: 'hsla(173, 99.6%, 53.2%, 0.257)',
				type: 'color',
			},
			tealA8: {
				value: 'hsla(174, 99.6%, 53.3%, 0.366)',
				type: 'color',
			},
			tealA9: {
				value: 'hsla(173, 99.9%, 54.6%, 0.609)',
				type: 'color',
			},
			tealA10: {
				value: 'hsla(174, 99.9%, 53.8%, 0.670)',
				type: 'color',
			},
			tealA11: {
				value: 'hsla(174, 100%, 52.0%, 0.748)',
				type: 'color',
			},
			tealA12: {
				value: 'hsla(166, 98.6%, 95.0%, 0.979)',
				type: 'color',
			},
		},
		tomato: {
			tomato1: {
				value: 'hsl(10, 100%, 99.4%)',
				type: 'color',
			},
			tomato2: {
				value: 'hsl(8, 100%, 98.4%)',
				type: 'color',
			},
			tomato3: {
				value: 'hsl(8, 100%, 96.6%)',
				type: 'color',
			},
			tomato4: {
				value: 'hsl(8, 100%, 94.3%)',
				type: 'color',
			},
			tomato5: {
				value: 'hsl(8, 92.8%, 91.0%)',
				type: 'color',
			},
			tomato6: {
				value: 'hsl(9, 84.7%, 86.3%)',
				type: 'color',
			},
			tomato7: {
				value: 'hsl(10, 77.3%, 79.5%)',
				type: 'color',
			},
			tomato8: {
				value: 'hsl(10, 71.6%, 71.0%)',
				type: 'color',
			},
			tomato9: {
				value: 'hsl(10, 78.0%, 54.0%)',
				type: 'color',
			},
			tomato10: {
				value: 'hsl(10, 71.5%, 50.0%)',
				type: 'color',
			},
			tomato11: {
				value: 'hsl(10, 82.0%, 43.5%)',
				type: 'color',
			},
			tomato12: {
				value: 'hsl(10, 50.0%, 13.5%)',
				type: 'color',
			},
		},
		tomatoA: {
			tomatoA1: {
				value: 'hsla(0, 100%, 51.0%, 0.012)',
				type: 'color',
			},
			tomatoA2: {
				value: 'hsla(8, 100%, 51.0%, 0.032)',
				type: 'color',
			},
			tomatoA3: {
				value: 'hsla(7, 100%, 50.2%, 0.067)',
				type: 'color',
			},
			tomatoA4: {
				value: 'hsla(8, 100%, 50.1%, 0.114)',
				type: 'color',
			},
			tomatoA5: {
				value: 'hsla(7, 99.5%, 47.9%, 0.173)',
				type: 'color',
			},
			tomatoA6: {
				value: 'hsla(9, 99.9%, 46.2%, 0.255)',
				type: 'color',
			},
			tomatoA7: {
				value: 'hsla(10, 99.8%, 43.6%, 0.365)',
				type: 'color',
			},
			tomatoA8: {
				value: 'hsla(10, 99.5%, 41.8%, 0.499)',
				type: 'color',
			},
			tomatoA9: {
				value: 'hsla(10, 99.9%, 43.8%, 0.820)',
				type: 'color',
			},
			tomatoA10: {
				value: 'hsla(10, 100%, 41.8%, 0.859)',
				type: 'color',
			},
			tomatoA11: {
				value: 'hsla(10, 99.9%, 38.8%, 0.922)',
				type: 'color',
			},
			tomatoA12: {
				value: 'hsla(10, 99.0%, 7.4%, 0.934)',
				type: 'color',
			},
		},
		tomatoDark: {
			tomato1: {
				value: 'hsl(10, 23.0%, 9.4%)',
				type: 'color',
			},
			tomato2: {
				value: 'hsl(9, 44.8%, 11.4%)',
				type: 'color',
			},
			tomato3: {
				value: 'hsl(8, 52.0%, 15.3%)',
				type: 'color',
			},
			tomato4: {
				value: 'hsl(7, 56.3%, 18.0%)',
				type: 'color',
			},
			tomato5: {
				value: 'hsl(7, 60.1%, 20.6%)',
				type: 'color',
			},
			tomato6: {
				value: 'hsl(8, 64.8%, 24.0%)',
				type: 'color',
			},
			tomato7: {
				value: 'hsl(8, 71.2%, 29.1%)',
				type: 'color',
			},
			tomato8: {
				value: 'hsl(10, 80.2%, 35.7%)',
				type: 'color',
			},
			tomato9: {
				value: 'hsl(10, 78.0%, 54.0%)',
				type: 'color',
			},
			tomato10: {
				value: 'hsl(10, 81.7%, 59.0%)',
				type: 'color',
			},
			tomato11: {
				value: 'hsl(10, 85.0%, 62.8%)',
				type: 'color',
			},
			tomato12: {
				value: 'hsl(10, 89.0%, 96.0%)',
				type: 'color',
			},
		},
		tomatoDarkA: {
			tomatoA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			tomatoA2: {
				value: 'hsla(5, 100%, 49.6%, 0.058)',
				type: 'color',
			},
			tomatoA3: {
				value: 'hsla(6, 99.6%, 54.9%, 0.133)',
				type: 'color',
			},
			tomatoA4: {
				value: 'hsla(6, 99.2%, 55.4%, 0.191)',
				type: 'color',
			},
			tomatoA5: {
				value: 'hsla(6, 99.5%, 55.8%, 0.244)',
				type: 'color',
			},
			tomatoA6: {
				value: 'hsla(7, 99.7%, 55.9%, 0.319)',
				type: 'color',
			},
			tomatoA7: {
				value: 'hsla(8, 99.8%, 54.8%, 0.434)',
				type: 'color',
			},
			tomatoA8: {
				value: 'hsla(10, 99.8%, 53.5%, 0.598)',
				type: 'color',
			},
			tomatoA9: {
				value: 'hsla(10, 100%, 59.7%, 0.885)',
				type: 'color',
			},
			tomatoA10: {
				value: 'hsla(10, 100%, 63.6%, 0.916)',
				type: 'color',
			},
			tomatoA11: {
				value: 'hsla(10, 99.7%, 66.4%, 0.939)',
				type: 'color',
			},
			tomatoA12: {
				value: 'hsla(12, 100%, 97.1%, 0.980)',
				type: 'color',
			},
		},
		violet: {
			violet1: {
				value: 'hsl(255, 65.0%, 99.4%)',
				type: 'color',
			},
			violet2: {
				value: 'hsl(252, 100%, 99.0%)',
				type: 'color',
			},
			violet3: {
				value: 'hsl(252, 96.9%, 97.4%)',
				type: 'color',
			},
			violet4: {
				value: 'hsl(252, 91.5%, 95.5%)',
				type: 'color',
			},
			violet5: {
				value: 'hsl(252, 85.1%, 93.0%)',
				type: 'color',
			},
			violet6: {
				value: 'hsl(252, 77.8%, 89.4%)',
				type: 'color',
			},
			violet7: {
				value: 'hsl(252, 71.0%, 83.7%)',
				type: 'color',
			},
			violet8: {
				value: 'hsl(252, 68.6%, 76.3%)',
				type: 'color',
			},
			violet9: {
				value: 'hsl(252, 56.0%, 57.5%)',
				type: 'color',
			},
			violet10: {
				value: 'hsl(251, 48.1%, 53.5%)',
				type: 'color',
			},
			violet11: {
				value: 'hsl(250, 43.0%, 48.0%)',
				type: 'color',
			},
			violet12: {
				value: 'hsl(254, 60.0%, 18.5%)',
				type: 'color',
			},
		},
		violetA: {
			violetA1: {
				value: 'hsla(270, 94.3%, 34.6%, 0.012)',
				type: 'color',
			},
			violetA2: {
				value: 'hsla(252, 100%, 51.0%, 0.020)',
				type: 'color',
			},
			violetA3: {
				value: 'hsla(254, 100%, 50.0%, 0.051)',
				type: 'color',
			},
			violetA4: {
				value: 'hsla(251, 98.3%, 48.2%, 0.087)',
				type: 'color',
			},
			violetA5: {
				value: 'hsla(252, 99.0%, 45.7%, 0.130)',
				type: 'color',
			},
			violetA6: {
				value: 'hsla(251, 99.1%, 44.0%, 0.189)',
				type: 'color',
			},
			violetA7: {
				value: 'hsla(252, 99.5%, 41.7%, 0.279)',
				type: 'color',
			},
			violetA8: {
				value: 'hsla(252, 100%, 40.7%, 0.400)',
				type: 'color',
			},
			violetA9: {
				value: 'hsla(252, 99.9%, 35.8%, 0.663)',
				type: 'color',
			},
			violetA10: {
				value: 'hsla(251, 99.6%, 32.5%, 0.691)',
				type: 'color',
			},
			violetA11: {
				value: 'hsla(250, 99.8%, 28.4%, 0.726)',
				type: 'color',
			},
			violetA12: {
				value: 'hsla(254, 99.5%, 11.9%, 0.926)',
				type: 'color',
			},
		},
		violetDark: {
			violet1: {
				value: 'hsl(250, 20.0%, 10.2%)',
				type: 'color',
			},
			violet2: {
				value: 'hsl(255, 30.3%, 12.9%)',
				type: 'color',
			},
			violet3: {
				value: 'hsl(253, 37.0%, 18.4%)',
				type: 'color',
			},
			violet4: {
				value: 'hsl(252, 40.1%, 22.5%)',
				type: 'color',
			},
			violet5: {
				value: 'hsl(252, 42.2%, 26.2%)',
				type: 'color',
			},
			violet6: {
				value: 'hsl(251, 44.3%, 31.1%)',
				type: 'color',
			},
			violet7: {
				value: 'hsl(250, 46.8%, 38.9%)',
				type: 'color',
			},
			violet8: {
				value: 'hsl(250, 51.8%, 51.2%)',
				type: 'color',
			},
			violet9: {
				value: 'hsl(252, 56.0%, 57.5%)',
				type: 'color',
			},
			violet10: {
				value: 'hsl(251, 63.2%, 63.2%)',
				type: 'color',
			},
			violet11: {
				value: 'hsl(250, 95.0%, 76.8%)',
				type: 'color',
			},
			violet12: {
				value: 'hsl(252, 87.0%, 96.4%)',
				type: 'color',
			},
		},
		violetDarkA: {
			violetA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			violetA2: {
				value: 'hsla(258, 98.2%, 61.0%, 0.054)',
				type: 'color',
			},
			violetA3: {
				value: 'hsla(252, 98.8%, 65.8%, 0.148)',
				type: 'color',
			},
			violetA4: {
				value: 'hsla(253, 99.7%, 65.7%, 0.219)',
				type: 'color',
			},
			violetA5: {
				value: 'hsla(252, 99.7%, 66.4%, 0.286)',
				type: 'color',
			},
			violetA6: {
				value: 'hsla(251, 99.7%, 66.2%, 0.371)',
				type: 'color',
			},
			violetA7: {
				value: 'hsla(250, 99.7%, 66.3%, 0.514)',
				type: 'color',
			},
			violetA8: {
				value: 'hsla(250, 99.7%, 66.1%, 0.733)',
				type: 'color',
			},
			violetA9: {
				value: 'hsla(252, 99.9%, 70.3%, 0.786)',
				type: 'color',
			},
			violetA10: {
				value: 'hsla(251, 99.9%, 72.9%, 0.844)',
				type: 'color',
			},
			violetA11: {
				value: 'hsla(250, 100%, 77.9%, 0.980)',
				type: 'color',
			},
			violetA12: {
				value: 'hsla(254, 100%, 97.5%, 0.980)',
				type: 'color',
			},
		},
		whiteA: {
			whiteA1: {
				value: 'hsla(0, 0%, 100%, 0)',
				type: 'color',
			},
			whiteA2: {
				value: 'hsla(0, 0%, 100%, 0.013)',
				type: 'color',
			},
			whiteA3: {
				value: 'hsla(0, 0%, 100%, 0.034)',
				type: 'color',
			},
			whiteA4: {
				value: 'hsla(0, 0%, 100%, 0.056)',
				type: 'color',
			},
			whiteA5: {
				value: 'hsla(0, 0%, 100%, 0.086)',
				type: 'color',
			},
			whiteA6: {
				value: 'hsla(0, 0%, 100%, 0.124)',
				type: 'color',
			},
			whiteA7: {
				value: 'hsla(0, 0%, 100%, 0.176)',
				type: 'color',
			},
			whiteA8: {
				value: 'hsla(0, 0%, 100%, 0.249)',
				type: 'color',
			},
			whiteA9: {
				value: 'hsla(0, 0%, 100%, 0.386)',
				type: 'color',
			},
			whiteA10: {
				value: 'hsla(0, 0%, 100%, 0.446)',
				type: 'color',
			},
			whiteA11: {
				value: 'hsla(0, 0%, 100%, 0.592)',
				type: 'color',
			},
			whiteA12: {
				value: 'hsla(0, 0%, 100%, 0.923)',
				type: 'color',
			},
		},
		yellow: {
			yellow1: {
				value: 'hsl(60, 54.0%, 98.5%)',
				type: 'color',
			},
			yellow2: {
				value: 'hsl(52, 100%, 95.5%)',
				type: 'color',
			},
			yellow3: {
				value: 'hsl(55, 100%, 90.9%)',
				type: 'color',
			},
			yellow4: {
				value: 'hsl(54, 100%, 86.6%)',
				type: 'color',
			},
			yellow5: {
				value: 'hsl(52, 97.9%, 82.0%)',
				type: 'color',
			},
			yellow6: {
				value: 'hsl(50, 89.4%, 76.1%)',
				type: 'color',
			},
			yellow7: {
				value: 'hsl(47, 80.4%, 68.0%)',
				type: 'color',
			},
			yellow8: {
				value: 'hsl(48, 100%, 46.1%)',
				type: 'color',
			},
			yellow9: {
				value: 'hsl(53, 92.0%, 50.0%)',
				type: 'color',
			},
			yellow10: {
				value: 'hsl(50, 100%, 48.5%)',
				type: 'color',
			},
			yellow11: {
				value: 'hsl(42, 100%, 29.0%)',
				type: 'color',
			},
			yellow12: {
				value: 'hsl(40, 55.0%, 13.5%)',
				type: 'color',
			},
		},
		yellowA: {
			yellowA1: {
				value: 'hsla(60, 94.3%, 34.6%, 0.024)',
				type: 'color',
			},
			yellowA2: {
				value: 'hsla(52, 100%, 50.4%, 0.091)',
				type: 'color',
			},
			yellowA3: {
				value: 'hsla(55, 100%, 50.2%, 0.181)',
				type: 'color',
			},
			yellowA4: {
				value: 'hsla(54, 100%, 50.1%, 0.267)',
				type: 'color',
			},
			yellowA5: {
				value: 'hsla(52, 99.9%, 49.5%, 0.357)',
				type: 'color',
			},
			yellowA6: {
				value: 'hsla(50, 100%, 47.4%, 0.451)',
				type: 'color',
			},
			yellowA7: {
				value: 'hsla(47, 99.8%, 44.6%, 0.577)',
				type: 'color',
			},
			yellowA8: {
				value: 'hsla(48, 100%, 46.0%, 0.980)',
				type: 'color',
			},
			yellowA9: {
				value: 'hsla(53, 100%, 48.0%, 0.961)',
				type: 'color',
			},
			yellowA10: {
				value: 'hsla(50, 100%, 48.4%, 0.980)',
				type: 'color',
			},
			yellowA11: {
				value: 'hsla(42, 100%, 28.6%, 0.980)',
				type: 'color',
			},
			yellowA12: {
				value: 'hsla(41, 98.9%, 8.0%, 0.942)',
				type: 'color',
			},
		},
		yellowDark: {
			yellow1: {
				value: 'hsl(45, 100%, 5.5%)',
				type: 'color',
			},
			yellow2: {
				value: 'hsl(46, 100%, 6.7%)',
				type: 'color',
			},
			yellow3: {
				value: 'hsl(45, 100%, 8.7%)',
				type: 'color',
			},
			yellow4: {
				value: 'hsl(45, 100%, 10.4%)',
				type: 'color',
			},
			yellow5: {
				value: 'hsl(47, 100%, 12.1%)',
				type: 'color',
			},
			yellow6: {
				value: 'hsl(49, 100%, 14.3%)',
				type: 'color',
			},
			yellow7: {
				value: 'hsl(49, 90.3%, 18.4%)',
				type: 'color',
			},
			yellow8: {
				value: 'hsl(50, 100%, 22.0%)',
				type: 'color',
			},
			yellow9: {
				value: 'hsl(53, 92.0%, 50.0%)',
				type: 'color',
			},
			yellow10: {
				value: 'hsl(54, 100%, 68.0%)',
				type: 'color',
			},
			yellow11: {
				value: 'hsl(48, 100%, 47.0%)',
				type: 'color',
			},
			yellow12: {
				value: 'hsl(53, 100%, 91.0%)',
				type: 'color',
			},
		},
		yellowDarkA: {
			yellowA1: {
				value: 'hsla(0, 0%, 0%, 0)',
				type: 'color',
			},
			yellowA2: {
				value: 'hsla(49, 100%, 49.1%, 0.027)',
				type: 'color',
			},
			yellowA3: {
				value: 'hsla(45, 100%, 49.7%, 0.071)',
				type: 'color',
			},
			yellowA4: {
				value: 'hsla(46, 100%, 49.7%, 0.111)',
				type: 'color',
			},
			yellowA5: {
				value: 'hsla(47, 100%, 49.9%, 0.150)',
				type: 'color',
			},
			yellowA6: {
				value: 'hsla(51, 100%, 49.8%, 0.199)',
				type: 'color',
			},
			yellowA7: {
				value: 'hsla(51, 99.8%, 53.6%, 0.269)',
				type: 'color',
			},
			yellowA8: {
				value: 'hsla(51, 100%, 49.9%, 0.371)',
				type: 'color',
			},
			yellowA9: {
				value: 'hsla(53, 100%, 52.0%, 0.956)',
				type: 'color',
			},
			yellowA10: {
				value: 'hsla(56, 100%, 68.4%, 0.980)',
				type: 'color',
			},
			yellowA11: {
				value: 'hsla(48, 100%, 50.0%, 0.934)',
				type: 'color',
			},
			yellowA12: {
				value: 'hsla(60, 100%, 91.8%, 0.980)',
				type: 'color',
			},
		},
	},
};
