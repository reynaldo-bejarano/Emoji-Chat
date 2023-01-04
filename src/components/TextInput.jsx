import { useContext } from 'react'
import { AppContext } from '../context/AppProvider'
import styles from "./TextInput.module.css"

const TextInput = () => {

    const {
        textInput,
        setTextInput,
        emojiBoxIsOpen,
        setEmojiBoxIsOpen,
        inputRef
    } = useContext(AppContext);

    return (
        <div>
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder='Ingresa el texto'
                    ref={inputRef}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className={styles.textInput}

                />
                <button
                    onClick={() => setEmojiBoxIsOpen(!emojiBoxIsOpen)}
                    className={styles.btn_emoji}
                >
                    😀
                </button>
            </div>
        </div>
    )
}

export default TextInput