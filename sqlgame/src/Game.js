import React, { useState } from 'react'
import './Game.css';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import schema from './schema.png'
import man from './man.png'
import congrats from './congrats.png'
import correctSound from './correct.mp3';
import wrongSound from './wrong.mp3';
import Scoreboard from './Scoreboard.js';

export default function Game() {
    const questions = [
        "There's been a Murder in SQL City!  A crime has taken place and I need your help. I have given you the crime scene report, but you somehow lost it. You vaguely remember that murder occurred sometime on Jan 15, 2018 and that it took place in SQL City. Start by retrieving the corresponding crime scene report from the police department’s database.",
        "Security footage shows that there were two witnesses. The first witness named Morty lives at the last house on \"Northwestern Dr \". Let's, look for the details of first witness",
        "The second witness, named Annabel, lives somewhere on \"Franklin Ave\" \n Let's, look for the details of second witness",
        "lets view the interview of both the witnesses taken after the murder.",
        "So, we got 2 clues-  \n Killer is a man and a member of the gym with a status of gold and having a membership no. starting with 48Z and left in a car with a no. plate of H42W and He was working out in the gym on 9th of Jan. Check the gym database with above details",
        "Two member's found and their membership id. Now, let's check the car details by the above details",
        "Two male with a plate no. containg H42W. Check personal details of both the males from the above query",
        "Lets check which of this two are a member of the gym?",
        "Congrats, you found the murderer - Jeremy Bowers. Both the membership id and status also matches as per the information we found earlier.",
    ]
    const hints = ["Hints : Find all crime scene reports in 'SQL City' and sort them by date.",
        "Hints : Find all persons on 'Northwestern Dr' where street name is 'Northwestern Dr'. Note down the ID, It might be useful in further deduction.",
        "Hints : Find all persons on 'Annabel' where street name is 'Franklin Ave'.",
        "Hints : Retrieve all interviews for persons with ID 14887 or 16371.",
        "Hints : Retrieve all check-ins on Jan 9, 2018 for members with ID containing '48Z', and sort them by date.",
        "Hints : Retrieve all driver's licenses with a plate number containing 'H42W'.",
        "Hints : Retrieve all persons with license IDs 423327 or 664760",
        "Hints : Retrieve all members with person IDs 51739 or 67318."
    ]
    const [level, setLevel] = useState(0);
    const [query, setQuery] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setloading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [tableData, setTable] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [needHints, setHints] = useState(false);
    const [question, setQuestion] = useState(questions[0]);
    const [hint, setHint] = useState(hints[0]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const correctAudio = new Audio(correctSound);
    const wrongAudio = new Audio(wrongSound);
    const [score, setScore] = useState(20);
    const [showInstructions, setShowInstructions] = useState(true);
    const [usedHints, setUsedHints] = useState([]);
    const [gameEnded, setGameEnded] = useState(false);

    const tryRequire = (path) => {
        try {
            return require(`${path}`);
        } catch (err) {
            return null;
        }
    };

    function resetGame() {
        setLevel(0);
        setQuery("");
        setMessage("");
        setIsError(false);
        setTable(false);
        setErrorMessage("");
        setUsedHints(false);
        setQuestion(questions[0]);
        setHint(hints[0]);
        setUsedHints([]);
        setScore(20);
    }

    async function executeSql() {
        try {
            setTable(false);
            setloading(true);

            let formdata = new FormData();
            formdata.append('query', query)
            formdata.append('level', level)
            let response = await fetch('http://127.0.0.1:5000/check', {
                method: 'POST',
                body: formdata
            });
            let data = await response.json();

            if (response.status === 200) {
                if (data['data']) {
                    setTimeout(() => {
                        setQuestion(questions[level + 1]);
                        setHint(hints[level + 1]);
                        setHints(false);
                        setTable(true);
                        setLevel(level + 1);
                        setErrorMessage("");
                        setloading(false);
                        setQuery("");
                        setMessage("Yes, you are right!!");
                        setIsError(false);
                        setScore(score + 100);
                        correctAudio.play();
                        if (level === questions.length - 2) {
                            setGameEnded(true);
                        }
                    }, 5000);

                } else {
                    setTimeout(() => {
                        setTable(true);
                        setloading(false);
                        setMessage("")
                        setIsError(true)
                        setErrorMessage("Ouch, you are wrong!!");
                        setScore(score - 20);
                        wrongAudio.play();
                    }, 1000);
                }
            }
            if (response.status === 400) {
                setTimeout(() => {
                    setTable(true);
                    setloading(false);
                    setMessage("")
                    setIsError(true)
                    setErrorMessage("Wrong Input!!");
                    wrongAudio.play();
                    if (score - 20 <= 0) {
                        setScore(20);
                        setLevel(0);
                        setQuery("");
                    }
                }, 500)
            }
        }
        catch (err) {
            setErrorMessage("Wrong Input!!");
            wrongAudio.play();
            setloading(false);
            setQuery("");
            setMessage("")
            setIsError(true)
            console.log(err);
        }
    }

    return (
        loading === false ? <div className='root-body'>
            <Scoreboard score={score} />
            <Modal className='gameEndedModal' show={gameEnded} onHide={() => setGameEnded(false)}>
                <Modal.Body>
                    <div className="modalBodyContent">
                        <p className="modalBodyText">
                            Your final score: <br></br><span className="score">{score}</span>
                        </p>
                        {score === 820 && (
                            <p className="scoreMessage">You are a SQL Grandmaster!</p>
                        )}
                        {score >= 600 && score < 820 && (
                            <p className="scoreMessage">You are a SQL Master!</p>
                        )}
                        {score < 600 && (
                            <p className="scoreMessage">
                                You need more SQL Skills to find the murderer.
                            </p>
                        )}
                        <img
                            className="congratsImage"
                            src={congrats}
                            alt="Congratulations"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-secondary feedback-button"
                        onClick={() => window.open('https://forms.gle/N4EiqvSEywGri9pS7', '_blank')}
                    >
                        Give Feedback
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setGameEnded(false);
                            resetGame();
                        }}
                    >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={showInstructions} onHide={() => setShowInstructions(false)}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <p className='para'>Instructions</p>
                    <p>Initially, You would be given 20 points. Enter SQL queries in the text area and click the Execute button to check your answer.</p>
                    <p>If your answer is correct, you will earn 100 points. If it is incorrect, you will lose 20 points.</p>
                    <p>If your score reaches 0, the game will end and you will need to start over with a new score of 20.</p>
                    <p>You can click the Hint button to receive hints for each level of the game. The hint button will get disabled after you click it once. Each hint will deduct 10 points from your score, so use them wisely!</p>
                    <p>Click the help button for more information about SQL syntax.</p>
                    <p>Good luck!</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className='helpButton' style={{ textAlign: "center" }} onClick={() => setShowInstructions(false)}>Begin</button>
                </Modal.Footer>
            </Modal>
            <Modal show={show} onHide={handleClose}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body><img src={schema} alt="schema" style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} /></Modal.Body>
            </Modal>
            <Container>
                <Row>
                    <Col>
                        <br />
                        <div className="outputWindow" >
                            {isError === false && message.length > 0 ? <div>
                                {tableData ?
                                    <div style={{ maxWidth: "600px" }}>
                                        {tableData ? <div >
                                            {errorMessage.length === 0 ? <img src={tryRequire('./output.png')} style={{ maxHeight: "400px", maxWidth: "600px" }} alt="result" /> : null}
                                            {message ? <div className='message'>
                                                {message}
                                            </div> : null}
                                        </div> : null}
                                    </div> : null}
                            </div> : <div>
                                {errorMessage.length > 0 ? <img src={tryRequire('./output.png')} alt="result" /> : null}
                                <div className='error'>
                                    {errorMessage}
                                </div></div>}
                        </div>
                        <br />
                        <br />
                        <div className="button-row">
                            <button className='sqlTutorialButton' onClick={() => { window.open("https://www.tutorialspoint.com/sql/index.htm", "_blank") }}>Help</button>
                            <button className='helpButton' onClick={handleShow}>Schema</button>
                            <button
                                className='hintButton'
                                disabled={usedHints.includes(level) || level >= questions.length - 1}
                                onClick={() => {
                                    setUsedHints([...usedHints, level]);
                                    setHints(true);
                                    setScore(score - 10);
                                }}
                            >
                                Hint
                            </button>
                            <button
                                className='executeButton'
                                disabled={level >= questions.length - 1}
                                onClick={() => { if (level < questions.length) executeSql() }}
                            >
                                Execute
                            </button>
                        </div>

                        <br />
                        <br />
                        <textarea style={{ height: "200px", width: "600px" }} placeholder='Select ... <----Write your SQL Query here----->' onInput={(event) => { setQuery(event.target.value); }} value={query} />
                        <br />
                        <br />

                    </Col>
                    <Col style={{ marginTop: "2%" }}>
                        <div className="outputWindow2" style={{ marginLeft: "10%" }}>
                            <div style={{ marginLeft: "2%", marginTop: "2%", marginRight: "2%", textAlign: "justify" }} >
                                {question}
                            </div>
                            <div style={{ marginLeft: "2%", marginTop: "2%", marginRight: "2%", textAlign: "justify" }} >{needHints ? hint : null}
                            </div>
                        </div>
                        <img src={man} alt="gif" style={{ height: "60%" }} />
                        <br />
                    </Col>
                </Row>
            </Container>
        </div> : <center className="root-body1"><Spinner />Loading</center>
    )
}
