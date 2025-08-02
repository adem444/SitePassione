import React, { useState } from 'react';
import { Eye, EyeOff, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password Modal States
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState('method'); // 'method', 'phone', 'email', 'code', 'newPassword'
  const [verificationMethod, setVerificationMethod] = useState(''); // 'phone' or 'email'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isOTPLoading, setIsOTPLoading] = useState(false);
  const [unverifiedUser, setUnverifiedUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    setUsernameError('');
    setPasswordError('');

    if (!username.trim()) {
      setUsernameError('Veuillez entrer votre nom d\'utilisateur.');
      valid = false;
    }

    if (!password) {
      setPasswordError('Veuillez entrer votre mot de passe.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
      valid = false;
    }

    if (!valid) return;

    setIsLoading(true);
    
    try {
      const result = await login(username.trim(), password);

      if (result.success) {
        // Check if user has a pickteam
        const hasPickteam = await api.hasPickteam();
        
        if (hasPickteam) {
          // User has a pickteam, redirect to home
          navigate('/home');
        } else {
          // User doesn't have a pickteam, redirect to team selection
          navigate('/team-selection');
        }
      } else {
        // Handle different error cases
        if (result.error === 'User not found') {
          setUsernameError('Nom d\'utilisateur incorrect.');
        } else if (result.error === 'Invalid credentials') {
          setPasswordError('Mot de passe incorrect.');
        } else if (result.error === 'OTP not verified. Please verify your account.') {
          // Show OTP verification modal for unverified accounts
          setUnverifiedUser({ username: username.trim() });
          setShowOTPModal(true);
        } else {
          alert(result.error || 'Erreur de connexion. Veuillez réessayer.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  // Forgot Password Functions
  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setForgotStep('method');
    setVerificationMethod('');
    setPhoneNumber('');
    setPhoneError('');
    setEmail('');
    setEmailError('');
    setVerificationCode('');
    setCodeError('');
    setNewPassword('');
    setConfirmPassword('');
    setNewPasswordError('');
    setConfirmPasswordError('');
  };

  const handleSendCode = async () => {
    if (verificationMethod === 'phone') {
      if (!phoneNumber.trim()) {
        setPhoneError('Veuillez entrer votre numéro de téléphone.');
        return;
      }

      if (phoneNumber.length < 8) {
        setPhoneError('Le numéro de téléphone doit contenir au moins 8 chiffres.');
        return;
      }
    } else if (verificationMethod === 'email') {
      if (!email.trim()) {
        setEmailError('Veuillez entrer votre adresse e-mail.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setEmailError('Format d\'e-mail invalide.');
        return;
      }
    }

    setIsForgotLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setForgotStep('code');
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      alert('Erreur lors de l\'envoi du code. Veuillez réessayer.');
    } finally {
      setIsForgotLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      setCodeError('Veuillez entrer le code de vérification.');
      return;
    }

    if (verificationCode.length !== 6) {
      setCodeError('Le code doit contenir 6 chiffres.');
      return;
    }

    setIsForgotLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setForgotStep('newPassword');
    } catch (error) {
      alert('Code incorrect. Veuillez réessayer.');
    } finally {
      setIsForgotLoading(false);
    }
  };

  const handleResetPassword = async () => {
    let valid = true;
    setNewPasswordError('');
    setConfirmPasswordError('');

    if (!newPassword) {
      setNewPasswordError('Veuillez entrer un nouveau mot de passe.');
      valid = false;
    } else if (newPassword.length < 6) {
      setNewPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Veuillez confirmer votre mot de passe.');
      valid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas.');
      valid = false;
    }

    if (!valid) return;

    setIsForgotLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Mot de passe réinitialisé avec succès!');
      setShowForgotPassword(false);
      setForgotStep('phone');
    } catch (error) {
      alert('Erreur lors de la réinitialisation. Veuillez réessayer.');
    } finally {
      setIsForgotLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setForgotStep('phone');
    setVerificationCode('');
    setCodeError('');
  };

  const handleBackToCode = () => {
    setForgotStep('code');
    setNewPassword('');
    setConfirmPassword('');
    setNewPasswordError('');
    setConfirmPasswordError('');
  };

  const closeModal = () => {
    setShowForgotPassword(false);
    setForgotStep('method');
    setVerificationMethod('');
    setPhoneNumber('');
    setPhoneError('');
    setEmail('');
    setEmailError('');
    setVerificationCode('');
    setCodeError('');
    setNewPassword('');
    setConfirmPassword('');
    setNewPasswordError('');
    setConfirmPasswordError('');
    setCountdown(0);
  };

  const handleOTPVerification = async () => {
    if (!otp.trim()) {
      setOtpError("Veuillez entrer le code OTP.");
      return;
    }

    if (otp.length !== 6) {
      setOtpError("Le code OTP doit contenir 6 chiffres.");
      return;
    }

    setIsOTPLoading(true);
    setOtpError("");

    try {
      // First, get user info to get telephone
      const userResponse = await api.getUserByUsername(unverifiedUser.username);
      const user = userResponse.user;

      const response = await api.verifyOTP({
        telephone: user.telephone,
        otp: otp.trim()
      });

      if (response.token) {
        // Store authentication data
        api.setToken(response.token);
        api.setUser(response.user);
        
        // Check if user has a pickteam
        const hasPickteam = await api.hasPickteam();
        
        // Close modal and navigate
        setShowOTPModal(false);
        setOtp("");
        setOtpError("");
        setUnverifiedUser(null);
        
        if (hasPickteam) {
          // User has a pickteam, redirect to home
          navigate("/home");
        } else {
          // User doesn't have a pickteam, redirect to team selection
          navigate("/team-selection");
        }
      } else {
        setOtpError("Code OTP invalide. Veuillez réessayer.");
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setOtpError(error.message || "Erreur lors de la vérification OTP. Veuillez réessayer.");
    } finally {
      setIsOTPLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsOTPLoading(true);
    try {
      // Get user info and resend OTP
      const userResponse = await api.getUserByUsername(unverifiedUser.username);
      const user = userResponse.user;

      // Re-register to get new OTP
      await api.register({
        name: user.name,
        username: user.username,
        password: password,
        telephone: user.telephone,
        email: user.email
      });
      setOtp("");
      setOtpError("");
      alert("Nouveau code OTP envoyé!");
    } catch (error) {
      console.error('Resend OTP error:', error);
      alert("Erreur lors de l'envoi du nouveau code OTP. Veuillez réessayer.");
    } finally {
      setIsOTPLoading(false);
    }
  };

  const closeOTPModal = () => {
    setShowOTPModal(false);
    setOtp("");
    setOtpError("");
    setUnverifiedUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black relative">
      {/* Background Image for Mobile */}
      <div className="absolute inset-0 lg:hidden z-0">
        <img src="/loginimg.png" alt="Mobile Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-90" />
      </div>

      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 relative z-10">
        {/* Form container */}
        <div className="relative z-10 w-full max-w-lg space-y-6">
          {/* Header */}
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-bold tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: 'bold' }}>
              BIENVENUE SUR
            </h1>
            <h2 className="text-[#629F3F] text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: 'bold' }}>
              PASSIONE 12
            </h2>
            <p className="text-gray-300 text-sm sm:text-base" style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: 'normal' }}>
              Connectez-vous pour accéder à votre univers football
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
              user name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez votre user name"
                disabled={isLoading}
                className={`w-full bg-[#5B5757] text-white py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-[#629F3F]/50 outline-none ${
                  usernameError ? 'ring-2 ring-red-500' : ''
                }`}
                style={{ fontFamily: 'Gotham SSM, sans-serif' }}
              />
              {usernameError && <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{usernameError}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                MOT DE PASSE
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={isLoading}
                  className={`w-full bg-[#5B5757] text-white py-3 px-4 pr-12 placeholder-gray-400 focus:ring-2 focus:ring-[#629F3F]/50 outline-none ${
                    passwordError ? 'ring-2 ring-red-500' : ''
                  }`}
                  style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{passwordError}</p>}
              <div className="text-right mt-1">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                  className="text-[#629F3F] text-xs hover:text-[#4a7a2f]"
                  style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white py-3 font-semibold text-sm transition-all ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{ fontFamily: 'Gotham SSM, sans-serif' }}
            >
              {isLoading ? 'CONNEXION...' : 'SE CONNECTER'}
            </button>
          </form>

          {/* Create Account */}
          <div className="text-center lg:text-left">
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
              Vous n'avez pas de compte ?{' '}
              <button onClick={handleCreateAccount} className="text-[#629F3F] hover:text-[#4a7a2f] font-medium">
                Créer un compte
              </button>
            </p>
          </div>

          {/* Terms */}
          <div className="text-center lg:text-left text-xs text-gray-500 space-y-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
            <p>
              EN CONTINUANT, VOUS ACCEPTEZ NOS{' '}
              <button className="text-[#629F3F] hover:text-[#4a7a2f]">CONDITIONS D'UTILISATION</button> ET{' '}
              <button className="text-[#629F3F] hover:text-[#4a7a2f]">POLITIQUE DE</button>
            </p>
            <p>
              <button className="text-[#629F3F] hover:text-[#4a7a2f]">CONFIDENTIALITÉ</button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Desktop Only */}
      <div className="hidden lg:block w-1/2 h-screen relative">
        {/* Background Image with overlay */}
        <img
          src="/loginimg.png"
          alt="Football Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Content on top of image */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-8 max-w-lg">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-wide"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              VIVEZ LA <span className="text-[#629F3F]">PASSION</span>
            </h1>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              DU FOOTBALL
            </h2>
          
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-gray-800 w-full max-w-md mx-auto relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800">
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-white text-lg sm:text-xl font-semibold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                RÉINITIALISER LE MOT DE PASSE
              </h2>
              <div className="w-6"></div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-6">
              {/* Step 1: Method Selection */}
              {forgotStep === 'method' && (
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                    Sélectionnez la méthode de vérification pour réinitialiser votre mot de passe.
                  </p>
                  <button
                    onClick={() => {
                      setVerificationMethod('phone');
                      setForgotStep('phone');
                      setPhoneNumber('');
                      setPhoneError('');
                      setEmail('');
                      setEmailError('');
                      setVerificationCode('');
                      setCodeError('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setNewPasswordError('');
                      setConfirmPasswordError('');
                    }}
                    className="w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white py-3 font-semibold text-sm transition-all"
                    style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                  >
                    Par téléphone
                  </button>
                  <button
                    onClick={() => {
                      setVerificationMethod('email');
                      setForgotStep('email');
                      setEmail('');
                      setEmailError('');
                      setVerificationCode('');
                      setCodeError('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setNewPasswordError('');
                      setConfirmPasswordError('');
                    }}
                    className="w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white py-3 font-semibold text-sm transition-all"
                    style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                  >
                    Par e-mail
                  </button>
                </div>
              )}

              {/* Step 2: Phone Number */}
              {forgotStep === 'phone' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setForgotStep('method');
                        setVerificationMethod('');
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <p className="text-gray-300 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      Entrez votre numéro de téléphone pour recevoir un code de vérification.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      NUMÉRO DE TÉLÉPHONE
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+216 XX XXX XXX"
                      className={`w-full bg-[#5B5757] text-white py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-[#629F3F]/50 outline-none ${
                        phoneError ? 'ring-2 ring-red-500' : ''
                      }`}
                      style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                    />
                    {phoneError && <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{phoneError}</p>}
                  </div>

                  <button
                    onClick={handleSendCode}
                    disabled={isForgotLoading}
                    className={`w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white py-3 font-semibold text-sm transition-all ${
                      isForgotLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                  >
                    {isForgotLoading ? 'ENVOI...' : 'ENVOYER LE CODE'}
                  </button>
                </div>
              )}

              {/* Step 3: Email */}
              {forgotStep === 'email' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setForgotStep('method');
                        setVerificationMethod('');
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <p className="text-gray-300 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      Entrez votre adresse e-mail pour recevoir un code de vérification.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      ADRESSE E-MAIL
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemple@domaine.com"
                      className={`w-full bg-[#5B5757] text-white py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-[#629F3F]/50 outline-none ${
                        emailError ? 'ring-2 ring-red-500' : ''
                      }`}
                      style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{emailError}</p>}
                  </div>

                  <button
                    onClick={handleSendCode}
                    disabled={isForgotLoading}
                    className={`w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white py-3 font-semibold text-sm transition-all ${
                      isForgotLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                  >
                    {isForgotLoading ? 'ENVOI...' : 'ENVOYER LE CODE'}
                  </button>
                </div>
              )}

              {/* Step 4: Verification Code */}
              {forgotStep === 'code' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setForgotStep(verificationMethod === 'phone' ? 'phone' : 'email');
                        setVerificationCode('');
                        setCodeError('');
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <p className="text-gray-300 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      Code envoyé au {verificationMethod === 'phone' ? phoneNumber : email}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      CODE DE VÉRIFICATION
                    </label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="000000"
                      maxLength={6}
                      className={`w-full bg-[#5B5757] text-white py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-[#629F3F]/50 outline-none text-center text-lg tracking-widest ${
                        codeError ? 'ring-2 ring-red-500' : ''
                      }`}
                      style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                    />
                    {codeError && <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{codeError}</p>}
                  </div>

                  {countdown > 0 && (
                    <p className="text-gray-400 text-sm text-center" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      Renvoyer le code dans {countdown}s
                    </p>
                  )}

                  <button
                    onClick={handleVerifyCode}
                    disabled={isForgotLoading}
                    className={`w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white py-3 font-semibold text-sm transition-all ${
                      isForgotLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                  >
                    {isForgotLoading ? 'VÉRIFICATION...' : 'VÉRIFIER LE CODE'}
                  </button>
                </div>
              )}

              {/* Step 5: New Password */}
              {forgotStep === 'newPassword' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setForgotStep('code');
                        setVerificationCode('');
                        setCodeError('');
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <p className="text-gray-300 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      Créez votre nouveau mot de passe
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      NOUVEAU MOT DE PASSE
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full bg-[#5B5757] text-white py-3 px-4 pr-12 placeholder-gray-400 focus:ring-2 focus:ring-[#629F3F]/50 outline-none ${
                          newPasswordError ? 'ring-2 ring-red-500' : ''
                        }`}
                        style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                      >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {newPasswordError && <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{newPasswordError}</p>}
                  </div>

                  <div>
                    <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      CONFIRMER LE MOT DE PASSE
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full bg-[#5B5757] text-white py-3 px-4 pr-12 placeholder-gray-400 focus:ring-2 focus:ring-[#629F3F]/50 outline-none ${
                          confirmPasswordError ? 'ring-2 ring-red-500' : ''
                        }`}
                        style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {confirmPasswordError && <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{confirmPasswordError}</p>}
                  </div>

                  <button
                    onClick={handleResetPassword}
                    disabled={isForgotLoading}
                    className={`w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white py-3 font-semibold text-sm transition-all ${
                      isForgotLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                  >
                    {isForgotLoading ? 'RÉINITIALISATION...' : 'RÉINITIALISER LE MOT DE PASSE'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-gray-800 w-full max-w-md mx-auto relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800">
              <button
                onClick={closeOTPModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-white text-lg sm:text-xl font-semibold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                VÉRIFICATION OTP
              </h2>
              <div className="w-6"></div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-6">
              <div className="text-center">
                <p className="text-gray-300 text-sm mb-4" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                  Votre compte n'est pas encore vérifié. Veuillez entrer le code OTP envoyé par SMS.
                </p>
                
                <div>
                  <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                    CODE OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="000000"
                    maxLength={6}
                    className={`w-full bg-[#5B5757] text-white py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-[#629F3F]/50 outline-none text-center text-lg tracking-widest ${
                      otpError ? 'ring-2 ring-red-500' : ''
                    }`}
                    style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                  />
                  {otpError && <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{otpError}</p>}
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleResendOTP}
                    disabled={isOTPLoading}
                    className="flex-1 bg-[#5B5757] hover:bg-[#4a4a4a] text-white py-3 font-semibold text-sm transition-all"
                    style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                  >
                    RENVOYER
                  </button>
                  <button
                    onClick={handleOTPVerification}
                    disabled={isOTPLoading}
                    className={`flex-1 bg-[#629F3F] hover:bg-[#4a7a2f] text-white py-3 font-semibold text-sm transition-all ${
                      isOTPLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                  >
                    {isOTPLoading ? 'VÉRIFICATION...' : 'VÉRIFIER'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
