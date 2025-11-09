import { fetchNoteById } from "@/lib/api"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import NoteDetailsClient from "./NoteDetails.client"
import { Metadata } from "next"
import { Note } from "@/types/note"
import { SITE_URL } from "@/lib/host"

interface MetadataProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { id } = await params
    const note: Note = await fetchNoteById(id)

    return {
        title: `Note: ${note.title}`,
        description: `${note.content} - NoteHub`,
        openGraph: {
            title: `Note: ${note.title}`,
            description: `${note.content} - Open NoteHub and read more...`,
            url: `${SITE_URL}/notes/${id}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'NotesHub',
                }
            ]
        }

    }
}


interface NoteDetailsProps{
    params: Promise<{
        id: string
    }>
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
    const queryClient = new QueryClient()

    const { id } = await params


    await queryClient.prefetchQuery({
        queryKey: ['noteDetails', id],
        queryFn: () => fetchNoteById(id)
    })

    const dehydrateState = dehydrate(queryClient)

    
    return (
    <HydrationBoundary state={dehydrateState}>
        <NoteDetailsClient id={id} />
    </HydrationBoundary>
    )
}

export default NoteDetails