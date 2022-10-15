/* eslint-disable no-constant-condition */
import API from '../config/api'
import {shuffle} from '../shared/utils'
import ProgressBar from '@ramonak/react-progress-bar'
import 'react-notifications/lib/notifications.css'
import {NotificationContainer, NotificationManager} from 'react-notifications'
// import IoReloadCircleSharp from react icons IoReloadCircleSharp
import {IoReloadCircleSharp} from 'react-icons/io5'

export default function Questions() {
  // questions from API
  const [questions, setquestions] = React.useState({})

  React.useEffect(() => {
    //#### Get the questions from the DB
    const getQuestions = async () => {
      const res = await API.get('questions')
        .then(res => {
          const results = res.data
          //Randomize the choices
          for (let i = 0; i < results.length; i++) {
            shuffle(results[i].answerOptions)
          }
          setquestions(results)
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
  const [progress, setProgress] = React.useState(0)
  const [rank, setRank] = React.useState(0)

  //####HandleAnswer function
  //Go to the next question when click the answer button  .. when reach the last question show the Result score
  const handleAnswerOptionClick = isCorrect => {
    // if the answer is correct update the score
    if (isCorrect) {
      //show toast message for correct answer with green color and 2 seconds duration and update the score
      NotificationManager.success('Correct Answer', 'Success', 2000)
      // increase the score
      setScore(score + 10)
    }
    // if the answer is wrong show toast message for wrong answer with red color and 2 seconds duration
    if (!isCorrect) {
      NotificationManager.error('Wrong Answer', 'Error', 2000)
    }

    // Handle going to the next Qusetion
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
      // increase the progress bar
      setProgress(progress + 10)
    } else {
      // make post request to the server to get the rank of the user from score
      API.post('rank', {score})
        .then(res => {
          setRank(res.data.rank)
        })
        .catch(error => alert(error))
      // show the score and the rank
      setShowScore(true)
    }
  }
  //#####Render the Questions
  return (
    <>
      {/* ####if the User Reached the final Qusetion Show the Final Score */}
      {showScore ? (
        <>
          <div className="score-section">
            You scored {score} And Your Rank is {rank}
            <button
              className="try-again"
              onClick={() => window.location.reload(false)}
            >
              <IoReloadCircleSharp fontSize={30} /> Try again
            </button>
          </div>
        </>
      ) : questions.length ? (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>{currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map(
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
            {/* Progress bar  */}
            <div className="progress-text">Your Progress</div>
            <div>
              <ProgressBar completed={progress} />
            </div>
          </div>
          <NotificationContainer />
        </>
      ) : (
        <>
          <h1>Loading...</h1>
        </>
      )}
    </>
  )
}
