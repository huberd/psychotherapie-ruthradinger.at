'use strict';
document.addEventListener('alpine:init', () => {
	Alpine.store('connect', {
		tokenConnect() {
			window.dispatchEvent(headspinReloadTokenAPP);
			var buffer = '';
			Alpine.store('project').inbox.warnings.length = 0;
			/**
			 * Generate Headspin system variables 
			 * system:true 
			 */

			buffer += generaTokenCSS__colorTable(true);
			buffer += generaTokenCSS__plainText(true);
			buffer += generaTokenCSS__fluid2(true);
			/**
			 * Generate rest of CSS variables
			 * system:false 
			 */
			buffer += generaTokenCSS__colorTable(false);
			buffer += generaTokenCSS__plainText(false);
			buffer += generaTokenCSS__fluid2(false);

			generateContextMenuVariables();
			return buffer;
		},
		boilerplates: [
			{
				name: 'Breakdance',
				data: [
					{
						name: 'Section',
						folder: {
							name: 'Breakdance',
							icon: 'ii-breakdance',
							uuid: '50bf896c-939a-4e1c-bf53-771089e8d668',
						},
						group: {
							name: 'Section',
							icon: 'ii-size',
							uuid: '3c9a64b5-5017-4228-825d-2ea3c9a99289',
						},
						data: [
							{
								"id": "e0901344-f33a-4f43-b065-163027c9682e",
								"uuid": "cde03ec7-a7b0-4505-a8fc-2a8543c16db1",
								"label": "Section constrained width",
								"cssVar": "--bde-section-width",
								"method": "plainText",
								"public": true,
								"system": false,
								"linked": false,
								"tags": [],
								"dark": "",
								"light": "",
								"plainText": "var(--hsx-page-width)",
								"desc": "Controls constrained section max-width. "
							},
							{
								"id": "123bcf30-b417-4ea3-b123-e1ac3e87d6f6",
								"uuid": "dd134684-f7ea-42f5-8255-62aa6ff5aab6",
								"label": "Section horizontal padding",
								"cssVar": "--bde-section-horizontal-padding",
								"method": "plainText",
								"public": true,
								"system": false,
								"linked": false,
								"tags": [],
								"dark": "",
								"light": "",
								"plainText": "var(--hsx-min-offset)",
								"desc": "Controls constrained section padding to the edge of screen."
							},
							{
								"id": "9a272d95-2104-46f9-85e8-b7e45dc70011",
								"uuid": "6e1fc05e-567e-4f90-b86d-42f8d24534ef",
								"label": "Section column gap",
								"cssVar": "--bde-column-gap",
								"method": "plainText",
								"public": true,
								"system": false,
								"linked": false,
								"tags": [],
								"dark": "",
								"light": "",
								"plainText": "var(--hsx-page-gap)",
								"desc": "Controls default column gap on the page."
							}
						]
					},
					{

						name: 'Global Colors',
						folder: {
							name: 'Breakdance',
							icon: 'ii-breakdance',
							uuid: '50bf896c-939a-4e1c-bf53-771089e8d668',
						},
						group: {
							name: 'Global Colors',
							icon: 'ii-palette',
							uuid: '2c9a64b5-5017-4228-825d-2ea3c9a99289',
						},
						data: [
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
					},
					{
						name: 'Typography',
						folder: {
							name: 'Breakdance',
							icon: 'ii-breakdance',
							uuid: '50bf896c-939a-4e1c-bf53-771089e8d668',
						},
						group: {
							name: 'Typography',
							icon: 'ii-palette',
							uuid: 'ee3540e4-115c-47d1-8949-d1c0e55d616c',
						},
						data: [
							{
								"id": "ef39db58-b815-47a6-8ad6-18a7f876cff8",
								"label": "H1 Headings",
								"cssVar": "--bde-h1-font-size",
								"method": "plainText",
								"dark": "",
								"light": "",
								"plainText": "var(--hfs-h1)",
								"uuid": "ee0704fd-4b8f-4fa7-be69-a3e1646486d1"
							},
							{
								"id": "28c13503-4e19-4db0-af48-93daf6961e29",
								"label": "H2 Headings",
								"cssVar": "--bde-h2-font-size",
								"method": "plainText",
								"dark": "",
								"light": "",
								"plainText": "var(--hfs-h2)",
								"uuid": "f45b39b4-c5b0-4d1b-9d5d-697a064610f7"
							},
							{
								"id": "d877601f-0888-4f92-9cdd-6f0c6fd86f44",
								"label": "H3 Headings",
								"cssVar": "--bde-h3-font-size",
								"method": "plainText",
								"dark": "",
								"light": "",
								"plainText": "var(--hfs-h3)",
								"uuid": "c1d5e4cf-91db-4e52-ac57-14837c68f036"
							},
							{
								"id": "ab1f84a9-8c26-4286-ac23-86f5d50bda06",
								"label": "H4 Headings",
								"cssVar": "--bde-h4-font-size",
								"method": "plainText",
								"dark": "",
								"light": "",
								"plainText": "var(--hfs-h4)",
								"uuid": "291f1d47-fb2b-4c8a-aab4-d9052b39b68c"
							},
							{
								"id": "d0db95fd-8c72-4bda-bac1-e4185f06fa8a",
								"label": "H5 Headings",
								"cssVar": "--bde-h5-font-size",
								"method": "plainText",
								"dark": "",
								"light": "",
								"plainText": "var(--hfs-h5)",
								"uuid": "3d0f729c-dd9e-43d5-b6f2-0f59b85f7a2b"
							},
							{
								"id": "da9f302e-3901-45f1-b450-51c80af030c1",
								"label": "H6 Headings",
								"cssVar": "--bde-h6-font-size",
								"method": "plainText",
								"dark": "",
								"light": "",
								"plainText": "var(--hfs-h6)",
								"uuid": "01fb5e44-735d-406b-8597-562cf273d406"
							},
							{
								"id": "d4ee4154-7819-4499-b518-ab2c24777b2f",
								"label": "Text (body)",
								"cssVar": "--bde-body-font-size",
								"method": "plainText",
								"dark": "",
								"light": "",
								"plainText": "var(--hfs-text-m)",
								"uuid": "688785fe-f5c7-4b4d-a7df-c1cd53210384"
							}
						],
					},
				],
			},
		],
		/********************* */
		/*  LOGIC
	  * Check if needed to create any variable ?!?
	  * 1: Check if target group exist
	  * 1.1: If does not exist, check for targeted collection
	  * 1.2: Create what needed
	  * 2. Update types,
	  * 3. Make array of missing variables, eg. user changed method, update method and fast forward update values
	  * 4. Create missing variables
	  * 5. Maybe redrawing part of app is good idea after this
	  ****
	  * use function createCollection() for creating missing collection
	  * use function createGroup() for creating missing group
	  * use function createGroup() for creating missing tokens
	  * use function updateToken() for updating tokens when there is method missmatch
	  /********************* */
		importBoilerplate(ci, bi, skipUpdate) {

			var inventory = this.boilerplates[ci].data[bi],
				collections = Alpine.store('pd').themeTokens.folders;
			var folderUUID = inventory.folder.uuid,
				groupUUID = inventory.group.uuid;
			var presetArr = [],
				includedArr = [],
				diffArray,
				presetIndex = 0;
			var folder = undefined,
				group = undefined,
				tk = undefined;
			inventory.data.forEach((token) => {
				presetArr.push(token.cssVar.trim());
			});
			collections.forEach((collection) => {
				if (collection.uuid == folderUUID) folder = collection;
				if (collection['groups'] == undefined)
					collection['groups'] = [];
				collection.groups.forEach((g) => {
					if (g.uuid == groupUUID) group = g;
					g.data.forEach((to) => {
						if (presetArr.includes(to.cssVar)) {
							includedArr.push(to.cssVar);
							presetIndex = presetArr.indexOf(to.cssVar);
							tk = inventory.data[presetIndex];

							if (tk.method != to.method)
								this.updateToken(to, tk);
						}
					});
				});
			});
			//If all tokens exist, we need stop
			if (presetArr.length == includedArr.length) return false;
			diffArray = presetArr.filter(
				(x) => !includedArr.includes(x)
			);
			//check if we have group, or we need to create one
			if (group == undefined) {
				//check do we know at least folder where we could create, if not create one
				if (folder == undefined)
					folder = this.createCollection(inventory);

				group = this.createGroup(folder, inventory);
				this.createTokenDiff(group, diffArray, inventory);
			}
			//we have group, we don't need to care about folder where it placed
			else this.createTokenDiff(group, diffArray, inventory);
			if (!skipUpdate) window.dispatchEvent(headspinReloadTokenAPP);
		},
		/*
		 * Added in v1.1
		 * Description: When we add boilerplate, we don't know collection where to add if that was removed, this function creates dependency collection
		 */
		createCollection(inventory) {
			var collection = {
				name: inventory.folder.name,
				icon: inventory.folder.icon,
				id: Alpine.store('project').generateUUID(),
				uuid: inventory.folder.uuid,
				active: false,
				groups: [],
			};
			if (Alpine.store('pd').themeTokens['folders'] == undefined)
				Alpine.store('pd').themeTokens['folders'] = [];
			Alpine.store('pd').themeTokens['folders'].push(collection);
			return Alpine.store('pd').themeTokens['folders'][
				Alpine.store('pd').themeTokens['folders'].length - 1
			];
		},
		/*
		 * Added in v1.1
		 * Description: When we add boilerplate, we don't know group where to add if that was removed, this function creates dependency group
		 */
		createGroup(folder, invetory) {
			var group = {
				id: Alpine.store('project').generateUUID(),
				uuid: invetory.group.uuid,
				name: invetory.group.name,
				note: '',
				public: true,
				icon: invetory.group.icon,
				group: 'dsadasd655das',
				data: [],
			};
			if (folder['groups'] == undefined) folder['groups'] = [];
			folder['groups'].push(group);
			return folder['groups'][folder['groups'].length - 1];
		},
		/*
		 * Added in v1.1
		 * Description: Before this function we create 2 arrays one containes boilerplate vars, other for found
		 * After that we create diffArray which contains values which should be added, and we execute diff adding via this function
		 */
		createTokenDiff(group, diffArray, inventory) {
			inventory.data.forEach((t) => {
				if (diffArray.includes(t.cssVar)) group.data.push(t);
			});
		},
		/*
		 * Added in v1.1
		 * Description: Helper function used when we find token from boilerplate within existing tokens, do some check and fixing if needed in non-destructive manne
		 */
		updateToken(t, tk) {
			t.method = tk.method;
			if (tk.method == 'colorTable') {
				t.light = tk.light;
				t.dark = tk.dark;
			}
			if (tk.method == 'plainText') {
				t.plainText = tk.plainText;
			}
			if (tk.method == 'fluid2') {
				t.fluidMin = tk.fluidMin;
				t.fluidMax = tk.fluidMax;
			}
		},
	});
});
/****************************************************************** */
/*
 * Added in v1.1
 * Description: System collection should always be the first item
 * Don't mutate orginal data source, return modified copy
 */
function moveToFront(x) {
	var collection = JSON.parse(JSON.stringify(x))
	for (var i = 0; i < collection.length; i++) {
		if (collection[i]['system'] === true) {
			collection = collection.splice(i, 1).concat(collection);
			break;
		}
	}
	return collection;
}
/****************************************************************** */
/*
 * Added in v1.1
 * Description: Generate CSS colorTable tokens
 */
function systemCondition(status, system) {

	if (status == undefined || status == null) status = false;
	if (status == true && system == true) return true;
	if (status == false && system == false) return true;
	return false;

}
function generaTokenCSS__colorTable(system) {
	var l, d, v;
	var buffer = '';
	var bufferControl = true;
	if (system) buffer = "/*Headspin System*/\n";
	var bufferLight = '';
	var bufferDark = '';
	var bufferMain = '';
	var selector = '';
	var selectorLight = '';
	var selectorDark = '';
	var theme = ['light', 'dark'];
	if (Alpine.store('pd').defaultTheme == 'dark')
		theme = ['dark', 'light'];
	var light = theme[0];
	var dark = theme[1];
	var collectionsCopy = moveToFront(Alpine.store('pd').themeTokens.folders)

	collectionsCopy.forEach((collection) => {

		if (collection['groups'] === undefined) collection['groups'] = [];

		if (systemCondition(collection['system'], system)) {
			collection.groups.forEach((group) => {
				if (group['data'] === undefined) group['data'] = [];
				group.data.forEach((token) => {
					if (token.method == 'colorTable') {
						let important = token?.important ? ' !important' : '';

						l = token[light];
						d = token[dark];
						prepareTokens(l, d, light, dark, token);
						l = token[light];
						d = token[dark];
						if (validateTokenVariable(token)) {
							if (isColor(l)) {
								bufferLight += `\n\t${token.cssVar}: ${token[light]};`;
							}
							else {
								if (isColor(resolveChromaColor(l, 'light'))) {
									bufferLight += `\n\t${token.cssVar}: ${resolveChromaColor(token[light], 'light')};`;
								}
							}
							if (
								token[light].trim() != token[dark].trim() ||
								token[dark].includes('var(--') ||
								token[dark].includes('$c2')
							) {
								if (isColor(d)) {
									bufferDark += `\n\t${token.cssVar}: ${token[dark]}${important};`;
								}
								else {
									if (isColor(resolveChromaColor(d, 'dark'))) {
										bufferDark += `\n\t${token.cssVar}: ${resolveChromaColor(token[dark], 'dark')}${important};`;
									}
								}
							}
						}
					}
				});
			});
		}



	});
	collectionsCopy = null;
	if (bufferLight.length < 10 && bufferDark.length < 10) bufferControl = false;

	bufferMain =
		selectorCSS(Alpine.store('project').baseThemeSelector(), bufferLight) +
		selectorCSS(Alpine.store('project').altThemeSelector(), bufferDark);
	if (!bufferControl) return "";
	return bufferMain;
}
/*
 * Added in v1.1
 * Description: Generate CSS code for plainText tokens
 */
function generaTokenCSS__plainText(system) {
	var buffer = '';
	var bufferControl = true;
	if (system) buffer = "/*Headspin System*/\n";
	var collectionsCopy = moveToFront(Alpine.store('pd').themeTokens.folders)
	collectionsCopy.forEach((collection) => {
		if (collection['groups'] === undefined) collection['groups'] = [];
		if (systemCondition(collection['system'], system)) {
			collection.groups.forEach((group) => {
				if (group['data'] === undefined) group['data'] = [];
				group.data.forEach((token) => {
					if (token.method == 'plainText') {
						if (
							validateTokenVariable(token) &&
							validateTokenPlain(token)
						) {
							buffer += `${token.cssVar}: ${token.plainText};\n`;
						}
					}
				});
			});
		}
	});
	collectionsCopy = null;
	if (buffer.length < 5) bufferControl = false;
	buffer = selectorCSS('html:root', buffer);
	if (!bufferControl) return "";
	return buffer;
}
/*
 * Added in v1.1
 * Description: Generate CSS code for fluid tokens
 */
function generaTokenCSS__fluid2(system) {
	var buffer = '';
	var bufferControl = true;
	if (system) buffer = "/*Headspin System*/\n";
	var bufferCQ = '';
	var obj = {};
	var collectionsCopy = moveToFront(Alpine.store('pd').themeTokens.folders)
	collectionsCopy.forEach((collection) => {
		if (collection['groups'] === undefined) collection['groups'] = [];
		if (systemCondition(collection['system'], system)) {
			collection.groups.forEach((group) => {
				if (group['data'] === undefined) group['data'] = [];
				group.data.forEach((token) => {
					if (token.method == 'fluid2') {
						if (
							validateTokenVariable(token) &&
							validateTokenFluid(token)
						) {
							obj = Alpine.store('project').clampGeneratorBasic(
								token.fluidMax,
								token.fluidMin
							);
							buffer += `${token.cssVar}: ${obj.cssRule};\n`;
							bufferCQ += `${token.cssVar}: ${obj.cqRule};\n`;
						}
					}
				});
			});
		}
	});
	collectionsCopy = null;
	if (buffer.length < 5) bufferControl = false;
	buffer = selectorCSS('html:root', buffer);
	bufferCQ = selectorCSS_CQ('html:root', bufferCQ);
	if (!bufferControl) return "";
	return buffer + bufferCQ;
}
/*
 * Added in v1.1
 * Description: Function to generate token Variables inside context menu
 */
function generateContextMenuVariables() {
	var token_plate = {};
	var cat = "";
	var fmax = "";
	var fmin = "";
	var l = "DEL"
	Alpine.store('project').vars = [];
	Alpine.store('pd').themeTokens.folders.forEach((collection) => {
		if (collection['groups'] === undefined) collection['groups'] = [];
		collection.groups.forEach((group) => {
			if (group['data'] === undefined) group['data'] = [];
			if (group['convention']) {
				if (group['convention'].length > 2) {
					group.data.forEach((token) => {
						cat = group.name;
						if (token['fluidMin']) fmin = token['fluidMin'];
						if (token['fluidMax']) fmax = token['fluidMax'];
						l = token.cssVar.replaceAll(group['convention'], "");
						if (group['convention'] == '--hfs-h') l = "H" + l;

						token_plate = {
							var: token.cssVar,
							label: l,
							category: cat,
							min: fmin,
							max: fmax,
							desc: '',
						};
						Alpine.store('project').vars.push(token_plate);

					})
				}
			}
		});
	});
}
/****************************************************************** */

/*
 * Added in v1.1
 * Description: Create CSS wrapper around buffered CSS code
 */
function selectorCSS(selector, code) {
	return `${selector} {\n\t${code}\n}`;
}
/*
 * Added in v1.1
 * Description: Create CSS wrapper for supporting of container queries
 */
function selectorCSS_CQ(selector, code) {
	var css = `${selector} {\n\t${code}\n}`;
	var cq = `\n\n@supports (font-size: 1cqi) {\n\t${css}\n}`;
	return cq;
}
/*
 * Added in v1.1
 * Description: Prepare tokens, remove potential white spaces, and do some stuff to make better passing validation
 * Note: Goal of validation is to prevent only invalid values, we should do trim(), removing whitespace, and some preparation to catch some
 * common mistakes which could be fixed programatically
 */
function prepareTokens(l, d, t1, t2, token) {
	if (!validateColor(l, token) && validateColor(d, token))
		token[t1] = d;
}
/*
 * Added in v1.1
 * Description: Validate if arg is color
 */
function validateColor(color, token) {

	if (color.length < 3)
		return pushWarning(
			'Invalid color value',
			'Please revisit data for token:',
			token
		);
	if (color.includes('var(--') && color.includes(')')) return true;
	try {
		return isColor(color);
	} catch (error) {
		pushWarning(
			'Invalid color value',
			'Please revisit data for token:',
			token
		);
	}
	return true;
}
/*
 * Added in v1.1
 * Description: Validate form of target value for token
 */
function validateTokenVariable(token) {
	token.cssVar = token.cssVar.replaceAll(' ', '').trim();
	token.cssVar = token.cssVar.replaceAll('.', '-');
	token.cssVar = token.cssVar.replaceAll('/', '-');
	token.cssVar = token.cssVar.replaceAll('var(', '').replaceAll(')', '');
	var css = token.cssVar;
	if (css.length < 5)
		return pushWarning(
			'CSS variable to short',
			'Please revisit data for token:',
			token
		);
	if (css[0] != '-')
		return pushWarning(
			'CSS variable needs to start with double dash, eg. --my-varname',
			'Please revisit data for token:',
			token
		);
	if (css[1] != '-')
		return pushWarning(
			'CSS variable needs to start with double dash, eg. --my-varname',
			'Please revisit data for token:',
			token
		);
	if (css.includes(' '))
		return pushWarning(
			'CSS should not contain whitespace, eg. --my-varname',
			'Please revisit data for token:',
			token
		);
	return true;
	//TODO validation feedback
}
/*
 * Added in v1.1
 * Description: Check if arg is color
 */
const isColor = (strColor) => {
	const s = new Option().style;
	s.color = strColor;
	return s.color !== '';
};
/*
 * Added in v1.1
 * Description: Validator for fluid2 type of tokens
 */
function validateTokenFluid(token) {
	token.fluidMin = token.fluidMin
		.toString()
		.trim()
		.replaceAll(';', '')
		.replaceAll('px', '')
		.replaceAll('rem', '')
		.replaceAll('em', '')
		.replaceAll('vw', '')
		.replaceAll('vh', '');
	token.fluidMax = token.fluidMax
		.toString()
		.trim()
		.replaceAll(';', '')
		.replaceAll('px', '')
		.replaceAll('rem', '')
		.replaceAll('em', '')
		.replaceAll('vw', '')
		.replaceAll('vh', '');
	token.fluidMin = Number(token.fluidMin);
	token.fluidMax = Number(token.fluidMax);

	if (isNumber(token.fluidMin) && isNumber(token.fluidMax)) {
		if (token.fluidMin > token.fluidMax) token.fluidMax = token.fluidMin;
		if (token.fluidMin < 3)
			return pushWarning(
				'Check minimal fluid value for tokens',
				'Please revisit data for token:',
				token
			);
		return true;
	}
	return pushWarning(
		'Fluid tokens should include numerical values only',
		'Please revisit data for token:',
		token
	);
}
/*
 * Added in v1.1
 * Description: Validator for plainText type of tokens
 */
function validateTokenPlain(token) {
	if (token.plainText) token.plainText = token.plainText.trim().replaceAll(';', '');

	return true;
}
/*
 * Added in v1.1
 * Description: Simple check to see if arg is a number
 */
function isNumber(value) {
	return typeof value === 'number';
}
/************************************************************* */
/*
 * Added in v1.1
 * Description: Used to push notfification about errors while generating tokens
 */
function pushWarning(title, msg, data) {
	var e = {};
	info = '';
	if (data) {
		var info = {
			label: data.label,
			variable: data.cssVar,
		};
	}
	var errors = Alpine.store('project').inbox.errors;
	var warnings = Alpine.store('project').inbox.warnings;
	info = JSON.stringify(info)
		.replaceAll('{', '\n')
		.replaceAll('}', '\n')
		.replaceAll(':', ' => ')
		.replaceAll(',', '\n');
	var mess = msg + info;
	/* 1: Site loaded via https, site URL made as http  */
	e['title'] = title;
	e['message'] = mess;
	e['level'] = 'Token: ';
	warnings.push(e);

	return false;
}
/*
 * Added in v1.1
 * Usage: contrastRule("$c(2, 4.5)", "light");
 * Description: Not in use yet, needs polish, but works right now
 */
function contrastRule(rule, mode) {
	rule = rule.replaceAll('$c(', '');
	rule = rule.replaceAll(')', '');
	rule = rule.replaceAll(' ', '');
	var whileStoper = 1000;
	var flag = true;
	var iteration = 0;
	var scoreW = 0;
	var scoreB = 0;
	var ruleArr = rule.split(',');
	var valueArr = [];
	var x = Number(parseInt(ruleArr[0]) + Number(1));
	var contrast = Number(parseFloat(ruleArr[1]));
	var startColor = 'white';
	var endColor = 'white';

	var brands = Alpine.store('pd').brandColorSchema.data;
	var neutrals = Alpine.store('pd').neutralColorSchema.data;
	var schemas = Alpine.store('pd').colorSchemas;

	valueArr.push(brands[mode][x]);
	valueArr.push(neutrals[mode][x]);
	schemas.forEach((s) => {

		valueArr.push(s.data[mode][x]);
	});

	valueArr.forEach((v) => {
		if (chroma.contrast('white', v.value) > contrast) scoreW++;
	});
	valueArr.forEach((v) => {
		startColor = 'black';
		scoreB++;
	});
	if (scoreB > scoreW) {
		startColor = 'black';
		endColor = 'black';
	}
	while (iteration < whileStoper && flag) {
		if (endColor == 'black')
			startColor = chroma(startColor).brighten(
				0 + iteration / whileStoper
			);
		if (endColor == 'white') startColor = chroma(startColor).darken();
		valueArr.forEach((v) => {
			var c = chroma.contrast(startColor, v.value);

			if (c > contrast && c < contrast + 0.25) {
				endColor = chroma(startColor).hex();
				flag = false;
			}
		});

		iteration++;
	}
}

/*
 * Added in v2.0
 * Usage: $hsv(h,s,v)
 * Description: Resolver for HSV color space
 */
function resolveHSV(color) {

	const match = color.match(/\$hsv\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
	if (!match) {
		throw new Error("Invalid HSV format. Use $hsv(h, s, v)");
	}

	const [, h, s, v] = match.map(Number);
	return chroma.hsv(h, s / 100, v / 100).hex();
}
/*
 * Added in v2.0
 * Usage: $lab(L,a,b)
 * Description: Resolver for LAB color space
 * chroma.lab(Lightness, a, b)
	CIE Lab color space. To calculate the lightness value of a color, 
	the CIE Lab color space uses a reference white point. 
	This reference white point defines what is considered 
	to be "white" in the color space. By default chroma.js is using the D65 reference point.
 */
function resolveLAB(color) {
	const match = color.match(/\$lab\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\)/);
	if (!match) {
		throw new Error("Invalid LAB format. Use $lab(l, a, b)");
	}

	const [, l, a, b] = match.map(Number);
	return chroma.lab(l, a, b).hex();
}
/*
 * Added in v2.0
 * Usage: $lch(L,c,h)
 * Description: Resolver for LCH color space
 * chroma.lch(Lightness, chroma, hue)
	The range for lightness and chroma depend on the hue, 
	but go roughly from 0..100-150. The range for hue is 0..360.
 */
function resolveLCH(color) {

	const match = color.match(/\$lch\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\)/);
	if (!match) {
		throw new Error("Invalid LCH format. Use $lch(l, c, h)");
	}

	const [, l, c, h] = match.map(Number);
	return chroma.lch(l, c, h).hex();
}
/*
 * Added in v2.0
 * Usage: $oklab(l,a,b)
 * Description: Resolver for OK LAB color space
 * https://bottosson.github.io/posts/oklab/
 */
