<?php


namespace Headspin\Components;

if (!defined('ABSPATH')) exit;
/** 
 * Min Viewport fieldset => Typography
 * @since Headspin 1.0.0
 */
function headspin_math_scale_select($store, $custom_scale)
{
?>
    <div class="hs-select-scale"
        x-data="{
            dropdownOpen: true,
            selectValue:  <?php echo esc_attr($store); ?>,
            focusedElementIndex: -1,
            dropdownToggle() {
                if (this.dropdownOpen) {
                    return this.close()
                }
                let selector = `[data-value='${this.selectValue}']`;
                this.$refs.button.focus()
                this.dropdownOpen = true;
                setTimeout(()=>{
                    if($refs.panel.querySelector('.hs-button.hs-button-radio.active')){
                        $refs.panel.querySelector('.hs-button.hs-button-radio.active').focus()
                    }
                    else if($refs.panel.querySelector(selector)){
                        $refs.panel.querySelector(selector).classList.add('active')
                    }
                },100)             
            },
            close(focusAfter) {
                if (! this.dropdownOpen) return
 
                this.dropdownOpen = false
 
                focusAfter && focusAfter.focus()
                this.$refs.button.focus()
            },
            selectableItemActiveNext(){
                let list = this.$refs.panel.querySelectorAll('.hs-button');
                let activeElement = document.activeElement.closest('.hs-button-focus') || this.$refs.panel.querySelector('.hs-button.hs-button-radio.active');
                let nextIndex = [...list].indexOf(activeElement) + 1;
                if(nextIndex > list.length - 1) return list[0].focus();
                list[nextIndex].focus();
            },
            selectableItemActivePrevious(){
                let list = this.$refs.panel.querySelectorAll('.hs-button');
                let activeElement = document.activeElement.closest('.hs-button-focus') || this.$refs.panel.querySelector('.hs-button.hs-button-radio.active');
                let nextIndex = [...list].indexOf(activeElement) - 1;
                if(nextIndex < 0) return list[list.length - 1].focus();
                list[nextIndex].focus();
            }
        }"
        x-on:keydown.escape.prevent.stop="close($refs.button)"
        x-on:focusin.window="! $refs.panel.contains($event.target) && close()"
        x-id="['dropdown-button']"
        @keydown.down="if(dropdownOpen){ selectableItemActiveNext(); } else { dropdownOpen=true; } event.preventDefault();"
        @keydown.up="if(dropdownOpen){ selectableItemActivePrevious(); } else { dropdownOpen=true; } event.preventDefault();"
        @keydown.enter="selectOpen=false;">
        <button x-show="<?php echo esc_attr($custom_scale); ?> != true"
            class="hs-button-select"
            x-ref="button"
            x-on:click="dropdownToggle();"
            :aria-expanded="dropdownOpen"
            :aria-controls="$id('dropdown-button')"
            type="hs-button">
            <div x-text="<?php echo esc_attr($store); ?>"></div>
            <!-- Heroicon: chevron-down -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>
      
        <div class="hs-select-scale-dropdown-panel"
            x-ref="panel"
            x-show="dropdownOpen"
            x-transition.origin.top.left
            x-on:click.outside="close($refs.button)"
            :id="$id('dropdown-button')"
            style="display: none;">
            <div class="headspin-select-dropdown-body" x-ref="dropdownlist">
                <template x-for="(scale, index) in $store.space.scales" :key="index">
                    <button x-text="index" class="hs-button hs-button-focus hs-button-radio" x-bind:data-value="scale" x-bind:class="{ 'active':<?php echo esc_attr($store); ?> == scale }" @click=" <?php echo esc_attr($store); ?> = scale; headspinRegenerate()"></button>
                </template>
                <button class="hs-button hs-button-focus hs-button-radio hs-custom" data-value="1.333" @click=" <?php echo esc_attr($custom_scale); ?> = true ;<?php echo esc_attr($store); ?> = '1.333'; headspinRegenerate()"> Custom</button>
            </div>
        </div>


    </div>
<?php
}

function minViewportFieldset($xmodel, $option)
{
?>

    <div id="typo-minvp" class="hs-typography-viewport-settings">
        <div class="hs-control-group-label">MIN VIEWPORT</div>
        <div class="hs-input-row-3 grid-2col">
            <div class="hs-fieldset tour-font-size">
                <label class="hs-input-label"><?php echo esc_attr($option); ?></label>
                <div class="hs-input">
                    <input x-on:change="headspinRegenerate();$store.pd.themeFontSize = 'custom';" type="text" pattern="[0-9]*" oninput="preventNonNumericalInput(event)" x-model="$store.pd.typographyMinFont">
                </div>
            </div>
            <div class="hs-fieldset relative">
                <label class="hs-input-label">Scale</label>
                <?php echo esc_html(headspin_math_scale_select('$store.pd.typographyMinScale', '$store.pd.typographyMinCustomScale')); ?>
            </div>

        </div>
    </div>
<?php
}
/** 
 * Max Viewport fieldset => Typography
 * @since Headspin 1.0.0
 */
function maxViewportFieldset($xmodel, $option)
{
?>
    <div id="typo-maxvp" class="hs-typography-viewport-settings">
        <div class="hs-control-group-label">MAX VIEWPORT</div>
        <div class="hs-input-row-3 grid-2col">
            <div id="tour-font-size" class="hs-fieldset">
                <label class="hs-input-label"><?php echo esc_attr($option); ?></label>
                <div class="hs-input">
                    <input x-on:change="headspinRegenerate(); $store.pd.themeFontSize = 'custom';" type="text" pattern="[0-9]*" oninput="preventNonNumericalInput(event)" x-model="$store.pd.typographyMaxFont">
                </div>
            </div>
            <div id="tour-font-scale" class="hs-fieldset relative">
                <label class="hs-input-label">Scale</label>
                <?php echo esc_html(headspin_math_scale_select('$store.pd.typographyMaxScale', '$store.pd.typographyMaxCustomScale')); ?>

            </div>

        </div>
    </div>
<?php
}
/** 
 * Min Viewport fieldset => SPACING
 * @since Headspin 1.0.0
 */
