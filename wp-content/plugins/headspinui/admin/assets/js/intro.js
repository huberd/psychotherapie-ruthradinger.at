'use strict';
document.addEventListener( 'DOMContentLoaded', () => {
	window.headspinTour = function () {
		var option = Alpine.store( 'appView' ).activeTab.toLowerCase();
		var subOption = Alpine.store( 'appView' ).activeSubtab.toLowerCase();
		//project
		if ( option == 'project' ) {
			tourProject.start();
		}
		//theme
		else if ( option == 'theme' && subOption == 'false' ) {
			tourTheme.start();
		} else if ( option == 'theme' && subOption == 'typography' ) {
			tourTypography.start();
		} else if ( option == 'theme' && subOption == 'spacing' ) {
			tourSpacing.start();
		} else if ( option == 'schema' ) {
			tourColors.start();
		}
	};

	/* ------------------ Tours --------------------- */
	/*------------------ PROJECT --------------------- */
	window.tourProject = new Shepherd.Tour( {
		useModalOverlay: true,
		defaultStepOptions: {
			modalOverlayOpeningPadding: 6,
			popperOptions: {
				modifiers: [
					{ name: 'offset', options: { offset: [ 0, 32 ] } },
				],
			},
			classes: 'shadow-md bg-purple-dark',
			scrollTo: true,
		},
	} );
	/*Project -> Upload*/
	tourProject.addStep( {
		id: 'file-uploader',
		text: 'Here you can upload previous project settings.',
		attachTo: {
			element: '#file-uploader',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Next',
				action: tourProject.next,
			},
		],
	} );
	/*Project -> Export*/
	tourProject.addStep( {
		id: 'export',
		text: 'Here you can export project settings for use in another project or as backup',
		attachTo: {
			element: '#export',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourProject.back,
			},
			{
				text: 'Next',
				action: tourProject.next,
			},
		],
	} );
	/*Project -> Export*/
	tourProject.addStep( {
		id: 'reset',
		arrow: true,
		text: 'Here you can reset whole project to default, this will delete all project data from database.',
		attachTo: {
			element: '#reset',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourProject.back,
			},
			{
				text: 'Next',
				action: tourProject.next,
			},
		],
	} );
	/*Project -> Min. Viewport*/
	tourProject.addStep( {
		id: 'minViewport',
		text: 'This controls minimal screen size for fluid setting, below this value fluid tokens will stop scaling.',
		attachTo: {
			element: '#minViewport',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourProject.back,
			},
			{
				text: 'Next',
				action: tourProject.next,
			},
		],
	} );
	/*Project -> Max. Viewport*/
	tourProject.addStep( {
		id: 'maxViewport',
		text: 'This controls maximal screen size for fluid setting, above this value fluid tokens will stop scaling',
		attachTo: {
			element: '#maxViewport',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',

				classes: 'shepard-js-back',
				action: tourProject.back,
			},
			{
				text: 'Finish',
				action: tourProject.next,
			},
		],
	} );
	/*------------------ THEME --------------------- */
	window.tourTheme = new Shepherd.Tour( {
		useModalOverlay: true,
		defaultStepOptions: {
			modalOverlayOpeningPadding: 6,
			popperOptions: {
				modifiers: [
					{ name: 'offset', options: { offset: [ 0, 32 ] } },
				],
			},
			classes: 'shadow-md bg-purple-dark',
			scrollTo: true,
		},
	} );
	tourTheme.addStep( {
		text: 'Here you can set primary theme for the site',
		attachTo: {
			element: '#def-theme',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );
	tourTheme.addStep( {
		text: 'Headspin automatically checks contrast, this options controls which method should be used. Perceptual is future standard and WCAG is based on current standard.',
		attachTo: {
			element: '#contrast-algo',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTheme.back,
			},
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );
	tourTheme.addStep( {
		text: 'Here you can control global radius for your site',
		attachTo: {
			element: '#project-radius',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTheme.back,
			},
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );
	tourTheme.addStep( {
		when: {
			show: function () {
				if (
					document.querySelector( '#page-theme .sub-options-group' )
						.style.display === 'none'
				) {
					document.querySelector( '#page-toggle' ).click();
				}
			},
		},
		text: 'Here we can quickly adjust page related settings',
		attachTo: {
			element: '#page-theme',
			on: 'top',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTheme.back,
			},
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );
	tourTheme.addStep( {
		text: 'Controls maximal content width of the sections',
		attachTo: {
			element: '#themePageWidth',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTheme.back,
			},
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );
	tourTheme.addStep( {
		text: 'Defines padding which offsets content from the edge of screen',
		attachTo: {
			element: '#themeOffset',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTheme.back,
			},
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );
	tourTheme.addStep( {
		text: 'Default column gap for project',
		attachTo: {
			element: '#themeGap',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTheme.back,
			},
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );

	tourTheme.addStep( {
		when: {
			show: function () {
				if (
					document.querySelector(
						'#typography-theme .sub-options-group'
					).style.display === 'none'
				) {
					document.querySelector( '#typo-toggle' ).click();
				}
			},
		},
		text: 'Here we can quickly adjust typography settings',
		attachTo: {
			element: '#typography-theme',
			on: 'top',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTheme.back,
			},
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );
	tourTheme.addStep( {
		text: 'Here we can quickly adjust site font-size.',
		attachTo: {
			element: '#typo-font-size',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTheme.back,
			},
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );
	tourTheme.addStep( {
		text: 'Here we can quickly adjust site line-height.',
		attachTo: {
			element: '#typo-line-height',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTheme.back,
			},
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );
	tourTheme.addStep( {
		text: 'If these options are not enough, Headspin provides granular controls to fine-tune typography.',
		attachTo: {
			element: '#typo-subtab',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTheme.back,
			},
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );

	tourTheme.addStep( {
		when: {
			show: function () {
				if (
					document.querySelector(
						'#spacing-theme .sub-options-group'
					).style.display === 'none'
				) {
					document.querySelector( '#spacing-toggle' ).click();
				}
			},
		},
		text: 'Here we can quickly adjust spacing settings',
		attachTo: {
			element: '#spacing-theme',
			on: 'top',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTheme.back,
			},
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );
	tourTheme.addStep( {
		text: 'Here we can quickly adjust section spacing.',
		attachTo: {
			element: '#space-section-space',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTheme.back,
			},
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );
	tourTheme.addStep( {
		text: 'Here we can quickly adjust main spacing.',
		attachTo: {
			element: '#space-component-space',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTheme.back,
			},
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );
	tourTheme.addStep( {
		text: 'If these options are not enough, Headspin provides granular controls to fine-tune spacing.',
		attachTo: {
			element: '#spacing-subtab',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTheme.back,
			},
			{
				text: 'Next',
				action: tourTheme.next,
			},
		],
	} );
	/*------------------ TYPOGRAPHY --------------------- */
	window.tourTypography = new Shepherd.Tour( {
		useModalOverlay: true,
		defaultStepOptions: {
			modalOverlayOpeningPadding: 6,
			popperOptions: {
				modifiers: [
					{ name: 'offset', options: { offset: [ 0, 32 ] } },
				],
			},
			classes: 'shadow-md bg-purple-dark',
			scrollTo: true,
		},
	} );
	tourTypography.addStep( {
		text: 'In most projects establishing modular scale is not desired with start from H6 because we rarely use H6 and H5. With this option you can control at which heading modular scale should start so you could use bigger modular scale.',
		attachTo: {
			element: '#typo-start',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Next',
				action: tourTypography.next,
			},
		],
	} );
	tourTypography.addStep( {
		text: 'Here we control typographic scale Min. Viewport (mobile-ish), we have options to set starting font-size and modular scale. At any viewport width in between Min. Viewport and Max. Viewport, typography sizes are proportional',
		attachTo: {
			element: '#typo-minvp',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTypography.back,
			},
			{
				text: 'Next',
				action: tourTypography.next,
			},
		],
	} );
	tourTypography.addStep( {
		text: 'Here we control typographic scale Max. Viewport (dekstop-ish), we have options to set starting font-size and modular scale. At any viewport width in between Min. Viewport and Max. Viewport, typography sizes are proportional',
		attachTo: {
			element: '#typo-maxvp',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTypography.back,
			},
			{
				text: 'Next',
				action: tourTypography.next,
			},
		],
	} );

	tourTypography.addStep( {
		text: 'Here we can control base font-size at certain Viewport. Every next step at certain viewport will be multiplied by modular scale',
		attachTo: {
			element: '#tour-font-size',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTypography.back,
			},
			{
				text: 'Next',
				action: tourTypography.next,
			},
		],
	} );
	tourTypography.addStep( {
		text: 'Here we can control modular scale at certain Viewport. Each steps will base font-size multiplied by the power of exponent of the selected modular scale',
		attachTo: {
			element: '#tour-font-scale',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTypography.back,
			},
			{
				text: 'Next',
				action: tourTypography.next,
			},
		],
	} );
	tourTypography.addStep( {
		text: 'Here we can preview all typography values in table or in live view.',
		attachTo: {
			element: '#typo-preview',
			on: 'top',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourTypography.back,
			},
			{
				text: 'Next',
				action: tourTypography.next,
			},
		],
	} );

	/*------------------ SPACING --------------------- */
	window.tourSpacing = new Shepherd.Tour( {
		useModalOverlay: true,
		defaultStepOptions: {
			modalOverlayOpeningPadding: 6,
			popperOptions: {
				modifiers: [
					{ name: 'offset', options: { offset: [ 0, 32 ] } },
				],
			},
			classes: 'shadow-md bg-purple-dark',
			scrollTo: true,
		},
	} );

	tourSpacing.addStep( {
		text: 'Here we control advanced spacing settings for Min. Viewport (mobile-ish), we have options to set base space (space M), each bigger step (L, XL, XXL) gets multiplied by scale, and each smaller step each bigger step (S, XS, XXS) gets divided by scale. Multiplier field will multiply each step value and generate separate section spacing tokens.',
		attachTo: {
			element: '#spacing-minvp',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Next',
				action: tourSpacing.next,
			},
		],
	} );
	tourSpacing.addStep( {
		text: 'Here we control advanced spacing settings for Max. Viewport (desktop-ish), we have options to set base space (space M), each bigger step (L, XL, XXL) gets multiplied by scale, and each smaller step each bigger step (S, XS, XXS) gets divided by scale. Multiplier field will multiply each step value and generate separate section spacing tokens ',
		attachTo: {
			element: '#spacing-maxvp',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourSpacing.back,
			},
			{
				text: 'Next',
				action: tourSpacing.next,
			},
		],
	} );
	tourSpacing.addStep( {
		text: 'Space controls M step size in spacing system.',
		attachTo: {
			element: '#spacing-minvp-size',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourSpacing.back,
			},
			{
				text: 'Next',
				action: tourSpacing.next,
			},
		],
	} );
	tourSpacing.addStep( {
		text: 'Multiplier controls how many times section M space will be bigger than regular M space',
		attachTo: {
			element: '#spacing-minvp-section',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourSpacing.back,
			},
			{
				text: 'Next',
				action: tourSpacing.next,
			},
		],
	} );
	tourSpacing.addStep( {
		text: 'Scale controls modular scale which is used to generate bigger and smaller steps',
		attachTo: {
			element: '#spacing-minvp-scale',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourSpacing.back,
			},
			{
				text: 'Next',
				action: tourSpacing.next,
			},
		],
	} );

	tourSpacing.addStep( {
		text: 'Here you can switch from previewing regular component space to preview section space and vice versa.',
		attachTo: {
			element: '#spacing-space-preview',
			on: 'top',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourSpacing.back,
			},
			{
				text: 'Next',
				action: tourSpacing.next,
			},
		],
	} );

	/*------------------ COLORS --------------------- */
	window.tourColors = new Shepherd.Tour( {
		useModalOverlay: true,
		defaultStepOptions: {
			modalOverlayOpeningPadding: 6,
			popperOptions: {
				modifiers: [
					{ name: 'offset', options: { offset: [ 0, 32 ] } },
				],
			},
			classes: 'shadow-md bg-purple-dark',
			scrollTo: true,
		},
	} );
	tourColors.addStep( {
		text: 'Enable this to preview Dark & Light mode together',
		attachTo: {
			element: '#color-focus',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Next',
				action: tourColors.next,
			},
		],
	} );
	tourColors.addStep( {
		text: 'Add Predefined Color',
		attachTo: {
			element: '#color-browse',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourColors.back,
			},
			{
				text: 'Next',
				action: tourColors.next,
			},
		],
	} );
	tourColors.addStep( {
		text: 'Create new color palette: Radix comprehensive color system or Custom color',
		attachTo: {
			element: '#color-create',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourColors.back,
			},
			{
				text: 'Next',
				action: tourColors.next,
			},
		],
	} );
	tourColors.addStep( {
		text: 'Default Headspin color palette: Headspin brand color replaces Breakdance brand color, neutral color replaces Breakdance background color.',
		attachTo: {
			element: '#color-system-schemas',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourColors.back,
			},
			{
				text: 'Next',
				action: tourColors.next,
			},
		],
	} );

	tourColors.addStep( {
		text: 'Here you can enable/disable transparent variants for certain palette',
		attachTo: {
			element: '#color-transparent-variants',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourColors.back,
			},
			{
				text: 'Next',
				action: tourColors.next,
			},
		],
	} );
	tourColors.addStep( {
		text: 'Here you can edit certain palette',
		attachTo: {
			element: '#color-edit-icon',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourColors.back,
			},
			{
				text: 'Next',
				action: tourColors.next,
			},
		],
	} );
	tourColors.addStep( {
		text: 'Color matching feature will match right neutral color based on your brand color. If you want to have full control, disable this and than you will have option to edit neutral palette.',
		attachTo: {
			element: '#color-sync-icon',
			on: 'bottom',
		},
		buttons: [
			{
				text: 'Back',
				classes: 'shepard-js-back',
				action: tourColors.back,
			},
			{
				text: 'Next',
				action: tourColors.next,
			},
		],
	} );
} );
