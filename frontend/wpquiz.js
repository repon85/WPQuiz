(function($){
    $('.wpquiz-wrapper').each(function(){
        currentQuiz = $(this).addClass('initialized');
        currentQuiz.find('.wpq-question-item').eq(0).addClass('active');
    })

    $('.quiz-answer').on('click', function(){
        question = $(this).closest('.wpq-question-item');

        next = question.next('.wpq-question-item');

        question.removeClass('active')

        next.addClass('active').css({
            'transform': 'translateX(0)'
        })



    })

})(jQuery)