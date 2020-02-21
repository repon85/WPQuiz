<?php
class WP_Quiz {	

	function __construct() {
		add_action( 'init', array($this, 'register_quiz_post'));
	}

    function register_quiz_post () {
        register_post_type( 'wpquiz', array(
            'label'                 => 'WP Quiz',
            'public'                => false,
            'supports'              => array('title', 'custom-fields')
        ));
	}
	
	function get_quizzes() {
        $quizzes = get_posts( array(
            'post_type' => 'wpquiz'
		));
		
		return $quizzes;
    }

	function get_quiz($id) {
		$quiz = get_post($id);		
        if ( $quiz ) {
			$quiz->questions = get_post_meta($quiz->ID, 'questions', true);
			if ( !is_array($quiz->questions) ) {
				$quiz->questions = array();
			}
		}
		
		foreach ($quiz->questions as $key => &$question) {
			foreach ($question['answers'] as $ak => &$answer) {
				$answer['score'] = isset($answer['score']) && strlen($answer['score']) > 0 ? absint($answer['score']) : '';
			}
		}

		return $quiz;
	}

	function wpquiz_shortcode($atts) {
		$atts = shortcode_atts( array(
			'id' => null
		), $atts);

		$quiz = $this->get_quiz($atts['id']);        

		var_dump($quiz->questions);
	 
		return null;
	}
}