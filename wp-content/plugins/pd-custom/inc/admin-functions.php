<?php

add_action( 'admin_menu', 'pd_remove_menus', 99 );
function pd_remove_menus(){
    global $woocommerce;
    $user = wp_get_current_user();

    if($user && in_array( 'editor', (array) $user->roles ) ){
        remove_menu_page( 'jetpack' );                    //Jetpack* 
        // remove_menu_page( 'edit.php' );                   //Posts
        remove_menu_page( 'upload.php' );                 //Media
        remove_menu_page( 'edit-comments.php' );          //Comments
        remove_menu_page( 'themes.php' );                 //Appearance
        remove_menu_page( 'plugins.php' );                //Plugins
        remove_menu_page( 'users.php' );                  //Users
        remove_menu_page( 'tools.php' );                  //Tools
        remove_menu_page( 'options-general.php' );        //Settings
        remove_menu_page( 'wpseo_workouts' );             // YOAST SEO
        remove_menu_page( 'akeebabackupwp/akeebabackupwp.php' );             // Akeeba Backup
    }
}

add_action('wp_dashboard_setup', 'pd_remove_dashboard_widgets', 99);
function pd_remove_dashboard_widgets() {
    global $wp_meta_boxes;
    unset($wp_meta_boxes['dashboard']['normal']['core']['wpseo-dashboard-overview']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
}

