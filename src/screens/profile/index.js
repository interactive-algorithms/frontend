import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {patchUser} from 'state/user'
import {useSelector} from 'react-redux'
export default props => {
    const user = useSelector(state => state.user);
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
        /*e.preventDefault();
        patchUser(dispatch, {
            username, password, email
        }).then(success => {
            if(success) history.push("/")
            else{
                alert("invalid user data")
            }
        })*/
    }}>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control disabled type={"email"} required defaultValue={user.email} placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control disabled required placeholder="Enter username" defaultValue={user.username} onChange={e => setUsername(e.target.value)}/>
        </Form.Group>
        {/*<Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control readonly required type="password" defaultValue={user.password} placeholder="Enter password" onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <div style={{margin : "auto", width : "fit-content"}}>
            <Button style={{width : "10vw"}} variant="primary" type="submit">
                Save
            </Button>
        </div>*/}
    </Form>
}