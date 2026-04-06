'use strict';
const swal_timeout = 1000;
addEventListener('DOMContentLoaded', (event) => {
	window.hsColorToEdit = 0;
	window.rt_CSS = new BroadcastChannel('headspin_realtime_css');
	window.rt_vars = new BroadcastChannel('headspin_realtime_vars');
	window.rt_colors = new BroadcastChannel('headspin_realtime_colors');
	window.rt_sync = new BroadcastChannel('headspin_breakdance_sync');
	window.rt_tokens = new BroadcastChannel('headspin_tokenwp_tokens');

	rt_sync.onmessage = (event) => {
		if (event.data === '700') {
			swal_h({
				title: 'Success!',
				text: 'Your colors are synced successfully!',
				button: false,
				icon: 'success',
			});
			return false;
		}
		var status = true;
		Alpine.store('sync').steps = event.data;
		Alpine.store('sync').steps.forEach((s) => {
			if (s.status == 'false') {
				status = false;
			}
		});
		if (status) {
			//TODO Change root default theme tag
			var codeCSS = {};
			codeCSS['css'] = headspin_css_format(_$MAIN_generate_CSS());
			codeCSS['theme'] = Alpine.store('pd').defaultTheme;
			rt_CSS.postMessage(codeCSS);
			rt_vars.postMessage(
				JSON.stringify(Alpine.store('project').vars)
			);
			var colorObj = {};

			colorObj['brandColorSchema'] =
				Alpine.store('pd').brandColorSchema;
			colorObj['neutralColorSchema'] =
				Alpine.store('pd').neutralColorSchema;
			colorObj['colorSchemas'] = Alpine.store('pd').colorSchemas;
			colorObj['defaultTheme'] = Alpine.store('pd').defaultTheme;
			colorObj['builderColorStepArray'] = [
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'10',
				'11',
				'12',
			];
			rt_colors.postMessage(JSON.stringify(colorObj));
			colorObj = null;
		}
	};
});
document.addEventListener('headspinready', () => {
	Alpine.store('project').rebuildUUID_all();
	headspinRegenerate();
	//tippy('[data-tippy-content]');


	tippy.delegate('body', {
		target: '[data-tippy-content]',
		placement: 'top',
		delay: [100, 100],
	});

	tippy.delegate('body', {
		target: '[data-tippy-teleport]',
		content: "Loading...",
		allowHTML: true,
		placement: 'auto',
		interactive: true,
		hideOnClick: true,
		maxWidth: 1000,
		arrow: false,
		trigger: "click", // Change to 'mouseenter' if needed
		theme: 'dropdown-preset',
		onShow(instance) { // Called when the tooltip is about to be shown
			const contentElement = document.querySelector(instance.reference.getAttribute('data-tippy-teleport'));

			instance.setContent(contentElement ? contentElement.outerHTML : "Content not found");
		},
	});
	//window.headspinready = message => window.dispatchEvent(new CustomEvent('headspinready', {detail: message}));
});
// MAIN FUNCTION, CSS Composition
window._$MAIN_generate_CSS = function () {
	try {
		Alpine.store('project').dynamicThemeDirectivesEditor.activateTransparentVariantsIfNeeded();
	} catch (error) {
		console.log(error)
	}
	const _CQ_ENABLED = Alpine.store('project').containerQueries;
	var css = '';
	var typographyCSS, spacingCSS, radiusCSS, colorCSS, themeCSS;
	var cq = '';

	//TODO: DELETE
	//css = css + shadowVariables();
	//css = css + generateRadius();
	/*--------------------------------- */

	Alpine.store('project').vars = [];
	//handled by  tokenConnect
	typographyCSS = typographyVars();
	spacingCSS = spacingVars();
	radiusCSS = radiusVars();

	//
	themeCSS = Alpine.store('theme').generateThemeCSS();
	colorCSS = generateColorCSS();

	/*--------------------------------- */
	css += colorCSS;

	/* v1.1 - depriciated, tokenConnect() handles this 
	css += selectorCSS(
		':root',
		typographyCSS + spacingCSS + radiusCSS + themeCSS
	);
	*/
	// v1.1  - generate only themeCSS (Breakdance section width etc)
	css += selectorCSS(
		':root',
		themeCSS
	);
	css += generateMediaHelpers();
	css += Alpine.store('project').generateSelectionCSS()
	css += `:root{--headspin-theme-API: ${generateThemeAPI()};}`;
	css += generateA11YOverlayText();
	if (Alpine.store('pd').themeLineHeightEnabled) css += lineHeight();
	css += Alpine.store('project').dynamicThemeDirectivesEditor.generateOutputCSS()

	/* CSS Tokens */
	//css += selectorCSS(':root:root', Alpine.store("connect").typographyConnect());

	//css += selectorCSS(':root', colorCSS);
	/*--------------------------------- */
	//css = css + generateClasses();

	/* v1.1 - depriciated, tokenConnect() handles this 
	if ( _CQ_ENABLED ) {
		cq = cq + typographyVarsCQ();
		cq = cq + spacingVarsCQ();
		cq = supportsCQ( selectorCSS( ':root:root', cq ) );
	}
	*/
	//TODO: v1.3 Theme skins - THEME API
	//css += generateThemeSkins();
	css += Alpine.store('connect').tokenConnect();
	rt_vars.postMessage(
		JSON.stringify(Alpine.store('project').vars)
	);
	return (css + cq).toString();
}

