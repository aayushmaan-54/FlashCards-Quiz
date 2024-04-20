import React, { useState, useRef, useEffect } from 'react'

const FlashCard = ({ flashcard, color }) => {

  const [ flip, setFlip ] = useState(false);
  const [ height, setHeight ] = useState("initial");

  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options]);
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return() =>  window.removeEventListener('resize', setMaxHeight)
  }, [])

  return (
    <div
      className={`card ${flip ? 'flipped' : ''}`}
      style={{ backgroundColor: color, height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className='front font-black' ref={frontEl}>
        {flashcard.question}
        <div>
          {flashcard.options.map((option, index) => (
            <div key={index} className='font-black text-xs pb-1 first:pt-3 text-black'>
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="back" ref={backEl}>{flashcard.answer}</div>
    </div>
  )
}

export default FlashCard