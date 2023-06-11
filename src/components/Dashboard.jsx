import './Dashboard.css';
import React from "react";
import Cards from "./Cards";
import NewWorkout from './NewWorkout';

const Dashboard = () => {
    return ( 
        <div className="dashboard">
            <h1>Dashboard</h1>
            <Cards />
            <NewWorkout />
        </div>
     );
}
 
export default Dashboard;