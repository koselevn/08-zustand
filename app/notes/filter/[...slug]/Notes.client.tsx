"use client"

import css from './Notes.module.css';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import Pagination from '../../../../components/Pagination/Pagination';
import NoteList from '../../../../components/NoteList/NoteList';
import Modal from '../../../../components/Modal/Modal';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import { fetchNotes } from '../../../../lib/api';
import SearchBox from '../../../../components/SearchBox/SearchBox';

interface NotesClientProps {
  initialPage: number,
  initialQuery: string,
  initialTag: string | undefined
}

export default function NotesClient({ initialPage = 1, initialQuery = '', initialTag = undefined }: NotesClientProps) {
  const [page, setPage] = useState(initialPage);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [tag] = useState<string | undefined>(initialTag)

  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const handleSearchChange = (query: string) => {
    setPage(1);
    setSearchQuery(query);
  };


  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', page, debouncedQuery, tag],
    queryFn: () => fetchNotes(debouncedQuery, page, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          setSearchQuery={(query) => handleSearchChange(query)} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button onClick={() => setIsOpenModal(true)} className={css.button}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error!</p>}
      {isSuccess && <NoteList notes={data.notes} />}

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <NoteForm onClose={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}
