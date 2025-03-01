import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import PostsList from './components/PostsList';
import ProfileBox from './components/ProfileBox';
import NavScrollExample from './components/Navbar';
import UserProfile from './components/UserProfile';
import Categories from './components/Categories';
import CategoryPosts from './components/CategoryPosts';
import KullanımŞartları from './components/Kosullar';
import { store, persistor } from './app/store';
import './App.css';

const LayoutWithProfileBox = ({ children }) => (
  <div className="content-wrapper">
    <div className="left-column">
      <ProfileBox />
    </div>
    <div className="center-column">
      {children}
    </div>

  </div>
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <NavScrollExample />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<LayoutWithProfileBox><PostsList /></LayoutWithProfileBox>} />
              <Route path="/profil/:userId" element={<LayoutWithProfileBox><UserProfile /></LayoutWithProfileBox>} />
              <Route path="/category" element={<LayoutWithProfileBox><Categories /></LayoutWithProfileBox>} />
              <Route path="/category/:categoryId" element={<LayoutWithProfileBox><CategoryPosts /></LayoutWithProfileBox>} />
              <Route path="/kullanım-kosullari" element={<KullanımŞartları />} />
              <Route path="*" element={<p>Sayfa bulunamadı</p>} />
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
