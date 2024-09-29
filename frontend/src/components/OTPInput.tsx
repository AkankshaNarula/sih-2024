import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const OTPInput = () => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setErrorMessage('');

    // Here you would typically validate the OTP
    // For this example, we'll just simulate a delay and then navigate
    setTimeout(() => {
      setIsVerifying(false);
      navigate('/Dash_Home');
    }, 1500);
  };

  const handleOtpChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, '');
    setOtp(input.slice(0, 6));
  };

  return (
    <div>
      <main className="w-full h-screen flex self-center place-content-center place-items-center">
        <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
          <div className="text-center">
            <div className="mt-2">
              <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Enter OTP</h3>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="text-sm text-gray-600 font-bold">
                One-Time Password
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength={6}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                  style={{ letterSpacing: '0.5em' }}
                />
                <div 
                  className="absolute top-0 left-0 right-0 bottom-0 mt-2 px-3 py-2 pointer-events-none"
                  style={{ letterSpacing: '0.5em' }}
                >
                  {/* {otp.replace(/./g, '•')} */}
                </div>
              </div>
            </div>

            {errorMessage && (
              <span className='text-red-600 font-bold'>{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isVerifying || otp.length !== 6}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${(isVerifying || otp.length !== 6) ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
            >
              {isVerifying ? (
                <span className="flex items-center justify-center">
                  <span className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></span>
                  Verifying...
                </span>
              ) : (
                'Verify OTP'
              )}
            </button>
          </form>
          <p className="text-center text-sm">Didn't receive the code? <Link to="#" className="hover:underline font-bold">Resend OTP</Link></p>
        </div>
      </main>
    </div>
  );
};

export default OTPInput;