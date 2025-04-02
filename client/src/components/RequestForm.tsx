import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ENROLLMENT_REQUEST } from '../utils/mutations';

interface RequestFormProps {
  daycareId: string; // required to attach request to a daycare
}

interface FormData {
  childName: string;
  age: string; // string to match input field
  notes?: string;
}

const RequestForm: React.FC<RequestFormProps> = ({ daycareId }) => {
  const [formState, setFormState] = useState<FormData>({
    childName: '',
    age: '',
    notes: '',
  });

  const [createRequest, { error }] = useMutation(CREATE_ENROLLMENT_REQUEST);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createRequest({
        variables: {
          ...formState,
          age: parseInt(formState.age),
          daycareId,
        },
      });
      alert('Request submitted successfully!');
      setFormState({ childName: '', age: '', notes: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Request a Seat</h2>
      <input
        name="childName"
        value={formState.childName}
        placeholder="Child's Full Name"
        onChange={handleChange}
        required
      />
      <input
        name="age"
        value={formState.age}
        type="number"
        placeholder="Age"
        onChange={handleChange}
        required
      />
      <textarea
        name="notes"
        value={formState.notes}
        placeholder="Additional notes (optional)"
        onChange={handleChange}
        rows={4}
      />
      <button type="submit">Send Request</button>
      {error && <p style={{ color: 'red' }}>Something went wrong. Try again.</p>}
    </form>
  );
};

export default RequestForm;
