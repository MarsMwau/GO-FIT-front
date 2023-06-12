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
        if (error.response) {
          console.log("Response status:", error.response.status);
          console.log("Response body:", error.response.body);
        }
      });      
  };

  return (
    <div className="Cards">
      {workoutPlans.map((plan) => (
        <div className="WorkoutCardContainer" key={plan.body_part_id}>
          <Card
            bodyPart={plan}
            onDelete={() => handleDeleteWorkoutPlan(plan.workout_plan_id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;





// delete '/workoutplans/:id' do
//         workout_plan = WorkoutPlan.find(params[:id])
//         workout_plan.destroy
//         { message: 'Workout plan deleted successfully' }.to_json
//     end 