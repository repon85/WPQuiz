import React, { useState, useEffect } from "react";

const Question = props => {
  const [question, setQuestion] = useState({
    label: "",
    answers: []
  });

  const { label, answers } = question;

  useEffect(() => setQuestion({ ...question, ...props.question }), [
    props.question
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

  const updateAnswer = (value, i) => {
    answers[i].label = value;
    update({ label, answers });
  };

  return (
    <div className="question">
      <h3 className="label">Question</h3>
      <input
        defaultValue={question.label}
        onChange={e => update({ ...question, label: e.target.value })}
        placeholder="Write question here"
      />

      <div className="label">
        <h3>Answers</h3>
        You may add many answer by clicking on below button.
        <div className="gap-5" />
        <span
          className="wpquiz-btn purple small"
          onClick={addAnswer.bind(this)}
        >
          Add New
        </span>
      </div>
      <ul className="answers">
        {question.answers.map((q, i) => (
          <li contenteditable={true} key={i} data-no={i + 1}>
            <input
              defaultValue={q.label}
              onChange={e => updateAnswer(e.target.value, i)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
