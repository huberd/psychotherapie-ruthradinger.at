<?php
if (!defined('WPINC')) die;

function headspin_user_preference_on_init()
{
}
/* TODO: Remove this code shit */
function headspin_on_init()
{
	headspin_user_preference_on_init();
}
function headspin_on_activate()
{
	
}
function headspin_on_deactivate()
{
	
}

function headspin_on_uninstall()
{
	headspin_clear_all_css_content_folders();

	headspin_clear_all_options('headspin_framework_css');
	headspin_clear_all_options('headspin_builder_vars');
	headspin_clear_all_options('headspin_app_data');
	headspin_clear_all_options('headspin_snapshots');
	headspin_clear_all_options('headspin_save_default_theme_option');

}



headspin_on_init();
//headspin_generate_css();

/* Only logged in users could call Ajax so wp_ajax, and not using wp_ajax_nopriv hook */
add_action('wp_ajax_headspin_generate_css', 'headspin_generate_css');
add_action('wp_ajax_headspin_generate_builder_vars', 'headspin_generate_builder_vars');
add_action('wp_ajax_headspin_save_app_data', 'headspin_save_app_data');
add_action('wp_ajax_headspin_save_snapshot', 'headspin_save_snapshot');
add_action('wp_ajax_headspin_reset_project_data', 'headspin_reset_project_data');
add_action('wp_ajax_headspin_save_default_theme_option', 'headspin_save_default_theme_option');
add_action('wp_ajax_headspin_save_tokens', 'headspin_save_tokens');

/*Added in v1.4 - Saves PostCSS app data */
add_action('wp_ajax_headspin_save_css_editor', 'headspin_save_css_editor');




function headspin_generate_css()
{
	if(! headspin_ajax_permission_allowed('nonce', 'headspin__ajax_nonce'))	die('Unauthorized Action!');
	$option_name = 'headspin_framework_css';

	
	if ('not-exist' === headspin_per_site_get_option($option_name)) {
		headspin_per_site_add_option($option_name, '');
	}

	$cssString = $_POST['css'];
	$css = strip_tags($cssString);
	$css = htmlspecialchars($css, ENT_HTML5 | ENT_NOQUOTES | ENT_SUBSTITUTE, 'utf-8');
	$css = stripslashes($css);
	headspin_save_CSS_to_contents_folder($css);
	headspin_per_site_update_option($option_name, $css);
	
	
	wp_die();
}
/*Helper function, TODO: remove */
function headspin_save_CSS_to_contents_folder($css)
{
	headspin_per_site_css_content_folder($css);
}


function headspin_generate_builder_vars()
{
	if(! headspin_ajax_permission_allowed('nonce', 'headspin__ajax_nonce'))	die('Unauthorized Action!');
	$option_name = 'headspin_builder_vars';

	if ('not-exist' === headspin_per_site_get_option($option_name)) {
		headspin_per_site_add_option($option_name, '');
	}

	$builderVars = wp_json_encode($_POST['vars']);
	headspin_per_site_update_option($option_name, $builderVars);
	wp_die();
}
function headspin_save_app_data()
{
	
	if(! headspin_ajax_permission_allowed('nonce', 'headspin__ajax_nonce'))	die('Unauthorized Action!');
	/* Delete old option and add new option */
	$option_name = 'headspin_app_data_v2';

	if ('not-exist' === headspin_per_site_get_option($option_name)) {
		headspin_per_site_add_option($option_name, '');
	}

	//$app_data = wp_json_encode($_POST['vars']);
	$app_data = $_POST['vars'];
	
	headspin_per_site_update_option($option_name, $app_data);
	headspin_db_cleanup();
	wp_die();
}
function headspin_save_tokens()
{
	
	if(! headspin_ajax_permission_allowed('nonce', 'headspin__ajax_nonce'))	die('Unauthorized Action!');
	/* Delete old option and add new option */
	$option_name = 'headspin_tokens';

	if ('not-exist' === headspin_per_site_get_option($option_name)) {
		headspin_per_site_add_option($option_name, '');
	}

	//$app_data = wp_json_encode($_POST['vars']);
	$app_data = $_POST['vars'];
	
	headspin_per_site_update_option($option_name, $app_data);
	headspin_db_cleanup();
	wp_die();
}
function headspin_save_default_theme_option()
{
	if(! headspin_ajax_permission_allowed('nonce', 'headspin__ajax_nonce'))	die('Unauthorized Action!');
	$option_name = 'headspin_base_theme';

	if ('not-exist' === headspin_per_site_get_option($option_name)) {
		headspin_per_site_add_option($option_name, '');
	}

	$app_data = wp_json_encode($_POST['vars']);
	headspin_per_site_update_option($option_name, $app_data);
	wp_die();
}


function headspin_reset_project_data(){
	if(! headspin_ajax_permission_allowed('nonce', 'headspin__ajax_nonce'))	die('Unauthorized Action!');
	$options  = array('headspin_framework_css', 'headspin_builder_vars', 'headspin_app_data_v2', 'headspin_tokens');
	foreach ($options as $option_name) {
		if ('not-exist' !== headspin_per_site_get_option($option_name)) {
			headspin_per_site_delete_option($option_name);
		}
	  }
	  wp_die();
}


function headspin_save_snapshot()
{
	if(! headspin_ajax_permission_allowed('nonce', 'headspin__ajax_nonce'))	die('Unauthorized Action!');
	
	$option_name = 'headspin_snapshots';
	if ('not-exist' === headspin_per_site_get_option($option_name)) {
		headspin_per_site_add_option($option_name, wp_json_encode(array()));
	}

	$snapshots = json_decode(get_option($option_name));
	$app_data = $_POST['vars'];
	array_push($snapshots, $app_data);

	
	headspin_per_site_update_option($option_name, wp_json_encode($snapshots));
	wp_die();
}
/**
 * Introduced: v1.3
 * Cleans up data that is no longer in use.
 */
function headspin_db_cleanup(){
	$options  = array('headspin-temp', 'headspin_app_data');
	foreach ($options as $option_name) {
		if ('not-exist' !== headspin_per_site_get_option($option_name)) {
			headspin_per_site_delete_option($option_name);
		}
	  }
}