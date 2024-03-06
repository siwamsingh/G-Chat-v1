import React, { useEffect, useState, useRef } from 'react'
import appwriteService from '../../appwrite/config';
import ChatBubble from './ChatBubble';
import conf from '../../conf/conf';

function Chats() {
    const bottomRef = useRef(null);
    const [Messages, setMessages] = useState([]);//array of documents

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView();
    }, [Messages]);

    useEffect(() => {
        appwriteService.getMessages([]).then((messages) => {
            if (messages) {
                setMessages(messages.documents)
            }
        });


        const unsubscribe = appwriteService.client.subscribe(`databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId}.documents`, response => {
            if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                setMessages(prev => prev.filter(message => message.$id !== response.payload.$id))
            }
            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                setMessages(prev => [...prev, response.payload])
            }
        })

        return () => {
            unsubscribe();
        }
    }, [])


    return (
        <div >
            {Messages.map((m) => (
                <div key={m.$id} >
                    <ChatBubble
                        message={m.body}
                        image={m.image}
                        userId={m.userId}
                        userName={m.userName}
                        time={m.$createdAt}
                        $id={m.$id}
                    />
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    )
}

export default Chats
