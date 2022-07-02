import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

let scrollBack = 0;
const Wrapper = ({ children }) => {
  const { modalGame, scrollBackState } = useSelector(state => state);
  const { shouldScrollBack } = scrollBackState;

  if (modalGame.isModalOpen && !scrollBack) scrollBack = window.scrollY;

  useEffect(() => {
    if (!modalGame.isModalOpen && shouldScrollBack) {
      window.scroll(0, scrollBack);
      scrollBack = 0;
    }
  }, [modalGame.isModalOpen]);

  return <RootWrapper isModalOpen={modalGame.isModalOpen} children={children} />;
};

const RootWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  margin-top: 90px;
  padding: 20px;

  & {
    ${({ isModalOpen }) => isModalOpen && 'display: none; pointer-events: none;'}
  }
`;

export default Wrapper;
