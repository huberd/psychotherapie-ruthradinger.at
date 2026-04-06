<?php
/**
* The base configuration for WordPress
*
* The wp-config.php creation script uses this file during the installation.
* You don't have to use the website, you can copy this file to "wp-config.php"
* and fill in the values.
*
* This file contains the following configurations:
*
* * Database settings
* * Secret keys
* * Database table prefix
* * ABSPATH
*
* @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
*
* @package WordPress
*/
// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'psychotherapie-ruthradinger.at');
/** Database username */
define('DB_USER', 'root');
/** Database password */
define('DB_PASSWORD', '');
/** Database hostname */
define('DB_HOST', 'localhost');
/** Database charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');
/** The database collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');
/**#@+
* Authentication unique keys and salts.
*
* Change these to different unique phrases! You can generate these using
* the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
*
* You can change these at any point in time to invalidate all existing cookies.
* This will force all users to have to log in again.
*
* @since 2.6.0
*/
define('AUTH_KEY', 'iBpulDSicRPVVOlsAXhI5Oj2S7pNmDRvGQwnoJ4tBTn7FEoWe8PTuJnlxn1s5+Gt');
define('SECURE_AUTH_KEY', 'IsDJXqF/BhxguCGuJwWUwrtnorbJgCuP8dJDfOmwQBkoJ5Ro+sjjwFHx8cVq8urU');
define('LOGGED_IN_KEY', '1Qd/UIFA1rWfi/YzXqg2pk/XJFBi9SzZPl8YsncPhqcZ1j2oQvek/Bsl91SHcMgL');
define('NONCE_KEY', 'QHrKob33hhGrgeSAyHsRSPAZl4QmTuIiGUi9esL0si9E8CpxcOLCVLZhoth/pA7a');
define('AUTH_SALT', 'V/0Th0n47HHosEXrhjbw7Fn+cvVQFDjeBu4Q82hFGbnVf9+3msFeM9Jdbv7innJf');
define('SECURE_AUTH_SALT', 'RhzCzdRk24hQx3zeZhTl71w31Lya5SK9l04NkLGRKEjia1+TcPUNgdfH5oDGt9ek');
define('LOGGED_IN_SALT', 'Cghu9AYegpsBRTA/PQylGdIaYPXZCa5i+RGAUBLupOIXRdGsN/LNknX9dAjKvyPM');
define('NONCE_SALT', 'IkgM5BhVZiG2IsDej+aKhcJFqkrI42iggGrtgAhrjZVsDNQxUHdmE/5lCNESv0dE');
/**#@-*/
/**
* WordPress database table prefix.
*
* You can have multiple installations in one database if you give each
* a unique prefix. Only numbers, letters, and underscores please!
*
* At the installation time, database tables are created with the specified prefix.
* Changing this value after WordPress is installed will make your site think
* it has not been installed.
*
* @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
*/
$table_prefix = 'pr_';
/**
* For developers: WordPress debugging mode.
*
* Change this to true to enable the display of notices during development.
* It is strongly recommended that plugin and theme developers use WP_DEBUG
* in their development environments.
*
* For information on other constants that can be used for debugging,
* visit the documentation.
*
* @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
*/
define( 'WP_DEBUG', false );
/* Add any custom values between this line and the "stop editing" line. */
define('UPLOADS', 'media');
/* That's all, stop editing! Happy publishing. */
/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
define( 'ABSPATH', __DIR__ . '/' );
}
/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
