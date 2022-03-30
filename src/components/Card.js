import React, { useState, useEffect } from "react";

const Card = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {}, []);

  const handleChangeState = () => {
    props.onClick && props.onClick(isClicked);
    if (!isClicked) {
      setIsClicked(true);
    }
  };

  let content = (
    <React.Fragment>
      <div onClick={handleChangeState} className="card-container">
        <img className="card-image" src={props.source}></img>
        <br></br>
        <span className="card-name">{props.name}</span>
      </div>
    </React.Fragment>
  );

  return content;
};

export default Card;
