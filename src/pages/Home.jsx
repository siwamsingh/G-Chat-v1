import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import appwriteService from "../appwrite/config"
import Input from '../components/Input'
import Chats from '../components/Chat/Chats'

function Home() {

    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            body: "",
            image: "",
            userId: ""
        }
    });

    const userData = useSelector(state => state.auth.userData)
    const selectedFiles = watch("img");
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        if (selectedFiles) {
            if (selectedFiles.length > 0) setSelected(true);
            else setSelected(false);
        } else {
            setSelected(false);
        }
    }, [selectedFiles])

    const send = async (data) => {
        if (data) {
            if (data.img[0]) {
                const file = await appwriteService.uploadFile(data.img[0]);
                if (file) {
                    const fileId = file.$id;
                    data.image = fileId;
                }
            }
        }
        if (userData) {
            data.userName = userData.name;
            data.userId = userData.$id;
        }

        await appwriteService.sendMessage(data);
        setValue("body", "");
        setValue("img", {});
    }


    return (
        <div className='h-full flex flex-col justify-between w-full'>
            <div className=' h-full overflow-auto hidescroll'
                style={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(255, 255, 255, 0.16)" }}>
                <Chats />
            </div>
            <form onSubmit={handleSubmit(send)} className='flex flex-col  bg-cyan-900  p-2'>

                <div className=' flex justify-between border h-fit bg-white'>
                    <div
                        className={`rounded-md border-2 bg-gray-50 p-1 scale-75 shadow-md w-12 ${selected ? "border-red-500" : "border-indigo-500 "}`}
                        id="file-container">
                        <label
                            htmlFor="upload"
                            className="flex flex-col items-center gap-2 cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 fill-white  ${selected ? " stroke-red-500" : "stroke-indigo-500"}`}
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </label>

                        <input
                            id="upload"
                            type="file"
                            className="hidden"
                            accept="image/png, image/jpg, image/jpeg, image/gif "
                            {...register("img")}
                        />
                    </div>
                    <div className='pt-1 w-full'>
                        <Input
                            className="w-full border-2 border-gray-300 "
                            {...register("body")}
                        /> </div>
                    <div className=' my-auto overflow-hidden p-2'>
                        <button
                            type='submit'
                            className=' text-white scale-150 pr-1'
                            onClick={send}
                        >
                            ➡️
                        </button></div>
                </div>
            </form>
        </div>
    )
}

export default Home
