<?php
if (!defined('ABSPATH')) exit; 
function headspin_public_styles()
		{
			if ( is_multisite() ) {
				switch_to_blog( get_current_blog_id());
				$css_url =  trailingslashit(wp_upload_dir()['baseurl']) . HSF_CSS_DIR_ASSETS . HSF_CSS_DIR_FILENAME;
				$css_dir =  trailingslashit(wp_upload_dir()['basedir']) . HSF_CSS_DIR_ASSETS . HSF_CSS_DIR_FILENAME;
				$version = HSF_VERSION;
				if(is_file($css_dir)) $version = filemtime($css_dir);
				wp_enqueue_style('headspin-ds-styles', $css_url, '', $version);	
				restore_current_blog();
			}
			else {
				$css_url =  trailingslashit(wp_upload_dir()['baseurl']) . HSF_CSS_DIR_ASSETS . HSF_CSS_DIR_FILENAME;
				$css_dir =  trailingslashit(wp_upload_dir()['basedir']) . HSF_CSS_DIR_ASSETS . HSF_CSS_DIR_FILENAME;
				$version = HSF_VERSION;
				if(is_file($css_dir)) $version = filemtime($css_dir);
				wp_enqueue_style('headspin-ds-styles', $css_url, '', $version);		
			}
				
		}

function headspin_public_add_theme_data_attribute($output) {
	$option_name = 'headspin_base_theme';
	$option = headspin_per_site_get_option($option_name);
	$option = str_replace('"', "", $option);
	if($option == "dark"){
		return $output . ' data-hsx="dark"';
		do_action( 'qm/debug', "is dark" );
	}
	else{
		return $output . ' data-hsx="light"';
	}  
}
add_action('wp_enqueue_scripts', 'headspin_public_styles');