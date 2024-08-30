import React, { useState, useEffect } from 'react';

const Typewriter = () => {
  const word = "urchase Management System!";
  const [currentText, setCurrentText] = useState('P');
  const [currentIndex, setCurrentIndex] = useState(0);
  const typingSpeed = 100; // Milliseconds per character

  useEffect(() => {
    // Effect only runs when currentIndex changes (meaning a new character is added)
    if (currentIndex < word.length) {
      const timeoutId = setTimeout(() => {
        setCurrentText(prevText => prevText + word[currentIndex]);
        setCurrentIndex(prevIndex => (prevIndex + 1));
      }, typingSpeed);

      return () => clearTimeout(timeoutId);
    } else {
      setCurrentText('P');
      setCurrentIndex(0);
    }
  }, [currentIndex]); // Dependency array includes only currentIndex

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 id="typewriter" className="text-4xl font-bold">{currentText}</h1>
    </div>
  );
}

export default Typewriter;
