import React, { useState, useEffect } from 'react';
import "./Exercises.css";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('http://localhost:9292/exercise');
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExercises();
  }, []);

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.exercise_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.exercise_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Exercises">
      <h2>Exercises</h2>
      <div className="Search-bar">
        <input
          type="text"
          placeholder="Search by name or workout type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="Exercise-cards">
        {filteredExercises.map((exercise) => (
          <div className="Exercise-card" key={exercise.id}>
            <img src={exercise.exercise_image} alt={exercise.exercise_name} />
            <h3>{exercise.exercise_name}</h3>
            <p>{exercise.exercise_type}</p>
            <p>{exercise.exercise_description}</p>
            <p>Weight: {exercise.weight_kgs || 'N/A'}</p>
            <p>Sets and Reps: {exercise.sets} sets, {exercise.reps} reps</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;

