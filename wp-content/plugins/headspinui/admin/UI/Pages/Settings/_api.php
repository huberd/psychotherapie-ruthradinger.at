<?php if (!defined('ABSPATH')) exit;

add_action('wp_ajax_headspin_license_check_ajax', 'headspin_license_check_ajax');
add_action('wp_ajax_headspin_license_activate_ajax', 'headspin_license_activate_ajax');
add_action('wp_ajax_headspin_license_deactivate_ajax', 'headspin_license_deactivate_ajax');

function headspin_license_check_ajax()
{

    if (!headspin_ajax_permission_allowed('nonce', 'headspin__ajax_nonce'))    die('Unauthorized Action!');

    $license_option = 'headspin_edd_license_key';
    $status_option = 'headspin_edd_license_status';
    $license_store = $_POST['license_store'];
    $access = headspin_load_products_status();
    update_option($license_option, $license_store);

    $status =  headspin_edd_check_license_copilot('check_license', 'copilot_free');
    //$status_pro = headspin_edd_check_license_copilot('check_license', 'copilot_pro');

    update_option($status_option, $status);
    $status = get_option('headspin_edd_license_status');
    wp_send_json($access);
    wp_die();
}
function headspin_check_product_lineup_access()
{
    $status = get_option('headspin_edd_license_status');
    $access  = array(
        'copilot_free'  => 'invalid',
        'copilot_pro'   => 'invalid',
    );
    if ($status != 'valid') {
        return $access;
    }
    $status_copilot_free    =   headspin_edd_check_license_copilot('check_license', 'copilot_free');
    $status_copilot_pro     =   headspin_edd_check_license_copilot('check_license', 'copilot_pro');

    return $access = array(
        'copilot_free'  =>  $status_copilot_free,
        'copilot_pro'   =>  $status_copilot_pro,
    );
}
function headspin_check_product_copilot_pro($transiniet){
    $status = get_option('headspin_edd_license_status');
    $access  = array(
        'copilot_free'  => 'invalid',
        'copilot_pro'   => 'invalid',
    );
    if ($status != 'valid') {
        return $access;
    }
    
    $pro     =   headspin_edd_check_license_copilot('check_license', 'copilot_pro');

    set_transient( 'headspin_copilot_free', 'valid', 14 * DAY_IN_SECONDS );
    set_transient( 'headspin_copilot_pro', $pro, 14 * DAY_IN_SECONDS );

    return $access = array(
        'copilot_free'  =>  'valid',
        'copilot_pro'   =>  $pro,
    );
}
function headspin_load_products_status(){
    $access = array(
        'copilot_free'  =>  'invalid',
        'copilot_pro'   =>  'invalid',
    );
    $free = 'invalid';
    $pro = 'invalid';
    if ( false === ( $value_free = get_transient( 'value' ) ) ) {
        // FREE: this code runs when there is no valid transient set for copilot free
        $free = headspin_edd_check_license_copilot('check_license', 'copilot_free');
        update_option('headspin_edd_license_status', $free);
    }
    else{
        $free   =   get_transient( 'headspin_copilot_free');
        update_option('headspin_edd_license_status', $free);
    }
    if ( false === ( $value_pro = get_transient( 'value' ) ) ) {
         // PRO: this code runs when there is no valid transient set for copilot pro
         $pro = headspin_edd_check_license_copilot('check_license', 'copilot_pro');
    }
    else{
        $pro    =   get_transient( 'headspin_copilot_pro');
    }
    return $access = array(
        'copilot_free'  =>  $free,
        'copilot_pro'   =>  $pro,
    );
   
}
function headspin_license_activate_ajax()
{

    if (!headspin_ajax_permission_allowed('nonce', 'headspin__ajax_nonce'))    die('Unauthorized Action!');

    $license_option = 'headspin_edd_license_key';

    $license_store = $_POST['license_store'];
    update_option($license_option, $license_store);

    $status =  headspin_edd_activate_license_copilot('activate_license', 'copilot_free');
    //$status_pro = headspin_edd_check_license_copilot('check_license', 'copilot_pro');
    wp_send_json($status);
    wp_die();
}
function headspin_license_deactivate_ajax()
{
    if (!headspin_ajax_permission_allowed('nonce', 'headspin__ajax_nonce'))    die('Unauthorized Action!');

    headspin_edd_deactivate_license_copilot();
}

