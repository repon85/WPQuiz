import React, { useState, useEffect } from "react";

const Question = props => {
  const [question, setQuestion] = useState({
    label: "",
    answers: []
  });

  const { label, answers } = question;
  useEffect(() => setQuestion({ ...question, ...props.question }), [
    props.question, props.question.answers
  ]);

  const update = data => {
    props.update({ ...data }, props.index);
  };

  const addAnswer = () => {
    const index = answers.findIndex(a => a.label.length == 0);
    if (index >= 0) {
      return alert("You have empty field.");
    }

    answers.push({ label: "" });
    update({ label, answers });
  };

  const removeAnswer = i => {
    answers.splice(i, 1);
    update({ label, answers });
  };

  const updateAnswer = (answer, i) => {
    answers[i] = {...answers[i], ...answer};
    update({ label, answers });
  };

  return (
    <div className="question">
      <h3 className="label">{props.index + 1}. Question</h3>
      <input
        defaultValue={question.label}
        onChange={e => update({ ...question, label: e.target.value })}
        placeholder="Write question here"
      />

      <div className="label">
        <h3>Answers</h3>
        You may add many answer by clicking on below button. Hover on answer
        item for seeing options.
        <div className="gap-5" />
        <span
          className="wpquiz-btn purple small"
          onClick={addAnswer.bind(this)}
        >
          Add New
        </span>
      </div>
      <ul className="answers">
        <li className="head">
          <span className="score">Score</span>
          <span className="title">Title</span>
        </li>
        {question.answers.map((q, i) => (
          <li contenteditable={true} key={i} data-no={i + 1}>
            <input
              className="score"
              value={q.score}
              placeholder="Score"
              onChange={e => updateAnswer({score: e.target.value}, i)}
            />

            <input
              className="title"
              value={q.label}
              placeholder="Title"
              onChange={e => updateAnswer({label: e.target.value}, i)}
            />

            <span
              onClick={removeAnswer.bind(this, i)}
              class="btn-remove dashicons dashicons-no-alt"
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
