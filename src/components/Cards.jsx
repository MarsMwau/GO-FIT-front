import React, { useState, useEffect } from "react";
import Card from "./Card";
import './Cards.css'

const Cards = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/users/1/workoutplan")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWorkoutPlans(data);
      });
  }, []);

  const handleDeleteWorkoutPlan = (workoutPlanId) => {
    fetch(`http://localhost:9292/workoutplans/${workoutPlanId}`, {
      method: "DELETE",
    })
    .then((response) => {
      if (response.ok) {
        console.log("Workout plan deleted successfully");
        // Remove the deleted workout plan from the state
        setWorkoutPlans((prevPlans) =>
          prevPlans.filter((plan) => plan.workout_plan_id !== workoutPlanId)
        );
      } else {
        throw new Error("Error deleting workout plan");
      }
    })
    .catch((error) => {
      console.error(error);
      // Handle any error feedback to the user
    });
};

  return (
    <div className="Cards">
      {workoutPlans.map((plan) => (
        <div className="parentContainer" key={plan.workout_plan_id}>
          <div className="CompactCard">
            <Card
              key={plan.workout_plan_id}
              title={plan.day}
              bodyParts={plan.body_parts}
              onDelete={() => handleDeleteWorkoutPlan(plan.workout_plan_id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
