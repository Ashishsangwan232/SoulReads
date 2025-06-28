import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const VerifySuccess = () => {
  const navigate = useNavigate();

  // setTimeout(() => {
    // navigate('/login');
  // }, 3000);

  return (
    <motion.div
      className="verify-success"
      initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
    >
      <h2>Email Verified Successfully!</h2>
      <p>Redirecting to login...</p>
      <div className="tick-animation">✅</div>
    </motion.div>
  );
};

export default VerifySuccess;
