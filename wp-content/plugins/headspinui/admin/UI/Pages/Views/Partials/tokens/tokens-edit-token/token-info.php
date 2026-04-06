<div class="token-edit-input-group token-control-group token-linked-disable">
    <label for="tokenlabel">Label</label>
    <input id="tokenlabel" name="tokenlabel" type="text" x-model="itemVar.label" class="hs-input-input">
</div>
<div class="token-edit-input-group token-control-group token-system-disable">
    <label for="tokenValue">CSS Variable</label>
    <input id="tokenValue" x-show="!itemGroup.convention || itemVar.system" name="tokenValue" type="text" x-model="itemVar.cssVar" x-on:input.debounce="$store.project.token_validate_css_var(itemGroup, itemVar )" class="hs-input-input">
    <div x-show="itemGroup.convention && !itemVar.system" class="system-cssvar">
        <div class="system-cssvar-input-grid" x-show="!itemVar.system">
            <div x-text="itemGroup.convention" style="flex-shrink: 0;"></div>
            <input type="text" x-model="itemVar.sysVar" x-on:input.debounce="$store.project.token_validate_css_var_partial(itemGroup, itemVar )" class="hs-input-input">
        </div>
        <div style="opacity: .75;"><span>Preview: </span><span x-text="itemVar.cssVar"></span></div>
    </div>
</div>
<div class="token-control-group token-linked-disable">
    <div>
        <span>Type</span>
    </div>
    <div class="token-group-button">
        <button class="hs-button-gtoken" @click="itemVar.method = 'colorTable'" x-bind:class="{'active': itemVar.method == 'colorTable'}">Color</button>
        <button class="hs-button-gtoken" @click="itemVar.method = 'fluid2'" x-bind:class="{'active': itemVar.method == 'fluid2'}">Fluid</button>
        <button class="hs-button-gtoken" @click="itemVar.method = 'plainText'" x-bind:class="{'active': itemVar.method == 'plainText'}">Plain</button>
    </div>
</div>
<div class="token-control-group" x-show="itemVar.system">
    <div>
        <span>Linked</span>
    </div>
    <div class="token-group-button">
        <button class="hs-button-gtoken" @click=" itemVar.linked = true" x-bind:class="{'active': itemVar.linked == true}">Linked</button>
        <button class="hs-button-gtoken" @click=" itemVar.linked = false" x-bind:class="{'active': itemVar.linked == false}">Unlinked</button>
    </div>
</div>