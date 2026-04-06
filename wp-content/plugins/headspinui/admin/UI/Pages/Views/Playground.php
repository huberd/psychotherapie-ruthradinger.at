<?php
if (!defined('ABSPATH')) exit;

// Use home_url() instead of site_url() since this is a front-end template
$playground_url = add_query_arg('tokenwpplayground', 'playgroundactive', home_url('/'));
?>



<iframe id="playground-preview"
    src="<?php echo esc_url($playground_url); ?>"
    width="100%"
    height="100%"
    style="border:0;"
    frameborder="0"
    @load="$store.iframe.regenCSS()"
    allowfullscreen>
</iframe>
<div x-data="{ 
            subnav: false,           
            openSubnav(o, buttonEl){
                this.setRight(buttonEl);
                if(o != this.subnav){
                    this.subnav = o;
                }
                else {
                    this.subnav = false;
                }
            },
            switchTheme(){
                if($store.pd.defaultTheme == 'light'){
                    $store.pd.defaultTheme = 'dark';
                }
                else{
                    $store.pd.defaultTheme = 'light';
                }
            },
            setRight(el){
                var t = document.getElementById('playground');
                if (t && el) {
                    var rect = el.getBoundingClientRect();
                    var rightOffset = window.innerWidth - rect.right;
                    t.style.setProperty('--_right', rightOffset + 'px');
                }
            }
        }"
    @click.outside="subnav = false">
    <div id="playground-options" @click="$store.iframe.regenCSS()">


        <button class="hs-playground-button-icon hs-button hs-subnav-button" @click="$store.appView.playgroundMode = !$store.appView.playgroundMode">
            <svg class="hs-icon hs-icon-playground">
                <use href="#ii-poweroff"></use>
            </svg>
        </button>
        <div class="hs-playground-divider"></div>
        <button class="hs-playground-button hs-button hs-subnav-button" style="background: black; color: white" @click="openSubnav('text', $el)">
            Text
        </button>
        <button class="hs-playground-button hs-button hs-subnav-button" style="background: white; color: black" @click="openSubnav('background', $el)"> 
            Background
        </button>
        <button class="hs-playground-button hs-button hs-subnav-button" :style="`background:${$store.project.colorPreview($store.pd.brandColorSchema.data.light[8])};color:${$store.pd.brandColorSchema.data.onColor};`" data-tippy-picker @click="$store.colorWheel.tcpShow('brand', null)">
            Brand
        </button>
        <div id="preset-schema-enable" style=" display: flex; gap: inherit;">
            <template
                x-for="(schema, index) in $store.pd.colorSchemas.filter(s => s.presetColor && s.enabled)"
                :key="schema.name">
                <button class="hs-playground-button hs-button hs-subnav-button" x-text="schema.name" x-bind:style="`background-color: ${$store.project.colorPreview(schema.data.light[9])}; color: ${schema.data.onColor}`" data-tippy-picker @click="$store.colorWheel.tcpShow('customSchemaIndex', null, index)"  :data-slot="schema.name"></button>
            </template>
        </div>
        <div class="hs-playground-button-icon-withchevron">
            <button class="hs-button-blank" style="padding-inline: .66rem" @click="$store.project.mixRandomColorsPST()">
                <svg class="hs-icon hs-icon-playground" style="max-height: 24px; width: 22px">
                    <use href="#ii-dice"></use>
                </svg>
            </button>
            <button class="hs-button-blank" @click="subnav = 'color_scheme_type'" >
                <svg class="hs-icon hs-icon-playground" style="max-height: 16px; width: 14px">
                    <use href="#ii-chevron-up"></use>
                </svg>
            </button>
        </div>
        <div class="hs-playground-divider"></div>


        <button class="hs-playground-button-icon hs-button hs-subnav-button" data-tippy-content="Typography" :class="(subnav === 'typography') && 'active'" @click="openSubnav('typography', $el)">
            <svg class="hs-icon hs-icon-playground">
                <use href="#ii-typography"></use>
            </svg>
        </button>
        <button class="hs-playground-button-icon hs-button hs-subnav-button" :class="(subnav === 'spacing') && 'active'" @click="openSubnav('spacing', $el)">
            <svg class="hs-icon hs-icon-playground">
                <use href="#ii-size"></use>
            </svg>
        </button>
        <button class="hs-playground-button-icon hs-button hs-subnav-button" :class="(subnav === 'radius') && 'active'" @click="openSubnav('radius', $el)">
            <svg class="hs-icon hs-icon-playground">
                <use href="#ii-border"></use>
            </svg>
        </button>
        <div class="hs-playground-divider"></div>

        <button class="hs-playground-button-icon hs-button hs-subnav-button" :class="(subnav === 'page') && 'active'" @click="openSubnav('page', $el)">
            <svg class="hs-icon hs-icon-playground">
                <use href="#ii-page"></use>
            </svg>
        </button>
        <button class="hs-playground-button-icon hs-button hs-subnav-button" @click="switchTheme()">
            <svg class="hs-icon hs-icon-playground" x-show="$store.pd.defaultTheme == 'light'">
                <use href="#ii-sun"></use>
            </svg>
            <svg class="hs-icon hs-icon-playground" x-show="$store.pd.defaultTheme == 'dark'">
                <use href="#ii-moon"></use>
            </svg>
        </button>


    </div>
   
        <div id="playground-palette-options" class="playground-submenu"  x-show="subnav === 'colorOptions'"></div>
        <div id="playground-page-options" class="playground-submenu"  x-show="subnav === 'page'" @change="$store.iframe.regenCSS()">
            <?php \Headspin\Components\numInput('Page Width', 'PX', '$store.pd.themePageWidth', 'themePageWidth'); ?>
            <?php \Headspin\Components\numInput('Offset (min.)', 'PX', '$store.pd.themeOffset', 'themeOffset'); ?>
            <?php \Headspin\Components\numInput('Column gap', 'PX', '$store.pd.themeGap', 'themeGap'); ?>
        </div>
        <div id="playground-typography" class="playground-submenu"  x-show="subnav === 'typography'">
            <div id="typo-font-size" class="theme-sub-group-wide-card">
                <div class="theme-sub-group-wide-card-icon">
                    <?php \Headspin\Components\svg("ii-typography"); ?>
                </div>
                <div class="theme-sub-group-wide-card-option-container">
                    <span style="color: var(--brand-11);">Font size</span>
                    <div class="min-space-group project-size-group" style="display: flex; gap:.35rem;" @click="$store.iframe.regenCSS()">

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
                        <div class="min-space-group project-size-group" style="display: flex; gap:.35rem;" @click="$store.iframe.regenCSS()">

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
        <div id="playground-radius" class="playground-submenu"  x-show="subnav === 'radius'">
            <div id="project-radius" class="hs-input-row">
                <div class="hs-input">
                    <div class="project-borders-group" @click="$store.iframe.regenCSS()">
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
        </div>
        <div id="playground-radius" class="playground-submenu"  x-show="subnav === 'spacing'">
            <div id="space-section-space" class="theme-sub-group-wide-card">
                <div class="theme-sub-group-wide-card-icon hs-spacing-preview" x-bind:data-hsxprev="$store.pd.themeSectionSpace">
                    <div style="width: 100%; height: var(--xyzc-padding); background-color: var(--xyzc-indicator)"></div>
                    <div style="padding: .25rem 0rem;border-radius: 2px; width: 100%; display:flex; justify-content: center;pointer-events:none">Section</div>
                    <div style="width: 100%; height: var(--xyzc-padding); background-color: var(--xyzc-indicator)"></div>
                </div>
                <div class="theme-sub-group-wide-card-option-container">
                    <span style="color: var(--brand-11);">Section space</span>
                    <div class="min-space-group project-size-group" style="display: flex; gap:.35rem; width: 100%" @click="$store.iframe.regenCSS()">

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
                    <div class="min-space-group project-size-group" style="display: flex; gap:.35rem;" @click="$store.iframe.regenCSS()">

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
        <div id="pg-color-text" class="playground-submenu"  x-show="subnav === 'text'">
            <?php \Headspin\Components\inputWithColorpickerLightDark('Site Text Color', '$store.pd.themeSiteText.light', '$store.pd.themeSiteText.dark'); ?>
            <?php \Headspin\Components\inputWithColorpickerLightDark('Site Headings Color', '$store.pd.themeSiteHeadings.light', '$store.pd.themeSiteHeadings.dark'); ?>
        </div>
        <div id="pg-color-bg" class="playground-submenu"  x-show="subnav === 'background'">
            <?php \Headspin\Components\inputWithColorpickerLightDark('Background', '$store.pd.themeSiteBackground.light', '$store.pd.themeSiteBackground.dark'); ?>
        </div>
        <div id="pg-color-schema" class="playground-submenu"  x-show="subnav === 'color_scheme_type'">
            <button class="pg-dropdown-button hs-button" :class="{ 'active': $store.pd.playgroundColorschemeType == 'random' }" @click="$store.pd.playgroundColorschemeType = 'random'">All</button>
            <button class="pg-dropdown-button hs-button" :class="{ 'active': $store.pd.playgroundColorschemeType == 'monochromatic' }" @click="$store.pd.playgroundColorschemeType = 'monochromatic'">Monochromatic</button>
            <button class="pg-dropdown-button hs-button" :class="{ 'active': $store.pd.playgroundColorschemeType == 'analogous' }" @click="$store.pd.playgroundColorschemeType = 'analogous'">Analogous</button>
            <button class="pg-dropdown-button hs-button" :class="{ 'active': $store.pd.playgroundColorschemeType == 'complementary' }" @click="$store.pd.playgroundColorschemeType = 'complementary'">Complementary</button>
            <button class="pg-dropdown-button hs-button" :class="{ 'active': $store.pd.playgroundColorschemeType == 'split_complementary' }" @click="$store.pd.playgroundColorschemeType = 'split_complementary'">Split Complementary</button>
            <button class="pg-dropdown-button hs-button" :class="{ 'active': $store.pd.playgroundColorschemeType == 'triadic' }" @click="$store.pd.playgroundColorschemeType = 'triadic'">Triadic</button>
            <button class="pg-dropdown-button hs-button" :class="{ 'active': $store.pd.playgroundColorschemeType == 'tetradic' }" @click="$store.pd.playgroundColorschemeType = 'tetradic'">Tetradic</button>
        </div>
    



</div>