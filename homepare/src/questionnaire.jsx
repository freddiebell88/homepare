import { Checklist } from "./checklist";
import questionnaireData from "./data/questionnaire.json";
import { useState } from "react";

export function Questionnaire() {
  console.log(questionnaireData);
  //this is so we can cycle through our questions
  const [index, setIndex] = useState(0);
  const [recordedAnswers, setRecordedAnswers] = useState(new Array(questionnaireData.length));
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // user can only select one answer at a time -- the actual act of selecting [selectedanswers]
  //when a user clicks the next button
  //we need their answer to get pushed up to an empty array [recorded answers]
  //if they change their answer and hit next again, their previous  selection gets popped off and
  // the array needs to be updated
  // the final array is sent to the backend when a user hits confirm on the last question

  //on next and back if our new array has a value already, the selected answer should use that value so our user's previous selected answer is still highlighted
  //if (selectedAnswer != null)
  //setSelectedAnswer === 

  const handleSelectedAnswer = (answer) => {
    console.log("selected answer", answer);
    setSelectedAnswer(answer)
  };
  //selected answer needs to communicate what the answer is

  //when we hit index 5 (just past our very last question)
  //we want to show the user all of their answers
  //and give them the option to go back and change them
  // or confirm and post to the back end

  const handleNextClick = () => {
    setIndex(index === questionnaireData.length ? index : index + 1);
    
    const newAnswersArray = recordedAnswers
    newAnswersArray[index] = selectedAnswer
    
    setRecordedAnswers(newAnswersArray)
    console.log('newAnswersArray', newAnswersArray)
    console.log('selected answer', selectedAnswer)
    //we have to give set recorded answers our new array

    setSelectedAnswer(newAnswersArray[index + 1])
    console.log('newAnswersArray[index + 1]', newAnswersArray[index + 1])
  };

  const handleBackClick = () => {
    setIndex(index === 0 ? index : index - 1);

    setSelectedAnswer(recordedAnswers[index - 1])
    console.log('newAnswersArray[index - 1]', recordedAnswers[index + 1])

  };

  const handleConfirmClick = () => {
    console.log("confirm click");
    //if this is the last question
    //index === questionnaireData.length - 1
    //show this button
    // when this button is clicked
    // post recorded answers to the back end
  };

  return (
    <>
      {index === questionnaireData.length ? (
        <>
        <h1>You are looking for:</h1>
        {recordedAnswers.map((answer) => 
        <li>{answer}</li>)}
      </>
      ) : (
        <>
          <h1>Questonnaire</h1>
          <form>
            <h3>{questionnaireData[index].question}</h3>
            {/* <button>{questionnaireData[index].answers}</button> */}
            {questionnaireData[index].answers.map((answer) => (
              // eslint-disable-next-line react/jsx-key
              <div>
                <label>
                  <input
                    type="radio"
                    value="{answer}"
                    checked={selectedAnswer === answer}
                    name={`question${index}`}
                    onClick={() => handleSelectedAnswer(answer)}
                  />
                  {answer}
                </label>
              </div>
            ))}
          </form>
          {index === questionnaireData.length ? (
            <button onClick={handleConfirmClick}>Confirm</button>
          ) : (
            <button onClick={handleNextClick}>Next</button>
          )}
          {index != 0 && <button onClick={handleBackClick}>Back</button>}
        </>
      )}
    </>
  );
}
