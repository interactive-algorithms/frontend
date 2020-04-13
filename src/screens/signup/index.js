import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {signup} from 'state/user'
export default props => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();
    return <Form style={{
        width : "25%",
        margin : "auto",
        height : "fit-content",
        position : "fixed",
        top : "0",bottom : "0",left : "0",right : "0"
    }} onSubmit={e => {
        e.stopPropagation();
        e.preventDefault();
        signup(dispatch, {
            username, password, email
        }).then((success) => {
            if(success) history.push("/")
            else{
                alert("invalid username, email or password")
            }
        });
    }}>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type={"email"} required placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control required placeholder="Enter username" onChange={e => setUsername(e.target.value)}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <div style={{margin : "auto", width : "fit-content"}}>
            <Button style={{width : "10vw"}} variant="primary" type="submit">
                Signup
            </Button>
        </div>
    </Form>
}