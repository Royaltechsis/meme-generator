
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
      <form className='meme-form' onSubmit={handleSubmit}>
        <input
          placeholder='Enter Top Text'
          type='text'
          value={topText}
          name='topText'
          onChange={handleChange}
        />
        <input
          placeholder='Enter Bottom Text'
          type='text'
          value={bottomText}
          name='bottomText'
          onChange={handleChange}
        />
        <button>Generate</button>
      </form>
      <br />
      {randomImg && (
        <div className='meme'>
          <img src={randomImg} alt='meme' />
          <h2 className='top'>{topText}</h2>
          <h2 className='bottom'>{bottomText}</h2>
        </div>
      )}
    </>
  );
}

export default Form;
