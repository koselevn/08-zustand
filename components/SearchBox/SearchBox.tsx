import css from "./SearchBox.module.css"

interface SearchBoxProps {
    setSearchQuery: (item: string) => void
}

export default function SearchBox({setSearchQuery}: SearchBoxProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    return (
        <input onChange={handleChange} className={css.input} type="text" placeholder="Search notes" />
    )
}