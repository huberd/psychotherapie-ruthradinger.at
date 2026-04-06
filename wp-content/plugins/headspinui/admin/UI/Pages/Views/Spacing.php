<?php
if (!defined('ABSPATH')) exit;
?>
<?php
if (!defined('ABSPATH')) exit;
?>
<section id="advanced-typo-modal" x-show="$store.project.advancedSpacing" class="edit-tokens-modal" style="backdrop-filter: unset; background: transparent">
    <div @click="$store.project.advancedSpacing = false;" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: -1;"></div>
    <div class="edit-tokens-modal-window" @click.outside="$store.project.advancedSpacing = false;" style="max-width: 960px;">
        <div class="edit-tokens-modal-window--header">
            <span>Advanced Spacing</span>
            <button class="red-close-dot" @click="$store.project.advancedSpacing = false;"><span></span></button>
        </div>

        <div class="edit-tokens-modal-window--body">

            <section class="grid-2col">
                <?php \Headspin\Components\minViewportFieldsetSpacing('space', 'Space'); ?>
                <?php \Headspin\Components\maxViewportFieldsetSpacing('space', 'Space'); ?>
            </section>
            <section style="display:none" id="spacing-space-preview">
                <div class="hs-input-row">
                    <label class="hs-input-label">Mode:</label>
                    <div class="hs-button-group">
                        <button class="hs-button-group-button" :class="{ 'active': $store.appView.activeSpacePreview == 'component' }" @click="$store.appView.activeSpacePreview = 'component'">Component</button>
                        <button class="hs-button-group-button" :class="{ 'active': $store.appView.activeSpacePreview == 'section' }" @click="$store.appView.activeSpacePreview = 'section'">Section</button>
                    </div>
                </div>
                <div class="hs-space-preview-section" x-show="$store.appView.activeSpacePreview == 'component'">
                    <template x-for="(space, index) in $store.space.output" :key="index">
                        <div class="hs-space-group" x-bind:style="`--size-preview-size-min:${$store.space.previewSize(space.min)};--size-preview-size-max:${$store.space.previewSize(space.max)}`">
                            <div style="align-self: center;">
                                <span class="hs-space-column-label" x-text="space.step" style="text-transform:uppercase;"></span>
                                <span class="hs-space-column-label" x-text="space.name"></span>
                            </div>
                            <div>
                                <div class="hs-preview-space-box">
                                    <div class="hs-space-preview-small"></div>
                                    <span x-text="$store.space.previewSize(space.min)"></span>
                                </div>
                                <div class="hs-preview-space-box">
                                    <div class="hs-space-preview-large"></div>
                                    <span x-text="$store.space.previewSize(space.max)"></span>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="hs-space-preview-section" x-show="$store.appView.activeSpacePreview == 'section'">
                    <template x-for="(space, index) in $store.space.outputSection" :key="index">
                        <div class="hs-space-group" x-bind:style="`--size-preview-size-min:${$store.space.previewSize(space.min)};--size-preview-size-max:${$store.space.previewSize(space.max)}`">
                            <div style="align-self: center;">
                                <span class="hs-space-column-label" x-text="space.step" style="text-transform:uppercase;"></span>
                                <span class="hs-space-column-label" x-text="space.name"></span>
                            </div>
                            <div>
                                <div class="hs-preview-space-box">
                                    <div class="hs-space-preview-small"></div>
                                    <span x-text="$store.space.previewSize(space.min)"></span>
                                </div>
                                <div class="hs-preview-space-box">
                                    <div class="hs-space-preview-large"></div>
                                    <span x-text="$store.space.previewSize(space.max)"></span>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </section>
            <section id="typo-preview">
                <?php require_once 'Partials/preview-spacing.php'; ?>
            </section>
        </div>

    </div>
</section>