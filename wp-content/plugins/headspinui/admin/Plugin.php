<?php
if (!defined('ABSPATH')) exit; 
require_once 'UI/Pages/Settings/_api.php';
/**
 * Javascript Admin assets
 */
//comment
/** Add module type support */
/*
add_filter( 'script_loader_tag', 'headspin_add_type_attribute', 10, 3 );
function headspin_add_type_attribute( $tag, $handle, $src ) {
    $type = wp_scripts()->get_data( $handle, 'type' );

    if ( $type && is_string( $type ) ) {
        $tag = str_replace( ' src=', ' type="' . esc_attr( $type ) . '" src=', $tag );
    }

    return $tag;
}
*/

function headspin_load_framework()
{
	// Unfortunately we can't just enqueue our scripts here - it's too early. So register against the proper action hook to do it
	add_action('admin_enqueue_scripts', 'headspin_enqueue_admin_framework');
}
function headspin_load_breakdance_helper()
{

	//wp_enqueue_style('headspin-styles', HSF_PLUGIN_URL . 'public/headspin_framework.css', '', filemtime(HSF_PLUGIN_DIR .  'public/headspin_framework.css'));
	$ws_path =  HSF_PLUGIN_DIR;
	$folder_name = "breakdance";
	
	wp_register_script('hsf-context', HSF_PLUGIN_URL . 'breakdance/context-app.js', '', filemtime($ws_path . $folder_name . '/context-app.js'), array(
		'in_footer' => true,
		'strategy'  => 'defer',
	));
	wp_enqueue_script('hsf-context', HSF_PLUGIN_URL . 'breakdance/context-app.js', '', filemtime($ws_path . $folder_name . '/context-app.js'), true);


	$option_name = 'headspin_builder_vars';
	if ('not-exist' === headspin_per_site_get_option($option_name)) {
		headspin_per_site_add_option($option_name, '');
	}
	if ('not-exist' === headspin_per_site_get_option('headspin_tokens')) {
		headspin_per_site_add_option('headspin_tokens', '');
	}
	$builderVars = json_decode(headspin_per_site_get_option($option_name));
	$headspinTokens = headspin_per_site_get_option('headspin_tokens');
	wp_localize_script('hsf-context', '__HS_BUILDER_VARS', array('vars' => $builderVars, 'tokens' => $headspinTokens, 'stylespath' => HSF_PLUGIN_URL . 'breakdance/context.css'));
}

/**
 *  CSS and JS for App
 */

