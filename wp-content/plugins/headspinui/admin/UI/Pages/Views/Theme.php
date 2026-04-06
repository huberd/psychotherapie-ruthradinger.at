<?php
if (!defined('ABSPATH')) exit;
?>
<section>
    <div id="def-theme" class="hs-input-row">
        <label class="hs-input-label">Default Theme</label>
        <div class="hs-input">
            <div class="project-borders-group">
                <button class="hs-button hs-button-radio" @click="$store.pd.defaultTheme = 'light'" :class="{ 'active': 'light' == $store.pd.defaultTheme }">
                    <?php \Headspin\Components\svg("ii-sun"); ?>
                    Light
                </button>
                <button class="hs-button hs-button-radio" @click="$store.pd.defaultTheme = 'dark'" :class="{ 'active': 'dark' == $store.pd.defaultTheme }">
                    <?php \Headspin\Components\svg("ii-moon"); ?>
                    Dark
                </button>
            </div>
        </div>
    </div>
    <div id="project-radius" class="hs-input-row">
        <label class="hs-input-label">Project radius</label>
        <div class="hs-input">
            <div class="project-borders-group">
                <template x-for="(radius, name) in $store.project.radiusPreset" :key="name">
                    <div class="project-borders">
                        <button class="hs-button radius-button" @click="$store.pd.radiusActive = name; $store.project.setRadius()" :class="{ 'active': name == $store.pd.radiusActive }">
                            <span class="hs-radius-preview" x-bind:style="`--radius-preview:${radius.preview};`"></span>
                        </button>
                        <div x-text="name"></div>
                    </div>
                </template>
            </div>
        </div>
    </div>

    <div id="site-theme" style="margin-bottom: 2rem">
        <div id="site-theme-n" data-tippy-picker @click="$store.colorWheel.tcpShow('neutral', null)">
            <template x-for="item in $store.pd.neutralColorSchema.data[$store.pd.defaultTheme]">
                <div :style="`background:${$store.project.colorPreview(item)};`"></div>
            </template>
        </div>
        <div id="site-theme-b"  data-tippy-picker @click="$store.colorWheel.tcpShow('brand', null)">
            <div class="brand-strip">
                <template x-for="item in $store.pd.brandColorSchema.data[$store.pd.defaultTheme]">
                    <div :style="`background:${$store.project.colorPreview(item)};`"></div>
                </template>
            </div>
            <div class="brand-preview" :style="`background:${$store.project.colorPreview($store.pd.brandColorSchema.data[$store.pd.defaultTheme][8])};--_on:${$store.pd.brandColorSchema.data.onColor};`" >
                <div class="brand-preview-on">Brand</div>
            </div>
        </div>
        <template
            x-for="(schema, index) in $store.pd.colorSchemas.filter(s => s.presetColor)"
            :key="schema.name">
            <div class="pst-field" :data-disabled="!schema.enabled" :data-slot="schema.name" data-tippy-picker @click="$store.colorWheel.tcpShow('customSchemaIndex', null, index)">
                <div class="conic-preview" x-bind:style="`background-image: ${$store.project.conicGradient(schema)}`" :data-slot="schema.data.name">
                    <div class="conic-preview-main" :style="`background:${schema.data[$store.pd.defaultTheme][8].output};`">
                        <div :style="`background:${schema.data.onColor};`"></div>
                    </div>
                </div>
                <div style="display: flex; gap: .66em; align-items: center; margin-top: auto">
                    <div class="font-bold" :id="'enable-'+schema.name" x-text="schema.name" style="text-transform: capitalize;"></div>
                    <input :name="'enable-'+schema.name" style="font-size:19px" class="hs-switch-input" type="checkbox" x-model="schema.enabled">
                </div>
            </div>
        </template>
    </div>





    <div id="sitecolors-theme" class="hs-control-group schema-single" x-data="{'open': false}">

        <header style="display: flex; gap: .25rem; align-items: center;">

            <button id="page-toggle" class="hs-ghost-button" @click="open = !open">
                <svg x-show="!open" class="hs-icon hs-icon-large">
                    <use href="#ii-folder-closed"></use>
                </svg>
                <svg x-show="open" class="hs-icon hs-icon-large" style="display: none;">
                    <use href="#ii-folder-open"></use>
                </svg>
            </button>
            <div class="hs-vspacer"></div>

            <div class="control-group-name">Site Colors</div>
        </header>

        <div x-show="open" class="sub-options-group">
            <div class="sub-options-subgroup">
                <div class="sub-options-title">Base colors</div>
                <?php \Headspin\Components\inputWithColorpickerLightDark('Background', '$store.pd.themeSiteBackground.light', '$store.pd.themeSiteBackground.dark'); ?>
                <?php \Headspin\Components\inputWithColorpickerLightDark('Site Text Color', '$store.pd.themeSiteText.light', '$store.pd.themeSiteText.dark'); ?>
                <?php \Headspin\Components\inputWithColorpickerLightDark('Site Headings Color', '$store.pd.themeSiteHeadings.light', '$store.pd.themeSiteHeadings.dark'); ?>
            </div>
            <div class="sub-options-subgroup">
                <div class="sub-options-title">Selection</div>
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 1rem">
                    <div style="width:200px">Selection Style:</div>
                    <div class="token-group-button">
                        <button class="hs-button-gtoken" @click="$store.pd.themeSelectionStyle = 'background' " :class="{ 'active': 'background' == $store.pd.themeSelectionStyle }">
                            Background
                        </button>
                        <button class="hs-button-gtoken" @click="$store.pd.themeSelectionStyle = 'shadow' " :class="{ 'active': 'shadow' == $store.pd.themeSelectionStyle }">
                            Shadow
                        </button>
                    </div>
                </div>
                <?php \Headspin\Components\inputWithColorpicker('Foreground', '$store.pd.themeSelectionForeground'); ?>
                <div x-show="'background' == $store.pd.themeSelectionStyle">
                    <?php \Headspin\Components\inputWithColorpicker('Background', '$store.pd.themeSelectionBackground'); ?>
                </div>
                <div x-show="'shadow' == $store.pd.themeSelectionStyle">
                    <?php \Headspin\Components\inputWithColorpicker('Shadow Color', '$store.pd.themeSelectionShadowColor'); ?>
                </div>
                <div style="display: flex; gap: 12px; align-items: center;">
                    <div style="width:200px">Enable Alt Selections:</div>
                    <div class="token-group-button">
                        <button class="hs-button-gtoken" @click="$store.pd.themeSelectionAltEnabled = true " :class="{ 'active': true == $store.pd.themeSelectionAltEnabled }">
                            Enabled
                        </button>
                        <button class="hs-button-gtoken" @click="$store.pd.themeSelectionAltEnabled = false " :class="{ 'active': false == $store.pd.themeSelectionAltEnabled }">
                            Disabled
                        </button>
                    </div>
                </div>
                <div id="alt-selection-styles" x-show="$store.pd.themeSelectionAltEnabled">
                    <template
                        x-for="(alt, index) in $store.pd.themeSelectionAltArray"
                        :key="index">
                        <div class="dynamic-paths-group line-counter" style="width: fit-content;margin-top: 1.33rem;">
                            <div class="dynamic-path-item-header line-counter-after">Selection Alt</div>
                            <div data-bgfg>
                                <?php \Headspin\Components\inputWithColorpicker('Background', 'alt.themeSelectionAltBackground'); ?>
                                <?php \Headspin\Components\inputWithColorpicker('Foreground', 'alt.themeSelectionAltForeground'); ?>
                            </div>
                            <div data-selector-type>
                                <div style="display: flex; gap: 12px; align-items: center;">
                                    <div style="width:200px">Enable Alt Selections:</div>
                                    <div class="token-group-button">
                                        <button class="hs-button-gtoken" @click="alt.themeSelectionSelectorType = 'preset' " :class="{ 'active': alt.themeSelectionSelectorType == 'preset' }">
                                            Preset
                                        </button>
                                        <button class="hs-button-gtoken" @click="alt.themeSelectionSelectorType = 'custom'" :class="{ 'active': alt.themeSelectionSelectorType == 'custom' }">
                                            Custom
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div data-selector-type="preset" x-show="alt.themeSelectionSelectorType == 'preset'"
                            x-data="{ 
                                toggle(key, alt) {
                                    const idx = alt.indexOf(key);
                                    if (idx > -1) {
                                        alt.splice(idx, 1); // remove
                                    } else {
                                        alt.push(key); // add
                                    }
                                }
                            }">
                                <button @click="toggle('text', alt.themeSelectionAltSelectors)" :data-active="alt.themeSelectionAltSelectors.includes('text')">Text</button>
                                <button @click="toggle('headings', alt.themeSelectionAltSelectors)" :data-active="alt.themeSelectionAltSelectors.includes('headings')">Headings</button>
                                <button @click="toggle('headings_emp', alt.themeSelectionAltSelectors)" :data-active="alt.themeSelectionAltSelectors.includes('headings_emp')">Headings Emphasis</button>
                                <button @click="toggle('dark_mode', alt.themeSelectionAltSelectors)" :data-active="alt.themeSelectionAltSelectors.includes('dark_mode')">Dark Mode</button>
                                <button @click="toggle('light_mode', alt.themeSelectionAltSelectors)" :data-active="alt.themeSelectionAltSelectors.includes('light_mode')">Light Mode</button>
                             
                            </div>
                        </div>
                    </template>
                </div>
            </div>

        </div>

    </div>
    <div id="page-theme" class="hs-control-group schema-single" x-data="{'open': false}">

        <header style="display: flex; gap: .25rem; align-items: center;">

            <button id="page-toggle" class="hs-ghost-button" @click="open = !open">
                <svg x-show="!open" class="hs-icon hs-icon-large">
                    <use href="#ii-folder-closed"></use>
                </svg>
                <svg x-show="open" class="hs-icon hs-icon-large" style="display: none;">
                    <use href="#ii-folder-open"></use>
                </svg>
            </button>
            <div class="hs-vspacer"></div>

            <div class="control-group-name">Page</div>
        </header>

        <div x-show="open" class="sub-options-group">
            <div class="hs--page-settings-indicators">
                <div class="hs--gutter-left-label">Offset</div>
                <div class="hs--page-labele">Page width</div>
                <div class="hs--gutter-right">Offset</div>
            </div>
            <div class="hs--page">
                <div class="hs--gutter" x-bind:style="`width: 20px;height: 100%;`"></div>
                <div class="hs--inner-page" x-bind:style="`gap: 20px;display:grid; grid-template-columns: repeat(12,1fr);`">
                    <div class="hs--column">column</div>
                    <div class="hs--column">column</div>
                    <div class="hs--column">column</div>
                    <div class="hs--column">column</div>
                    <div class="hs--column">column</div>
                    <div class="hs--column">column</div>
                    <div class="hs--column">column</div>
                    <div class="hs--column">column</div>
                    <div class="hs--column">column</div>
                    <div class="hs--column">column</div>
                    <div class="hs--column">column</div>
                    <div class="hs--column">column</div>
                </div>
                <div class="hs--gutter" x-bind:style="`width: 20px;height: 100%;`"></div>
            </div>
            <div id="theme-page-options" class="hs--page-options">
                <?php \Headspin\Components\numInput('Page Width', 'PX', '$store.pd.themePageWidth', 'themePageWidth'); ?>
                <?php \Headspin\Components\numInput('Offset (min.)', 'PX', '$store.pd.themeOffset', 'themeOffset'); ?>
                <?php \Headspin\Components\numInput('Column gap', 'PX', '$store.pd.themeGap', 'themeGap'); ?>
            </div>

        </div>

    </div>
    <div id="typography-theme" class="hs-control-group schema-single" x-data="{'open': false}">

        <header style="display: flex; gap: .25rem; align-items: center;">

            <button id="typo-toggle" class="hs-ghost-button" @click="open = !open">
                <svg x-show="!open" class="hs-icon hs-icon-large">
                    <use href="#ii-folder-closed"></use>
                </svg>
                <svg x-show="open" class="hs-icon hs-icon-large" style="display: none;">
                    <use href="#ii-folder-open"></use>
                </svg>
            </button>
            <div class="hs-vspacer"></div>

            <div class="control-group-name">Typography</div>
            <div class="hs-vspacer pull-right"></div>
            <button id="typo-subtab" class="hs-ghost-button" data-tippy-content="Open Advanced Typography Settings" @click="$store.project.advancedTypography = true">
                <?php \Headspin\Components\svg("ii-configure"); ?>
            </button>
        </header>

        <div x-show="open" class="sub-options-group">
            <div id="typo-font-size" class="theme-sub-group-wide-card">
                <div class="theme-sub-group-wide-card-icon">
                    <?php \Headspin\Components\svg("ii-typography"); ?>
                </div>
                <div class="theme-sub-group-wide-card-option-container">
                    <span style="color: var(--brand-11);">Font size</span>
                    <div class="min-space-group project-size-group" style="display: flex; gap:.35rem;">

                        <template x-for="(scale, index) in $store.appView.sizeLabels" :key="index">
                            <button class="hs-button size-button" @click="$store.pd.themeFontSize = scale;  $store.typography.onFontSizePresetChange(scale)" :class="{ 'active': scale == $store.pd.themeFontSize}">
                                <span x-text="index + 1"></span>
                            </button>
                        </template>
                        <button class="hs-button size-button hide-inactive" @click="$store.pd.themeFontSize = 'custom';$store.project.advancedTypography = true" :class="{ 'active': 'custom' == $store.pd.themeFontSize}">
                            <span>Custom</span>
                        </button>
                    </div>
                </div>
            </div>
            <div id="typo-line-height" class="theme-sub-group-wide-card">
                <div class="theme-sub-group-wide-card-icon">
                    <?php \Headspin\Components\svg("ii-line-height"); ?>
                </div>
                <div class="theme-sub-group-wide-card-option-container">
                    <div style="display: flex; gap: 1rem;">
                        <span style="color: var(--brand-11);">Line height</span>
                        <div id="line-height" class="hs-input-row " style="display: flex">
                            <label for="line-height-switch" style="font-size: 0; opacity: 0;">Line Height</label>
                            <input id="line-height-switch" name="line-height-switch" style="font-size:19px" class="hs-switch-input" type="checkbox" x-model="$store.pd.themeLineHeightEnabled">
                        </div>
                    </div>
                    <div x-show="$store.pd.themeLineHeightEnabled">
                        <div class="min-space-group project-size-group" style="display: flex; gap:.35rem;">

                            <template x-for="(scale, index) in $store.appView.sizeLabels" :key="index">
                                <button class="hs-button size-button" @click="$store.pd.themeLineHeight = scale;  $store.typography.onLineHeightPresetChange(scale)" :class="{ 'active': scale == $store.pd.themeLineHeight}">
                                    <span x-text="index + 1"></span>
                                </button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>


    <div id="spacing-theme" class="hs-control-group schema-single" x-data="{'open': false}">

        <header style="display: flex; gap: .25rem; align-items: center;">

            <button id="spacing-toggle" class="hs-ghost-button" @click="open = !open">
                <svg x-show="!open" class="hs-icon hs-icon-large">
                    <use href="#ii-folder-closed"></use>
                </svg>
                <svg x-show="open" class="hs-icon hs-icon-large" style="display: none;">
                    <use href="#ii-folder-open"></use>
                </svg>
            </button>
            <div class="hs-vspacer"></div>

            <div class="control-group-name">Spacing</div>
            <div class="hs-vspacer pull-right"></div>
            <button id="spacing-subtab" class="hs-ghost-button" data-tippy-content="Open Advanced Spacing Settings" @click="$store.project.advancedSpacing = true">
                <?php \Headspin\Components\svg("ii-configure"); ?>
            </button>
        </header>

        <div x-show="open" class="sub-options-group">
            <div id="space-section-space" class="theme-sub-group-wide-card">
                <div class="theme-sub-group-wide-card-icon hs-spacing-preview" x-bind:data-hsxprev="$store.pd.themeSectionSpace">
                    <div style="width: 100%; height: var(--xyzc-padding); background-color: var(--xyzc-indicator)"></div>
                    <div style="padding: .25rem 0rem;border-radius: 2px; width: 100%; display:flex; justify-content: center;pointer-events:none">Section</div>
                    <div style="width: 100%; height: var(--xyzc-padding); background-color: var(--xyzc-indicator)"></div>
                </div>
                <div class="theme-sub-group-wide-card-option-container">
                    <span style="color: var(--brand-11);">Section space</span>
                    <div class="min-space-group project-size-group" style="display: flex; gap:.35rem; width: 100%">

                        <template x-for="(scale, index) in $store.appView.sizeLabels" :key="index">
                            <button class="hs-button size-button" @click="$store.pd.themeSectionSpace = scale;  $store.space.onSectionSpaceChange(scale)" :class="{ 'active': scale == $store.pd.themeSectionSpace}">
                                <span x-text="index + 1"></span>
                            </button>
                        </template>
                        <button class="hs-button size-button hide-inactive" @click="$store.pd.themeSectionSpace = 'custom';$store.project.advancedSpacing = true" :class="{ 'active': 'custom' == $store.pd.themeSectionSpace}">
                            <span>Custom</span>
                        </button>
                    </div>
                </div>
            </div>
            <div id="space-component-space" class="theme-sub-group-wide-card" x-bind:data-hsxprev="$store.pd.themeComponentSpace">
                <div class="theme-sub-group-wide-card-icon hs-spacing-preview" style="padding:var(--xyzc-padding) calc(var(--xyzc-padding) * 0.75); background-color: var(--xyzc-indicator);display: flex; ">
                    <div style="width: 100%;background: var(--brand-3);height: 100%;display: flex;align-items: center;justify-content: center; border-radius: 3px;">Padding</div>
                </div>
                <div class="theme-sub-group-wide-card-option-container">
                    <span style="color: var(--brand-11);">Component space</span>
                    <div class="min-space-group project-size-group" style="display: flex; gap:.35rem;">

                        <template x-for="(scale, index) in $store.appView.sizeLabels" :key="index">
                            <button class="hs-button size-button" @click="$store.pd.themeComponentSpace = scale;  $store.space.onComponentSpaceChange(scale)" :class="{ 'active': scale == $store.pd.themeComponentSpace}">
                                <span x-text="index + 1"></span>
                            </button>
                        </template>
                        <button class="hs-button size-button hide-inactive" @click="$store.pd.themeComponentSpace = 'custom';$store.project.advancedSpacing = true" :class="{ 'active': 'custom' == $store.pd.themeComponentSpace}">
                            <span>Custom</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>