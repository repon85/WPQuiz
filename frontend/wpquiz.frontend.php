<?php

class WPQuiz_Frontend {
    var $core;
    var $name = 'wpquiz';

    function __construct() {
        if (is_admin()) return;

        global $WP_Quiz;
        $this->core = $WP_Quiz;

        add_shortcode( 'wpquiz', array($this, 'shortcode'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action( 'wp_footer', array($this, 'wpquiz_template'));
    }

    function enqueue_scripts() {
        wp_enqueue_style($this->name, plugin_dir_url(__FILE__) . 'wpquiz.css');
        wp_enqueue_script('vue', plugin_dir_url(__FILE__) . 'vue.js');
        wp_enqueue_script($this->name, plugin_dir_url(__FILE__) . 'wpquiz.js', array('jquery'), time(), true);
    }

    function wpquiz_template() {
        require_once('quiz-template.html');
    }

    function shortcode($atts) {
		$atts = shortcode_atts( array('id' => null), $atts);
        $quiz = $this->core->get_quiz($atts['id']);        
        if ( !$quiz ) return null;

        $questions = $quiz->questions;

        foreach ($questions as $question) {
            if (strlen($question['label']) <= 2 ) continue;
            $answers = array_filter($question['answers'], function($answer){
                return strlen($answer['label']) > 1;
            });

            foreach ($answers as &$answer) {
                $answer['score'] = strlen($answer['score']) > 0 ? absint($answer['score']) : 1;
            }
        }

        if (count($questions) <= 0 ) return null;

        $json = wp_json_encode($quiz);
        return "<wpquiz quiz='$json'></wpquiz>";
	}
}

new WPQuiz_Frontend();