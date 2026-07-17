import React, { useEffect, useState } from 'react';

import R from 'ramda';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

import Block from 'react-bulma-companion/lib/Block';
import Box from 'react-bulma-companion/lib/Box';
import Button from 'react-bulma-companion/lib/Button';
import Checkbox from 'react-bulma-companion/lib/Checkbox';
import Title from 'react-bulma-companion/lib/Title';

import FormInput from '_components/elements/FormInput';

import { attemptLogin } from '_store/thunks/auth';

import useKeyPress from '_hooks/useKeyPress';

import styles from './styles.module.css';

export default function LoginPanel() {
  const dispatch = useDispatch();

  const [remember, setRemember] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setRemember(true);
      setUsername(username);
    }
  }, []);

  const login = () => {
    const userCredentials = { username, password };

    if (remember) {
      localStorage.setItem('username', username);
    }

    setLoading(true);
    dispatch(attemptLogin(userCredentials))
      .catch(R.identity)
      .finally(() => setLoading(false));
  };

  useKeyPress('Enter', login);

  const rememberMe = () => {
    localStorage.removeItem('username');
    setRemember(!remember);
  };

  const updateUsername = e => setUsername(e.target.value);
  const updatePassword = e => setPassword(e.target.value);

  return (
    <Box className={`${styles.root} smart-login-card`}>
      <style>
        {`
          /* Smart Premium Card Layout */
          .smart-login-card {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 20px !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03) !important;
            padding: 2.5rem 2.25rem !important;
            max-width: 440px;
            width: 100%;
          }

          /* Elegant Typography */
          .login-title {
            color: #0f172a !important;
            font-weight: 800 !important;
            letter-spacing: -0.5px;
            margin-bottom: 0.5rem !important;
          }

          .register-redirect-text {
            color: #64748b;
            font-size: 0.95rem;
            font-weight: 500;
            text-align: center;
            margin-bottom: 1.75rem !important;
          }

          .register-redirect-text a, .forgot-password-link a {
            color: #2563eb;
            font-weight: 600;
            text-decoration: none;
            transition: color 0.2s ease;
          }

          .register-redirect-text a:hover, .forgot-password-link a:hover {
            color: #1d4ed8;
            text-decoration: underline;
          }

          /* Input Adjustments inside FormInput block */
          .smart-login-card .field {
            margin-bottom: 1.25rem !important;
          }

          .smart-login-card .input {
            border-radius: 10px !important;
            border: 1px solid #cbd5e1 !important;
            padding: 0.65rem 1rem !important;
            height: 44px !important;
            font-size: 0.95rem !important;
            color: #0f172a !important;
            box-shadow: none !important;
            transition: all 0.2s ease;
          }

          .smart-login-card .input:focus {
            border-color: #2563eb !important;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1) !important;
          }
.control.has-icons-left .input, .control.has-icons-left .select select {
    padding-left: 2.5em !important;
}
          .forgot-password-link {
            text-align: right;
            font-size: 0.875rem;
            margin-top: -0.25rem !important;
            margin-bottom: 1.5rem !important;
          }

          /* Clean Horizontal Divider */
          .smart-login-card .separator {
            border: none;
            height: 1px;
            background: #f1f5f9;
            margin: 1.5rem 0 !important;
          }

          /* Flexible Footer Elements */
          .smart-login-foot {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            margin-top: 1.5rem;
          }

          /* Custom Styled Checkbox Row */
          .smart-checkbox-container {
            font-size: 0.925rem !important;
            color: #475569 !important;
            font-weight: 500 !important;
            cursor: pointer;
            user-select: none;
          }

          .smart-checkbox-container input {
            accent-color: #2563eb;
            width: 16px;
            height: 16px;
            cursor: pointer;
          }

          /* Action Buttons */
          .submit-login-btn {
            background-color: #2563eb !important;
            color: #ffffff !important;
            font-weight: 600 !important;
            border-radius: 10px !important;
            height: 44px !important;
            padding: 0 1.75rem !important;
            border: none !important;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2) !important;
            transition: all 0.2s ease !important;
          }

          .submit-login-btn:hover:not([disabled]) {
            background-color: #1d4ed8 !important;
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3) !important;
          }

          .submit-login-btn:disabled {
            background-color: #e2e8f0 !important;
            color: #94a3b8 !important;
            box-shadow: none !important;
            cursor: not-allowed;
            opacity: 0.8;
          }

          /* Premium Dark Theme Overrides */
          .dark-theme .smart-login-card {
            background: #0b0b0c !important;
            border: 1px solid #1f2023 !important;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4) !important;
          }

          .dark-theme .login-title {
            color: #ffffff !important;
          }

          .dark-theme .register-redirect-text {
            color: #94a3b8;
          }

          .dark-theme .register-redirect-text a, .dark-theme .forgot-password-link a {
            color: #3b82f6;
          }

          .dark-theme .smart-login-card .input {
            background-color: #121316 !important;
            border: 1px solid #2d2f34 !important;
            color: #f8fafc !important;
          }

          .dark-theme .smart-login-card .input:focus {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15) !important;
          }

          .dark-theme .smart-login-card .separator {
            background: #1f2023;
          }

          .dark-theme .smart-checkbox-container {
            color: #94a3b8 !important;
          }

          .dark-theme .smart-checkbox-container input {
            accent-color: #3b82f6;
          }

          .dark-theme .submit-login-btn {
            background-color: #3b82f6 !important;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15) !important;
          }

          .dark-theme .submit-login-btn:hover:not([disabled]) {
            background-color: #2563eb !important;
          }

          .dark-theme .submit-login-btn:disabled {
            background-color: #1f2023 !important;
            color: #475569 !important;
          }

          @media (prefers-color-scheme: dark) {
            html:not(.light-theme) .smart-login-card {
              background: #0b0b0c !important;
              border: 1px solid #1f2023 !important;
              box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4) !important;
            }
            html:not(.light-theme) .login-title { color: #ffffff !important; }
            html:not(.light-theme) .register-redirect-text { color: #94a3b8; }
            html:not(.light-theme) .register-redirect-text a, html:not(.light-theme) .forgot-password-link a { color: #3b82f6; }
            html:not(.light-theme) .smart-login-card .input { background-color: #121316 !important; border: 1px solid #2d2f34 !important; color: #f8fafc !important; }
            html:not(.light-theme) .smart-login-card .separator { background: #1f2023; }
            html:not(.light-theme) .smart-checkbox-container { color: #94a3b8 !important; }
            html:not(.light-theme) .submit-login-btn { background-color: #3b82f6 !important; }
          }
        `}
      </style>

      <Title size="3" textAlign="center" className="login-title">
        Login
      </Title>

      <Block className="register-redirect-text">
        Not Registered Yet?&nbsp;
        <Link to="/register">Create an account.</Link>
      </Block>

      <Block>
        <FormInput
          onChange={updateUsername}
          placeholder="Username"
          value={username}
          leftIcon={faUser}
        />
        <FormInput
          onChange={updatePassword}
          placeholder="Password"
          value={password}
          leftIcon={faLock}
          type="password"
        />
      </Block>

      <Block className="forgot-password-link">
        <Link to="/recovery">Forgot your password?</Link>
      </Block>

      <hr className="separator" />

      <div className={styles.foot} id="smart-foot-wrapper">
        {/* Retaining flexible structure by overriding styles injectively via specific layout block */}
        <style>{`
          #smart-foot-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }
        `}</style>
        <Checkbox display="flex" alignItems="center" className="smart-checkbox-container">
          <input type="checkbox" onChange={rememberMe} checked={remember} />
          <span>&nbsp; Remember me</span>
        </Checkbox>
        <Button className="submit-login-btn" onClick={login} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </div>
    </Box>
  );
}