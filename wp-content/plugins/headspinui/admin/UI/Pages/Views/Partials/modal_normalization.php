<?php
if (!defined('ABSPATH')) exit;
?>
<div class="hs-modal" x-data="modal(false)" >
    <button x-ref="button" class="hs-button hs-subnav-button" @click="toggle();" x-on:keydown.escape.prevent.stop="close()">
        <svg class="hs-icon hs-icon-large">
            <use href="#ii-chart-analysis"></use>
        </svg>
        <span>Normalization</span>
    </button>

    <div id="schema-edit-modal" class="hs-modal__wrapper" x-show="modalOpen" x-transition:enter>
        <div class="hs-modal__backdrop" @click="toggle()"></div>
        <div class="hs-modal__modal" x-ref="modal" style="width: 90vh;max-width: 1300px;  color: var(--neutral-12);" :data-theme="$store.pd.colorNormalization.mode">
            <div class="hs-modal__header">
                <div style="display: flex; gap: .25rem; align-items: center;">
                    <h2> Color Normalization</h2>
                    <div class="token-group-button" style="margin-left: auto;">
                        <button class="hs-button-gtoken" @click="$store.pd.colorNormalization.mode = 'light'" x-bind:class="{'active': $store.pd.colorNormalization.mode == 'light'}">Light</button>
                        <button class="hs-button-gtoken" @click="$store.pd.colorNormalization.mode = 'dark'" x-bind:class="{'active':$store.pd.colorNormalization.mode == 'dark'}">dark</button>
                    </div>

                    




                </div>
            </div>

            <div class="hs-modal__content" style="min-height: 30vh;">

                <div class="luminance-normalization-section" x-show="$store.pd.colorNormalization.mode == 'light'">
                    <h3>Light mode normalization</h3>
                    <div class="token-group-button">
                        <button class="hs-button-gtoken" @click="$store.pd.colorNormalization.light = 'disabled'; $store.project.regenratePaletteOutput()" x-bind:class="{'active': $store.pd.colorNormalization.light == 'disabled'}">Disabled</button>
                        <button class="hs-button-gtoken" @click="$store.pd.colorNormalization.light = 'luminance'; $store.project.regenratePaletteOutput()" x-bind:class="{'active':$store.pd.colorNormalization.light == 'luminance'}">Luminance</button>
                        <button class="hs-button-gtoken" @click="$store.pd.colorNormalization.light = 'oklch_lightness'; $store.project.regenratePaletteOutput()" x-bind:class="{'active':$store.pd.colorNormalization.light == 'oklch_lightness'}">Perceptual Lightness</button>
                    </div>
                    <div id="line-height" class="hs-input-row"  x-show=" $store.pd.colorNormalization.light == 'luminance' ">
                        <label for="color-step-normalization-uswds-snap">Snap to USWDS point intervals:</label>
                        <input name="color-step-normalization-uswds-snap" style="font-size:19px" class="hs-switch-input" type="checkbox" x-model="$store.pd.luminance_normalization.uswds_grades_normalization">
                    </div>
                    <div class="hs-info" x-show=" $store.pd.colorNormalization.light == 'disabled' ">
                        Please enable luminance or perceptual lightness to normalize light mode palettes
                    </div>
                    <div x-show=" $store.pd.colorNormalization.light == 'luminance' ">
                        <?php \Headspin\Components\luminance_normalization('light'); ?>
                    </div>
                    <div x-show=" $store.pd.colorNormalization.light == 'oklch_lightness' ">
                        <?php \Headspin\Components\lightness_normalization('light'); ?>
                    </div>
                </div>
                <div class="luminance-normalization-section" x-show="$store.pd.colorNormalization.mode == 'dark'">
                    <h3>Light mode normalization</h3>
                    <div class="token-group-button">
                        <button class="hs-button-gtoken" @click="$store.pd.colorNormalization.dark = 'disabled'; $store.project.regenratePaletteOutput()" x-bind:class="{'active': $store.pd.colorNormalization.dark == 'disabled'}">Disabled</button>
                        <button class="hs-button-gtoken" @click="$store.pd.colorNormalization.dark = 'luminance'; $store.project.regenratePaletteOutput()" x-bind:class="{'active':$store.pd.colorNormalization.dark == 'luminance'}">Luminance</button>
                        <button class="hs-button-gtoken" @click="$store.pd.colorNormalization.dark = 'oklch_lightness'; $store.project.regenratePaletteOutput()" x-bind:class="{'active':$store.pd.colorNormalization.dark == 'oklch_lightness'}">Perceptual Lightness</button>
                    </div>
                    <div  class="hs-input-row">
                        <label for="color-step-normalization-uswds-snap">Snap to USWDS point intervals:</label>
                        <input name="color-step-normalization-uswds-snap" style="font-size:19px" class="hs-switch-input" type="checkbox" x-model="$store.pd.luminance_normalization.uswds_grades_normalization">
                    </div>
                    <div x-show=" $store.pd.colorNormalization.dark == 'disabled' ">
                        Please enable luminance or perceptual lightness to normalize light mode palettes
                    </div>
                    <div x-show=" $store.pd.colorNormalization.dark == 'luminance' ">
                        <?php \Headspin\Components\luminance_normalization('dark'); ?>
                    </div>
                    <div x-show=" $store.pd.colorNormalization.dark == 'oklch_lightness' ">
                        <?php \Headspin\Components\lightness_normalization('dark'); ?>
                    </div>
                </div>

            </div>

        </div>

    </div>

