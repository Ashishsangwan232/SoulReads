import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  0% { transform: translateY(60px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const AuthBody = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #000000;
  color: #eee;
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const AuthContainer = styled.div`
  z-index: 2;
  position: absolute;
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 0 0 20px #0ff3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${fadeIn} 0.8s ease forwards, ${slideUp} 0.6s ease forwards;

  h2 {
    text-align: center;
    font-size: 1.8rem;
    color: #00ffff;
    text-shadow: 0 0 5px #0ff6;
    animation: ${fadeIn} 0.8s ease forwards, ${slideUp} 0.6s ease forwards;
  }

  p {
    text-align: center;
    color: #ccc;
  }

  @media (max-width: 500px) {
    padding: 1.5rem 1rem;
    h2 { font-size: 1.5rem; }
  }
`;

export const FloatingGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  width: 100%;

  input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 2px solid #0ff;
    color: #0ff;
    padding: 12px 10px 10px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #00ffff;
    }
    &:invalid {
      border-color: #01bfbf;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 0) inset !important;
      -webkit-text-fill-color: #0ff !important;
      transition: background-color 9999s ease-in-out 0s;
      border-bottom: 2px solid #0ff !important;
      
      &:focus {
        border-bottom: 2px solid #00ffff !important;
      }
    }
  }

  label {
    position: absolute;
    top: 12px;
    left: 10px;
    color: #0ff;
    font-size: 1rem;
    transition: 0.3s ease all;
    pointer-events: none;
    animation: ${fadeIn} 0.8s ease forwards, ${slideUp} 0.6s ease forwards;
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    top: -10px;
    left: 5px;
    font-size: 0.8rem;
    color: #00ffff;
    text-shadow: 0 0 3px #00ffff88;
  }
`;

export const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #0ff;
  margin-bottom: 1.2rem;

  label {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  input[type="checkbox"] {
    accent-color: #00ffff;
    width: 16px;
    height: 16px;
  }

  a {
    color: #0ff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const AuthButton = styled.button`
  width: 100%;
  padding: 14px 0;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  font-size: 1.1rem;
  background: linear-gradient(45deg, #00f6ff, #00ffb1);
  color: #000;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px #00fff344;

  &:hover {
    box-shadow: 0 0 12px #00ffffaa;
    transform: scale(1.02);
  }

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

export const RedirectLink = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: #0ff;

  a {
    color: #00ffff;
    text-decoration: none;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Message = styled.div`
  text-align: center;
  font-size: 0.9rem;
  padding: 0.6rem;
  border-radius: 8px;
  margin-top: 0.6rem;

  &.success {
    color: #0f0;
    background: rgba(0, 255, 0, 0.05);
  }

  &.error {
    color: crimson;
    background: rgba(255, 0, 0, 0.05);
  }
`;

export const PasswordToggle = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
`;
