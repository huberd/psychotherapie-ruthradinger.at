<?php
if (!defined('ABSPATH')) exit;
?>
<div style="display: flex" x-data="{
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
            }
        }" x-on:keydown.escape.prevent.stop="close($refs.button)" x-on:focusin.window="! $refs.panel.contains($event.target) && close()" x-id="['dropdown-button']">
    <button class="hs-add-theme" x-ref="button" x-on:click="toggle()" :aria-expanded="open" :aria-controls="$id('dropdown-button')" type="button">
        <svg class="hs-icon hs-icon-large">
            <use href="#ii-plus"></use>
        </svg>
    </button>
    <div x-ref="panel" x-show="open" x-transition.origin.top.left x-on:click.outside="close($refs.button)" :id="$id('dropdown-button')" style="display: none;" class="absolute hs-add-theme-options-dialog">
        <div style="font-size: var(--hs-text-big);margin-bottom: .65em;">Add token group:</div>
        <div>
        <div style="font-size: var(--hs-text-normal);margin-bottom: .65em;">Logical color group</div>
            <div class="hs-token-group-add-container">
                <button class="hs-button" @click="$store.theme.createGroup('colorGroup', 'primary')">Primary</button>
                <button class="hs-button" @click="$store.theme.createGroup('colorGroup', 'secondary')">Secondary</button>
                <button class="hs-button" @click="$store.theme.createGroup('colorGroup', 'tertiary')">Tertiary</button>
                <button class="hs-button" @click="$store.theme.createGroup('colorGroup', 'success')">Success</button>
                <button class="hs-button" @click="$store.theme.createGroup('colorGroup', 'info')">Info</button>
                <button class="hs-button" @click="$store.theme.createGroup('colorGroup', 'danger')">Danger</button>
            </div>
        </div>
        <div>
        <div style="font-size: var(--hs-text-normal);margin-bottom: .65em;">Background color group</div>
            <div class="hs-token-group-add-container">
                <button class="hs-button">Surface</button>
                <button class="hs-button">Elevation</button>
            </div>
        </div>
        <div>
        <div style="font-size: var(--hs-text-normal);margin-bottom: .65em;">Text color group</div>
            <div class="hs-token-group-add-container">
                <button class="hs-button">Text</button>
            </div>
        </div>
    </div>
</div>

