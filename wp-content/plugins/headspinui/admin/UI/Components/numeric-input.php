<?php

namespace Headspin\Components;
if (!defined('ABSPATH')) exit;

function numericInput($label, $unit, $xmodel)
{
?>
    <div class="hs-input-row">
        <label class="hs-label"><?php echo esc_attr($label); ?></label>
        <div class="hs-input-numeric">
            <button @click="<?php echo esc_attr($xmodel); ?>--" class="hs-button">-</button>
            <div class="hs-input relative">
                <input type="number" x-on:change="headspinRegenerate()" pattern="[0-9]*" oninput="preventNonNumericalInput(event)" x-model="<?php echo esc_attr($xmodel); ?>">
                <div class="hs-input-unit"><?php echo esc_attr($unit); ?></div>
            </div>
            <button @click="<?php echo esc_attr($xmodel); ?>++" class="hs-button">+</button>
        </div>
    </div>
<?php
}
function numInput($label, $unit, $xmodel, $reset)
{
?>
    <div id="<?php echo esc_attr($reset); ?>" class="hs-input-row">
        <label class="hs-label"><?php echo esc_attr($label); ?></label>
        <div class="hs-input-numeric">
            <div class="hs-input relative">
                <input type="number" x-on:change="headspinRegenerate()" pattern="[0-9]*" oninput="preventNonNumericalInput(event)" x-model="<?php echo esc_attr($xmodel); ?>">
                <div class="hs-input-unit"><?php echo esc_attr($unit); ?></div>
            </div>
        </div>
        <?php
        if ($reset) {
        ?>
            <button class="hs-ghost-button hs-reset"  x-show="$store.defaults.showReset('<?php echo esc_attr($reset); ?>')" @click="$store.defaults.doReset('<?php echo esc_attr($reset); ?>')" data-tippy-content="Reset option">
                <svg class="hs-icon hs-icon-large loading-icon">
                    <use href="#ii-reset"></use>
                </svg>
            </button>
        <?php
        }
        ?>
       

    </div>
<?php
}