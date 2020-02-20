import React, { useState, useEffect } from "react";

const axios = require("axios").default;

const Quiz = props => {
  let [refresh, setRefresh] = useState(Date.now());

  const [quiz, setQuiz] = useState({
    post_title: ''
  });

  useEffect(() => {
    axios
      .get(WPQuiz.url, {
        params: {
          action: "get_quiz",
          id: props.match.params["id"]
        }
      })
      .then(result => {
        setQuiz(result.data);
      })
      .catch(err => console.log(err));

  }, [refresh, props.match.params["quiz"]]);

  console.log(quiz);

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
          </header>

          <div className="question">

              <div className="label">
                <h3>Question</h3>
                Choose the variables from which SmartCrawl will automatically generate your SEO title from.
              </div>              
                <input />

                <h3 className="label">Answers</h3>
                <div className="answers">
                    
                </div>
          </div>


      </div>
    </React.Fragment>
  );
};

export default Quiz;
