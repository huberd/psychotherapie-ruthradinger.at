<?php if (!defined('ABSPATH')) exit;
function headspin_license_page_init()
{
?>
    <header>
        <svg class="hs-icon hs-icon-large">
            <use href="#ii-key"></use>
        </svg>
        <span>License</span>

    </header>
    <div x-data="{ license: $store.license_store}" x-init=" license.onInit() ">
        <label for="headspin-license-key">
            <h3 class="hs-h"><?php esc_html_e('Activate license'); ?></h3>
            <p class="hs-p"><?php esc_html_e('Activate or change your license key'); ?></p>
        </label>
        <div class="hs-input">
            <input type="password" class="regular-text" id="headspin_edd_license_key" name="headspin_edd_license_key" x-model="license.key" />
        </div>
        <div style="margin-top: 1rem;">
            <button class="hs-button-action" id="headspin-activate-license" x-show="license.status != 'valid' ">
                <svg class="hs-icon hs-icon-small">
                    <use href="#ii-key"></use>
                </svg>
                <span><?php esc_html_e('Activate License'); ?></span>
            </button>
            <button class="hs-button-action" id="headspin-deactivate-license" x-show="license.status == 'valid' ">
                <svg class="hs-icon hs-icon-small">
                    <use href="#ii-key"></use>
                </svg>
                <span><?php esc_html_e('Deactivate License'); ?></span>
            </button>

        </div>
    </div>
    <div class="settings-spacer-1"></div>
    <div style="font-size: 1rem; margin-top: 1rem; display: flex; flex-direction: column; gap: .75rem">
        <div style="display: grid; gap:.33rem; align-items: center; grid-template-columns: 100px 1fr;">
            <span style="flex-basis: 150px;">Version:</span>
            <span style="width: fit-content;" x-bind:data-license="license.version" class="license-status-badge"><span class="status-dot"></span><span x-text="license.version"></span></span>
        </div>
        <div style="display: grid; gap:.33rem; align-items: center; grid-template-columns: 100px auto;">
            <span  style="flex-basis: 150px;">Status:</span>
            <span style="width: fit-content;" x-bind:data-license="license.status" class="license-status-badge"><span class="status-dot"></span><span x-text="license.status"></span></span>
        </div>
    </div>
<?php
}
headspin_license_page_init();
