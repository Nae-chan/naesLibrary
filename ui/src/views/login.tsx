import React, { useState } from "react";
import { Card, Form, Button, Tab, Tabs } from "react-bootstrap";
import { navigate } from "hookrouter";

const Login: React.FC = () => {
  const [userType, setUserType] = useState<string | null>("users");

  const navUser = (e: any) => {
    e.preventDefault();
    navigate("/users");
  };

  const navAdmin = (e: any) => {
    e.preventDefault();
    navigate("/admin");
  };
  return (
    <div className="App">
      <header className="App-header">
        <h2>Library of Nae</h2>
        <br />
        <Card body className="login-color">
          <Tabs
            transition={false}
            activeKey={userType}
            onSelect={(user) => setUserType(user)}
          >
            <Tab eventKey="users" title="Users">
              <Form onSubmit={navUser}>
                <Form.Group controlId="userFormBasicEmail">
                  <Form.Label className="login-label">Username</Form.Label>
                  <Form.Control
                    size="lg"
                    type="username"
                    placeholder="Enter username"
                    defaultValue="Jo"
                  />
                </Form.Group>

                <Form.Group controlId="userFormBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    defaultValue="...."
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="admin" title="Admin">
              <Form onSubmit={navAdmin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="login-label">Username</Form.Label>
                  <Form.Control
                    size="lg"
                    type="username"
                    placeholder="Enter username"
                    defaultValue="Kim the Librarian"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    defaultValue="......."
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Card>
      </header>
    </div>
  );
};

export default Login;
