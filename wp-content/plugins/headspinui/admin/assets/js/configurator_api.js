document.addEventListener("alpine:init", () => {

    const channelSet = new BroadcastChannel("headspin_configurator_api_set");
    const channelGet = new BroadcastChannel("headspin_configurator_api_get");
    const errChannel = new BroadcastChannel("headspin_configurator_api_error");


    channelSet.onmessage = (event) => {
        _setter(event.data)
    };
    channelGet.onmessage = (event) => {
        _getter();
        //handleConfig(event.data);
    };
    /*
       data = {
           "action": "setRadiusPreset",
           "param": "none | small | medium | large | full"
       }
   */
    function _setter(data) {
        const { action, param } = data;
        if (typeof api?.set?.[action] === "function") {
            return api.set[action](param);
        }

        throw new Error(`api.set["${action}"] is not a valid function`);
    }


    function _getter() {
        let data = api.getAll();
        channelGet.postMessage({
            "data": data
        });
    }
    function _clean_param(param) {
        param = param.trim().toLowerCase();
        return param;
    }
    function _clean_color(color, trace) {
        try {
            chroma(color);
            return chroma(color).hex();
        } catch (e) {
            return false;
        }
    }
    const api = {
        set: {
            brandColor(param) {
                let targetScheme = Alpine.store('pd').brandColorSchema;
                let neutral = Alpine.store('pd').neutralColorSchema;
                Alpine.store('project').applyRadixColor(param, targetScheme);

                if (Alpine.store('pd').neutralColorSchema.linked) {
                    let d = Alpine.store('project').mixRadixColor(param);
                    let steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
                    steps.forEach((element, i) => {
                        neutral.data.light[i].value = d[0].grayScale[i];
                        neutral.data.lightAlpha[i].value = d[0].agrayScaleAlpha[i];
                        neutral.data.dark[i].value = d[1].grayScale[i];
                        neutral.data.darkAlpha[i].value = d[1].grayScaleAlpha[i];
                    });
                    neutral.data.onColor = d[0].accentContrast;
                    neutral.data.onWcag = d[0].accentContrast;
                }
            },
            neutralColor(param) {
                let targetScheme = Alpine.store('pd').neutralColor;
                Alpine.store('project').applyRadixColor(p, param);

            },
            projectRadiusPreset(param) {
                param = _clean_param(param);
                const allowed = ["none", "small", "medium", "large", "full"];
                if (allowed.includes(param)) {
                    Alpine.store('pd').radiusActive = param;
                    Alpine.store('project').setRadius()
                }
                else {
                    errChannel.postMessage({
                        action: "action::projectRadiusPreset",
                        context: "allowed values: none | small | medium | large | full"
                    });
                }
            },
            componentSpacingPreset(param) {
                param = _clean_param(param);
                const allowed = ["xxs", "xs", "s", "m", "l", "xl", "xxl"];
                if (allowed.includes(param)) {
                    Alpine.store('pd').themeComponentSpace = param;
                    Alpine.store('pd').onComponentSpaceChange(param)
                }
                else {
                    errChannel.postMessage({
                        action: "action::componentSpacingPreset",
                        context: "allowed values: xxs | xs | s | m | l | xl | xxl"
                    });
                }
            },
            sectionSpacingPreset(param) {
                param = _clean_param(param);
                const allowed = ["xxs", "xs", "s", "m", "l", "xl", "xxl"];
                if (allowed.includes(param)) {
                    Alpine.store('pd').themeSectionSpace = param;
                    Alpine.store('pd').onSectionSpaceChange(param);
                }
                else {
                    errChannel.postMessage({
                        action: "action::sectionSpacingPreset",
                        context: "allowed values: xxs | xs | s | m | l | xl | xxl"
                    });
                }
            },
            fontSizePreset(param) {
                param = _clean_param(param);
                const allowed = ["xxs", "xs", "s", "m", "l", "xl", "xxl"];
                if (allowed.includes(param)) {
                    Alpine.store('pd').themeFontSize = param;
                    Alpine.store('pd').onFontSizePresetChange(param);
                }
                else {
                    errChannel.postMessage({
                        action: "action::fontSizePreset",
                        context: "allowed values: xxs | xs | s | m | l | xl | xxl"
                    });
                }
            },
            lineHeightPreset(param) {
                param = _clean_param(param);
                const allowed = ["xxs", "xs", "s", "m", "l", "xl", "xxl"];
                if (allowed.includes(param)) {
                    Alpine.store('pd').themeLineHeight = param;
                    Alpine.store('pd').onLineHeightPresetChange(param);
                }
                else {
                    errChannel.postMessage({
                        action: "action::setLineHeightPreset",
                        context: "allowed values: xxs | xs | s | m | l | xl | xxl"
                    });
                }
            },
            disableEnableLineHeight(param) {
                if (param == 'enable') {
                    Alpine.store('pd').themeLineHeightEnabled = true;
                }
                else {
                    Alpine.store('pd').themeLineHeightEnabled = false;
                }
            },
            themeMode(param) {
                param = _clean_param(param);
                const allowed = ['light', 'dark']
                if (allowed.includes(param)) {
                    Alpine.store('pd').defaultTheme = param;
                }
                else {
                    errChannel.postMessage({
                        action: "action::setThemeMode",
                        context: "allowed values: light | dark"
                    });
                }

            },
            saveApp() {
                headspinSave();
            },
        },
        get: {
            brandColor() {
                return Alpine.store('pd').brandColorSchema.data.light[8].value;
            },
            neutralColor() {
                return Alpine.store('pd').neutralColorSchema.data.light[8].value
            },
            projectRadiusPreset() {
                return Alpine.store('pd').radiusActive;
            },
            componentSpacingPreset() {
                return Alpine.store('pd').themeComponentSpace;
            },
            sectionSpacingPreset() {
                return Alpine.store('pd').themeSectionSpace;
            },
            fontSizePreset() {
                return Alpine.store('pd').themeFontSize;
            },
            lineHeightPreset() {

                return Alpine.store('pd').themeLineHeight;

            },
            disableLineHeight() {
                return Alpine.store('pd').themeLineHeightEnabled;
            },
            themeMode() {
                return Alpine.store('pd').defaultTheme;
            },
        },
        getAll() {
            const result = {};
            for (const key in api.get) {
                if (typeof api.get[key] === 'function') {
                    result[key] = api.get[key]();
                }
            }
            return result;
        }
    }


})