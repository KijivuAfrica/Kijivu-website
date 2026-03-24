import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function FreeWaitingRoom() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await supabase.from('leads').insert({ email, source: 'free_waiting_room' });
      setSubmitted(true);
    } catch (err) {
      console.error('Lead insert error', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] text-[#2C3539] p-6">
      <div className="max-w-3xl bg-white p-10 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-black mb-4">Free 3-Day Preview — The Waiting Room</h1>
        <p className="mb-6 text-lg">A short 3-day preview from "The Waiting Room" — a 30-day journal for seasons of transition. Download the PDF below and try the first three days.</p>

        {!submitted ? (
          <>
            <div className="flex gap-4 items-center">
              <a href="/3-day-waiting-room.pdf" download className="bg-[#2C3539] text-white px-6 py-3 rounded-xl font-bold">Download the 3-Day PDF</a>
              <a href="https://www.tiktok.com/@Luke418free" target="_blank" rel="noopener noreferrer" className="text-[#87A96B] font-bold">Visit our TikTok @Luke418free for daily verses →</a>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 flex gap-3 items-center">
              <input type="email" placeholder="Your email to receive the full 30-day release" value={email} onChange={e => setEmail(e.target.value)} className="border p-3 rounded-md flex-1" required />
              <button type="submit" className="bg-[#87A96B] text-white px-5 py-3 rounded-md font-bold">Send</button>
            </form>
          </>
        ) : (
          <div className="mt-6 text-center">
            <p className="font-bold">Thanks — you're on the list. We'll be in touch.</p>
            <a href="/3-day-waiting-room.pdf" download className="mt-3 inline-block text-sm text-[#87A96B]">Download the PDF again</a>
          </div>
        )}

        <p className="mt-6 text-sm text-[#2C3539]/70">Using this link in ads? Use the path <strong>/free-waiting-room</strong> as the landing URL for Meta/TikTok campaigns.</p>
      </div>
    </div>
  );
}
