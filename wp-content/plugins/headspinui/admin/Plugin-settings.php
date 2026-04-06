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

function headspin_load_settings()
{
	// Unfortunately we can't just enqueue our scripts here - it's too early. So register against the proper action hook to do it
	add_action('admin_enqueue_scripts', 'headspin_enqueue_admin_settings');
}


/**
 *  CSS and JS for App
 */

function headspin_enqueue_admin_settings()
{   
    //we need license API helper
    
	$ws_path =  HSF_PLUGIN_DIR;
	$n = 0;
	/*backward*/

	wp_enqueue_style('headspin-admin-css', HSF_PLUGIN_URL . 'admin/assets/css/headspin.css', '', filemtime($ws_path .  'admin/assets/css/headspin.css'));

	wp_enqueue_style('headspin-tippy', HSF_PLUGIN_URL . 'vendors/tippy.css', '', filemtime($ws_path .  'vendors/tippy.css'));

	// Call example <scripty type="module">

	
	



	wp_register_script('hsf-tippy', HSF_PLUGIN_URL . 'vendors/tippy.js', '', filemtime($ws_path . 'vendors/tippy.js'), array(
		'in_footer' => true,
		'strategy'  => 'defer',
	));

	wp_register_script('hsf-alpine', HSF_PLUGIN_URL . 'vendors/alpinejs.js', '', filemtime($ws_path . 'vendors/alpinejs.js'), array(
		'in_footer' => true,
		'strategy'  => 'defer',
	));
    foreach (glob(plugin_dir_path(__FILE__) . "UI/Pages/Settings/store/*.js") as $file) {
		$n++;
		$filename = substr($file, strrpos($file, '/') + 1);
		wp_enqueue_script('hsfjs-' . $n, plugin_dir_url(__FILE__) . 'UI/Pages/Settings/store/' . $filename, '', filemtime($ws_path . 'admin/UI/Pages/Settings/store/' . $filename), true);
	}
	


	//wp_enqueue_script('hsf-tippy', HSF_PLUGIN_URL . 'vendors/tippy.js', '', filemtime($ws_path . 'vendors/tippy.js'), true);
	wp_enqueue_script('hsf-alpine', HSF_PLUGIN_URL . 'vendors/alpinejs.js', '', filemtime($ws_path . 'vendors/alpinejs.js'), true);
	


	
    $license = get_option( 'headspin_edd_license_key' );
    $status  = get_option( 'headspin_edd_license_status' );
	

	wp_localize_script('hsf-tippy', 'hajax_var', array('url' => admin_url('admin-ajax.php'), 'nonce' =>  wp_create_nonce('headspin__ajax_nonce'), 'adminUrl' => admin_url()));
	
    wp_localize_script('hsf-alpine', 'HeadspinloadData', 
        array( 'license' => $license, 
        'licenseStatus' =>  get_option('headspin_edd_license_status'),
        'item_id' => HEADSPIN_ITEM_ID,
        'url' => home_url(), 
        "siteURL" => wp_upload_dir()['baseurl'],
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('headspin__ajax_nonce'),
        'access' => headspin_load_products_status(),
        "pluginVersion" => HSF_VERSION ));
	    //https://pressidium.com/blog/nonces-in-wordpress-all-you-need-to-know/

   
}
