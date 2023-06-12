import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Rightside from './components/Rightside';
import BodyParts from './components/BodyParts';
import Exercises from './components/Exercises';
import Account from './components/Account';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="AppGlass">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/my-workouts" element={<Dashboard />} />
            <Route path="/body-parts" element={<BodyParts />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/account" element={<Account />} />
          </Routes>
          <Rightside />
        </div>
      </div>
    </Router>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignupLogin from './components/SignupLogin';

// const App = () => {
//   return (
//     <div className="App">
//       <div className='AppGlass'>
//     <Router>
//     <Sidebar />
//       <Routes>
//         {/* <Route path="/" element={<SignupLogin />} /> */}
//           <Route path="/" element={<Dashboard />} />
//       </Routes>
//     </Router>
//     </div>
//     </div>
//   );
// };

// export default App;


