import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api";
import { Note } from "../../types/note";
import css from "./NoteList.module.css";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  function handleDelete(id: string) {
    mutation.mutate(id);
  }

  // Додатковий захист, щоб не падало на map
  if (!notes || notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((el) => (
        <li key={el.id} className={css.listItem}>
          <h2 className={css.title}>{el.title}</h2>
          <p className={css.content}>{el.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{el.tag}</span>
            <Link href={`/notes/${el.id}`}>View details</Link>
            <button onClick={() => handleDelete(el.id)} className={css.button}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}