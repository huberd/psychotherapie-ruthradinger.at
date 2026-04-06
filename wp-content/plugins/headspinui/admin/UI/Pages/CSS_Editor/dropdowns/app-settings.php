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
        <button x-ref="button" x-on:click="toggle()" :aria-expanded="open" :aria-controls="$id('dropdown-button')" type="button" class="hs-button" style="width: 100%; align-items: center; justify-content: center; font-size: inherit;">
            Settings
        </button>

        <!-- Panel -->
        <div x-ref="panel" x-show="open" x-on:click.outside="close($refs.button)" :id="$id('dropdown-button')" class="absolute dropdown-panel dropdown-with-left-sidebar" style="--xyz-fs:.85rem; display:none;  align-items: center; justify-content: center; position: absolute; width: 500px; left:0%; top:120%; padding: 1.25rem 2rem; z-index: 10; background: var(--neutral-4); border-radius: .33rem; border: 1px solid var(--neutral-6)">

            <div x-data="{ settingsTab :  'interface ' }" style="display:grid; grid-template-columns: auto 1fr;" x-init=" settingsTab =  'interface'">
                <div style=" border-right: 1px solid var(--neutral-6);">
                    <button @click="settingsTab = 'interface'" class="hs-tab" x-bind:class="{ 'active': settingsTab == 'interface' }">Interface</button>
                    <button @click="settingsTab = 'tools'" class="hs-tab" x-bind:class="{ 'active': settingsTab == 'tools' }">Toolchain</button>
                </div>
                <div style="padding: 1rem;">
                    <div x-show="settingsTab == 'interface'">
                        <div class="hs-input-row hs-input" style="display: flex">
                            <label for="iframewidth" style="font-size:var(--xyz-fs)">Application Theme</label>
                            <div class="project-borders-group">
                                <button class="hs-button hs-button-radio active" @click="$store.appState.theme = 'light';$store.action.editorThemeSetter()" :class="{ 'active': 'light' == $store.appState.theme }">
                                    <svg class="hs-icon hs-icon-large">
                                        <use href="#ii-sun"></use>
                                    </svg>
                                    Light
                                </button>
                                <button class="hs-button hs-button-radio" @click="$store.appState.theme = 'dark';$store.action.editorThemeSetter()" :class="{ 'active': 'dark' == $store.appState.theme }">
                                    <svg class="hs-icon hs-icon-large">
                                        <use href="#ii-moon"></use>
                                    </svg>
                                    Dark
                                </button>
                            </div>
                        </div>
                        <div class="hs-input-row hs-input">
                            <p>Light Editor Theme</p>
                            <select x-on:change="$store.action.editorThemeSetter()" style="background: var(--hs-darker); border: var(--hs-border); color: var(--hs-text-70); padding: 2px 12px;" class="hs-select" x-model="$store.appState.lightEditor">
                                <template x-for="(theme, index) in editorThemes" :key="theme.key">
                                    <option x-text="theme.name" :selected="theme.key == $store.appState.lightEditor" x-bind:value="theme.key"></option>
                                </template>
                            </select>
                        </div>
                        <div class="hs-input-row hs-input">
                            <p>Dark Editor Theme</p>
                            <select x-on:change="$store.action.editorThemeSetter()" style="background: var(--hs-darker); border: var(--hs-border); color: var(--hs-text-70); padding: 2px 12px;" class="hs-select" x-model="$store.appState.darkEditor">
                                <template x-for="(theme, index) in editorThemes" :key="theme.key">
                                    <option x-text="theme.name" :selected="theme.key == $store.appState.darkEditor" x-bind:value="theme.key"></option>
                                </template>
                            </select>
                        </div>
                    </div>
                    <div x-show="settingsTab == 'tools'">
                        <div class="toolchain"> 
                            <div class="toolchain-tool">Input</div>
                            <div class="toolchain-tool" x-bind:data-status="$store.appState.status_postCSS">PostCSS</div>
                            <div class="toolchain-tool" >CSS</div>
                            <div class="toolchain-tool toolToggle" x-bind:data-toolToggle="$store.appState.toolchainValidator" @click="$store.appState.toolchainValidator = !$store.appState.toolchainValidator" x-bind:data-status="$store.appState.status_validator">Validation</div>
                            <div class="toolchain-tool toolToggle" x-bind:data-toolToggle="$store.appState.toolchainMinify" @click="$store.appState.toolchainMinify = !$store.appState.toolchainMinify">Minify</div>
                            <div class="toolchain-tool">Output</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>