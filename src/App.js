import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const axios = require("axios").default;

const App = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios
            .get(`${WPQuiz.url}?action=get_quizzes`, { action: "get_quizzes" })
            .then(result => setQuizzes(result.data))
            .catch(err => console.log(err));
    });

    const delete_quiz = (quiz, i) => {
        axios.post(`${WPQuiz.url}?action=delete_quiz&id=${quiz.ID}`)
            .then(result => {
                if (result.data){
                    delete quizzes[i];
                    setQuizzes(quizzes);
                }
            })
            .catch(() => {});
    }

    return (
        <React.Fragment>
            <div className="wpquiz-header">
                <h2 className="title">WP Quiz Builder</h2>
                <Link className="wpquiz-btn right" to="add-quiz">
                    <i className="dashicons dashicons-format-status" /> Add Quiz
                </Link>
            </div>

            <table className="wpquizes">
                {quizzes.map((quiz, i) =>
                    <tr>
                        <td>
                            <h2 className="title">{quiz.post_title}</h2>
                            <span className="meta">Created Feb 20, 2020</span>
                        </td>
                        <td>
                            <Link className="wpquiz-btn" to={`${quiz.ID}/${quiz.post_name}`}>
                                <i className="dashicons dashicons-edit" /> Edit
                            </Link>

                            <Link className="wpquiz-btn" to="/">
                                <i className="dashicons dashicons-admin-page" /> Duplicate
                            </Link>

                            <Link onClick={() => delete_quiz(quiz, i)} className="wpquiz-btn" to="/">
                                <span class="dashicons dashicons-trash"></span> Delete
                            </Link>
                        </td>
                    </tr>
                )}
            </table>
        </React.Fragment>
    );
};

export default App;
