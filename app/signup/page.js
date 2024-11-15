"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return password.length >= 6;
};

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
    });

  const [validations, setValidations] = useState({
    username: { isValid: false, isTouched: false },
    email: { isValid: false, isTouched: false },
    password: { isValid: false, isTouched: false }
    });
    const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    setLoading(true);
    try {
      const response = await fetch('https://anishop-backend-test.onrender.com/api/v1/user/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        router.push('/veridy-signup');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#191919] min-h-screen">
      <div className="relative w-full min-h-screen">
        <div className="absolute inset-0">
          <Image 
            src="/auth-banner.png" 
            alt="signup banner" 
            fill
            className="object-cover brightness-25"
            priority
          />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="bg-black/70 p-8 rounded-lg w-full max-w-md">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Create Account
            </h2>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  required
                  className="w-full px-4 py-3 bg-[#222222] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-red-500"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                  Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    required
                    className={`w-full px-4 py-3 bg-[#222222] rounded-lg text-white focus:outline-none 
                        ${validations.email.isTouched 
                        ? validations.email.isValid 
                            ? 'border border-[#0C9409]' 
                            : 'border border-[#ED1010]'
                        : 'border border-[#222222]'
                        }`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => {
                        const email = e.target.value;
                        setFormData({...formData, email});
                        setValidations(prev => ({
                        ...prev,
                        email: {
                            isValid: validateEmail(email),
                            isTouched: true
                        }
                        }));
                    }}
                    onBlur={() => {
                        setValidations(prev => ({
                        ...prev,
                        email: {
                            ...prev.email,
                            isTouched: true
                        }
                        }));
                    }}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                    <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    className={`w-full px-4 py-3 bg-[#222222] rounded-lg text-white focus:outline-none pr-12
                        ${validations.password.isTouched 
                        ? validations.password.isValid 
                            ? 'border border-[#0C9409]' 
                            : 'border border-[#ED1010]'
                        : 'border border-[#222222]'
                        }`}
                    placeholder="Create a password (min 6 characters)"
                    value={formData.password}
                    onChange={(e) => {
                        const password = e.target.value;
                        setFormData({...formData, password});
                        setValidations(prev => ({
                        ...prev,
                        password: {
                            isValid: validatePassword(password),
                            isTouched: true
                        }
                        }));
                    }}
                    onBlur={() => {
                        setValidations(prev => ({
                        ...prev,
                        password: {
                            ...prev.password,
                            isTouched: true
                        }
                        }));
                    }}
                    />
                    <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? (
                        <EyeOff size={20} />
                    ) : (
                        <Eye size={20} />
                    )}
                    </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-red-500 hover:text-red-400">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}