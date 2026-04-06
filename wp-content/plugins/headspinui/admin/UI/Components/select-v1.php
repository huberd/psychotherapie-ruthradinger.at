<?php
namespace Headspin\Components;
if (!defined('ABSPATH')) exit;

function select_v1($store, $options)
{
?>
    <div class="hs-select-scale"
        x-data="{
            dropdownOpen: false,
            selectValue:  <?php echo esc_attr($store); ?>,
            focusedElementIndex: -1,
            dropdownToggle() {
                if (this.dropdownOpen) {
                    return this.close()
                }
                let selector = `[data-value='${this.selectValue}']`;
                this.$refs.button.focus()
                this.dropdownOpen = true;
                setTimeout(()=>{
                    if($refs.panel.querySelector('.hs-button.hs-button-radio.active')){
                        $refs.panel.querySelector('.hs-button.hs-button-radio.active').focus()
                    }
                    else if($refs.panel.querySelector(selector)){
                        $refs.panel.querySelector(selector).classList.add('active')
                    }
                },100)             
            },
            close(focusAfter) {
                if (! this.dropdownOpen) return
 
                this.dropdownOpen = false
 
                focusAfter && focusAfter.focus()
                this.$refs.button.focus()
            },
            selectableItemActiveNext(){
                let list = this.$refs.panel.querySelectorAll('.hs-button');
                let activeElement = document.activeElement.closest('.hs-button-focus') || this.$refs.panel.querySelector('.hs-button.hs-button-radio.active');
                let nextIndex = [...list].indexOf(activeElement) + 1;
                if(nextIndex > list.length - 1) return list[0].focus();
                list[nextIndex].focus();
            },
            selectableItemActivePrevious(){
                let list = this.$refs.panel.querySelectorAll('.hs-button');
                let activeElement = document.activeElement.closest('.hs-button-focus') || this.$refs.panel.querySelector('.hs-button.hs-button-radio.active');
                let nextIndex = [...list].indexOf(activeElement) - 1;
                if(nextIndex < 0) return list[list.length - 1].focus();
                list[nextIndex].focus();
            }
        }"
        x-on:keydown.escape.prevent.stop="close($refs.button)"
        x-on:focusin.window="! $refs.panel.contains($event.target) && close()"
        x-id="['dropdown-button']"
        @keydown.down="if(dropdownOpen){ selectableItemActiveNext(); } else { dropdownOpen=true; } event.preventDefault();"
        @keydown.up="if(dropdownOpen){ selectableItemActivePrevious(); } else { dropdownOpen=true; } event.preventDefault();"
        @keydown.enter="selectOpen=false;">
        <button 
            class="hs-button-select"
            x-ref="button"
            x-on:click="dropdownToggle();"
            :aria-expanded="dropdownOpen"
            :aria-controls="$id('dropdown-button')"
            type="hs-button">
            <div x-text="<?php echo esc_attr($store); ?>"></div>
            <!-- Heroicon: chevron-down -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>
      
        <div class="hs-select-scale-dropdown-panel"
            x-ref="panel"
            x-show="dropdownOpen"
            x-transition.origin.top.left
            x-on:click.outside="close($refs.button)"
            :id="$id('dropdown-button')"
            style="display: none;">
            <div class="headspin-select-dropdown-body" x-ref="dropdownlist">
                <template x-for="(scale, index) in <?php echo esc_attr($options); ?> " :key="index">
                    <button x-text="scale" class="hs-button hs-button-focus hs-button-radio" x-bind:data-value="scale" x-bind:class="{ 'active':<?php echo esc_attr($store); ?> == scale }" @click=" <?php echo esc_attr($store); ?> = scale; headspinRegenerate()"></button>
                </template>
            </div>
        </div>
        <div x-show="$store.pd.typographyMinCustomScale">
            <input x-model="$store.pd.typographyMinCustomScale" type="text">
            <button>X</button>
        </div>

    </div>
<?php
}