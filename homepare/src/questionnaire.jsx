import { Checklist } from "./checklist";
import questionnaireData from "./data/questionnaire.json";
import { useState } from "react";

export function Questionnaire() {
  console.log(questionnaireData);

  const [index, setIndex] = useState(0);
  const [recordedAnswers, setRecordedAnswers] = useState(new Array(questionnaireData.length));
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelectedAnswer = (answer) => {
    console.log("selected answer", answer);
    setSelectedAnswer(answer)
  };

  const handleNextClick = () => {
    setIndex(index === questionnaireData.length ? index : index + 1);
    
    const newAnswersArray = recordedAnswers
    newAnswersArray[index] = selectedAnswer
    
    setRecordedAnswers(newAnswersArray)

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
            <button onClick={handleNextClick} disabled={selectedAnswer ? false : true}>Next</button>
          )}
          {index != 0 && <button onClick={handleBackClick}>Back</button>}
        </>
      )}
    </>
  );
}
