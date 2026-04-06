<?php
if (!defined('ABSPATH')) exit;
?>
<div class="hs-menu-tab" style="display: flex;flex-direction: column; margin-bottom: auto;">
    <template x-for="item in $store.appView.tabs">
        <button x-data="" class="hs-tab" :class="{ 'active': $store.appView.activeTab === item.id }" @click="$store.appView.activeTab = item.id; $store.appView.switchTab(item.id)">
            <svg class="hs-icon hs-icon-large">
                <use x-bind:href="item.svg"></use>
            </svg>
            <span class="sidebar-tab-name" x-text="item.name"></span>
        </button>
    </template>
</div>
<div class="hs-foot">
    <div class="hs-sideabr-options">
        <?php \Headspin\Components\themeSwitcher(); ?>
        <button data-tippy-content="Collapse Headspin menu" @click="$store.appView.sidebarCollapse = !$store.appView.sidebarCollapse" class="hs-ghost-button">
            <svg class="hs-icon hs-icon-large loading-icon">
                <use href="#ii-sidebar-left"></use>
            </svg>
        </button>
    </div>
    <p style="display: none;">Copryght Headspin</p>
</div>