<?php
if (!defined('ABSPATH')) exit;
?>
<div class="hs-modal" x-data="modal(false)">
    <button x-ref="button" class="hs-button hs-subnav-button" @click="toggle(); $store.project.addNewSchema();" x-on:keydown.escape.prevent.stop="close()">
        <svg class="hs-icon hs-icon-large">
            <use href="#ii-plus"></use>
        </svg>
        <span>Token</span>
    </button>

    <div id="schema-edit-modal" class="hs-modal__wrapper" x-show="modalOpen" x-transition:enter>
        <div class="hs-modal__backdrop" @click="toggle()"></div>
        <div class="hs-modal__modal" x-ref="modal">

            <div class="hs-modal__footer">
                <button @click="close()" class="hs_modal-button__cancel">Cancel</button>
                <button x-show="!$store.project.schemaEdit" @click="$store.project.onNewSchemaConfirm();toggle()" class="hs_modal-button__confirm">Add</button>
            </div>
        </div>

    </div>

</div>