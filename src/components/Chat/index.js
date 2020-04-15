import React, {useRef, useState, useEffect} from 'react'
import io from 'socket.io-client'
import { Scrollbars } from 'react-custom-scrollbars';
import {InputGroup, FormControl} from 'react-bootstrap'
import "./index.css"
import moment from 'moment'
import {useSelector} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
export default props => {
    const user = useSelector(state => state.user);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const scrollbar = useRef(null);
    useEffect(() => {
        if(!user || !user.username) return;
        const socket = io(process.env.REACT_APP_BACKEND_URL + "/messaging");
        setSocket(socket);
        socket.emit("joinSectionChat", props.sectionID);
        socket.on("all", allMessages => {
            setMessages(allMessages);
            setTimeout(() => {
                if(scrollbar.current) scrollbar.current.scrollToBottom()
            }, 100)
        })
        socket.on("new", message => {
            if(scrollbar.current.getValues().top >= 0.99){
                setTimeout(() => {
                    if(scrollbar.current) scrollbar.current.scrollToBottom()
                }, 100)
            }
            setMessages((messages) => {
                messages.push(message);
                return [...messages];
            });
        })
        return () => {
            socket.close();
        }
    }, [user])

    const sendMessage = () => {
        if(!socket) return;
        if(message.length > 0 && message!="\n") socket.emit("post", message)
        setTimeout(() => setMessage(""),10)
    }
    return <div style={{
        height : "100%",
        width : "100%",
        backgroundColor : "#f7f7f7",
        position : "relative"
    }}>
       {(user && user.username) && <ChatContent message={message} setMessage={setMessage} messages={messages} sendMessage={sendMessage} scrollbar={scrollbar}/>}
       {(!user || !user.username) && <div style={{
           position : "absolute",
           margin : "auto",
           top : 0, bottom : 0, right : 0, left : 0,
           width : "fit-content",
           height : "fit-content",
           color : "#7f7f7f"
       }}>
            Login to view section chat
       </div>} 
    </div>
}

const ChatContent = props => {
    return <div style={{
        display : "flex",
        flexDirection : "column",
        width : "100%",
        height : "100%",
    }}>
        <Scrollbars ref={props.scrollbar} style={{
            flex : 1
        }}>
            {
                props.messages.map((message, idx) => {
                    return <div key={message.id} style={{
                        width : "90%",
                        marginLeft : "5%",
                        height : "fit-content",
                        borderRadius : "10px",
                        backgroundColor : "#e9e9e9",
                        marginBottom : "10px",
                        padding : "5px",
                        marginTop : idx == 0 ? "10px" : "0px"
                    }}>
                        <div style={{marginLeft : "5px", fontSize : "1rem", textOverflow : "ellipsis", color : "#7f7f7f"}}>
                            {message.username}
                            <span style={{float : "right", fontSize : "0.75rem"}} title={moment(message.time).format("dddd, MMMM Do YYYY, HH:mm:ss")}>
                                {moment(message.time).format("HH:mm")}
                            </span>
                        </div>
                        <div style={{
                            fontSize : "0.9rem",
                            color : "#4b4b4b"
                        }}>{message.content}</div>
                    </div>
                })
            }
        </Scrollbars>
        <div style={{
            width : "100%",
            height : "fit-content",
            padding : "0.5rem",
            backgroundColor : "white"
        }}>
            <TextField
                onKeyPress={(e) => {
                    if(!e.shiftKey && e.key=="Enter"){
                        props.sendMessage()
                    }
                    e.stopPropagation()
                }}
                style={{
                    width : "80%"
                }}
                label="Message"
                multiline
                rows={2}
                variant="outlined"
                value={props.message}
                onChange={(e) => {
                    props.setMessage(e.currentTarget.value)
                }}
            />
            <div style={{
                display : "inline-block",
                width : "20%",
                height : "100%",
                position : "relative"
            }}>
                <IconButton style={{
                    margin : "auto",
                    top : 0, bottom : 0, right : 0, left : 0,
                    position : "absolute",
                    width : "fit-content",
                    height : "fit-content"
                }} variant="contained" color="primary" onClick={() => {
                    props.sendMessage()
                }}>
                    <SendIcon/>
                </IconButton>
            </div>
        </div>
    </div>
}