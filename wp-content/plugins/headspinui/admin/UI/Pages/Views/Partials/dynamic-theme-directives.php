<?php
if (!defined('ABSPATH')) exit;
?>
<section x-data="
    {
        editor:Alpine.store('project').dynamicThemeDirectivesEditor, 
        source:Alpine.store('pd').brandColorSchema['themeDirectivesPaths'],
        closeThemeDirectivesEditor(){this.editor.show = false;}, 
        init(){
            console.log(this.source);
           //this.editor = Alpine.store('project').dynamicThemeDirectivesEditor;
           window.addEventListener('openedynamictheming', this.updateView);
           if(Alpine.store('project').dynamicThemeDirectivesEditor.index < 0){
                this.source = Alpine.store('pd').brandColorSchema['themeDirectivesPaths']
            }
            else{
                this.source = Alpine.store('pd').colorSchemas[editor.index]['themeDirectivesPaths']
            }
        },
        
        updateView(){
            return false;
          
        }
    }"
    x-show="editor.show" class="edit-tokens-modal" style="backdrop-filter: unset;">
    <div @click="closeThemeDirectivesEditor();" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: -1;"></div>
    <div class="edit-tokens-modal-window" style="min-height: 50vh">
        <div class="edit-tokens-modal-window--header">
            <span>Theme Directive Attribute Path</span>
            <button class="red-close-dot" @click="closeThemeDirectivesEditor()"><span></span></button>
        </div>

        <div class="edit-tokens-modal-window--body " style="position: relative; height: 100%;flex:1;">
            <div x-show="! Alpine.store('project').dynamicThemeDirectivesEditor.source ||  Alpine.store('project').dynamicThemeDirectivesEditor.source.length == 0" class="hs-info">
                <div>You don't have any overrides create yet. Click Add New to start!</div>
            </div>
            <template x-for="( group, ix ) in  Alpine.store('project').dynamicThemeDirectivesEditor.source">
                <div class="dynamic-paths-group line-counter" 
                @click="Alpine.store('project').dynamicThemeDirectivesEditor.validator()"
                x-bind:data-path-validation="Alpine.store('project').dynamicThemeDirectivesEditor.errorAtts(ix)">
                    <div class="dynamic-path-item-header">
                        <div style="display:flex;align-items:center; gap:.5rem;">
                            <svg class="hs-icon hs-icon-large">
                                <use xlink:href="#ii-target-1"></use>
                            </svg>
                            <div>Target:</div>
                        </div>
                        <?php \Headspin\Components\select_v1('group.target', '$store.project.getColorSchemaNames()'); ?>
                        <div x-bind:data-tippy-content="Alpine.store('project').dynamicThemeDirectivesEditor.generateValidation(ix)" >
                            <svg class="hs-icon hs-icon-large hs-error-icon">
                                <use xlink:href="#ii-error"></use>
                            </svg>
                        </div>
                        <button data-tippy-content="Delete Group" @click="Alpine.store('project').dynamicThemeDirectivesEditor.deleteGroup(ix)">X</button>
                    </div>
                    <div class="dynamic-path-item-body">
                        <div class="dynamic-path-item">
                            <span class="hs-attribute-name" x-text="'data-hsx-' + group.target"></span>
                            <span class="hs-attribute-name" x-text="Alpine.store('project').dynamicThemeDirectivesEditor.palette.name"></span>
                        </div>
                        <template x-for=" ( item, ix ) in  group.paths" :key="ix">
                            <div class="dynamic-path-item">
                                <div>
                                    <button x-text="'data-hsx-' + group.target" x-show="item.type == 'data-hsx'" @click="item.type = 'custom';"></button>
                                    <button x-show="item.type == 'custom'" @click="item.type = 'data-hsx'">custom</button>
                                </div>
                                <div class="hs-input"> <input type="text" x-model="item.value" data-change="editor.onChange(item, index)"> </div>
                                <button data-tippy-content="Delete Selector" @click="Alpine.store('project').dynamicThemeDirectivesEditor.deleteItem(group.paths, ix)">X</button>
                            </div>
                        </template>

                        <div class="hs-add-new-token--wrapper-">
                            <button class="hs-add-new-token button-full" @click="Alpine.store('project').dynamicThemeDirectivesEditor.addItem(group.paths)">Add New Selector</button>
                        </div>
                    </div>
                </div>
            </template>


            <div class="hs-add-new-token--wrapper-">
                <button class="hs-add-new-token button-full" x-bind:class="{ 'button-huge': (!source || source.length == 0) }"@click="Alpine.store('project').dynamicThemeDirectivesEditor.addGroup()">Add New Group</button>
            </div>
        </div>


    </div>
</section>