import React, { useState } from 'react';
import DataFetcher from '../DataFetcher/DataFetcher';



const DataFetcherContainer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [userId, setUserId] = useState(1);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Жизненный цикл компонента и useEffect</h2>

      <button onClick={() => setIsVisible((prev) => !prev)}>
        {isVisible ? 'Скрыть компонент' : 'Показать компонент'}
      </button>

      <div style={{ marginTop: '10px' }}>
        <label htmlFor="user-select">Выберите ID пользователя: </label>
        <select
          id="user-select"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      {isVisible && <DataFetcher userId={userId} />}
    </div>
  );
};

export default DataFetcherContainer;