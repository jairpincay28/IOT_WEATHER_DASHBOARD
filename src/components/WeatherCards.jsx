import React from 'react';

const WeatherCards = ({ data }) => {
  if (!data) return <p>Cargando sensores...</p>;

  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h3>Temperatura</h3>
        <p style={{ fontSize: '24px', color: '#0056b3' }}>{data.temp} °C</p>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h3>Presión</h3>
        <p style={{ fontSize: '24px', color: '#0056b3' }}>{data.presion} hPa</p>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h3>Humedad</h3>
        <p style={{ fontSize: '24px', color: '#0056b3' }}>{data.humedad} %</p>
      </div>
    </div>
  );
};

export default WeatherCards;
