import { useState } from 'react';
import axios from 'axios';

export default function AddUserForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [message, setMessage] =
    useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',

        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }
      );

      console.log(response.data);

      setMessage({
        type: 'success',
        text: 'Data berhasil dikirim 🚀',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
      });

      // Panggil callback untuk refresh data di parent
      if (onSuccess) onSuccess();
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Gagal mengirim data 😭',
      });

      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#9faef1] to-[#aea2b9] p-5">
      <div className="w-full max-w-[450px] bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
        <h1 className="mb-2.5 text-[#322a2a] text-3xl font-bold text-center">
          Tambahkan User
        </h1>

        <p className="text-center text-black mb-7">
          Integrasi POST API dengan React +
          Axios
        </p>

        {message && (
          <div
            className={`p-3 rounded-[10px] mb-5 text-center ${
              message.type === 'success'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Nama lengkap"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-3.5 rounded-xl border border-gray-300 text-[15px] text-gray-900 placeholder-gray-500 outline-none transition-all duration-300 focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Alamat email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3.5 rounded-xl border border-gray-300 text-[15px] text-gray-900 placeholder-gray-500 outline-none transition-all duration-300 focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Nomor telepon"
            value={formData.phone}
            onChange={handleChange}
            className="px-4 py-3.5 rounded-xl border border-gray-300 text-[15px] text-gray-900 placeholder-gray-500 outline-none transition-all duration-300 focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`py-3.5 border-none rounded-xl text-white font-semibold text-base transition-all duration-300 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-[#69b5d5] to-[#b19ec3] cursor-pointer hover:opacity-90 hover:shadow-lg'
            }`}
          >
            {isSubmitting
              ? 'Mengirim...'
              : 'Simpan Data'}
          </button>
        </form>
      </div>
    </div>
  );
}