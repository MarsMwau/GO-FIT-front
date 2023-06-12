import React, { useState } from "react";
import "./Card.css";
import ExerciseDetails from "./ExerciseDetails";

const Card = ({ bodyPart, onDelete }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleClose = () => {
    setIsClicked(false);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <div className="Card">
      <img src={bodyPart.body_part_image} alt={bodyPart.body_part_name} />
      <h2>{bodyPart.body_part_name}</h2>

      {isClicked && (
        <ExerciseDetails exercises={bodyPart.exercises} onClose={handleClose} />
      )}

      {!isClicked && (
        <button className="ShowExercisesButton" onClick={handleClick}>
          See Exercises
        </button>
      )}
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default Card;
