<?php
if (!defined('ABSPATH')) exit;
?>
<div class="hs-theme-sidebar">
    <div>
            <div class="row" style="font-size: var(--hs-text-normal);gap: var(--hs-padding-normal);">
                <svg class="hs-icon hs-icon-large">
                    <use href="#ii-folder"></use>
                </svg>
                <div  style="flex:1">Globals</div>
            </div>
            <div style="padding: var(--hs-padding-normal);margin-left: var(--hs-padding-small);border-left: var(--hs-border);margin-top: var(--hs-padding-normal);padding-top: 0;display: flex;gap: var(--hs-padding-small);flex-direction: column;">
                <template x-for="(item, index) in $store.theme.global.system" :key="index">
                    <div>
                        <span x-text="item.name" style="text-transform: capitalize;font-size: var(--hs-text-small);"></span>
                    </div>
                </template>
            </div>
    </div>
</div>