import axios from "axios";
import { FormValues, Note } from "../types/note";

interface NoteResponse {
  notes: Note[]
  totalPages: number
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

export async function fetchNotes(search: string, page: number, tag?: string): Promise<NoteResponse> {
    const url = 'https://notehub-public.goit.study/api/notes'
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`
      },
      params: {
          search: search,
          page: page,
          perPage: 12,
          tag: tag
      }
    }

  const response = await axios.get<NoteResponse>(url, options)

  return response.data
}

export async function createNote(objet: FormValues): Promise<Note> {
  const url = 'https://notehub-public.goit.study/api/notes'
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`
    },
  }

  const response = await axios.post<Note>(url, objet, options)

  return response.data
}

export async function deleteNote(id: string): Promise<Note> {
  const url = `https://notehub-public.goit.study/api/notes/${id}`
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`
    },
  }

  const response = await axios.delete<Note>(url, options)

  return response.data
}

export async function fetchNoteById(id: string): Promise<Note> {
  const url = `https://notehub-public.goit.study/api/notes/${id}`
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`
    },
  }

  const response = await axios.get<Note>(url, options)

  return response.data
}