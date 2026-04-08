import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const Portal = () => {
  const { currentUser, userRole } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/users`);
        if (!response.ok) {
          throw new Error('Unable to load registered users from backend');
        }
        const data = await response.json();
        setUsers(data);
        setError('');
      } catch (loadError) {
        setUsers([]);
        setError(loadError.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="portal-page">
      <Navbar title="Feedback Management System" showAllLinks={true} />

      <div className="container">
        <div className="card portal-card" style={{ maxWidth: '1000px', width: '100%' }}>
          <h2>Registered Users Portal</h2>
          <p style={{ marginBottom: '18px' }}>
            Signed in as <strong>{currentUser || 'Guest'}</strong>{userRole ? ` (${userRole})` : ''}.
          </p>

          {loading ? (
            <div className="no-feedback-message">Loading registered users from backend...</div>
          ) : error ? (
            <div className="no-feedback-message">{error}</div>
          ) : users.length === 0 ? (
            <div className="no-feedback-message">
              No registered users found yet. Create an account to see the details here.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.12)', borderRadius: '10px', overflow: 'hidden' }}>
                <thead>
                  <tr>
                    <th style={headerCell}>Full Name</th>
                    <th style={headerCell}>Username</th>
                    <th style={headerCell}>Email</th>
                    <th style={headerCell}>Role</th>
                    <th style={headerCell}>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td style={bodyCell}>{user.fullName}</td>
                      <td style={bodyCell}>{user.username}</td>
                      <td style={bodyCell}>{user.email}</td>
                      <td style={bodyCell}>{user.role}</td>
                      <td style={bodyCell}>{user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
              Add New Registration
            </Link>
            <Link to="/login" className="btn btn-secondary" style={{ textAlign: 'center', textDecoration: 'none' }}>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const headerCell = {
  textAlign: 'left',
  padding: '14px 16px',
  background: 'rgba(255,255,255,0.18)',
  color: '#fff',
  fontWeight: 700,
  borderBottom: '1px solid rgba(255,255,255,0.12)',
};

const bodyCell = {
  padding: '14px 16px',
  color: '#fff',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
};

export default Portal;