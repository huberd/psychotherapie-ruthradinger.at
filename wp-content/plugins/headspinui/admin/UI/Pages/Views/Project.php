<?php
if (!defined('ABSPATH')) exit;
?>
<section>
    <div style="display: flex; padding: 1rem; gap: .5rem; background: var(--neutral-3); border-radius: .5rem; border: var(--hs-border);margin-bottom: 1rem;">

        <div class="hs-custom-file">
            <input class="hs-file-input" onchange="headspinImportFile(event)" accept=".headspin" type="file" class="custom-file-input" data-target="file-uploader" id="file-uploader">
            <label class="hs-file-input-label" for="file-uploader">Import file</label>
        </div>
        <div style="display: flex; gap: .5rem; margin-left: auto;height: fit-content;">
            <button id="export" class="hs-button" onclick="headspinExportFile()">Export</button>
            <button id="reset" class="hs-button hs-button-danger" style="margin-left: auto" onclick="headspinRemoveProjectData()">Reset app data</button>
        </div>
    </div>

    <div id="page-theme" class="hs-control-group schema-single" x-data="{'open': false}">

        <header style="display: flex; gap: .25rem; align-items: center;">

            <button id="fluid-settings" class="hs-ghost-button" @click="open = !open">
                <svg x-show="!open" class="hs-icon hs-icon-large">
                    <use href="#ii-folder-closed"></use>
                </svg>
                <svg x-show="open" class="hs-icon hs-icon-large" style="display: none;">
                    <use href="#ii-folder-open"></use>
                </svg>
            </button>
            <div class="hs-vspacer"></div>

            <div class="control-group-name">Fluid settings</div>
        </header>

        <div x-show="open" class="sub-options-group">
            <?php \Headspin\Components\fluid_line_chartjs_static('fluid-min-max'); ?>
            <?php \Headspin\Components\numInput('Min. Viewport', 'PX', '$store.pd.minViewport', 'minViewport'); ?>
            <?php \Headspin\Components\numInput('Max. Viewport', 'PX', '$store.pd.maxViewport', 'maxViewport'); ?>
        </div>

    </div>
    <div id="a11y-theme" class="hs-control-group schema-single" x-data="{'open': false}">

        <header style="display: flex; gap: .25rem; align-items: center;">

            <button id="fluid-settings" class="hs-ghost-button" @click="open = !open">
                <svg x-show="!open" class="hs-icon hs-icon-large">
                    <use href="#ii-folder-closed"></use>
                </svg>
                <svg x-show="open" class="hs-icon hs-icon-large" style="display: none;">
                    <use href="#ii-folder-open"></use>
                </svg>
            </button>
            <div class="hs-vspacer"></div>

            <div class="control-group-name">Accessibility</div>
        </header>

        <div x-show="open" class="sub-options-group">
            <div id="contrast-algo" class="hs-input-row">
                <label class="hs-input-label">Contrast algorithm:</label>
                <div class="hs-input">
                    <div class="project-borders-group">
                        <button class="hs-button hs-button-radio" @click="$store.pd.colorContrastMethod = 'perceptual_contrast'" :class="{ 'active': 'perceptual_contrast' == $store.pd.colorContrastMethod }">
                            Perceptual
                        </button>
                        <button class="hs-button hs-button-radio" @click="$store.pd.colorContrastMethod = 'wcag_20'" :class="{ 'active': 'wcag_20' == $store.pd.colorContrastMethod }">
                            WCAG 2
                        </button>
                    </div>
                </div>
            </div>
            <div id="enterprise-workflows" class="hs-input-row" x-show="$store.project.access.type == 'pro'">
                <label class="hs-input-label">Enterprise Workflows:</label>
                <div class="hs-input">
                    <div class="project-borders-group">
                        <button class="hs-button hs-button-radio" @click="$store.pd.enterpriseWorkflows = true; $store.project.regenratePaletteOutput() " :class="{ 'active': true == $store.pd.enterpriseWorkflows }">
                            Enabled
                        </button>
                        <button class="hs-button hs-button-radio" @click="$store.pd.enterpriseWorkflows = false; $store.project.regenratePaletteOutput() " :class="{ 'active': false == $store.pd.enterpriseWorkflows }">
                            Disabled
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div id="context-menu_Settings" class="hs-control-group schema-single" x-data="{'open': false}">

        <header style="display: flex; gap: .25rem; align-items: center;">

            <button id="fluid-settings" class="hs-ghost-button" @click="open = !open">
                <svg x-show="!open" class="hs-icon hs-icon-large">
                    <use href="#ii-folder-closed"></use>
                </svg>
                <svg x-show="open" class="hs-icon hs-icon-large" style="display: none;">
                    <use href="#ii-folder-open"></use>
                </svg>
            </button>
            <div class="hs-vspacer"></div>

            <div class="control-group-name">Context Menu</div>
        </header>

        <div x-show="open" class="sub-options-group">
            <div id="contrast-algo" class="hs-input-row">
                <label class="hs-input-label">Auto-close</label>
                <div class="hs-input">
                    <div class="project-borders-group">
                        <button class="hs-button hs-button-radio" @click="$store.pd.contextMenuCloseOn = 'outside'" :class="{ 'active': 'outside' == $store.pd.contextMenuCloseOn }">
                            Off
                        </button>
                        <button class="hs-button hs-button-radio" @click="$store.pd.contextMenuCloseOn = 'any'" :class="{ 'active': 'any' == $store.pd.contextMenuCloseOn }">
                            On
                        </button>
                    </div>
                </div>
            </div>

        </div>

    </div>


</section>