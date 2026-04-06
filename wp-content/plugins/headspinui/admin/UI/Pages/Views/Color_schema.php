<?php
if (!defined('ABSPATH')) exit;
?>
<div style="position: absolute; left:0; top:0; z-index:200; display:flex;">
   <div id="color-focus" class="hs-subnav-button" style="display: flex">
      <button class="hs-button hs-button-radio" data-tippy-content="List Color Preview" style="border-radius: 0px;" x-bind:class="{ 'active': $store.pd.colorView == 'column' }" @click="$store.pd.colorView = 'column'">
         <svg class="hs-icon hs-icon-large">
            <use href="#ii-list"></use>
         </svg>
      </button>
      <button class="hs-button hs-button-radio" data-tippy-content="Row Color Preview" style="border-radius: 0px;" x-bind:class="{ 'active': $store.pd.colorView == 'row' }" @click="$store.pd.colorView = 'row'">
         <svg class="hs-icon hs-icon-large">
            <use href="#ii-columns-3"></use>
         </svg>
      </button>
   </div>
   <div id="color-browse"><?php require_once 'Partials/modal_color_catalog.php'; ?></div>
   <div id="color-create"><?php require_once 'Partials/modal_schema-editor.php'; ?></div>
   <div x-show="$store.pd.enterpriseWorkflows" class="flex">
      <div id="color-analyze"><?php require_once 'Partials/modal_schema-analysis.php'; ?></div>
      <div id="color-normalize"><?php require_once 'Partials/modal_normalization.php'; ?></div>
   </div>

