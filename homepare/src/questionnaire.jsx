import { Checklist } from "./checklist";
import questionnaireData from "./data/questionnaire.json";
import { useState } from "react";

export function Questionnaire() {
  console.log(questionnaireData);
  //this is so we can cycle through our questions
  const [index, setIndex] = useState(0);

  const handleNextClick = () => {
    // here we need to do [index] + 1

    // check that index >=0?
    setIndex(index === questionnaireData.length - 1 ? index : index + 1)
  }

  const answerString = questionnaireData[index].answers

  return (
    <>
      <h1>Questonnaire</h1>
      <h3>{questionnaireData[index].question}</h3>
      {/* <button>{questionnaireData[index].answers}</button> */}
      {answerString.map((answer) => <button>{answer}</button>)}
      <br></br>
      <button onClick={handleNextClick}>Next</button>
    </>
    // checklist is list of results from questionnaire
  );
}
