<?php
if (!defined('ABSPATH')) exit;
?>
<div class="hs-modal" x-data="modal(false)">
    <button x-ref="button" class="hs-button hs-subnav-button" @click="toggle()" x-on:keydown.escape.prevent.stop="close($refs.button)">
        <svg class="hs-icon hs-icon-large">
            <use href="#ii-library"></use>
        </svg>
        <span>Browse</span>
    </button>

    <div id="browse-palette" class="hs-modal__wrapper" x-show="modalOpen" x-transition>
        <div class="hs-modal__backdrop" @click="toggle()"></div>
        <div class="all-schemas hs-modal__modal" x-data="$store.radix.colors">

            <div class="hs-modal__header">
               <h3> Browse color catalog</h3>
            </div>
            <div class="hs-modal__content">
                <div style="display:flex; flex-direction: column; gap:.5rem">
                <template x-for="(colorGroup,index) in $store.radix.colors" :key="index">
                    <div style="display: flex;align-items: center; gap: .75rem">
                        <div style="display: flex;flex-basis: 100px">
                            <span x-text="colorGroup.name"></span>
                        </div>
                        <div x-show="$store.appView.theme == 'light'">
                            <div style="display: flex; gap: .25rem;">
                                <template x-for="(color) in colorGroup.light">
                                    <div x-bind:style="`background-color: ${color.value};height: 40px; min-width:40px; border-radius:.25rem;`">
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div x-show="$store.appView.theme == 'dark'">
                            <div style="display: flex; gap: .25rem;">
                                <template x-for="(color) in colorGroup.dark">
                                    <div x-bind:style="`background-color: ${color.value};height: 40px; min-width:40px; border-radius:.25rem;`">
                                    </div>
                                </template>
                            </div>
                        </div>
                        <button @click="$store.project.addFromCatalog(index)" class="hs-button">Add</button>
                    </div>
                </template>
                </div>
            </div>
            <div class="hs-modal__footer">
                <button @click="toggle()" class="hs_modal-button__cancel">Cancel</button>
            </div>
        </div>


    </div>
</div>
