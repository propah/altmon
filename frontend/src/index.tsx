import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//Random middle background color
document.body.classList.add('bg-gradient-to-r','from-black','via-gray-900', 'to-black');
const colors = ["via-gray-900"]
  Array.from(document.body.classList.values()).forEach(type => {
  console.log(type)
      if (type.includes('via-')) {
          console.log(document.body.classList)
          document.body.classList.remove(type);
          type = colors[Math.floor(Math.random() * colors.length)]
          document.body.classList.add(type);
      }
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