function resolveOKLAB(color) {

	const match = color.match(/\$oklab\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\)/);
	if (!match) {
		throw new Error("Invalid OKLAB format. Use $oklab(l, a, b)");
	}

	const [, l, a, b] = match.map(Number);
	return chroma.oklab(l, a, b).hex();
}
/*
 * Added in v2.0
 * Usage: $oklch(l,a,b)
 * Description: chroma.oklch(Lightness, chromacity, hue)
 * https://bottosson.github.io/posts/oklab/
 */

function resolveOKLCH(color) {

	const match = color.match(/\$oklch\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\)/);
	if (!match) {
		throw new Error("Invalid OKLCH format. Use $oklch(l, c, h)");
	}

	const [, l, c, h] = match.map(Number);
	return chroma.oklch(l, c, h).hex();
}

function resolveContrast2(input, mode) {
	// Regex to match $c2(bg_color, contrast_ratio)
	const match = input.match(/\$c2\(\s*([\w\-\(\)#,.\s]+)\s*,\s*([\d.]+)\s*\)/);
	const { resolver } = Alpine.store('iframe')
	if (!match) {
		throw new Error("Invalid input format. Use: '$c2(bg_color, contrast_ratio)'");
	}

	let bgColor;
	try {
		bgColor = chroma(match[1]).hex();
	} catch (error) {
		bgColor = Alpine.store('iframe').getComputedVariable(match[1], mode);
	}

	const targetContrast = parseFloat(match[2]);
	if (!chroma.valid(bgColor)) {
		resolver.push("Invalid background color");
		return bgColor;
	}

	const bgLuminance = chroma(bgColor).luminance();

	// Initialize foreground color based on background luminance
	// If background is light, start with dark color, and vice versa
	let fgColor = bgLuminance > 0.5 ? chroma('black') : chroma('white');

	const maxIterations = 50;
	let iteration = 0;

	let minLuminance = 0;
	let maxLuminance = 1;
	let currentContrast;
	let bestFgColor = fgColor;
	let bestContrast = chroma.contrast(bgColor, fgColor);
	const tolerance = 0.01;

	while (iteration < maxIterations) {
		iteration++;

		let midLuminance = (minLuminance + maxLuminance) / 2;
		fgColor = chroma(fgColor).luminance(midLuminance);
		currentContrast = chroma.contrast(bgColor, fgColor);

		// Store this result if it's valid and better than our previous best
		if (currentContrast >= targetContrast &&
			(currentContrast < bestContrast || bestContrast < targetContrast)) {
			bestFgColor = chroma(fgColor);
			bestContrast = currentContrast;
		}

		// Check if we're within acceptable range
		if (Math.abs(currentContrast - targetContrast) < tolerance &&
			currentContrast >= targetContrast) {
			break;
		}

		if (currentContrast > targetContrast) {
			// If contrast is too high, move towards background color
			if (bgLuminance > 0.5) {
				minLuminance = midLuminance;
			} else {
				maxLuminance = midLuminance;
			}
		} else {
			// If contrast is too low, move away from background color
			if (bgLuminance > 0.5) {
				maxLuminance = midLuminance;
			} else {
				minLuminance = midLuminance;
			}
		}
	}

	// Use the best result we found
	if (bestContrast >= targetContrast) {
		fgColor = bestFgColor;
	} else {
		// If we didn't find a valid contrast, use the extreme opposite
		fgColor = chroma(bgLuminance > 0.5 ? 'black' : 'white');
	}


	const finalContrast = chroma.contrast(bgColor, fgColor);

	return fgColor.hex();
}
function resolveCSSVar() {

}
window.resolveChromaColor = function (color, mode) {
	if (color.startsWith("$hsv")) return resolveHSV(color);
	if (color.startsWith("$lab")) return resolveLAB(color);
	if (color.startsWith("$lch")) return resolveLCH(color);
	if (color.startsWith("$oklab")) return resolveOKLAB(color);
	if (color.startsWith("$oklch")) return resolveOKLCH(color);
	if (color.startsWith("$c2")) return resolveContrast2(color, mode);
	//throw new Error("Unsupported color format");
}