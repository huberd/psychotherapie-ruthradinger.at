<?php
if (!defined('ABSPATH')) exit;
?>
<section x-data="{previewType: 'chart'}">
    <div style="display: flex;flex-direction: column; gap: .5rem; margin-top: 1.5rem; margin-bottom: .85rem">
        <div>Preview as:</div>
        <div class="token-group-button">
            <button class="hs-button-gtoken" x-bind:class="{ 'active': previewType == 'chart' }" @click="previewType = 'chart'">Chart</button>
            <button class="hs-button-gtoken" x-bind:class="{ 'active': previewType == 'table' }" @click="previewType = 'table'">Table </button>
            <button class="hs-button-gtoken" x-bind:class="{ 'active': previewType == 'text' }" @click="previewType = 'text'">Text</button>
        </div>
    </div>
   <div x-show="previewType == 'text'">
        <template x-for="token in $store.project.getTokensPreview('--hfs-')">
                <div class="typography-token-preview" x-bind:data-linked="token.linked">
                <div style="display: flex; align-items: center; gap: .5rem">
                        <div x-text="token.label"></div>
                        <div class="show-unliked">unlinked</div>
                    </div>
                    <div class="typography-token-preview-box">
                        <div class="typography-token-preview-box-min" x-bind:style="`--preview-local: ${token.min}; white-space: nowrap;`">
                            <div class="typography-token-preview-box-value" x-text="token.min"></div>
                            <div style="font-size: var(--preview-local); height: 100%">The quick brown fox jumps over the lazy dog</div>
                        </div>
                        <div class="typography-token-preview-box-max" x-bind:style="`--preview-local: ${token.max}; white-space: nowrap;`">
                            <div class="typography-token-preview-box-value" x-text="token.max"></div>
                            <div style="font-size: var(--preview-local); height: 100%">The quick brown fox jumps over the lazy dog</div>
                        </div>
                        
                    </div>
                </div>
        </template>
   </div>
   <div x-show="previewType == 'table'">
    <div style="display: grid; grid-template-columns: 200px 100px 100px;border-bottom: 2px solid var(--brand-6);align-content: center;justify-items: center;padding: .75rem 0 .5rem 0;color: var(--brand-11);margin-top: 1rem;">
        <div>Token</div>
        <div>Min</div>
        <div>Max</div>
    </div>
        <template x-for="token in $store.project.getTokensPreview('--hfs-')">
                <div class="typography-token-preview" style="padding:0;" x-bind:data-linked="token.linked">
                    <div style="display: flex; align-items: center; gap: .5rem">
                        <div x-text="token.label"></div>
                        <div class="show-unliked">unlinked</div>
                    </div>
                    <div class="typography-token-preview-box" style="display: grid; grid-template-columns: 100px 100px">
                            <div class="typography-token-preview-box-value" x-text="token.min"></div>
                            <div class="typography-token-preview-box-value" x-text="token.max "></div>
                    </div>
                </div>
        </template>
   </div>
   <div x-show="previewType == 'chart'">
            <?php \Headspin\Components\fluid_line_chartjs('--hfs-h'); ?>
   </div>
</section>