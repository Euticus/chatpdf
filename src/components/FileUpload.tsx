'use client'
import { Inbox, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadToS3 } from '@/lib/s3'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { stringMap } from 'aws-sdk/clients/backup'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'


const FileUpload = () => {
    const router = useRouter()
    const [uploading, setUploading] = useState(false)
    const { mutate, isLoading } = useMutation({
        mutationFn: async ({
            file_key, 
            file_name
        }: {
            file_key: string,
            file_name: string
        }) => {
            const response = await axios.post('api/create-chat', {file_key, file_name})
            return response.data
        }
    })

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "application/pdf": [".pdf"] },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            console.log(acceptedFiles);
            const file = acceptedFiles[0]
            if (file.size > 10 * 1024 * 1024){
                // bigger than 10mb
                toast.error("File too large")
                // alert("file too large")
                return
            }
            try{
                setUploading(true)
                const data = await uploadToS3(file)
                if (!data?.file_key || !data.file_name){
                    toast.error("Something went wrong")
                    // console.log("error!")
                    return
                }
                mutate(data, {
                    onSuccess: ({ chat_id }) => {
                        toast.success("Chat created")
                        router.push(`/chat/${chat_id}`)
                        console.log(data)
                        // toast.success(data.message)
                        // alert("success")
                    },
                    onError: (err) => {
                        toast.error("Error creating chat")
                        console.error(err)
                    }
                })
                console.log('data', data)
            } catch(err){
                console.error("this is your error", err)
            }
            finally{
                setUploading(false)
            }
        },
    })
    return (
        <div className="p-2 bg-white rounded-xl">
            <div {...getRootProps({
                className: 'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col'
            })}>
                <input {...getInputProps()}/>
                {(uploading || isLoading) ? (
                    <>
                    {/* Loading State */}
                    <Loader2 className="h-10 w-10 text-blue-500 animate-spin"/>
                    <p className="mt-2 text-sm text-slate-500">
                        Spilling Tea to GPT...
                    </p>
                    </>
                ) : (
                    <>
                        <Inbox className="w-10 h-10 text-blue-500"/>
                        <p className="mt-2 text-sm text-slate-400">Drop PDF here</p>
                    </>

                )}
            </div>
        </div>
    )
}

export default FileUpload