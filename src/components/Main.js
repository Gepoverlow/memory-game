import React, { useState, useEffect } from "react";
import Card from "./Card";

const Main = (props) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchData(`https://eldenring.fanapis.com/api/bosses?limit=100`);
  }, []);

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
      });
  };

  let content = (
    <React.Fragment>
      <div className="cards-container">
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              handleCardClick={shuffleCards}
              name={card.name}
              source={card.source}
            ></Card>
          );
        })}
      </div>
    </React.Fragment>
  );

  return content;
};

export default Main;
