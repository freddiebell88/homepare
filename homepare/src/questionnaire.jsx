import { Checklist } from "./checklist";
import questionnaireData from "./data/questionnaire.json";
import { useState } from "react";

export function Questionnaire() {
  console.log(questionnaireData);
  //this is so we can cycle through our questions
  const [index, setIndex] = useState(0);
  const [recordedAnswers, setRecordedAnswers] = useState([])

//when a user clicks the next button
//we need their answer to get pushed up to an empty array
//if they change their answer
// the array needs to be updated
// the final array is sent to the backend when a user hits confirm on the last question

  const handleNextClick = () => {
    console.log('Questionnaire data lenght', questionnaireData.length)
    setIndex(index === questionnaireData.length - 1 ? index : index + 1)
  }

  const handleBackClick = () => {
    console.log('back click')
    setIndex(index === 0 ? index : index -1)
    //if this is not the first question
    //when this button is clicked
    //index is -1
    // setIndex(index === )
  }

  const handleConfirmClick = () => {
    console.log('confirm click')
    //if this is the last question
    //index === questionnaireData.length - 1
    //show this button
    // when this button is clicked
    // post recorded answers
  }

  const answerString = questionnaireData[index].answers

  return (
    <>
      <h1>Questonnaire</h1>
      <h3>{questionnaireData[index].question}</h3>
      {/* <button>{questionnaireData[index].answers}</button> */}
      {answerString.map((answer) => <button>{answer}</button>)}
      <br></br>
      {index === questionnaireData.length - 1 ?
      <button onClick={handleConfirmClick}>Confirm</button> : <button onClick={handleNextClick}>Next</button>
      }
      {index != 0 && <button onClick={handleBackClick}>Back</button>}
      
    </>
    // checklist is list of results from questionnaire
  );
}
