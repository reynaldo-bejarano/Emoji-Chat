import { useContext, useState } from 'react'
import { AppContext } from '../context/AppProvider.jsx'
import useFetch from '../hooks/useFetch.js';
import styles from "./EmojiBox.module.css"


const EmojiBox = () => {
  const { emojiBoxIsOpen, inputRef, setTextInput } = useContext(AppContext);
  const { emojiList, isLoading, error } = useFetch();
  const [emojiListFilter, setEmojiListFilter] = useState(null);


  const handleClickEmoji = (emoji) => {
    const cursorPos = inputRef.current.selectionStart;
    const text = inputRef.current.value;
    const prev = text.slice(0, cursorPos);
    const next = text.slice(cursorPos);
    setTextInput(prev + emoji + next);
    inputRef.current.value = prev + emoji + next;
    inputRef.current.selectionStart = cursorPos + emoji.length;
    inputRef.current.selectionEnd = cursorPos + emoji.length;
    inputRef.current.focus();
  }

  const handleChange = (e) => {
    const text = e.target.value.toLowerCase();
    if (!!text) {
      const data = emojiList.filter(item => item.slug.includes(text) || item.slug.includes(text));
      return setEmojiListFilter(data)
    }
    return setEmojiListFilter(null)
  }

  if (isLoading) return <div className={styles.loading}>Cargando...</div>


  if (error) return <div className={styles.loading}>Error de carga</div>


  return (
    <>
      {emojiBoxIsOpen &&
        <div className={styles.container}>
          <div className={styles.containerEmoji}>
            <input
              type="text"
              className={styles.textInput}
              onChange={handleChange}
            />
            <div className={styles.containerBtnEmojis}>
              {
                emojiListFilter ?
                  emojiListFilter.map(item =>
                    <button
                      onClick={() => handleClickEmoji(item.character)}
                      className={styles.btnEmojis}
                      key={item.slug}
                    >
                      {item.character}
                    </button>
                  )
                  : emojiList.map(item =>
                    <button
                      onClick={() => handleClickEmoji(item.character)}
                      className={styles.btnEmojis}
                      key={item.slug}
                    >
                      {item.character}
                    </button>
                  )
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default EmojiBox