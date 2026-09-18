import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

function ResizableBox() {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [useLayout, setUseLayout] = useState(false);

  const updateSize = () => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setSize({ width: Math.round(rect.width), height: Math.round(rect.height) });
    }
  };

  useEffect(() => {
    if (useLayout) return;
    console.log('useEffect: подписка на resize');
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => {
      console.log('useEffect: отписка от resize');
      window.removeEventListener('resize', updateSize);
    };
  }, [useLayout]);

  useLayoutEffect(() => {
    if (!useLayout) return;
    console.log('useLayoutEffect: подписка на resize');
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => {
      console.log('useLayoutEffect: отписка от resize');
      window.removeEventListener('resize', updateSize);
    };
  }, [useLayout]);

  return (
    <div>
      <button onClick={() => setUseLayout((v) => !v)}>
        Сейчас: {useLayout ? 'useLayoutEffect' : 'useEffect'} — переключить
      </button>
      <div
        ref={boxRef}
        style={{
          width: '100%',
          height: '200px',
          backgroundColor: '#add8e6',
          border: '1px solid #333',
          boxSizing: 'border-box',
          marginTop: '10px',
        }}
      />
      <p>Ширина: {size.width}px, Высота: {size.height}px</p>
    </div>
  );
}

export default ResizableBox;