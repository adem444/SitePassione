import React, { useState, useEffect } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const Signup = () => {
  const navigate = useNavigate();
  const [passionId, setPassionId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passionIdError, setPassionIdError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isOTPLoading, setIsOTPLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    setPassionIdError("");
    setFullNameError("");
    setEmailError("");
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

    if (!email.trim()) {
      setEmailError("Veuillez entrer votre e-mail.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Format d'e-mail invalide.");
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
      // Call the backend register API
      const response = await api.register({
        name: fullName.trim(),
        username: passionId.trim(),
        password: password,
        telephone: phoneNumber.trim(),
        email: email.trim()
      });

      // Backend returns "OTP sent. Please verify." message
      // Store user data and show OTP modal
      setRegisteredUser({
        name: fullName.trim(),
        username: passionId.trim(),
        telephone: phoneNumber.trim(),
        email: email.trim()
      });
      setShowOTPModal(true);
      setResendCountdown(60); // Start countdown for resend
      
      // Show success message
      alert("Code OTP envoyé! Veuillez vérifier votre téléphone.");
    } catch (error) {
      console.error('Signup error:', error);
      if (error.message && error.message.includes('duplicate')) {
        if (error.message.includes('username')) {
          setPassionIdError("Cet identifiant Passione est déjà utilisé.");
        } else if (error.message.includes('telephone')) {
          setPhoneError("Ce numéro de téléphone est déjà utilisé.");
        } else if (error.message.includes('email')) {
          setEmailError("Cet e-mail est déjà utilisé.");
        }
      } else if (error.message && error.message.includes('username')) {
        setPassionIdError("Cet identifiant Passione est déjà utilisé.");
      } else if (error.message && error.message.includes('telephone')) {
        setPhoneError("Ce numéro de téléphone est déjà utilisé.");
      } else if (error.message && error.message.includes('email')) {
        setEmailError("Cet e-mail est déjà utilisé.");
      } else {
        alert(error.message || "Erreur lors de la création du compte. Veuillez vérifier votre connexion internet et réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
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
      const response = await api.verifyOTP({
        telephone: registeredUser.telephone,
        otp: otp.trim()
      });

      if (response.token) {
        // Store authentication data
        api.setToken(response.token);
        api.setUser(response.user);
        
        // Close modal and navigate
        setShowOTPModal(false);
        setOtp("");
        setOtpError("");
        setRegisteredUser(null);
        alert("Compte créé avec succès! Redirection vers la sélection d'équipe...");
        navigate("/team-selection");
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
    if (resendCountdown > 0) return;
    
    setIsOTPLoading(true);
    try {
      // Re-register to get new OTP
      await api.register({
        name: registeredUser.name,
        username: registeredUser.username,
        password: password,
        telephone: registeredUser.telephone,
        email: registeredUser.email
      });
      setOtp("");
      setOtpError("");
      setResendCountdown(60); // Start 60 second countdown
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
    setRegisteredUser(null);
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

            {/* Email */}
            <div>
              <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                E-MAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tapez votre e-mail"
                disabled={isLoading}
                className={`w-full bg-[#5B5757] text-white py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-[#629F3F]/50 outline-none ${
                  emailError ? 'ring-2 ring-red-500' : ''
                }`}
                style={{ fontFamily: 'Gotham SSM, sans-serif' }}
              />
              {emailError && <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>{emailError}</p>}
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
                <div className="mb-4">
                  <p className="text-[#629F3F] text-sm font-semibold mb-2" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                    ✓ Code OTP envoyé avec succès!
                  </p>
                  <p className="text-gray-300 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                    Un code de vérification a été envoyé au numéro {registeredUser?.telephone}
                  </p>
                </div>
                
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
                    disabled={isOTPLoading || resendCountdown > 0}
                    className={`flex-1 py-3 font-semibold text-sm transition-all ${
                      resendCountdown > 0 
                        ? 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed' 
                        : 'bg-[#5B5757] hover:bg-[#4a4a4a] text-white'
                    }`}
                    style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                  >
                    {resendCountdown > 0 ? `RENVOYER (${resendCountdown}s)` : 'RENVOYER'}
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

export default Signup;
