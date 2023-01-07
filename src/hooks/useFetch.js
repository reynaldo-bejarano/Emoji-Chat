import { useEffect, useState } from 'react'

const useFetch = () => {

    const [emojiList, setEmojiList] = useState([]);
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getEmojiList();
    }, [])

    const getEmojiList = async () => {
        try {
            setIsLoading(true)
            setError(false)
            const data = await fetch(import.meta.env.VITE_API_URL);
            const json = await data.json();
            setEmojiList(json);
        } catch (error) {
            setError(true)
        } finally {
            setIsLoading(false)
        }

    }


    return { emojiList, isLoading, error }
}

export default useFetch