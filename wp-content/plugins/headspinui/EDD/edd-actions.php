<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Initialize the updater. Hooked into `init` to work with the
 * wp_version_check cron job, which allows auto-updates.
 */
function headspin_edd_sl_sample_plugin_updater() {

	// To support auto-updates, this needs to run during the wp_version_check cron job for privileged users.
	$doing_cron = defined( 'DOING_CRON' ) && DOING_CRON;
	if ( ! current_user_can( 'manage_options' ) && ! $doing_cron ) {
		return;
	}

	// retrieve our license key from the DB
	$license_key = trim( get_option( 'headspin_edd_license_key' ) );

	// setup the updater
	$edd_updater = new Headspin_EDD_SL_Plugin_Updater(
		HEADSPIN_STORE_URL,
		HSF_PLUGIN_FILE,
		array(
			'version' => HSF_VERSION,                    // current version number
			'license' => $license_key,             // license key (used get_option above to retrieve from DB)
			'item_id' => HEADSPIN_ITEM_ID,       // ID of the product
			'author'  => 'Easy Digital Downloads', // author of this plugin
			'beta'    => false,
		)
	);

}
add_action( 'init', 'headspin_edd_sl_sample_plugin_updater' );


/************************************
* the code below is just a standard
* options page. Substitute with
* your own.
*************************************/

/**
 * Adds the plugin license page to the admin menu.
 *
 * @return void
 */
// page_title menu_title  capability menu_slug callback
/*
function headspin_edd_license_menu() {
	add_submenu_page(
		'headspin',
		__( 'License' ),
		__( 'License' ),
		'manage_options',
		HEADSPIN_PLUGIN_LICENSE_PAGE,
		'headspin_edd_license_page'
	);
}
//add_action( 'admin_menu', 'headspin_edd_license_menu' );
*/
function headspin_edd_license_page() {
	add_settings_section(
		'headspin_edd_license',
		__( 'Plugin License' ),
		'headspin_edd_license_key_settings_section',
		HEADSPIN_PLUGIN_LICENSE_PAGE
	);
	add_settings_field(
		'headspin_edd_license_key',
		'<label for="headspin_edd_license_key">' . __( 'License Key' ) . '</label>',
		'headspin_edd_license_key_settings_field',
		HEADSPIN_PLUGIN_LICENSE_PAGE,
		'headspin_edd_license',
	);
	?>
	<div class="wrap">
		<h2><?php esc_html_e( 'Headspin Settings' ); ?></h2>
		<form method="post" action="options.php">

			<?php
			do_settings_sections( HEADSPIN_PLUGIN_LICENSE_PAGE );
			settings_fields( 'headspin_edd_license' );
			submit_button();
			?>

		</form>
	<?php
}

/**
 * Adds content to the settings section.
 *
 * @return void
 */
function headspin_edd_license_key_settings_section() {
	esc_html_e( 'Please enter license below' );
}

/**
 * Outputs the license key settings field.
 *
 * @return void
 */
function headspin_edd_license_key_settings_field() {
	$license = get_option( 'headspin_edd_license_key' );
	$status  = get_option( 'headspin_edd_license_status' );

	?>
	<p class="description"><?php esc_html_e( 'Enter your license key.' ); ?></p>
	<?php
	printf(
		'<input type="password" class="regular-text" id="headspin_edd_license_key" name="headspin_edd_license_key" value="%s" />',
		esc_attr( $license )
	);
	$button = array(
		'name'  => 'edd_license_deactivate',
		'label' => __( 'Deactivate License' ),
	);
	$statusIndicator = array(
		'style'  => 'border: 1px solid green; color: green; padding: .25rem .75rem; border-radius: .25rem;',
		'label' => __( 'Active' ),
	);
	if ( 'valid' !== $status ) {
		$button = array(
			'name'  => 'edd_license_activate',
			'label' => __( 'Activate License' ),
		);
		$statusIndicator = array(
			'style'  => 'border: 1px solid red; color: red; padding: .25rem .75rem; border-radius: .25rem;',
			'label' => __( 'Inactive' ),
		);
	}
	wp_nonce_field( 'headspin_edd_nonce', 'headspin_edd_nonce' );
	?>
	<input type="submit" class="button-secondary" name="<?php echo esc_attr( $button['name'] ); ?>" value="<?php echo esc_attr( $button['label'] ); ?>"/>
		<div style="padding: 1rem 0; display: flex; gap: 1rem;align-items: center;">
			<div>License status:</div>
			<div style="<?php echo esc_attr( $statusIndicator['style'] ); ?>"><?php echo esc_attr( $statusIndicator['label'] ); ?></div>
		</div>
	<?php
}

