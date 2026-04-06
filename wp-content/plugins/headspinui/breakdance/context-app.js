"use strict"


document.addEventListener('DOMContentLoaded', function () {
    //return false;
    if (isStylecoda()) return;
    if (document.querySelector('#bricks-preview')) return false;
    if (document.querySelector('#ct-controller-ui')) return false;


    let sel, savedRanges;

    const rt_CSS = new BroadcastChannel('headspin_realtime_css');
    const rt_vars = new BroadcastChannel('headspin_realtime_vars');
    const rt_colors = new BroadcastChannel('headspin_realtime_colors');
    const rt_sync = new BroadcastChannel('headspin_breakdance_sync');
    const rt_theme = new BroadcastChannel("headspin_theme_channel");
    const rt_tokens = new BroadcastChannel("headspin_tokenwp_tokens");
    const rt_ev = new BroadcastChannel("headspin_tokenwp_events");


    rt_CSS.onmessage = (event) => {
        regenerateCSS(event.data);
    };
    rt_tokens.onmessage = (event) => {
        regenerateAppData(event.data);
    };
    rt_sync.onmessage = (event) => {
        if (event.data == '100') {
            rt_sync.postMessage([
                {
                    step: 'Breakdance Builder',
                    desc: 'Please open Breakdance Builder in new tab',
                    status: 'true',
                },
                {
                    step: 'Global settings',
                    desc: 'Please open global settings',
                    status: (
                        window.parent.Breakdance.stores.uiStore.panelState
                            .rightSidebarPanel == 'globalSettings'
                    ).toString(),
                },
                {
                    step: 'Having at least one global color',
                    desc: 'Please create one global color',
                    status: (
                        window.parent.Breakdance.stores.globalStore
                            .globalColors.length > 0
                    ).toString(),
                },
            ]);
        }
    };
    rt_colors.onmessage = (event) => {
        regenerateColors(event.data);
    };
    /* End of realtime channels */
    var appData;
    window.headspinBroadcast = {
        css: rt_CSS,
        vars: rt_vars,
        colors: rt_colors,
        sync: rt_sync,
    };
    var filter = {
        mode: "filter",
        filterKey: "headspin",
        subfilter: "all",
    }
    var appState = {
        "activeInput": null,
        "isShown": false,
        "cm": null,
        "html": null,
        "bricksException": "none",
        "breakdanceColorWrapper": null
    }

    var doc = null;
    if (window.parent.document.body) {
        doc = window.parent.document;
    }
    //if (doc && doc.querySelector('#headspin-tokenWP')) return Events();
    let isDragging = false;
    let offsetX, offsetY;
    /* */
    const subfilterTriggersMap = {

        "colors": [
            '.breakdance-color-input-text-field-wrapper',
            '[ng-change*=color]',
            '.color-input',
            '[name="color"]',
            '[name="backgroundColor"]',
            '[name="borderColor"]'
        ],
        "spacing": [
            '.breakdance-spacing-complex-input',
            '[data-test-id*="control-design-spacing"]',
            '[data-test-id*="spacing"]',
            '[data-test-id*="control-design-layout_v2-v_gap]',
            '[data-test-id*="gap"]',
            '[data-test-id*="margin"]',
            '[data-test-id*="padding"]',
            '[ng-change*=gap]',
            '[ng-change*=margin]',
            '[ng-change*=padding]',
            '[data-controlkey*="Gap"]',
            '[title*="margin"]',
            '[title*="padding"]',
            '[title*="gap"]',
            '[controlkey*="margin"]',
            '[controlkey*="padding"]',
            '[name*="padding"]',
            '[name*="margin"]',
            '[name*="gap"]'

        ],
        "radius": [
            '.border-radius-controls',
            '[ng-change*=radius]',
            '[controlkey*="radius"]',
            '[name*="padding"]',
            '[name*="margin"]',
            '[name*="gap"]',
            '[name*="borderTopLeftRadius"]',
            '[name*="borderTopRightRadius"]',
            '[name*="borderBottomLeftRadius"]',
            '[name*="borderBottomRightRadius"]'

        ],
        "typography": [
            '[data-test-id*="control-customTypography-fontSize"]',
            '.oxygen-measure-box-option-font-size',
            '[data-control*="typography"]',
            '[name*="fontSize"]'
        ],
        "all": [],
    }
    const brxColorExceptions = [
        '.color-value-tooltip'
    ]
    const dropdownMounts = ['.v-menu__content', '.bricks-control-popup']
    const modalTriggers = [
        '.breakdance-unit-input',
        '.oxygen-color-picker',
        '.breakdance-color-input-text-field-wrapper',
        '.oxygen-measure-box',
        '.control.control-number',
        '.has-variables',
        '.color-input',
        '.bricks-control-preview',
        '.uniCssInput'
    ];
    const activeElementSelectorMap = ['body', '.breakdance--active-element', '.is-active-element', '.ct-active', '[data-uni-selected="true"]'];
    createApp();
    mountApp();
    loadStylesheet(__HS_BUILDER_VARS.stylespath);
    LoadIcons();
    var dragElement = doc.getElementById('headspin-tokenWP');
    const dragHandle = doc.querySelector('.tokenwp-header-row');
    Events();


    function isBreakdance() {
        var breakdance = false;
        if (window.Breakdance || window.parent.Breakdance) breakdance = true;
        return breakdance;
    }
    function isStylecoda() {
        if (window.__stylecoda || window.parent.__stylecoda) return true;
        return false;
    }
    function isOxygen() {
        if (window?.CTFrontendBuilderUI || window?.parent?.CTFrontendBuilderUI) return true;
        return false;
    }
    function isBricks() {
        if (window?.BricksFunction || window?.parent?.BricksFunction) return true;
        return false;
    }
    function isBuilderius() {
        if (window?.Builderius || window?.parent?.Builderius) return true;
        return false;
    }
    function createApp() {
        var doc;
        if (window.parent.document.body) {
            doc = window.parent.document;
        }
        if (doc.querySelector('#headspin-tokenWP')) return;
        const Div = doc.createElement("div");
        Div.className = "tokenWP-modal";
        Div.style = "display:none; position: fixed;  top: 20vh; left: 20vw;"
        Div.id = "headspin-tokenWP";
        Div.setAttribute("data-visible", "false")

        Div.setAttribute("data-shiftkey", "false")
        if (isBreakdance()) Div.setAttribute("data-twpbuilder", "breakdance")
        if (isBricks()) Div.setAttribute("data-twpbuilder", "bricks")
        if (isOxygen()) Div.setAttribute("data-twpbuilder", "oxygen")
        if (isBuilderius()) Div.setAttribute("data-twpbuilder", "builderius")

        //
        if (doc.querySelector("#app")) doc.querySelector("#app").appendChild(Div);
        else doc.body.appendChild(Div);
        doc.getElementById("headspin-tokenWP").innerHTML = '<header id="tokenwp-header"></header><aside id="tokenwp-aside"></aside><main id="tokenwp-main"></main><footer id="tokenwp-footer"></footer>';

    }
    function hideApp() {
        appState.isShown = false;
        let cm = doc.querySelector('#headspin-tokenWP');
        if (!cm) return;
        cm.style.display = "none";
        cm.setAttribute("data-visible", "false")
        cm.querySelector("#tokenwp-header").innerHTML = "";
        cm.querySelector("#tokenwp-aside").innerHTML = "";
        cm.querySelector("#tokenwp-main").innerHTML = "";
        appState.breakdanceColorWrapper = null;
        appState.bricksException == 'none';
        //cm.querySelector("#tokenwp-footer").innerHTML = "";
    }
    function showApp(e) {
        //construct modal maybe
        if (appState.isShown) hideApp();
        appState.isShown = true;
        if (doc.querySelector('#headspin-tokenWP')) doc.querySelector('#headspin-tokenWP').setAttribute("data-visible", "true")
        let dropdownMount = dropdownMounts.find(selector => appState?.activeInput?.closest(selector));
        if (false) {
            if (doc.querySelector('#headspin-tokenWP')) {
                appState.html = doc.querySelector('#headspin-tokenWP').outerHTML;
                doc.querySelector('#headspin-tokenWP').remove();
            }
            if (appState.activeInput.closest('.v-menu__content')) {
                appState.activeInput.closest('.v-menu__content').insertAdjacentHTML('afterend', appState.html);
            }
            else {
                appState.activeInput.closest('.v-menu__content').insertAdjacentHTML('afterend', appState.html);
            }
            const events = ['mousedown', 'pointerdown', 'focusin', 'click', 'keydown'];
            events.forEach(ev => {
                doc.querySelector('#headspin-tokenWP').addEventListener(ev, e => {
                    // Stop Vue's internal handlers from running
                    e.stopPropagation();
                    e.stopImmediatePropagation();

                    // Optional: prevent default behavior for focus/blur handling
                    // e.preventDefault();
                }, true); // capture phase is critical
            })

        }
        if (dropdownMount) {
            if (doc.querySelector('#headspin-tokenWP')) {
                appState.html = doc.querySelector('#headspin-tokenWP').outerHTML;
                doc.querySelector('#headspin-tokenWP').remove();
            }
            if (appState.activeInput.closest(dropdownMount).querySelector('.dropdown-content')) {
                //console.log #TEST, removed query selctor to move up
                appState.activeInput.closest(dropdownMount).insertAdjacentHTML('beforeend', appState.html);
            }
            else {
                appState.activeInput.closest(dropdownMount).insertAdjacentHTML('beforeend', appState.html);
            }
        }
        else {
            if (doc.querySelector('#headspin-tokenWP')) {
                appState.html = doc.querySelector('#headspin-tokenWP').outerHTML;
                doc.querySelector('#headspin-tokenWP').remove();
            }
            doc.querySelector("body").insertAdjacentHTML('beforeend', appState.html);

        }
        mountApp();
        if (doc && doc.querySelector('#app.theme--light')) doc.querySelector('#headspin-tokenWP').setAttribute("data-themepref", "light");
        if (doc && doc.querySelector('#app.theme--dark')) doc.querySelector('#headspin-tokenWP').setAttribute("data-themepref", "dark")
        if (doc && doc.querySelector('[data-builder-mode]')) doc.querySelector('#headspin-tokenWP').setAttribute("data-themepref", doc.querySelector('[data-builder-mode]').getAttribute("data-builder-mode"))
        doc.querySelector('#headspin-tokenWP').style.display = "grid";
        let modal = doc.querySelector('#headspin-tokenWP');




        if (canGoBottom(window.parent.innerHeight, e.clientY)) {
            modal.style.top = e.clientY + 40 + 'px';
        } else {
            modal.style.top = (e.clientY - (modal.offsetHeight + 40)) + "px";

        }
        if (shouldGoRight(window.parent.innerWidth, e.clientX)) {
            modal.style.right = '40px';
            modal.style.left = 'unset';
        } else {
            if (e.clientX > 400) modal.style.left = e.clickX + 'px';
            else modal.style.left = 16 + 'px';
        }
        activeElementSelectorMap.forEach(selector => {
            if (document.querySelector(selector)) {
                let results = findBackground(document.querySelector(selector));
                if (results.backgroundColor) {
                    let style = `--_local_bg: ${results.backgroundColor};`;
                    doc.querySelector('#tokenwp-main').style = style;
                }
                else {
                    let prop = "--hcl-neutral-1";
                    let computedStyle = window.getComputedStyle(document.querySelector(selector));
                    let localScopeCSSValue = computedStyle.getPropertyValue(prop).trim();
                    let style = `--_local_bg: ${localScopeCSSValue};`;
                    doc.querySelector('#tokenwp-main').style = style;
                }
            }
        })
    }
    function mountApp() {
        if (doc && doc.querySelector('.theme--light') && doc.querySelector('#headspin-tokenWP')) doc.querySelector('#headspin-tokenWP').setAttribute("data-themepref", "light");
        if (doc && doc.querySelector('.theme--dark') && doc.querySelector('#headspin-tokenWP')) doc.querySelector('#headspin-tokenWP').setAttribute("data-themepref", "dark");
        if (doc && doc.querySelector('#headspin-tokenWP')) doc.querySelector('#headspin-tokenWP').setAttribute("data-shiftkey", "false")

        ButtonIconFilter("ii-palette", '_colors', "Colors")
        if (__HS_BUILDER_VARS?.tokens) appData = JSON.parse(atob(__HS_BUILDER_VARS.tokens));
        __HS_BUILDER_VARS.tokens = null;
        SectionColorPalette(appData?.colors?.brand, 'brand', appData?.defaultTheme);
        SectionColorPalette(appData?.colors?.neutral, 'neutral', appData?.defaultTheme);
        appData?.colors?.custom.forEach(color => {
            if (!color?.presetColor || (color?.presetColor && color?.enabled)) {
                SectionColorPalette(color, color.name, appData?.defaultTheme)
            }

        })
        appData?.custom?.folders.forEach(folder => {
            ButtonIconFilter(folder.icon, folder.name, folder.name)
            let folderName = folder.name;
            folder.groups.forEach(group => {
                Section(folderName, group)
            })
        })

        Search();
        if (!appData) mountEmptyMsg()
    }
    function setValue(e, val) {
        if (!appState.activeInput) return;

        let value = `var(${val})`;
        if (isBreakdance()) {
            if (appState.breakdanceColorWrapper && appState.breakdanceColorWrapper.querySelector('.indicator-light-reset-button')) {
                hideApp()
                appState.breakdanceColorWrapper?.querySelector('.indicator-light-reset-button')?.click();
                appState.breakdanceColorWrapper?.querySelector('.indicator-light-reset-button')?.click();
                setTimeout(() => {
                    appState.activeInput = appState.breakdanceColorWrapper?.querySelector('.breakdance-color-input-name input');
                }, 120);
            }
            var noCustomArrayBreakdance = ['.breakdance-color-input-name', '.breakdance-unit-input--expanded'];
            var noCustomBreakdance = noCustomArrayBreakdance.find(selector => appState.activeInput.closest(selector));
            if (noCustomBreakdance) {
                appState.activeInput.value = value;
                appState.activeInput.dispatchEvent(new Event('input'));
            }
            else {
                appState.activeInput.value = 'custom';
                appState.activeInput.dispatchEvent(new Event('input'));

                setTimeout(() => {
                    appState.activeInput.value = value;
                    appState.activeInput.dispatchEvent(new Event('input'));
                }, 120)
            }

            //
        }
        if (isBricks()) {
            if (appState.bricksException == 'none') {
                appState.activeInput.value = value;
                appState.activeInput.dispatchEvent(new Event('input'));
            }
            else if (appState.bricksException == 'color') {

                bricksSetColor(value)
            }
        }
        if (isOxygen()) {
            if (appState.activeInput.closest('.oxygen-measure-box') && !appState.activeInput.closest('.oxygen-measure-box-unit-none')) {
                if (appState.activeInput.closest('[data-option]')) {
                    let unit = appState.activeInput.closest('[data-option]').getAttribute('data-option')
                    window.parent.$scope.iframeScope.setOptionUnit(unit, ' ')
                }
                setTimeout(() => {
                    appState.activeInput.value = value;
                    appState.activeInput.dispatchEvent(new Event('input'));
                }, 50)
            }
            else {
                appState.activeInput.value = value;
                appState.activeInput.dispatchEvent(new Event('input'));
            }

        }
        if (isBuilderius()) {

            /*
            console.log('hello')
            let payload = {
                "value": "tokenwp",
                "label": "TokenWP",
                "children": [
                  {
                    "value": "#c3c3c3",
                    "label": "--hcl-brand-3",
                    "isColor": true
                  }
                ]
              }
            window.parent.Builderius.API.store.set('externalCssVariables', payload)
*/
            const el = appState.activeInput;
            const nativeInputValueSetter = 'TEXTAREA' === el.tagName
                ? Object.getOwnPropertyDescriptor(
                    window.HTMLTextAreaElement.prototype,
                    'value').set
                : Object.getOwnPropertyDescriptor(
                    window.HTMLInputElement.prototype,
                    'value').set;
            nativeInputValueSetter.call(el, value);
            var event = new Event('input', { bubbles: true });
            el.dispatchEvent(event);

            appState.activeInput.dispatchEvent(new Event('input'));
        }
        if (appData?.closeOn === 'any') {
            setTimeout(() => {
                hideApp();
            }, 250);
        }
    }
    function ButtonIconFilter(icon, name, title) {
        let html = `<button title="${title}" data-folder="${name.trim().toLowerCase()}" class="tokenwp-filtericon"><svg class="hs-icon hs-icon-large">
            <use href="#${icon}"></use>
        </svg></button>`;
        window.parent.document.getElementById('tokenwp-aside').innerHTML += html;

    }
    function Section(folderName, group) {
        let keyNames = ['--hfs-text-', '--hsp-', '--hss-', '--hrd-', '--hfs-'];
        let revNames = ['--hsp-', '--hss-', '--hfs-text-'];


        var html = '';
        var embed = '';
        var hasColor = false;
        var style = '';
        var keyname = 'none';
        group.data.forEach(token => {
            var label = token.cssVar;
            var matchingIndex = keyNames.findIndex(key => token.cssVar.startsWith(key));

            if (matchingIndex >= 0) {
                label = label.slice(keyNames[matchingIndex].length);
                label = label.toUpperCase();
                keyname = keyNames[matchingIndex];
            }
            else label = token.label;
            if (token.method == "colorTable") {
                activeElementSelectorMap.forEach(selector => {
                    if (document.querySelector(selector)) {
                        let prop = token.dark.match(/--[\w-]+/);
                        let computedStyle = window.getComputedStyle(document.querySelector(selector));
                        let localScopeCSSValue = computedStyle.getPropertyValue(token.cssVar).trim();
                        style = `style="--_local: ${localScopeCSSValue};"`;

                    }
                })
                hasColor = true;


            }
            if (revNames.includes(keyname)) html = `<button class="tokenwp-button" data-type="${token.method}"  data-embed="${token.cssVar}" ${style}>${label}</button>` + html;
            else html += `<button class="tokenwp-button" data-type="${token.method}"  data-embed="${token.cssVar}" ${style}>${label}</button>`

        })
        //embed = `<section data-folder="${folderName.trim().toLowerCase()}"><div>${group.name}</div><div></div></section>`;
        embed = `<section data-hascolor="${hasColor}" data-keyname="${keyname}" data-folder="${folderName.trim().toLowerCase()}"><details open="true"><summary>${group.name}</summary><div class="tokenwp-tokenlist">${html}</div></details></section>`;
        window.parent.document.getElementById('tokenwp-main').innerHTML += embed;
    }
    function mountEmptyMsg() {
        let msg = `<div class="tokenwp-empty">
                Context menu does not have any data, please go to main app (Headspin) and save data.
                <div>`;
        window.parent.document.getElementById('tokenwp-main').innerHTML += msg;
    }
    function SectionColorPalette(color, name, theme) {
        if (!appData) return false
        let html = '';
        let htmlTransparent;
        let style = '';
        let isTransparentEnabled = Boolean(color.transparentVariants);
        let themeA = theme + 'Alpha';
        var embed = '';
        //transparentVariants
        for (let i = 1; i < 13; i++) {
            activeElementSelectorMap.forEach(selector => {
                if (document.querySelector(selector)) {
                    let prop = `--hcl-${name}-${i}`;
                    let computedStyle = window.getComputedStyle(document.querySelector(selector));
                    let localScopeCSSValue = computedStyle.getPropertyValue(prop).trim();
                    style = `style="--_local: ${localScopeCSSValue};"`
                }

                if (document.querySelector(selector) && (i == 10)) {
                    let prop1 = `--hcl-on-${name}`;
                    let computedStyle1 = window.getComputedStyle(document.querySelector(selector));
                    let localScopeCSSValue1 = computedStyle1.getPropertyValue(prop1).trim();
                    let style1 = `style="--_local: ${localScopeCSSValue1};"`
                    html += `<button class="tokenwp-button tokenwp-button-colorpalette tokenwp-button-oncolor" data-type="color-palette" data-embed="--hcl-on-${name}" ${style1}></button>`
                }

            })
            html += `<button class="tokenwp-button tokenwp-solid tokenwp-button-colorpalette" data-type="color-palette" data-embed="--hcl-${name}-${i}" ${style}></button>`

        }
        for (let i = 1; i < 13; i++) {
            activeElementSelectorMap.forEach(selector => {
                if (document.querySelector(selector)) {
                    let prop = `--hcl-${name}-${i}a`;
                    let computedStyle = window.getComputedStyle(document.querySelector(selector));
                    let localScopeCSSValue = computedStyle.getPropertyValue(prop).trim();
                    style = `style="--_local: ${localScopeCSSValue};"`
                }


            })
            html += `<button class="tokenwp-button tokenwp-transparent tokenwp-button-colorpalette" data-type="color-palette" data-embed="--hcl-${name}-${i}a" ${style}><div class="tokenwp-transparent-preview"></div></button>`

        }


        embed = `<section data-hascolor="true" data-hastransparent="true" data-folder="_colors"><details open="true"><summary>${name}</summary><div class="tokenwp-tokenlist tokenwp-palette">${html}</div></details></section>`;
        window.parent.document.getElementById('tokenwp-main').innerHTML += embed;

    }
    function loadStylesheet(url) {
        let link = window.parent.document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        window.parent.document.head.appendChild(link);
    }
    function Search() {
        let html = `<div class="tokenwp-header-row">
            <div class="tokenwp-handle">
            <svg class="hs-icon hs-icon-large">
            <use href="#ii-grip"></use>
        </svg>
            </div>
            <div class="tokenwp-header-title">Tokens</div>
    </div>
    <button class="tokenwp-changemod tokenwp-button" data-htheme="true">
        <svg class="hs-icon hs-icon-large">
            <use href="#ii-sun"></use>
        </svg>
        <svg class="hs-icon hs-icon-large">
            <use href="#ii-moon"></use>
        </svg>
    </button>`;
        window.parent.document.getElementById('tokenwp-header').innerHTML += html;
    }
    function filtering(name) {
        filter.filterKey = name;
        doc.querySelectorAll('.tokenwp-filtericon.is-active').forEach(el => el.classList.remove("is-active"))
        doc.querySelector(`.tokenwp-filtericon[data-folder="${name}"]`)?.classList?.add('is-active');
        doc.querySelectorAll('#tokenwp-main section[data-folder]').forEach(section => {
            if (filter.filterKey == "_all") {
                section.style.display = "flex"
            }
            else if (filter.filterKey == "_colors") {
                if (section.getAttribute("data-folder") != filter.filterKey) section.style.display = "none";
                else section.style.display = "flex"
                if (section.getAttribute("data-hascolor") == "true") section.style.display = "flex"
            }
            else {
                if (section.getAttribute("data-folder") != filter.filterKey) section.style.display = "none";
                else section.style.display = "flex"
            }
        })

    }
    function subfilter() {
        let subfilter = filter.subfilter;
        if (subfilter == "all") {
            doc.querySelectorAll('#tokenwp-main section[data-folder]').forEach(section => {
                section.querySelector('details').open = true;
            })
        }
        if (subfilter == "colors") {
            doc.querySelectorAll('#tokenwp-main section[data-folder]').forEach(section => {
                section.querySelector('details').open = true;
            })
        }
        if (subfilter == "spacing") {
            doc.querySelectorAll('#tokenwp-main section[data-folder]').forEach(section => {
                if (section.getAttribute('data-keyname')?.includes('--hsp-') || section.getAttribute('data-keyname')?.includes('--hss-')) section.querySelector('details').open = true;
                else section.querySelector('details').open = false;
            })
        }
        if (subfilter == "typography") {
            doc.querySelectorAll('#tokenwp-main section[data-folder]').forEach(section => {
                if (section.getAttribute('data-keyname')?.includes('--hfs-')) section.querySelector('details').open = true;
                else section.querySelector('details').open = false;
            })
        }
        if (subfilter == "radius") {
            doc.querySelectorAll('#tokenwp-main section[data-folder]').forEach(section => {
                if (section.getAttribute('data-keyname')?.includes('--hrd-')) section.querySelector('details').open = true;
                else section.querySelector('details').open = false;
            })
        }
    }
    function Events() {

        // Add event listeners for keydown and keyup
        window.parent.document.addEventListener('keydown', function (event) {
            if (event.key === 'Shift') {
                window.parent.document.querySelector('#headspin-tokenWP').setAttribute("data-shiftkey", "true");
                setAttributeOnIframeRoot('data-shiftkey', 'true')
            }
        });

        window.parent.document.addEventListener('keyup', function (event) {
            if (event.key === 'Shift') {
                window.parent.document.querySelector('#headspin-tokenWP').setAttribute("data-shiftkey", "false")
                setAttributeOnIframeRoot('data-shiftkey', 'false')
            }
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Shift') {
                setAttributeOnIframeRoot('data-shiftkey', 'true')
            }
        });

        document.addEventListener('keyup', function (event) {
            if (event.key === 'Shift') {
                setAttributeOnIframeRoot('data-shiftkey', 'false')
            }
        });

        // Start dragging
        window.parent.document.addEventListener('mousedown', function (e) {
            if (!e.target.closest('.tokenwp-header-row')) return;
            isDragging = true;
            doc.querySelector('html').setAttribute("data-isdragging", 'true')
            // Calculate the offset between the mouse pointer and the top-left corner of the element
            offsetX = e.clientX - dragElement.getBoundingClientRect().left;
            offsetY = e.clientY - dragElement.getBoundingClientRect().top;

            // Add mousemove and mouseup event listeners
            dragElement = doc.getElementById('headspin-tokenWP');
            doc.addEventListener('mousemove', onMouseMove);
            doc.addEventListener('mouseup', onMouseUp);
        });

        document.addEventListener('click', function (e) {
            if (!e.isTrusted) return;
            hideApp();
        });

        window.parent.document
            .querySelector('body')
            .addEventListener('click', function (e) {
                if (!e.isTrusted) return;
                if (!e.target.closest('#headspin-tokenWP')) {
                    hideApp();
                }
                else if (e.target.closest('#tokenwp-aside')) {
                    if (!e.target || !e.target.closest('[data-folder]')) return false;
                    let att = e.target.closest('[data-folder]').getAttribute("data-folder");
                    filtering(att);
                }
                else if (e.target.closest('[data-embed]')) {
                    e.preventDefault();
                    let val = e.target.closest('[data-embed]').getAttribute("data-embed");
                    if (appState.cm) BreakdanceCodemirrorInserter(appState.cm, `var(${val})`);
                    if (appState.cm6) CodemirrorInserterCM6(`var(${val})`)
                    else setValue(e, val);
                }
                else if (e.target && e.target.closest('.tokenwp-changemod')) {
                    let invertTheme = 'light';
                    if (appData.defaultTheme == 'light') invertTheme = 'dark';
                    if (document.querySelector('html').getAttribute("data-hsx") == 'dark') document.querySelector('html').setAttribute("data-hsx", 'light')
                    else if (document.querySelector('html').getAttribute("data-hsx") == 'light') document.querySelector('html').setAttribute("data-hsx", 'dark')
                    else document.querySelector('html').setAttribute("data-hsx", invertTheme);
                    if (doc.querySelector('[data-htheme]').getAttribute('data-htheme') == 'true') doc.querySelector('[data-htheme]').setAttribute('data-htheme', 'false');
                    else doc.querySelector('[data-htheme]').setAttribute('data-htheme', 'true')
                }

            });
        window.parent.document
            .querySelector('body')
            .addEventListener('contextmenu', function (e) {
                const closestMatch = modalTriggers.find(selector => e.target.closest(selector));
                //sometimes builder may catch event 
                let eT = e.target;
                if (isBuilderius() && e.target.tagName != 'INPUT') {
                    eT = e.target.closest('.uniCssInput').querySelector('input')
                }
                const subfilterColors = subfilterTriggersMap.colors.find(selector => eT.closest(selector));
                const subfilterSpacing = subfilterTriggersMap.spacing.find(selector => eT.closest(selector));
                const subfilterRadius = subfilterTriggersMap.radius.find(selector => eT.closest(selector));
                const subfilterTypography = subfilterTriggersMap.typography.find(selector => eT.closest(selector));
                const brxColorException = brxColorExceptions.find(selector => eT.closest(selector));

                if (brxColorException && isBricks()) {
                    e.preventDefault()
                    brxOpenColorModal(e, e.target.closest(brxColorException));
                    return false;
                }
                if (e.target.closest(".breakdance-control-wrapper-control-color")) {
                    appState.breakdanceColorWrapper = e.target.closest(".breakdance-control-wrapper-control-color");

                }
                if (closestMatch) {
                    e.preventDefault();
                    appState.activeInput = e.target.closest('input');
                    if (!appState.activeInput) {
                        appState.activeInput = e.target.closest(closestMatch).querySelector('input')
                    }
                    if (e.target.closest(closestMatch).classList.contains('breakdance-unit-input') &&
                        !e.target.closest(closestMatch).classList.contains('.breakdance-unit-input--expanded')) {
                        if (appState.activeInput && !appState.activeInput?.value?.includes("var(")) {
                            appState.activeInput.value = 'custom';
                            appState.activeInput.dispatchEvent(new Event('input'));

                            setTimeout(() => {
                                appState.activeInput.value = '';
                                appState.activeInput.dispatchEvent(new Event('input'));
                            }, 120)
                        }
                    }

                    showApp(e);
                    appState.cm = null;
                    appState.cm6 = null;
                }
                //special keys, breakdance 
                else if (e.target.closest('.breakdance-color-input-global-badge')) {
                    e.preventDefault();
                    appState.cm = null;
                    appState.cm6 = null;
                    filtering('_colors');
                    appState.breakdanceColorWrapper = e.target.closest(".breakdance-control-wrapper-control-color");
                    appState.activeInput = e.target.closest(".breakdance-control-wrapper-control-color");

                    showApp(e);
                }
                if (brxColorException) {
                    appState.bricksException = 'color';
                    appState.activeInput = e.target.closest(brxColorException)

                }
                if (subfilterColors) {
                    filtering('_colors')
                }
                if (subfilterSpacing) {
                    filtering('headspin');
                    filter.subfilter = 'spacing';
                    subfilter();
                }
                if (subfilterRadius) {
                    filtering('headspin');
                    filter.subfilter = 'radius';
                    subfilter();
                }
                if (subfilterTypography) {
                    filtering('headspin');
                    filter.subfilter = 'typography';
                    subfilter();
                }
                if (e.target.closest('.CodeMirror')) {
                    e.preventDefault();
                    showApp(e);
                    appState.activeInput = null;
                    appState.cm6 = null;
                    appState.cm = e.target.closest('.CodeMirror').CodeMirror;
                    filtering('headspin');
                }
                if (e.target.closest('.cm-editor')) {
                    e.preventDefault();
                    showApp(e);
                    appState.activeInput = null;
                    appState.cm = null;
                    appState.cm6 = doc.activeElement;
                    sel = window.getSelection();
                    savedRanges = [];
                    for (let i = 0; i < sel.rangeCount; i++) {
                        savedRanges.push(sel.getRangeAt(i));
                    }
                    filtering('headspin');
                }
            });
    }
    function Icon() { }
    function LoadIcons() {
        let icons = `
     <svg><!--!Font Awesome Pro 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->
    <symbol id="ii-breakdance" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 40">
        <path d="M16.9412 28.5708L2.82353 28.5714C1.27147 28.5705 0.000314751 27.2551 0 25.7131C0.00125968 24.1715 1.27251 22.8572 2.82411 22.8566H8.48986C10.0344 22.8456 11.2941 21.5341 11.2947 19.9994V2.85655C11.2956 1.31531 12.5664 0.00097349 14.1176 0C15.6692 0.000648987 16.9402 1.31509 16.9412 2.85655V10.9362C16.9421 12.4562 18.278 13.7918 19.7641 13.7928C21.3159 13.7921 22.587 12.4773 22.5877 10.9356V2.85655C22.5886 1.31509 23.8597 0.000648985 25.4112 0C26.9628 0.000648657 28.234 1.31499 28.2353 2.85655V37.1429C28.2344 38.6846 26.963 39.9994 25.4112 40C23.8594 39.9994 22.5883 38.6845 22.5877 37.1429V34.2857C22.5877 31.1313 20.0573 28.5708 16.9412 28.5708Z" />
        <path d="M16.296 39.0103C18.5217 39.0103 20.3259 37.1845 20.3259 34.9324C20.3259 32.6802 18.5217 30.8545 16.296 30.8545C14.0703 30.8545 12.2661 32.6802 12.2661 34.9324C12.2661 37.1845 14.0703 39.0103 16.296 39.0103Z" />
    </symbol>
    </svg>
    <svg>
        <symbol id="ii-headspin-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268 240">
            <g id="inherit">
                <path fill="inherit" opacity="1.00" d=" M 129.51 0.00 L 135.43 0.00 C 143.47 1.87 151.20 6.28 155.30 13.68 C 191.55 73.48 227.72 133.33 263.90 193.16 C 266.19 196.88 267.53 201.12 268.00 205.45 L 268.00 208.53 C 267.15 216.17 263.73 223.77 257.45 228.43 C 248.33 235.69 234.42 235.95 225.08 228.94 C 218.66 224.43 215.49 217.00 211.45 210.55 C 199.43 190.81 187.61 170.93 175.47 151.26 C 172.21 151.46 169.27 153.02 166.35 154.35 C 156.60 159.11 147.68 165.61 140.11 173.36 C 141.75 178.43 145.28 182.56 147.82 187.18 C 151.83 194.27 157.31 200.93 158.58 209.21 C 160.02 219.29 155.15 230.03 146.54 235.49 C 143.38 237.47 139.86 238.73 136.38 240.00 L 128.57 240.00 C 120.52 238.19 112.68 233.93 108.47 226.57 C 90.03 196.03 71.56 165.49 53.04 135.00 C 45.44 122.88 49.42 105.11 61.89 97.87 C 73.55 90.30 90.76 93.95 98.32 105.63 C 107.84 120.92 116.92 136.50 126.46 151.78 C 131.59 151.24 136.32 148.99 140.94 146.86 C 148.99 142.83 156.54 137.53 162.52 130.77 C 160.94 127.09 158.66 123.78 156.66 120.33 C 142.66 96.72 128.24 73.37 114.14 49.83 C 111.13 44.72 107.45 39.86 105.93 34.04 C 103.62 25.17 105.92 15.03 112.46 8.46 C 116.93 3.73 123.16 1.05 129.51 0.00 Z" />
                <path fill="inherit" opacity="1.00" d=" M 12.57 183.58 C 18.89 179.06 27.13 178.17 34.61 179.63 C 44.00 181.61 52.00 189.03 54.76 198.21 C 57.44 206.68 56.02 216.46 50.55 223.55 C 43.16 233.48 28.83 237.67 17.41 232.58 C 8.21 228.83 2.20 219.91 0.00 210.47 L 0.00 205.52 C 0.76 196.83 5.24 188.45 12.57 183.58 Z" />
            </g>
        </symbol>
    </svg>
    <svg>
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <symbol id="ii-palette" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="max-width: 24px">
            <path d="M464 258.2c0 2.7-1 5.2-4.2 8c-3.8 3.1-10.1 5.8-17.8 5.8H344c-53 0-96 43-96 96c0 6.8 .7 13.4 2.1 19.8c3.3 15.7 10.2 31.1 14.4 40.6l0 0c.7 1.6 1.4 3 1.9 4.3c5 11.5 5.6 15.4 5.6 17.1c0 5.3-1.9 9.5-3.8 11.8c-.9 1.1-1.6 1.6-2 1.8c-.3 .2-.8 .3-1.6 .4c-2.9 .1-5.7 .2-8.6 .2C141.1 464 48 370.9 48 256S141.1 48 256 48s208 93.1 208 208c0 .7 0 1.4 0 2.2zm48 .5c0-.9 0-1.8 0-2.7C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512c3.5 0 7.1-.1 10.6-.2c31.8-1.3 53.4-30.1 53.4-62c0-14.5-6.1-28.3-12.1-42c-4.3-9.8-8.7-19.7-10.8-29.9c-.7-3.2-1-6.5-1-9.9c0-26.5 21.5-48 48-48h97.9c36.5 0 69.7-24.8 70.1-61.3zM160 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-64a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm128-64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm64 64a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
        </symbol>
    </svg>
    <svg>
        <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <symbol id="ii-size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="max-width: 24px">
            <path d="M24 64C37.25 64 48 74.75 48 88V424C48 437.3 37.25 448 24 448C10.75 448 0 437.3 0 424V88C0 74.75 10.75 64 24 64zM240.1 135C250.3 144.4 250.3 159.6 240.1 168.1L177.9 232H462.1L399 168.1C389.7 159.6 389.7 144.4 399 135C408.4 125.7 423.6 125.7 432.1 135L536.1 239C546.3 248.4 546.3 263.6 536.1 272.1L432.1 376.1C423.6 386.3 408.4 386.3 399 376.1C389.7 367.6 389.7 352.4 399 343L462.1 280H177.9L240.1 343C250.3 352.4 250.3 367.6 240.1 376.1C231.6 386.3 216.4 386.3 207 376.1L103 272.1C93.66 263.6 93.66 248.4 103 239L207 135C216.4 125.7 231.6 125.7 240.1 135H240.1zM640 424C640 437.3 629.3 448 616 448C602.7 448 592 437.3 592 424V88C592 74.75 602.7 64 616 64C629.3 64 640 74.75 640 88V424z">
            </path>
        </symbol>
    </svg>
    <svg>
        <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <symbol id="ii-border" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="max-width: 24px">
            <path d="M0 104C0 64.24 32.24 32 72 32H424C437.3 32 448 42.75 448 56C448 69.25 437.3 80 424 80H72C58.75 80 48 90.75 48 104V456C48 469.3 37.25 480 24 480C10.75 480 0 469.3 0 456V104zM160 448C160 465.7 145.7 480 128 480C110.3 480 96 465.7 96 448C96 430.3 110.3 416 128 416C145.7 416 160 430.3 160 448zM352 448C352 465.7 337.7 480 320 480C302.3 480 288 465.7 288 448C288 430.3 302.3 416 320 416C337.7 416 352 430.3 352 448zM224 480C206.3 480 192 465.7 192 448C192 430.3 206.3 416 224 416C241.7 416 256 430.3 256 448C256 465.7 241.7 480 224 480zM448 448C448 465.7 433.7 480 416 480C398.3 480 384 465.7 384 448C384 430.3 398.3 416 416 416C433.7 416 448 430.3 448 448zM416 288C398.3 288 384 273.7 384 256C384 238.3 398.3 224 416 224C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288zM448 352C448 369.7 433.7 384 416 384C398.3 384 384 369.7 384 352C384 334.3 398.3 320 416 320C433.7 320 448 334.3 448 352zM416 192C398.3 192 384 177.7 384 160C384 142.3 398.3 128 416 128C433.7 128 448 142.3 448 160C448 177.7 433.7 192 416 192z">
            </path>
        </symbol>
    </svg>
    <svg>
        <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <symbol id="ii-typography" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="max-width: 24px">
            <path d="M320 248v48C320 309.3 330.8 320 344 320s24-10.75 24-24V272h88v160h-32c-13.25 0-24 10.75-24 24S410.8 480 424 480h112c13.25 0 24-10.75 24-24s-10.75-24-24-24h-32v-160h88v24c0 13.25 10.75 24 24 24S640 309.3 640 296v-48C640 234.8 629.3 224 616 224h-272C330.8 224 320 234.8 320 248zM0 56l0 80C0 149.3 10.75 160 24 160S48 149.3 48 136V80h120v352h-48C106.8 432 96 442.8 96 456S106.8 480 120 480h144C277.3 480 288 469.3 288 456S277.3 432 264 432h-48v-352h120v56C336 149.3 346.8 160 360 160S384 149.3 384 136v-80C384 42.75 373.3 32 360 32H24C10.75 32 0 42.75 0 56z">
            </path>
        </symbol>
    </svg>
    <svg><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <symbol id="ii-line-height" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M113.8 39.9c-4.6-5.1-11-7.9-17.8-7.9s-13.3 2.9-17.8 7.9l-72 80c-8.9 9.9-8.1 25 1.8 33.9s25 8.1 33.9-1.8L72 118.5V393.5L41.8 359.9c-8.9-9.9-24-10.7-33.9-1.8s-10.7 24-1.8 33.9l72 80c4.6 5.1 11 7.9 17.8 7.9s13.3-2.9 17.8-7.9l72-80c8.9-9.9 8.1-25-1.8-33.9s-25-8.1-33.9 1.8L120 393.5V118.5l30.2 33.5c8.9 9.9 24 10.7 33.9 1.8s10.7-24 1.8-33.9l-72-80zM248 72c-13.3 0-24 10.7-24 24s10.7 24 24 24H552c13.3 0 24-10.7 24-24s-10.7-24-24-24H248zm0 160c-13.3 0-24 10.7-24 24s10.7 24 24 24H552c13.3 0 24-10.7 24-24s-10.7-24-24-24H248zM224 416c0 13.3 10.7 24 24 24H552c13.3 0 24-10.7 24-24s-10.7-24-24-24H248c-13.3 0-24 10.7-24 24z" />

        </symbol>
    </svg>
    <svg><!--!Font Awesome Pro 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->
        <symbol id="ii-token-group" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M400 86v88.7c-13.3 7.2-31.6 14.2-54.8 19.9C311.3 203 269.5 208 224 208s-87.3-5-121.2-13.4C79.6 188.9 61.3 182 48 174.7V86l.6-.5C53.9 81 64.5 74.8 81.8 68.6C115.9 56.5 166.2 48 224 48s108.1 8.5 142.2 20.6c17.3 6.2 27.8 12.4 33.2 16.9l.6 .5zm0 141.5v75.2c-13.3 7.2-31.6 14.2-54.8 19.9C311.3 331 269.5 336 224 336s-87.3-5-121.2-13.4C79.6 316.9 61.3 310 48 302.7V227.6c13.3 5.3 27.9 9.9 43.3 13.7C129.5 250.6 175.2 256 224 256s94.5-5.4 132.7-14.8c15.4-3.8 30-8.3 43.3-13.7zM48 426V355.6c13.3 5.3 27.9 9.9 43.3 13.7C129.5 378.6 175.2 384 224 384s94.5-5.4 132.7-14.8c15.4-3.8 30-8.3 43.3-13.7V426l-.6 .5c-5.3 4.5-15.9 10.7-33.2 16.9C332.1 455.5 281.8 464 224 464s-108.1-8.5-142.2-20.6c-17.3-6.2-27.8-12.4-33.2-16.9L48 426zm354.1-2.1s0 .1-.2 .2l.1-.2 0-.1zm-356.1 0a.3 .3 0 1 0 .6-.2 .3 .3 0 1 0 -.6 .2zm0-335.8a.3 .3 0 1 0 .5 .2 .3 .3 0 1 0 -.5-.2zm356-.2a.3 .3 0 1 0 -.1 .6 .3 .3 0 1 0 .1-.6zM448 432V80C448 35.8 347.7 0 224 0S0 35.8 0 80V432c0 44.2 100.3 80 224 80s224-35.8 224-80z" />
        </symbol>
    </svg>
    <svg><!--!Font Awesome Pro 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->
        <symbol id="ii-token" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M176 88v0c0 .1 .1 .6 .6 1.5c.6 1.2 2 3.1 4.7 5.5c.4 .3 .8 .7 1.2 1c-18.7 .4-36.9 1.7-54.4 4.1V88c0-18 9.7-32.4 21.1-42.7s26.7-18.5 43.5-24.9C226.4 7.5 271.5 0 320 0s93.6 7.5 127.3 20.3c16.8 6.4 32.1 14.6 43.5 24.9S512 70 512 88V192 296c0 18-9.7 32.4-21.1 42.7s-26.7 18.5-43.5 24.9c-9.6 3.7-20.1 6.9-31.3 9.6V323.6c5.1-1.5 9.8-3.1 14.2-4.8c13.6-5.2 23-10.8 28.5-15.7c2.7-2.4 4.1-4.3 4.7-5.5c.6-1.1 .6-1.5 .6-1.5v0V252.4c-5.3 2.6-10.9 5-16.7 7.2c-9.6 3.7-20.1 6.9-31.3 9.6V219.6c5.1-1.5 9.8-3.1 14.2-4.8c13.6-5.2 23-10.8 28.5-15.7c2.7-2.4 4.1-4.3 4.7-5.5c.5-.9 .6-1.4 .6-1.5v0 0V148.4c-5.3 2.6-10.9 5-16.7 7.2c-13.7 5.2-29.4 9.6-46.3 12.9c-5.1-7.5-11-13.9-16.8-19.1c-10.1-9.1-21.8-16.5-34-22.6c31.7-2.3 59.3-8.2 80-16.1c13.6-5.2 23-10.8 28.5-15.7c2.7-2.4 4.1-4.3 4.7-5.5c.5-.9 .6-1.4 .6-1.5v0 0 0c0 0 0-.5-.6-1.5c-.6-1.2-2-3.1-4.7-5.5c-5.5-5-14.9-10.6-28.5-15.7C403.2 54.9 364.2 48 320 48s-83.2 6.9-110.2 17.2c-13.6 5.2-23 10.8-28.5 15.7c-2.7 2.4-4.1 4.3-4.7 5.5c-.6 1.1-.6 1.5-.6 1.5l0 0zM48 216v0c0 .1 .1 .6 .6 1.5c.6 1.2 2 3.1 4.7 5.5c5.5 5 14.9 10.6 28.5 15.7c27 10.3 66 17.2 110.2 17.2s83.2-6.9 110.2-17.2c13.6-5.2 23-10.8 28.5-15.7c2.7-2.4 4.1-4.3 4.7-5.5c.5-.9 .6-1.4 .6-1.5v0 0 0c0 0 0-.5-.6-1.5c-.6-1.2-2-3.1-4.7-5.5c-5.5-5-14.9-10.6-28.5-15.7c-27-10.3-66-17.2-110.2-17.2s-83.2 6.9-110.2 17.2c-13.6 5.2-23 10.8-28.5 15.7c-2.7 2.4-4.1 4.3-4.7 5.5c-.6 1.1-.6 1.5-.6 1.5l0 0zM0 216c0-18 9.7-32.4 21.1-42.7s26.7-18.5 43.5-24.9C98.4 135.5 143.5 128 192 128s93.6 7.5 127.3 20.3c16.8 6.4 32.1 14.6 43.5 24.9S384 198 384 216V320 424c0 18-9.7 32.4-21.1 42.7s-26.7 18.5-43.5 24.9C285.6 504.5 240.5 512 192 512s-93.6-7.5-127.3-20.3c-16.8-6.4-32-14.6-43.5-24.9S0 442 0 424V320 216zM336 320V276.4c-5.3 2.6-10.9 5-16.7 7.2C285.6 296.5 240.5 304 192 304s-93.6-7.5-127.3-20.3c-5.8-2.2-11.4-4.6-16.7-7.2V320v0c0 .1 .1 .6 .6 1.5c.6 1.2 2 3.1 4.7 5.5c5.5 5 14.9 10.6 28.5 15.7c27 10.3 66 17.2 110.2 17.2s83.2-6.9 110.2-17.2c13.6-5.2 23-10.8 28.5-15.7c2.7-2.4 4.1-4.3 4.7-5.5c.5-.9 .6-1.4 .6-1.5v0 0zM64.7 387.7c-5.8-2.2-11.4-4.6-16.7-7.2V424l0 0c0 0 0 .5 .6 1.5c.6 1.2 2 3.1 4.7 5.5c5.5 5 14.9 10.6 28.5 15.7c27 10.3 66 17.2 110.2 17.2s83.2-6.9 110.2-17.2c13.6-5.2 23-10.8 28.5-15.7c2.7-2.4 4.1-4.3 4.7-5.5c.6-1.1 .6-1.5 .6-1.5v0V380.4c-5.3 2.6-10.9 5-16.7 7.2C285.6 400.5 240.5 408 192 408s-93.6-7.5-127.3-20.3z" />

        </symbol>
    </svg>
    <svg><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.-->
    <symbol id="ii-grip" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M40 440l0-48 48 0 0 48-48 0zm0 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40zm192-40l0-48 48 0 0 48-48 0zm0 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40zM40 232l48 0 0 48-48 0 0-48zM0 280c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48zm232 0l0-48 48 0 0 48-48 0zm0 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40zM40 72l48 0 0 48-48 0 0-48zM0 120c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40L40 32C17.9 32 0 49.9 0 72l0 48zm232 0l0-48 48 0 0 48-48 0zm0 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40z" />
    </symbol>
</svg>
<svg>
    <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
    <symbol id="ii-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M280 24V88c0 13.3-10.7 24-24 24s-24-10.7-24-24V24c0-13.3 10.7-24 24-24s24 10.7 24 24zm157 84.9l-45.3 45.3c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L403.1 75c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM108.9 75l45.3 45.3c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L75 108.9c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0zM24 232H88c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24zm400 0h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H424c-13.3 0-24-10.7-24-24s10.7-24 24-24zM154.2 391.8L108.9 437c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l45.3-45.3c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zm237.6-33.9L437 403.1c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-45.3-45.3c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0zM280 424v64c0 13.3-10.7 24-24 24s-24-10.7-24-24V424c0-13.3 10.7-24 24-24s24 10.7 24 24zm40-168a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-176 0a112 112 0 1 1 224 0 112 112 0 1 1 -224 0z" />
    </symbol>
</svg>
<svg>
    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
    <symbol id="ii-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0c-.1 0-.2 0-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z" />
    </symbol>
</svg>
     `
        let html = `<div style="display: none; height:0; width:0">${icons}</div>`
        window.parent.document.getElementById('tokenwp-footer').innerHTML += html;
    }
    //collapse all, section, 
    //show all > search function
    function canGoBottom(windowHeight, clickY) {
        var w_half = Number(windowHeight) / 2;
        var cY = Number(clickY);
        if (cY > w_half) return false;
        return true;
    }
    function shouldGoRight(windowWidth, clickX) {
        var w_half = Number(windowWidth) / 2;
        var cX = Number(clickX);
        if (cX > w_half) {
            return true;
        }
        return false;
    }
    function CodemirrorInserterCM6(str) {
        try {
            // 1️⃣ Find the correct contenteditable element
            // appState.cm6 might be the wrapper, so we look for the inner content class
            const wrapper = appState.cm6;
            const contentDOM = appState.cm6;

            if (!contentDOM) {
                console.error("CM6 content element not found");
                return;
            }

            contentDOM.focus();

            // 2️⃣ Attempt 1: The "Backdoor" (Best Method)
            // CodeMirror 6 attaches the view instance to the DOM element as a property called 'cmView'.
            // If we find this, we can use the official API even without the global variable.
            if (contentDOM.cmView && contentDOM.cmView.view) {
                const view = contentDOM.cmView.view;
                view.dispatch(view.state.replaceSelection(str));
                return; // Success! We are done.
            }

            // 3️⃣ Attempt 2: Firefox Fallback
            // You mentioned execCommand works in Firefox. Firefox allows this for legacy support.
            // We use UserAgent sniffing here because behavior differs so strictly between engines.
            if (navigator.userAgent.includes("Firefox")) {
                document.execCommand("insertText", false, str);
                return;
            }

            // 4️⃣ Attempt 3: Chrome/Edge Fallback (InputEvent)
            // Chrome fails with execCommand in CM6.
            // Instead, we simulate the user typing by dispatching a 'beforeinput' event.
            // CodeMirror listens for this native event to handle text insertion.
            const inputEvent = new InputEvent('beforeinput', {
                bubbles: true,
                cancelable: true,
                inputType: 'insertText',
                data: str,
                view: window,
                composed: true
            });

            contentDOM.dispatchEvent(inputEvent);

        } catch (error) {
            console.error("CodeMirror Insert Failed:", error);
        }
    }
    function BreakdanceCodemirrorInserter(editor, str) {
        var doc = editor.getDoc();
        var selection = editor.getSelection();

        if (selection.length > 0) {
            // Replace the selected text and select the newly inserted text
            var from = doc.getCursor("from"); // Start of the selection
            var to = doc.getCursor("to");     // End of the selection
            editor.replaceSelection(str);

            // Update selection to the newly inserted text
            doc.setSelection(from, {
                line: from.line,
                ch: from.ch + str.length
            });
        } else {
            // Insert at cursor position and select the newly inserted text
            var cursor = doc.getCursor();
            var pos = { line: cursor.line, ch: cursor.ch };

            // Insert the string
            doc.replaceRange(str, pos);

            // Select the newly inserted text
            doc.setSelection(pos, {
                line: pos.line,
                ch: pos.ch + str.length
            });
        }
    }
    // Handle dragging
    function onMouseMove(e) {
        if (isDragging) {

            let newX = e.clientX - 30;
            let newY = e.clientY - 20;

            // Get the bounds of the window
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;


            dragElement.style.left = newX + 'px';
            dragElement.style.top = newY + 'px';
        }
    }

    // Stop dragging
    function onMouseUp() {

        isDragging = false;
        doc.querySelector('html').setAttribute("data-isdragging", 'false')
        doc.removeEventListener('mousemove', onMouseMove);
        doc.removeEventListener('mouseup', onMouseUp);
    }
    function regenerateCSS(obj) {
        var css = obj['css'];
        var theme = obj['theme'];
        var id = 'headspin-preview-css';
        if (document.getElementById(id) == null) {
            var head =
                document.head || document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            style.type = 'text/css';
            style.id = id;
            style.textContent = css;
            head.appendChild(style);
        } else {
            var style = document.getElementById(id);
            style.textContent = css;
        }
        //document.querySelector( 'html' ).setAttribute( 'data-hsx', theme );
        if (document.getElementById(id)) {
            document.querySelector('#headspin-ds-styles-css')?.remove();
        }

    }
    /* Start of color sync functions */
    function regenerateAppData(data) {
        appData = JSON.parse(atob(data));
    }
    function regenerateColors(colorsJSON) {
        if (!breakdanceColorObjectCheck()) return false;
        var msg = JSON.parse(colorsJSON);
        var onColors = [];
        var on = {};
        //system
        headspinBroadcast.sync.postMessage('700');
        if (isBreakdance() && breakdanceColorObjectCheck()) {
            breakdanceColorCleanUpRoutine();
            setTimeout(() => {
                color_regeneration(msg, onColors, on);
                msg = null;
            }, 800);

            //custom
        }
        function color_regeneration(msg, onColors, on) {

            var n = 0;
            msg.brandColorSchema.data[msg.defaultTheme].forEach((shade) => {
                var name = 'hcl-' + msg.brandColorSchema.name.toLowerCase();

                window.parent.Breakdance.stores.globalStore.globalColors.forEach(
                    (color) => {
                        if (color.cssVariableName.includes(name)) {
                            if (
                                color.cssVariableName.includes(
                                    shade.step.toString()
                                )
                            ) {
                                color.value = shade.value;
                            }
                            n++;
                        }
                    }
                );
            });

            if (n === 0) {
                regenerateColors_addPalette(
                    msg.brandColorSchema,
                    msg.brandColorSchema.data[msg.defaultTheme],
                    msg.builderColorStepArray
                );
            }

            n = 0;
            msg.neutralColorSchema.data[msg.defaultTheme].forEach((shade) => {
                var name = 'hcl-' + msg.neutralColorSchema.name.toLowerCase();

                window.parent.Breakdance.stores.globalStore.globalColors.forEach(
                    (color) => {
                        if (color.cssVariableName.includes(name)) {
                            if (
                                color.cssVariableName.includes(
                                    shade.step.toString()
                                )
                            ) {
                                color.value = shade.value;
                            }
                            n++;
                        }
                    }
                );
            });
            if (n === 0) {
                regenerateColors_addPalette(
                    msg.neutralColorSchema,
                    msg.neutralColorSchema.data[msg.defaultTheme],
                    msg.builderColorStepArray
                );
            }

            n = 0;
            msg.colorSchemas.forEach((schema) => {
                if (schema?.enabled) {
                    schema.data[msg.defaultTheme].forEach((shade) => {
                        var name = 'hcl-' + schema.name.toLowerCase();

                        // a we have problem here,
                        //palettte 1: orange-some
                        //palette 2: or-
                        //orange some includes or alone
                        window.parent.Breakdance.stores.globalStore.globalColors.forEach(
                            (color) => {
                                if (color.cssVariableName.includes(name)) {

                                    if (
                                        color.cssVariableName == (name + "-" + shade.step.toString())

                                    ) {
                                        color.value = shade.value;
                                        n++;
                                    }
                                    //n++
                                }
                            }
                        );
                    });

                    if (n === 0) {
                        regenerateColors_addPalette(
                            schema,
                            schema.data[msg.defaultTheme],
                            msg.builderColorStepArray
                        );
                    }
                }
                n = 0;
            });

            onColors = generateOnColorArray(msg);
            onColors.forEach((clr) => {
                n = 0;
                window.parent.Breakdance.stores.globalStore.globalColors.forEach(
                    (color) => {
                        if (
                            color.cssVariableName.includes(clr.cssVariableName)
                        ) {
                            color.value = clr.value;
                            n = 1;
                        }
                    }
                );
                //
                if (n == 0) {
                    window.parent.Breakdance.stores.globalStore.globalColors.push(
                        clr
                    );
                    n = 0;
                }
            });
        }
    }
    function generateOnColorArray(msg) {
        var onColorArray = [
            {
                cssVariableName: 'hcl-on-brand',
                label: 'on.brand-9',
                value: msg.brandColorSchema.data.onColor,
            },
            {
                cssVariableName: 'hcl-on-neutral',
                label: 'on.neutral-9',
                value: msg.neutralColorSchema.data.onColor,
            },
        ];
        msg.colorSchemas.forEach((schema) => {
            if (!schema?.enabled) return;

            var obj = {};
            obj['cssVariableName'] =
                'hcl-on-' + schema.name.toLowerCase().toLowerCase();
            obj['label'] = 'on.' + schema.name.toLowerCase().toLowerCase() + '-9';
            obj['value'] = schema.data.onColor;

            onColorArray.push(obj);
            obj = null;
        });

        return onColorArray;
    }
    function regenerateColors_addPalette(schema, group, syncArray) {
        var n = 0;
        group.forEach((shade) => {
            n++;
            var c = {};
            var desc = '';
            var on = {};
            if (n < 3) desc = ' - Backgrounds';
            else if (n < 6) desc = ' - Component Background';
            else if (n < 9) desc = ' - Borders';
            else if (n < 11) desc = ' - Solid background (rg. button)';
            else desc = '- Text color';

            if (syncArray.includes(n.toString())) {
                c['cssVariableName'] =
                    'hcl' +
                    '-' +
                    schema.name.toString().toLowerCase() +
                    '-' +
                    shade.step.toString().toLowerCase();
                c['label'] =
                    schema.name.toString().toLowerCase() +
                    '.' +
                    shade.step.toString() +
                    desc;
                c['value'] = shade.value.toString().toLowerCase();
                window.parent.Breakdance.stores.globalStore.globalColors.push(c);
                if (n === 100) {
                    on['cssVariableName'] =
                        'hsx-' + '-on-' + schema.name.toString().toLowerCase();
                    on['label'] =
                        'on:' +
                        schema.name.toString().toLowerCase() +
                        ' - use as text on 9, 10';
                    on['value'] = schema.data.onColor.toString().toLowerCase();
                    window.parent.Breakdance.stores.globalStore.globalColors.push(
                        on
                    );
                }
                c = null;
                desc = null;
            }
        });
    }
    function breakdanceColorObjectCheck() {
        var comp =
            window?.parent?.Breakdance?.stores?.globalStore?.globalColors[0];
        if (comp == undefined) return false;
        var obj = {
            cssVariableName: '',
            label: '',
            value: '',
        };
        return deepEqual(obj, comp);
    }
    function deepEqual(x, y) {
        var arrX = [],
            arrY = [];
        for (var key in x) {
            arrX.push(key);
        }
        for (var key in y) {
            arrY.push(key);
        }
        return checkArr(arrY, arrX);
    }
    function checkArr(targetarr, arr) {
        return targetarr
            .map((e) => {
                return arr.includes(e) ? true : false;
            })
            .every((e) => e === true);
    }
    function breakdanceColorCleanUpRoutine() {
        var arr = JSON.parse(
            JSON.stringify(
                window?.parent?.Breakdance?.stores?.globalStore?.globalColors
            )
        );
        arr.forEach((clr) => {
            if (clr.cssVariableName.includes('hcl-')) {
                arr.pop(clr);
            }
        });
        window.parent.Breakdance.stores.globalStore.globalColors.length = 0;
        setTimeout(() => {
            arr.forEach((clr) => {
                if (!clr.cssVariableName.includes('hcl-')) {
                    window.parent.Breakdance.stores.globalStore.globalColors.push(
                        clr
                    );
                }
            });
        }, 250);
    }
    function bricksSetColor(value) {
        var prop = "_background";
        if (!value) value = "var(--hcl-brand-9)"


        var isClass = doc.querySelector('.brx-body').__vue_app__.config.globalProperties.$_state.activeClass;

        //wee need to check is class or ID selected to edit
        //we should check breakpoint
        //we should check color format, gradient etc
        //document.querySelector('iframe').contentDocument.querySelector('.brx-body').__vue_app__.config.globalProperties.$_activeClass._value
        //let state = doc.querySelector('iframe').contentDocument.querySelector('.brx-body').__vue_app__.config.globalProperties.$_state;


        if (isClass) {
            doc.querySelector('.brx-body').__vue_app__.config.globalProperties.$_state.activeClass.settings[prop] = { color: { "raw": value } }
            document.querySelector('.brx-body').__vue_app__.config.globalProperties.$_state.activeClass.settings[prop] = { color: { "raw": value } }
        }
        else {
            doc.querySelector('.brx-body').__vue_app__.config.globalProperties.$_state.activeElement.settings[prop] = { color: { "raw": value } }
            document.querySelector('.brx-body').__vue_app__.config.globalProperties.$_state.activeElement.settings[prop] = { color: { "raw": value } }
        }

    }
    function brxOpenColorModal(e, el) {
        var group = el.closest('[data-control="color"]');
        el.click();
        setTimeout(() => {
            group.querySelectorAll('.color-modes li .text').forEach(node => {
                if (node.textContent?.trim()?.toLowerCase() == "raw") {
                    node.click();
                    appState.activeInput = group.querySelector('.raw input')
                    showApp(e);
                }
            })
        }, 50);

    }
    /* End of color sync functions */
    function findBackground(element) {
        while (element && element !== document.body) {
            const styles = window.getComputedStyle(element);

            // Check if the element has a non-transparent background color
            if (styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                return {
                    backgroundColor: styles.backgroundColor,
                };
            }

            element = element.parentElement;
        }

        const bodyStyles = window.getComputedStyle(document.body);
        return {
            backgroundColor: false
        };
    }

    function setAttributeOnIframeRoot(att, value) {
        document.querySelector('html').setAttribute(att, value);
    }

    ////
});


