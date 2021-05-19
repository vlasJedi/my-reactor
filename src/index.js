import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const recursive = {
  key: 0,
  nodes: [{
    key: 1,
    nodes: [{
      key: 11,
      nodes: [{
        key: 111
      }]
    }]
  },
  {
    key: 2,
    nodes: [{
      key: 21,
      nodes: [{
        key: 211
      }]
    },
    {
      key: 22,
      nodes: [{
        key: 221
      }]
    }]
  }]
};
ReactDOM.render(
  // here is directly passing ref to factory object which produces react element template  
  <App data={recursive} nodesKey={"nodes"}/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
