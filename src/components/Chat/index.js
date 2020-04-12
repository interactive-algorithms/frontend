import React, {useRef, useState, useEffect} from 'react'
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom';
import "./index.css"
export default props => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const inputRef = useRef(null);
    useEffect(() => {
        const socket = io(process.env.REACT_APP_BACKEND_URL + "/messaging");
        setSocket(socket);
        socket.emit("joinSectionChat", props.sectionID);
        socket.on("all", allMessages => {
            setMessages(allMessages);
        })
        socket.on("new", message => {
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
    }}>
    
        <ScrollToBottom className={"ChatMessagesContainer"}>
            {
                messages.map(message => {
                    return <div key={message.id} style={{
                        width : "90%",
                        marginLeft : "5%",
                        height : "10%"
                    }}>
                        {message.content}, {message.time}, {message.username}
                    </div>
                })
            }
        </ScrollToBottom>
        <div style={{
            height : "5%",
            width : "100%"
        }}>
            <input ref={inputRef} style={{
                width : "80%",
                height : "100%",
            }}/>
            <button style={{
                width : "20%",
                height : "100%",
            }} onClick={() => {
                socket.emit("post", inputRef.current.value)
            }}>
                send
            </button>
        </div>
    </div>
}