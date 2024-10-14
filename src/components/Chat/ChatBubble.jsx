import React, { useEffect, useState } from 'react'
import appwriteService from '../../appwrite/config';
import { useSelector } from 'react-redux';

function ChatBubble({ image = null, message, userId,userName, time ,$id=""}) {
    let dateObject = new Date(time);
    let hour = dateObject.getHours();
    let minute = dateObject.getMinutes();

    const userData = useSelector(state=>state.auth.userData)
    const [UserID,setUserID] = useState("");
    useEffect(()=>{
        if (userData) {
            setUserID(userData.$id);
        }else{
            setUserID("");
        }
    },[userData])

    const deleteMessage = async () => {
        if (image) {
            await appwriteService.deleteFile(image)
        }

        if($id){
            await appwriteService.deleteMessage($id)
        }
    }
    return (
        <div className='p-4'>
            <div >
                <div className='flex justify-between'>
                    <div className='text-xs w-fit px-2  opacity-70 bg-slate-100 rounded-t-xl'>{`👤${userName}🕗${hour}:${minute}`}
                    </div>
                    { (UserID === userId || UserID === "670d042ab013c7767adb")  && <button className='px-0.5 text-md bg-gray-100 rounded-full opacity-50 hover:opacity-80 shadow-sm shadow-black border border-black' onClick={deleteMessage} >🗑️</button>}
                </div>
                <div className="w-fit shadow-md shadow-gray-800 first-line: px-4 bg-gray100 rounded-b-xl rounded-r-xl p-2 border bg-blue-300">
                    <div className="w-full justify-center mb-4">
                        {image && <img
                            src={appwriteService.getFilePreview(image)}
                            alt="image"
                            className="rounded-xl md:max-w-56 max-w-24"
                        />}
                    </div>
                    <h2
                        className=" font-bold min-w-[109px] text-base md:text-xl">{message}
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default ChatBubble
