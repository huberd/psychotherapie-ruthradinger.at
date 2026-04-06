<div x-show=" itemVar.method == 'colorTable'">
    <template x-for="(rule, index) in itemVar?.contrast">
        <div class="contrast-rule">
            <div class="form-group">
                <label for="colorAgainst">Color to Test Against</label>
                <input type="text" x-model="rule.colorAgainst" :id="'colorAgainst-' + index">
            </div>
            <div class="form-group" x-show="$store.pd.colorContrastMethod == 'wcag_2'">
                <label for="wcag2">WCAG 2.1 Ratio</label>
                <input type="text" x-model="rule.wcag2" :id="'wcag2-' + index">
            </div>
            <div class="form-group" x-show="$store.pd.colorContrastMethod == 'perceptual_contrast'">
                <label for="apca">APCA Value</label>
                <input type="text" x-model="rule.apca" :id="'apca-' + index">
            </div>
            <button type="button" aria-label="Remove contrast rule">×</button>
        </div>
    </template>
</div>

<style>
.form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.contrast-rule {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    margin-bottom: 16px;
}

</style>