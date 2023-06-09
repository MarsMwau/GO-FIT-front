import React, { useState } from "react";
import "./ExerciseDetails.css";

const ExerciseDetails = ({ exercise, onClose }) => {
  const [sets, setSets] = useState(exercise.sets);
  const [reps, setReps] = useState(exercise.reps);
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState(exercise.exercise_description);
  const [weights, setWeights] = useState(exercise.weights);

  const handleIncreaseSets = () => {
    setSets((prevSets) => prevSets + 1);
  };

  const handleDecreaseSets = () => {
    setSets((prevSets) => (prevSets > 1 ? prevSets - 1 : 1));
  };

  const handleIncreaseReps = () => {
    setReps((prevReps) => prevReps + 1);
  };

  const handleDecreaseReps = () => {
    setReps((prevReps) => (prevReps > 1 ? prevReps - 1 : 1));
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleIncreaseWeights = () => {
    setWeights((prevWeights) => prevWeights + 5);
  };

  const handleDecreaseWeights = () => {
    setWeights((prevWeights) => (prevWeights > 5 ? prevWeights - 5 : 5));
  };

  const handleSave = () => {
    // Update the exercise details
    setDescription(description);
    exercise.sets = sets;
    exercise.reps = reps;
    exercise.weight_kgs = weights;

    // Make an API call to save the updated exercise details
    fetch(
      `http://localhost:9292/users/${exercise.user_id}/workoutplan/exercises/${exercise.exercise_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sets,
          reps,
          description,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Exercise details updated successfully");
        } else {
          throw new Error("Error updating exercise details");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle any error feedback to the user
      });
  };

  return (
    <div className="ExerciseDetailsPopup">
      <div className="ExerciseDetailsContent">
        <div className="ExerciseDetailsHeader">
          <h2>{exercise.exercise_name}</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="ExerciseDetailsBody">
          <img src={exercise.exercise_image} alt="Exercise" className="exercise-image" />
          <div className="details">
            <p>{exercise.exercise_name}</p>
            <p>{exercise.exercise_type}</p>
            <p>{description}</p>
            <div className="sets-reps">
              <div className="weights-container">
                <span>Weight: {weights} kgs</span>
                <button onClick={handleDecreaseWeights}>-</button>
                <button onClick={handleIncreaseWeights}>+</button>
              </div>
              <div className="sets-container">
                <span>Sets: {sets}</span>
                <button onClick={handleDecreaseSets}>-</button>
                <button onClick={handleIncreaseSets}>+</button>
              </div>
              <div className="reps-container">
                <span>Reps: {reps}</span>
                <button onClick={handleDecreaseReps}>-</button>
                <button onClick={handleIncreaseReps}>+</button>
              </div>
            </div>
            <textarea
              placeholder="Add notes..."
              value={notes}
              onChange={handleNotesChange}
            ></textarea>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetails;
