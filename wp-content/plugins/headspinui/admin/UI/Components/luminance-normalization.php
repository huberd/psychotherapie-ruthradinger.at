<?php


namespace Headspin\Components;

if (!defined('ABSPATH')) exit;
/** 
 * Min Viewport fieldset => Typography
 * @since Headspin 1.0.0
 */
function luminance_normalization($mode)
{
?>
    <div class="luminance-normalization-group">

        <template x-for="(item,i) in $store.pd.luminance_normalization.<?php echo esc_attr($mode); ?>">
            <div class="step-control-lum">
                <div class="luminance-slider-container">
                    <div class="slider-header">
                        <span class="preview-color" x-bind:style="`background-color: ${ Alpine.store('project').colorPreview(Alpine.store('pd').neutralColorSchema.data.<?php echo esc_attr($mode); ?>[i])};`" x-text="item.step"></span>
                        <div id="line-height" class="hs-input-row " style="display: flex;;justify-content: center;align-items: center;flex-direction: column;">
                            <label for="color-step-normalization" style="font-size: 0; opacity: 0;">Line Height</label>
                            <input name="color-step-normalization" style="font-size:19px" class="hs-switch-input" type="checkbox" x-model="item.enabled">
                        </div>
                        <span x-text="(item.value * 100).toFixed(1) + '%'"></span>

                    </div>
                    <div class="slider-controls" :style="`--_lumVal: ${item.value * 100}%; --_lumMin: ${item.min * 100}%; --_lumMax: ${item.max * 100}%; `">
                        <div class="lumMax"></div>
                        <div class="lumMin"></div>
                        <input
                            type="range"
                            orient="vertical"
                            class="luminance-slider"
                            :miny="item.min"
                            :maxy="item.max"
                            min="0"
                            max="1"
                            :step="0.001"
                            @change="item.value = $store.radix.setClosestGradeLuminance(item.value)"
                            x-model="item.value">
                    </div>
                    <div class="slider-footer">

                        <span x-text="$store.radix.uswdsGradeByLuminace(item.value)"></span>

                        <button class="hs-ghost-button" @click="item.value = item.defValue"
                            :disabled="item.value === item.defValue" data-tippy-content="Reset option">
                            <svg class="hs-icon hs-icon-large loading-icon">
                                <use href="#ii-reset"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </div>
<?php
}
