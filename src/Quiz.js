import React, { useState, useEffect } from "react";
import validator from 'validator';
import Redirect from './Redirect';
import Question from "./Question";

const axios = require("axios").default;
const qs = require("qs");

const Quiz = props => {
    const [quiz, setQuiz] = useState({
        add: false,
        ID: 0,
        saving: false,
        post_title: "",
        post_content: "",
        redirect: '',
        redirects: [],
        questions: [],
        quiz_button: ''
    });

    const { redirect, redirects, questions } = quiz;

    useEffect(() => {
        axios
            .get(WPQuiz.url, {
                params: {
                    action: "get_quiz",
                    id: props.match.params["id"]
                }
            })
            .then(result => {
                const data = result.data;
                ['questions', 'redirects'].forEach(key => {
                    data[key] = Array.isArray(data[key]) ? result.data[key] : [];
                })
                setQuiz({ ...quiz, ...data });
            })
            .catch(err => console.log(err));
    }, [props.match.params["quiz"]]);

    const sanitizeQuestion = question => Object.assign({ label: "", answers: [] }, question);

    const saveQuiz = () => {
        if (!validator.isURL(redirect)) {
            return alert('Redirect URL is not Valid.');
        }

        const has = redirects.findIndex(u => !validator.isURL(u.url));
        if (has > -1) {
            return alert("One or more redirect URL is not valid.");
        }

        setQuiz({ ...quiz, saving: true });
        axios
            .post(`${WPQuiz.url}?action=save_quiz`, qs.stringify(quiz))
            .finally(() => setQuiz({ ...quiz, saving: false }));
    };

    const update = (key, value) => {
        setQuiz({ ...quiz, [key]: value })
    }

    const add_url = () => {
        redirects.push({ min: '', max: '', url: "" });
        setQuiz({ ...quiz, redirects })
    }

    const handleUrl = (redirects) => setQuiz({ ...quiz, redirects })

    const addQuestion = () => {
        questions.push({ label: "", answers: [] });
        setQuiz({ ...quiz, questions });
    };

    const updateQuestion = (data, index) => {
        questions[index] = data;
        setQuiz({ ...quiz, questions });
    };

    return (
        <React.Fragment>
            <div className="wpquiz-header">
                <h2 className="title">WPQuiz Builder</h2>
            </div>

            <div className="wpbox">
                <header>
                    <h3 className="title">{quiz.post_title}</h3>
                    <span className={`btn-save tools wpquiz-btn ${quiz.saving && "saving"}`} onClick={saveQuiz.bind(this)}>
                        <i class="dashicons dashicons-update"></i> Save Quiz
                    </span>
                </header>

                <div className="wpquiz-form-row">
                    <div className="label">
                        <h3 className="title">Description</h3>
                        Write Description for showing on start quiz page.
                    </div>

                    <textarea rows={3} />

                    <div className="label">
                        <h3 className="title">Quiz Button Text</h3>
                        Default text is "<strong>Start Quiz</strong>". If You want to customize text write on right field
                    </div>

                    <input onChange={(e) => update('quiz_button', e.target.value)} defaultValue={quiz.quiz_button} />

                    <div className="label">
                        <h3 className="title">Redirect URL</h3>
                        Default se redirect URL. Please use url with http/https.
                        <div className="gap-5" />
                        <span onClick={add_url} className="wpquiz-btn purple small">Add More</span>
                    </div>

                    <div>
                        <input defaultValue={redirect} onChange={(e) => update('redirect', e.target.value)} className="block" type="url" />
                        <div className="gap" />
                        {(redirects && redirects.length > 0) && <Redirect update={handleUrl.bind(this)} redirects={redirects} />}
                    </div>

                </div>
            </div>

            <div className="wpbox">
                <header>
                    <h3 className="title">Questions - {quiz.post_title}</h3>
                    <span class="tools wpquiz-btn" onClick={addQuestion.bind(this)}>
                        <i class="dashicons dashicons-plus"></i> Add Question
                    </span>
                </header>

                {questions.map((q, i) => (
                    <Question
                        update={updateQuestion}
                        key={i}
                        index={i}
                        question={sanitizeQuestion(q)}
                    />
                ))}
            </div>
        </React.Fragment>
    );
};

export default Quiz;
