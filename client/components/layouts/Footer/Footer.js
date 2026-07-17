import React from 'react';
import Container from 'react-bulma-companion/lib/Container';
import Content from 'react-bulma-companion/lib/Content';
import Footer from 'react-bulma-companion/lib/Footer';

export default function FooterComponent() {
  const year = new Date().getFullYear();

  return (
    <Footer className="novasphere-footer">
      <style>
        {`
          .novasphere-footer {
            padding: 2rem 1.5rem !important;
            background: transparent !important;
            border-top: 1px solid #e2e8f0; /* Light clean divider line */
            transition: border-color 0.4s ease;
          }

          .novasphere-footer-text {
            font-size: 0.9rem;
            font-weight: 500;
            letter-spacing: 0.3px;
            margin: 0 !important;
            color: #64748b; 
          }

          .novasphere-footer-brand {
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
          }

          @media (prefers-color-scheme: dark) {
            .novasphere-footer {
              // border-top: 1px solid #1f2023; /* Low contrast dark mode divider */
            }
            .novasphere-footer-text {
              color: #94a3b8; 
            }
          }
        `}
      </style>
      
      <Container>
        <Content textAlign="center">
          <p className="novasphere-footer-text">
            Copyright Ⓒ {year} <span className="novasphere-footer-brand">NovaSphere</span>. All Rights Reserved.
          </p>
        </Content>
      </Container>
    </Footer>
  );
}