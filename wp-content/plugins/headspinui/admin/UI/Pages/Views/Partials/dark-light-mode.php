<?php if (!defined('ABSPATH')) exit; ?>
<button class="hs-button" x-data="$store.appView.darkTheme" x-init="$store.appView.setTheme()" @click="$store.appView.toggleTheme()">
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