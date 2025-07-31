import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [passionId, setPassionId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passionIdError, setPassionIdError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    setPassionIdError("");
    setFullNameError("");
    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!passionId.trim()) {
      setPassionIdError("Veuillez entrer votre identifiant Passione.");
      valid = false;
    }

    if (!fullName.trim()) {
      setFullNameError("Veuillez entrer votre nom et prénom.");
      valid = false;
    }

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

    setIsLoading(true);
    
    try {
      console.log("Signup attempt:", { passionId, fullName, phoneNumber, password });
      navigate("/team-selection");
    } catch (error) {
      alert("Erreur lors de la création du compte. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
  };

  const handleLogin = () => {
    navigate("/login");
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
              REJOIGNEZ
            </h1>
            <h2 className="text-[#629F3F] text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: 'bold' }}>
              PASSIONE 12
            </h2>
            <p className="text-gray-300 text-sm sm:text-base" style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: 'normal' }}>
              CRÉEZ VOTRE COMPTE ET REJOIGNEZ LA COMMUNAUTÉ
            </p>
          </div>

          {/* Google Signup Button */}
          <button
            onClick={handleGoogleSignup}
            className="w-full bg-[#5B5757] hover:bg-[#4a4a4a] text-white py-3 font-medium flex items-center justify-center space-x-2 transition-all"
            style={{ fontFamily: 'Gotham SSM, sans-serif' }}
          >
            <span className="text-lg font-bold">G</span>
            <span className="text-sm sm:text-base font-semibold">CRÉER UN COMPTE AVEC GOOGLE</span>
          </button>

          {/* Divider */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 h-px bg-gray-500"></div>
            <span className="text-gray-400 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>OU</span>
            <div className="flex-1 h-px bg-gray-500"></div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Passion ID */}
            <div>
              <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                IDENTIFIANT PASSIONE
              </label>
              <input
                type="text"
                value={passionId}
                onChange={(e) => setPassionId(e.target.value)}
                placeholder="Choisir votre identifiant"
                disabled={isLoading}
                className={`w-full bg-[#5B5757] text-white py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-[#629F3F]/50 outline-none ${
                  passionIdError ? 'ring-2 ring-red-500' : ''
                }`}
                style={{ fontFamily: 'Gotham SSM, sans-serif' }}
              />
              {passionIdError && <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{passionIdError}</p>}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                NOM ET PRÉNOM
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tapez votre nom et prénom"
                disabled={isLoading}
                className={`w-full bg-[#5B5757] text-white py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-[#629F3F]/50 outline-none ${
                  fullNameError ? 'ring-2 ring-red-500' : ''
                }`}
                style={{ fontFamily: 'Gotham SSM, sans-serif' }}
              />
              {fullNameError && <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{fullNameError}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                NUMÉRO DE TÉLÉPHONE
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Tapez votre numéro de téléphone"
                disabled={isLoading}
                className={`w-full bg-[#5B5757] text-white py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-[#629F3F]/50 outline-none ${
                  phoneError ? 'ring-2 ring-red-500' : ''
                }`}
                style={{ fontFamily: 'Gotham SSM, sans-serif' }}
              />
              {phoneError && <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{phoneError}</p>}
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
                  placeholder="Choisir votre mot de passe"
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
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                CONFIRMER MOT DE PASSE
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmer votre mot de passe"
                  disabled={isLoading}
                  className={`w-full bg-[#5B5757] text-white py-3 px-4 pr-12 placeholder-gray-400 focus:ring-2 focus:ring-[#629F3F]/50 outline-none ${
                    confirmPasswordError ? 'ring-2 ring-red-500' : ''
                  }`}
                  style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {confirmPasswordError && <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{confirmPasswordError}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#629F3F] bg-[#5B5757] border-gray-600 focus:ring-[#629F3F] focus:ring-2"
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                J'accepte les <span className="text-[#629F3F] hover:text-[#4a7a2f] cursor-pointer transition-colors">conditions d'utilisation</span> et la{" "}
                <span className="text-[#629F3F] hover:text-[#4a7a2f] cursor-pointer transition-colors">politique de confidentialité</span>
              </label>
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
              {isLoading ? "CRÉATION..." : "CRÉER UN COMPTE"}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center lg:text-left">
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
              Vous avez déjà un compte ?{' '}
              <button 
                onClick={handleLogin} 
                className="text-[#629F3F] hover:text-[#4a7a2f] font-medium transition-colors"
              >
                Se connecter
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
    </div>
  );
};

export default Signup;
