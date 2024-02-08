import React, { useState, useRef } from 'react';
import FormInput from './components/FormInput';
import TagSelector from './components/TagSelector';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    about: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
  const tagSelectorRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form submitting...");

    const selectedSkills = tagSelectorRef.current.getSelectedSkills();
    const dataToSubmit = {
      ...formData,
      selectedSkills
    }

  console.log("Submitting:", dataToSubmit); // Replace with API call logic
  console.log("Form Data to Submit:", JSON.stringify(dataToSubmit, null, 2));

    try {
      // Example API call
      const response = await fetch('http://localhost:8000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
    });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Process the response here
      setIsSubmitted(true);
      console.log("Data submitted successfully");
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };


  return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <FormInput
              type="text"
              name="name"
              label="Name and Surname"
              value={formData.name}
              handleChange={handleChange}
          />
          <FormInput
              type="text"
              name="profession"
              label="Your Profession/Occupation"
              value={formData.profession}
              handleChange={handleChange}
          />
          <FormInput
              type="textarea"
              name="about"
              label="About Yourself"
              value={formData.about}
              handleChange={handleChange}
          />
          <TagSelector ref={tagSelectorRef} />
          <button
              type="submit"
              style={{ backgroundColor: isSubmitted ? '#28a745' : '#007bff' }}
              disabled={isSubmitted}
          >
            {isSubmitted ? "Thank you! Your info was submitted" : "Submit"}
          </button>
        </form>
      </div>
  );
};
export default App;
