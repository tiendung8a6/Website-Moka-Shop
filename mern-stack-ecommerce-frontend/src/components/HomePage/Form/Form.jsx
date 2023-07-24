import "./form.css"
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
// import './avartar.png'
import avartar from "./avartar.png";
import FormRight from "./formAvartarRight.png";
import Bgnice from "./bg-nice1.jpg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
const Form = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleInputChange = (event) => {
    const input = event.target;
    const parent = input.closest('.form-line');
    const inputValue = input.value.trim();
    const required = input.required;

    if (inputValue.length > 0) {
      parent.querySelector('label').classList.add('top');
      parent.classList.remove('error');
      parent.classList.add('success');
    } else {
      parent.querySelector('label').classList.remove('top');
      parent.classList.remove('success');

      if (required) {
        parent.classList.add('error');
      }
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(false);
    emailjs
      .sendForm('service_xb8el9s', 'template_wpll1wl', form.current, 'W0NGy815UrjjUenUB')
      .then((result) => {
        console.log(result.text);
        setSuccessMessage('Send Successfully');
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error.text);
        setErrorMessage('Send fail. Please send again.');
        setLoading(false);
      });
  };

  return (
    <div className="form-emailjs-container">
      {loading && <LoadingComponent />}
      {errorMessage && <ErrorMsg message={errorMessage} />}
      {successMessage && <SuccessMsg message={successMessage} />}
      <form className="form-container bg-cyan-500 shadow-xl shadow-black" ref={form}>
        <img src={avartar} alt="" className="img-form-contact" />
        <div className="headline mt-5">
          <span>Contact me</span>
        </div>
        <div className="form-line ">
          <input type="text" name="user_name" className="form-input" required onKeyUp={handleInputChange} />
          <label className="top">Name</label>
          <div className="check-label"></div>
        </div>
        <div className="form-line">
          <input
            type="text"
            className="form-input"
            required
            name="user_email"
            onKeyUp={handleInputChange}
          />
          <label>Your email *</label>
          <div className="error-label">Pls Enter</div>
          <div className="check-label"></div>
        </div>
        
        <div className="form-line">
          <textarea className="form-input" required name="message" onKeyUp={handleInputChange}></textarea>
          <label>Message</label>
          <div className="check-label"></div>
          <div className="error-label">Pls Enter</div>
        </div>

        <input type="submit" className="form-button" value="Submit" onClick={sendEmail} />
      </form>

      {/* <img src={FormRight} alt="" className="img-right_form"/> */}
    </div>
  );
};



export default Form;