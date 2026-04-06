<?php
/*
Plugin Name:  PD Custom
Description:  Custom Code
Version:      1.00
Author:       poettlerdigital
Author URI:   https://poettler.com
Text Domain:  pd-custom
*/


/**
 * Register and enqueue a custom stylesheet in the frontend.
 */
add_action('wp_enqueue_scripts', 'pd_set_up_styles');
function pd_set_up_styles() {

    if( ! function_exists('get_plugin_data') ){
		require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
	}
	$plugin_data = get_plugin_data( __FILE__ );
    
    wp_enqueue_style( 'pd-custom',  plugin_dir_url( __FILE__ ) . 'custom.css', array(),  $plugin_data['Version'] );     
}


add_filter( 'login_headerurl', fn() => home_url() );
add_filter( 'login_headertitle', fn() => get_option( 'blogname' ) );

add_action( 'login_enqueue_scripts', 'pd_login_logo' );
function pd_login_logo() { ?>
	<style type="text/css">
		body.login div#login h1 a {
			background-image: url(<?php echo plugin_dir_url( __FILE__ ); ?>assets/logo.svg );
            background-size: 100%;
			width: 100%;
            height: 140px;
            background-size: contain;
		}
	</style>
<?php }


require_once 'inc/admin-functions.php';
require_once 'inc/custom-shortcodes.php';