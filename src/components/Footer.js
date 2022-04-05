import React, { useState, useEffect } from "react";

const Footer = () => {
  let content = (
    <React.Fragment>
      <footer className="footer">
        <p>
          {" "}
          <a href="https://github.com/Gepoverlow" target="_blank">
            Visit my Github
          </a>
        </p>
        <p>
          Credit to API creator{" "}
          <a href="https://github.com/deliton/eldenring-api" target="_blank">
            deliton
          </a>
        </p>
      </footer>
    </React.Fragment>
  );

  return content;
};

export default Footer;
