<?php
namespace Headspin\Components;
if (!defined('ABSPATH')) exit;

function inputWithColorpicker($label, $xmodel)
{
?>
    <div class="hs-input-row ">
        <label class="hs-label"><?php echo esc_attr($label); ?></label>
        <div class="hs-input-gridxx ref" >
            <div class="hs-input relative" @click="$store.colorWheel.tcpShow('ref', $el)" data-tippy-picker>
                <input x-on:change="headspinRegenerate()" type="text"  x-model="<?php echo esc_attr($xmodel); ?>">
                <div class="hs-input-unit">
                    <button class="token-color-button" x-bind:style="`background-color: ${$store.project.previewColor($store.pd.defaultTheme, <?php echo esc_attr($xmodel); ?>)}`"></button>
                </div>
            </div>
        </div>

    </div>

<?php
}
function inputWithColorpickerLightDark($label, $xmodelLight,$xmodelDark )
{
?>
    <div class="hs-input-row ref" style="max-width: 45rem;">
        <label class="hs-label"><?php echo esc_attr($label); ?></label>
        <div class="hs-input-gridxx" style="display: flex; gap: .5rem">
            <div class="hs-input relative ref" data-tippy-picker @click="$store.colorWheel.tcpShow('ref', $el)">
                <input  x-on:change="headspinRegenerate()" type="text"  x-model="<?php echo esc_attr($xmodelLight); ?>">
                <div class="hs-input-unit" @click="$store.colorWheel.tcpShow('ref', $el)">
                    <svg class="hs-icon hs-icon-large loading-icon">
                        <use href="#ii-sun"></use>
                    </svg>
                    <button class="token-color-button" x-bind:style="`background-color: ${$store.project.previewColor('light', <?php echo esc_attr($xmodelLight); ?>)}`"></button>
                </div>
            </div>
            <div class="hs-input relative ref" data-tippy-picker @click="$store.colorWheel.tcpShow('ref', $el)">
                <input x-on:change="headspinRegenerate()" type="text"  x-model="<?php echo esc_attr($xmodelDark); ?>">
                <div class="hs-input-unit">
                    <svg class="hs-icon hs-icon-large loading-icon">
                        <use href="#ii-moon"></use>
                    </svg>
                    <button class="token-color-button" x-bind:style="`background-color: ${$store.project.previewColor('dark', <?php echo esc_attr($xmodelDark); ?>)}`"></button>
                </div>
            </div>
        </div>

    </div>

<?php
}

