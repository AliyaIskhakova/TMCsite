import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const NavBar = () => {
    return (
        <Navbar expand="md" style={{ backgroundColor: '#051354' }} >
            <Container fluid>
                <Navbar.Brand href="/mainpage" style={{ color: '#fff' }}>ТехноМедиаСоюз</Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="offcanvasNavbar-expand-md"
                    style={{ borderColor: '#fff' }} // Белая рамка для кнопки
                >
                    <span
                        style={{
                            display: 'block',
                            width: '25px',
                            height: '3px',
                            backgroundColor: '#fff', // Белые полоски
                            margin: '4px 0',
                        }}
                    ></span>
                    <span
                        style={{
                            display: 'block',
                            width: '25px',
                            height: '3px',
                            backgroundColor: '#fff', // Белые полоски
                            margin: '4px 0',
                        }}
                    ></span>
                    <span
                        style={{
                            display: 'block',
                            width: '25px',
                            height: '3px',
                            backgroundColor: '#fff', // Белые полоски
                            margin: '4px 0',
                        }}
                    ></span>
                </Navbar.Toggle>
                <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-md"
                    aria-labelledby="offcanvasNavbarLabel-expand-md"
                    placement="end"
                    style={{ backgroundColor: '#051354' }}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-md" style={{ color: '#fff' }}>
                            ТехноМедиаСоюз
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/repair" style={{ color: '#fff' }}>Ремонт оргтехники</Nav.Link>
                            <Nav.Link href="/refilling" style={{ color: '#fff' }}>Заправка картриджей</Nav.Link>
                            <Nav.Link href="/delivery" style={{ color: '#fff' }}>Доставка и оплата</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default NavBar;