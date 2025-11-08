"use client"

import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NotePreviewProps {
  id: string;
};


export default function NotePreviewClient({ id }: NotePreviewProps) {
    const router = useRouter()
    const {data, isSuccess, isLoading, isError, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
        placeholderData: keepPreviousData,
    })

    function onClose() {
        router.back()
    }

    return (
        <>
            {isLoading && 
            <p>Loading...</p>}
            {isSuccess && 
            <Modal onClose={onClose}>
                <h2>{data.title}</h2>
                    <p>{data.content}</p>
                    <p>{data.tag}</p>
                    <p>{data.createdAt}</p>
                <button onClick={() => router.back()}>Close</button>    
            </Modal>}
            {isError &&
            <Modal onClose={onClose}>
                <h2>Error!</h2>
                <p>{`${error}`}</p>
            </Modal>}
        </>
    )
}