import { Checklist } from "./checklist";
import questionnaireData from "./data/questionnaire.json";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export function Questionnaire( {token}) {
  console.log(questionnaireData);

  const [index, setIndex] = useState(0);
  const [recordedAnswers, setRecordedAnswers] = useState(
    new Array(questionnaireData.length)
  );
  const [selectedAnswer, setSelectedAnswer] = useState({
    value: null,
    text: null
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSelectedAnswer = (answer) => {
    console.log("selected answer", answer);
    setSelectedAnswer(answer);
  };

  const handleNextClick = () => {
    setIndex(index === questionnaireData.length ? index : index + 1);

    const newAnswersArray = recordedAnswers;
    newAnswersArray[index] = selectedAnswer;

    setRecordedAnswers(newAnswersArray);

    setSelectedAnswer( newAnswersArray[index + 1] ? newAnswersArray[index + 1] : {
      value: null,
      text: null
    });
    console.log("newAnswersArray[index + 1]", newAnswersArray[index + 1]);
  };

  const handleBackClick = () => {
    setIndex(index === 0 ? index : index - 1);

    setSelectedAnswer(recordedAnswers[index - 1]);
    console.log("newAnswersArray[index - 1]", recordedAnswers[index + 1]);
  };

  const handleConfirmClick = () => {
    console.log("confirm click");
    console.log("recordedanswers", recordedAnswers);
    //if this is the last question
    //index === questionnaireData.length - 1
    //show this button
    // when this button is clicked
    // post recorded answers to the back end

    axios
      .post("https://homepare-backend.onrender.com/user-preference", {
        address: null,
        bedrooms: recordedAnswers[0].value,
        bathrooms: recordedAnswers[1].value,
        yard: recordedAnswers[2].value,
        garage: recordedAnswers[3].value,
        hoa: recordedAnswers[4].value,
        UserID: "",
      }, {
        headers: {
          authorization: `x-access-token ${token}`
        }
      })
      .then((result) => {
        console.log("result", result);
        navigate("/");
      });
    // .catch((error) => setError(error.response.data.))
  };

  return (
    <>
      {index === questionnaireData.length ? (
        <>
          <h1>You are looking for a:</h1>
          {recordedAnswers.map((answerObject) => (
            <>
              <li>{answerObject.text}</li>
            </>
          ))}
          <button onClick={handleConfirmClick}>Confirm</button>
        </>
      ) : (
        <>
          <h1>Questonnaire</h1>
          <form>
            <h3>{questionnaireData[index].question}</h3>
            {questionnaireData[index].answers.map((answerObject) => {
              console.log(answerObject);
              return (
                // eslint-disable-next-line react/jsx-key
                <div>
                  <label>
                    <input
                      type="radio"
                      value={answerObject.value}
                      checked={selectedAnswer.value === answerObject.value}
                      name={`question${index}`}
                      onClick={() => handleSelectedAnswer(answerObject)}
                    />
                    {answerObject.text}
                  </label>
                </div>
              );
            })}
          </form>
          {
            <button
              onClick={handleNextClick}
              disabled={selectedAnswer ? false : true}
            >
              Next
            </button>
          }
          {index != 0 && <button onClick={handleBackClick}>Back</button>}
        </>
      )}
    </>
  );
}
