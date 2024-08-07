import React from 'react';

function Loading() {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'white'
    }}>
      <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid rgba(117, 58, 136, 0.3)',
          borderTop: '6px solid #753a88',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
      }}></div>
      <style>{`
          @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
          }
      `}</style>
    </div>
  );
}

export default Loading;
