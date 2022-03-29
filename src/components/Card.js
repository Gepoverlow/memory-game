import React, { useState } from "react";

const Card = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  let content = (
    <React.Fragment>
      <div onClick={props.handleCardClick} className="card-container">
        <img className="card-image" src={props.source}></img>
        <br></br>
        <span className="card-name">{props.name}</span>
      </div>
    </React.Fragment>
  );

  return content;
};

export default Card;
