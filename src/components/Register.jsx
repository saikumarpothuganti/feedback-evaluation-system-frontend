// filepath: d:\\Frontend Development and Frameworks\\Project Files\\src\\components\\Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  // Captcha state
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, answer: '' });
  const [captchaError, setCaptchaError] = useState('');

  // Generate new captcha
  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ a, b, answer: '' });
    setCaptchaError('');
  };
  React.useEffect(() => { generateCaptcha(); }, []);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.username.trim()) e.username = 'Username is required';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Use at least 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!['student','faculty','admin'].includes(form.role)) e.role = 'Select a valid role';
    // Captcha validation
    if (parseInt(captcha.answer) !== captcha.a + captcha.b) {
      setCaptchaError('Captcha answer is incorrect.');
      e.captcha = 'Captcha answer is incorrect.';
    } else {
      setCaptchaError('');
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCaptchaChange = (e) => {
    setCaptcha(prev => ({ ...prev, answer: e.target.value }));
    setCaptchaError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim().toLowerCase(),
          username: form.username.trim(),
          password: form.password,
          role: form.role,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.message || 'Unable to register user');
      }

      // Auto-login and go to role page
      login(form.username.trim(), form.role);
      navigate('/portal');
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error.message || 'Registration failed',
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="card login-card">
        <h1>Feedback Management System</h1>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          {errors.submit && <p style={{ color: '#ffd700', marginBottom: 12 }}>{errors.submit}</p>}
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            <label htmlFor="fullName">Full Name</label>
            {errors.fullName && <small style={{color:'#ffd700'}}>{errors.fullName}</small>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
            {errors.email && <small style={{color:'#ffd700'}}>{errors.email}</small>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="username">Username</label>
            {errors.username && <small style={{color:'#ffd700'}}>{errors.username}</small>}
          </div>

          <div className="form-group">
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
            <label htmlFor="role">Role</label>
            {errors.role && <small style={{color:'#ffd700'}}>{errors.role}</small>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            {errors.password && <small style={{color:'#ffd700'}}>{errors.password}</small>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            {errors.confirmPassword && <small style={{color:'#ffd700'}}>{errors.confirmPassword}</small>}
          </div>

          <div className="form-group captcha-group" style={{ marginTop: 18, marginBottom: 18 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ background: '#f5f6fa', border: '1px solid #b3b3e6', borderRadius: 8, padding: '10px 18px', fontWeight: 500, fontSize: 16, color: '#222', minWidth: 180 }}>
                <span style={{ color: '#6e8efb', fontWeight: 700 }}>Captcha:</span> What is <span style={{ fontWeight: 700 }}>{captcha.a} + {captcha.b}</span>?
              </div>
              <div style={{ background: '#f5f6fa', border: '1px solid #b3b3e6', borderRadius: 8, padding: '10px 18px', display: 'flex', alignItems: 'center', minWidth: 60, justifyContent: 'center' }}>
                <button type="button" className="btn btn-secondary" style={{ fontSize: 18, padding: '2px 10px', background: 'none', border: 'none', color: '#6e8efb', cursor: 'pointer' }} onClick={generateCaptcha} aria-label="Refresh captcha">↻</button>
              </div>
            </div>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <input
                type="number"
                name="captcha"
                value={captcha.answer}
                onChange={handleCaptchaChange}
                required
                min="0"
                style={{ width: 120, fontSize: 16, padding: '6px 10px', borderRadius: 6, border: '1px solid #b3b3e6' }}
                aria-label="Enter captcha answer"
                placeholder="Enter answer"
              />
              {captchaError && <div style={{ color: '#ff4d4f', fontWeight: 500, marginTop: 6 }}>{captchaError}</div>}
            </div>
          </div>

          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div className="info-text" style={{ marginTop: 16 }}>
          <p>Already have an account? <Link to="/login" style={{ color: '#ffd700' }}>Login</Link></p>
          <p style={{ opacity: 0.8 }}>Note: Accounts are stored in the backend database now.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