/* TODO: Explain */
window.headspinRegenerate = function () {
	Alpine.store('appView').getScrollbarWidth();
	headspin.generate();
	Alpine.store('space').generateSpacing();
	Alpine.store('space').generateSectionSpacing();
	regenerateTokenSystem();
	setTimeout(() => {
		window.dispatchEvent(new CustomEvent('headspinChartRegenerate'));
	}, 100)
};
window.regenerateTokenSystem = function () {
	typographyVarsCQ();
	radiusVars();
	spacingVars();
}
/* User local storage to sync data from Headspin Backend and Headspin helper */
window.headspinSync = function () {
	var obj = {};
	obj['mark'] = Math.random().toString();
	obj['load'] = Object.assign(
		{},
		Alpine.store('colorz').system.palette,
		{}
	);
	localStorage.setItem('headspinColorSync', JSON.stringify(obj));
};
/* Main APP Saving function */
window.headspinRemoveProjectData = function () {
	swal_h('Please confirm that you want delete app data.', {
		title: 'Are you sure?',
		icon: 'warning',
		buttons: {
			cancel: 'Cancel',
			delete: {
				text: 'Yes, delete',
				value: 'delete',
			},
		},
	}).then((value) => {
		switch (value) {
			case 'delete':
				ajax_remove_project_data();
				break;
			default:
				return false;
		}
	});

	//đajax_remove_project_data();
};
window.headspinExportFile = function () {
	var data = btoa(JSON.stringify(Alpine.store('pd')));
	var name = 'Headspin_' + window.location.hostname + '.headspin';
	headspin_file_export(name, data);

	data = null;
	name = null;
};
window.headspinImportFile = async function (event) {
	var data;
	const file = event.target.files.item(0);
	const text = await file.text();
	try {
		data = JSON.parse(atob(text));
		headspinDataInitialization(data);
		document.getElementById('file-uploader').value = null;
		swal_h({
			title: 'Success!',
			text: 'Project imported successfully!',
			button: false,
			icon: 'success',
		});
	} catch (error) {
		swal_h({
			title: 'Error!',
			text: 'Import failed!',
			button: false,
			icon: 'error',
		});
	}
	data = null;
};

window.headspinSave = function () {


	//ajaxCSS = ajaxCSS + generateClasses();
	let { builder, code } = headspinPresave();

	ajax_save_css(code.css);
	builder['vars'] = Alpine.store('project').vars;
	builder['data'] = JSON.parse(JSON.stringify(Alpine.store('pd')));
	//builder['data'].themeColorTokens.varsColors.groups  = JSON.parse(JSON.stringify(Alpine.store("project").tokensColor));
	builder['theme'] = Alpine.store('pd').defaultTheme;

	ajax_save_builder_vars(builder['vars']);
	//Changed in v1.2, encode client side, to reduce max_vars which can exceed on some hosting, easier that we take care than tell user to change config
	ajax_save_app_data(btoa(JSON.stringify(builder['data'])));
	//ajax_save_app_data( builder[ 'data' ]);
	ajax_save_default_theme(builder['theme']);
	ajax_save_tokens();
	builder = null;
};
window.headspinPresave = function () {


	let iteration = 0;
	const { resolver, resolverLimit } = Alpine.store('iframe');
	var builder = {};
	var code = {};

	// Generate a UUID v4 with fallback
	//Alpine.store('iframe').uuid = generateUUID();

	_$MAIN_generate_CSS();
	while ((resolver.length > 0 && iteration < resolverLimit) || iteration < 5) {

		iteration++;
		resolver.length = 0;

		code['css'] = headspin_css_format(_$MAIN_generate_CSS());
		code['theme'] = Alpine.store('pd').defaultTheme;
		rt_CSS.postMessage(code);


		Alpine.store('iframe').uuid = generateUUID();
	}



	rt_vars.postMessage(JSON.stringify(Alpine.store('project').vars));
	var colorObj = {};
	colorObj['brandColorSchema'] = Alpine.store('pd').brandColorSchema;
	colorObj['neutralColorSchema'] = Alpine.store('pd').neutralColorSchema;
	colorObj['colorSchemas'] = Alpine.store('pd').colorSchemas;
	colorObj['defaultTheme'] = Alpine.store('pd').defaultTheme;
	//rt_colors.postMessage(JSON.stringify(colorObj));
	colorObj = null;




	return { "builder": builder, "code": code };
}
window.headspinCreateSnapshot = function () {
	var snapshot = {};
	snapshot['name'] = 'My snap';
	snapshot['css'] = _$MAIN_generate_CSS();
	snapshot['data'] = Alpine.store('pd');
	snapshot['created'] = new Date();
	ajax_save_snapshot(snapshot);
};

