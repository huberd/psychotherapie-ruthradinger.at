<?php
if (!defined('ABSPATH')) exit;
add_action('admin_menu', 'headspin_custom_menu');


  function headspin_custom_menu(){
    $icon_data_in_base64 = base64_encode('<svg xmlns="http://www.w3.org/2000/svg" width="268pt" height="240pt" viewBox="0 0 268 240" version="1.1"><g id="inherit"><path fill="inherit" opacity="1.00" d=" M 129.51 0.00 L 135.43 0.00 C 143.47 1.87 151.20 6.28 155.30 13.68 C 191.55 73.48 227.72 133.33 263.90 193.16 C 266.19 196.88 267.53 201.12 268.00 205.45 L 268.00 208.53 C 267.15 216.17 263.73 223.77 257.45 228.43 C 248.33 235.69 234.42 235.95 225.08 228.94 C 218.66 224.43 215.49 217.00 211.45 210.55 C 199.43 190.81 187.61 170.93 175.47 151.26 C 172.21 151.46 169.27 153.02 166.35 154.35 C 156.60 159.11 147.68 165.61 140.11 173.36 C 141.75 178.43 145.28 182.56 147.82 187.18 C 151.83 194.27 157.31 200.93 158.58 209.21 C 160.02 219.29 155.15 230.03 146.54 235.49 C 143.38 237.47 139.86 238.73 136.38 240.00 L 128.57 240.00 C 120.52 238.19 112.68 233.93 108.47 226.57 C 90.03 196.03 71.56 165.49 53.04 135.00 C 45.44 122.88 49.42 105.11 61.89 97.87 C 73.55 90.30 90.76 93.95 98.32 105.63 C 107.84 120.92 116.92 136.50 126.46 151.78 C 131.59 151.24 136.32 148.99 140.94 146.86 C 148.99 142.83 156.54 137.53 162.52 130.77 C 160.94 127.09 158.66 123.78 156.66 120.33 C 142.66 96.72 128.24 73.37 114.14 49.83 C 111.13 44.72 107.45 39.86 105.93 34.04 C 103.62 25.17 105.92 15.03 112.46 8.46 C 116.93 3.73 123.16 1.05 129.51 0.00 Z"/><path fill="inherit" opacity="1.00" d=" M 12.57 183.58 C 18.89 179.06 27.13 178.17 34.61 179.63 C 44.00 181.61 52.00 189.03 54.76 198.21 C 57.44 206.68 56.02 216.46 50.55 223.55 C 43.16 233.48 28.83 237.67 17.41 232.58 C 8.21 228.83 2.20 219.91 0.00 210.47 L 0.00 205.52 C 0.76 196.83 5.24 188.45 12.57 183.58 Z"/></g></svg>');
    $home_page = add_menu_page( 
        'Headspin Framework', 
        'Headspin', 
        'edit_posts', 
        'headspin', 
        'hsf_framework_callback_function', 
        'data:image/svg+xml;base64,'.$icon_data_in_base64

       );
       //TODO: Remove old license page
       
      
    $subpage_settings = add_submenu_page(
      'headspin',
      __( 'Settings' ),
      __( 'Settings' ),
      'manage_options',
      HEADSPIN_PLUGIN_LICENSE_PAGE,
      'headspin_settings_page_callback'
    );
    /*
    $subpage_postcss = add_submenu_page(
      'headspin',
      __( 'CSS Code' ),
      __( 'CSS Code' ),
      'manage_options',
      'css',
      'headspin_postcss_page_callback'
    );
    */
    // Load the JS/CSS conditionally
    add_action( 'load-' . $home_page, 'headspin_load_framework' );
    add_action( 'load-' . $subpage_settings, 'headspin_load_settings' );
    //add_action( 'load-' . $subpage_postcss, 'headspin_load_postcss' );

    include_once 'Framework.php';
    include_once 'Settings.php';
}

  //include_once 'PostCSS.php';
 
  //include_once 'Settings-page.php';
// 