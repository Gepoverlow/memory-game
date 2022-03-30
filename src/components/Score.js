import React from "react";

const Score = (props) => {
  let content = (
    <React.Fragment>
      <div className="score-container">
        <h1 id="score" className="score-current">
          Score: {props.current}
        </h1>
        <h1 id="hiscore" className="score-highest">
          Hiscore: {props.highest}
        </h1>
      </div>
    </React.Fragment>
  );

  return content;
};

export default Score;