function ajax_save_tokens() {

	var tokens = {
		colors: {
			brand: Alpine.store('pd').brandColorSchema,
			neutral: Alpine.store('pd').neutralColorSchema,
			custom: Alpine.store('pd').colorSchemas
		},
		custom: Alpine.store("pd").themeTokens,
		defaultTheme: Alpine.store('pd').defaultTheme,
		closeOn: Alpine.store('pd').contextMenuCloseOn
	}
	rt_tokens.postMessage(btoa(JSON.stringify(tokens)));
	jQuery.ajax({
		url: hajax_var.url,
		type: 'post',
		data: {
			action: 'headspin_save_tokens',
			nonce: hajax_var.nonce, // pass the nonce here
			vars: btoa(JSON.stringify(tokens)),
		},
		success(data) {
			if (data) {
				//
			}
		},
	});

}
function ajax_save_snapshot(builderVars) {
	jQuery.ajax({
		url: hajax_var.url,
		type: 'post',
		data: {
			action: 'headspin_save_snapshot',
			nonce: hajax_var.nonce, // pass the nonce here
			vars: builderVars,
		},
		success(data) {
			if (data) {
				//
			}
		},
	});
}
/* Ajax call to save CSS data in options API, backend callback functions generates dynamic CSS file */
function ajax_save_css(cssText) {
	document.getElementById('hs-save-button').classList.add('is-loading');
	jQuery.ajax({
		url: hajax_var.url,
		type: 'post',
		datatype: 'json',
		data: {
			action: 'headspin_generate_css',
			nonce: hajax_var.nonce, // pass the nonce here
			css: cssText,
		},
		success: function (data) {
			removeLoaderButtons();

			swal_h({
				title: 'Saved!',
				text: 'Your data is saved succesfuly!',
				button: false,
				icon: 'success',
			});
			setTimeout(() => {
				swal_h.close();
			}, swal_timeout);

		},
		error: function (data) {
			removeLoaderButtons();
			swal_h({
				title: 'Error: ' + data.status,
				//text: "Your data is saved succesfuly!",
				text: data.statusText,
				button: false,
				icon: 'error',
			});
			setTimeout(() => {
				swal_h.close();
			}, swal_timeout);
		},
	});
}
window.addEventListener("error", (event) => {
	toast('Error', { type: "danger", description: event.message });
});

/* Remove all loading buttons */
function removeLoaderButtons() {
	var loaders = document.querySelectorAll('button.is-loading');
	setTimeout(() => {
		loaders.forEach((el) => {
			el.classList.remove('is-loading');
		});
	}, '500');
}
/* Ajax call to builder variables to options API, helper app pulls out on load data from here */
function ajax_save_builder_vars(builderVars) {
	jQuery.ajax({
		url: hajax_var.url,
		type: 'post',
		data: {
			action: 'headspin_generate_builder_vars',
			nonce: hajax_var.nonce, // pass the nonce here
			vars: builderVars,
		},
		success(data) {
			if (data) {
				//
			}
		},
	});
}
function ajax_remove_project_data() {
	jQuery.ajax({
		url: hajax_var.url,
		type: 'post',
		data: {
			action: 'headspin_reset_project_data',
			nonce: hajax_var.nonce, // pass the nonce here
		},
		success(data) {
			swal_h({
				title: 'Success!',
				text: 'Project data cleared!',
				button: false,
				icon: 'success',
			});
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		},
	});
}
function ajax_save_app_data(data) {
	jQuery.ajax({
		url: hajax_var.url,
		type: 'post',
		data: {
			action: 'headspin_save_app_data',
			nonce: hajax_var.nonce, // pass the nonce here
			vars: data,
		},

		success(data) {
			if (data) {
				window.location.reload();
			}
		},
	});
}
function ajax_save_default_theme(data) {
	jQuery.ajax({
		url: hajax_var.url,
		type: 'post',
		data: {
			action: 'headspin_save_default_theme_option',
			nonce: hajax_var.nonce, // pass the nonce here
			vars: data,
		},
	});
}

