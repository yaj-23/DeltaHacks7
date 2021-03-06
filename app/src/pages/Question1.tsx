import { IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Typist from "react-typist";
import { useQuiz } from "../components/QuizProvider";
import angry from "../logos/angry.svg";
import board from "../logos/board.svg";
import confused from "../logos/confused.svg";
import crying from "../logos/crying.svg";
import dashboard from "../logos/dashboard.svg";
import five from "../logos/five.svg";
import four from "../logos/four.svg";
import icon from "../logos/frameIcon.svg";
import irritated from "../logos/irritated.svg";
import lotus from "../logos/lotus.svg";
import lovely from "../logos/lovely.svg";
import nextBtn from "../logos/nextButton.svg";
import one from "../logos/one.svg";
import happy from "../logos/happy.svg";
import sad from "../logos/sad.svg";
import six from "../logos/six.svg";
import three from "../logos/three.svg";
import two from "../logos/two.svg";
import "./Question1.css";

const Question1: React.FC = () => {
  const history = useHistory();
  const [count, setCount] = useState(0);
  const { result, setResult } = useQuiz();
  const [add, setAdd] = useState(-1);

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too late...</div>;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };

  const addHandler = (newVal: number) => setAdd((a) => (a === -1 ? newVal : a));

  useEffect(() => {
    if (add !== -1) setResult((res: number[]) => [...res, add]);
  }, [add]);

  const questions: String[] = [
    "how do you feel today?",
    "how stressed have you been lately?",
    "describe your day with one emoji",
    "how healthy are you?",
  ];

  // Display the dashboard once you have all the information filled out
  let nextButton;
  if (count < 3) {
    nextButton = (
      <div className="next-btns">
        <img
          className="next-button-background"
          src={nextBtn}
          alt="nextBtn"
          onClick={() => {
            setAdd(-1);
            setCount(count + 1);
            console.log(result);
          }}
        />
      </div>
    );
  } else {
    nextButton = (
      <div className="next-btns">
        <img
          className="next-button-background"
          src={dashboard}
          alt="nextBtn"
          onClick={() => {
            {
              setAdd(-1);
              setCount(0);
              history.push("/home/ClientState");
            }
          }}
        />
      </div>
    );
  }

  let emojiDisplay;
  if (count == 0) {
    emojiDisplay = (
      <div className="emoji-rows">
        {[sad, crying, irritated, angry, happy, lovely].map(
          (emoji: any, index: number) => (
            <img
              className="emoji-btn"
              key={index}
              src={emoji}
              alt="nextBtn"
              onClick={() => addHandler(index)}
            />
          )
        )}
      </div>
    );
  } else if (count == 2) {
    emojiDisplay = (
      <div className="emoji-rows">
        {[sad, crying, confused, angry, happy, board].map(
          (emoji: any, index: number) => (
            <img
              className="emoji-btn"
              key={index}
              src={emoji}
              alt="nextBtn"
              onClick={() =>
                addHandler(index === 2 ? 6 : index === 5 ? 7 : index)
              }
            />
          )
        )}
      </div>
    );
  } else {
    emojiDisplay = (
      <div className="emoji-rows">
        {[one, two, three, four, five, six].map((emoji: any, index: number) => (
          <img
            className="emoji-btn"
            key={index}
            src={emoji}
            alt="nextBtn"
            onClick={() => addHandler(index + 1)}
          />
        ))}
      </div>
    );
  }

  return (
    <IonPage>
      <div className="mainScreen questions-page">
        <div className="header">
          <div className="appicon">
            <img className="green-background" src={icon} />
          </div>

          <div className="title-header">
            <div className="app-title-header">Zensations</div>
            <div className="app-slogan-header">release your emotions</div>
          </div>
        </div>
        <Typist key={count} className="question-title">
          {questions[count]}
        </Typist>

        {emojiDisplay}
        {nextButton}

        <img
          className="lotus"
          src={lotus}
          alt="lotus"
          onClick={() => {
            setCount(0);
            setAdd(-1);
            setResult([]);
            history.replace("/home");
          }}
        />
      </div>
    </IonPage>
  );
};

export default Question1;
