<?php
if (!defined('ABSPATH')) exit;
?>
<!-- Font-size -->
<div class="hs-token-table">
    <div class="hs-token-section" style="flex:1">
        <div class="hs-token-group">Font size</div>
        <div class="hs-token-table-row">
            <template x-for="(token, index) in $store.typography.output" :key="index">
                <div class="hs-token-single-row grid" x-bind:style="`grid-template-columns: repeat(${$store.theme.themeCount()}, 1fr)`">
                    <div class="hs-token-table-item hs-token-name-column" style="flex:1">
                        <svg class="hs-icon hs-icon-large">
                            <use x-bind:href="`#ii-typography`"></use>
                        </svg>
                        <div>
                            <span>text.</span><span x-text="token.font"></span>
                        </div>
                    </div>
                    <div class="hs-token-table-item" style="flex:1">
                        <span x-text="(token.max * 16).toFixed(0) + 'px'"></span>
                        <span>
                            <=>
                        </span>
                        <span x-text="(token.min * 16).toFixed(0) + 'px'"></span>
                    </div>
                </div>
            </template>
        </div>
    </div>
</div>
<!-- Space -->
<div class="hs-token-table">
    <div class="hs-token-section" style="flex:1">
        <div class="hs-token-group">Spacing</div>
        <div class="hs-token-table-row">
            <template x-for="(token, index) in $store.space.output" :key="index">
                <div class="hs-token-single-row grid" x-bind:style="`grid-template-columns: repeat(${$store.theme.themeCount()}, 1fr)`">
                    <div class="hs-token-table-item hs-token-name-column" style="flex:1">
                        <svg class="hs-icon hs-icon-large">
                            <use x-bind:href="`#ii-size`"></use>
                        </svg>
                        <div>
                            <span>space.</span><span x-text="token.prefix"></span>
                        </div>
                    </div>
                    <div class="hs-token-table-item" style="flex:1">
                        <span x-text="(token.max * 16).toFixed(0) + 'px'"></span>
                        <span>
                            <=>
                        </span>
                        <span x-text="(token.min * 16).toFixed(0) + 'px'"></span>
                    </div>
                </div>
            </template>
        </div>
    </div>
</div>
<!-- Section/Space -->
<div class="hs-token-table">
    <div class="hs-token-section" style="flex:1">
        <div class="hs-token-group">Section spacing</div>
        <div class="hs-token-table-row">
            <template x-for="(token, index) in $store.space.outputSection" :key="index">
                <div class="hs-token-single-row grid" x-bind:style="`grid-template-columns: repeat(${$store.theme.themeCount()}, 1fr)`">
                    <div class="hs-token-table-item hs-token-name-column" style="flex:1">
                        <svg class="hs-icon hs-icon-large">
                            <use x-bind:href="`#ii-size`"></use>
                        </svg>
                        <div>
                            <span>section.space.</span><span x-text="token.prefix"></span>
                        </div>
                    </div>
                    <div class="hs-token-table-item" style="flex:1">
                        <span x-text="(token.max * 16).toFixed(0) + 'px'"></span>
                        <span>
                            <=>
                        </span>
                        <span x-text="(token.min * 16).toFixed(0) + 'px'"></span>
                    </div>
                </div>
            </template>
        </div>
    </div>
</div>
<!-- Radius -->
<div class="hs-token-table">
    <div class="hs-token-section" style="flex:1">
        <div class="hs-token-group">Radius</div>
        <div class="hs-token-table-row">
            <template x-for="(token, index) in $store.radius.output" :key="index">
                <div class="hs-token-single-row grid" x-bind:style="`grid-template-columns: repeat(${$store.theme.themeCount()}, 1fr)`">
                    <div class="hs-token-table-item hs-token-name-column" style="flex:1">
                        <svg class="hs-icon hs-icon-large">
                            <use x-bind:href="`#ii-border`"></use>
                        </svg>
                        <div>
                            <span>radius.</span><span x-text="token.name"></span>
                        </div>
                    </div>
                    <div class="hs-token-table-item" style="flex:1">
                        <span x-text="token.value"></span><span x-text="token.unit"></span>
                    </div>
                </div>
            </template>
        </div>
    </div>
</div>
<!-- Shadows -->
<div class="hs-token-table">
    <div class="hs-token-section" style="flex:1">
        <div class="hs-token-group">Shadows</div>
        <div class="hs-token-table-row">
            <template x-for="(token, index) in $store.shadows.output" :key="index">
                <div class="hs-token-single-row grid" x-bind:style="`grid-template-columns: repeat(${$store.theme.themeCount()}, 1fr)`">
                    <div class="hs-token-table-item hs-token-name-column" style="flex:1">
                        <svg class="hs-icon hs-icon-large">
                            <use x-bind:href="`#ii-border`"></use>
                        </svg>
                        <div>
                            <span>shadow.</span><span x-text="token.name"></span>
                        </div>
                    </div>
                    <div class="hs-token-table-item" style="flex:1">
                        <span x-text="$store.shadows.getShadowValue(token.value)"></span>
                    </div>
                </div>
            </template>
        </div>
    </div>
</div>