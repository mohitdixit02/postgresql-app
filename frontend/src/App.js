import './App.css';
import Home from './components/Pages/Home/Home';
import NavFootWrapper from './components/wrapper/NavFootWrapper';
import TaskManager from './components/Pages/TaskManager/TaskManager';
import JobManager from './components/Pages/JobManager/JobManager';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotificationProvider from './components/Notifications/Notifications';

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <NavFootWrapper>
          <Routes>
            <Route path="/" element={
              <div className="App">
                <Home />
              </div>
            } />
            <Route path="/task_manager" element={
              <div className="App">
                <TaskManager />
              </div>
            } />
            <Route path="/job_manager" element={
              <div className="App">
                <JobManager />
              </div>
            } />
          </Routes>
        </NavFootWrapper>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
