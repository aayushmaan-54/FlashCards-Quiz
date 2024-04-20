import React, { useEffect, useState, useRef } from 'react';
import FlashCardList from './components/FlashCardList';
import Loader from './components/Loader';

const API_URL = `https://opentdb.com/api.php`;
const API_CATEGORY = `https://opentdb.com/api_category.php`;

function App() {

  const [ flashcards, setFlashcards ] = useState([]);
  const [ categories, setCategories ] = useState();
  const [ isLoading, setIsLoading ] = useState(true);

  const questionNoRef = useRef();
  const categoryEl = useRef(null);


  function decodeHtmlEntities(str) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  }


  useEffect(() => {
    setIsLoading(true);
    fetch(API_CATEGORY)
      .then(res => res.json())
      .then(res => {
        setCategories(res.trivia_categories);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}?amount=${questionNoRef.current.value}&category=${categoryEl.current.value}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Click on Generate Again or Reload page`);
      }
      return res.json();
    })
      .then(res => {
        if (res.response_code !== 0) {
          throw new Error(`Click on Generate Again or Reload page`);
        }
        setFlashcards(
          res.results.map((ele, index) => {
            const answer = decodeHtmlEntities(ele.correct_answer);
            const options = [
              ...ele.incorrect_answers.map(option => decodeHtmlEntities(option)),
              answer
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeHtmlEntities(ele.question),
              answer,
              options: options.sort(() => Math.random() - 0.5)
            };
          })
        );
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error:', err);
        setIsLoading(false);
        
      });
  }, [])


  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(`${API_URL}?amount=${questionNoRef.current.value}&category=${categoryEl.current.value}`)
      .then(res => res.json())
      .then(res => {
        setFlashcards(
          res.results.map((ele, index) => {
            const answer = decodeHtmlEntities(ele.correct_answer);
            const options = [
              ...ele.incorrect_answers.map(option => decodeHtmlEntities(option)),
              answer
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeHtmlEntities(ele.question),
              answer,
              options: options.sort(() => Math.random() - 0.5)
            };
          })
        );
        setIsLoading(false)
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='text-black bg-slate-400 shadow-xl flex flex-wrap items-center justify-center'>
        <div className='custom-scroll-bar mt-5 ml-4'>
          <label htmlFor="category">Category:{" "}</label>
          <select id="category" ref={categoryEl} className='outline-none py-1 bg-[#020014] text-white  custom-scroll-bar'>
          {categories && categories.map((ele, index) => (
            <option value={ele.id} key={index}>{ele.name}</option>
          ))}
          </select>
        </div>
        <div className='ml-10 mt-5'>
          <label htmlFor="question">No. of Questions:{" "}</label>
          <input type="number" id='question' min={1} step={1} defaultValue={10} ref={questionNoRef} className='outline-none py-1 px-1 bg-[#020014] text-white' />
          <div className="group relative inline-flex mx-20 my-4">
              <div className="transitiona-all animate-tilt absolute -inset-px rounded-xl bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-70 blur-lg duration-1000 group-hover:-inset-1 group-hover:opacity-100 group-hover:duration-200"></div>
              <button type="submit" className="relative inline-flex items-center justify-center rounded-md bg-gray-900 text-lg font-bold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 px-3 py-2" role="button">Generate</button>
            </div>
        </div>
      </form>
      {
        isLoading ? 
          <Loader /> :
        <div className=' max--w-[900px] my-4 mx-8'>
          <FlashCardList flashcards={flashcards} />
        </div>
      }
      
    </>
  )
}

export default App