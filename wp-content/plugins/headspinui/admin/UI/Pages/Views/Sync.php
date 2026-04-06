<?php
if (!defined('ABSPATH')) exit;
?>


<section  id="syncmodal" x-show="$store.sync.syncInProgress" class="edit-tokens-modal" style="backdrop-filter: unset;">
    <div @click="$store.sync.syncInProgress = false;" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: -1;"></div>
    <div class="edit-tokens-modal-window" style="min-height: 75%;">
        <div class="edit-tokens-modal-window--header">
            <span>Sync Center</span>
            <button class="red-close-dot" @click="$store.sync.syncInProgress = false;"><span></span></button>
        </div>

        <div class="edit-tokens-modal-window--body">
            <section x-data="$store.sync">
                <div style="display: flex;"><button class="hs-sync-button" @click="$store.sync.run()">Run sync</button></div>
                <div class="sync-instructions brand">
                    <div>
                        <h3>Instructions</h3>
                    </div>
                    <div class="sync-instruction">
                        <span class="sync-instruction-step">1</span>
                        <span class="sync-instruction-desc">Please open Breakdance in new tab (Note: keep Headspin in separate tab)</span>
                    </div>
                    <div class="sync-instruction">
                        <span class="sync-instruction-step">2</span>
                        <span class="sync-instruction-desc">Please open Breakdance Global Settings</span>
                    </div>
                    <div class="sync-instruction">
                        <span class="sync-instruction-step">3</span>
                        <span class="sync-instruction-desc">Have at least one color under Global Settings > Colors > Palette</span>
                    </div>
                </div>
                <div class="sync-instructions">
                    <div>
                        <h3>Status</h3>
                    </div>
                    <template x-for="(item, index) in $store.sync.steps" :key="index">
                        <div x-bind:data-status="item.status" class="sync-instruction">
                            <span class="sync-instruction-step" x-text="index + 1"></span>
                            <span class="sync-instruction-desc" x-text="item.step"></span>
                            <span class="sync-instruction-desc" x-text="item.status"></span>
                        </div>
                    </template>
                </div>

            </section>

        </div>

    </div>
</section>