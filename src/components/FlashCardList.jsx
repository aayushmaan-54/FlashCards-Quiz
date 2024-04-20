const COLORS = ['#d43333', '#d47933', '#d4c433', '#bfd433', '#f0d41d', '#a6d930', '#76d930', '#35d930', '#30d962', '#30d98f', '#30d9c8', '#30b1d9', '#307cd9', '#3035d9', '#6230d9', '#9b30d9', '#d030d9', '#d9309e', '#d93073']


function randomNumber (start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

import React from 'react';
import FlashCard from './FlashCard';

const FlashCardList = ({ flashcards }) => {
  return (
    <>
      <div className='grids cursor-pointer'>
        {
          flashcards.map(flashcard => {
            return (<FlashCard
            flashcard={flashcard}
            key={flashcard.id}
            color={COLORS[randomNumber(0, COLORS.length - 1)]}
          />)
          })
        }
      </div>
    </>
  )
}

export default FlashCardList