import React, { useState } from 'react'
import api from "../../utils/axios";

const Help = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/help/send", {
        subject,
        message
      });

      alert(res.data.message);

      setSubject("");
      setMessage("");

    } catch (error) {
      console.log(error);
      alert("Failed to send message");
    }
  };


  return (
    <div className='text-3xl font-bold p-4 flex flex-col gap-8'>
      <div className='ml-5'>Help & Support</div>
      <form onSubmit={handleSubmit} className='flex flex-col text-xl items-center'>

        <div className='flex flex-col gap-2 text-xl w-[95%]'>
          <label className=''>Subject:</label>
          <input
            className='border rounded-xl h-10 p-3 font-light mb-8'
            name='subject'
            type='text'
            value={subject}
            placeholder='Subject'
            onChange={e => setSubject(e.target.value)}
            required
          />
        </div>

        <div className='flex flex-col gap-2 text-xl my-auto w-[95%]'>
          <label className=''>
            Message:</label>
          <textarea
            className='border rounded-xl min-h-50 p-3 font-light'
            name='message'
            type='text'
            value={message}
            placeholder='Message'
            onChange={e => setMessage(e.target.value)}
            required />
        </div>

        <button className='bg-primary rounded-xl h-10 w-[95%] mt-10 text-primary-content '>
          Submit
        </button>

      </form>
    </div>
  )
}

export default Help
