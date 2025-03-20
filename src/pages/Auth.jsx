import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Button, Card, Form , Row} from 'react-bootstrap';
import { Context } from '../main';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Auth = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    //const history = useHistory()
    const isLogin = location.pathname === "/auth"
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return(
        <Container
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 54}}
    >
        <Card style={{width: 600}} className="p-5">
            <h2 className="m-auto"> 
                {isLogin ? 'Авторизация' : "Регистрация"}
                </h2>
            <Form className="d-flex flex-column">
                <Form.Control
                    className="mt-3"
                    placeholder="Введите ваш email..."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Form.Control
                    className="mt-3"
                    placeholder="Введите ваш пароль..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                />
                <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                    {isLogin ?
                        <div>
                            Нет аккаунта? <NavLink to="/reg">Зарегистрируйся!</NavLink>
                        </div>
                        :
                        <div>
                            Есть аккаунт? <NavLink to="/auth">Войдите!</NavLink>
                        </div>
                    }
                    <Button
                        variant={"outline-success"}
                        //onClick={click}
                    >
                        {isLogin ? 'Войти' : 'Регистрация'}
                    </Button>
                </Row>

            </Form>
        </Card>
    </Container>
    );
};

export default Auth