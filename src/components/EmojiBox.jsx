import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppProvider.jsx'
import styles from "./EmojiBox.module.css"

const EmojiBox = () => {
  const { emojiBoxIsOpen, setTextInput, inputRef } = useContext(AppContext);
  const [emojiList, setEmojiList] = useState([]);
  const [emojiListAll, setEmojiListAll] = useState([]);

  useEffect(() => {
    getEmojiList();
  }, [])


  const getEmojiList = async () => {
    const data = await fetch(import.meta.env.VITE_API_URL);
    const json = await data.json();
    setEmojiList(json);
    setEmojiListAll(json);
  }

  const handleChange = (e) => {
    const text = e.target.value.toLowerCase();
    if (!!text) {
      const data = emojiList.filter(item => item.slug.includes(text) || item.slug.includes(text))
      return setEmojiList(data)
    }
    return setEmojiList(emojiListAll);
  }

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
              {emojiList.map(item =>
                <button
                  onClick={() => handleClickEmoji(item.character)}
                  className={styles.btnEmojis}
                  key={item.slug}
                >
                  {item.character}
                </button>
              )}
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default EmojiBox