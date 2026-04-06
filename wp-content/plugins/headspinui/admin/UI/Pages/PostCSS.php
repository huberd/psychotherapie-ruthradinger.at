<?php
if (!defined('ABSPATH')) exit;
function headspin_postcss_page_callback()
{
?>
    <style>
        html {
            overflow: hidden;
        }

        .hs-dropdown label {
            min-width: 100px;
        }

        #wpbody-contenst {
            position: relative;
            min-height: calc(100vh - 32px);
            min-width: calc(100vw - 160px);
            margin: 0;
            padding: 0;
        }

        #postcss-app {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            background-color: var(--neutral-2);
            color: var(--neutral-11);
        }

        header {
            width: 100%;
            height: 40px;
            border-bottom: 1px solid var(--neutral-6);
        }

        aside {
            border-right: 1px solid var(--neutral-6);
            background-color: var(--neutral-3);
        }

        #wpcontent {
            display: flex;
            flex-direction: column;
            height: calc(100vh - 32px);
            position: relative;
        }

        * {
            color: inherit;
        }

        #wpfooter {
            display: none;
        }

        .aside-button-tree {
            color: var(--neutral-11);
            background-color: transparent;
            --hs-icon: currentColor;
            border: 1px solid transparent;
            padding: .25rem 1rem;
            width: 100%;
            min-height: 28px;
            display: flex;
            gap: .33rem;
            align-items: center;
        }

        .aside-button-tree:focus {
            outline: 1px solid var(--brand-11);
            outline-offset: -1px;
            background: var(--brand-5) !important;
            color: var(--brand-12)
        }

        .sheet.active {
            background: var(--neutral-5);
            color: var(--neutral-12)
        }

        .aside-button-tree.sheet {
            --hs-icon: var(--brand-11);
            padding-left: 2rem;
        }

        .aside-button-tree:hover {
            color: var(--neutral-12);
            background-color: var(--neutral-4);
        }

        .chscm-editor {
            height: 100%;
            max-height: calc(100vh - 50px);
        }

        #hscm-editor,
        .cm-editor,
        .cm-content,
        .cm-gutters {
            height: 100%;
            max-height: calc(100vh - 100px);
        }

        .hs-icon-small {
            max-height: 12px;
            width: 12px;
        }

        .folder-wrapper {
            position: relative
        }

        .folder-wrapper:before {
            position: absolute;
            left: calc(1rem + 5px);
            top: 30px;
            content: "";
            height: calc(100% - 32px);
            width: 1px;
            background: var(--neutral-7);
        }

        .folder-wrapper:hover:before {
            background: var(--neutral-8);
        }

        .folder-sheet-name {
            text-wrap: nowrap;
            text-overflow: ellipsis;
            max-width: 100%;
            overflow: hidden;
        }

        [data-collapsed="true"] .folder-drawer {
            display: none !important;
        }

        .folder svg {
            transform: rotate(90deg);
            transition: all ease .15s;
        }

        [data-collapsed="true"] .folder svg {
            transform: rotate(0deg)
        }

        .aside-preview-wrapper {
            display: flex;
            flex-direction: column;
            background-color: transparent;
            padding: 1rem;
        }

        .aside-preview {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
            background: transparent;
            border: 1px solid var(--neutral-6);
            border-radius: .75rem;

        }

        .aside-preview-options {
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
            flex-basis: 40px;
            background: var(--neutral-3);
            display: flex;
            flex-direction: row;
            padding: .5rem .75rem;
            gap: .5rem;
            min-height: 50px;
            border-bottom: 1px solid var(--neutral-6);
            align-items: center;
        }

        .aside-iframe {
            flex-basis: 100%;
            border-bottom-left-radius: inherit;
            border-bottom-right-radius: inherit;
            overflow: hidden;
        }

        .tree-button-options {
            padding: .5rem;
            border-bottom: 1px solid var(--neutral-6);
            margin-bottom: 1rem;
        }

        .tree-button-options button {
            border: 1px solid transparent !important;
            --hs-icon: var(--neutral-11)
        }

        .tree-button-options button:hover {
            background-color: var(--neutral-5);
        }

        .aside-preview-wrapper {
            position: relative;
        }

        .aside-resize-handle {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 1rem;
            border-radius: 0px;
            background: transparent;
            border: 1px solid transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: ew-resize;

        }

        .aside-resize-handle-line {
            height: 80px;
            width: 2px;
            background: var(--neutral-11);
            border-radius: 400px;

        }

        .aside-resize-handle:hover .aside-resize-handle-line {
            background: var(--neutral-12);
        }

        main {
            padding: 1rem 0 1rem 1rem;
        }

        main .chscm-editor {
            border-radius: .75rem;
            overflow: hidden;
            border: 1px solid var(--neutral-6);
        }

        main #hscm-editor>.cm-editor {
            padding: .5rem 0.25rem 1rem 0.25rem;
        }

        #inactive-sheet {
            display: none !important;
        }

        [data-activesheet="none"] .chscm-editor {
            display: none;
        }

        [data-activesheet="none"] #inactive-sheet {
            display: flex !important;
        }

        .sheet[data-error="true"],
        [data-error="true"]>.folder {
            color: var(--danger-11);
            --hs-icon: currentColor;
        }

        #inactive-sheet {
            display: flex;
            flex-wrap: nowrap;
            gap: 2rem;
            padding: 2rem;
            background: var(--neutral-3);
            border: 1px solid var(--neutral-6);
            border-radius: .75rem;

        }

        .button-card {
            flex-basis: 200px;
            background: transparent;
            border: 1px solid var(--neutral-6);
            border-radius: .5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            --hs-icon: currentColor;
            padding: 1.5rem;
            font-size: 1rem;
        }

        .button-card:hover {
            background: var(--neutral-4);
            border-color: var(--neutral-7);
            color: var(--neutral-12)
        }

        .button-card svg {
            --xyz-size: 24px;
            max-height: var(--xyz-size);
            max-width: var(--xyz-size);
            width: var(--xyz-size);
        }

        .aside-preview[data-iframecover="true"],
        .js-panel-resize .aside-preview {
            position: relative;
        }

        .aside-preview[data-iframecover="true"]:after,
        .js-panel-resize .aside-preview:after {
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            background: transparent;
            height: 100%;
            width: 100%;
            z-index: 5;
        }

        .toolchain {
            counter-reset: toolchain;
            position: relative;
            font-size: 1rem;
            gap: 1rem
        }

        .toolchain:after {
            position: absolute;
            content: "";
            display: block;
            height: 96%;
            width: 2px;
            background: var(--brand-10);
            left: calc(1.5rem + 4px);
            top: 2%;
            z-index: -1;


        }

        .toolchain-tool:not(.toolToggle):before,
        .toolToggle[data-tooltoggle="true"]:before {
            counter-increment: toolchain;
            content: counter(toolchain);
            padding: .25rem .5rem;
            border-radius: .25rem;
            background: var(--neutral-6);
            color: var(--brand-12);
            margin-right: .75rem;
            z-index: 5;
        }

        [data-toolstatus="success"],
        [data-status="success"],
        [data-status="ok"],
        [data-status="online"] {
            color: var(--success-11);
            --hs-icon: currentColor;
        }

        [data-toolstatus="danger"],
        [data-status="danger"],
        [data-status="error"] {
            color: var(--danger-11);
            --hs-icon: currentColor;
        }

        [data-toolstatus="info"],
        [data-status="info"] {
            color: var(--brand-11);
            --hs-icon: currentColor;
        }

        [data-toolstatus="warn"],
        [data-status="warn"],
        [data-status="offline"] {
            color: var(--warn-11);
            --hs-icon: currentColor;
        }

        .toolToggle:not([data-toolToggle="true"]) {
            margin-left: auto;
        }

        .toolchain {
            display: flex;
            flex-direction: column;
            gap: .5rem;
        }

        .toolchain>* {
            padding: .25rem 1rem;
        }

        .sheet-error-head {
            margin-left: auto;
            display: flex;
            align-items: center;
            gap: .5rem;
            color: var(--danger-11);
        }

        .dropdown-panel.dropdown-with-left-sidebar {
            padding: 0rem !important;
        }

        .dropdown-panel .hs-tab {
            min-width: 120px
        }
    </style>
    <div data-headspin="Icons Holder" style="display: none;">
        <?php require_once 'Icons.php'; ?>
    </div>
    <div x-bind:data-theme="$store.appState.theme" id="postcss-app" x-data="$store.action" x-init="$store.action.initAction()" x-bind:class="{ 'fullscreen': $store.appState.fullscreen }">
        <?php require_once 'Views/Partials/sonner-toast.php'; ?>
        <header style="display: flex; padding: .25rem 1rem; gap: .5rem">

            <?php require_once 'CSS_Editor/dropdowns/app-settings.php' ?>
            <?php require_once 'CSS_Editor/dropdowns/postcss-settings.php' ?>
            <?php require_once 'CSS_Editor/dropdowns/css-validator.php' ?>
            <div style="margin-left: auto;"></div>
            <button id="hs-fullscreen" x-bind:class="{ 'active': $store.appState.fullscreen }" @click="$store.appState.fullscreen = !$store.appState.fullscreen" class="hs-ghost-button">
                <svg class="hs-icon hs-icon-large loading-icon">
                    <use href="#ii-fullscreen"></use>
                </svg>
            </button>
            <button id="hs-save-button" @click="headspinSave()" class="hs-button button-has-loader">
                <div class="normal-icon">Save</div>
                <svg class="hs-icon hs-icon-large loading-icon">
                    <use href="#ii-loading"></use>
                </svg>
            </button>

        </header>
        <div style="display: grid; grid-template-columns: 200px var(--preview-width, 1fr) 1fr ; height: 100%">
            <aside class="aside-tree" x-data="$store.pd">
                <div class="tree-button-options">

                    <button @click="$store.action.addFolder()">
                        <svg class="hs-icon hs-icon-large">
                            <use href="#ii-folder-plus"></use>
                        </svg>
                    </button>

                    <button @click="$store.action.addFile()">
                        <svg class="hs-icon hs-icon-large">
                            <use href="#ii-file-plus"></use>
                        </svg>
                    </button>
                    <button @click="$store.action.collapseExpandFolder">
                        <svg class="hs-icon hs-icon-large">
                            <use href="#ii-collapse-expand"></use>
                        </svg>
                    </button>
                </div>
                <div x-sort="handleFoldersSort" x-sort:group="folder-collection" @reloadtokenapp.window="load = false; xFolders = []; setTimeout(() => { load = true;xFolders = $store.pd.globals}, 0)" x-data="{ 
                        load: false,
                        xFolders: $store.pd.globals,
                       handleFoldersSort: (item, position) => { Alpine.store('action').sortFolder(item, position); }
                        }">
                    <template x-for="(folder, findex) in xFolders" :key="folder.id">
                        <div class="folder-wrapper" x-bind:data-error="folder.error" x-bind:data-collapsed="folder.collapsed" x-sort:item="folder.id">
                            <button class="folder aside-button-tree" @click="folder.collapsed = !folder.collapsed; $store.action.currentFolder = folder;">
                                <span>
                                    <svg class="hs-icon hs-icon-small">
                                        <use href="#ii-chevron-right"></use>
                                    </svg>
                                </span>
                                <span class="folder-sheet-name" x-text="folder.name"></span>
                            </button>
                            <div class="folder-drawer" style="display: flex; flex-direction: column" x-sort="handleFilesSort" x-sort:group="file-collection" x-data="{ 
                       handleFilesSort: (item, position) => { Alpine.store('action').sortFiles(item, position, findex); }
                        }">
                                <template x-for="(sheet, sindex) in folder.sheets">
                                    <button class="sheet aside-button-tree" x-bind:data-error="sheet.error" x-sort:item="sheet.id" @click="$store.action.activateSheet(sheet, folder)" x-bind:class="{ 'active': sheet.active }">
                                        <span>
                                            <svg class="hs-icon hs-icon-small">
                                                <use href="#ii-hashtag"></use>
                                            </svg>
                                        </span>
                                        <span class="folder-sheet-name" x-text="sheet.name"></span>
                                    </button>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>

            </aside>
            <main x-bind:data-activesheet="$store.action.isSheetActive">
                <div id="inactive-sheet">
                    <div>
                        Please select stylesheet to start.
                    </div>
                    <div>
                        Please create stylesheet to start.
                    </div>
                </div>
                <div class="chscm-editor">
                    <div class="aside-preview-options">
                        <div style="display: flex; gap:.5rem; align-items: center; font-size: 1rem; padding-righ: 1rem; margin-right: 1rem; border-right: var(--hcl-neutral-6)">

                            <svg data-status="info" class="hs-icon hs-icon-small">
                                <use href="#ii-hashtag"></use>
                            </svg>
                            <span x-text="$store.action?.currentSheet?.name"></span>
                        </div>
                        <div class="sheet-error-head" x-show="$store.action?.currentSheet?.error">
                            <div style="border-radius: .25rem; background-color: var(--danger-11); color: var(--danger-1); padding: .25rem .33rem">Error</div>
                            <div x-text="$store.appState.postCSS?.errors[0]?.reason"></div>
                            <div x-text="'at line:' + $store.appState.postCSS?.errors[0]?.sheetLine"></div>
                        </div>
                    </div>
                    <div id="hscm-editor"></div>
                </div>

            </main>
            <aside class="aside-preview-wrapper">
                <button id="resize-handle" class="aside-resize-handle">
                    <span class="aside-resize-handle-line"></span>
                </button>
                <div class="aside-preview" x-bind:data-iframecover="$store.action.iframeCover">

                    <div class="aside-preview-options">
                        <?php require_once 'CSS_Editor/dropdowns/iframe-viewport.php' ?>
                        <?php require_once 'CSS_Editor/dropdowns/iframe-url.php' ?>


                        <button>X</button>

                    </div>
                    <div class="aside-iframe">
                        <iframe id="iframe-preview" x-bind:src="$store.appState.previewUrl" width="100%" height="100%" frameborder="0"></iframe>
                    </div>
                </div>
            </aside>
        </div>
    </div>
<?php
}
