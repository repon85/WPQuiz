<?php

class WP_Quiz {
    function __construct() {
        if ( !is_admin()) return;

        add_action( 'wp_ajax_save_quiz', array($this, 'save_quiz'));
        add_action( 'wp_ajax_nopriv_save_quiz', array($this, 'save_quiz'));

        add_action( 'wp_ajax_get_quizzes', array($this, 'get_quizzes'));
        add_action( 'wp_ajax_nopriv_get_quizzes', array($this, 'get_quizzes'));

        add_action( 'wp_ajax_get_quiz', array($this, 'get_quiz'));
        add_action( 'wp_ajax_nopriv_get_quiz', array($this, 'get_quiz'));
    }

    function save_quiz() {
        $post = $_POST;
        $questions = isset($post['questions']) ? $post['questions'] : array();
        unset($post['questions']);
        
        $post_id = wp_insert_post($post);
        update_post_meta($post_id, 'questions', $questions);
        
        wp_send_json($questions);
    }
    
    function get_quizzes() {
        $quizzes = get_posts( array(
            'post_type'         => 'wpquiz'
        ));
        

        wp_send_json($quizzes);
    }

    function get_quiz() {
        $post_id = isset($_REQUEST['id']) ? absint($_REQUEST['id']) : false;
        if ( !$post_id) {
            wp_send_json(array('error'=> true));
        }

        $quiz = get_post($post_id);
        if ( $quiz ) {
            $quiz->questions = get_post_meta($post_id, 'questions', true);
        }
        

        wp_send_json($quiz);
    }
}

new WP_Quiz();