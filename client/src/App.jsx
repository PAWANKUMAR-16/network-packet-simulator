import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './components/pages/LandingPage';
import NetworkBuilder from './components/NetworkBuilder';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="simulator" element={<NetworkBuilder />} />
          <Route path="dashboard" element={<div className="p-8 text-center text-xl font-medium text-slate-500">Dashboard coming soon...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
