<div class="hs-dropdown" style="display: flex;justify-content: center; align-items: center; flex-basis: 200px; margin-inline: auto; font-size: .85rem">
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
        <button x-ref="button" x-on:click="toggle()" :aria-expanded="open" :aria-controls="$id('dropdown-button')" type="button" class="hs-button" style="width: 100%; align-items: center; justify-content: center; font-size: inherit;">
            /Home


        </button>

        <!-- Panel -->
        <div x-ref="panel" x-show="open" x-on:click.outside="close($refs.button)" :id="$id('dropdown-button')" class="absolute left-0 mt-2 w-40 rounded-md bg-white shadow-md" 
        style="--xyz-fs:.85rem; display:none;  align-items: center; justify-content: center; position: absolute;transform: translateX(-50%); width: 500px; left:50%; top:120%; padding: .75rem; z-index: 10; background: var(--neutral-4); border-radius: .33rem; border: 1px solid var(--neutral-6)">
            <div  class="hs-input-row hs-input" style="display: flex">
                <label for="iframeurl" style="font-size:var(--xyz-fs)">Preview URL</label>
                <input id="iframeurl" name="iframeurl" style="font-size:1em" class="hs-input" type="text" x-model="$store.appState.previewUrl">
            </div>
            <div class="hs-input-row" style="display: flex">
                <label for="autoreload" style="font-size:var(--xyz-fs)">Auto Reload</label>
                <input id="autoreload" name="autoreload" style="font-size:19px" class="hs-switch-input" type="checkbox" x-model="$store.appState.previewLiveReload">
            </div>
            <div style="margin-top: 1rem; margin-bottom: 1rem; height: 1px; width:100%; background: var(--neutral-6)"></div>
         

        </div>
    </div>
</div>