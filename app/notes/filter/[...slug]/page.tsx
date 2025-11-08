import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './Notes.client'

type NotesProps = {
  params: Promise<{ slug: string[] }>;
};


export default async function Notes({ params }: NotesProps) {
  const { slug } = await params

  const actualTag = slug?.[0] === 'all' ? undefined : slug?.[0];

  const queryClient = new QueryClient();

  const page = 1
  const query = ''

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, query, actualTag],
    queryFn: () => fetchNotes(query, page, actualTag),
  });

  const dehydrateState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydrateState}>
      <NotesClient initialPage={page} initialQuery={query} initialTag={actualTag} />
    </HydrationBoundary>
  );
}

