import questionnaireData from "../data/questionnaire.json";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button, Text, Title, Group } from "@mantine/core";
import { IconArrowRight, IconArrowLeft, IconCheckbox } from '@tabler/icons-react';

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
        garage: recordedAnswers[2].value,
        hoa: recordedAnswers[3].value,
        UserID: "",
      }, {
        headers: {
          authorization: `x-access-token ${token}`
        }
      })
      .then((result) => {
        navigate("/");
      }).catch((err) => {
        return setError(err.response.data.message)
     })
  };

  return (
    <>
      { error && <Text c="red" >{error}</Text>}
      {index === questionnaireData.length ? (
        <>
          <div className="confirm-summary-div-in-questionnaire">
          <Group justify="center">
          <Title fw={500} order={3}>You are looking for a home with <br></br><Text span td="underline" inherit>{recordedAnswers[0].text}</Text>,<br></br> <Text span td="underline" inherit>{recordedAnswers[1].text}</Text>,<br></br> <Text span td="underline" inherit>{recordedAnswers[2].text}</Text>, and <Text span td="underline" inherit>{recordedAnswers[3].text}</Text>.
          </Title>
          </Group>
          <Button my={4} size="sm" mt="sm" leftSection={<IconArrowLeft size={14} />} onClick={handleBackClick}>Back</Button>
          <Button onClick={handleConfirmClick} size="sm" variant="light" mt="xs" ml="sm" leftSection={<IconCheckbox size={14} />}>Confirm</Button>
          </div>
        </>
      ) : (
        <>
        <div className="div-around-questions-answers-and-buttons-in-questionnaire">
          <form>
            <Text fw={500} size="xl" my={10}>{questionnaireData[index].question}</Text>
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
          <Group justify="center" style={{ marginTop: 20 }}>
          {index != 0 && <Button size="sm" leftSection={<IconArrowLeft size={14} />} onClick={handleBackClick}>Back</Button>}
          {
            <Button
              onClick={handleNextClick}
              size="sm"
              rightSection={<IconArrowRight size={14} />}
              disabled={selectedAnswer.value ? false : true}
              variant="light"
            >
              Next
            </Button>
          }</Group>
          
          </div>
        </>
      )}
    </>
  );
}
