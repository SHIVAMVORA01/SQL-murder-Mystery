function Scoreboard(props) {
    return (
      <div className="scoreboard">
        <span className="score" style={{ fontFamily: 'digital' }}>{props.score}</span>
        <span className="label" style={{ fontFamily: 'digital' }}>Points</span>
      </div>
    );
  }
export default Scoreboard;