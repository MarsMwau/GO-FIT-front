import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./Cards.css";

const Cards = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/users/1/workoutplans")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWorkoutPlans(data);
      });
  }, []);

  return (
    <div className="Cards">
      {workoutPlans.map((plan) => (
        <div className="WorkoutCardContainer" key={plan.body_part_id}>
          <Card bodyPart={plan} />
        </div>
      ))}
    </div>
  );
};

export default Cards;
