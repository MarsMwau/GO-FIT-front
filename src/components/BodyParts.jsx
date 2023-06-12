import React, { useEffect, useState } from 'react';
import "./BodyParts.css";

function BodyParts() {
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9292/bodyparts')
      .then(response => response.json())
      .then(data => setBodyParts(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='Bodyparts'>
      <h2>Body Parts</h2>
      <div className="CardContainer">
        {bodyParts.map(bodyPart => (
          <div className="Card" key={bodyPart.id}>
            <img src={bodyPart.image} alt={bodyPart.body_part_name} />
            <h3>{bodyPart.body_part_name}</h3>
            <p>{bodyPart.workout_kind}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BodyParts;

