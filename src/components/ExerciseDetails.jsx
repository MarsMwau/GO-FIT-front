import React, { useState, useEffect } from "react";
import "./ExerciseDetails.css";

const ExerciseDetails = ({ exercises, onClose }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weights, setWeights] = useState(0);
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const showPreviousButton = currentExerciseIndex !== 0;
  const showNextButton = currentExerciseIndex !== exercises.length - 1;

  useEffect(() => {
    const currentExercise = exercises[currentExerciseIndex];
    setSets(currentExercise.sets);
    setReps(currentExercise.reps);
    setWeights(currentExercise.weights);
    setDescription(currentExercise.description);
  }, [currentExerciseIndex, exercises]);

  const handlePrevious = () => {
    setCurrentExerciseIndex((prevIndex) =>
      prevIndex === 0 ? exercises.length - 1 : prevIndex - 1
    );
    resetExerciseDetails();
  };

  const handleNext = () => {
    setCurrentExerciseIndex((prevIndex) =>
      prevIndex === exercises.length - 1 ? 0 : prevIndex + 1
    );
    resetExerciseDetails();
  };

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

  const handleIncreaseWeights = () => {
    setWeights((prevWeights) => prevWeights + 5);
  };

  const handleDecreaseWeights = () => {
    setWeights((prevWeights) => (prevWeights > 5 ? prevWeights - 5 : 5));
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const resetExerciseDetails = () => {
    const currentExercise = exercises[currentExerciseIndex];
    setSets(currentExercise.sets);
    setReps(currentExercise.reps);
    setWeights(currentExercise.weights);
    setDescription(currentExercise.description);
  };

  const handleSave = () => {
    const currentExercise = exercises[currentExerciseIndex];
    currentExercise.sets = sets;
    currentExercise.reps = reps;
    currentExercise.weights = weights;
    currentExercise.description += " " + description; // Append new description
  
    fetch(
      `http://localhost:9292/users/${currentExercise.user_id}/workoutplan/exercises/${currentExercise.exercise_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentExercise),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Exercise details updated successfully");
          setDescription(currentExercise.description); // Update the local description state
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
          <h2>{exercises[currentExerciseIndex].exercise_name}</h2>
          <button className="CloseButton" onClick={onClose}>
            x
          </button>
        </div>
        <div className="ExerciseDetailsBody">
          <div className="exercise-image">
            <img
              src={exercises[currentExerciseIndex].exercise_image}
              alt={exercises[currentExerciseIndex].exercise_name}
            />
          </div>
          <div className="details">
            <h3>Exercise Type: {exercises[currentExerciseIndex].exercise_type}</h3>
            <p>Instructions: {exercises[currentExerciseIndex].exercise_description}</p>
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
            <div>
              <textarea
                placeholder="Add notes..."
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
            <button className="SaveButton" onClick={handleSave}>
              Save
            </button>
            <div className="ExerciseNavigation">
              {showPreviousButton && (
                <button onClick={handlePrevious}>&lt;</button>
              )}
              {showNextButton && <button onClick={handleNext}>&gt;</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetails;

