<div class="hs-dropdown" style="display: flex;justify-content: center; align-items: center; flex-basis: 20px;  font-size: .85rem">
    <div x-data="{
            open: false,
            toggle() {
                if (this.open) {
                    return this.close()
                }
                Alpine.store('action').iframeCover = true;
                this.$refs.button.focus()
 
                this.open = true
            },
            close(focusAfter) {
                if (! this.open) return
                Alpine.store('action').iframeCover = false;
                this.open = false
 
                focusAfter && focusAfter.focus()
            }
        }" x-on:keydown.escape.prevent.stop="close($refs.button)" x-on:focusin.window="! $refs.panel.contains($event.target) && close()" x-id="['dropdown-button']" style="position: relative;width:100%">
        <!-- Button -->
        <button x-bind:data-status="$store.appState.status_validator" x-ref="button" x-on:click="toggle()" :aria-expanded="open" :aria-controls="$id('dropdown-button')" type="button" class="hs-button" style="width: 100%; align-items: center; justify-content: center; font-size: inherit;">
            <svg class="hs-icon hs-icon-large">
                <use href="#ii-validator"></use>
            </svg>
        </button>

        <!-- Panel -->
        <div x-ref="panel" x-show="open" x-on:click.outside="close($refs.button)" :id="$id('dropdown-button')" class="absolute left-0 mt-2 w-40 rounded-md bg-white shadow-md" style="--xyz-fs:.85rem; display:none;  align-items: center; justify-content: center; position: absolute; width: 60vw; left:0%; top:120%; padding: .75rem; z-index: 10; background: var(--neutral-4); border-radius: .33rem; border: 1px solid var(--neutral-6)">
            <div>
                <h3>CSS Validator</h3>
                <div><span>Status: </span><span x-text="$store.appState.status_validator"></span></div>
              <div style="display: grid; grid-template-rows: 1fr 3fr">
              <div>
                    <template x-for="v in $store.appState.validator.errors">
                        <div>
                            <div style="display: grid; grid-template-columns: auto 1fr; gap:.5rem">
                                <span>Error Line:</span>
                                <span x-text="v.line"></span>
                                <span>Message:</span>
                                <span x-text="v.message"></span>
                            </div>
                        </div>
                    </template>
                </div>
                <div id="hscm-validate"></div>
              </div>
               
            </div>


        </div>
    </div>
</div>