import React, { useEffect, useState } from 'react';

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
    <div>
      <h2>User Information</h2>
      <p><strong>Username:</strong> {user.user_name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Weight:</strong> {user.weight} kg</p>
      <p><strong>Height:</strong> {user.height} cm</p>
    </div>
  );
}

export default Account;
