import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Phone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Simple validation
    if (!phoneNumber.trim()) {
      setPhoneError("Veuillez entrer votre numéro de téléphone.");
      valid = false;
    } else if (!/^\d{8,15}$/.test(phoneNumber.trim())) {
      setPhoneError("Numéro de téléphone invalide.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Veuillez entrer votre mot de passe.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères.");
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Veuillez confirmer votre mot de passe.");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas.");
      valid = false;
    }

    if (!acceptedTerms) {
      alert("Veuillez accepter les conditions d'utilisation.");
      valid = false;
    }

    if (!valid) return;

    console.log("Signup attempt:", { phoneNumber, password });
    // After successful signup, navigate to team selection
    navigate('/selectionne-joueur');
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleCreateAccount = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row lg:overflow-hidden">
      {/* Left Panel - Signup Form */}
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
              REJOIGNEZ
            </h1>
            <h2 className="text-[#629F3F] text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wide" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              PASSIONE 12
            </h2>
            <p className="text-gray-400 text-xs lg:text-sm leading-relaxed" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
              CRÉEZ VOTRE COMPTE ET<br />REJOIGNEZ LA COMMUNAUTÉ
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

          {/* Signup Form */}
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
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-white text-xs font-semibold mb-1.5 lg:mb-2 uppercase tracking-wide" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                CONFIRMER LE MOT DE PASSE
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full bg-gray-800 border ${
                    confirmPasswordError ? "border-red-500" : "border-gray-600"
                  } text-white px-9 lg:px-10 py-2.5 lg:py-3 pr-9 lg:pr-10 rounded-xl focus:outline-none focus:border-[#629F3F] focus:ring-2 focus:ring-[#629F3F]/20 placeholder-gray-400 text-sm transition-all duration-200`}
                  style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{confirmPasswordError}</p>
              )}
            </div>
            
            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#629F3F] bg-gray-800 border-gray-600 rounded focus:ring-[#629F3F] focus:ring-2"
              />
              <label htmlFor="terms" className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                J'accepte les <span className="text-[#629F3F] hover:text-[#4a7a2f] cursor-pointer">conditions d'utilisation</span> et la <span className="text-[#629F3F] hover:text-[#4a7a2f] cursor-pointer">politique de confidentialité</span>
              </label>
            </div>
            
            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl font-semibold text-xs lg:text-sm transition-all duration-200 transform hover:scale-105 shadow-lg"
              style={{ fontFamily: 'Gotham SSM, sans-serif' }}
            >
              CREER UN COMPTE
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-gray-400 text-xs lg:text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
              Vous avez déjà un compte ?{" "}
            </span>
            <button
              onClick={handleCreateAccount}
              className="text-[#629F3F] hover:text-[#4a7a2f] text-xs lg:text-sm font-medium transition-colors"
              style={{ fontFamily: 'Gotham SSM, sans-serif' }}
            >
              Se connecter
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
    </div>
  );
};

export default Signup; 