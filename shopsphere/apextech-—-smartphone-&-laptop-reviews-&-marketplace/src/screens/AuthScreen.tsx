import React, { useState } from 'react';
import { ScreenId } from '../types';

interface AuthScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onLoginSuccess: (name: string, email: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onNavigate,
  onLoginSuccess,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Sign In inputs
  const [identifier, setIdentifier] = useState('buyer.tech@apexmarketplace.io');
  const [password, setPassword] = useState('UltraHighPerformance2024!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up inputs
  const [fullName, setFullName] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (authMode === 'signin') {
        onLoginSuccess('Rohit Rajput', identifier);
      } else {
        onLoginSuccess(fullName || 'New User', signupEmail || 'user@apextech.io');
      }
    }, 800);
  };

  const handleSocialLogin = (provider: 'Google' | 'Apple') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('Rohit Rajput', `rohit.${provider.toLowerCase()}@techmail.io`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col font-body-md text-[#131b2e] pb-24 selection:bg-[#2563eb] selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-xs border-b border-[#c3c6d7]/40">
        <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-16">
          <button
            onClick={() => onNavigate('explore')}
            aria-label="Return to Store"
            className="flex items-center gap-1 text-[#434655] hover:text-[#004ac6] transition-colors p-1 rounded-lg"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            <span className="hidden sm:inline text-xs font-semibold">Store</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px] fill">bolt</span>
            </div>
            <span className="font-manrope text-xl font-extrabold text-[#131b2e]">
              ApexTech
            </span>
          </div>

          <button
            aria-label="Support"
            onClick={() => onNavigate('explore')}
            className="text-[#434655] hover:text-[#004ac6] p-1 rounded-lg"
          >
            <span className="material-symbols-outlined text-[24px]">help_outline</span>
          </button>
        </div>
      </header>

      {/* Main Canvas Container */}
      <main className="flex-grow flex items-center justify-center px-4 py-8 w-full">
        <div className="w-full max-w-md bg-white border border-[#c3c6d7]/40 rounded-2xl p-6 shadow-xs relative overflow-hidden">
          {/* Top Brand Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#004ac6] via-[#2563eb] to-[#4069f2]" />

          {/* Segmented Split Toggle Tab */}
          <div className="p-1 bg-[#f2f3ff] rounded-xl flex items-center justify-between gap-1 mb-5 border border-[#c3c6d7]/30">
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`flex-1 py-2 text-center rounded-lg text-xs md:text-sm font-semibold transition-all ${
                authMode === 'signin'
                  ? 'bg-white text-[#004ac6] shadow-xs'
                  : 'text-[#434655] hover:text-[#131b2e]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 text-center rounded-lg text-xs md:text-sm font-semibold transition-all ${
                authMode === 'signup'
                  ? 'bg-white text-[#004ac6] shadow-xs'
                  : 'text-[#434655] hover:text-[#131b2e]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Welcome Banner */}
          <div className="mb-5 text-left">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#eaedff] text-[#004ac6] font-mono-code text-[11px] mb-2 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse" />
              AUTH PLATFORM v3.4
            </div>
            <h1 className="font-manrope text-xl md:text-2xl font-extrabold text-[#131b2e] tracking-tight">
              {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-xs text-[#434655] mt-1">
              {authMode === 'signin'
                ? 'Sign in to access your tech orders, wishlist, and saved devices'
                : 'Join verified tech buyers with customized alerts and benchmarks'}
            </p>
          </div>

          {/* Tech Value Prop Badges */}
          <div className="space-y-1.5 mb-5 p-3 bg-[#f2f3ff]/70 rounded-xl border border-[#c3c6d7]/30 text-xs text-[#434655]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#007f36] text-[18px]">check_circle</span>
              <span>Side-by-side device specs comparison engine</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#007f36] text-[18px]">check_circle</span>
              <span>Live price drop alerts across verified retailers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#007f36] text-[18px]">check_circle</span>
              <span>Express verified checkout &amp; order tracking</span>
            </div>
          </div>

          {/* SIGN IN FORM */}
          {authMode === 'signin' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">
                  Email or Mobile Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#737686] text-[20px] pointer-events-none">
                    <span className="material-symbols-outlined">alternate_email</span>
                  </span>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="name@work.com or +1 (555) 000-0000"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#c3c6d7] rounded-lg text-xs text-[#131b2e] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
                  />
                  {identifier && (
                    <button
                      type="button"
                      onClick={() => setIdentifier('')}
                      className="absolute right-3 text-[#737686] hover:text-[#131b2e]"
                    >
                      <span className="material-symbols-outlined text-[18px]">cancel</span>
                    </button>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#131b2e]">Password</label>
                  <span className="text-xs text-[#2563eb] hover:underline cursor-pointer font-semibold">
                    Forgot Password?
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#737686] text-[20px] pointer-events-none">
                    <span className="material-symbols-outlined">lock</span>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your security password"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#c3c6d7] rounded-lg text-xs text-[#131b2e] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[#737686] hover:text-[#131b2e]"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center pt-1">
                <input
                  type="checkbox"
                  id="remember-device"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#2563eb] border-[#c3c6d7]"
                />
                <label htmlFor="remember-device" className="ml-2 text-xs text-[#434655] cursor-pointer">
                  Remember this workstation for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs md:text-sm font-bold rounded-lg shadow-xs active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* SIGN UP FORM */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                  Full Legal Name
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#737686] text-[20px] pointer-events-none">
                    <span className="material-symbols-outlined">person</span>
                  </span>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Marcus Vance"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-[#c3c6d7] rounded-lg text-xs text-[#131b2e] focus:outline-none focus:border-[#2563eb]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                  Direct Mobile Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#737686] text-[20px] pointer-events-none">
                    <span className="material-symbols-outlined">smartphone</span>
                  </span>
                  <input
                    type="tel"
                    required
                    value={mobilePhone}
                    onChange={(e) => setMobilePhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-[#c3c6d7] rounded-lg text-xs text-[#131b2e] focus:outline-none focus:border-[#2563eb]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                  Work or Personal Email
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#737686] text-[20px] pointer-events-none">
                    <span className="material-symbols-outlined">mail</span>
                  </span>
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="m.vance@techspecs.org"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-[#c3c6d7] rounded-lg text-xs text-[#131b2e] focus:outline-none focus:border-[#2563eb]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                  Create Password
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#737686] text-[20px] pointer-events-none">
                    <span className="material-symbols-outlined">shield</span>
                  </span>
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Minimum 8 characters with numbers"
                    className="w-full pl-10 pr-10 py-2 bg-white border border-[#c3c6d7] rounded-lg text-xs text-[#131b2e] focus:outline-none focus:border-[#2563eb]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 text-[#737686] hover:text-[#131b2e]"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showSignupPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-start pt-1">
                <input
                  type="checkbox"
                  id="agree-terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  className="w-4 h-4 mt-0.5 rounded text-[#2563eb] border-[#c3c6d7]"
                />
                <label htmlFor="agree-terms" className="ml-2 text-[11px] text-[#434655] leading-tight">
                  I agree to the Editorial Policy, Privacy Terms, and hardware price alerting protocols.
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs md:text-sm font-bold rounded-lg shadow-xs active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Create Verified Account</span>
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Divider: Or Continue With */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#c3c6d7]/40" />
            </div>
            <div className="relative flex justify-center text-center">
              <span className="bg-white px-3 text-[11px] text-[#737686] font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-[#c3c6d7] hover:bg-[#f2f3ff] text-[#131b2e] text-xs font-semibold rounded-lg shadow-xs transition-all active:scale-[0.98]"
            >
              <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.15z" fill="#4285F4" />
                <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.07.72-2.45 1.16-4.03 1.16-3.1 0-5.72-2.1-6.65-4.93H1.28v3.15C3.26 21.3 7.34 24 12 24z" fill="#34A853" />
                <path d="M5.35 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.28C.46 8.2 0 10.05 0 12s.46 3.8 1.28 5.42l4.07-3.15z" fill="#FBBC05" />
                <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.7 1.28 6.58l4.07 3.15c.93-2.83 3.55-4.98 6.65-4.98z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Apple */}
            <button
              type="button"
              onClick={() => handleSocialLogin('Apple')}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-[#c3c6d7] hover:bg-[#f2f3ff] text-[#131b2e] text-xs font-semibold rounded-lg shadow-xs transition-all active:scale-[0.98]"
            >
              <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0 fill-current text-[#131b2e]" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.6-7.79-11.74-14.24-5.99-9.35-10.7-19.78-14.13-31.28-3.44-11.51-5.15-22.61-5.15-33.31 0-14.57 3.73-26.68 11.19-36.32 7.46-9.64 16.92-14.54 28.37-14.71 4.9 0 10.3 1.25 16.19 3.74 5.9 2.5 9.4 3.79 10.5 3.89 1.41-.22 5.16-1.6 11.25-4.14 6.09-2.54 11.55-3.66 16.38-3.36 12.83.65 23.01 5.38 30.54 14.19-11.1 6.74-16.53 16.03-16.3 27.87.22 9.57 3.97 17.55 11.25 23.95 7.29 6.4 15.82 10.02 25.6 10.85-2.28 7.07-4.99 14.36-8.14 21.88zM119.22 31.02c0-7.28 2.66-14.12 7.99-20.52 5.32-6.4 11.85-10.23 19.59-11.5 1.09 7.06-.98 13.9-6.2 20.52-5.22 6.62-11.9 10.79-20.03 12.5-.22-.33-.67-.67-1.35-1z" />
              </svg>
              <span>Continue with Apple</span>
            </button>
          </div>

          {/* Quick Switch Callout */}
          <div className="mt-5 pt-3 border-t border-[#c3c6d7]/30 text-center text-xs text-[#434655]">
            {authMode === 'signin' ? (
              <p>
                New to ApexTech?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-[#004ac6] font-semibold hover:underline inline-flex items-center gap-0.5 ml-1"
                >
                  <span>Create an Account</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="text-[#004ac6] font-semibold hover:underline inline-flex items-center gap-0.5 ml-1"
                >
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </p>
            )}
          </div>

          {/* Security Badge */}
          <div className="mt-3 flex items-center justify-center gap-1 text-[11px] text-[#737686] font-mono-code">
            <span className="material-symbols-outlined text-[14px] text-[#007f36]">lock</span>
            <span>256-bit SSL encrypted &amp; GDPR compliant</span>
          </div>
        </div>
      </main>
    </div>
  );
};
