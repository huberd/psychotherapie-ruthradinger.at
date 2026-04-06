<?php
if (!defined('ABSPATH')) exit;

function hsf_framework_callback_function()
{
?>
    <div [data-wrapper] x-bind:class="{ 'fullscreen': $store.appView.fullscreen, 'sidebar--collapsed': $store.appView.sidebarCollapse }" x-data="$store.appView" x-init="$store.project.onInitErrorChecker()">
        <div id="colorpicker-wrapper" style="display:none">
            <div class="hs-tab-switch" x-show="$store.project.schemaToEdit != 'neutrals'" style="margin-bottom: var(--hs-padding-normal);">
                <button class="hs-button-tab active" x-bind:class="{ 'active': $store.colorWheel.tcpMode == 'picker' }" @click="$store.colorWheel.tcpMode = 'picker'">Picker</button>
                <button class="hs-button-tab" x-bind:class="{ 'active': $store.colorWheel.tcpMode == 'preset' }" @click="$store.colorWheel.tcpMode = 'preset'">Preset</button>
            </div>

            <div id="colorpicker-wrapper-accent" x-show=" $store.colorWheel.tcpMode == 'preset' && ($store.colorWheel.tcpEditing == 'brand' || $store.colorWheel.tcpEditing == 'customSchemaIndex')">
                <div x-show="true">
                   
                    <div class="schema-buttons-container" style="max-width: 250px;">
                        <template x-for="item in $store.project.schemaPresets[0].data">
                            <button class="schema-button" @click="$store.colorWheel.tcpValue = item.value; $store.colorWheel.tcpOnChange()" x-bind:style="`background-color:${item.value};`" x-bind:data-tippy-content="item.name"></button>
                        </template>
                    </div>
                </div>
            </div>

            <div id="colorpicker-wrapper-neutral" class="schema-buttons-container schema-neutral" x-show=" $store.colorWheel.tcpMode == 'preset'  && $store.colorWheel.tcpEditing == 'neutral'">
                <template x-for="item in $store.project.schemaPresets[1].data">
                    <button class="schema-button" @click="$store.colorWheel.tcpValue = item.value; $store.colorWheel.tcpOnChange()" x-bind:style="`background-color:${item.value}; position: relative; border-radius: .15rem;`" x-bind:data-tippy-content="item.name">
                        <div x-bind:style="`background-color:${item.base}; position: absolute; right: 0; top:0; width: 8px; height: 100%`"></div>
                    </button>
                </template>
            </div>
           <div  x-show=" $store.colorWheel.tcpMode == 'picker'">
             <?php require_once 'Views/Partials/tippy-colorpicker.php'; ?>
           </div>
        </div>

        <div class="headspin-app">
            <template x-if="$store.appView.playgroundMode">
                <div id="playground"><?php require_once 'Views/Playground.php'; ?></div>
            </template>

            <div class="headspin-loader">
                <div>
                    <svg width="120" height="120" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="var(--neutral-12)">
                        <g fill="none" fill-rule="evenodd" stroke-width="1">
                            <circle cx="22" cy="22" r="1">
                                <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />
                                <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />
                            </circle>
                            <circle cx="22" cy="22" r="1">
                                <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />
                                <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />
                            </circle>
                        </g>
                    </svg>
                </div>
            </div>

            <div class="headspin-small-screen-protection">
                <h2>App is not intended to use on mobile</h2>
                <p>Please open application on proper device</p>
            </div>

            <div data-headspin="Icons Holder" style="display: none;">
                <?php require_once 'Icons.php'; ?>
            </div>

            <header class="headspin-header" style="gap: .25rem;">
                <div class="hs-head" style="width: var(--hs-sidebar-width); display: flex; border-right: var(--hs-border); box-sizing: border-box; padding: var(--hs-padding-normal);">
                    <div class="row" style="justify-content: center; align-items: center; height: 100%; padding: 6px 0px; gap: var(--hs-padding-normal);">
                        <svg class="hs-icon hs-icon-large">
                            <use href="#ii-headspin-logo"></use>
                        </svg>
                        <div class="sidebar-tab-name" style="font-size: var(--hs-text-normal); display: flex;">
                            <span>Headspin</span>
                            <span style="font-size: 12px; transform: translate(22%, -20%)" x-bind:data-license-v="Alpine.store('project').access.type">v<?php echo esc_html(HSF_VERSION); ?></span>
                        </div>
                    </div>
                </div>

                <div style="padding: var(--hs-padding-normal); display: flex; flex-grow:1; ">
                    <?php require_once 'Views/Partials/color-palette-topbar.php'; ?>

                    <a id="hs-wp" data-tippy-content="Back to WordPress" x-bind:href="$store.appView.adminUrl" x-bind:target="'_self'" class="hs-ghost-button">
                        <svg class="hs-icon hs-icon-large loading-icon">
                            <use href="#ii-wp"></use>
                        </svg>
                    </a>

                    <div class="hs-vspacer pull-right"></div>

                    <?php require_once 'Views/Typography.php'; ?>
                    <?php require_once 'Views/Spacing.php'; ?>
                    <?php require_once 'Views/Partials/inbox.php'; ?>
                    <?php require_once 'Views/Partials/dynamic-theme-directives.php'; ?>
                    <?php require_once 'Views/Partials/sonner-toast.php'; ?>

                    <button class="hs-ghost-button relative" @click="$store.project.inbox.show = true">
                        <svg class="hs-icon hs-icon-large loading-icon">
                            <use href="#ii-inbox"></use>
                        </svg>
                        <span class="inbox-count" x-show="Number($store.project.inbox.errors.length * 1 + $store.project.inbox.warnings.length * 1) > 0" x-text="$store.project.inbox.errors.length + $store.project.inbox.warnings.length"></span>
                    </button>

                    <button class="hs-ghost-button" @click="$store.appView.playgroundMode = !$store.appView.playgroundMode;" x-show="$store.project.access.type == 'pro'">
                        <svg class="hs-icon hs-icon-large loading-icon">
                            <use href="#ii-playground"></use>
                        </svg>
                    </button>

                    <button data-tippy-content="Sync color changes with builder palette" @click="$store.sync.syncInProgress = true" class="hs-ghost-button">Sync</button>
                    <?php require_once 'Views/Sync.php'; ?>

                    <button id="hs-fullscreen" x-bind:class="{ 'active': $store.appView.fullscreen }" @click="$store.appView.fullscreen = !$store.appView.fullscreen" class="hs-ghost-button">
                        <svg class="hs-icon hs-icon-large loading-icon">
                            <use href="#ii-fullscreen"></use>
                        </svg>
                    </button>

                    <div class="hs-vspacer"></div>

                    <button id="hs-save-button" @click="headspinSave()" class="hs-button button-has-loader">
                        <div class="normal-icon">Save</div>
                        <svg class="hs-icon hs-icon-large loading-icon">
                            <use href="#ii-loading"></use>
                        </svg>
                    </button>
                </div>
            </header>

            <aside class="headspin-sidebar relative">
                <?php require_once 'Views/Sidebar.php'; ?>
            </aside>

            <div class="headspin-iframebuilder">
                <iframe id="twp-iframe-light" @load="Alpine.store('iframe').setMode2('light', $event);" src="javascript:void(0)" srcdoc="<div id='test-light' data-hsx='light'>Light</div><div id='test-dark' data-hsx='dark'>Dark</div>" sandbox="allow-scripts allow-same-origin" frameborder="0"></iframe>
            </div>

            <main class="headspin-main" x-bind:data-tab="$store.appView.activeTab">
                <div x-show="$store.appView.activeSubtab == 'false'">
                    <div id="project" x-show="$store.appView.activeTab === 'project'"><?php require_once 'Views/Project.php'; ?></div>
                    <div id="theme" x-show="$store.appView.activeTab === 'theme'"><?php require_once 'Views/Theme.php'; ?></div>
                    <div id="color_schema" x-show="$store.appView.activeTab === 'schema'"><?php require_once 'Views/Color_schema.php'; ?></div>
                    <div id="vars_colors" x-show="$store.appView.activeTab === 'vars_colors'"><?php require_once 'Views/Custom_vars_colors.php'; ?></div>
                </div>
            </main>
        </div>
    </div>
<?php
}

