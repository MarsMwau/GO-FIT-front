// import React, { useState, useEffect } from "react";
// import "./NewWorkout.css";

// const NewWorkout = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [bodyParts, setBodyParts] = useState([]);
//   const [selectedBodyPart, setSelectedBodyPart] = useState("");
//   const [exerciseName, setExerciseName] = useState("");
//   const [sets, setSets] = useState("");
//   const [reps, setReps] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageURL, setImageURL] = useState("");

//   // Fetch available body parts data from the server
//   useEffect(() => {
//     fetch("http://localhost:9292/bodyparts")
//       .then((response) => response.json())
//       .then((data) => {
//         // Set the available body parts data
//         setBodyParts(data);
//       });
//   }, []);

//   const handleFormSubmit = (event) => {
//     event.preventDefault();

//     // Create a new workout plan object
//     const workoutPlan = {
//       bodyPart: selectedBodyPart,
//       exercise: {
//         name: exerciseName,
//         sets: sets,
//         reps: reps,
//         description: description,
//         imageURL: imageURL,
//       },
//     };

//     // Send the workout plan data to the server (POST request)
//     fetch("http://localhost:9292/workout_plans", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(workoutPlan),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the response from the server
//         console.log(data);
//         // Reset the form fields
//         setSelectedBodyPart("");
//         setExerciseName("");
//         setSets("");
//         setReps("");
//         setDescription("");
//         setImageURL("");
//       })
//       .catch((error) => {
//         // Handle any errors
//         console.error("Error:", error);
//       });
//   };

//   const handleFormToggle = () => {
//     setShowForm(!showForm);
//   };

//   return (
//     <div className="Newworkout">
//       <h2>New Workout</h2>
//       {!showForm && (
//         <button className="FormToggle" onClick={handleFormToggle}>
//           Create New Workout
//         </button>
//       )}
//       {showForm && (
//         <div className="Form-popup">
//           <div className="Form-content">
//         <form onSubmit={handleFormSubmit}>
//           <label htmlFor="day">Day:</label>

//         <label htmlFor="bodyPart">Body Part:</label>
//         <select
//           id="bodyPart"
//           value={selectedBodyPart}
//           onChange={(e) => setSelectedBodyPart(e.target.value)}
//           required
//         >
//           <option value="">Select a body part</option>
//           {bodyParts.map((bodyPart) => (
//             <option key={bodyPart.id} value={bodyPart.name}>
//               {bodyPart.name}
//             </option>
//           ))}
//         </select>

//         <label htmlFor="exerciseName">Exercise Name:</label>
//         <input
//           type="text"
//           id="exerciseName"
//           value={exerciseName}
//           onChange={(e) => setExerciseName(e.target.value)}
//           required
//         />

//         <label htmlFor="sets">Sets:</label>
//         <input
//           type="number"
//           id="sets"
//           value={sets}
//           onChange={(e) => setSets(parseInt(e.target.value))}
//           required
//         />

//         <label htmlFor="reps">Reps:</label>
//         <input
//           type="number"
//           id="reps"
//           value={reps}
//           onChange={(e) => setReps(parseInt(e.target.value))}
//           required
//         />

//         <label htmlFor="description">Description:</label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         ></textarea>

//         <label htmlFor="imageURL">Image URL:</label>
//         <textarea
//           type="text"
//           id="imageURL"
//           value={imageURL}
//           onChange={(e) => setImageURL(e.target.value)}
//           required
//           ></textarea>

//           <button type="submit">Add Workout</button>
//           <button className="FormToggle" onClick={handleFormToggle}>
//             Cancel
//           </button>
//         </form>
//         </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewWorkout;

import React, { useState, useEffect } from "react";
import "./NewWorkout.css";

const NewWorkout = () => {
  const [showForm, setShowForm] = useState(false);
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  // Fetch available body parts data from the server
  useEffect(() => {
    fetch("http://localhost:9292/bodyparts")
      .then((response) => response.json())
      .then((data) => {
        // Set the available body parts data
        setBodyParts(data);
      });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Create a new workout plan object
    const workoutPlan = {
      user_id: 1,
      body_parts: [
        {
          body_part_name: selectedBodyPart,
          body_part_image: "",
          workout_kind: "Upper Body",
          exercises: [
            {
              exercise_name: exerciseName,
              exercise_type: "Compound",
              exercise_image: imageURL,
              exercise_description: description,
              weight_kgs: null,
              sets: sets,
              reps: reps,
            },
          ],
        },
      ],
    };

    // Send the workout plan data to the server (POST request)
    fetch("http://localhost:9292/workout_plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutPlan),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        // Reset the form fields
        setSelectedBodyPart("");
        setExerciseName("");
        setSets("");
        setReps("");
        setDescription("");
        setImageURL("");
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="Newworkout">
      <h2>New Workout</h2>
      {!showForm && (
        <button className="FormToggleOpen" onClick={handleFormToggle}>
          Create New Workout
        </button>
      )}
      {showForm && (
        <div className="Form-popup">
          <div className="Form-content">
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="bodyPart">Body Part:</label>
              <select
                id="bodyPart"
                value={selectedBodyPart}
                onChange={(e) => setSelectedBodyPart(e.target.value)}
                required
              >
                <option value="">Select a body part</option>
                {bodyParts.map((bodyPart) => (
                  <option key={bodyPart.id} value={bodyPart.body_part_name}>
                    {bodyPart.body_part_name}
                  </option>
                ))}
              </select>

              <label htmlFor="exerciseName">Exercise Name:</label>
              <input
                type="text"
                id="exerciseName"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                required
              />

              <label htmlFor="sets">Sets:</label>
              <input
                type="number"
                id="sets"
                value={sets}
                onChange={(e) => setSets(parseInt(e.target.value))}
                required
              />

              <label htmlFor="reps">Reps:</label>
              <input
                type="number"
                id="reps"
                value={reps}
                onChange={(e) => setReps(parseInt(e.target.value))}
                required
              />

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>

              <label htmlFor="imageURL">Image URL:</label>
              <textarea
                type="text"
                id="imageURL"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                required
              ></textarea>

              <button className="Submiting" type="submit">Add Workout</button>
              <button className="FormToggle" onClick={handleFormToggle}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewWorkout;

