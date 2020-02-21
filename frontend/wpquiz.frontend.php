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
    }

    function enqueue_scripts() {
        wp_enqueue_style($this->name, plugin_dir_url(__FILE__) . 'wpquiz.css');
        wp_enqueue_script($this->name, plugin_dir_url(__FILE__) . 'wpquiz.js', array('jquery'), time(), true);
    }

    function shortcode($atts) {
		$atts = shortcode_atts( array('id' => null), $atts);
        $quiz = $this->core->get_quiz($atts['id']);        
        if ( !$quiz ) return null;

        $questions = $quiz->questions;

        $content = '<div class="wpquiz-wrapper">';

        foreach ($questions as $question) {
            if (strlen($question['label']) <= 2 ) continue;
            $answers = array_filter($question['answers'], function($answer){
                return strlen($answer['label']) > 1;
            });

            foreach ($answers as &$answer) {
                $answer['score'] = strlen($answer['score']) > 0 ? absint($answer['score']) : 1;
            }

            if ( count($answers) <= 0 ) continue;
            ob_start(); ?>
            <div class="wpq-question-item">
                <h3 class="quiz-question"><?php echo $question['label'] ?></h3>
                <div class="quiz-answers">
                    <?php foreach ($answers as $ans) : ?>
                    <span class="quiz-answer"><?php echo $ans['label'] ?></span>
                    <?php endforeach; ?>
                </div>                    
            </div>
            <?php
            $content .= ob_get_clean();
        }

	 
		return $content . '</div>';
	}
}

new WPQuiz_Frontend();