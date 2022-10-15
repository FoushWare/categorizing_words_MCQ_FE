/* eslint-disable no-constant-condition */
import API from '../config/api'
import {shuffle} from '../shared/utils'
// import { useHistory, Link } from "react-router-dom";

export default function Questions() {
  // let history = useHistory();

  const [apiQuestions, setApiQuestions] = React.useState({})

  React.useEffect(() => {
    //#### Get the questions from the DB
    const getQuestions = async () => {
      const res = await API.get('questions')
        .then(res => {
          // //Randomize the Questions
          // shuffle(res.data)
          // console.log(res.data)
          //pick first 5 questions
          // const FiveQuestion = res.data.slice(0, 5)
          // console.log(FiveQuestion)
          const results = res.data

          //Randomize the choices
          for (let i = 0; i < results.length; i++) {
            shuffle(results[i].answerOptions)
          }

          setApiQuestions(results)
        })
        .catch(error => alert(error))
      return res
    }
    getQuestions()
  }, [])

  //####Local Status
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [showScore, setShowScore] = React.useState(false)
  const [score, setScore] = React.useState(0)

  //####HanleAnswer function
  //Go to the next question when click the answer button  .. when reach the last question show the Result score
  const handleAnswerOptionClick = isCorrect => {
    // if the answer is correct update the score
    if (isCorrect) {
      setScore(score + 1)
    }
    // Handle going to the next Qusetion
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < apiQuestions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }
  //#####Render the Questions
  return (
    <>
      {/* ####if the User Reached the final Qusetion Show the Final Score */}
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {apiQuestions.length}
        </div>
      ) : apiQuestions.length ? (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>{currentQuestion + 1}</span>/{apiQuestions.length}
            </div>
            <div className="question-text">
              {apiQuestions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {apiQuestions[currentQuestion].answerOptions.map(
              (answerOption, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect)
                  }
                >
                  {answerOption.answerText}
                </button>
              ),
            )}
          </div>
        </>
      ) : (
        <>
          <h1>Loading...</h1>
        </>
      )}
    </>
  )
}
