import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const VerifySuccess = () => {
  const navigate = useNavigate();

  // setTimeout(() => {
  //   navigate('/login');
  // }, 3000);

  return (
    <motion.div
      className="verify-success"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Email Verified Successfully!</h2>
      <p>Redirecting to login...</p>
      <div className="tick-animation">✅</div>
    </motion.div>
  );
};

export default VerifySuccess;
