'use strict';
document.addEventListener( 'alpine:init', () => {
	Alpine.store( 'radix2', {
		suggestions: {
			complementary: '180',
			'split-complementary': '30',
			triadic: '120',
			tetriadic: '90',
			analogous: '30',
		},
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
			},
		],
		neutrals: [
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
			},
			{
				name: 'Slate',
				pairing: [ 'Iris', 'Indigo', 'Blue', 'Sky' ],
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
			},
			{
				name: 'Sage',
				pairing: [ 'Mint', 'Teal', 'Jade', 'Green' ],
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
			},
			{
				name: 'Olive',
				pairing: [ 'Grass', 'Lime' ],
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
			},
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
			},
		],
	} );
} );
/*
** RADIX COLOR PARSER
function computedFromVariable(category){
var steps = ['1','2','3','4','5','6','7','8','9','10','11','12',]
var container = document.querySelectorAll(".rt-ContainerInner")[1];
var i = 0;
var arr = [];
var mode = "===> LIGHT "
if(document.querySelector("html").classList.contains("dark-theme")){
mode = "===> DARK "
}
steps.forEach((step)=>{
i++;
var proto = {
        "step": "1",
        "value": "fff"
        }

var varName = "--" + category + "-" + step;
proto.step = i;

proto.value = window.getComputedStyle(container).getPropertyValue(varName);
arr.push(proto);
})

}
console.clear()
computedFromVariable('grass');


*/
