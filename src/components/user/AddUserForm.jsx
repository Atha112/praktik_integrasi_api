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
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Tambahkan User
        </h1>

        <p style={styles.subtitle}>
          Integrasi POST API dengan React +
          Axios
        </p>

        {message && (
          <div
            style={
              message.type === 'success'
                ? styles.success
                : styles.error
            }
          >
            {message.text}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <input
            type="text"
            name="name"
            placeholder="Nama lengkap"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Alamat email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Nomor telepon"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            style={
              isSubmitting
                ? styles.buttonDisabled
                : styles.button
            }
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

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'linear-gradient(135deg,  #9faef1, #aea2b9)',

    padding: '20px',
  },

  card: {
    width: '100%',
    maxWidth: '450px',

    background: 'white',

    borderRadius: '20px',

    padding: '35px',

    boxShadow:
      '0 10px 30px rgba(0,0,0,0.2)',
  },

  title: {
    marginBottom: '10px',
    color: '#322a2a',
    fontSize: '32px',
    fontWeight: '700',
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: '30px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },

  input: {
    padding: '14px 16px',

    borderRadius: '12px',

    border: '1px solid #ddd',

    fontSize: '15px',

    outline: 'none',

    transition: '0.3s',
  },

  button: {
    padding: '14px',

    border: 'none',

    borderRadius: '12px',

    background:
      'linear-gradient(135deg, #69b5d5, #b19ec3)',

    color: 'white',

    fontWeight: '600',

    fontSize: '16px',

    cursor: 'pointer',

    transition: '0.3s',
  },

  buttonDisabled: {
    padding: '14px',

    border: 'none',

    borderRadius: '12px',

    background: '#999',

    color: 'white',

    fontWeight: '600',

    fontSize: '16px',

    cursor: 'not-allowed',
  },

  success: {
    background: '#d1fae5',

    color: '#065f46',

    padding: '12px',

    borderRadius: '10px',

    marginBottom: '20px',

    textAlign: 'center',
  },

  error: {
    background: '#fee2e2',

    color: '#991b1b',

    padding: '12px',

    borderRadius: '10px',

    marginBottom: '20px',

    textAlign: 'center',
  },
};