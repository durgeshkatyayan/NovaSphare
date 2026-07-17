import React, { useEffect } from 'react';
import R from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';
import Title from 'react-bulma-companion/lib/Title';

export default function WelcomePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push('/home'));
    }
  }, [dispatch, user]);

  return (
    <div className="novasphere-welcome-container">
      <style>
        {`
          .novasphere-welcome-container {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100vw !important;
            height: 100vh !important; /* Adjusted to 100vh to ensure full screen video coverage */
            margin: 0 !important;
            padding: 0 !important;
            background: transparent !important;
            overflow: hidden;
            position: relative;
          }

          /* Background Video styling */
          .bg-video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -2;
          }

          /* Transparent Blur Black Overlay */
          .bg-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            z-index: -1;
          }

          /* Clean Minimalist Card layout */
          .hero-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 3rem 2rem;
            border-radius: 24px;
            max-width: 450px;
            width: 90%;
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            
            /* Light Mode Solid Frame Card */
            background: #ffffff;
            border: 1px solid #e2e8f0;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          }

          .novasphere-svg {
            width: 180px;
            height: 180px;
            margin-bottom: 1.5rem;
            filter: drop-shadow(0 0 20px rgba(138, 43, 226, 0.3));
            animation: floatAndRotate 8s ease-in-out infinite alternate;
          }

          .animated-title {
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 800 !important;
            letter-spacing: -1px;
            margin: 0 0 0.75rem 0 !important;
          }

          .subtitle-text {
            color: #64748b;
            font-size: 1.1rem;
            font-weight: 500;
            margin: 0 !important;
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes floatAndRotate {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(180deg); }
            100% { transform: translateY(0px) rotate(360deg); }
          }

          /* System Dark Mode Configurations */
          @media (prefers-color-scheme: dark) {
            .hero-card {
              /* Rich deep onyx frame directly matching deep dark mode standards */
              background: #0b0b0c;
              border: 1px solid #1f2023;
              box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8);
            }
            .subtitle-text {
              color: #94a3b8;
            }
            .novasphere-svg {
              filter: drop-shadow(0 0 35px rgba(168, 85, 247, 0.5));
            }
          }
        `}
      </style>

      {/* Deep space / nebula thematic loop background video */}
      <video
        className="bg-video"
        src="https://vjs.zencdn.net/v/oceans.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Blurred transparent dark wrapper layer */}
      <div className="bg-overlay" />

      <div className="hero-card">
        <svg className="novasphere-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sphereGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ff77ff" />
              <stop offset="50%" stopColor="#8a2be2" />
              <stop offset="100%" stopColor="#41006f" />
            </radialGradient>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#4facfe" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="10 5" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="url(#ringGrad)" strokeWidth="3" opacity="0.6"/>
          <circle cx="100" cy="100" r="55" fill="url(#sphereGrad)" />
          <ellipse cx="100" cy="100" rx="70" ry="22" fill="none" stroke="#ffffff" strokeWidth="2.5" transform="rotate(-30 100 100)" opacity="0.9"/>
          <ellipse cx="100" cy="100" rx="65" ry="18" fill="none" stroke="#00f2fe" strokeWidth="1.5" transform="rotate(45 100 100)" opacity="0.7"/>
          <circle cx="85" cy="85" r="8" fill="#ffffff" opacity="0.4" filter="blur(1px)"/>
        </svg>

        <Title size="1" textAlign="center" className="animated-title">
          NovaSphere
        </Title>
        <p className="subtitle-text">
          Prepare for launch. Loading universe...
        </p>
      </div>
    </div>
  );
}