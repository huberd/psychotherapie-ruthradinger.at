<?php

namespace Headspin\Components;

if (!defined('ABSPATH')) exit;

function toggle_v1($label, $xmodel)
{ 
?>

    <div id="<?php echo esc_attr(strtolower(str_replace(' ', '-', $label))); ?>" class="hs-input-row " style="display: flex">
        <label for="line-height-switch" style="font-size: 0; opacity: 0;"><?php echo esc_attr($label); ?></label>
        <input id="line-height-switch" name="line-height-switch" style="font-size:19px" class="hs-switch-input" type="checkbox" x-model="<?php echo esc_attr($xmodel); ?>">
    </div>
<?php
}
