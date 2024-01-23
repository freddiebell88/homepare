import questionnaireData from "./data/questionnaire.json";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button, Text, Title } from "@mantine/core";

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
        navigate("/");
      });
    // .catch((error) => setError(error.response.data.))
  };

  return (
    <>
      {index === questionnaireData.length ? (
        <>
          <div className="confirm-summary-div-in-questionnaire">
          <Title order={3}>You are looking for a home with <Text span c="#00A6BA" inherit>{recordedAnswers[0].text}</Text>, <Text span c="#00A6BA" inherit>{recordedAnswers[1].text}</Text>, <Text span c="#00A6BA" inherit>{recordedAnswers[2].text}</Text>, and <Text span c="#00A6BA" inherit>{recordedAnswers[3].text}</Text>.
          </Title>
          <Button  onClick={handleBackClick}>Back</Button>
          <Button onClick={handleConfirmClick}>Confirm</Button>
          </div>
        </>
      ) : (
        <>
        <div className="div-around-questions-answers-and-buttons-in-questionnaire">
          <form>
            <p className="questions-in-questionnaire">{questionnaireData[index].question}</p>
            {questionnaireData[index].answers.map((answerObject) => {
              console.log(answerObject);
              return (
                // eslint-disable-next-line react/jsx-key
                <div>
                  <label className="answers-in-questionnaire">
                    <input
                      type="radio"
                      value={answerObject.value}
                      checked={selectedAnswer.value === answerObject.value}
                      name={`question${index}`}
                      onClick={() => handleSelectedAnswer(answerObject)}
                    />
                    {" "}{answerObject.text}
                  </label>
                </div>
              );
            })}
          </form>
          {index != 0 && <Button onClick={handleBackClick}>Back</Button>}
          {
            <Button
              onClick={handleNextClick}
              disabled={selectedAnswer.value ? false : true}
            >
              Next
            </Button>
          }
          
          </div>
        </>
      )}
    </>
  );
}
