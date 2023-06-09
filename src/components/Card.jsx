import React, { useState } from "react";
import ExerciseDetails from "./ExerciseDetails";
import "./Card.css";

const Card = ({ title, bodyParts, onDelete }) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);

  const handleBodyPartClick = (bodyPart) => (event) => {
    event.stopPropagation();
    setSelectedBodyPart((prevSelectedBodyPart) =>
      prevSelectedBodyPart === bodyPart ? null : bodyPart
    );
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDelete();
  };

  const handleCloseDetails = () => {
    setSelectedBodyPart(null);
  };

  return (
    <div className="Card">
      <h3>{title}</h3>
      {bodyParts && (
        <div className="BodyParts">
          {bodyParts.map((bodyPart) => (
            <div
              key={bodyPart.body_part_id}
              className={`BodyPart ${
                selectedBodyPart === bodyPart ? "active" : ""
              }`}
              onClick={handleBodyPartClick(bodyPart)}
            >
              <h4>{bodyPart.body_part_name}</h4>
            </div>
          ))}
        </div>
      )}
      {selectedBodyPart && (
        <div className="ExerciseDetailsPopup">
          <ExerciseDetails exercise={selectedBodyPart.exercise} onClose={handleCloseDetails} />
        </div>
      )}
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default Card;
