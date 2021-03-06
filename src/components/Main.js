import { LOGICAL_OPERATORS } from "@babel/types";
import React, { useState, useEffect } from "react";
import Score from "./Score";
import Card from "./Card";
import Loading from "./Loading";

const Main = () => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [hiscore, setHiscore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(`https://eldenring.fanapis.com/api/bosses?limit=100`);
  }, []);

  useEffect(() => {
    shuffleCards();
  }, [score]);

  const shuffleCards = () => {
    const cardsToShuffle = [...cards];
    const cardsShuffled = cardsToShuffle.sort(() =>
      Math.random() > 0.5 ? 1 : -1
    );
    setCards(cardsShuffled);
  };

  const dataConverter = (source, name, id) => {
    return {
      source: source,
      name: name,
      id: id,
    };
  };

  const fetchData = (url) => {
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch Boss list");
        }
        return response.json();
      })
      .then((data) => {
        const allBosses = [];
        for (data of data.data) {
          if (data.image) {
            allBosses.push(dataConverter(data.image, data.name, data.id));
          }
        }
        const shuffledBosses = allBosses
          .sort(() => (Math.random() > 0.5 ? 1 : -1))
          .slice(0, 10);
        setCards(shuffledBosses);
        setIsLoading(false);
      });
  };

  const handleClick = (value) => {
    const prevScore = score;
    const prevHiscore = hiscore;
    if (!value) {
      const updatedScore = prevScore + 1;
      setScore(updatedScore);
      if (updatedScore > prevHiscore) {
        setHiscore(updatedScore);
      }
    } else {
      setScore(0);
      fetchData(`https://eldenring.fanapis.com/api/bosses?limit=100`);
    }
  };

  let content = (
    <React.Fragment>
      <div className="game-container">
        <Score current={score} highest={hiscore} />
        <div className="cards-container">
          {isLoading ? (
            <Loading />
          ) : (
            cards.map((card) => {
              return (
                <Card
                  key={card.id}
                  onClick={handleClick}
                  name={card.name}
                  source={card.source}
                  alt={card.name}
                ></Card>
              );
            })
          )}
        </div>
      </div>
    </React.Fragment>
  );

  return content;
};

export default Main;
