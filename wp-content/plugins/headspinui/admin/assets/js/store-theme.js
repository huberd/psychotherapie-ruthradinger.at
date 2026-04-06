document.addEventListener('alpine:init', () => {
	/**
	 * Theme Builder
	 * TYPES: color{border, foreground, background, shadow} | SIZE {spacing, radius, } | shadow{color} | radius |
	 */
	Alpine.store('theme', {
		loadThemes() { },
		importTheme() { },
		importGroup() { },
		createGroup(type, name) {
			var group = Object.assign(
				{},
				Alpine.store('theme').prototype[type],
				{}
			);
			if (type === 'colorGroup') {
				group.name = group.name.replace('primary', name);
				group.tokens.forEach((t) => {
					t.name = t.name.replace(t.name, name);
				});
			}
			Alpine.store('theme').global.system.push(group);
		},
		generateThemeCSS() {
			var buffer = '/*Theme Headspin*/\n';
			if (Alpine.store('pd')?.themePageWidth != undefined)
				buffer += Alpine.store('theme').generateThemeVariable(
					'page-width',
					Alpine.store('pd')?.themePageWidth,
					'px'
				);
			if (Alpine.store('pd')?.themeOffset != undefined)
				buffer += Alpine.store('theme').generateThemeVariable(
					'min-offset',
					Alpine.store('pd')?.themeOffset,
					'px'
				);
			if (Alpine.store('pd')?.themeGap != undefined)
				buffer += Alpine.store('theme').generateThemeVariable(
					'page-gap',
					Alpine.store('pd')?.themeGap,
					'px'
				);
			buffer +=
				Alpine.store('theme').generateThemeConnectorBreakdance();
			return buffer;
		},
		generateThemeConnectorBreakdance() {
			var buffer = '\n/*Breakdance connector*/';

			buffer +=
				'\n\t--hsx-bleed-offset: ' +
				'max(calc(((100vw - (var(--bde-section-width) )) / 2) + var(--bde-section-horizontal-padding)),calc(var(--bde-section-horizontal-padding) + 5px));';
			/*
		buffer += `\n\t--bde-h1-font-size: var(--hfs-h1)`;
		buffer += `\n\t--bde-h2-font-size: var(--hfs-h2);`;
		buffer += `\n\t--bde-h3-font-size: var(--hfs-h3);`;
		buffer += `\n\t--bde-h4-font-size: var(--hfs-h4);`;
		buffer += `\n\t--bde-h5-font-size: var(--hfs-h5);`;
		buffer += `\n\t--bde-h6-font-size: var(--hfs-h6);`;
		*/

			return buffer;
		},
		generateThemeVariable(name, rule, unit) {
			var x = '\n--hsx-' + name + ': ' + rule + unit + ';';
			return x;
		},
		generateThemeVariableLightDark(name, rule, type) {
			var x = '\n--hsx-' + name + ': ' + rule[type] + ';';
			return x;
		},
	});
});