/* */
function headspin_edd_check_license_copilot($edd_action, $product)
{
    $product_id = 0;
    switch ($product) {
        case 'copilot_free':
            $product_id = 338;
            break;
        case 'copilot_pro':
            $product_id = 1592;
            break;
        case 'wireframes_bd':
            $product_id = 921;
            break;

        default:
            break;
    }
    $license = trim(get_option('headspin_edd_license_key'));
    $api_params = array(
        'edd_action'  => $edd_action,
        'license'     => $license,
        'item_id'     => $product_id,
        'item_name'   => rawurlencode(HEADSPIN_ITEM_NAME),
        'url'         => home_url(),
        'environment' => function_exists('wp_get_environment_type') ? wp_get_environment_type() : 'production',
    );

    // Call the custom API.
    $response = wp_remote_post(
        HEADSPIN_STORE_URL,
        array(
            'timeout'   => 15,
            'sslverify' => false,
            'body'      => $api_params,
        )
    );

    if (is_wp_error($response)) {
        return false;
    }

    $license_data = json_decode(wp_remote_retrieve_body($response));

    if ('valid' === $license_data->license) {
        return 'valid';
        exit;
        // this license is still valid
    } else {
        return 'invalid';
        exit;
        // this license is no longer valid
    }
}

function headspin_edd_activate_license_copilot($edd_action, $product)
{

    $license = trim(get_option('headspin_edd_license_key'));

    $api_params = array(
        'edd_action'  => $edd_action,
        'license'     => $license,
        'item_id'     => 338,
        'item_name'   => rawurlencode(HEADSPIN_ITEM_NAME),
        'url'         => home_url(),
        'environment' => function_exists('wp_get_environment_type') ? wp_get_environment_type() : 'production',
    );
   
    // Call the custom API.
    $response = wp_remote_post(
        HEADSPIN_STORE_URL,
        array(
            'timeout'   => 15,
            'sslverify' => false,
            'body'      => $api_params,
        )
    );
    // make sure the response came back okay
    if (is_wp_error($response) || 200 !== wp_remote_retrieve_response_code($response)) {

        if (is_wp_error($response)) {
            $message = $response->get_error_message();
        } else {
            $message = __('An error occurred, please try again.');
        }
    } else {

        $license_data = json_decode(wp_remote_retrieve_body($response));
        if (false === $license_data->success) {

            switch ($license_data->error) {

                case 'expired':
                    $message = sprintf(
                        /* translators: the license key expiration date */
                        __('Your license key expired on %s.', 'headspinui'),
                        date_i18n(get_option('date_format'), strtotime($license_data->expires, current_time('timestamp')))
                    );
                    break;

                case 'disabled':
                case 'revoked':
                    $message = __('Your license key has been disabled.', 'headspinui');
                    break;

                case 'missing':
                    $message = __('Invalid license.', 'headspinui');
                    break;

                case 'invalid':
                case 'site_inactive':
                    $message = __('Your license is not active for this URL.', 'headspinui');
                    break;

                case 'item_name_mismatch':
                    /* translators: the plugin name */
                    $message = sprintf(__('This appears to be an invalid license key for %s.', 'headspinui'), HEADSPIN_ITEM_NAME);
                    break;

                case 'no_activations_left':
                    $message = __('Your license key has reached its activation limit.', 'headspinui');
                    break;

                default:
                    $message = __('An error occurred, please try again.', 'headspinui');
                    break;
            }
        }
    }
    
   

    // $license_data->license will be either "valid" or "invalid"
    if ('valid' === $license_data->license) {
        update_option('headspin_edd_license_key', $license);
    }
    update_option('headspin_edd_license_status', $license_data->license);
   
    return $license_data;
}
function headspin_edd_deactivate_license_copilot()
{


    // retrieve the license from the database
    $license = trim(get_option('headspin_edd_license_key'));

    // data to send in our API request
    $api_params = array(
        'edd_action'  => 'deactivate_license',
        'license'     => $license,
        'item_id'     => HEADSPIN_ITEM_ID,
        'item_name'   => rawurlencode(HEADSPIN_ITEM_NAME), // the name of our product in EDD
        'url'         => home_url(),
        'environment' => function_exists('wp_get_environment_type') ? wp_get_environment_type() : 'production',
    );

    // Call the custom API.
    $response = wp_remote_post(
        HEADSPIN_STORE_URL,
        array(
            'timeout'   => 15,
            'sslverify' => false,
            'body'      => $api_params,
        )
    );

    // make sure the response came back okay
    if (is_wp_error($response) || 200 !== wp_remote_retrieve_response_code($response)) {

        if (is_wp_error($response)) {
            $message = $response->get_error_message();
        } else {
            $message = __('An error occurred, please try again.');
        }

        $redirect = add_query_arg(
            array(
                'page'          => HEADSPIN_PLUGIN_LICENSE_PAGE,
                'sl_activation' => 'false',
                'message'       => rawurlencode($message),
                'nonce'            => wp_create_nonce('headspin_license_nonce'),
            ),
            admin_url('admin.php')
        );

        wp_safe_redirect($redirect);
        exit();
    }

    // decode the license data
    $license_data = json_decode(wp_remote_retrieve_body($response));

    // $license_data->license will be either "deactivated" or "failed"
    if ('deactivated' === $license_data->license) {
        delete_option('headspin_edd_license_status');
    }

    wp_safe_redirect(admin_url('admin.php?page=' . HEADSPIN_PLUGIN_LICENSE_PAGE));
    exit();
}
