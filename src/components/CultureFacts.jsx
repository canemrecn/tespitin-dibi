import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextFact } from '../features/culture/cultureSlice';

const CultureFacts = () => {
  const dispatch = useDispatch();
  const fact = useSelector((state) => state.culture.facts[state.culture.currentFactIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(nextFact());
    }, 10000); // 5 saniyede bir değiştir

    return () => clearInterval(interval); // Bileşen demonte olduğunda interval'i temizle
  }, [dispatch]);

  return (
    <div style={styles.container}>
      <h2>Genel Kültür Köşesi</h2>
      <p>{fact}</p>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    width: '170px', // Genişlik
    height: '220px', // Yükseklik
  }
};

export default CultureFacts;