function headspin_enqueue_admin_framework()
{
	$ws_path =  HSF_PLUGIN_DIR;
	$n = 0;
	/*backward*/

	wp_enqueue_style('headspin-admin-css', HSF_PLUGIN_URL . 'admin/assets/css/headspin.css', '', filemtime($ws_path .  'admin/assets/css/headspin.css'));
	wp_enqueue_style('headspin-admin-css-usnlider', HSF_PLUGIN_URL . 'admin/assets/css/headspin-variables.css', '', filemtime($ws_path .  'admin/assets/css/headspin-variables.css'));

	wp_enqueue_style('headspin-reinvented-colorwheel', HSF_PLUGIN_URL . 'vendors/reinvented-colorwheel.css', '', filemtime($ws_path .  'vendors/reinvented-colorwheel.css'));
	wp_enqueue_style('headspin-tippy', HSF_PLUGIN_URL . 'vendors/tippy.css', '', filemtime($ws_path .  'vendors/tippy.css'));

	// Call example <scripty type="module">

	foreach (glob(plugin_dir_path(__FILE__) . "assets/modules/*.js") as $file) {
		$n++;
		$filename = substr($file, strrpos($file, '/') + 1);
		wp_enqueue_script('hsfmodule-' . $n, plugin_dir_url(__FILE__) . 'assets/modules/' . $filename, '', filemtime($ws_path . 'admin/assets/modules/' . $filename), true);
		wp_scripts()->add_data('hsfmodule-' . $n, 'type', 'module');
	}
	
	function make_scripts_modules( $tag, $handle, $src ) {
    
		if (!str_contains($handle, 'hsfmodule') ) {
			return $tag;
		}

		$id = $handle . '-js';

		$parts = explode( '</script>', $tag ); // Break up our string

		foreach ( $parts as $key => $part ) {
			if ( false !== strpos( $part, $src ) ) { // Make sure we're only altering the tag for our module script.
				$parts[ $key ] = '<script type="module" src="' . esc_url( $src ) . '" id="' . esc_attr( $id ) . '">';
			}
		}

		$tags = implode( '</script>', $parts ); // Bring everything back together

		return $tags;
}
add_filter('script_loader_tag', 'make_scripts_modules' , 10, 3);

	//wp_enqueue_script('hsf-alpine', HSF_PLUGIN_URL . 'vendors/alpinejs.js', '', filemtime($ws_path . 'vendors/alpinejs.js'), true);
	wp_register_script('hsf-reinvented-colorwheel', HSF_PLUGIN_URL . 'vendors/reinvented-colorwheel.js', '', filemtime($ws_path . 'vendors/reinvented-colorwheel.js'), array(
		'in_footer' => true,
		'strategy'  => 'defer',
	));
	wp_register_script('hsf-tippy', HSF_PLUGIN_URL . 'vendors/tippy.js', '', filemtime($ws_path . 'vendors/tippy.js'), array(
		'in_footer' => true,
		'strategy'  => 'defer',
	));
	wp_register_script('hsf-alpine-sort', HSF_PLUGIN_URL . 'vendors/alpine-sort.js', '', filemtime($ws_path . 'vendors/alpine-sort.js'), array(
		'in_footer' => true,
		'strategy'  => 'defer',
	));
	wp_register_script('hsf-alpine', HSF_PLUGIN_URL . 'vendors/alpinejs.js', '', filemtime($ws_path . 'vendors/alpinejs.js'), array(
		'in_footer' => true,
		'strategy'  => 'defer',
	));
	wp_register_script('hsf-chroma', HSF_PLUGIN_URL . 'vendors/chroma-2.js', '', filemtime($ws_path . 'vendors/chroma-2.js'), array(
		'in_footer' => true,
		'strategy'  => 'defer',
	));
	wp_register_script('hsf-popper', HSF_PLUGIN_URL . 'vendors/popper.js', '', filemtime($ws_path . 'vendors/popper.js'), array(
		'in_footer' => true,
		'strategy'  => 'defer',
	));


	wp_enqueue_script('hsf-reinvented-colorwheel', HSF_PLUGIN_URL . 'vendors/reinvented-colorwheel.js', '', filemtime($ws_path . 'vendors/reinvented-colorwheel.js'), true);
	wp_enqueue_script('hsf-chroma', HSF_PLUGIN_URL . 'vendors/chroma-2.js', '', filemtime($ws_path . 'vendors/chroma-2.js'), true);
	wp_enqueue_script('hsf-popper', HSF_PLUGIN_URL . 'vendors/popper.js', '', filemtime($ws_path . 'vendors/popper.js'), true);
	wp_enqueue_script('hsf-tippy', HSF_PLUGIN_URL . 'vendors/tippy.js', '', filemtime($ws_path . 'vendors/tippy.js'), true);
	wp_enqueue_script('hsf-alpine-sort', HSF_PLUGIN_URL . 'vendors/alpine-sort.js', '', filemtime($ws_path . 'vendors/alpine-sort.js'), true);
	wp_enqueue_script('hsf-alpine', HSF_PLUGIN_URL . 'vendors/alpinejs.js', '', filemtime($ws_path . 'vendors/alpinejs.js'), true);
	wp_scripts()->add_data('hsf-autoanimate', 'type', 'module');


	foreach (glob(plugin_dir_path(__FILE__) . "assets/js/*.js") as $file) {
		$n++;
		$filename = substr($file, strrpos($file, '/') + 1);
		wp_enqueue_script('hsfjs-' . $n, plugin_dir_url(__FILE__) . 'assets/js/' . $filename, '', filemtime($ws_path . 'admin/assets/js/' . $filename), true);
	}
	
	
	$headspin_app_data = false; 
	if ('not-exist' !== headspin_per_site_get_option('headspin_app_data_v2')) {
		$headspin_app_data = headspin_per_site_get_option('headspin_app_data_v2');
	}
	else if ('not-exist' !== headspin_per_site_get_option('headspin_app_data')) {
		$headspin_app_data = json_decode(headspin_per_site_get_option('headspin_app_data'));
	}
	
	

	wp_localize_script('hsf-tippy', 'hajax_var', array('url' => admin_url('admin-ajax.php'), 'nonce' =>  wp_create_nonce('headspin__ajax_nonce'), 'adminUrl' => admin_url()));
	wp_localize_script('hsf-tippy', 'HeadspinloadData', array( 
		'data' => $headspin_app_data, 
		"siteURL" => wp_upload_dir()['baseurl'],  
		"pluginVersion" => HSF_VERSION,
		"license" =>  headspin_load_products_status(),
	));
	//https://pressidium.com/blog/nonces-in-wordpress-all-you-need-to-know/
}
