<?php
if (!defined('ABSPATH')) exit;
?>
<section x-data="{previewType: 'spacing', previewAs: 'chart'}">
 
    <div style="display: flex;flex-direction: column; gap: .5rem; margin-top: 1.5rem; margin-bottom: .85rem">
        <div>Space to preview:</div>
        <div class="token-group-button">
            <button class="hs-button-gtoken" x-bind:class="{ 'active': previewType == 'spacing' }" @click="previewType = 'spacing'">Regular</button>
            <button class="hs-button-gtoken" x-bind:class="{ 'active': previewType == 'section' }" @click="previewType = 'section'">Section</button>
        </div>
    </div>
    <div style="display: flex;flex-direction: column; gap: .5rem; margin-top: 1.5rem; margin-bottom: .85rem">
        <div>Space to preview:</div>
        <div class="token-group-button">
            <button class="hs-button-gtoken" x-bind:class="{ 'active': previewAs == 'chart' }" @click="previewAs = 'chart'">Chart</button>
            <button class="hs-button-gtoken" x-bind:class="{ 'active': previewAs == 'bar' }" @click="previewAs = 'bar'">Bar</button>
        </div>
    </div>
   <div x-show="previewType == 'spacing'">
   <div x-show="previewAs == 'chart'">
        <?php \Headspin\Components\fluid_line_chartjs('--hsp-'); ?>
    </div>
      <div x-show="previewAs == 'bar'">
        <template x-for="token in $store.project.getTokensPreview('--hsp-')">
                    <div class="typography-token-preview" x-bind:data-linked="token.linked">
                        <div x-text="token.label"></div>
                        <div class="typography-token-preview-box">
                            <div class="typography-token-preview-box-min" x-bind:style="`--preview-local: ${token.min}`">
                                <div class="typography-token-preview-box-value" x-text="'Min: '+ token.min "></div>
                                <div class="spacing-preview-rect" style="width: var(--preview-local); height: 24px"></div>
                            </div>
                            <div class="typography-token-preview-box-max" x-bind:style="`--preview-local: ${token.max}`">
                                <div class="typography-token-preview-box-value" x-text="'Max: ' + token.max "></div>
                                <div class="spacing-preview-rect" style="width: var(--preview-local); height: 24px"></div>
                            </div>
                            
                        </div>
                    </div>
            </template>
      </div>
   </div>
   <div x-show="previewType == 'section'">
    <div x-show="previewAs == 'chart'">
        <?php \Headspin\Components\fluid_line_chartjs('--hss-'); ?>
    </div>
    <div  x-show="previewAs == 'bar'">
        <template x-for="token in $store.project.getTokensPreview('--hss-')">
                    <div class="typography-token-preview" x-bind:data-linked="token.linked">
                        <div x-text="token.label"></div>
                        <div class="typography-token-preview-box">
                            <div class="typography-token-preview-box-min" x-bind:style="`--preview-local: ${token.min}`">
                                <div class="typography-token-preview-box-value" x-text="'Min: ' + token.min "></div>
                                <div class="spacing-preview-rect" style="width: var(--preview-local); height: 24px"></div>
                            </div>
                            <div class="typography-token-preview-box-max" x-bind:style="`--preview-local: ${token.max}`">
                                <div class="typography-token-preview-box-value" x-text="'Max: ' + token.max"></div>
                                <div class="spacing-preview-rect" style="width: var(--preview-local); height: 24px"></div>
                            </div>
                            
                        </div>
                    </div>
            </template>
    </div>
   </div>
</section>