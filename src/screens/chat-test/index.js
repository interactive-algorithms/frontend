import React, {useState, useEffect} from 'react'
import Chat from 'components/Chat'
import request from 'state/request'
export default props => {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        request("POST", "/users/login", {
            username : "test",
            password : "test"
        }).then(() => {
            setLoggedIn(true);
        })
    }, [])

    if(!loggedIn) return <></>

    return <div>
        <div style={{
            position : "fixed",
            height : "50vh",
            width : "10vw",
            top : "25vh",
            left : "10vw"
        }}>
            <Chat sectionID={1}/>
        </div>
        <div style={{
            position : "fixed",
            height : "50vh",
            width : "10vw",
            top : "25vh",
            left : "30vw"
        }}>
            <Chat sectionID={2}/>
        </div>
        <div style={{
            position : "fixed",
            height : "50vh",
            width : "10vw",
            top : "25vh",
            left : "50vw"
        }}>
            <Chat sectionID={3}/>
        </div>
        <div style={{
            position : "fixed",
            height : "50vh",
            width : "10vw",
            top : "25vh",
            left : "70vw"
        }}>
            <Chat sectionID={4}/>
        </div>
    </div>
}