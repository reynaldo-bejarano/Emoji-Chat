import { createContext, useRef, useState } from "react"


export const AppContext = createContext();

const AppProvider = ({ children }) => {

    const [textInput, setTextInput] = useState("");
    const [emojiBoxIsOpen, setEmojiBoxIsOpen] = useState(false);
    const inputRef = useRef(null);

    return (
        <AppContext.Provider value={{ textInput, setTextInput, emojiBoxIsOpen, setEmojiBoxIsOpen, inputRef }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider