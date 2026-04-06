document.addEventListener('alpine:init', () => {
    Alpine.store('iframe', {
        "init": false,
        "uuid": "dsadhsaj-dsuajhd-djsajdh-hdsajhd",
        "resolver": [],
        "resolverLimit": 100,
        setMode(mode, e) {
            setTimeout(() => {
                e.target.contentDocument.querySelector('html').setAttribute('data-hsx', mode);
                e.target.contentWindow['headspinEnforceMode'] = mode;
                headspinPresave()
            }, 500);
        },
        setHomeUrl() {
            return window.location.origin + '?twpdemoiframeheadspinui';
        },
        setMode2(mode, e) {

        },
        getComputedVariable(variable, mode, uuid) {
            let t = document.getElementById('twp-iframe-light')

            return this.getCSSVariableValue(variable, t, mode)
        },
        getCSSVariableValue(variableName, t, mode) {
            if (!this.init) return "#f2f2f2"
            let w = t.contentWindow;
            let element = t.contentDocument.querySelector('#test-light');
            if (mode == 'dark') element = t.contentDocument.querySelector('#test-dark');


            return w.getComputedStyle(element).getPropertyValue(variableName).trim();
        },
        regenCSS() {
            Alpine.store('project').regenratePaletteOutput();
            this.regeneratePreviewCSS(_$MAIN_generate_CSS())
        },
        regeneratePreviewCSS(obj, cssObject = true) {

            if (!cssObject) {
                var css = obj['css'];
            }
            else {
                var css = obj;
            }
            var docs = [];
            let iframes = [document.querySelector('#twp-iframe-light'), document.querySelector('#playground-preview')];

            iframes.forEach(iframe => {
                if (iframe) docs.push(iframe.contentDocument);
            })
            var id = 'headspin-preview-css';

            docs.forEach(doc => {
                if (doc.getElementById(id) == null) {
                    var head =
                        doc.head || doc.getElementsByTagName('head')[0];

                    var style = doc.createElement('style');
                    style.type = 'text/css';
                    style.id = id;
                    style.textContent = css;
                    console.log('if-created');
                    head.appendChild(style);
                } else {

                    var style = doc.getElementById(id);
                    style.textContent = css;
                    console.log('if-updated');
                }
                if (doc.getElementById(id)) {

                    doc.querySelector('#headspin-ds-styles-css')?.remove();
                }
            })


            this.init = true;

        }


    })

    const rt_CSS = new BroadcastChannel('headspin_realtime_css');

    rt_CSS.onmessage = (event) => {
        Alpine.store('iframe').regeneratePreviewCSS(event.data);
    };

})
