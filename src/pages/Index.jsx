import React, { useContext } from 'react'
import EmojiBox from '../components/EmojiBox'
import TextInput from '../components/TextInput'
import { AppContext } from '../context/AppProvider'

const Index = () => {
    const { } = useContext(AppContext);
    return (
        <>
            <TextInput />
            <EmojiBox />
        </>

    )
}

export default Index