</div>
<section id="color-system-schemas">
   <h4>System Schemas</h4>
   <div class="all-schemas">
      <div x-data="{'open': false}" class="schema-single">
         <header style="display: flex; gap: .25rem; align-items: center;">
            <button class="hs-ghost-button" @click="open = !open">
               <svg x-show="!open" class="hs-icon hs-icon-large">
                  <use href="#ii-folder-closed"></use>
               </svg>
               <svg x-show="open" class="hs-icon hs-icon-large">
                  <use href="#ii-folder-open"></use>
               </svg>
            </button>
            <div class="hs-vspacer"></div>
            <button x-bind:style="`background-color: ${$store.pd.brandColorSchema.data.light[9].value};height: 24px; width: 24px; border-radius: .25rem; border: var(--hs-border)`"></button>
            <span class="schema-single-name">Brand</span>
            <div class="hs-vspacery pull-right"></div>
            <button class="hs-ghost-button relative" x-show="$store.project.access.type == 'pro'" data-tippy-content="Define dynamic schema paths" @click="$store.project.dynamicThemeDirectivesEditor.openSchema(-1); $dispatch('openedynamictheming')">
               <svg class="hs-icon hs-icon-large">
                  <use href="#ii-data"></use>
               </svg>
               <span class="inbox-count directives-count" x-show="$store.pd.brandColorSchema?.themeDirectivesPaths?.length > 0" x-text="$store.pd.brandColorSchema?.themeDirectivesPaths?.length" style="display: none;">0</span>
            </button>
            
            <div class="hs-vspacer"></div>
            <button id="color-edit-icon" class="hs-ghost-button" data-tippy-content="Edit color palette" data-tippy-picker @click="$store.colorWheel.tcpShow('brand', null)">
               <svg class="hs-icon hs-icon-large">
                  <use href="#ii-edit"></use>
               </svg>
            </button>

         </header>
         <div class="hs-scheme-drawer brand-system-color" x-show="open">
            <div class="colorview-row-panel" x-show="$store.pd.colorView == 'row' ">
               <div class="color-row-light">
                  <div style="display: flex; gap: .25rem;">
                     <template x-for="(color) in $store.pd.brandColorSchema.data.light">
                        <div class="color-step-container" @click="$store.project.copyColorToClipboard('brand', color.step)" x-bind:data-tippy-content="$store.project.colorLabel(color.step)">
                           <div class="color-step-label" x-bind:data-step="color.step" x-text="color.step" style="text-align: center;"></div>
                           <div class="color-step-color" x-bind:style="`background-color: ${ Alpine.store('project').colorPreview(color)};height: 40px; min-width:40px; border-radius:.25rem;`"></div>
                        </div>
                     </template>
                  </div>
               </div>
               <div class="color-row-dark">
                  <div style="display: flex; gap: .25rem;">
                     <template x-for="(color) in $store.pd.brandColorSchema.data.dark">
                        <div class="color-step-container" @click="$store.project.copyColorToClipboard('brand', color.step)" x-bind:data-tippy-content="$store.project.colorLabel(color.step)">
                           <div class="color-step-label" x-bind:data-step="color.step" x-text="color.step" style="text-align: center;"></div>
                           <div class="color-step-color" x-bind:style="`background-color: ${ Alpine.store('project').colorPreview(color)};height: 40px; min-width:40px; border-radius:.25rem;`"></div>
                        </div>
                     </template>
                  </div>
               </div>
            </div>

            <div class="colorview-row-panel" x-show="$store.pd.colorView == 'column' ">
               <div>
                  <div style="display: flex; flex-direction:column; gap: .25rem;">
                     <div class="color-grid-header">
                        <div>Step</div>
                        <div>Light</div>
                        <div>Dark</div>
                        <div>Use Case</div>
                     </div>
                     <template x-for="(color, colorIndex) in $store.pd.brandColorSchema.data.light">
                        <div class="color-step-container-column" @click="$store.project.copyColorToClipboard('brand', color.step)">
                           <div class="color-step-label" x-bind:data-step="color.step" x-text="color.step" style="text-align: center;"></div>
                           <div class="color-step-color" x-bind:style="`background-color: ${ Alpine.store('project').colorPreview(color)};height: 40px; min-width:40px; border-radius:.25rem;`"></div>
                           <div class="color-step-color" x-bind:style="`background-color: ${Alpine.store('project').colorPreview($store.pd.brandColorSchema.data.dark[colorIndex])};height: 40px; min-width:40px; border-radius:.25rem;`"></div>
                           <div x-text="$store.project.colorLabel(color.step)" xx-text="colorIndex"></div>
                        </div>
                     </template>
                  </div>
               </div>
            </div>

         </div>
      </div>
      <div x-data="{'open': false}" class="schema-single">
         <header style="display: flex; gap: .25rem; align-items: center;">
            <button class="hs-ghost-button" @click="open = !open">
               <svg x-show="!open" class="hs-icon hs-icon-large">
                  <use href="#ii-folder-closed"></use>
               </svg>
               <svg x-show="open" class="hs-icon hs-icon-large">
                  <use href="#ii-folder-open"></use>
               </svg>
            </button>
            <div class="hs-vspacer"></div>
            <button x-bind:style="`background-color: ${$store.pd.neutralColorSchema.data.light[9].value};height: 24px; width: 24px; border-radius: .25rem; border: var(--hs-border)`"></button>
            <span class="schema-single-name">Neutral</span>
            <div class="hs-vspacery pull-right"></div>

            <div class="hs-vspacer"></div>
            <button id="color-sync-icon" class="hs-ghost-button hs-button-sw" x-bind:class="{ 'active': $store.pd.neutralColorSchema.linked == true }" @click="$store.pd.neutralColorSchema.linked = !$store.pd.neutralColorSchema.linked" data-tippy-content="Automatic neutral color matching">
               <svg class="hs-icon hs-icon-large">
                  <use href="#ii-sync"></use>
               </svg>
            </button>
            <button class="hs-ghost-button" x-show=" !$store.pd.neutralColorSchema.linked" @click="$store.colorWheel.tcpShow('neutral', null)" data-tippy-picker data-tippy-content="Edit color palette">
               <svg class="hs-icon hs-icon-large">
                  <use href="#ii-edit"></use>
               </svg>
            </button>
         </header>
         <div class="hs-scheme-drawer" x-show="open">
            <div class="colorview-row-panel" x-show="$store.pd.colorView == 'row' ">
               <div class="color-row-light">
                  <div style="display: flex; gap: .25rem;">
                     <template x-for="(color) in $store.pd.neutralColorSchema.data.light">
                        <div class="color-step-container" @click="$store.project.copyColorToClipboard('neutral', color.step)" x-bind:data-tippy-content="$store.project.colorLabel(color.step)">
                           <div class="color-step-label" x-bind:data-step="color.step" x-text="color.step" style="text-align: center;"></div>
                           <div class="color-step-color" x-bind:style="`background-color: ${ Alpine.store('project').colorPreview(color)};height: 40px; min-width:40px; border-radius:.25rem;`"></div>
                        </div>
                     </template>
                  </div>
               </div>
               <div class="color-row-dark">
                  <div style="display: flex; gap: .25rem;">
                     <template x-for="(color) in $store.pd.neutralColorSchema.data.dark">
                        <div class="color-step-container" @click="$store.project.copyColorToClipboard('neutral', color.step)" x-bind:data-tippy-content="$store.project.colorLabel(color.step)">
                           <div class="color-step-label" x-bind:data-step="color.step" x-text="color.step" style="text-align: center;"></div>
                           <div class="color-step-color" x-bind:style="`background-color: ${ Alpine.store('project').colorPreview(color)};height: 40px; min-width:40px; border-radius:.25rem;`"></div>
                        </div>
                     </template>
                  </div>
               </div>
            </div>

            <div class="colorview-row-panel" x-show="$store.pd.colorView == 'column' ">
               <div>
                  <div style="display: flex; flex-direction:column; gap: .25rem;">
                     <div class="color-grid-header">
                        <div>Step</div>
                        <div>Light</div>
                        <div>Dark</div>
                        <div>Use Case</div>
                     </div>
                     <template x-for="(color, colorIndex) in $store.pd.neutralColorSchema.data.light">
                        <div class="color-step-container-column" @click="$store.project.copyColorToClipboard('neutral', color.step)">
                           <div class="color-step-label" x-bind:data-step="color.step" x-text="color.step" style="text-align: center;"></div>
                           <div class="color-step-color" x-bind:style="`background-color: ${ Alpine.store('project').colorPreview(color)};height: 40px; min-width:40px; border-radius:.25rem;`"></div>
                           <div class="color-step-color" x-bind:style="`background-color: ${Alpine.store('project').colorPreview($store.pd.neutralColorSchema.data.dark[colorIndex])};height: 40px; min-width:40px; border-radius:.25rem;`"></div>
                           <div x-text="$store.project.colorLabel(color.step)" xx-text="colorIndex"></div>
                        </div>
                     </template>
                  </div>
               </div>
            </div>

         </div>

      </div>
   </div>
