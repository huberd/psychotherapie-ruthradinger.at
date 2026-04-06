<?php
namespace Headspin\Components;
if (!defined('ABSPATH')) exit;

function inputWithRange($label, $unit, $xmodel, $min, $max, $step)
{
?>
    <div class="hs-fieldset">
        <label class="hs-label"><?php echo esc_attr($label); ?></label>
        <div class="hs-input-grid">
            <div class="hs-input relative">
                <input x-on:change="headspinRegenerate()" type="number" pattern="[0-9]*" oninput="preventNonNumericalInput(event)" x-model="<?php echo esc_attr($xmodel); ?>">
                <div class="hs-input-unit"><?php echo esc_attr($unit); ?></div>
            </div>
            <div style="display: flex;gap: var(--hs-padding-small);">
                <button @click="<?php echo esc_attr($xmodel); ?>--" class="hs-button">-</button>
                <input class="hs-palette-padding-range" x-on:change="headspinGeneratePalette(palette);headspinRegenerate()" x-model="<?php echo esc_attr($xmodel); ?>" type="range" min="<?php echo esc_attr($min); ?>" max="<?php echo esc_attr($max); ?>" step="<?php echo esc_attr($step); ?>">
                <button @click="<?php echo esc_attr($xmodel); ?>++" class="hs-button">+</button>
            </div>
        </div>

    </div>

<?php
}

function inputField($label, $xmodel)
{
?>
    <div class="hs-fieldset">
        <label class="hs-label"><?php echo esc_attr($label); ?></label>
        <div class="hs-input relative">
            <input x-on:change="headspinRegenerate()" type="text" pattern="[0-9]*" oninput="preventNonNumericalInput(event)" x-model="<?php echo esc_attr($xmodel); ?>">
        </div>
    </div>
<?php
}
