import React, { useState } from 'react';

import R from 'ramda';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Box from 'react-bulma-companion/lib/Box';
import Button from 'react-bulma-companion/lib/Button';
import Control from 'react-bulma-companion/lib/Control';
import Element from 'react-bulma-companion/lib/Element';
import Field from 'react-bulma-companion/lib/Field';
import Help from 'react-bulma-companion/lib/Help';
import Icon from 'react-bulma-companion/lib/Icon';
import Input from 'react-bulma-companion/lib/Input';
import Label from 'react-bulma-companion/lib/Label';
import Title from 'react-bulma-companion/lib/Title';

import { postCheckUsername } from '_api/users';

import { attemptRegister } from '_store/thunks/auth';

import useKeyPress from '_hooks/useKeyPress';

import { validatePassword, validateUsername } from '_utils/validation';

import styles from './styles.module.css';

export default function RegisterPanel() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [loading, setLoading] = useState(false);

  const checkPassword = (newUsername, newPassword) => {
    const { valid, message } = validatePassword(newUsername, newPassword);

    setPasswordValid(valid);
    setPasswordMessage(message);
  };

  const checkUsername = newUsername => {
    const { valid, message } = validateUsername(newUsername);

    if (valid) {
      setUsernameMessage('Checking username...');
      setUsernameAvailable(false);

      postCheckUsername(newUsername)
        .then(res => {
          setUsernameAvailable(res.available);
          setUsernameMessage(res.message);
        })
        .catch(R.identity);
    } else {
      setUsernameAvailable(valid);
      setUsernameMessage(message);
    }
  };

  const updateUsername = newUserName => {
    setUsername(newUserName);
    checkPassword(newUserName, password);
  };

  const handleUsernameChange = e => {
    updateUsername(e.target.value);
    checkUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    checkPassword(username, e.target.value);
  };

  const register = () => {
    if (usernameAvailable && passwordValid) {
      const newUser = {
        username,
        password,
      };

      setLoading(true);
      dispatch(attemptRegister(newUser))
        .catch(R.identity)
        .finally(() => setLoading(false));
    }
  };

  useKeyPress('Enter', register);

  return (
    <Box className={`${styles.root} smart-register-card`}>
      <style>
        {`
          /* Smart Premium Card Layout */
          .smart-register-card {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 20px !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03) !important;
            padding: 2.5rem 2.25rem !important;
            max-width: 440px;
            width: 100%;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          /* Elegant Text Elements */
          .register-title {
            color: #0f172a !important;
            font-weight: 800 !important;
            letter-spacing: -0.5px;
            margin-bottom: 0.5rem !important;
          }

          .login-redirect-text {
            color: #64748b;
            font-size: 0.95rem;
            font-weight: 500;
            text-align: center;
            margin-bottom: 1.75rem !important;
          }

          .login-redirect-text a {
            color: #2563eb;
            font-weight: 600;
            text-decoration: none;
            transition: color 0.2s ease;
          }

          .login-redirect-text a:hover {
            color: #1d4ed8;
            text-decoration: underline;
          }

          /* Clean Form Inputs */
          .smart-register-card .label {
            color: #475569 !important;
            font-size: 0.85rem !important;
            font-weight: 600 !important;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.5rem !important;
          }

          .smart-register-card .input {
            border-radius: 10px !important;
            border: 1px solid #cbd5e1 !important;
            padding: 0.65rem 1rem !important;
            height: 44px !important;
            font-size: 0.95rem !important;
            color: #0f172a !important;
            box-shadow: none !important;
            transition: all 0.2s ease;
          }

          .smart-register-card .input:focus {
            border-color: #2563eb !important;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1) !important;
          }

          /* Success / Danger Field Adaptive Highlights */
          .smart-register-card .input.is-success {
            border-color: #10b981 !important;
          }
          .smart-register-card .input.is-success:focus {
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1) !important;
          }

          .smart-register-card .input.is-danger {
            border-color: #ef4444 !important;
          }
          .smart-register-card .input.is-danger:focus {
            box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important;
          }

          .smart-register-card .help {
            font-size: 0.825rem !important;
            font-weight: 500 !important;
            margin-top: 0.4rem !important;
          }

          /* Subtle Horizontal Divider Line */
          .smart-divider {
            border: none;
            height: 1px;
            background: #f1f5f9;
            margin: 1.5rem 0 !important;
          }

          /* Premium Action Buttons */
          .submit-account-btn {
            background-color: #2563eb !important;
            color: #ffffff !important;
            font-weight: 600 !important;
            border-radius: 10px !important;
            height: 44px !important;
            padding: 0 1.5rem !important;
            border: none !important;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2) !important;
            transition: all 0.2s ease !important;
            width: 100%;
          }

          .submit-account-btn:hover:not([disabled]) {
            background-color: #1d4ed8 !important;
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3) !important;
          }

          .submit-account-btn:disabled {
            background-color: #e2e8f0 !important;
            color: #94a3b8 !important;
            box-shadow: none !important;
            cursor: not-allowed;
            opacity: 0.8;
          }

          /* Dark Theme Adaptive Overrides */
          .dark-theme .smart-register-card {
            background: #0b0b0c !important;
            border: 1px solid #1f2023 !important;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4) !important;
          }
          
          .dark-theme .register-title {
            color: #ffffff !important;
          }

          .dark-theme .login-redirect-text {
            color: #94a3b8;
          }

          .dark-theme .login-redirect-text a {
            color: #3b82f6;
          }

          .dark-theme .smart-register-card .label {
            color: #94a3b8 !important;
          }

          .dark-theme .smart-register-card .input {
            background-color: #121316 !important;
            border: 1px solid #2d2f34 !important;
            color: #f8fafc !important;
          }

          .dark-theme .smart-register-card .input:focus {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15) !important;
          }

          .dark-theme .smart-divider {
            background: #1f2023;
          }

          .dark-theme .submit-account-btn {
            background-color: #3b82f6 !important;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15) !important;
          }

          .dark-theme .submit-account-btn:hover:not([disabled]) {
            background-color: #2563eb !important;
          }

          .dark-theme .submit-account-btn:disabled {
            background-color: #1f2023 !important;
            color: #475569 !important;
          }

          @media (prefers-color-scheme: dark) {
            html:not(.light-theme) .smart-register-card {
              background: #0b0b0c !important;
              border: 1px solid #1f2023 !important;
              box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4) !important;
            }
            html:not(.light-theme) .register-title { color: #ffffff !important; }
            html:not(.light-theme) .login-redirect-text { color: #94a3b8; }
            html:not(.light-theme) .login-redirect-text a { color: #3b82f6; }
            html:not(.light-theme) .smart-register-card .label { color: #94a3b8 !important; }
            html:not(.light-theme) .smart-register-card .input { background-color: #121316 !important; border: 1px solid #2d2f34 !important; color: #f8fafc !important; }
            html:not(.light-theme) .smart-divider { background: #1f2023; }
            html:not(.light-theme) .submit-account-btn { background-color: #3b82f6 !important; }
          }
        `}
      </style>

      <Title size="3" textAlign="center" className="register-title">
        Register
      </Title>
      
      <p className="login-redirect-text">
        Already a member?&nbsp;
        <Link to="/login">Login</Link>
      </p>

      <Field>
        <Label htmlFor="username">Username</Label>
        <Control iconsRight>
          <Input
            id="username"
            placeholder="Enter username"
            color={username ? (usernameAvailable ? 'success' : 'danger') : undefined}
            value={username}
            onChange={handleUsernameChange}
          />
          {username && (
            <Icon
              size="small"
              align="right"
              color={usernameAvailable ? 'success' : 'danger'}
            >
              <FontAwesomeIcon
                icon={usernameAvailable ? faCheck : faTriangleExclamation}
              />
            </Icon>
          )}
        </Control>
        {username && (
          <Help color={usernameAvailable ? 'success' : 'danger'}>
            {usernameMessage}
          </Help>
        )}
      </Field>

      <Field>
        <Label htmlFor="password">Password</Label>
        <Control iconsRight>
          <Input
            id="password"
            placeholder="Enter password"
            type="password"
            color={password ? (passwordValid ? 'success' : 'danger') : undefined}
            value={password}
            onChange={handlePasswordChange}
          />
          {password && (
            <Icon
              size="small"
              align="right"
              color={passwordValid ? 'success' : 'danger'}
            >
              <FontAwesomeIcon
                icon={passwordValid ? faCheck : faTriangleExclamation}
              />
            </Icon>
          )}
        </Control>
        {password && (
          <Help color={passwordValid ? 'success' : 'danger'}>
            {passwordMessage}
          </Help>
        )}
      </Field>

      <hr className="smart-divider" />

      <Element>
        <Button
          className="submit-account-btn"
          onClick={register}
          disabled={!passwordValid || !usernameAvailable || loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </Element>
    </Box>
  );
}