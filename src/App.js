import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const axios = require("axios").default;

const App = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios
      .get(`${WPQuiz.url}?action=get_quizzes`, { action: "get_quizzes" })
      .then(result => {
        setQuizzes(result.data);
      })
      .catch(err => console.log(err));
  });

  return (
    <React.Fragment>
      <div className="wpquiz-header">
        <h2>WPQuiz Builder</h2>
      </div>

      <div className="wpquiz-page-header">
        <h2>Your Quizzes</h2>
      </div>

      <table className="wpquizes">
        {quizzes.map(quiz => 
          <tr>
            <td>
              <h2 className="title">{quiz.post_title}</h2>
              <span className="meta">Created Feb 20, 2020</span>
            </td>
            <td>
              <Link className="wpquiz-btn" to={`${quiz.ID}/${quiz.post_name}`}>
                <i className="dashicons dashicons-edit" /> Edit
              </Link>
              <a className="wpquiz-btn" href="#">
                <i className="dashicons dashicons-admin-page" /> Duplicate
              </a>
            </td>
          </tr>
        )}
      </table>
    </React.Fragment>
  );
};

export default App;