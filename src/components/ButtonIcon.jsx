import React from 'react';
import styled from 'styled-components';

const ButtonIcon = ({ children, isActive, onClick, size }) => {
  return (
    <Button
      size={size}
      isActive={isActive}
      className={isActive && 'button-icon--active'}
      onClick={onClick}
      children={children}
    />
  );
};

const Button = styled.button`
  padding: 5px;
  background-color: transparent;

  & svg {
    width: ${({ size }) => size || '28px'};
    height: ${({ size }) => size || '28px'};
    stroke-width: 1.3px;
    stroke: var(--special);
    fill: transparent;
    overflow: visible;
    @media screen and (min-width: 1024px) {
      width: ${({ size }) => size || '32px'};
      height: ${({ size }) => size || '32px'};
    }
  }

  & path {
    fill: ${({ isActive }) => (isActive ? `var(--special)` : 'transparent')};
    stroke: var(--special);
  }
`;

export default ButtonIcon;
