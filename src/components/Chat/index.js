import React, {useRef, useState, useEffect} from 'react'
import io from 'socket.io-client'
import { Scrollbars } from 'react-custom-scrollbars';
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import "./index.css"
import moment from 'moment'
export default props => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const inputRef = useRef(null);
    const scrollbar = useRef(null);
    useEffect(() => {
        const socket = io(process.env.REACT_APP_BACKEND_URL + "/messaging");
        setSocket(socket);
        socket.emit("joinSectionChat", props.sectionID);
        socket.on("all", allMessages => {
            setMessages(allMessages);
            setTimeout(() => {
                scrollbar.current.scrollToBottom()
            }, 100)
        })
        socket.on("new", message => {
            if(scrollbar.current.getValues().top == 1){
                setTimeout(() => {
                    scrollbar.current.scrollToBottom()
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
    }, [])
    if(!socket) return <></>
    return <div style={{
        height : "100%",
        width : "100%",
        backgroundColor : "#f7f7f7"
    }}>
    
        <Scrollbars ref={scrollbar} style={{
            height : "90%"
        }}>
            {
                messages.map((message, idx) => {
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
        <InputGroup style={{
            height : "10%",
            width : "90%",
            marginLeft : "5%",
            padding: "2% 0",
            flexWrap: "unset"
        }}>
            <FormControl ref={inputRef} onKeyPress={(e) => {
                if(!e.shiftKey && e.key=="Enter"){
                    if(inputRef.current.value.length > 0) socket.emit("post", inputRef.current.value)
                    setTimeout(() => inputRef.current.value = "", 10)
                }
                e.stopPropagation()
            }} as="textarea" style={{
                resize : "none",
                fontSize : "0.8rem",
                padding : "5px"
            }}/>
            <InputGroup.Append>
                <Button type={"submit"} onClick={() => {
                    if(inputRef.current.value.length > 0) socket.emit("post", inputRef.current.value)
                    inputRef.current.value = ""
                }} variant="outline-secondary" style={{padding : "5px"}}>send</Button>
            </InputGroup.Append>
        </InputGroup>
    </div>
}