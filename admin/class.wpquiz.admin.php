<?php

class WPQuiz_Admin {
    var $name = 'wpquize';

	function __construct() {
        if ( !is_admin()) return;

        add_action('admin_menu', array($this, 'admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
        
	}

	function enqueue_styles() {

	

		//wp_enqueue_style( $this->name, plugin_dir_url( __FILE__ ) . 'admin/plugin-name-admin.css', array(), $this->version, 'all' );
    }
    
	function enqueue_scripts($hook) {
        if ( $hook === 'toplevel_page_wpquiz' ) {
            wp_enqueue_script( $this->name, plugin_dir_url( __FILE__ ) . 'wpquiz.js', array(), null, true );
        }
    }

    function admin_menu() {
        add_menu_page(
            __( 'Custom Menu Title', 'textdomain' ),
            'custom menu',
            'manage_options',
            'wpquiz',
            array($this, 'quiz_page'),
            '',
            6
        );
    }
    
    function quiz_page() {
        echo '<div id="wpquiz-app"></div>';
    }

}