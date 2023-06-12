import React, { useEffect, useState } from 'react';
import "./Account.css";

function Account() {
  const [user, setUser] = useState(null);
  const userId = 1; // Assuming the user ID is hardcoded as 1 for this example

  useEffect(() => {
    fetch(`http://localhost:9292/user/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.log(error));
  }, [userId]);

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className='User'>
      <h2>User Information</h2>
      <div className="User-details">
      <div className="User-icon">
        <img src="https://cdn-icons-png.flaticon.com/512/552/552721.png" alt="User Icon" />
      </div>
      <h3><strong>Username:</strong> {user.user_name}</h3>
      <h4><strong>Email:</strong> {user.email}</h4>

      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Weight:</strong> {user.weight} kg</p>
      <p><strong>Height:</strong> {user.height} cm</p>
      </div>
    </div>
  );
}

export default Account;
