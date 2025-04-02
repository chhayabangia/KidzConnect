import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_DAYCARE } from '../utils/mutations';

interface DaycareFormData {
  name: string;
  address: string;
  city: string;
  zip: string;
  totalSeats: string; // kept as string for input field
  services: string;   // comma-separated string from input
}

const DaycareForm: React.FC = () => {
  const [formState, setFormState] = useState<DaycareFormData>({
    name: '',
    address: '',
    city: '',
    zip: '',
    totalSeats: '',
    services: '',
  });

  const [createDaycare, { error }] = useMutation(CREATE_DAYCARE);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createDaycare({
        variables: {
          ...formState,
          totalSeats: parseInt(formState.totalSeats),
          services: formState.services.split(',').map(s => s.trim()),
        },
      });
      alert('Daycare created successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Daycare Listing</h2>
      <input name="name" placeholder="Daycare Name" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="city" placeholder="City" onChange={handleChange} required />
      <input name="zip" placeholder="ZIP Code" onChange={handleChange} required />
      <input name="totalSeats" placeholder="Total Seats" type="number" onChange={handleChange} required />
      <input name="services" placeholder="Services (comma-separated)" onChange={handleChange} />
      <button type="submit">Create</button>
      {error && <p style={{ color: 'red' }}>Error creating daycare</p>}
    </form>
  );
};

export default DaycareForm;
