Vue.component('wpquiz', {
    props: ['data'],
    template: '#wpquiz-template',
    data: function () {
        questions = [];
        try {
            questions = JSON.parse(this.data)
        } catch (error) {}

        return {step: 0, scores: [], questions}
    },
    computed: {
        currentStep: function() {
            return this.questions[this.step] || false;
        }
    },
    methods: {
        next: function(answer){
            this.scores[this.step] = parseInt(answer.score) || 1;
            this.step+=1;
        }
    }
})

new Vue({
    el: '#page-container'
})