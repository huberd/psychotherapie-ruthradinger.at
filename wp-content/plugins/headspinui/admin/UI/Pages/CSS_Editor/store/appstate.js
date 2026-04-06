document.addEventListener('alpine:init', () => {
    Alpine.store('app', {
        switchTheme(i) {
            editor.dispatch({ effects: themeConfig.reconfigure([themes[i].theme]) })
            Alpine.store("appState").codeTheme = themes[i].name;
        },
        setIframeWidth(width) {
            if (width == 'responsive') {
                Alpine.store("appState").previewLock = false;
                Alpine.store("appState").previewWidth = "100%";
            }
            else {
                Alpine.store("appState").previewWidth = width;
                Alpine.store("appState").previewLock = true;
            }
            _resizeCallback();
        },
        async runPostCSS() {

            var res = false;
            var buffer = "";
            var output = "";
            var cssDocs = "";
            if (!Alpine.store("pd").globals) return;
            Alpine.store("pd").globals.forEach(f => {
                if (!f.sheets) f.sheets = [];
                f.sheets.forEach(s => {
                    var cssDocs = `\n/*FOLDER: ${f.name}, FILE: ${s.name} / */`;
                    buffer += cssDocs;
                    buffer += s.css;
                })
            })
            output = runPostCSS(buffer);

        }
        //const throttledFetchData = throttle(runPostCSS(), 3000);

    })
    Alpine.store('appState', {
        "theme": "dark",
        "lightEditor": "noctisLilac",
        "darkEditor": "vscodeDark",
        "codeTheme": "VS Code Dark",
        "folderShow": true,
        "previewShow": true,
        "previewLock": true,
        "previewWidth": 1366,
        "previewLiveReload": true,
        "previewUrl": "",
        "fullscreen": false,
        "status_postCSS": 'ok',
        "status_validator": 'ok',
        "toolchainValidator": true,
        "toolchainMinify": true,
        "validator": {
            "active": true,
            "validationStatus": "offline",
            "errors": [],
        },
        "editor": {
            "auto_beautify": true,
        },
        "postCSS": {
            "errors": []
        }

    })
});
window.config_beautify =
{
    "indent_size": 2,
    "indent_char": " ",
    "indent_with_tabs": false,
    "editorconfig": false,
    "eol": "\n",
    "end_with_newline": false,
    "indent_level": 0,
    "preserve_newlines": true,
    "max_preserve_newlines": 10,
    "space_in_paren": false,
    "space_in_empty_paren": false,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "space_after_named_function": false,
    "brace_style": "collapse",
    "unindent_chained_methods": false,
    "break_chained_methods": false,
    "keep_array_indentation": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "e4x": false,
    "comma_first": false,
    "operator_position": "before-newline",
    "indent_empty_lines": false,
    "templating": ["auto"]
}

window.addEventListener("postCSS::rundone", async function (params) {
    var res;
    var css = "";
    try {
        css = Alpine.store('action').compiledCSS.replaceAll("/*", "\n/*");
        css = css_beautify(css.toString(), config_beautify)
        editorValidate.dispatch({
            changes: {
                from: 0,
                to: editorValidate.state.doc.length,
                insert: css
            }
        })
        res = await cssValidator.validateText(css)
        if (res.valid) {
            Alpine.store("action").reloadValidatorData(res);
            Alpine.store("appState").status_validator = 'ok';
        } else {
            Alpine.store("action").reloadValidatorData(res);
            Alpine.store("appState").status_validator = 'error';
        }
    } catch (error) {
        Alpine.store("appState").status_validator = 'offline';
        toast(`Validator Error`, { type: "danger", description: error });
    }
})
window.addEventListener("postCSS::error", async function (params) {
    Alpine.store("action").findPostCSSError();
})
