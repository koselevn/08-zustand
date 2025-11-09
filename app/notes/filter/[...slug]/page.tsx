import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NotesClient from './Notes.client'
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/host';
import { fetchNotes } from '@/lib/api';


interface MetadataProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({params}: MetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const tegInPuth = slug?.[0];

  const tagOrAll = !tegInPuth || tegInPuth === 'all' ? 'All' : tegInPuth;
  const title = tagOrAll === 'All' ? 'All notes | NoteHub' : `${tagOrAll} notes | NoteHub`;
  const description = tagOrAll === 'All' ? 'All categories by notes, find the one you need among them all'
      : `Sheet notes by category "${tagOrAll}".`;
  const url = `${SITE_URL}/notes/filter/${tagOrAll === 'All' ? 'all' : tagOrAll}`;

  return {
    title,
    description,

    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: tagOrAll === 'All' ? 'All notes' : `${tagOrAll} notes`,
        },
      ],
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}


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

