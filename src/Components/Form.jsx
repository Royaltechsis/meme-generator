import React, { useState, useEffect } from 'react';

function Form() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [allMemeImgs, setAllMemeImgs] = useState([]);
  const [randomImg, setRandomImg] = useState('');

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(content => setAllMemeImgs(content.data.memes))
      .catch(error => console.error('Error fetching memes:', error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'topText') setTopText(value);
    if (name === 'bottomText') setBottomText(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const rand = allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)].url;
    setRandomImg(rand);
  };

  return (
    <>
      <div className='flex flex-col h-screen justify-center items-center w-full bg-gray-100'>
        <div className="inner-container flex flex-col bg-white rounded-lg shadow-md p-5 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-4">Meme Generator</h1>
          <form className='meme-form flex flex-col' onSubmit={handleSubmit}>
            <input
              placeholder='Enter Top Text'
              type='text'
              value={topText}
              name='topText'
              onChange={handleChange}
              className='border border-gray-300 p-2 mb-2 rounded focus:outline-none focus:ring focus:ring-blue-400'
            />
            <input
              placeholder='Enter Bottom Text'
              type='text'
              value={bottomText}
              name='bottomText'
              onChange={handleChange}
              className='border border-gray-300 p-2 mb-4 rounded focus:outline-none focus:ring focus:ring-blue-400'
            />
            <button 
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
              Generate
            </button>
          </form>
          <br />
          {randomImg && (
            <div className='meme relative mt-4'>
              <img src={randomImg} alt='meme' className='rounded-lg w-full h-auto' />
              <h2 className='absolute top-0 left-0 w-full text-center text-xl font-bold text-white bg-black bg-opacity-50 p-2'>{topText}</h2>
              <h2 className='absolute bottom-0 left-0 w-full text-center text-xl font-bold text-white bg-black bg-opacity-50 p-2'>{bottomText}</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Form;
