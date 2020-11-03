import React, { useState } from 'react';
import './App.css';
import './bootstrap.min.css';
import { Container, Button, Row, Col } from 'react-bootstrap';

const App = () => {
  const [flour, setFlour] = useState(500);
  return (
    <Container>
      <Row>
        <Col>
          {flour}gramm
          <Button onClick={() => setFlour((prevState) => prevState + 1)}>
            +
          </Button>
          <Button onClick={() => setFlour((prevState) => prevState - 1)}>
            -
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
