"use strict"
document.addEventListener('alpine:init', () => {
    Alpine.store('pd', {
        globals: [
            {
                "name": "My folder One",
                "collapsed": true,
                "id": "one-62de-4595-85b0-907389994411",
                "sheets": [
                    {
                        "name": "Buttons",
                        "active": false,
                        "css": "div{display: flex;}",
                        "id": "dasdde-62de-4595-85b0-907389994411",
                    },
                    {
                        "name": "Eeasy digital downlaods",
                        "active": false,
                        "css": "span{display: flex;}",
                        "id": "tuzztude-62de-4595-85b0-907389994411",
                    },
                ]
            },
            {
                "name": "My folder Two",
                "collapsed": true,
                "id": "two-62de-4595-85b0-857389994411",
                "sheets": [
                    {
                        "name": "Buttons",
                        "active": false,
                        "css": "button\n{\ndisplay: flex;\n}",
                        "id": "zehras-62de-4595-85b0-907389994411",
                    },
                    {
                        "name": "Eeasy digital downlaods",
                        "active": false,
                        "css": "a\n{display: flex;}",
                        "id": "4ewsfedw-62de-4595-85b0-907389994411",
                    },
                ]
            }
        ]
    })
    Alpine.store('action', {
        currentSheet: null,
        currentFolder: null,
        isSheetActive: 'none',
        iframeCover: false,
        compiledCSS: '',
        initAction() {
            console.log('initAction')
            this.checkActiveSheet();
            Alpine.store("appState").previewUrl = window.location.origin;
            this.noNullSheetArray();
        },
        generateUUID() {
            return '10000000-1000-4000-8000-100000000000'.replace(
                /[018]/g,
                (c) =>
                    (
                        +c ^
                        (crypto.getRandomValues(new Uint8Array(1))[0] &
                            (15 >> (+c / 4)))
                    ).toString(16)
            );
        },
        checkActiveSheet() {
            if (!Alpine.store("pd").globals) return;
            Alpine.store("pd").globals.forEach(f => {
                if (!f.sheets) f.sheet = [];
                f.sheets.forEach(s => {
                    if (s.active) this.isSheetActive = true;
                })
            })
            return this.isSheetActive;
        },
        canAddSheet() {
            var canAdd = false;
            if (currentSheet) console.log("sada")
        },
        deactivateAllSheets() {
            if (!Alpine.store("pd").globals) return;
            Alpine.store("pd").globals.forEach(f => {
                if (!f.sheets) f.sheets = [];
                f.sheets.forEach(s => {
                    s.active = false;
                })
            })
        },
        addFolder() {
            var folder = {
                "name": "My folder",
                "collapsed": true,
                "sheets": [],
                "id": this.generateUUID()
            }
            Alpine.store("pd").globals.push(folder);
            this.currentFolder = Alpine.store("pd").globals[Alpine.store("pd").globals.length - 1];
        },
        addFile() {
            if (!this.currentFolder) return toast(`Could not add file`, { type: "danger", description: "You need to have active folder in order to add file" });
            this.deactivateAllSheets();
            var sheet = {
                "name": "Buttons",
                "active": true,
                "css": "",
                "id": this.generateUUID()
            };
            if (!this.currentFolder.sheets) this.currentFolder.sheets = [];
            let index = this.currentFolder.sheets.push(sheet);
            this.currentFolder.collapsed = false;
            this.currentSheet = this.currentFolder[index];
            editor.dispatch({
                changes: {
                    from: 0,
                    to: editor.state.doc.length,
                    insert: ""
                }
            })
        },
        sortFolder(item, position) {
            var oldIndex = -10;
            var arr = Alpine.store('pd').globals;
            if (!arr) return false;
            arr.forEach((f, i) => {
                if (f.id == item) oldIndex = i;
            })
            arraymove(arr, oldIndex, position)
        },
        sortFiles(item, position, newGroupIndex) {
            this.noNullSheetArray();
            var sheets = null;
            var itemCopy = null;
            var arr = Alpine.store('pd').globals;
            var copy = JSON.parse(JSON.stringify(Alpine.store('pd').globals))
            //finde item in Alpine store, copy and remove
            if (!copy) return false;
            copy?.forEach((f, i) => {
                f?.sheets.forEach((s, ind) => {
                    if (s.id == item) {
                        itemCopy = s;
                        f.sheets.splice(ind, 1);
                    }
                })
            })
            //Add item to new group (could be same group, but we need support sort across groups)
            copy[newGroupIndex].sheets.splice(position, 0, itemCopy);
            setTimeout(() => {
                Alpine.store('pd').globals = JSON.parse(JSON.stringify(copy))
                window.dispatchEvent(headspinReloadTokenAPP);
                copy = null;
                this.noNullSheetArray();
            }, 120);


        },
        noNullSheetArray() {
            if (!Alpine.store('pd').globals) Alpine.store('pd').globals = [];
            Alpine.store('pd').globals.forEach(f => {
                if (!f.sheets) f['sheets'] = [];
            })
        },
        collapseExpandFolder() {
            var expanded = false;

            if (!Alpine.store("pd").globals) return;
            Alpine.store("pd").globals?.forEach(f => { if (f.collapsed == false) expanded = true })

            if (expanded) Alpine.store("pd").globals.forEach(f => { f.collapsed = true; })
            else Alpine.store("pd").globals.forEach(f => { f.collapsed = false; })
        },
        findPostCSSError() {
            var n = 0;
            var str = "";
            var count = 0, newCount = 0, oldCount;
            var name = "";
            var found = false;
            var fx, sx;
            var line = Alpine.store('appState')?.postCSS?.errors[0]?.line || 10000000000;
            if (!Alpine.store("pd").globals) return;

            Alpine.store("pd").globals.forEach(f => {
                if (!f.sheets) f.sheets = [];
                f.sheets.forEach(s => {
                    str = s.css;
                    newCount = Number(str.split(/\r\n|\r|\n/).length);
                    oldCount = count;
                    count = Number(count) + Number(newCount);
                    s['error'] = false;
                    if (!found && (count >= line)) {
                        found = true;
                        fx = f;
                        sx = s;
                        Alpine.store('appState').postCSS.errors[0]['datails'] = `Folder:\t ${f.name}\t => \tFile:${s.name}\t=>\tError at line:\t${line - oldCount}`
                        Alpine.store('appState').postCSS.errors[0]['sheetLine'] = `${line - oldCount}`
                    }
                })
                f['error'] = false;

            })
            if (found) {
                fx['error'] = true;
                sx['error'] = true;
            }

        },
        autoFixCSS(str) {
            str = str || this.currentSheet.css;
            var t, regex;
            var reason = Alpine.store("appState").postCSS.errors[0].reason.toLowerCase();
            //semicolon missing
            if (reason.includes("semicolon")) {
                regex = /(?<![;\{\}]|\*\/|\s*\/{2}.*?)$/gm
                str = str.replace(regex, ";");
            }
            //missing closing bracket
            if (reason.includes("unclosed bracket")) {

            }
            //missing opening bracket
            if (reason.includes("unknown word")) {

            }
        },
        editorThemeSetter() {
            var key = "vscodeDark";
            var index = -1;
            if (Alpine.store("appState").theme == 'dark') {
                key = Alpine.store("appState").darkEditor;
                editorThemes.forEach((t, i) => {
                    if (t && (key == t.key)) index = i;
                })
            }
            else {
                key = Alpine.store("appState").lightEditor;
                editorThemes.forEach((t, i) => {
                    if (t && (key == t.key)) index = i;
                })

            }
            if (index < 0) return;
            editor.dispatch({
                effects: themeConfig.reconfigure([editorThemes[index].theme])
            })
            editorValidate.dispatch({
                effects: themeConfig.reconfigure([editorThemes[index].theme])
            })
        },
        generateMQ(type) {
            var width = getComputedStyle(document.querySelector("#iframe-preview")).width;
            var below = `@media screen and (max-width:${width}){}`;
            var above = `@media screen and (min-width:${width}){}`;
            if (type == 'above') {
                //copyToclipboard => above
                //toast => above
                copyToClipboard(above);
            }
            else {
                //copyToclipboard => below
                //toast => below
                copyToClipboard(below);
            }
        },
        reloadValidatorData(res) {
            Alpine.store('appState').validator.errors = [];
            if (res.valid) return;
            Alpine.store('appState').validator.errors = res.errors;
        },
        activateSheet(sheet, folder) {
            var beauify = true;
            if (!Alpine.store("pd").globals) return;
            Alpine.store("pd").globals.forEach(f => {
                if (!f.sheets) f.sheets = [];
                f.sheets.forEach(s => {
                    s.active = false;
                })
            })
            sheet.active = true;
            this.checkActiveSheet();
            this.currentSheet = sheet;
            this.currentFolder = folder;
            if (this.currentSheet.error) beauify = false;
            if (Alpine.store('appState').editor.auto_beautify && beauify) sheet.css = css_beautify(sheet.css, config_beautify);

            editor.dispatch({
                changes: {
                    from: 0,
                    to: editor.state.doc.length,
                    insert: sheet.css
                }
            })
        }
    })


});

function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}
const countBrackets = (str, closed) => {
    let counter = 0;
    var check = "{";
    if (closed === true) check = "}";
    for (let i = 0; i < str.length; i++) {
        if (str[i] === check) {
            counter++;
        }
    }
    return counter;
}