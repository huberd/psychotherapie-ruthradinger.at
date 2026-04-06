<?php
if (!defined('ABSPATH')) exit;
?>
<div class="hs-modal" x-data="modal(false)">
    <button x-ref="button" class="hs-button hs-subnav-button" @click="toggle(); $store.project.addNewSchema();" x-on:keydown.escape.prevent.stop="close()">
        <svg class="hs-icon hs-icon-large">
            <use href="#ii-plus"></use>
        </svg>
        <span>Create</span>
    </button>

    <div id="schema-edit-modal" class="hs-modal__wrapper" x-show="modalOpen || $store.project.schemaEdit" x-transition:enter>
        <div class="hs-modal__backdrop" @click="toggle()"></div>
        <div class="hs-modal__modal" x-ref="modal">
            <div class="hs-modal__header">
                <div style="display: flex; gap: .25rem; align-items: center;">
                    <div style="display: flex; gap: .25rem; align-items: center;" x-bind:class="{ 'hs-disable': $store.project.schemaMode == 'editing' && $store.project.editingSchemaData.system.toString() == 'true' }">
                        <label for="sc-create">Name</label>
                        <div class="hs-input">
                            <input id="sc-create" name="sc-create" type="text" x-model="$store.project.newSchemaName" @change="$store.project.newSchemaName = $store.project.newSchemaName.trim().replaceAll(' ', '-')">
                        </div>
                    </div>
                    <div class="hs-vspacer"></div>
                    <?php \Headspin\Components\themeSwitcher(); ?>
                </div>
                <div class="hs-error-container" x-show="$store.project.invalidColorSchemaInput">
                    <span x-text="$store.project.invalidMSG"></span>
                </div>
            </div>
            <div class="hs-tab-switch" x-show="$store.project.schemaToEdit != 'neutrals'">
                <button class="hs-button-tab" x-bind:class="{ 'active': $store.project.schemaEditorTab == 'radix' }" @click="$store.project.schemaEditorTab = 'radix'">Radix</button>
                <button class="hs-button-tab" x-bind:class="{ 'active': $store.project.schemaEditorTab == 'custom' }" @click="$store.project.schemaEditorTab = 'custom'">Custom</button>
            </div>
            <div class="hs-modal__content" x-bind:data-modaltab="$store.project.schemaEditorTab">
                <div class="hs-colorpicker" id="schema-cp">

                    <div style="display: flex; gap:1rem; flex-direction:column;">
                        <div x-show="$store.project.schemaEditorTab == 'radix' " style="opacity: .5; pointer-events: none">
                            <div class="new-schema-options">
                                <label for="sc-hex">HEX</label>
                                <div class="hs-input">
                                    <input style="max-width:300px" id="sc-hex" name="sc-hex" type="text" oninput="Alpine.store('project').setSchemaColor(this.value)">
                                </div>
                            </div>

                        </div>
                        <div x-show="$store.project.schemaEditorTab == 'custom' ">
                           
                            <div class="new-schema-options">
                                <label for="sc-hex2">HEX (Radix)</label>
                                <div class="hs-input">
                                    <input style="max-width:300px" id="sc-hex2" name="sc-hex2" type="text" onchange="Alpine.store('project').setCustomColorRadix(this.value)">
                                </div>
                            </div>
                            
                        </div>
                        <div style="position: relative;display: flex;justify-content: center;">
                            <div x-show="$store.project.customColorErrors.length > 0 && $store.project.schemaEditorTab == 'custom'" style="overflow: auto; position: absolute; top: -25px; left: 0; width: 50%; height: 100%; margin-top: .5rem; z-index: 5;
  background: var(--neutral-1);
  padding: 1.25rem;">
                                <template x-for="item in $store.project.customColorErrors">
                                    <div style="border: 1px solid var(--brand-7); background-color: var(--brand-2); padding: .5rem; border-radius: .25rem; margin-bottom: .5rem;">
                                                <div style="font-weight: bold; text-transform: capitalize;" x-text="item.type"></div>
                                                <div x-text="item.message"></div>
                                            </div>
                                        </template>
                                    </div>
                            <div class="schema-presets">
                                <div class="sc-preset">
                                  
                                    <div x-show="!($store.project.schemaToEdit == 'neutrals' && $store.project.schemaMode == 'editing')">
                                        <p style="font-weight: bold;text-align: left;">Select Radix color
                                        <p>
                                        <div class="schema-buttons-container">
                                            <template x-for="item in $store.project.schemaPresets[0].data">
                                                <button class="schema-button" @click="$store.project.setSchemaFromPreset(item.value, item.name)" x-bind:style="`background-color:${item.value};`" x-bind:data-tippy-content="item.name"></button>
                                            </template>
                                        </div>
                                    </div>
                                    <div x-show="$store.project.schemaToEdit == 'neutrals' && $store.project.schemaMode == 'editing'">
                                        <p style="font-weight: bold;text-align: left;">Select Radix color
                                        <p>
                                        <div class="schema-buttons-container schema-neutral">
                                            <template x-for="item in $store.project.schemaPresets[1].data">
                                                <button class="schema-button" @click="$store.project.setSchemaFromPreset(item.value, item.name)" x-bind:style="`background-color:${item.value};position: relative; border-radius: .15rem;`" x-bind:data-tippy-content="item.name">
                                                    <div x-bind:style="`background-color:${item.base};position: absolute; right: 0; top:0; width: 8px; height: 100%`"></div>
                                                </button>
                                            </template>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div id="newSchemaCP" style="margin: auto;"></div>
                        </div>

                    </div>

                    <div class="schema-editor-preview" style="border-top: var(--hs-border); padding-top: 1rem; margin-top:1rem">
                        <div style="text-align: left;font-weight: bold;font-size: 14px;margin-bottom: .5rem;">Light Theme</div>
                        <div class="schema-light-preview schema-preview-editor" style="display: flex;width: 100%;">
                            <template x-for=" (schema, sk) in $store.project.previewLight" :key="sk">
                                <div>
                                    <div x-text="schema.label"></div>
                                    <div x-bind:style="`background-color:${schema.value};height: 40px; min-width: 24px; width: 100%`">
                                    </div>
                                </div>
                            </template>
                        </div>
                        <div style="text-align: left;font-weight: bold;font-size: 14px;margin-bottom: .5rem; margin-top: 1.5rem">Dark Theme</div>
                        <div class="schema-light-preview schema-preview-editor" style="display: flex; width: 100%;">
                            <template x-for="(schema, sk) in $store.project.previewDark" :key="sk">
                                <div>
                                    <div x-text="schema.label"></div>
                                    <div x-bind:style="`background-color:${schema.value};height: 40px; min-width: 24px; width: 100%`">
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>

                </div>
            </div>
            <div class="hs-modal__footer">
                <button @click="$store.project.onNewSchemaCancel();close()" class="hs_modal-button__cancel">Cancel</button>
                <button x-show="!$store.project.schemaEdit" @click="$store.project.onNewSchemaConfirm();toggle()" class="hs_modal-button__confirm">Add</button>
                <button x-show="$store.project.schemaEdit" @click="$store.project.onSchemaUpdate();" class="hs_modal-button__confirm">Update</button>
            </div>
        </div>

    </div>

</div>