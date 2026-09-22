import React, { useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Home from './components/Home/Home';
import Profile from './components/profile/Profile';
import Contacts from './components/Contacts/Contacts';

export default function App() {
  const [tab, setTab] = useState('home');

  const renderTab = () => {
    switch (tab) {
      case 'home':
        return (
          <ErrorBoundary key="home">
            <Home />
          </ErrorBoundary>
        );
      case 'profile':
        return (
          <ErrorBoundary key="profile">
            <Profile />
          </ErrorBoundary>
        );
      case 'contacts':
        return (
          <ErrorBoundary key="contacts">
            <Contacts />
          </ErrorBoundary>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Навигация по вкладкам с ErrorBoundary</h1>
      <div>
        <button onClick={() => setTab('home')}>Главная</button>
        <button onClick={() => setTab('profile')}>Профиль</button>
        <button onClick={() => setTab('contacts')}>Контакты</button>
      </div>
      <div>{renderTab()}</div>
    </div>
  );
}