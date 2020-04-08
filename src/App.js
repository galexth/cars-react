import React from 'react';
import { NotificationContainer } from 'react-notifications';
import styled from 'styled-components';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import Layout from './components/Layout';

const Header = styled.header`
  margin-bottom: 30px;
`;

const Container = styled.header`
  text-align: center;
`;

function App() {
  return (
    <Container className="container">
      <Header><h1>Cars</h1></Header>
      <Layout />
      <NotificationContainer />
    </Container>
  );
}

export default App;
