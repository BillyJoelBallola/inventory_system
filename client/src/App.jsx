import React from 'react'
import { Routes, Route } from "react-router-dom";

import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Category from './pages/Category';
import Account from './pages/Account';
import ActivityLog from './pages/ActivityLog';
import _404 from './pages/_404';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Report from './pages/Report';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<_404 />} />
      <Route path="/" element={<Layout />} >
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/category" element={<Category />} />
        <Route path="/accounts" element={<Account />} />
        <Route path="/activity-logs" element={<ActivityLog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<Report />} />
      </Route>;
    </Routes>
  )
}

export default App