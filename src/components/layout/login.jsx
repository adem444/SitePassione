import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Phone, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotPhone, setForgotPhone] = useState('');
  const [forgotEmailError, setForgotEmailError] = useState('');
  const [forgotPhoneError, setForgotPhoneError] = useState('');
  const [forgotMethod, setForgotMethod] = useState('email'); // 'email' or 'phone'
  const [resetStep, setResetStep] = useState('method'); // 'method', 'input', 'code', 'newPassword'
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    setPhoneError('');
    setPasswordError('');

    // Simple validation
    if (!phoneNumber.trim()) {
      setPhoneError('Veuillez entrer votre numéro de téléphone.');
      valid = false;
    } else if (!/^\d{8,15}$/.test(phoneNumber.trim())) {
      setPhoneError('Numéro de téléphone invalide.');
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

    console.log('Login attempt:', { phoneNumber, password });
    // After successful login, navigate to team selection
    navigate('/selectionne-joueur');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    let valid = true;
    setForgotEmailError('');
    setForgotPhoneError('');

    if (forgotMethod === 'email') {
      if (!forgotEmail.trim()) {
        setForgotEmailError('Veuillez entrer votre email.');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim())) {
        setForgotEmailError('Email invalide.');
        valid = false;
      }
    } else {
      if (!forgotPhone.trim()) {
        setForgotPhoneError('Veuillez entrer votre numéro de téléphone.');
        valid = false;
      } else if (!/^\d{8,15}$/.test(forgotPhone.trim())) {
        setForgotPhoneError('Numéro de téléphone invalide.');
        valid = false;
      }
    }

    if (!valid) return;

    console.log('Forgot password attempt:', { method: forgotMethod, value: forgotMethod === 'email' ? forgotEmail : forgotPhone });
    setResetStep('code');
  };

  const handleSendCode = () => {
    console.log('Sending reset code...');
    // Simulate sending code
    setTimeout(() => {
      setResetStep('newPassword');
    }, 1000);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmNewPassword) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    if (newPassword.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    console.log('Password reset successful');
    alert('Mot de passe réinitialisé avec succès !');
    setShowForgotPassword(false);
    resetForgotPassword();
  };

  const resetForgotPassword = () => {
    setForgotEmail('');
    setForgotPhone('');
    setForgotEmailError('');
    setForgotPhoneError('');
    setForgotMethod('email');
    setResetStep('method');
    setResetCode('');
    setNewPassword('');
    setConfirmNewPassword('');
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
  };

  const handleBackToMethod = () => {
    setResetStep('method');
    setForgotEmail('');
    setForgotPhone('');
    setForgotEmailError('');
    setForgotPhoneError('');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row lg:overflow-hidden">
      {/* Left Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen lg:min-h-0 lg:h-screen py-4 lg:py-2 px-4 lg:px-4 relative">
        {/* Mobile background image */}
        <div className="block lg:hidden absolute inset-0">
          <img 
            src="/loginimg.png" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="w-full max-w-sm lg:max-w-md space-y-3 lg:space-y-4 relative z-10">
          {/* Header */}
          <div className="text-center space-y-1 lg:space-y-2">
            <h1 className="text-white text-xl lg:text-2xl xl:text-3xl font-bold tracking-wide" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              BIENVENUE SUR
            </h1>
            <h2 className="text-[#629F3F] text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wide" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              PASSIONE 12
            </h2>
            <p className="text-gray-400 text-xs lg:text-sm leading-relaxed" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
              CONNECTEZ-VOUS POUR<br />ACCÉDER À VOTRE UNIVERS FOOTBALL
            </p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl flex items-center justify-center space-x-2 lg:space-x-3 transition-all duration-200 transform hover:scale-105"
            style={{ fontFamily: 'Gotham SSM, sans-serif' }}
          >
            <span className="text-base lg:text-lg font-bold">G</span>
            <span className="font-semibold text-xs lg:text-sm">CONTINUER AVEC GOOGLE</span>
          </button>

          {/* Divider */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-400 text-xs font-medium" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>OU</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
            {/* Phone Number Field */}
            <div>
              <label className="block text-white text-xs font-semibold mb-1.5 lg:mb-2 uppercase tracking-wide" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                NUMÉRO DE TÉLÉPHONE
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="PHONE NUMBER"
                  className={`w-full bg-gray-800 border ${
                    phoneError ? "border-red-500" : "border-gray-600"
                  } text-white px-9 lg:px-10 py-2.5 lg:py-3 rounded-xl focus:outline-none focus:border-[#629F3F] focus:ring-2 focus:ring-[#629F3F]/20 placeholder-gray-400 text-sm transition-all duration-200`}
                  style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                />
              </div>
              {phoneError && (
                <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{phoneError}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white text-xs font-semibold mb-1.5 lg:mb-2 uppercase tracking-wide" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                MOT DE PASSE
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full bg-gray-800 border ${
                    passwordError ? "border-red-500" : "border-gray-600"
                  } text-white px-9 lg:px-10 py-2.5 lg:py-3 pr-9 lg:pr-10 rounded-xl focus:outline-none focus:border-[#629F3F] focus:ring-2 focus:ring-[#629F3F]/20 placeholder-gray-400 text-sm transition-all duration-200`}
                  style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{passwordError}</p>
              )}
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-[#629F3F] text-xs hover:text-[#4a7a2f] transition-colors font-medium"
                  style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                >
                  Mot de passe oublié ?
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl font-semibold text-xs lg:text-sm transition-all duration-200 transform hover:scale-105 shadow-lg"
              style={{ fontFamily: 'Gotham SSM, sans-serif' }}
            >
              SE CONNECTER
            </button>
          </form>

          {/* Create Account Link */}
          <div className="text-center">
            <span className="text-gray-400 text-xs lg:text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
              Vous n'avez pas de compte ?{" "}
            </span>
            <button
              onClick={handleCreateAccount}
              className="text-[#629F3F] hover:text-[#4a7a2f] text-xs lg:text-sm font-medium transition-colors"
              style={{ fontFamily: 'Gotham SSM, sans-serif' }}
            >
              Créer un compte
            </button>
          </div>

          {/* Terms */}
          <div className="text-center text-xs text-gray-500 space-y-1 leading-relaxed" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
            <p>
              EN CONTINUANT, VOUS ACCEPTEZ NOS{" "}
              <button className="text-[#629F3F] hover:text-[#4a7a2f] transition-colors">
                CONDITIONS D'UTILISATION
              </button>{" "}
              ET NOTRE{" "}
              <button className="text-[#629F3F] hover:text-[#4a7a2f] transition-colors">
                POLITIQUE DE
              </button>
            </p>
            <p>
              <button className="text-[#629F3F] hover:text-[#4a7a2f] transition-colors">
                CONFIDENTIALITÉ
              </button>
            </p>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Promotional Image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 hidden lg:flex relative overflow-hidden lg:h-screen">
        <img 
          src="/loginimg.png" 
          alt="Football Promotion" 
          className="w-full h-full object-cover absolute inset-0"
        />
        {/* Overlay with text */}
        <div className="relative z-10 text-center text-white p-4 lg:p-6">
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 lg:mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            VIVEZ LA <span className="text-[#629F3F]">PASSION</span>
          </h1>
          <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            DU FOOTBALL
          </h2>
          <p className="text-sm lg:text-base xl:text-lg max-w-md mx-auto leading-relaxed" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
            SUIVEZ VOS ÉQUIPES FAVORITES, GÉREZ VOTRE ÉQUIPE FANTASY, ET RESTEZ CONNECTÉ AVEC L'ACTUALITÉ DU FOOTBALL TUNISIEN
          </p>
        </div>
      </div>

      {/* Enhanced Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-4 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg lg:text-xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                Mot de passe oublié
              </h2>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  resetForgotPassword();
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M6 6l12 12M6 18L18 6"/>
                </svg>
              </button>
            </div>
            
            {resetStep === 'method' && (
              <div className="space-y-3">
                <p className="text-gray-300 text-xs" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                  Choisissez comment réinitialiser votre mot de passe :
                </p>
                
                <div className="space-y-2">
                  <button
                    onClick={() => setForgotMethod('email')}
                    className={`w-full p-3 rounded-xl border transition-all duration-200 ${
                      forgotMethod === 'email' 
                        ? 'border-[#629F3F] bg-[#629F3F]/10' 
                        : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Mail className="text-[#629F3F]" size={16} />
                      <div className="text-left">
                        <div className="text-white font-semibold text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                          Par email
                        </div>
                        <div className="text-gray-400 text-xs" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                          Recevoir un code par email
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setForgotMethod('phone')}
                    className={`w-full p-3 rounded-xl border transition-all duration-200 ${
                      forgotMethod === 'phone' 
                        ? 'border-[#629F3F] bg-[#629F3F]/10' 
                        : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Phone className="text-[#629F3F]" size={16} />
                      <div className="text-left">
                        <div className="text-white font-semibold text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                          Par SMS
                        </div>
                        <div className="text-gray-400 text-xs" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                          Recevoir un code par SMS
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
                
                <form onSubmit={handleForgotPassword} className="space-y-3 pt-3">
                  {forgotMethod === 'email' ? (
                    <div>
                      <label className="block text-white text-xs font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                        ADRESSE EMAIL
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="votre@email.com"
                          className={`w-full bg-gray-800 border ${
                            forgotEmailError ? "border-red-500" : "border-gray-600"
                          } text-white px-9 py-2.5 rounded-xl focus:outline-none focus:border-[#629F3F] focus:ring-2 focus:ring-[#629F3F]/20 placeholder-gray-400 text-sm transition-all duration-200`}
                          style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                        />
                      </div>
                      {forgotEmailError && (
                        <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{forgotEmailError}</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-white text-xs font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                        NUMÉRO DE TÉLÉPHONE
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="tel"
                          value={forgotPhone}
                          onChange={(e) => setForgotPhone(e.target.value)}
                          placeholder="PHONE NUMBER"
                          className={`w-full bg-gray-800 border ${
                            forgotPhoneError ? "border-red-500" : "border-gray-600"
                          } text-white px-9 py-2.5 rounded-xl focus:outline-none focus:border-[#629F3F] focus:ring-2 focus:ring-[#629F3F]/20 placeholder-gray-400 text-sm transition-all duration-200`}
                          style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                        />
                      </div>
                      {forgotPhoneError && (
                        <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{forgotPhoneError}</p>
                      )}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className="w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white py-2.5 px-4 rounded-xl font-semibold text-xs transition-all duration-200"
                    style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                  >
                    Envoyer le code
                  </button>
                </form>
              </div>
            )}

            {resetStep === 'code' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 mb-3">
                  <button
                    onClick={handleBackToMethod}
                    className="text-[#629F3F] hover:text-[#4a7a2f] transition-colors"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <h3 className="text-white text-base font-semibold" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                    Code de vérification
                  </h3>
                </div>
                
                <p className="text-gray-300 text-xs" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                  Un code de vérification a été envoyé à votre {forgotMethod === 'email' ? 'email' : 'téléphone'}.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-white text-xs font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      CODE DE VÉRIFICATION
                    </label>
                    <input
                      type="text"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      placeholder="000000"
                      className="w-full bg-gray-800 border border-gray-600 text-white px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#629F3F] focus:ring-2 focus:ring-[#629F3F]/20 placeholder-gray-400 text-sm transition-all duration-200 text-center text-lg tracking-widest"
                      style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                      maxLength={6}
                    />
                  </div>
                  
                  <button
                    onClick={handleSendCode}
                    className="w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white py-2.5 px-4 rounded-xl font-semibold text-xs transition-all duration-200"
                    style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                  >
                    Vérifier le code
                  </button>
                </div>
              </div>
            )}

            {resetStep === 'newPassword' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 mb-3">
                  <button
                    onClick={() => setResetStep('code')}
                    className="text-[#629F3F] hover:text-[#4a7a2f] transition-colors"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <h3 className="text-white text-base font-semibold" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                    Nouveau mot de passe
                  </h3>
                </div>
                
                <form onSubmit={handleResetPassword} className="space-y-3">
                  <div>
                    <label className="block text-white text-xs font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      NOUVEAU MOT DE PASSE
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-gray-800 border border-gray-600 text-white px-9 py-2.5 pr-9 rounded-xl focus:outline-none focus:border-[#629F3F] focus:ring-2 focus:ring-[#629F3F]/20 placeholder-gray-400 text-sm transition-all duration-200"
                        style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white text-xs font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      CONFIRMER LE MOT DE PASSE
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type={showConfirmNewPassword ? "text" : "password"}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-gray-800 border border-gray-600 text-white px-9 py-2.5 pr-9 rounded-xl focus:outline-none focus:border-[#629F3F] focus:ring-2 focus:ring-[#629F3F]/20 placeholder-gray-400 text-sm transition-all duration-200"
                        style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showConfirmNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white py-2.5 px-4 rounded-xl font-semibold text-xs transition-all duration-200"
                    style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                  >
                    Réinitialiser le mot de passe
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;