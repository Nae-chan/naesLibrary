import { Card, Button } from "react-bootstrap";
import { navigate } from "hookrouter";

const PageNotFound = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Library of Nae</h2>
        <br />
        <Card body className="login-color">
          <h4>
            <p>Uh Oh,</p> <p>You shouldn't be here!</p>
          </h4>
          <Button variant="primary" onClick={() => navigate("/login")}>
            {" "}
            Ok, Sorry...{" "}
          </Button>
        </Card>
      </header>
    </div>
  );
};

export default PageNotFound;