/**
 * Registers the license key setting in the options table.
 *
 * @return void
 */
function headspin_edd_register_option() {
	register_setting( 'headspin_edd_license', 'headspin_edd_license_key', 'headspin_edd_sanitize_license' );
}
add_action( 'admin_init', 'headspin_edd_register_option' );

/**
 * Sanitizes the license key.
 *
 * @param string  $new The license key.
 * @return string
 */
function headspin_edd_sanitize_license( $new ) {
	$old = get_option( 'headspin_edd_license_key' );
	if ( $old && $old !== $new ) {
		delete_option( 'headspin_edd_license_status' ); // new license has been entered, so must reactivate
	}

	return sanitize_text_field( $new );
}

/**
 * Activates the license key.
 *
 * @return void
 */
function headspin_edd_activate_license() {

	// listen for our activate button to be clicked
	if ( ! isset( $_POST['edd_license_activate'] ) ) {
		return;
	}

	// run a quick security check
	if ( ! check_admin_referer( 'headspin_edd_nonce', 'headspin_edd_nonce' ) ) {
		return; // get out if we didn't click the Activate button
	}

	// retrieve the license from the database
	$license = trim( get_option( 'headspin_edd_license_key' ) );
	if ( ! $license ) {
		$license = ! empty( $_POST['headspin_edd_license_key'] ) ? sanitize_text_field( $_POST['headspin_edd_license_key'] ) : '';
	}
	if ( ! $license ) {
		return;
	}

	// data to send in our API request
	$api_params = array(
		'edd_action'  => 'activate_license',
		'license'     => $license,
		'item_id'     => HEADSPIN_ITEM_ID,
		'item_name'   => rawurlencode( HEADSPIN_ITEM_NAME ), // the name of our product in EDD
		'url'         => home_url(),
		'environment' => function_exists( 'wp_get_environment_type' ) ? wp_get_environment_type() : 'production',
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
	if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {

		if ( is_wp_error( $response ) ) {
			$message = $response->get_error_message();
		} else {
			$message = __( 'An error occurred, please try again.' );
		}
	} else {

		$license_data = json_decode( wp_remote_retrieve_body( $response ) );

		if ( false === $license_data->success ) {

			switch ( $license_data->error ) {

				case 'expired':
					$message = sprintf(
						/* translators: the license key expiration date */
						__( 'Your license key expired on %s.', 'headspinui' ),
						date_i18n( get_option( 'date_format' ), strtotime( $license_data->expires, current_time( 'timestamp' ) ) )
					);
					break;

				case 'disabled':
				case 'revoked':
					$message = __( 'Your license key has been disabled.', 'headspinui' );
					break;

				case 'missing':
					$message = __( 'Invalid license.', 'headspinui' );
					break;

				case 'invalid':
				case 'site_inactive':
					$message = __( 'Your license is not active for this URL.', 'headspinui' );
					break;

				case 'item_name_mismatch':
					/* translators: the plugin name */
					$message = sprintf( __( 'This appears to be an invalid license key for %s.', 'headspinui' ), HEADSPIN_ITEM_NAME );
					break;

				case 'no_activations_left':
					$message = __( 'Your license key has reached its activation limit.', 'headspinui' );
					break;

				default:
					$message = __( 'An error occurred, please try again.', 'headspinui' );
					break;
			}
		}
	}

		// Check if anything passed on a message constituting a failure
	if ( ! empty( $message ) ) {
		$redirect = add_query_arg(
			array(
				'page'          => HEADSPIN_PLUGIN_LICENSE_PAGE,
				'sl_activation' => 'false',
				'message'       => rawurlencode( $message ),
				'nonce'			=> wp_create_nonce('headspin_license_nonce'),
			),
			admin_url( 'admin.php' )
		);

		wp_safe_redirect( $redirect );
		exit();
	}

	// $license_data->license will be either "valid" or "invalid"
	if ( 'valid' === $license_data->license ) {
		update_option( 'headspin_edd_license_key', $license );
	}
	update_option( 'headspin_edd_license_status', $license_data->license );
	wp_safe_redirect( admin_url( 'admin.php?page=' . HEADSPIN_PLUGIN_LICENSE_PAGE ) );
	exit();
}
add_action( 'admin_init', 'headspin_edd_activate_license' );

/**
 * Deactivates the license key.
 * This will decrease the site count.
 *
 * @return void
 */
function headspin_edd_deactivate_license() {

	// listen for our activate button to be clicked
	if ( isset( $_POST['edd_license_deactivate'] ) ) {

		// run a quick security check
		if ( ! check_admin_referer( 'headspin_edd_nonce', 'headspin_edd_nonce' ) ) {
			return; // get out if we didn't click the Activate button
		}

		// retrieve the license from the database
		$license = trim( get_option( 'headspin_edd_license_key' ) );

		// data to send in our API request
		$api_params = array(
			'edd_action'  => 'deactivate_license',
			'license'     => $license,
			'item_id'     => HEADSPIN_ITEM_ID,
			'item_name'   => rawurlencode( HEADSPIN_ITEM_NAME ), // the name of our product in EDD
			'url'         => home_url(),
			'environment' => function_exists( 'wp_get_environment_type' ) ? wp_get_environment_type() : 'production',
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
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {

			if ( is_wp_error( $response ) ) {
				$message = $response->get_error_message();
			} else {
				$message = __( 'An error occurred, please try again.' );
			}

			$redirect = add_query_arg(
				array(
					'page'          => HEADSPIN_PLUGIN_LICENSE_PAGE,
					'sl_activation' => 'false',
					'message'       => rawurlencode( $message ),
					'nonce'			=> wp_create_nonce('headspin_license_nonce'),
				),
				admin_url( 'admin.php' )
			);

			wp_safe_redirect( $redirect );
			exit();
		}

		// decode the license data
		$license_data = json_decode( wp_remote_retrieve_body( $response ) );

		// $license_data->license will be either "deactivated" or "failed"
		if ( 'deactivated' === $license_data->license ) {
			delete_option( 'headspin_edd_license_status' );
		}

		wp_safe_redirect( admin_url( 'admin.php?page=' . HEADSPIN_PLUGIN_LICENSE_PAGE ) );
		exit();

	}
}
add_action( 'admin_init', 'headspin_edd_deactivate_license' );

/**
 * Checks if a license key is still valid.
 * The updater does this for you, so this is only needed if you want
 * to do something custom.
 *
 * @return void
 */
function headspin_edd_check_license() {

	$license = trim( get_option( 'headspin_edd_license_key' ) );

	$api_params = array(
		'edd_action'  => 'check_license',
		'license'     => $license,
		'item_id'     => HEADSPIN_ITEM_ID,
		'item_name'   => rawurlencode( HEADSPIN_ITEM_NAME ),
		'url'         => home_url(),
		'environment' => function_exists( 'wp_get_environment_type' ) ? wp_get_environment_type() : 'production',
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

	if ( is_wp_error( $response ) ) {
		return false;
	}

	$license_data = json_decode( wp_remote_retrieve_body( $response ) );

	if ( 'valid' === $license_data->license ) {
		echo 'valid';
		exit;
		// this license is still valid
	} else {
		echo 'invalid';
		exit;
		// this license is no longer valid
	}
}

/**
 * This is a means of catching errors from the activation method above and displaying it to the customer
 */
function headspin_edd_admin_notices() {
	//Added Nonce and esc_html
	if ( isset( $_GET['sl_activation'] ) && ! empty( $_GET['message'] ) && wp_verify_nonce($_GET['nonce'], 'headspin_license_nonce')) {

		switch ( $_GET['sl_activation'] ) {

			case 'false':
				$message = urldecode( $_GET['message'] );
				?>
				<div class="error">
					<p><?php echo esc_html( $message ); ?></p>
				</div>
				<?php
				break;

			case 'true':
			default:
				// Developers can put a custom success message here for when activation is successful if they way.
				break;

		}
	}
}
add_action( 'admin_notices', 'headspin_edd_admin_notices' );