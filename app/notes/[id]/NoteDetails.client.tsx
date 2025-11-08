"use client"

import { useQuery } from "@tanstack/react-query"
import css from "./NoteDetailsClient.module.css"
import { fetchNoteById } from "@/lib/api"

interface NoteDetailsClientProps {
    id: string
}

const NoteDetailsClient = ({ id }: NoteDetailsClientProps) => {

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['noteDetails', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    })
    return (
        <div className={css.container}>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error!</p>}

            {isSuccess && 
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{data?.title}</h2>
                </div>
                <p className={css.content}>{data?.content}</p>
                <p className={css.date}>{data?.createdAt}</p>
            </div>
            }
        </div>
    )
}

export default NoteDetailsClient