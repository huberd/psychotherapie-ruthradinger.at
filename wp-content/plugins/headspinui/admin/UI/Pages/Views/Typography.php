<?php
if (!defined('ABSPATH')) exit;
?>
<section id="advanced-typo-modal" x-data="{advancedTypography: $store.project.advancedTypography}" x-show="$store.project.advancedTypography" class="edit-tokens-modal" style="backdrop-filter: unset; background: transparent">
    <div @click="$store.project.advancedTypography = false;" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: -1;"></div>
    <div class="edit-tokens-modal-window"  @click.outside="$store.project.advancedTypography = false;" style="max-width: 960px;margin: 1rem">
        <div class="edit-tokens-modal-window--header">
            <span>Advanced Typography - Fluid Font Size</span>
            <button class="red-close-dot" @click="$store.project.advancedTypography = false;"><span></span></button>
        </div>

        <div class="edit-tokens-modal-window--body">
            <section class="grid-2col">
                <div id="typo-start" class="hs-input-row">
                    <label class="hs-input-label">Start from:</label>
                    <div class="hs-button-group">
                        <template x-for="(lock, index) in $store.typography.locks" :key="index">
                            <button class="hs-button-group-button" :class="{ 'active': lock == $store.pd.activeLock }" @click="$store.pd.themeFontSize = 'custom';$store.pd.activeLock = lock;headspinRegenerate()">
                                <span x-text="index"></span>
                            </button>
                        </template>
                    </div>
                </div>

            </section>
            <section class="grid-2col">

                <?php \Headspin\Components\minViewportFieldset('typography', 'Font Size'); ?>
                <?php \Headspin\Components\maxViewportFieldset('typography', 'Font Size'); ?>
            </section>
            <section style="display:none;" id="typo-preview" style="padding-top: 1rem">
                <div class="hs-input-row">
                    <label class="hs-input-label">Preview:</label>
                    <div class="hs-button-group">
                        <button class="hs-button-group-button" :class="{ 'active': $store.typography.tablePreview === 'table' }" @click="$store.typography.tablePreview  = 'table'">Table</button>
                        <button class="hs-button-group-button" :class="{ 'active': $store.typography.tablePreview === 'text' }" @click="$store.typography.tablePreview  = 'text'">Scale</button>
                    </div>
                </div>
                <div id="hs-aa-typo-table" class="grid" x-show="$store.typography.tablePreview === 'table'" style="grid-template-columns: 1fr 5fr; padding: var(--hs-padding-normal); position: relative;">
                    <div class="hs-table-preview hs-table-column" style="display: flex;flex-direction: column;">
                        <span class="hs-table-column-label">STYLES</span>
                        <template x-for="(value, index) in $store.typography.typoSelectors" :key="index">
                            <span x-text="value"></span>
                        </template>
                    </div>

                    <div class="hs-table-preview" style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;">

                        <template x-for="(value, index) in $store.typography.breakpoints" :key="index">
                            <span class="hs-table-column-label" x-text="value + 'px'"></span>
                        </template>
                        <template x-for="(value, index) in $store.typography.preview" :key="index">
                            <span x-text="value + 'px'"></span>
                        </template>
                    </div>

                </div>
                <div style="display: flex; flex-direction: column; gap: .75rem;" x-show="$store.typography.tablePreview === 'text'">
                    <div style="display: flex; gap: .75rem; margin-top: 1rem">
                        <label for="typo-preview-input">Preview size</label>
                        <input id="typo-preview-input" name="typo-preview-input" class="hs-palette-padding-range" x-model="$store.typography.previewContainer" type="range" min="400" max="1400" step="10">
                    </div>
                    <div class="hs-cq-container" x-bind:style="`max-width: ${$store.typography.previewContainer}px;container-type: inline-size;`">
                        <div style="display: flex; flex-direction: column; gap: .75rem;">
                            <div style="font-weight: 600; font-size: var(--preview--hfs-h0)">Display h0</div>
                            <div style="font-weight: 600; font-size: var(--preview--hfs-h1)">Heading h1</div>
                            <div style="font-weight: 600; font-size: var(--preview--hfs-h2)">Heading h2</div>
                            <div x-show="$store.pd.activeLock >= 3" style="font-weight: 600; font-size: var(--preview--hfs-h3)">Heading h3</div>
                            <div x-show="$store.pd.activeLock >= 4" style="font-weight: 600; font-size: var(--preview--hfs-h4)">Heading h4</div>
                            <div x-show="$store.pd.activeLock >= 5" style="font-weight: 600; font-size: var(--preview--hfs-h5)">Heading h5</div>
                            <div x-show="$store.pd.activeLock >= 6" style="font-weight: 600; font-size: var(--preview--hfs-h6)">Heading h6</div>
                            <div style="font-weight: 300; font-size: var(--preview--hfs-text-m)">The goal of typography is to relate font size, line height, and line width in a proportional way that maximizes beauty and makes reading easier and more pleasant.</div>
                        </div>
                    </div>
                </div>
            </section>
        <section id="typo-preview">
            <?php require_once 'Partials/preview-typography.php'; ?>
        </section>
        </div>

    </div>
</section>