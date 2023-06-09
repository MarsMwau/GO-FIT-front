import React, { useState, useEffect } from "react";

const NewWorkout = () => {
  const [day, setDay] = useState("");
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
      day: day,
      bodyPart: selectedBodyPart,
      exercise: {
        name: exerciseName,
        sets: sets,
        reps: reps,
        description: description,
        imageURL: imageURL,
      },
    };

    // Send the workout plan data to the server (POST request)
    fetch("http://localhost:9292/users/1/workoutplan", {
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
        setDay("");
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

  return (
    <div>
      <h2>New Workout</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="day">Day:</label>
        <select
          id="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
        >
          <option value="">Select a day</option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>

        <label htmlFor="bodyPart">Body Part:</label>
        <select
          id="bodyPart"
          value={selectedBodyPart}
          onChange={(e) => setSelectedBodyPart(e.target.value)}
          required
        >
          <option value="">Select a body part</option>
          {bodyParts.map((bodyPart) => (
            <option key={bodyPart.id} value={bodyPart.name}>
              {bodyPart.name}
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
        <input
          type="text"
          id="imageURL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          required
        />

        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
};

export default NewWorkout;
