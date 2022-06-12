import React from 'react';
import BtnBasic from '@components/common/BtnBasic';

const StartBtn = ({ className }) => {
  const options = ['オーナー', '紹介', 'イベント', '来店', '他'];
  return (
    <div className={` ${className}`}>
      <h5 className='font-bold'>岡山トヨペットでご購入いただいたきっかけを教えてください。</h5>

      <div className='flex flex-wrap justify-center '>
        {options.map((option, index) => {
          return (
            <button key={index} className=' rounded-md w-20 m-2 p-2 bg-red-400 text-white'>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StartBtn;
