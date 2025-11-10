import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css"
import { Metadata } from "next";
import { SITE_URL } from "@/lib/host";

export const metadata: Metadata = {
    title: "NoteHub —  Create new note",
    description: "Create notes easily and simply with NoteHub",
    openGraph: {
        title: 'NoteHub —  Create new note',
        description: 'Create notes easily and simply with NoteHub',
        url: `${SITE_URL}/notes/action/create`,
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub',
            }
    ]
  }
}

export default function CreateNote() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </main>
    )
}