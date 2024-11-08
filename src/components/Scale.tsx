import React from 'react';

const Scale = ({ value, totalCount }: any) => {
  // Calculate marker position as a percentage of totalCount
  const markerPosition = (value / totalCount) * 100;
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px 0'
      }}
    >
      <div
        style={{
          width: '100%',
          height: '20px',
          background: 'linear-gradient(to right, red, yellow, green)',
          position: 'relative',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
      >
        {/* Marker */}
        <div
          style={{
            position: 'absolute',
            top: '-15px', // Adjust to make it extend above the scale bar
            left: `${markerPosition}%`,
            width: '10px',
            height: '50px', // Taller height to extend above and below the bar
            backgroundColor: 'black',
            borderRadius: '5px',
            transform: 'translateX(-50%)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Scale;
