import React , { useEffect, useState } from 'react';
import { QuestionsState, getQuizQuestions} from './APItest';
import './App.css';
import QuestionCard from './components/QuestionCard';
import { GlobalStyle } from './App.styles';
import MACImage from './images/macsbook.jpeg';
import HPImage from './images/hps.jpeg';
import ACERImage from './images/acer2.jpeg';
import ASUSImage from './images/asus1.jpeg';
import pmlogo from './images/logo.png';
import Authenticated from './Authenticated';
import axios from 'axios';

export type AnswerObject = {
  question: string;
  answer: string;
}

const TOTAL_QUESTIONS = 6;


const App = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [macScore, setMacScore] = useState(0);
  const [hpScore, setHPScore] = useState(0);
  const [asusScore, setAsusScore] = useState(0);
  const [acerScore, setAcerScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [endScreen, setEndScreen] = useState(true);
  const [counter, setCounter] = useState(0);
  const [displayCount, setDisplayCount] = useState(false);
  

  const startQuiz = async () => {
    setGameOver(false);
    setEndScreen(false);
    const newQuestions: QuestionsState[] = await getQuizQuestions();
    setQuestions(newQuestions);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>)=> {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      let mscore = macScore;
      if (answer === questions[number].mac_answer) {
        setMacScore(mscore + 1);
      }
      let hpscore = hpScore;
      if (answer === questions[number].hp_answer){
        setHPScore(hpscore+1);
      }
      let acscore = acerScore;
      if (answer === questions[number].acer_answer){
        setAcerScore(acscore+1);
      }
      let auscore = asusScore;
      if (answer === questions[number].asus_answer){
        setAsusScore(auscore+1);
      }

      const answerObject = { 
        question: questions[number].question, 
        answer: answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
   };


  const nextQuestion = () => {
    console.log("in next question");
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS-1){
      setGameOver(true);
      setEndScreen(true);
      setDisplayCount(true);
    } else{
      setNumber(nextQuestion);
    }
  };

  useEffect(() => { 
    axios.get('/getCount').then(obj => setCounter(obj.data.people));
  }, []);
  useEffect(() => { 
    if (displayCount===true) {
    setDisplayCount(false);
    const newNumber: number = counter+1;
    const numObject = {newNumber};
    axios.post('/updateCount').then(obj => setCounter(counter+1));
    axios.post('/updateCount', numObject).then(response => {
      console.log(response);
    });
    }
  }, [counter, displayCount]);;
  

  const getLaptopNameFixed = () => {
    const scores = 
    [{score : macScore, name: "Apple Macbook Pro", image: "MacImage" } , {name: " HP Pavilion 15" , score: hpScore, image: "HPImage"} , {name: "Acer Chromebook 14", score: acerScore, image: "AcerImage"}, {name: "Asus TUF" , score: asusScore, image: "AsusImage"}];
    
    const max = scores.reduce(function(prev, current) {
      return (prev.score > current.score) ? prev : current
  }) //returns object
  return [max.name, max.image];
  }

  return (
    <>
    <GlobalStyle/>
    <Authenticated>
    <div className="App">
      <h1> {counter} Perfect Match! <img src={pmlogo} alt="" height={45} width={50} /></h1>
      {loading ?
      (
      <h3> Find a compatible latop within seconds by answering these following questions... </h3>
      ) : null }
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className='start' onClick = {startQuiz}>
        Start
      </button>
     ) : null}
  

      {loading ? <p>Loading Questions ...</p> : null}
      {!loading && !gameOver && !endScreen ? (
        <QuestionCard 
          questionNr = {number + 1}
          totalQuestions = {TOTAL_QUESTIONS}
          question= {questions[number].question}
          answers= {questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback = {checkAnswer}
      /> 
      ) : null}
      {!gameOver && 
      !loading && 
      userAnswers.length === number + 1 && 
      number !== TOTAL_QUESTIONS -1 ? (
      <button className = "next" onClick = {nextQuestion}>
        Next Question
      </button>
     ) : null}

     {gameOver ?
       (<div>
        <p> So far, {counter} users have found their perfect match! </p>
        <p> Your Perfect Match was found!</p>
        <p> It is the {getLaptopNameFixed()[0]}.</p>
        {getLaptopNameFixed()[1] === "MacImage" ?
				(	<img src= {MACImage} alt="pic" />
        ) : null}
        {getLaptopNameFixed()[1] === "HPImage" ?
				(	<img src= {HPImage} alt="pic" />
        ) : null}
        {getLaptopNameFixed()[1] === "AsusImage" ?
				(	<img src= {ASUSImage} alt="pic" />
        ) : null}
        {getLaptopNameFixed()[1] === "AcerImage" ?
				(	<img src= {ACERImage} alt="pic" />
        ) : null}
        
        </div>
       ) : null}
    </div>
    </Authenticated>
    </>
  );
}

export default App;
