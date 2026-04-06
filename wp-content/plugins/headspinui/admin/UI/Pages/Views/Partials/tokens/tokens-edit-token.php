<section x-show="editVariable" class="edit-tokens-modal">
    <div @click="editVariable = false;" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: -1;"></div>
    <div class="edit-tokens-modal-window" x-bind:class="{ 'token-system': itemVar.system, 'token-linked': itemVar.linked }" x-bind:data-sysvar="itemVar.system" @click.outside="editVariable = false;">
        <div class="edit-tokens-modal-window--header">
            <span>Editing Token</span>
            <button class="red-close-dot" @click="editVariable = false;"><span></span></button>
        </div>
        <div class="edit-tokens-modal-window--body">
            <?php include_once('tokens-edit-token/token-info.php') ?>
            <?php include_once('tokens-edit-token/token-fluid-preview.php') ?>
            <?php include_once('tokens-edit-token/token-value.php') ?>
            <?php include_once('tokens-edit-token/token-desc.php') ?>
        
        </div>

    </div>
</section>