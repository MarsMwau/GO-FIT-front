// import React, { useState } from "react";
// import "./ExerciseDetails.css";

// const ExerciseDetails = ({ exercise, onClose }) => {
//   const [sets, setSets] = useState(exercise.sets);
//   const [reps, setReps] = useState(exercise.reps);
//   const [weights, setWeights] = useState(exercise.weights);
//   const [notes, setNotes] = useState("");
//   const [description, setDescription] = useState(exercise.description);

//   const handleIncreaseSets = () => {
//     setSets((prevSets) => prevSets + 1);
//   };

//   const handleDecreaseSets = () => {
//     setSets((prevSets) => (prevSets > 1 ? prevSets - 1 : 1));
//   };

//   const handleIncreaseReps = () => {
//     setReps((prevReps) => prevReps + 1);
//   };

//   const handleDecreaseReps = () => {
//     setReps((prevReps) => (prevReps > 1 ? prevReps - 1 : 1));
//   };

//   const handleIncreaseWeights = () => {
//     setWeights((prevWeights) => prevWeights + 5);
//   };

//   const handleDecreaseWeights = () => {
//     setWeights((prevWeights) => (prevWeights > 5 ? prevWeights - 5 : 5));
//   };

//   const handleNotesChange = (event) => {
//     setNotes(event.target.value);
//   };

//   const handleSave = () => {
//     // Update the exercise details
//     setDescription(description);
//     exercise.sets = sets;
//     exercise.reps = reps;
//     exercise.weights = weights;

//     // Make an API call to save the updated exercise details
//     fetch(
//       `http://localhost:9292/users/${exercise.user_id}/workoutplan/exercises/${exercise.exercise_id}`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           sets,
//           reps,
//           description,
//         }),
//       }
//     )
//       .then((response) => {
//         if (response.ok) {
//           console.log("Exercise details updated successfully");
//         } else {
//           throw new Error("Error updating exercise details");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         // Handle any error feedback to the user
//       });
//   };

//   return (
//     <div className="ExerciseDetailsPopup">
//       <div className="ExerciseDetailsContent">
//         <div className="ExerciseDetailsHeader">
//           <h2>{exercise.exercise_name}</h2>
//           <button onClick={onClose}>Close</button>
//         </div>
//         <div className="ExerciseDetailsBody">
//           <img
//             src={exercise.exercise_image}
//             alt="Exercise"
//             className="exercise-image"
//           />
//           <div className="details">
//             <p>{exercise.exercise_name}</p>
//             <p>{exercise.exercise_type}</p>
//             <p>{description}</p>
//             <div className="sets-reps">
//               <div className="weights-container">
//                 <span>Weight: {weights} kgs</span>
//                 <button onClick={handleDecreaseWeights}>-</button>
//                 <button onClick={handleIncreaseWeights}>+</button>
//               </div>
//               <div className="sets-container">
//                 <span>Sets: {sets}</span>
//                 <button onClick={handleDecreaseSets}>-</button>
//                 <button onClick={handleIncreaseSets}>+</button>
//               </div>
//               <div className="reps-container">
//                 <span>Reps: {reps}</span>
//                 <button onClick={handleDecreaseReps}>-</button>
//                 <button onClick={handleIncreaseReps}>+</button>
//               </div>
//             </div>
//             <textarea
//               placeholder="Add notes..."
//               value={notes}
//               onChange={handleNotesChange}
//             ></textarea>
//             <button className="save-button" onClick={handleSave}>
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExerciseDetails;

import React, { useState } from "react";
import "./ExerciseDetails.css";

const ExerciseDetails = ({ exercises, onClose }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const currentExercise = exercises[currentExerciseIndex];
  const [sets, setSets] = useState(currentExercise.sets);
  const [reps, setReps] = useState(currentExercise.reps);
  const [weights, setWeights] = useState(currentExercise.weights);
  const [description, setDescription] = useState(currentExercise.description);

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

  const showPreviousButton = currentExerciseIndex !== 0;
  const showNextButton = currentExerciseIndex !== exercises.length - 1;

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

  const resetExerciseDetails = () => {
    const updatedExercise = exercises[currentExerciseIndex];
    setSets(updatedExercise.sets);
    setReps(updatedExercise.reps);
    setWeights(updatedExercise.weights);
    setDescription(updatedExercise.description);
  };

  const handleSave = () => {
    // Update the exercise details
    currentExercise.sets = sets;
    currentExercise.reps = reps;
    currentExercise.weights = weights;
    currentExercise.description = description;

    // Make an API call to save the updated exercise details
    fetch(
      `http://localhost:9292/users/${currentExercise.user_id}/workoutplan/exercises/${currentExercise.exercise_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sets,
          reps,
          weights,
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
          <h2>{currentExercise.exercise_name}</h2>
          <button className="CloseButton" onClick={onClose}>
            x
          </button>
        </div>
        <div className="ExerciseDetailsBody">
          <div className="exercise-image">
          <img
          src={currentExercise.exercise_image}
          alt={currentExercise.exercise_name}
        />
          </div>
        <div className="details">
          <h3>Exercise Type: {currentExercise.exercise_type}</h3>
          <p>Instructions: {currentExercise.exercise_description}</p>
          <div className="weights-container">
            <span>Weight: {currentExercise.weights} kgs</span>
            <button onClick={handleDecreaseWeights}> -</button>
            <button onClick={handleIncreaseWeights}> +</button>
          </div>
          <div className="sets-container">
            <span>Sets: {currentExercise.sets}</span>
            <button onClick={handleDecreaseSets}> -</button>
            <button onClick={handleIncreaseSets}> +</button>
          </div>
          <div className="reps-container">
            <span>Reps: {currentExercise.reps}</span>
            <button onClick={handleDecreaseReps}> -</button>
            <button onClick={handleIncreaseReps}> +</button>
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