/* Helper function,  */
function selectorCSS(selector, code) {
	return `${selector} {\n\t${code}}`;
}
function generateEmphasisColor(palette, name) {
	let bg = palette[4].output;
	let fg = palette[8].output;
	let fgAlt = palette[10].output;
	let contrast = chroma.contrast(fg, bg);
	if (contrast < 4.5) {
		fg = fgAlt;
	}
	return `--hcl-${name}-emphasis: ${fg};`;
}
function generateColorCSS() {
	var buffer = '';
	var brandCSS = '',
		neutralCSS = '',
		customColorsCSS = '';
	var LcT = 60;
	var wcagT = 3.0;
	var selector = '';
	var _DARK = false;
	var theme = ['light', 'dark'];
	var name, step, onColor, onWCAG;
	var mainThemeCSS = '';
	var alternateThemeCSS = '';
	var themeDirectives = '';
	var clrPrefix = 'hcl-';
	var clrSufix = '';
	if (Alpine.store('pd').defaultTheme == 'dark') {
		theme = ['dark', 'light'];
		//themeA = ['darkAlpha', 'lightAlpha'];
	}
	//light mode is defualt theme

	var light = theme[0];
	var dark = theme[1];
	var lightA = theme[0] + 'Alpha';
	var darkA = theme[1] + 'Alpha';
	//Brand - light default
	/* :ROOT - DEFUALT THEME */
	name = Alpine.store('pd').brandColorSchema.name.toLowerCase();
	onColor = Alpine.store('pd').brandColorSchema.data.onColor;

	buffer += Alpine.store('theme').generateThemeVariableLightDark('site-background', Alpine.store('pd')?.themeSiteBackground, light);
	buffer += Alpine.store('theme').generateThemeVariableLightDark('body-text-color', Alpine.store('pd')?.themeSiteText, light);
	buffer += Alpine.store('theme').generateThemeVariableLightDark('headings-color', Alpine.store('pd')?.themeSiteHeadings, light);

	if (Alpine.store('pd').colorContrastMethod == 'wcag_20') {
		onColor = '#ffffff';
		Alpine.store('pd').brandColorSchema.data.onColor = onColor;
		if (
			chroma.contrast(
				chroma(onColor).hex(),
				chroma(
					Alpine.store('pd').brandColorSchema.data.light[9].value
				).hex()
			) < wcagT
		) {
			onColor = '#000000';
			Alpine.store('pd').brandColorSchema.data.onColor = onColor;
		}
	} else {
		onColor = '#ffffff';
		Alpine.store('pd').brandColorSchema.data.onColor = onColor;
		if (
			headspinChromaLc(
				onColor,
				chroma(
					Alpine.store('pd').brandColorSchema.data.light[9].value
				).hex()
			) < LcT
		) {
			onColor = '#000000';
			Alpine.store('pd').brandColorSchema.data.onColor = onColor;
		}
	}

	//TODO calc on WCAG
	buffer += `\n\t--${clrPrefix}on-${name}${clrSufix}: ${onColor};`;

	Alpine.store('pd').brandColorSchema.data[light].forEach((s) => {
		buffer += `\n\t--${clrPrefix}${name}-${s.step}${clrSufix}: ${s.output};`;
	});
	buffer += generateEmphasisColor(Alpine.store('pd').brandColorSchema.data[light], 'brand');
	//Brand light - transparent variations
	Alpine.store('pd').brandColorSchema.data[lightA].forEach((s) => {
		buffer += `\n\t--${clrPrefix}${name}-${s.step}a${clrSufix}: ${s.value};`;
	});

	/**| NEUTRAL LIGHT| ** */
	name = Alpine.store('pd').neutralColorSchema.name.toLowerCase();
	onColor = Alpine.store('pd').neutralColorSchema.data.onColor;
	if (true) {
		onColor = '#ffffff';
		if (
			chroma.contrast(
				chroma(onColor).hex(),
				chroma(
					Alpine.store('pd').neutralColorSchema.data[light][9]
						.value
				).hex()
			) < 4.5
		) {
			onColor = '#000000';
		}
	}
	buffer += `\n\t--${clrPrefix}on-${name}${clrSufix}: ${onColor};`;
	Alpine.store('pd').neutralColorSchema.data[light].forEach((s) => {
		buffer += `\n\t--${clrPrefix}${name}-${s.step}${clrSufix}: ${s.output};`;
	});
	buffer += generateEmphasisColor(Alpine.store('pd').neutralColorSchema.data[light], 'neutral');
	//Neutral light - transparent variations
	Alpine.store('pd').neutralColorSchema.data[lightA].forEach(
		(s) => {
			buffer += `\n\t--${clrPrefix}${name}-${s.step}a${clrSufix}: ${s.value};`;
		}
	);

	/**| CUSTOM SCHEMA LIGHT| ** */

	Alpine.store('pd').colorSchemas.forEach((schema) => {
		if (!schema.presetColor || (schema.presetColor && schema.enabled)) {
			name = schema.name.toLowerCase();
			onColor = schema.data.onColor;
			buffer += `\n\t--${clrPrefix}on-${name}${clrSufix}: ${onColor};`;
			if (Alpine.store('pd').colorContrastMethod == 'wcag_20') {
				onColor = '#ffffff';
				if (
					chroma.contrast(
						chroma(onColor).hex(),
						chroma(schema.data[light][9].output).hex()
					) < 4.5
				) {
					onColor = '#000000';
				}
			}
			schema.data[light].forEach((s) => {
				buffer += `\n\t--${clrPrefix}${name}-${s.step}${clrSufix}: ${s.output};`;
			});
			buffer += generateEmphasisColor(schema.data[light], name);
			if (Number(schema.transparentVariants || true)) {
				schema.data[lightA].forEach((s) => {
					buffer += `\n\t--${clrPrefix}${name}-${s.step}a${clrSufix}: ${s.value};`;
				});
			}
		}



	});
	/*
	Alpine.store("pd").colorConnector.forEach(color => {
		buffer += `\n\t${color.target}: ${color.mainTheme};`;
	    
	});
	*/
	//selector = '[data-hsx*=' + '\x22' + light + '\x22]';
	//selector = unescape( selector );
	mainThemeCSS = selectorCSS(Alpine.store('project').baseThemeSelector(), buffer);
	buffer = '';

	/*-------------------------------------------------- */

	/* DARK THEME- ALTERNATE THEME */
	buffer += Alpine.store('theme').generateThemeVariableLightDark('site-background', Alpine.store('pd')?.themeSiteBackground, dark);
	buffer += Alpine.store('theme').generateThemeVariableLightDark('body-text-color', Alpine.store('pd')?.themeSiteText, dark);
	buffer += Alpine.store('theme').generateThemeVariableLightDark('headings-color', Alpine.store('pd')?.themeSiteHeadings, dark);

	name = Alpine.store('pd').brandColorSchema.name.toLowerCase();
	//onColor = Alpine.store("pd").brandColorSchema.data.onColor;
	//TODO calc on WCAG
	//buffer += `\n\t--${clrPrefix}on-${name}${clrSufix}: ${onColor};`;
	Alpine.store('pd').brandColorSchema.data[dark].forEach((s) => {
		buffer += `\n\t--${clrPrefix}${name}-${s.step}${clrSufix}: ${s.output};`;
	});
	if (Number(Alpine.store('pd').brandColorSchema.transparentVariants)) {
		Alpine.store('pd').brandColorSchema.data[darkA].forEach((s) => {
			buffer += `\n\t--${clrPrefix}${name}-${s.step}a${clrSufix}: ${s.value};`;
		});
	}
	buffer += generateEmphasisColor(Alpine.store('pd').brandColorSchema.data[dark], 'brand');

	name = Alpine.store('pd').neutralColorSchema.name.toLowerCase();
	//onColor = Alpine.store("pd").neutralColorSchema.data.onSolid;
	//TODO calc on WCAG
	//buffer += `\n\t--${clrPrefix}on-${name}${clrSufix}: ${onColor};`;
	Alpine.store('pd').neutralColorSchema.data[dark].forEach((s) => {
		buffer += `\n\t--${clrPrefix}${name}-${s.step}${clrSufix}: ${s.output};`;
	});

	buffer += generateEmphasisColor(Alpine.store('pd').neutralColorSchema.data[dark], 'neutral');
	name = Alpine.store('pd').neutralColorSchema.name.toLowerCase();
	onColor = Alpine.store('pd').neutralColorSchema.data.onColor;
	if (true) {
		onColor = '#ffffff';

		if (
			chroma.contrast(
				chroma(onColor).hex(),
				chroma(
					Alpine.store('pd').neutralColorSchema.data[dark][9]
						.output
				).hex()
			) < 4.5
		) {
			onColor = '#000000';
		}
	}
	buffer += `\n\t--${clrPrefix}on-${name}${clrSufix}: ${onColor};`;
	if (
		Number(Alpine.store('pd').neutralColorSchema.transparentVariants)
	) {
		Alpine.store('pd').neutralColorSchema.data[darkA].forEach(
			(s) => {
				buffer += `\n\t--${clrPrefix}${name}-${s.step}a${clrSufix}: ${s.value};`;
			}
		);
	}

	Alpine.store('pd').colorSchemas.forEach((schema) => {
		if (!schema.presetColor || (schema.presetColor && schema.enabled)) {
			if (schema.enabled) {
				name = schema.name.toLowerCase();
				//onColor = schema.data.onColor;
				buffer += generateEmphasisColor(schema.data[dark], name);
				schema.data[dark].forEach((s) => {
					buffer += `\n\t--${clrPrefix}${name}-${s.step}${clrSufix}: ${s.output};`;
				});
				if (true) {
					schema.data[darkA].forEach((s) => {
						buffer += `\n\t--${clrPrefix}${name}-${s.step}a${clrSufix}: ${s.value};`;
					});
				}
			}
		}
	});

	/*
	Alpine.store("pd").colorConnector.forEach(color => {
		buffer += `\n\t${color.target}: ${color.alternateTheme};`;
	    
	});
	*/
	selector =
		'\n:root:root[data-hsx*=' +
		'\x22' +
		dark +
		'\x22], \n[data-hsx*=' +
		'\x22' +
		dark +
		'\x22],' +
		'\n[data-hsx*=\x22invert\x22]';
	alternateThemeCSS = selectorCSS(unescape(selector), buffer);
	//TODO: v1.3 theme directives
	//themeDirectives = generateThemeDirectivesCSS()
	return mainThemeCSS + alternateThemeCSS + themeDirectives;

}
/* 
* Added in v1.2 
* Generates theme directives (theme mods based for each palette)
*/
function generateThemeDirectivesCSS() {
	var brandPaths;
	var schemaPathPoll;
	var placeholder = "[data-hsx*='<<schema>>']<<additionalPaths>> { <<code>> }";
	var schema = "brand";
	var additionalPaths = "";
	var code = "background-color: var(--hcl-brand-9);\n--bde-headings-color: var(--hcl-on-brand);\n--bde-body-text-color: var(--hcl-on-brand);";
	var bufferMain = '';

	/* Brand schema */
	bufferMain += themeDirectiveCode(Alpine.store("pd").brandColorSchema);
	Alpine.store('pd').colorSchemas.forEach(s => {
		bufferMain += themeDirectiveCode(s);
	})
	return bufferMain;
}
function themeDirectiveCode(schema) {
	var paths = "";
	var schemaName = schema.name;
	var pathPattern = ",[data-hsx*='<<schema>>']";
	var additionalPaths = "";
	if (schema['themeDirectivesPaths'] && schema['themeDirectivesPaths'].length > 0) {
		schema['themeDirectivesPaths'].forEach(path => {
			additionalPaths += pathPattern.replaceAll("<<schema>>", path);
		})
	}
	var code = `background-color: var(--hcl-${schemaName}-9);\n--bde-headings-color: var(--hcl-on-${schemaName});\n--bde-body-text-color: var(--hcl-on-${schemaName});`;
	var placeholder = `[data-hsx*='${schemaName}']${paths} { ${code} }`;
	return placeholder;
}
function lineHeight() {
	var fix = Alpine.store('pd').typographyLineHeight[0] + 'px';
	var fluid = Alpine.store('pd').typographyLineHeight[1] + 'ex';
	return `h1, h2, h3, h4, h5, h6, p, div{ line-height: calc(${fix} + ${fluid})}`;
}
function typographyVars() {
	var buffer = '';
	const output = Alpine.store('typography').output;
	var builderVars = Alpine.store('project').vars;
	var typographyConnector = Alpine.store('pd').typographyConnector;
	output.forEach((o) => {
		o.cssVars.forEach((v) => {
			buffer = buffer + `${v}: ${o.cssRule};\n\t`;
		});
	});
	/*
	typographyConnector.forEach(t=>{
		buffer = buffer + `${t.target}: ${t.value};\n\t`;
	})
	*/
	return buffer;
}

