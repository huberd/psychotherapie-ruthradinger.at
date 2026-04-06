<section x-data="{inbox: $store.project.inbox}" x-show="inbox.show" class="edit-tokens-modal" style="backdrop-filter: unset;">
            <div @click="inbox.show = false;" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: -1;"></div>
            <div class="edit-tokens-modal-window">
                <div class="edit-tokens-modal-window--header">
                    <span>Notification Center</span>
                    <button class="hs-dashed-button" style="margin-left: .75rem" @click="inbox.errors.length = 0;inbox.warnings.length = 0;">Clear All</button>
                    <button class="red-close-dot" @click="inbox.show = false;"><span></span></button>
                </div>
               
                <div class="edit-tokens-modal-window--body">
                    <div x-show="inbox.errors.length == 0 && inbox.warnings.length == 0" style="padding: .5rem;">
                        <div>Inbox is empty!</div>
                    </div>
                   <template x-for="err in inbox.errors">
                    <div class="inbox-err-msg">
                        <div class="inbox-err-title" x-text="err.level + err.title"></div>
                        <div class="inbox-err-desc" x-text="err.message"></div>
                    </div>
                   </template>
                   <template x-for="err in inbox.warnings">
                    <div class="inbox-err-msg">
                        <div class="inbox-err-title" x-text="err.level + err.title"></div>
                        <div class="inbox-err-desc" x-text="err.message"></div>
                    </div>
                   </template>

                </div>
                  
            </div>
        </section>