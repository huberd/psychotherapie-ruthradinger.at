<div class="hs-dropdown" style="display: flex;justify-content: center; align-items: center; flex-basis: 20px;font-size: .85rem">
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
        <button x-bind:data-status="$store.appState.status_postCSS" x-ref="button" x-on:click="toggle()" :aria-expanded="open" :aria-controls="$id('dropdown-button')" type="button" class="hs-button" style="width: 100%; align-items: center; justify-content: center; font-size: inherit;">
                <svg class="hs-icon hs-icon-large">
                    <use href="#ii-postcss"></use>
                </svg>
        </button>

        <!-- Panel -->
        <div x-ref="panel" x-show="open" x-on:click.outside="close($refs.button)" :id="$id('dropdown-button')" class="absolute left-0 mt-2 w-40 rounded-md bg-white shadow-md" 
        style="--xyz-fs:.85rem; display:none;  align-items: center; justify-content: center; position: absolute;width: 400px; left:0%; top:120%; padding: .75rem; z-index: 10; background: var(--neutral-4); border-radius: .33rem; border: 1px solid var(--neutral-6)">
            <div>
                <h3>Post CSS</h3>
                <div><span>Status: </span><span x-text="$store.appState.status_postCSS"></span></div>
                <template x-for="p in $store.appState.postCSS.errors">
                   <div>
                    <div style="display: grid; grid-template-columns: auto 1fr; gap:.5rem">
                            <span>Name:</span>
                            <span x-text="p.name"></span>
                            <span>Reason:</span>
                            <span x-text="p.reason"></span>
                            <span>Message:</span>
                            <span x-text="p.message"></span>
                            <span>Details:</span>
                            <span x-text="p.datails"></span>
                        </div>
                   </div>
                </template>
            </div>
         

        </div>
    </div>
</div>