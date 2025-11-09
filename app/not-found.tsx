import { Metadata } from 'next';
import css from './not-found.module.css';
import { SITE_URL } from '@/lib/host';

export const metadata: Metadata = {
    title: 'Page not found :(',
    description: "We can't found this page, ",
    openGraph: {
        title: 'NoteHub - Page not found :(',
        description: "Make, look up, and handle private memos with labels, screens, and glimpses.",
        url: SITE_URL,
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

export default function NotFound() {
    return (
        <div className={css.container}>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </div>
    )
}