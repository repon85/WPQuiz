<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://example.com
 * @since             1.0.0
 * @package           WPQuiz
 *
 * @wordpress-plugin
 * Plugin Name:       WP Quiz
 * Plugin URI:        http://example.com/wpquiz-uri/
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Your Name or Your Company
 * Author URI:        http://example.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wpquiz
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

require_once plugin_dir_path( __FILE__ ) . 'class.wpquiz.core.php';
$WP_Quiz = new WP_Quiz();

require_once plugin_dir_path( __FILE__ ) . 'admin/class.wpquiz.admin.php';
require_once plugin_dir_path( __FILE__ ) . 'frontend/wpquiz.frontend.php';

function activate_wpquiz() {
}

function deactivate_wpquiz() {

}

register_activation_hook( __FILE__, 'activate_wpquiz' );
register_deactivation_hook( __FILE__, 'deactivate_wpquiz' );

