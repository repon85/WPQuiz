<?php

class WPQuiz_Admin {
    var $name = 'wpquiz';

	function __construct() {
        if ( !is_admin()) return;

        add_action('admin_menu', array($this, 'admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action( 'init', array($this, 'register_quiz_post'));
	}

    
	function enqueue_scripts($hook) {
        if ( $hook !== 'toplevel_page_wpquiz' ) return;
        wp_enqueue_style( $this->name, plugin_dir_url( __FILE__ ) . 'wpquiz.css');
        wp_enqueue_script( $this->name, plugin_dir_url( __FILE__ ) . 'wpquiz.js', array(), time(), true );
        wp_localize_script($this->name, 'WPQuiz', array(
            'url' => admin_url( 'admin-ajax.php' )
        ) );
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

    function register_quiz_post () {
        register_post_type( 'wpquiz', array(
            'label'                 => 'WP Quiz',
            'hierarchical'          => false,
            'public'                => true,
            'supports'              => array('title', 'custom-fields')
        ));
    }


}