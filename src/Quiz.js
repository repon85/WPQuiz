import React, { useState, useEffect } from "react";
import Question from "./Question";

const axios = require("axios").default;
const qs = require('qs');


const Quiz = props => {
  let [refresh, setRefresh] = useState(Date.now());

  const [quiz, setQuiz] = useState({
    add: false,
    ID: 0,
    saving: false,
    post_title: "",
    questions: []
  });

  const { questions } = quiz;

  useEffect(() => {
    axios
      .get(WPQuiz.url, {
        params: {
          action: "get_quiz",
          id: props.match.params["id"]
        }
      })
      .then(result => {
        const questions = Array.isArray(result.data['questions']) ? result.data['questions'] : []
        setQuiz({...quiz, ...result.data, questions});
      })
      .catch(err => console.log(err));

  }, [props.match.params["quiz"]]);

  const sanitizeQuestion = (question) => Object.assign({label: "", answers: []}, question)

  const saveQuiz = () => {
    setQuiz({...quiz, saving: true})
    axios.post(`${WPQuiz.url}?action=save_quiz`, qs.stringify(quiz))
    .finally(() => setQuiz({...quiz, saving: false}));
  }

  const addQuestion = () => {
    questions.push({label: "", answers: []});
    setQuiz({...quiz, questions})
  }

  const updateQuestion = (data, index) => {
    questions[index] = data;
    setQuiz({...quiz, questions})
  }

  return (
    <React.Fragment>
      <div className="wpquiz-header">
        <h2>WPQuiz Builder</h2>
      </div>

      <div className="wpquiz-page-header">
        <h2 onClick={() => setRefresh(Date.now())}>Your Quizzes</h2>
      </div>

      <div className="wpquiz">
        <header>
          <h3>{quiz.post_title}</h3>
          <span class="dashicons dashicons-plus" onClick={addQuestion.bind(this)}></span>
          <span style={{marginLeft: 'auto'}} className={`btn-save wpquiz-btn ${quiz.saving && 'saving'}`} onClick={saveQuiz.bind(this)}>
            <span class="dashicons dashicons-image-rotate"></span>
            Save Quiz
          </span>
        </header>

        {questions.map((q, i) => <Question update={updateQuestion} key={i} index={i} question={sanitizeQuestion(q)} />)}
      </div>
    </React.Fragment>
  );
};

export default Quiz;
