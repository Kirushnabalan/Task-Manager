import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUP from './pages/Auth/SignUP';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './pages/Admin/Dashboard';
import ManageTask from './pages/Admin/ManageTask';
import CreateTask from './pages/Admin/CreateTask';
import ManageUsers from './pages/Admin/MAnageUsers';
import UserDashboard from './pages/User/UserDashboard';
import MyTasks from './pages/User/MyTasks';
import ViewTaskDetails from './pages/User/ViewTaskDetails';

const App = () => {
  return (
    <div>
     <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/SignUp" element={<SignUP/>}/>

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]}/>}>
            <Route path="/admin/dashboard" element={<Dashboard/>}/>
            <Route path="/admin/tasks" element={<ManageTask/>}/>
            <Route path="/admin/create-task" element={<CreateTask/>}/>
            <Route path="/admin/users" element={<ManageUsers/>}/>
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]}/>}>
            <Route path="/user/dashboard" element={<UserDashboard/>}/>
            <Route path="/user/tasks" element={<MyTasks/>}/>
            <Route path="/user/tasks" element={<ViewTaskDetails/>}/>
          </Route>
        </Routes>
     </Router>
    </div>
  )
}

export default App