/* Method 1 */

function spacingVars() {
	var buffer = '';
	var cssRule = '';
	var cqRule = '';
	var spaceToken = {}
	var builderVars = Alpine.store('project').vars;
	const naming = 'hsp';
	const naming1 = 'hss';
	//TODO container queries
	const _CQ_ENABLED = Alpine.store('project').containerQueries;
	const output = Alpine.store('space').output;
	const outputSection = Alpine.store('space').outputSection;
	output.forEach((o) => {
		cssRule = `clamp(${o.min}rem, ${o.r}rem + ${o.v}vw, ${o.max}rem)`;
		buffer = buffer + `--${naming}-${o.prefix}: ${cssRule};\n\t`;
		spaceToken = {
			var: `--${naming}-${o.prefix}`,
			label: `${o.prefix}`,
			category: `space`,
			min: Math.round(o.min * 16),
			max: Math.round(o.max * 16),
			desc: '(gap, margin, padding)',
		};
		builderVars.push(spaceToken);
		Alpine.store("project").systemTokenEngine("space", spaceToken);
	});
	outputSection.forEach((o) => {
		cssRule = `clamp(${o.min}rem, ${o.r}rem + ${o.v}vw, ${o.max}rem)`;
		buffer = buffer + `--${naming1}-${o.prefix}: ${cssRule};\n\t`;
		spaceToken = {
			var: `--${naming1}-${o.prefix}`,
			label: `${o.prefix}`,
			category: `section space`,
			min: Math.round(o.min * 16),
			max: Math.round(o.max * 16),
		}
		builderVars.push(spaceToken);
		Alpine.store("project").systemTokenEngine("section space", spaceToken);
	});
	return buffer;
}

