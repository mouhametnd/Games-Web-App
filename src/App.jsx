import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AsideFilter from './components/Aside/AsideFilter';
import Header from './components/Header/Header';
import Wrapper from './components/Wrapper';
import Loader from './assets/svgs/Loader';
import PortalModal from './portals/PortalModal';
import Modal from './components/Modal/Modal';

const Home = lazy(() => import('./pages/Home'));
const Favourite = lazy(() => import('./pages/Favourite'));
const Played = lazy(() => import('./pages/played'));
const PlayLater = lazy(() => import('./pages/playLater'));
const NoPageFound = lazy(() => import('./pages/NoPageFound'));

function App() {
  return (
    <>
      <PortalModal children={<Modal />} />
      <Wrapper>
        <Header />
        <AsideFilter />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NoPageFound />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/played" element={<Played />} />
            <Route path="/playlater" element={<PlayLater />} />
          </Routes>
        </Suspense>
      </Wrapper>
    </>
  );
}

export default App;
