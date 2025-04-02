import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  name: string;
  address: string;
  city: string;
  zip: string;
  totalSeats: string;
  services: string;
}

const DaycareForm: React.FC = () => {
  const [formState, setFormState] = useState<FormData>({
    name: '',
    address: '',
    city: '',
    zip: '',
    totalSeats: '',
    services: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/daycares', {
        ...formState,
        totalSeats: parseInt(formState.totalSeats),
        services: formState.services.split(',').map((s) => s.trim()),
      });
      alert('Daycare listing created!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} required />
      {/* Add other inputs... */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DaycareForm;