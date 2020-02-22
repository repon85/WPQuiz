Vue.component('wpquiz', {
    props: ['quiz'],
    template: '#wpquiz-template',
    data: function () {
        quiz = {}
        try {
            quiz = JSON.parse(this.quiz)
        } catch (error) {}
        
        const waiting = parseInt(quiz.redirect_seconds) || 0;
        return {timer: null, step: 0, scores: [], quiz, waiting}
    },
    computed: {
        start_page() {
            return (typeof quiz.start_page == 'object') ? quiz.start_page : {}
        },
        result_page() {
            return (typeof quiz.result_page == 'object') ? quiz.result_page : {}
        },
        questions(){
            return quiz.questions || [];
        },
        currentStep() {
            return this.questions[this.step] || false;
        }
    },
    methods: {
        next: function(answer) {
            this.scores[this.step] = parseInt(answer.score) || 1;
            this.step+=1;
        },
        show_question: function() {
            this.start_page.show = false
        },

        redirect: function() {
            if ( this.currentStep !== false && this.waiting > 0) return;
            clearInterval(this.timer);
            var redirects = (Array.isArray(quiz.redirects) ? quiz.redirects : [])            
            redirects = redirects.filter(r => r.url && r.url.length > 0);
            redirects = redirects.map(r => ({min: parseInt(r.min) || 0, max: parseInt(r.max) || 0, url: r.url}))
            score = this.scores.reduce((total, current) => total+current);
            redirect = redirects.find(item => score >= item.min && score <= item.max)
            get_url = redirect && redirect.url || quiz.redirect;
            window.location = get_url;
        }
    },
    watch: {
        currentStep: function() {
            if ( this.currentStep ) return;
            if ( this.waiting <= 0 ) {
                return this.redirect();
            }

            this.timer = setInterval(() => this.waiting -= 1, 1000);
        },

        waiting() {
            if ( this.waiting > 0) return;
            clearInterval(this.timer);
            this.redirect();            
        }
    }
})

new Vue({
    el: '#page-container'
})