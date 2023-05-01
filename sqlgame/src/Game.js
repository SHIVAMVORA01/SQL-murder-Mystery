import React, { useState } from 'react'
import './Game.css';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

import man from './man.png'
export default function Game() {
    const questions = [
        "There's been a Murder in SQL City!  A crime has taken place and the detective needs your help. The detective gave you the crime scene report, but you somehow lost it. You vaguely remember that the crime was a murder that occurred sometime on Jan.15, 2018 and that it took place in SQL City. Start by retrieving the corresponding crime scene report from the police department’s database.",
        "Security footage shows that there were 2 witnesses. The first witness lives at the last house on \"Northwestern Dr\" \n Got our crime scene report, as per the report there are 2 witnesses. Let's, look for the details of first witness",
        "The second witness, named Annabel, lives somewhere on \"Franklin Ave\" \n Let's, look for the details of second witness",
        "lets view the interview of both the witnesses taken after the murder.",
        "So, we got 2 clues-  \n Killer is a man and a member of the gym with a status of gold and having a membership no. starting with 48Z and left in a car with a no. plate of H42W and He was working out in the gym on 9th of Jan. Check the gym database with above details",
        "Two member's found and their membership id. Now, let's check the car details by the above details",
        "Two male with a plate no. containg H42W. Check personal details of both the males from the above query",
        "Lets check which of this two are a member of the gym?",
        "Congrats, you found the murderer - Jeremy Bowers. Both the membership id and status also matches as per the information we found earlier.",
    ]
    const hints = ["Hints : Find all crime scene reports in 'SQL City' and sort them by date.",
        "Hints : Find all persons on 'Northwestern Dr' and sort them by address number (highest to lowest).",
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

    const tryRequire = (path) => {
        try {
            return require(`${path}`);
        } catch (err) {
            return null;
        }
    };
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
                        setQuestion(questions[level + 1])
                        setHint(hints[level + 1]);
                        setHints(false);
                        setTable(true);
                        setLevel(level + 1);
                        setErrorMessage("");
                        setloading(false);
                        setQuery("");
                        setMessage("Congratulations ")
                        setIsError(false)
                    }, 5000)

                }
                else {
                    setTimeout(() => {
                        setTable(true);
                        setloading(false);
                        setMessage("")
                        setIsError(true)
                        setErrorMessage("ooops try again!!");
                    }, 1000)
                }
            }
            if (response.status === 400) {
                setTimeout(() => {
                    setTable(true);
                    setloading(false);
                    setMessage("")
                    setIsError(true)
                    setErrorMessage("ooops try again!!");
                }, 500)
            }
        }
        catch (err) {
            setErrorMessage("ooops try again!!");
            setloading(false);
            setQuery("");
            setMessage("")
            setIsError(true)
            console.log(err);
        }

    }

    return (
        loading === false ? <div className='root-body'>
            <Container>
                <Row>
                    <Col>
                        <br />
                        <div className="outputWindow" >
                            {isError === false && message.length > 0 ? <div>
                                {tableData ?
                                    <div style={{maxWidth:"600px"}}>
                                        {tableData ? <div >
                                            {errorMessage.length === 0 ? <img src={tryRequire('./output.png')} alt="result" /> : null}
                                            {message ? <div className='message'>
                                                {message}
                                            </div> : null}
                                        </div> : null}

                                    </div>

                                    : null}
                            </div> : <div>
                                {errorMessage.length > 0 ? <img src={tryRequire('./output.png')} alt="result" /> : null}
                                <div className='error'>
                                    {errorMessage}
                                </div></div>}
                        </div>
                        <br />
                        <br />
                        <textarea style={{ height: "300px", width: "500px" }} placeholder='Select ... <----Write your SQL Query here----->' onInput={(event) => { setQuery(event.target.value); }} value={query} />
                        <br />
                        <br />
                        <Row md={3}>
                            <Col>
                                <button className='helpButton'><a  style={{textDecoration:"none",color:"#FFF"}} target='__blank' href='https://www.tutorialspoint.com/sql/index.htm'>Help </a></button>
                            </Col>
                            <Col>
                                <button className='hintButton' onClick={() => { if (level < questions.length) setHints(true) }}>Hint </button>
                            </Col>
                            <Col>
                                <button className='executeButton' onClick={() => { if (level < questions.length) executeSql() }}>Execute </button>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{ marginTop: "2%" }}>
                        <div className="outputWindow" style={{ marginLeft: "35%", color: "#FFF", fontSize: "18px" }}>
                            <div>
                                {question}
                            </div>
                            <div>{needHints ? hint : null}
                            </div>

                        </div>
                        <img src={man} alt="gif" style={{height: "50%" }} />
                        <br />
                    </Col>
                </Row>
            </Container>
        </div> : <center style={{marginTop:"30%"}}><Spinner /></center>
    )
}
