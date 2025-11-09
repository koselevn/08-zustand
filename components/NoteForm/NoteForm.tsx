"use client"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { FormValues } from "../../types/note";
import { createNote } from "../../lib/api";
import { useRouter } from 'next/navigation'
import { useDraft } from "@/lib/store/noteStore";

// const Schema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Name must be at least 3 characters")
//     .max(50, "Title is too long. Max 50")
//     .required("This required input"),
//   content: Yup.string().max(500, "Content is too long. Max 500"),
//   tag: Yup.string()
//     .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Select a valid tag")
//     .required("Tag is required"),
// });

export default function NoteForm() {
  const router = useRouter()
  // const [formData, setFormData] = useState<FormValues>({ title: "", content: "", tag: "Todo" })
  const queryClient = useQueryClient();

  const {draft, setDraft, clearDraft} = useDraft()

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft()
      router.push('/notes/filter/all')
    },
  });


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate(draft);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDraft({ ...draft, [event.target.name]: event.target.value,})
  }

  return (
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" name="title" defaultValue={draft?.title} onChange={handleChange} className={css.input}
            required minLength={3} maxLength={50} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={8} defaultValue={draft?.content} onChange={handleChange} className={css.textarea}
            maxLength={500} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" defaultValue={draft?.tag} onChange={handleChange} className={css.select} required >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        </div>

        <div className={css.actions}>
          <button
            type="button"
          className={css.cancelButton}
          onClick={() => router.push('/notes/filter/all')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create note"}
          </button>
        </div>
      </form>
  );
}