import { Routes, Route, Navigate } from 'react-router-dom';
import ActivitiesPage from '../../pages/ActivitiesPage/ActivitiesPage';
import ActivityFormPage from '../../pages/ActivityFormPage/ActivityFormPage';
import ActivityPage from '../../pages/ActivityPage/ActivityPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ActivitiesPage />} />
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/activities/new" element={<ActivityFormPage mode="create" />} />
      <Route path="/activities/edit/:id" element={<ActivityFormPage mode="edit" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/activity/:id" element={<ActivityPage />} />
    
    </Routes>
  );
}