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

  return (
    // <Checklist />
    <>
      <h1>Questonnaire</h1>
      <h3>{questionnaireData[index].question}</h3>
      <h3>{questionnaireData[index].answers}</h3>
      <button onClick={handleNextClick}>Next</button>
    </>
    // checklist is list of results from questionnaire
  );
}
