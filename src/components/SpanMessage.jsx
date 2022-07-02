import React from 'react';
import styled from 'styled-components';

const SpanMessage = ({ children }) => <Span children={children}/>;
export default SpanMessage;

const Span = styled.span`
  text-align: center;
  align-self: end;
  font-size: clamp(1.5rem, 2vw, 2.5rem);
  color: var(--special);
`;
