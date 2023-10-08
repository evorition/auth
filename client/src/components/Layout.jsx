import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import { signout } from "../reducers/userReducer";

const Layout = ({ children }) => {
    const dispatch = useDispatch();

    const user = useSelector(({ user }) => user);

    const handleSignout = () => {
        dispatch(signout());
    };

    return (
        <>
            <Navbar bg="body-tertiary">
                <Container fluid>
                    <Navbar.Brand>Users control</Navbar.Brand>
                    <Navbar className="ml-auto">
                        {user ? (
                            <Nav>
                                <Navbar.Text>Hello, {user?.name}</Navbar.Text>
                                <Nav.Link onClick={handleSignout}>
                                    Sign Out
                                </Nav.Link>
                            </Nav>
                        ) : (
                            <Nav>
                                <Nav.Link as={Link} to="/signin">
                                    Sign In
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Sign Up
                                </Nav.Link>
                            </Nav>
                        )}
                    </Navbar>
                </Container>
            </Navbar>
            {children}
        </>
    );
};

export default Layout;
