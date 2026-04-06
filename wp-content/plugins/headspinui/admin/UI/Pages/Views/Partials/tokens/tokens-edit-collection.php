<section x-show="editCollection" class="edit-tokens-modal">
    <div @click="editCollection = false;" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: -1;"></div>
    <div class="edit-tokens-modal-window" @click.outside="editCollection = false;">
        <div class="edit-tokens-modal-window--header">
            <span>Editing Collection</span>
            <button class="red-close-dot" @click="editCollection = false;"><span></span></button>
        </div>
        <div class="edit-tokens-modal-window--body">
            <div class="token-edit-input-group token-control-group">
                <label for="collectionlabel">Label</label>
                <input id="collectionlabel" name="collectionlabel" type="text" x-model="itemCollection.name" class="hs-input-input">
            </div>
            <div class="token-edit-input-group token-control-group" style="flex-direction: row;flex-wrap: wrap;">
                <template x-for="icon in $store.project.tokenIcons">
                    <button class="icon-picker-button" x-bind:class="{ 'active': itemCollection.icon == icon.value }" @click="itemCollection.icon = icon.value">
                        <svg class="hs-icon hs-icon-large">
                            <use x-bind:href="'#' + icon.value"></use>
                        </svg>
                    </button>
                </template>
            </div>
            <div class="token-edit-input-group token-control-group" style="flex-direction: row;flex-wrap: wrap; margin-top: 1rem">
                <button class="swal-button swal-button--delete" @click="editCollection = false; $store.project.tokens__DeleteCollection(c)">Delete Collection</button>
            </div>
        </div>

    </div>
</section>