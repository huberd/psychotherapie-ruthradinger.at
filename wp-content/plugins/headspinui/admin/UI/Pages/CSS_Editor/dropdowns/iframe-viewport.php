<div class="hs-dropdown" style="display: flex;justify-content: center; align-items: center; flex-basis: 20px; font-size: .85rem">
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
        <button x-ref="button" x-on:click="toggle()" :aria-expanded="open" 
            :aria-controls="$id('dropdown-button')" type="button" class="hs-button" 
            style="width: 100%; align-items: center; justify-content: center; font-size: inherit;">
            <span id="pxwidth">780px</span> 
            <span id="zoom">100%</span>


        </button>

        <!-- Panel -->
        <div x-ref="panel" x-show="open" x-on:click.outside="close($refs.button)" :id="$id('dropdown-button')" class="absolute left-0 mt-2 w-40 rounded-md bg-white shadow-md" 
        style="--xyz-fs:.85rem; display:none;  align-items: center; justify-content: center; position: absolute;transform: translateX(-50%); width: 500px; left:50%; top:120%; padding: .75rem; z-index: 10; background: var(--neutral-4); border-radius: .33rem; border: 1px solid var(--neutral-6)">
            <div  class="hs-input-row hs-input" style="display: flex">
                <label for="iframewidth" style="font-size:var(--xyz-fs)">Preview Width</label>
                <input id="iframewidth" name="iframewidth" style="font-size:1em" class="hs-input" type="text" x-model="$store.appState.previewWidth" x-on:change="_resizeCallback()">
            </div>
            <div style="margin-top: 1rem; margin-bottom: 1rem; height: 1px; width:100%; background: var(--neutral-6)"></div>
            <div style="display: flex; flex-direction: column; gap:.75rem">
                <p>Media queries</p>
                <div style="display: flex; gap:.5rem;">
                    
                    <button @click="$store.action.generateMQ('above')">Media Above</button>
                    <button @click="$store.action.generateMQ('below')">Media Below</button>
                </div>
            </div>
            <div style="margin-top: 1rem; margin-bottom: 1rem; height: 1px; width:100%; background: var(--neutral-6)"></div>
            <div style="display: flex; flex-wrap: wrap; gap: .5rem">
                <button @click="$store.app.setIframeWidth(2560)">2560px</button>
                <button @click="$store.app.setIframeWidth(1800)">1800px</button>
                <button @click="$store.app.setIframeWidth(1366)">1366px</button>
                <button @click="$store.app.setIframeWidth(920)">920px</button>
                <button @click="$store.app.setIframeWidth(780)">780px</button>
                <button @click="$store.app.setIframeWidth(640)">640px</button>
                <button @click="$store.app.setIframeWidth(480)">480px</button>
                <button @click="$store.app.setIframeWidth(360)">360px</button>
                <button @click="$store.app.setIframeWidth('responsive')">Responsive</button>
            </div>

        </div>
    </div>
</div>