import { fetchNoteById } from "@/lib/api"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import NoteDetailsClient from "./NoteDetails.client"

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