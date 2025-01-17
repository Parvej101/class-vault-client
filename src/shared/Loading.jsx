import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
      <progress className="progress w-52 h-6"></progress>   
    </div>
    );
};

export default Loading;