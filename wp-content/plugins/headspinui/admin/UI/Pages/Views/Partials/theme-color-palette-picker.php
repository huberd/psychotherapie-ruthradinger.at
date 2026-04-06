<?php
if (!defined('ABSPATH')) exit;
?>
<div id="hs-tippy-palette-picker" x-show="$store.appView.colorPalettePicker" style="height: 25vh;">
    <section style="display: flex;padding: var(--hs-padding-small) var(--hs-padding-normal);border-bottom: var(--hs-border);align-items: center;gap: var(--hs-padding-normal);">
        <button class="hs-button hover-destructive" @click="$store.theme.closePalettePicker();">
            <svg class="hs-icon hs-icon-normal">
                <use href="#ii-close"></use>
            </svg>
        </button>
        <div style="font-size: var(--hs-text-normal);">Choose color from palette..</div>
    </section>
    <section x-data="$store.colors.palette" style="--hs-elevation-2: transparent; overflow: auto; max-height: calc(25vh - 60px);" :class="{'hs-contrast-active': $store.appView.contrastPreview}">
        <template x-for="(palette, index) in $store.colors.palette" :key="index">
            <div class="hs-palette-picker-section-container">
                <div class="hs-palette-preview" style="padding: 0; display: flex; width: 100%">
                    <div class="hs-single-color hs-palette-name-collapesed" x-text="palette.name"></div>
                    <template x-for="(color, index) in palette.colors" :key="index">
                        <div x-data class="hs-single-color" :class="{'active': color == $store.theme.palettePicker.value}" @click="$store.theme.setColorFromPalette(color, $el);" x-bind:style="`background-color: ${color}`">
                            <div class="hs-contrast-box" x-text="$store.colors.contrastWhite(color)"></div>
                            <div class="hs-color-value" x-text="color"></div>
                        </div>
                    </template>
                </div>
            </div>

        </template>
    </section>
</div>