import process from 'process';
import postcss from 'postcss';
import cssValidator from 'w3c-css-validator';

import autoprefixer from 'autoprefixer';
import plugin_nested from 'postcss-nested';
import plugin_simple_vars from 'postcss-simple-vars';
import customMedia from 'postcss-custom-media';

import plugin_focus from 'postcss-focus';
import customSelectors from 'postcss-custom-selectors';
import minify from 'postcss-minify';
import conditions from '@csstools/postcss-conditional-values';
import mediaMinMax from '@csstools/postcss-media-minmax';
//import plugin_preset_env from 'postcss-preset-env';

//plugin_nested - OK 
//plugin_extend - ERROR process
/*
* import circle from 'postcss-circle';npm i postcss-preset-env
* import plugin_extend from 'postcss-extend';
* import plugin_mixins  from "postcss-mixins";
import plugin_each from 'postcss-each';
*/

//https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-design-tokens


window.process = process;
window.postcss = postcss;
//postcss-cascade-layer
var postcss_plugins_nominify = [autoprefixer, conditions, plugin_focus, plugin_nested, plugin_simple_vars, customSelectors, customMedia, mediaMinMax];
var postcss_plugins_minify = [autoprefixer, conditions, plugin_focus, plugin_nested, plugin_simple_vars, customSelectors, customMedia, mediaMinMax, minify];
/**
 * Each and simple vars collision
 */

window.cssValidator = cssValidator;
window.runPostCSS = async function (css) {
  Alpine.store('appState').postCSS.errors = [];
  Alpine.store('action').compiledCSS = '';
  var __plugins = postcss_plugins_nominify;
  if (Alpine.store("appState").toolchainMinify) __plugins = postcss_plugins_minify;
  try {
    var xcss = '';
    var res = false;
    postcss(__plugins).process(css)
      .then(value => {
        console.log({ value })
        xcss = value.css;
        Alpine.store('action').compiledCSS = xcss;
        const evt = new CustomEvent("postCSS::rundone", { detail: "done" });
        window.dispatchEvent(evt);
        Alpine.store('appState').status_postCSS = 'ok';
        Alpine.store("action").findPostCSSError();
        return toast(`Build success`, { type: "success", description: 'CSS styles baked with success!' });
      })
      .catch(err => {
        Alpine.store('appState').postCSS.errors.push(err);
        const evtError = new CustomEvent("postCSS::error", { detail: err });
        window.dispatchEvent(evtError);
        Alpine.store('appState').status_postCSS = 'error';
        toast(`Build error`, { type: "danger", description: err });
      })


  } catch (error) {
    toast(`Build error`, { type: "danger", description: error });
  }

}
/*
postcss
.use(plugin_each)
.use(plugin_media)
.use(plugin_nested)
.process(css).then(value => console.log(value.css))
*/
