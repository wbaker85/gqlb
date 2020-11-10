import React, { useState } from 'react';
import fetch from 'isomorphic-fetch';

const SchemaPoster = ({ token }) => {
  const [text, setText] = useState('');
  const [err, setErr] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/schema`, {
      method: 'post',
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${token}`,
      },
      body: text,
    });

    if (res.status === 401) {
      setErr('Invalid credentials');
    } else {
      setErr('');
    }

    const data = await res.text();
    console.log(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Update schema</h3>
      <form onSubmit={handleSubmit}>
        <textarea onChange={handleInputChange} rows="40" cols="100"></textarea>
        <br></br>
        <input type="submit" value="Update"></input>
      </form>
      <p style={{ color: 'red' }}>{err}</p>
    </div>
  );
};

export default SchemaPoster;
