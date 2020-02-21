<?php

class WPQuiz_Admin {
    var $wpquiz;
    var $name = 'wpquiz';

    function __construct()
    {
        if (!is_admin()) return;

        global $WP_Quiz;
        $this->wpquiz = $WP_Quiz;

        add_action('admin_menu', array($this, 'admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));


        add_action('wp_ajax_save_quiz', array($this, 'save_quiz'));
        add_action('wp_ajax_nopriv_save_quiz', array($this, 'save_quiz'));

        add_action('wp_ajax_get_quizzes', array($this, 'get_quizzes'));
        add_action('wp_ajax_nopriv_get_quizzes', array($this, 'get_quizzes'));

        add_action('wp_ajax_get_quiz', array($this, 'get_quiz'));
        add_action('wp_ajax_nopriv_get_quiz', array($this, 'get_quiz'));
    }

    function enqueue_scripts($hook)
    {
        if ($hook !== 'toplevel_page_wpquiz') return;
        wp_enqueue_style($this->name, plugin_dir_url(__FILE__) . 'wpquiz.css');
        wp_enqueue_script($this->name, plugin_dir_url(__FILE__) . 'wpquiz.js', array(), time(), true);
        wp_localize_script($this->name, 'WPQuiz', array(
            'url' => admin_url('admin-ajax.php')
        ));
    }

    function admin_menu()
    {
        add_menu_page(
            __('WP Quiz', 'textdomain'),
            'WP Quiz',
            'manage_options',
            'wpquiz',
            array($this, 'quiz_page'),
            plugin_dir_url(__FILE__) . 'icon-book-quiz.svg',
            6
        );
    }

    function quiz_page() {
        echo '<div id="wpquiz-app" class="wpquiz-app"></div>';
    }

    function save_quiz() {
        $post = $_POST;
        $post['questions'] = isset($post['questions']) ? $post['questions'] : array();

        $post_id = wp_insert_post($post);

        $metas = ['questions', 'quiz_button', 'redirect', 'redirects'];
        if ( $post_id ) {
            foreach ($metas as $key) {
                update_post_meta($post_id, $key, $post[$key]);
            }
        }        

        wp_send_json($post);
    }

    function get_quizzes() {
        wp_send_json($this->wpquiz->get_quizzes());
    }

    function get_quiz()
    {
        $post_id = isset($_REQUEST['id']) ? absint($_REQUEST['id']) : false;

        if (!$post_id) {
            wp_send_json(array('error' => true));
        }

        wp_send_json($this->wpquiz->get_quiz($post_id));
    }
}

new WPQuiz_Admin();