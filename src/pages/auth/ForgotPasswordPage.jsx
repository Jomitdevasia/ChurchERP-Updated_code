import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Alert from '../../components/common/Alert/Alert';
import { IoMail, IoArrowBack, IoBusiness } from 'react-icons/io5';
import { authAPI } from '../../api/auth';
import './AuthPages.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await authAPI.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <div className="church-icon">
                <IoBusiness />
              </div>
              <h1>Check Your Email</h1>
              <p>We've sent password reset instructions to:</p>
              <p className="email-highlight">{email}</p>
            </div>
            
            <Alert 
              type="success" 
              message="Please check your email for the password reset link. The link will expire in 1 hour."
            />
            
            <div className="auth-footer">
              <Link to="/login" className="back-link">
                <IoArrowBack /> Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="church-icon">
              <IoBusiness />
            </div>
            <h1>Forgot Password?</h1>
            <p>Enter your email address and we'll send you a link to reset your password.</p>
          </div>

          {error && <Alert type="error" message={error} />}

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              icon={<IoMail />}
              required
            />

            <Button 
              type="submit" 
              variant="primary"
              isLoading={loading}
              fullWidth
            >
              Send Reset Link
            </Button>
          </form>

          <div className="auth-footer">
            <Link to="/login" className="back-link">
              <IoArrowBack /> Back to Login
            </Link>
          </div>
        </div>

        <div className="auth-banner">
          <div className="banner-content">
            <h2>"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."</h2>
            <p>- Jeremiah 29:11</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;