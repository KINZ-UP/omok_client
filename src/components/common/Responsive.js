import React from 'react';
import styled from 'styled-components';

function Responsive(props) {
  return <ResponsiveBlock {...props} />;
}

const ResponsiveBlock = styled.div`
  width: min(900px, 100%);
  padding: 0 10px;
  margin: 0 auto;
`;

export default Responsive;
