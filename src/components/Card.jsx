import React, { useState } from "react";
import "./Card.css";
import ExerciseDetails from "./ExerciseDetails";

const Card = ({ bodyPart }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleClose = () => {
    setIsClicked(false);
  };

  return (
    <div className="Card">
      <img src={bodyPart.body_part_image} alt={bodyPart.body_part_name} />
      <h2>{bodyPart.body_part_name}</h2>

      {isClicked && (
        <ExerciseDetails
          exercises={bodyPart.exercises}
          onClose={handleClose}
        />
      )}

      {!isClicked && (
        <button className="ShowExercisesButton" onClick={handleClick}>
          See Exercises
        </button>
      )}
    </div>
  );
};

export default Card;
