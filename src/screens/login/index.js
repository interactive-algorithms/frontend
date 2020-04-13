import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {login} from 'state/user'
export default props => {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
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
        login(dispatch, {
            user, password
        }).then((success) => {
            if(success) history.push("/")
            else{
                alert("wrong username/email or password")
            }
        });
    }}>
        <Form.Group>
            <Form.Label>Email / username</Form.Label>
            <Form.Control required placeholder="Enter email / username" onChange={e => setUser(e.target.value)}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="enter password" onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <div style={{margin : "auto", width : "fit-content"}}>
            <Button style={{width : "10vw"}} variant="primary" type="submit">
                Login
            </Button>
        </div>
    </Form>
}