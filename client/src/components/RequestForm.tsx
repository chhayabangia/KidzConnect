import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Props {
  daycareId: string;
}

const RequestForm: React.FC<Props> = ({ daycareId }) => {
  const [form, setForm] = useState({ childName: '', age: '', notes: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/api/daycares/${daycareId}/requests`, {
        childName: form.childName,
        age: parseInt(form.age),
        notes: form.notes,
      });
      alert('Request sent!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="childName" onChange={handleChange} />
      <input name="age" onChange={handleChange} />
      <textarea name="notes" onChange={handleChange} />
      <button type="submit">Request Seat</button>
    </form>
  );
};