function generateRadius() {
	var buffer = '';
	const output = Alpine.store('radius').output;
	const naming = 'radius';
	var builderVars = Alpine.store('project').vars;
	output.forEach((o) => {
		buffer =
			buffer + `--${naming}-${o.label}: ${o.value}${o.unit};\n\t`;
		builderVars.push({
			var: `--${o.label}-${naming}`,
			label: `${o.label}`,
			category: `radius`,
		});
	});
	return buffer;
}

function radiusVars() {
	var buffer = '';
	const { radiusSettings } = Alpine.store('pd');
	var radiusToken = {}
	var builderVars = Alpine.store('project').vars;
	var i = 0;
	for (var key in radiusSettings) {
		var name =
			radiusSettings[key]['varName'] +
			': ' +
			radiusSettings[key]['value'];
		buffer = buffer + name + ';' + '\n\t';
		radiusToken = {
			var: radiusSettings[key]['varName'],
			label: radiusSettings[key]['label'],
			category: `radius`,
			value: radiusSettings[key]['value'],
		}
		builderVars.push(radiusToken);
		Alpine.store("project").systemTokenEngine("radius", radiusToken);
	}

	return buffer;
}
function typographyVarsCQ() {
	var buffer = '';
	var typographyToken = {}
	const output = Alpine.store('typography').output;
	var builderVars = Alpine.store('project').vars;
	var lock = Number(Alpine.store('pd').activeLock);
	output.forEach((o) => {
		o.cssVars.forEach((v) => {
			buffer = buffer + `${v}: ${o.cqRule};\n\t`;
			var stepInt = parseInt(o.font.replaceAll('H', ''), 10);

			//if ( stepInt <= lock || o.category.includes( 'text' ) )
			typographyToken = {
				var: `${v}`,
				label: `${o.font}`,
				category: o.category,
				min: Math.round(Number(o.min) * 16),
				max: Math.round(Number(o.max) * 16),
			}
			builderVars.push(typographyToken);
			Alpine.store("project").systemTokenEngine(o.category, typographyToken);

		});
	});
	return buffer;
}
function spacingVarsCQ() {
	var buffer = '';
	var cssRule = '';
	var cqRule = '';
	const naming = 'hsp';
	const naming2 = 'hss';

	const _CQ_ENABLED = Alpine.store('project').containerQueries;
	const output = Alpine.store('space').output;
	const outputSection = Alpine.store('space').outputSection;
	output.forEach((o) => {
		cqRule = `clamp(${Number(o.min)}rem, ${o.r}rem + ${o.v
			}cqi, ${Number(o.max)}rem)`;
		buffer = buffer + `--${naming}-${o.prefix}: ${cqRule};\n\t`;

		``;
	});
	outputSection.forEach((o) => {
		cqRule = `clamp(${Number(o.min)}rem, ${o.r}rem + ${o.v
			}cqi, ${Number(o.max)}rem)`;
		buffer = buffer + `--${naming2}-${o.prefix}: ${cqRule};\n\t`;
	});
	return buffer;
}
function supportsCQ(css) {
	return `\n\n@supports (font-size: 1cqi) {\n\t${css}\n}`;
}
/* Generate classes */
function generateClasses() {
	var buffer = '';
	buffer = buffer + generateShadowClasses();
	return buffer;
}

