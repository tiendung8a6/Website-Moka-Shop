import "./form.css"
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
// import './avartar.png'
import avartar from "./avartar.png";
import FormRight from "./formAvartarRight.png";



// const Form = () => {
//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs.sendForm('service_xb8el9s', 'template_wpll1wl', form.current, 'W0NGy815UrjjUenUB')
//       .then((result) => {
//         console.log(result.text);
//       }, (error) => {
//         console.log(error.text);
//       });
//   };
//   return (
//     //   <form ref={form} onSubmit={sendEmail}>
//     //       <label>Name</label>
//     //       <input type="text" name="user_name" />
//     //       <label>Email</label>
//     //       <input type="email" name="user_email" />
//     //       <label>Message</label>
//     //       <textarea name="message" />
//     //       <input type="submit" value="Send" />
//     // </form>

//     <div class="container">
//       <form class="form-container">
//         <div class="headline"><span>Contact me</span></div>
//         <div class="form-line success">
//           <input type="text" name="user_name" class="form-input"  />
//           <label class="top">Name</label>
//           <div class="check-label"></div>
//         </div>
//         <div class="form-line">
//           <input type="text" class="form-input" required name="user_email" />
//           <label>Your email *</label>
//           <div class="error-label"> Field is required!</div>
//           <div class="check-label"></div>
//         </div>
//         {/* <div class="form-line">
//           <input type="text" class="form-input" />
//           <label>Subject</label>
//           <div class="check-label"></div>
//         </div> */}
//         <div class="form-line">
//           <textarea class="form-input" required name="message"></textarea>
//           <label>Message</label>
//           <div class="check-label"></div>
//           <div class="error-label">Field is required!</div>
//         </div>

//         <input type="button" class="form-button" value="Submit" />
//       </form>
//     </div>

//   );
// }
const Form = () => {
  const form = useRef();

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

    emailjs
      .sendForm('service_xb8el9s', 'template_wpll1wl', form.current, 'W0NGy815UrjjUenUB')
      .then((result) => {
        console.log(result.text);
      })
      .catch((error) => {
        console.log(error.text);
      });
  };

  return (
    <div className="form-emailjs-container">
      <form className="form-container" ref={form}>
        <img src={avartar} alt="" className="img-form-contact" />
        <div className="headline mt-5">
          <span>Contact me</span>
        </div>
        <div className="form-line ">
          <input type="text" name="user_name" className="form-input" onKeyUp={handleInputChange} />
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
        {/* <div className="form-line">
          <input type="text" className="form-input" />
          <label>Subject</label>
          <div className="check-label"></div>
        </div> */}
        <div className="form-line">
          <textarea className="form-input" required name="message" onKeyUp={handleInputChange}></textarea>
          <label>Message</label>
          <div className="check-label"></div>
          <div className="error-label">Pls Enter</div>
        </div>

        <input type="submit" className="form-button" value="Submit" onClick={sendEmail} />
      </form>

      <img src={FormRight} alt="" className="img-right_form"/>
    </div>
  );
};



export default Form;