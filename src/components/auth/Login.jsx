import React, { useState } from 'react';
import { Eye, EyeOff, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [passionId, setPassionId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passionIdError, setPassionIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password Modal States
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState('phone'); // 'phone', 'code', 'newPassword'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    setPassionIdError('');
    setPasswordError('');

    if (!passionId.trim()) {
      setPassionIdError('Veuillez entrer votre Passione ID.');
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
      console.log('Login attempt:', { passionId, password });
      navigate('/team-selection');
    } catch (error) {
      alert('Erreur de connexion. Veuillez réessayer.');
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
    setForgotStep('phone');
    setPhoneNumber('');
    setPhoneError('');
    setVerificationCode('');
    setCodeError('');
    setNewPassword('');
    setConfirmPassword('');
    setNewPasswordError('');
    setConfirmPasswordError('');
  };

  const handleSendCode = async () => {
    if (!phoneNumber.trim()) {
      setPhoneError('Veuillez entrer votre numéro de téléphone.');
      return;
    }

    if (phoneNumber.length < 8) {
      setPhoneError('Le numéro de téléphone doit contenir au moins 8 chiffres.');
      return;
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
    setForgotStep('phone');
    setPhoneNumber('');
    setPhoneError('');
    setVerificationCode('');
    setCodeError('');
    setNewPassword('');
    setConfirmPassword('');
    setNewPasswordError('');
    setConfirmPasswordError('');
    setCountdown(0);
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

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-[#5B5757] hover:bg-[#4a4a4a] text-white py-3 font-medium flex items-center justify-center space-x-2 transition-all"
            style={{ fontFamily: 'Gotham SSM, sans-serif' }}
          >
            <span className="text-lg font-bold">G</span>
            <span className="text-sm sm:text-base font-semibold">CONTINUER AVEC GOOGLE</span>
          </button>

          {/* Divider */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 h-px bg-gray-500"></div>
            <span className="text-gray-400 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>OU</span>
            <div className="flex-1 h-px bg-gray-500"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Passion ID */}
            <div>
              <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                PASSIONE ID
              </label>
              <input
                type="text"
                value={passionId}
                onChange={(e) => setPassionId(e.target.value)}
                placeholder="Entrez votre ID"
                disabled={isLoading}
                className={`w-full bg-[#5B5757] text-white py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-[#629F3F]/50 outline-none ${
                  passionIdError ? 'ring-2 ring-red-500' : ''
                }`}
                style={{ fontFamily: 'Gotham SSM, sans-serif' }}
              />
              {passionIdError && <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{passionIdError}</p>}
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
              {/* Step 1: Phone Number */}
              {forgotStep === 'phone' && (
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                    Entrez votre numéro de téléphone pour recevoir un code de vérification.
                  </p>
                  
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

              {/* Step 2: Verification Code */}
              {forgotStep === 'code' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleBackToPhone}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <p className="text-gray-300 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      Code envoyé au {phoneNumber}
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

              {/* Step 3: New Password */}
              {forgotStep === 'newPassword' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleBackToCode}
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
    </div>
  );
};

export default Login;
