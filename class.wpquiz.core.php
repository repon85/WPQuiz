<?php
class WP_Quiz {	
    var $meta_fields = ['questions', 'redirect', 'redirects', 'start_page', 'redirect_seconds', 'result_page'];

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
        if ( !$quiz ) {
            return $quiz;
        }	
        
        foreach ($this->meta_fields as $key) {
            $quiz->$key = get_post_meta($quiz->ID, $key, true);
        }

        if ( !is_array($quiz->questions) ) {
            $quiz->questions = array();
        }

        foreach ($quiz->questions as $key => &$question) {
			foreach ($question['answers'] as $ak => &$answer) {
				$answer['score'] = isset($answer['score']) && strlen($answer['score']) > 0 ? absint($answer['score']) : '';
			}
        }

		return $quiz;
	}

	
}