</section>
<section x-show="$store.pd.colorSchemas.length > 0">
   <h4>Custom Schemas</h4>
   <div id="preset-schema-enable" style="font-size: 16px; display: flex; gap: 1.33em;">
      <template
         x-for="(schema, index) in $store.pd.colorSchemas.filter(s => s.presetColor && !s.enabled)"
         :key="schema.name">
         <div style="display: flex; gap: .66em; align-items: center; margin-bottom: 1rem">
            <div class="font-bold" :id="'enable-'+schema.name" x-text="schema.name" style="text-transform: capitalize;"></div>
            <input :name="'enable-'+schema.name" style="font-size:19px" class="hs-switch-input" type="checkbox" x-model="schema.enabled">
         </div>
      </template>
   </div>
   <div class="all-schemas">

      <template x-for="(schema,index) in $store.pd.colorSchemas" :key="index">
         <div x-data="{'open': false}" class="schema-single" x-show="schema.enabled != false" :data-slot="schema.name">
            <header style="display: flex; gap: .25rem; align-items: center;">
               <button class="hs-ghost-button" @click="open = !open">
                  <svg x-show="!open" class="hs-icon hs-icon-large">
                     <use href="#ii-folder-closed"></use>
                  </svg>
                  <svg x-show="open" class="hs-icon hs-icon-large">
                     <use href="#ii-folder-open"></use>
                  </svg>
               </button>
               <div class="hs-vspacer"></div>
               <button x-bind:style="`background-color: ${schema.data.light[9].value};height: 24px; width: 24px; border-radius: .25rem; border: var(--hs-border)`"></button>
               <span class="schema-single-name" x-text="schema.name"></span>
               <div class="hs-vspacery pull-right"></div>

               <div class="hs-vspacer"></div>
               <button class="hs-ghost-button relative" x-show="$store.project.access.type == 'pro'" data-tippy-content="Define dynamic schema paths"
                  @click="$store.project.dynamicThemeDirectivesEditor.openSchema(index);">
                  <svg class="hs-icon hs-icon-large">
                     <use href="#ii-data"></use>
                  </svg>
                  <span class="inbox-count directives-count" x-show="schema?.themeDirectivesPaths?.length > 0" x-text="schema?.themeDirectivesPaths?.length" style="display: none;">0</span>
               </button>
               <div class="hs-vspacery"></div>
               <button class="hs-ghost-button" data-tippy-picker @click="$store.colorWheel.tcpShow('customSchemaIndex', null, index)" data-tippy-content="Edit color palette">
                  <svg class="hs-icon hs-icon-large">
                     <use href="#ii-edit"></use>
                  </svg>
               </button>
               <div class="hs-vspacer"></div>
               <button x-show="schema.presetColor != true " @click="$store.project.deleteSchema(index)" class="hs-ghost-button ghost-danger">Delete</button>
               <button x-show="schema.presetColor == true " @click="$store.project.disableSchema(index)" class="hs-ghost-button ghost-danger">Disable</button>

            </header>
            <div class="hs-scheme-drawer" x-show="open">
               <div class="colorview-row-panel" x-show="$store.pd.colorView == 'row' ">
                  <div class="color-row-light">
                     <div style="display: flex; gap: .25rem;">
                        <template x-for="(color) in schema.data.light">
                           <div class="color-step-container" @click="$store.project.copyColorToClipboard(schema.name, color.step)" x-bind:data-tippy-content="$store.project.colorLabel(color.step)">
                              <div class="color-step-label" x-bind:data-step="color.step" x-text="color.step" style="text-align: center;"></div>
                              <div class="color-step-color" x-bind:style="`background-color: ${ Alpine.store('project').colorPreview(color)};height: 40px; min-width:40px; border-radius:.25rem;`"></div>
                           </div>
                        </template>
                     </div>
                  </div>
                  <div class="color-row-dark">
                     <div style="display: flex; gap: .25rem;">
                        <template x-for="(color) in schema.data.dark">
                           <div class="color-step-container" @click="$store.project.copyColorToClipboard(schema.name, color.step)" x-bind:data-tippy-content="$store.project.colorLabel(color.step)">
                              <div class="color-step-label" x-bind:data-step="color.step" x-text="color.step" style="text-align: center;"></div>
                              <div class="color-step-color" x-bind:style="`background-color: ${ Alpine.store('project').colorPreview(color)};height: 40px; min-width:40px; border-radius:.25rem;`"></div>
                           </div>
                        </template>
                     </div>
                  </div>
               </div>

               <div class="colorview-row-panel" x-show="$store.pd.colorView == 'column' ">
                  <div>
                     <div style="display: flex; flex-direction:column; gap: .25rem;">
                        <div class="color-grid-header">
                           <div>Step</div>
                           <div>Light</div>
                           <div>Dark</div>
                           <div>Use Case</div>
                        </div>
                        <template x-for="(color, colorIndex) in schema.data.light">
                           <div class="color-step-container-column" @click="$store.project.copyColorToClipboard(schema.name, color.step)">
                              <div class="color-step-label" x-bind:data-step="color.step" x-text="color.step" style="text-align: center;"></div>
                              <div class="color-step-color" x-bind:style="`background-color: ${ Alpine.store('project').colorPreview(color)};height: 40px; min-width:40px; border-radius:.25rem;`"></div>
                              <div class="color-step-color" x-bind:style="`background-color: ${ Alpine.store('project').colorPreview(schema.data.dark[colorIndex]) };height: 40px; min-width:40px; border-radius:.25rem;`"></div>
                              <div x-text="$store.project.colorLabel(color.step)" xx-text="colorIndex"></div>
                           </div>
                        </template>
                     </div>
                  </div>
               </div>

            </div>

         </div>
      </template>
   </div>
</section>
<section x-show="$store.pd.colorSchemas.length == 0">
   <div class="hs-info">
      There is no created color schemas yet!
   </div>
</section>