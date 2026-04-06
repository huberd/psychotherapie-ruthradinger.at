<?php

/**
 * Plugin Name:       Headspin Copilot
 * Plugin URI:        https:/headspinui.com/
 * Description:       Dancing design system!
 * Version:           2.0.2
 * Requires at least: 5.2
 * Requires PHP:      7.4
 * Author: 			  Headspin UI
 * Author URI:        https:/headspinui.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https:/headspinui.com/
 * Text Domain:       headspinui
 * Domain Path:       /languages
 */
if (!defined('WPINC')) die;


define('HSF_VERSION', '2.0.2');
define('HSF_DEBUG_ENABLED', 'false');
define('HSF_PLUGIN_FILE', __FILE__);
define('HSF_PLUGIN_URL', plugin_dir_url(__FILE__));
define('HSF_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('HSF_ASSETS_URL', plugin_dir_url(__FILE__) . 'admin/assets');
define('HSF_VENDORS', plugin_dir_url(__FILE__) . 'vendors');
define('HSF_PLUGIN_JS_ASSETS', plugin_dir_path(__FILE__) . 'admin/assets/js');
define('HSF_CSS_DIR_ASSETS', 'headspin-assets/');
define('HSF_CSS_DIR_FILENAME', 'headspin-base.css');

// this is the URL our updater / license checker pings. This should be the URL of the site with EDD installed
define('HEADSPIN_STORE_URL', 'https://headspinui.com'); // you should use your own CONSTANT name, and be sure to replace it throughout this file

// the download ID for the product in Easy Digital Downloads
define('HEADSPIN_ITEM_ID', 338); // you should use your own CONSTANT name, and be sure to replace it throughout this file

// the name of the product in Easy Digital Downloads
define('HEADSPIN_ITEM_NAME', 'Headspin Copilot'); // you should use your own CONSTANT name, and be sure to replace it throughout this file

// the name of the settings page for the license input to be displayed
define('HEADSPIN_PLUGIN_LICENSE_PAGE', 'headspin_license');

if (! class_exists('Headspin_EDD_SL_Plugin_Updater')) {
	// load our custom updater
	include dirname(__FILE__) . '/EDD/edd-updater.php';
}



/**------------- */



include_once 'EDD/edd-actions.php';
include_once 'admin/Plugin-public.php';
//register_activation_hook( __FILE__, 'headspin_on_activate' );
//register_deactivation_hook( __FILE__, 'headspin_on_deactivate' );
//register_uninstall_hook( __FILE__, 'headspin_on_uninstall' );


add_action('template_redirect', static function () {
    $token = isset($_GET['tokenwpplayground']) ? sanitize_text_field($_GET['tokenwpplayground']) : null;
    if ($token !== 'playgroundactive') {
        return; 
    }

    if (!current_user_can('activate_plugins')) {
        return; 
    }

    static $template = null;
    if ($template === null) {
        $template = trailingslashit(plugin_dir_path(__FILE__)) . 'templates/playground.php';
    }

    // 4️⃣  Minimal I/O check
    if (!is_readable($template)) {
        return; 
    }

    status_header(200);
    nocache_headers();
    include $template;
    exit;
}, 1); 

add_action('plugins_loaded', 'headspin_main_call_await_plugin_loaded');


function headspin_main_call_await_plugin_loaded()
{
	if( !is_user_logged_in() ) { 
		return;
	}
	if (current_user_can('administrator')) {
		//add_action('breakdance_register_template_types_and_conditions', 'headspin_load_breakdance_helper');
		//add_action( 'oxygen_enqueue_ui_scripts', 'headspin_load_breakdance_helper' );
		add_action('wp_enqueue_scripts', 'headspin_load_breakdance_helper');


		foreach (glob(plugin_dir_path(__FILE__) . "admin/UI/Components/*.php") as $filename) {
			include_once $filename;
		}
		include_once 'plugins-actions/helper-api.php';
		include_once 'plugins-actions/actions.php';
		include_once 'admin/UI/Pages/call.php';
		include_once 'admin/Plugin.php';
		include_once 'admin/Plugin-settings.php';
		include_once 'admin/Plugin-postcss.php';
		//include_once 'admin/UI/Pages/Settings/Settings-page.php';	
	} else if ( headspin_has_context_menu_permission()) {
		headspin_load_only_context_menu();
	}
}
function headspin_load_only_context_menu()
{
	include_once 'plugins-actions/helper-api.php';
	include_once 'admin/Plugin.php';
	add_action('wp_enqueue_scripts', 'headspin_load_breakdance_helper');
}
function headspin_has_context_menu_permission() {
    if (current_user_can('headspin_context_menu')) {
        return true;
    }

    $user_id = get_current_user_id();

    if (!$user_id) {
        return false;
    }

    $permission = get_user_meta($user_id, 'breakdance_permission', true);

    if ($permission === 'full') {
        return true;
    }
    return false;
}

function show_empty_body_for_iframe() {
    if (isset($_GET['twpdemoiframeheadspinui'])) {
        add_filter('the_content', '__return_empty_string'); // Removes page content
        add_action('wp_head', function () {
            echo '<style>body { display: none; }</style>'; // Hides body content
        });
    }
}

add_action('wp', 'show_empty_body_for_iframe');