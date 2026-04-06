<?php if (!defined('ABSPATH')) exit; ?>
<div class="tippy-colorpicker">
  
    <div id="tippy-colorpicker-wheel"></div>
    <div class="tippy-hex">
        <label for="tippy-hex">HEX</label>
        <div class="hs-input">
            <input type="text" id="tippy-hex" name="tippy-hex" x-model="$store.colorWheel.tcpValue" @change="$store.colorWheel.tcpOnChange()">
        </div>
        
    </div>
</div>