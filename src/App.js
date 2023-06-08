import React from 'react';
import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignupLogin from './components/SignupLogin';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

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



function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        <Dashboard/>
      </div>
    </div>
  );
}

export default App;

