<section x-show="editGroup" class="edit-tokens-modal" >
            <div @click="editGroup = false;" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: -1;"></div>
            <div class="edit-tokens-modal-window" @click.outside="editGroup = false;">
                <div class="edit-tokens-modal-window--header">
                    <span>Editing Group</span>
                    <button class="red-close-dot" @click="editGroup = false;"><span></span></button>
                </div>
                <div class="edit-tokens-modal-window--body">
                    <div class="token-edit-input-group token-control-group">
                        <label for="grouplabel">Label</label>
                        <input id="grouplabel" name="grouplabel" type="text" x-model="itemGroup.name" class="hs-input-input">
                    </div>
                    <div class="token-edit-input-group token-control-group" style="flex-direction: row;flex-wrap: wrap;">
                        <template x-for="icon in $store.project.tokenIcons">
                            <button class="icon-picker-button" x-bind:class="{ 'active': itemGroup.icon == icon.value }" @click="itemGroup.icon = icon.value">
                                <svg class="hs-icon hs-icon-large">
                                    <use x-bind:href="'#' + icon.value"></use>
                                </svg>
                            </button>
                        </template>
                    </div>
                </div>
                  
            </div>
        </section>