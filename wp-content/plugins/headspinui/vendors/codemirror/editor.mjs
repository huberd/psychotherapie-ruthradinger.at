import { EditorView, basicSetup } from "codemirror"
import { css } from "@codemirror/lang-css"
import { EditorState } from "@codemirror/state"
import { Compartment } from '@codemirror/state'
import { keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { search } from '@codemirror/search'



import { dracula } from 'thememirror';
import { noctisLilac } from 'thememirror';
import { ayuLight } from 'thememirror';
import {birdsOfParadise} from 'thememirror';
import {rosePineDawn} from 'thememirror';
import {tomorrow} from 'thememirror';
import {bespin} from 'thememirror';
import {amy} from 'thememirror';
import {cobalt} from 'thememirror';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';



window.editorThemes = [
  {
    "name": "VS Code Dark",
    "key": "vscodeDark",
    "theme": vscodeDark
  },

  {
    "name": "Dracula Dark",
    "key": "dracula",
    "theme": dracula
  },
  {
    "name": "Bespin Dark",
    "key": "bespin",
    "theme": bespin
  },
  {
    "name": "Birds of Paradise Dark",
    "key": "birdsOfParadise",
    "theme": birdsOfParadise
  },
  {
    "name": "Amy Dark",
    "key": "amy",
    "theme": amy
  },
  {
    "name": "Cobalt Dark",
    "key": "cobalt",
    "theme": cobalt
  },
  {
    "name": "VS Code Light",
    "key": "vscodeLight",
    "theme": vscodeLight
  },
  {
    "name": "Noctis Lilac Light",
    "key": "noctisLilac",
    "theme": noctisLilac
  },
  {
    "name": "Ayu Light",
    "key": "ayuLight",
    "theme": ayuLight
  },
  {
    "name": "Rose Pine Down Light",
    "key": "rosePineDawn",
    "theme": rosePineDawn
  },
  {
    "name": "Tomorrow Light",
    "key": "tomorrow",
    "theme": tomorrow
  },
  
]
window.themePicker = editorThemes[0].theme;
window.themeConfig = new Compartment()
const codeMirrorOptions = {
  doc: "hey",
  lineNumbers: true,
  lineWrapping: true,
  width: '300px',
  autoCloseBrackets: true,
  cursorScrollMargin: 48,
  indentUnit: 2,
  tabSize: 2,
  styleActiveLine: true,
  viewportMargin: 99,
};
window.state = EditorState.create(codeMirrorOptions)
//window.themeConfig = new Compartment()

window.editor = new EditorView({
  doc: state.doc,
  extensions: [
    basicSetup,
    css(),
    search({ top: true }),
    keymap.of([indentWithTab]),
    themeConfig.of([editorThemes[0].theme]),
    EditorView.updateListener.of((v) => {
      if (v.docChanged) {
        Alpine.store("action").currentSheet.css = editor.state.doc.toString();
        betterFunction();
      }
    })
  ],
  parent: document.querySelector("#hscm-editor"),

})

window.editorValidate = new EditorView({
  doc: state.doc,
  extensions: [
    basicSetup,
    css(),
    keymap.of([indentWithTab]),
    themeConfig.of([editorThemes[0].theme]),
  ],
  parent: document.querySelector("#hscm-validate"),

})

/*Basic onUpdate things */
const betterFunction = debounce(onEditorUpdate, 1000);

function onEditorUpdate() {
  
  Alpine.store("app").runPostCSS()
}
function debounce(callback, delay) {

  let timer
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback();
    }, delay)
  }
}