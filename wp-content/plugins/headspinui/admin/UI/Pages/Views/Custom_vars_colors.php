<div data-wrapper__aside-main  id="tokenAPP" @reloadtokenapp.window="load = false; xCollections = []; setTimeout(() => { load = true;xCollections = $store.pd.themeTokens.folders}, 0)" 
    x-data="{ load: false, xCollections: $store.pd.themeTokens.folders, tokenTools: false, editCollection: false, editGroup: false, editVariable: false, tokenPlainPicker: false, tokenColorPickerLight: false, themePick: 'light',tokenColorPickerDark: false, c: 0, g: 0, v: 0, tokenToEdit: {}, itemVar: {}, itemGroup: {}, itemCollection: {}, tokenColorPicked: {}  }">
    <div class="tree-view relative">
   
        <div class="hs-token-tree" data-sidebar x-data="{ handleColorGroupsSort: (item, position) => { Alpine.store('project').sortingSidebarVirtualCollection(xCollections);  } }">
            <button class="hs-add-collection-button" @click="$store.project.tokens__AddCollection()">
                <svg class="hs-icon hs-icon-large">
                    <use href="#ii-plus"></use>
                </svg>
                <span>Add New Collection</span>
            </button>
           
            <div x-sort="handleColorGroupsSort" x-sort:group="color-collection">
                <template x-for="(collectionx, iy) in xCollections" :key="collectionx.id">
                    <div class="hs-collection" x-bind:data-active="collectionx.active" x-sort:item="collectionx.id" x-bind:data-tree-collection-index="iy">
                        <section>
                            <div class="hs-folder-button" @click="$store.project.activateFolder(iy)">
                                <svg class="hs-icon hs-icon-large">
                                    <use x-bind:href="'#' + collectionx.icon"></use>
                                </svg>
                                <span x-text="collectionx.name"></span>    
                            </button>
                            <button x-show="!collectionx.system" class="hs-ghost-button hs-collection-edit" data-tippy-content="Edit Collection" @click="editCollection = true; itemCollection = collectionx; c = iy;">
                                    <svg class="hs-icon hs-icon-large">
                                        <use href="#ii-edit"></use>
                                    </svg>
                            </button>
                        </section>
                        <section class="hs-collection--groups" x-data="{ handleColorGroupsSort: (item, position) => { Alpine.store('project').sortingSidebarVirtualGroup(xCollections);  } }">
                            <div data-color-var x-sort="handleColorGroupsSort" x-sort:group="color-groups">
                                <template x-for="(folderx, indx) in collectionx.groups" :key="folderx.id">
                                    <div x-bind:data-v--group="iy + '-' + indx" @click="$store.project.activateFolder(iy); $store.project.scrollToGroup(folderx.id)">
                                        <div class="color-group">
                                            <span x-sort:item="folderx.id" class="hs-collection--group" x-text="folderx.name"></span>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </section>
                    </div>
                </template>
            </div>
        </div>

    </div>




    <div class="tree-view-canvas relative">
        <div class="hs-absolute-wrapper">
            <div data-main>
                <div class="hs-collection-status-bar" x-show="xCollections.length > 0">
                  <div class="hs-collection-status-bar-inner">
                    <div class="hs-collection-breadcrumb">
                            <svg class="hs-icon hs-icon-large">
                                <use x-bind:href="'#' + $store.project.returnActiveCollection('icon')"></use>
                            </svg>
                            <span class="hs-collection-breadcrumb-title" x-text="$store.project.returnActiveCollection('name')"></span>
                        </div>
                        <button class="hs-add-collection-button" @click="tokenTools = true">
                            <svg class="hs-icon hs-icon-large">
                                <use href="#ii-library"></use>
                            </svg>
                            <span>Boilerplates</span>
                        </button>
                        <button class="hs-add-collection-button" @click="$store.project.tokens__AddGroup()" x-show="$store.project.returnActiveCollection('system')">
                            <svg class="hs-icon hs-icon-large">
                                <use href="#ii-plus"></use>
                            </svg>
                            <span>Add New Group</span>
                        </button>
                  </div>
                </div>




                <template x-for="(collection, ix) in xCollections" :key="collection.id">
                    <div class="hs-var-collection" x-show="collection.active" x-bind:data-collectionactive="collection.active">

                        <section style="padding-top: 2rem; color: var(--neutral-11);">
                            <template x-for="(folder, ind) in collection.groups" :key="folder.id">
                                <div class="collection-token--group" x-bind:data-colorgroup="folder.id" x-bind:class="{ 'hs-private-folder': !folder.public }">
                                    <div class="color-group token-group">
                                        <svg class="hs-icon hs-icon-large hs-state-lock-icon">
                                            <use x-bind:href="'#' + folder.icon"></use>
                                        </svg>
                                        <input class="collection-group-name" type="text" x-model="folder.name">
                                        <div class="pull-right hover-show-group-controls flex-row" x-show="!folder.system" style="display: flex; align-items: center; gap: .35rem">
                                            <button class="hs-ghost-button hs-group-control" x-show="folder.public" @click="folder.public = !folder.public; $dispatch('reloadtokenapp')">
                                                <svg class="hs-icon hs-icon-large">
                                                    <use href="#ii-lock"></use>
                                                </svg>
                                            </button>
                                            <button class="hs-ghost-button hs-group-control" x-show="!folder.public" @click="folder.public = !folder.public;$dispatch('reloadtokenapp')">
                                                <svg class="hs-icon hs-icon-large">
                                                    <use href="#ii-unlock"></use>
                                                </svg>
                                            </button>
                                            <button class="hs-ghost-button" data-tippy-content="Edit Group" @click="editGroup = true; itemGroup = folder">
                                                <svg class="hs-icon hs-icon-large">
                                                    <use href="#ii-edit"></use>
                                                </svg>
                                            </button>
                                            <button class="hs-ghost-button" data-tippy-content="Delete Group" @click="$store.project.tokens__DeleteGroup(ix, ind)">
                                                <svg class="hs-icon hs-icon-large">
                                                    <use href="#ii-delete"></use>
                                                </svg>
                                            </button>
                                        </div>
                                      
                                    </div>
                                    <div class="group-guide" @click="$store.project.tokens__switchView()">
                                        <div class="group-guide-cell">
                                           
                                            <span x-show="$store.pd.themeTokens.tokenView == 'label'">Label</span>
                                            <span x-show="$store.pd.themeTokens.tokenView == 'cssVar'">Variable</span>
                                            <div>
                                                <svg class="hs-icon hs-icon-large" style="height: 12px; max-width:14px; margin-left:.75rem">
                                                    <use href="#ii-sync"></use>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="group-guide-cell">
                                            <span>Value</span>
                                        </div>
                                    </div>
                                    <div class="hs-vars-folder-sort-node" x-data="{ handle: (item, position) => { Alpine.store('project').sortingColorTokensCallback(ix);  } }">
                                        <div class="hs-vars-folder"  x-sort="handle" x-bind:x-sort:group="folder.public" x-sort:config="{ filter: '.dnd-ignore-elements'}">

                                            <template x-for="(colorVar, index) in folder.data" :key="colorVar.id">
                                                <section class="hs-token-wrapper" x-bind:class="{ 'token--is-linked': colorVar.linked, 'token--is-system': colorVar.system }" x-sort:item="colorVar.id" x-bind:data-colorkey="ind + '-' +  index">
                                                    <div x-show="colorVar.method == 'colorTable'" class="hs-color-variable">
                                                        <div class="hs-varname hs-varcell hover-reveal-trigger" style="display: flex;" x-sort:handle>
                                                            <span style="display: flex" data-dnd-handle  @click="editVariable = true; itemVar = colorVar; itemGroup = folder">
                                                                <svg class="hs-icon hs-icon-large loading-icon">
                                                                    <use href="#ii-palette"></use>
                                                                </svg>
                                                            </span>
                                                            <button class="hover-reveal varclipboard" data-dnd-handle  @click="$store.project.tokens__copyToken(colorVar.cssVar)">
                                                                <svg class="hs-icon hs-icon-large loading-icon" style="max-height: 14px;width: 14px;">
                                                                    <use href="#ii-clipboard"></use>
                                                                </svg>
                                                            </button>
                                                            <input type="text" x-show="$store.pd.themeTokens.tokenView == 'label'" x-model="colorVar.label">
                                                            <input type="text" x-show="$store.pd.themeTokens.tokenView == 'cssVar'" x-model="colorVar.cssVar"  x-on:input.debounce="$store.project.token_validate_css_var(folder, colorVar )">
                                                        </div>
                                                        <div class="color-table-dark-light">
                                                            <div class="hs-theme-light hs-varcell" data-tippy-content="Light Theme Value" x-bind:class="{ 'opaque-input': $store.project.colorContainsToken(colorVar.light) }" >
                                                                <div class="token-color-indicator" @click="tokenColorPickerLight = true; tokenColorPicked = colorVar; themePick = 'light'">
                                                                    <button class="token-color-button" x-bind:style="`background-color: ${$store.project.previewColor('light', colorVar.light)}`"></button>
                                                                </div>
                                                                <input type="text" @change="headspinPresave()" x-model="colorVar.light">
                                                                <div class="hs-varcolor-token" x-show="$store.project.colorContainsToken(colorVar.light)" >
                                                                    <div class="hs-varcolor-token-content" @click="tokenColorPickerLight = true; tokenColorPicked = colorVar; themePick = 'light'">
                                                                        <span x-text="$store.project.colorTokenFormat(colorVar.light)"></span>
                                                                    </div>
                                                                    <button class="hs-hover-delete-color" @click="$store.project.colorTokenDeleteValueLight(colorVar)">
                                                                        <svg class="hs-icon hs-icon-large">
                                                                            <use href="#ii-deletex"></use>
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div class="hs-theme-dark hs-varcell" data-tippy-content="Dark Theme Value" x-bind:class="{ 'opaque-input': $store.project.colorContainsToken(colorVar.dark) }">
                                                                <div class="token-color-indicator" @click="tokenColorPickerLight = true; tokenColorPicked = colorVar; themePick = 'dark'">
                                                                <button class="token-color-button" x-bind:style="`background-color: ${$store.project.previewColor('dark', colorVar.dark)}`"></button>
                                                                </div>
                                                                <input type="text" @change="headspinPresave()" x-model="colorVar.dark">
                                                                <div class="hs-varcolor-token" x-show="$store.project.colorContainsToken(colorVar.dark)">
                                                                    <div class="hs-varcolor-token-content">
                                                                        <span x-text="$store.project.colorTokenFormat(colorVar.dark)"></span>
                                                                    </div>
                                                                    <button class="hs-hover-delete-color" @click="$store.project.colorTokenDeleteValueDark(colorVar)">
                                                                        <svg class="hs-icon hs-icon-large">
                                                                            <use href="#ii-deletex"></use>
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div x-show="colorVar.method == 'plainText'" class="hs-color-variable">
                                                        <div class="hs-varname hs-varcell hover-reveal-trigger" style="display: flex;" x-sort:handle>
                                                            <span style="display: flex" data-dnd-handle @click="editVariable = true; itemVar = colorVar; itemGroup = folder">
                                                                <svg class="hs-icon hs-icon-large loading-icon">
                                                                    <use href="#ii-plain"></use>
                                                                </svg>
                                                            </span>
                                                            <button class="hover-reveal varclipboard" data-dnd-handle  @click="$store.project.tokens__copyToken(colorVar.cssVar)">
                                                                <svg class="hs-icon hs-icon-large loading-icon" style="max-height: 14px;width: 14px;">
                                                                    <use href="#ii-clipboard"></use>
                                                                </svg>
                                                            </button>
                                                            <input type="text" x-show="$store.pd.themeTokens.tokenView == 'label'" x-model="colorVar.label">
                                                            <input type="text" x-show="$store.pd.themeTokens.tokenView == 'cssVar'" x-model="colorVar.cssVar"  x-on:input.debounce="$store.project.token_validate_css_var(folder, colorVar )">
                                                        </div>
                                                        <div class="hs-varcell hs-varcell-two" x-on:contextmenu="$event.preventDefault();tokenPlainPicker = true; tokenToEdit = colorVar" x-bind:class="{ 'opaque-input':$store.project.plainContainsToken(colorVar.plainText)}">
                                                            <input type="text" x-model="colorVar.plainText">
                                                            <div class="hs-varcolor-token plainText" x-show="$store.project.plainContainsToken(colorVar.plainText)">
                                                                <div class="hs-varcolor-token-content" @click="tokenPlainPicker = true; tokenToEdit = colorVar">
                                                                    <span x-text="$store.project.plainTokenFormat(colorVar.plainText)"></span>
                                                                </div>
                                                                <button class="hs-hover-delete-color" @click="$store.project.tokenDeleteValuePlain(colorVar)">
                                                                    <svg class="hs-icon hs-icon-large">
                                                                        <use href="#ii-deletex"></use>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div x-show="colorVar.method == 'fluid2'" class="hs-color-variable">
                                                        <div class="hs-varname hs-varcell hover-reveal-trigger" style="display: flex;" x-sort:handle>
                                                            <span style="display: flex" data-dnd-handle @click="editVariable = true; itemVar = colorVar; itemGroup = folder; headspinRegenerate();">
                                                                <svg class="hs-icon hs-icon-large loading-icon">
                                                                    <use href="#ii-fluid2"></use>
                                                                </svg>
                                                            </span>
                                                            <button class="hover-reveal varclipboard" data-dnd-handle  @click="$store.project.tokens__copyToken(colorVar.cssVar)">
                                                                <svg class="hs-icon hs-icon-large loading-icon" style="max-height: 14px;width: 14px;">
                                                                    <use href="#ii-clipboard"></use>
                                                                </svg>
                                                            </button>
                                                            <input type="text" x-show="$store.pd.themeTokens.tokenView == 'label'" x-model="colorVar.label">
                                                            <input type="text" x-show="$store.pd.themeTokens.tokenView == 'cssVar'" x-model="colorVar.cssVar" x-on:input.debounce="$store.project.token_validate_css_var(folder, colorVar )">
                                                            
                                                        
                                                        </div>
                                                        <div class="hs-varcell hs-varcell--fluid">
                                                            <div class="hs-varcell--fluid__area">
                                                                min
                                                            </div>
                                                            <div>
                                                                <input type="text" x-model="colorVar.fluidMin">
                                                            </div>
                                                            <div class="hs-varcell--fluid__unit">
                                                                <div>PX</div>
                                                            </div>
                                                        </div>
                                                        <div class="hs-varcell hs-varcell--fluid">
                                                            <div class="hs-varcell--fluid__area">
                                                                max
                                                            </div>
                                                            <div>
                                                                <input type="text" x-model="colorVar.fluidMax">
                                                            </div>
                                                            <div class="hs-varcell--fluid__unit">
                                                                <div>PX</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="token-control">
                                                        <button class="hs-edit-token-button" data-tippy-content="Edit token" @click="editVariable = true; itemVar = colorVar; itemGroup = folder" @click="$store.project.tokens__EditToken(folder, index)">
                                                            <svg class="hs-icon hs-icon-large">
                                                                <use href="#ii-edit"></use>
                                                            </svg>
                                                        </button>
                                                        <button class="hs-delete-token-button" data-tippy-content="Delete token" @click="$store.project.tokens__DeleteToken(folder, index)">
                                                            <svg class="hs-icon hs-icon-large">
                                                                <use href="#ii-deletex"></use>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </section>
                                            </template>
                                        </div>
                                        <div class="hs-add-new-token--wrapper">
                                            <button class="hs-add-new-token" @click="$store.project.tokens__AddToken(ix, ind);">Add new token</button>
                                        </div>
                                    </div>
                                </div>
                            </template>

                        </section>
                    </div>
                </template>






            </div>
        </div>
        <?php include_once('Partials/tokens/tokens-edit-token.php') ?>
        <?php include_once('Partials/tokens/tokens-edit-group.php') ?>
        <?php include_once('Partials/tokens/tokens-edit-collection.php') ?>
   


        <section x-show="tokenColorPickerLight" class="edit-tokens-modal" style="backdrop-filter: unset;">
            <div @click="tokenColorPickerLight = false;" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: -1;"></div>
            <div id="token-color-picker" class="edit-tokens-modal-window" style="min-width: 350px;"  @click.outside="tokenColorPickerLight = false;">
                <div id="token-color-picker-header" class="edit-tokens-modal-window--header" style="cursor: move;">
                    <span>Pick color</span>
                    <span x-text="' - ' + themePick + ' mode'"></span>
                    
                    <button class="red-close-dot" @click="tokenColorPickerLight = false;"><span></span></button>
                </div>
                <div class="edit-tokens-modal-window--body">
                    <section>
                        <div class="token-picker-palette-name">Brand</div>
                        <div class="token-picker-palette">
                            <template x-for="clr in $store.pd.brandColorSchema.data[themePick]">
                                <button class="token-color-button token-color-picker" x-bind:class="{'active': tokenColorPicked[themePick] == `var(--hcl-brand-${clr.step})`}" x-bind:data-tippy-content="clr.step" x-bind:style="`background-color: ${clr.value}`" @click="tokenColorPicked[themePick] = `var(--hcl-brand-${clr.step})`;tokenColorPickerLight = false;"></button>
                            </template>
                        </div>
                    </section>
                    <section>
                        <div class="token-picker-palette-name">Neutral</div>
                        <div class="token-picker-palette">
                            <template x-for="clr in $store.pd.neutralColorSchema.data[themePick]">
                                <button class="token-color-button token-color-picker" x-bind:class="{'active': tokenColorPicked[themePick] == `var(--hcl-neutral-${clr.step})`}" x-bind:style="`background-color: ${clr.value}`" @click="tokenColorPicked[themePick] = `var(--hcl-neutral-${clr.step})`;tokenColorPickerLight = false;"></button>
                            </template>
                        </div>
                    </section>
                    <section>
                        <template x-for="schema in $store.pd.colorSchemas">
                        <div>
                            <div class="token-picker-palette-name" x-text="schema.name"></div>
                            <div class="token-picker-palette">
                                <template x-for="clr in schema.data[themePick]">
                                    <button class="token-color-button token-color-picker"x-bind:class="{'active': tokenColorPicked[themePick] == `var(--hcl-${schema.name}-${clr.step})`}"  x-bind:style="`background-color: ${clr.value}`" @click="tokenColorPicked[themePick] = `var(--hcl-${schema.name}-${clr.step})`;tokenColorPickerLight = false;"></button>
                                </template>
                            </div>
                        </div>
                            
                        </template>
                    </section>
                </div>
                  
            </div>
        </section>

        <section x-show="tokenTools" class="edit-tokens-modal" style="backdrop-filter: unset;">
            <div @click="tokenTools = false;" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: -1;"></div>
            <div id="token-color-picker" class="edit-tokens-modal-window"   @click.outside="tokenTools = false;">
                <div id="token-color-picker-header" class="edit-tokens-modal-window--header" style="cursor: move;">
                    <span>Import token boilerplate</span>
                    
                    <button class="red-close-dot" @click="tokenTools = false;"><span></span></button>
                </div>
                <div class="edit-tokens-modal-window--body">
                    <section data-breakdance>
                        <template x-for="(catagory, ci) in $store.connect.boilerplates" :key="ci">
                        <div>
                            <div x-text="catagory.name" style="margin-bottom: .75rem;"></div>
                            <div style="display: flex; gap: .35rem; flex-wrap: wrap">
                                <template x-for="(boilerplate, bi) in catagory.data" :key="bi">
                                    <button x-text="boilerplate.name" @click="$store.connect.importBoilerplate(ci, bi)"></button>
                                </template>
                            </div>
                        </div>
                            
                        </template>
                    </section>
                </div>
            </div>
        </section>

        <section x-show="tokenPlainPicker" class="edit-tokens-modal" style="backdrop-filter: unset;">
            <div @click="tokenPlainPicker = false;" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: -1;"></div>
            <div id="token-plain-picker" class="edit-tokens-modal-window" style="min-width: 350px; max-width: 350px" @click.outside="tokenPlainPicker = false;">
                <div id="token-plain-picker-header" class="edit-tokens-modal-window--header" style="cursor: move;">
                    <span>Pick token</span>
                    <button class="red-close-dot" @click="tokenPlainPicker = false;"><span></span></button>
                </div>
                <div class="edit-tokens-modal-window--body">
                    <section data-breakdance>
                    <template x-for="cat in $store.project.getGroupedTokens()">
                    <div class="plain-token-group">
                        <div class="plain-token-category" x-text="cat.category"></div>
                        <div class="plain-token-items">
                            <template x-for="item in cat.items">
                                <button x-text="item.label" x-bind:data-active="tokenToEdit.plainText == `var(${item.var})`" @click="tokenToEdit.plainText = `var(${item.var})`;tokenPlainPicker = false;" style="text-transform: uppercase;"></button>
                            </template>
                        </div>
                    </div>
                        
                    </template>
                    </section>
                </div>
            </div>
        </section>





    </div>
</div>