</div>

<style>
       .luminance-normalization-section {
        display: flex;
        flex-direction: column;
        gap: .66rem;
    }
    .luminance-normalization-group {
        display: flex;
        flex-direction: row;
    }

    .preview-color {
        height: 40px;
        min-width: 40px;
        border-radius: .25rem;
        border: 1px solid var(--neutral-6);
        color: white;
        text-shadow: 1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black, 1px 0px 0px black, -1px 0px 0px black, 0px 1px 0px black, 0px -1px 0px black;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .slider-controls {
        position: relative;
        z-index: 1;
        border: 1px solid var(--neutral-7);
        border-radius: .33rem;
        overflow: hidden;
    }

    .slider-controls:focus-within {
        border-color: var(--brand-11)
    }

    .slider-controls:after {
        display: block;
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: var(--hs-elevation-2);
        z-index: 0;
        height: var(--_lumVal);
        height: var(--_lumVal);
        box-sizing: border-box;
        border-top: 2px solid var(--brand-11);
    }

    .slider-controls>* {
        position: relative;
        z-index: 11;
    }

    .lumMax.lumMax,
    .lumMin.lumMin {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 0;
        border-top: 2px dotted var(--neutral-11)
    }

    .lumMax {
        height: var(--_lumMax);
    }

    .lumMin {
        height: var(--_lumMin);
    }

    .luminance-slider-container {
        padding: 1rem;
        background: var(--neutral-3);
        border-radius: 8px;
        margin-bottom: 1rem;
        min-width: 5rem;
    }

    .slider-header {
        text-align: center;
        margin-bottom: 0.5rem;
        display: flex;
        flex-direction: column;
    }

    .slider-controls {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        height: 200px;
    }

    .luminance-slider {
        accent-color: var(--brand-9);
        background: var(--neutral-5);
        border-radius: 4px;
        outline: none;
        appearance: none;
        height: 100%;
        width: 100%;
        opacity: 0;
    }



    .slider-footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: #666;
    }

    .value-button {
        width: 24px;
        height: 24px;
        padding: 0;
        font-size: 1rem;
        background: #2271b1;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .value-button:hover {
        background: #135e96;
    }

    .value-button:active {
        background: #0a4b78;
    }

    .reset-button {
        padding: 2px 8px;
        font-size: 0.75rem;
        background: #2271b1;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .reset-button:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
</style>