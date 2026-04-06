<div class="token-control-group token-linked-disable">
    <div x-show="itemVar.method == 'colorTable'" class="grid" style="grid-template-columns: 1fr 1fr; gap:1rem;">
        <div class="token-edit-input-group token-control-group">
            <label for="tokenLight">Light</label>
            <input id="tokenLight" name="tokenLight" type="text" x-model="itemVar.light" class="hs-input-input">
        </div>
        <div class="token-edit-input-group token-control-group">
            <label for="tokenDark">Dark</label>
            <input id="tokenDark" name="tokenDark" type="text" x-model="itemVar.dark" class="hs-input-input">
        </div>
    </div>
    <?php include_once('token-contrast.php') ?>
    <div x-show="itemVar.method == 'fluid2'">
        <div class="token-edit-input-group token-control-group">
            <label for="tokenFluidMin">Min</label>
            <input id="tokenFluidMin" x-on:change="headspinRegenerate()" name="tokenFluidMin" type="text" x-model="itemVar.fluidMin" class="hs-input-input">
        </div>
        <div class="token-edit-input-group token-control-group">
            <label for="tokenFluidMax">Max</label>
            <input id="tokenFluidMax" x-on:change="headspinRegenerate()" name="tokenFluidMax" type="text" x-model="itemVar.fluidMax" class="hs-input-input">
        </div>
    </div>
    <div x-show="itemVar.method =='plainText'">
        <div class="token-edit-input-group token-control-group">
            <label for="tokenPlainText">Value</label>
            <input id="tokenPlainText" name="tokenPlainText" type="text" x-model="itemVar.plainText" class="hs-input-input">
        </div>
    </div>
</div>