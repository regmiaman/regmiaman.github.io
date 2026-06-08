import { useState, useEffect } from 'react';

const useTypingEffect = (
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  delayBetween = 1600
) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    let timer;
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      // Typing mode
      if (text !== currentWord) {
        timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        // Word completed, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetween);
      }
    } else {
      // Deleting mode
      if (text !== '') {
        timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        // Word deleted, move to the next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetween]);

  return text;
};

export default useTypingEffect;
