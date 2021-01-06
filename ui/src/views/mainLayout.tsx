import React, { useState, useEffect, useCallback, FC } from "react";
import { Row, Col, Card, Container, Navbar, Button } from "react-bootstrap";
import { Book } from "../../../models/book";
import UserSideBar from "./userViews/userSideBar";
import AdminSideBar from "./adminViews/adminSideBar";
import UserCatalog from "./userViews/userCatalog";
import AdminBookManagement from "./adminViews/adminBookManagement";
import { fetchUsersBooks } from "../serviceCalls/userCalls";
import { navigate } from "hookrouter";
import { fetchAllBooks } from "../serviceCalls/adminCalls";

interface MainLayoutProps {
  userType: string;
}

const MainLayout: FC<MainLayoutProps> = ({ userType }) => {
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [allBookslist, setAllBooksList] = useState<Book[]>([]);
  const [userUpdate, setUserUpdate] = useState<boolean>(true);
  const [allBooksUpdate, setAllBooksUpdate] = useState<boolean>(true);

  // trigger an update to user's book list
  const updateUserBooks = useCallback(() => setUserUpdate(true), []);

  // trigger an update to all books for admin
  const updateAllBooks = useCallback(() => setAllBooksUpdate(true), []);

  useEffect(() => {
    // Load user's current checked out books
    const getUsersBooks = async () => {
      const currentBooks: any = await fetchUsersBooks();
      setUserBooks(currentBooks);
    };
    // Load all books for admin view
    const getAllBooks = async () => {
      const allBooks: Book[] = await fetchAllBooks();
      setAllBooksList(allBooks);
    };
    if (userUpdate) {
      getUsersBooks();
      setUserUpdate(false);
    }
    if (allBooksUpdate) {
      getAllBooks();
      setAllBooksUpdate(false);
    }
  }, [userUpdate, updateUserBooks, allBooksUpdate]);

  return (
    <div style={{ height: "100%" }}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Library Of Nae</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/login")}
          >
            LogOut
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <Container className="container">
        <Row>
          <Col xs lg="4">
            {userType === "admin" ? (
              <AdminSideBar updateAllBooks={updateAllBooks} />
            ) : (
              <UserSideBar
                userBooks={userBooks}
                updateUserBooks={updateUserBooks}
              />
            )}
          </Col>
          <Col>
            <Card>
              <Card.Header className="header">All Books</Card.Header>
              {userType === "admin" ? (
                <AdminBookManagement
                  booklist={allBookslist}
                  updateBooklist={updateAllBooks}
                />
              ) : (
                <UserCatalog
                  userBooks={userBooks}
                  updateUserBooks={updateUserBooks}
                />
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainLayout;