function minViewportFieldsetSpacing($xmodel, $option)
{
?>

    <div id="spacing-minvp" class="hs-typography-viewport-settings">
        <div class="hs-control-group-label">MIN VIEWPORT</div>
        <div class="hs-input-row-3 grid-3col" style="grid-template-columns: 1fr 1fr 2fr">
            <div id="spacing-minvp-size" class="hs-fieldset">
                <label class="hs-input-label"><?php echo esc_attr($option); ?></label>
                <div class="hs-input">
                    <input x-on:change="headspinRegenerate(); $store.pd.themeComponentSpace = 'custom';$store.pd.themeSectionSpace = 'custom';" type="text" pattern="[0-9]*" oninput="preventNonNumericalInput(event)" x-model="$store.pd.spacingMinFontSize">
                </div>
            </div>
            <div id="spacing-minvp-section" class="hs-fieldset">
                <label class="hs-input-label">Multiplier</label>
                <div class="hs-input">
                    <input x-on:change="headspinRegenerate();$store.pd.themeComponentSpace = 'custom';$store.pd.themeSectionSpace = 'custom';" type="text" pattern="[0-9]*" oninput="preventNonNumericalInput(event)" x-model="$store.pd.spacingMinSectionMultiplier">
                </div>
            </div>
            <div id="spacing-minvp-scale" class="hs-fieldset relative">
                <label class="hs-input-label">Scale</label>
                <?php echo esc_html(headspin_math_scale_select('$store.pd.spacingMinScale', '$store.pd.spacingMinCustomScale')); ?>

            </div>

        </div>
    </div>
<?php
}
/** 
 * Max Viewport fieldset => SPACING
 * @since Headspin 1.0.0
 */
function maxViewportFieldsetSpacing($xmodel, $option)
{
?>
    <div id="spacing-maxvp" class="hs-typography-viewport-settings">
        <div class="hs-control-group-label">MAX VIEWPORT</div>
        <div class="hs-input-row-3 grid-3col" style="grid-template-columns: 1fr 1fr 2fr">
            <div class="hs-fieldset">
                <label class="hs-input-label"><?php echo esc_attr($option); ?></label>
                <div class="hs-input">
                    <input x-on:change="headspinRegenerate();$store.pd.themeComponentSpace = 'custom';$store.pd.themeSectionSpace = 'custom';" type="text" pattern="[0-9]*" oninput="preventNonNumericalInput(event)" x-model="$store.pd.spacingMaxFontSize">
                </div>
            </div>
            <div class="hs-fieldset">
                <label class="hs-input-label">Multiplier</label>
                <div class="hs-input">
                    <input x-on:change="headspinRegenerate();$store.pd.themeComponentSpace = 'custom';$store.pd.themeSectionSpace = 'custom';" type="text" pattern="[0-9]*" oninput="preventNonNumericalInput(event)" x-model="$store.pd.spacingMaxSectionMultiplier">
                </div>
            </div>
            <div class="hs-fieldset relative">
                <label class="hs-input-label">Modular</label>
                <?php echo esc_html(headspin_math_scale_select('$store.pd.spacingMaxScale', '$store.pd.spacingMaxCustomScale')); ?>

            </div>

        </div>
    </div>
<?php
}
function themeSwitcher()
{
?>
    <button data-tippy-content="Toggle dark/light mode" class="hs-ghost-button" x-data="$store.appView.darkTheme" x-init="$store.appView.setTheme()" @click="$store.appView.toggleTheme()">
        <div class="flex" x-show="$store.appView.theme == 'dark'">
            <svg class="hs-icon hs-icon-large">
                <use href="#ii-sun"></use>
            </svg>
        </div>
        <div class="flex" x-show="$store.appView.theme == 'light'">
            <svg class="hs-icon hs-icon-large">
                <use href="#ii-moon"></use>
            </svg>
        </div>
    </button>
<?php
}
function dropdown($title, $innerHTML)
{
?>
    <div class="x-dropdown">
        <div x-data="{
            open: false,
            toggle() {
                if (this.open) {
                    return this.close()
                }
 
                this.$refs.button.focus()
 
                this.open = true
            },
            close(focusAfter) {
                if (! this.open) return
 
                this.open = false
 
                focusAfter && focusAfter.focus()
            },
        }" x-on:keydown.escape.prevent.stop="close($refs.button)" x-on:focusin.window="! $refs.panel.contains($event.target) && close()" x-id="['dropdown-button']" class="relative">
            <!-- Button -->
            <button x-ref="button" x-on:click="toggle()" :aria-expanded="open" :aria-controls="$id('dropdown-button')" type="button" class="x-dropdown-button">
                <?php echo esc_html_e($title) ?>

                <!-- Heroicon: chevron-down -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>

            <!-- Panel -->
            <div x-ref="panel" x-show="open" x-transition.origin.top.left x-on:click.outside="close($refs.button)" :id="$id('dropdown-button')" style="display: none;" class="x-dropdown-panel">
                <?php echo esc_html_e($innerHTML)  ?>
            </div>
        </div>
    </div>
<?php
}
function svg($icon)
{
?>
    <svg class="hs-icon hs-icon-large">
        <use href="#<?php echo esc_attr($icon); ?>"></use>
    </svg>
<?php
}