/*
function generateShadowClasses() {
	var buffer = '';
	var i = 0;
	const A = ['s', 'm', 'l'];
	const output = Alpine.store("shadows").output;
	output.forEach(s => {
		var shadow = s.output;
		buffer = buffer + `.shadow-${A[i]}{\n\tbox-shadow: var(--shadow-${A[i]}) !important;\n}\n\t`;
		i++;
	});
	return buffer;
}
*/
function headspin_css_format(css) {
	var buffer;
	if (true) {
		buffer = css_beautify(css);
	} else {
	}
	return buffer;
}
function headspin_file_export(filename, data) {
	const blob = new Blob([data], { type: 'text/plain' });
	if (window.navigator.msSaveOrOpenBlob) {
		window.navigator.msSaveBlob(blob, filename);
	} else {
		const elem = window.document.createElement('a');
		elem.href = window.URL.createObjectURL(blob);
		elem.download = filename;
		document.body.appendChild(elem);
		elem.click();
		document.body.removeChild(elem);
	}
}

function fallbackCopyTextToClipboard(text, t, d, s) {
	var textArea = document.createElement('textarea');
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = '0';
	textArea.style.left = '0';
	textArea.style.position = 'fixed';

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		toast(t, {
			type: s,
			description: d,
		});
	} catch (err) {
		window.prompt('Copy to clipboard: Ctrl+C, Enter', txt);
	}

	document.body.removeChild(textArea);
}
window.copyToClipboard = function (text, title, desc, status) {

	if (title == undefined) title = 'Clipboard success!';
	if (desc == undefined) desc = 'Data is copied to clipboard';
	if (status == undefined) status = 'success';
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text, title, desc, status);
		return;
	}
	navigator.clipboard.writeText(text).then(
		function () {
			toast(title, { type: status, description: desc });
		},
		function (err) {
			console.error('Async: Could not copy text: ', err);
		}
	);
};
function generateThemeSkins() {
	var buffer = '';
	var bufferMain = '';
	Alpine.store('pd').colorSchemas?.forEach(schema => {
		buffer +=
			`--hcl-brand-1: var(--hcl-${schema.name}-1);
		--hcl-brand-2: var(--hcl-${schema.name}-2);
		--hcl-brand-3: var(--hcl-${schema.name}-3);
		--hcl-brand-4: var(--hcl-${schema.name}-4);
		--hcl-brand-5: var(--hcl-${schema.name}-5);
		--hcl-brand-6: var(--hcl-${schema.name}-6);
		--hcl-brand-7: var(--hcl-${schema.name}-7);
		--hcl-brand-8: var(--hcl-${schema.name}-8);
		--hcl-brand-9: var(--hcl-${schema.name}-9);
		--hcl-brand-10: var(--hcl-${schema.name}-10);
		--hcl-brand-11: var(--hcl-${schema.name}-11);
		--hcl-brand-12: var(--hcl-${schema.name}-12);
		--hcl-on-brand: var(--hcl-on-${schema.name});
		`;
		bufferMain += `[data-skin='${schema.name}']{${buffer}}`;
		buffer = '';
	})
	return bufferMain;
}
function generateA11YOverlayText() {
	let selector = `[data-hsx*="overlay"] *:not(button, [class*=button])`;
	let css = `
		${selector} {
			color: white !important;
			text-shadow:  1px 1px 0px black,
			-1px -1px 0px black,
			1px -1px 0px black,
			-1px 1px 0px black,
			1px 0px 0px black,
			-1px 0px 0px black,
			0px 1px 0px black,
			0px -1px 0px black,
			2px 2px 0px black,
			-2px -2px 0px black,
			2px -2px 0px black,
			-2px 2px 0px black,
			2px 0px 0px black,
			-2px 0px 0px black,
			0px 2px 0px black,
			0px -2px 0px black;
		}
		:root{
			--hsx-safe-overlay: rgba(0,0,0,.6)
		}
	
	`
	return css;
}
function generateThemeAPI() {
	var API = {};
	API['theme'] = Alpine.store("pd").defaultTheme;
	return btoa(JSON.stringify(API));
}
function generateMediaHelpers() {
	const { page, root, variable } = Alpine.store("project").layoutDisplay;
	let maxWidth = parseInt(Alpine.store('pd').pageWidth, 10) + (2 * parseInt(Alpine.store('pd').themeOffset, 10))
	let css = `:root{
		${variable}: ${root};
	}
	@media (max-width: ${maxWidth}px) {
		body {
			${variable}: ${page};
		}
	}
	`;
	return css;
}
// Add this helper function for UUID generation with fallback
function generateUUID() {
	// Use crypto.randomUUID() if available
	if (crypto && typeof crypto.randomUUID === 'function') {
		return crypto.randomUUID();
	}

	// Fallback implementation of UUID v4
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}