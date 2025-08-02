import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const EditProfileModal = ({ open, onClose, user, onSave }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  
  // Function to generate initials from name
  const generateInitials = (name) => {
    if (!name) return 'U';
    const nameParts = name.trim().split(' ');
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    }
    return name[0]?.toUpperCase() || 'U';
  };

  // Function to create default avatar with initials
  const createDefaultAvatar = (name) => {
    const initials = generateInitials(name);
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, '#629F3F');
    gradient.addColorStop(1, '#4a7a2f');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 200);
    
    // Add initials
    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, 100, 100);
    
    return canvas.toDataURL();
  };

  const [form, setForm] = useState({
    avatar: user?.avatar || createDefaultAvatar(user?.username),
    name: user?.username || '',
    password: '',
    confirmPassword: '',
  });
  const [avatarPreview, setAvatarPreview] = useState(form.avatar);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open && closeButtonRef.current) closeButtonRef.current.focus();
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  // Update avatar preview when user changes
  useEffect(() => {
    if (user) {
      console.log('EditProfileModal - User data:', user);
      const defaultAvatar = user.avatar || createDefaultAvatar(user.username);
      setForm(prev => ({
        ...prev,
        avatar: defaultAvatar,
        name: user.username || ''
      }));
      setAvatarPreview(defaultAvatar);
    }
  }, [user]);

  if (!open) return null;

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files && files[0]) {
      setForm((prev) => ({ ...prev, avatar: files[0] }));
      setAvatarPreview(URL.createObjectURL(files[0]));
    } else if (name === 'name') {
      setForm((prev) => ({ ...prev, [name]: value }));
      // Update avatar preview if user doesn't have a custom avatar
      if (!user?.avatar) {
        const newDefaultAvatar = createDefaultAvatar(value);
        setAvatarPreview(newDefaultAvatar);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.password && form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    onSave({
      ...form,
      avatar: form.avatar,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-[#181818] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#629F3F] w-full max-w-full sm:max-w-[98vw] md:max-w-[90vw] lg:max-w-[500px] xl:max-w-[500px] flex flex-col max-h-[98vh] min-w-[280px] sm:overflow-hidden"
        style={{ boxSizing: 'border-box', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-8 pt-6 pb-3 border-b border-[#2a2a2a] bg-gradient-to-b from-[#2d4a1e] to-[#181818] rounded-t-2xl min-h-[60px]">
          <div className="flex items-center gap-4 flex-1">
            <label htmlFor="avatar-upload" className="cursor-pointer group relative">
              {avatarPreview && avatarPreview.startsWith('data:') ? (
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#629F3F] shadow-lg transition-opacity duration-200 group-hover:opacity-80"
                />
              ) : (
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#629F3F] shadow-lg transition-opacity duration-200 group-hover:opacity-80 bg-gradient-to-br from-[#629F3F] to-[#4a7a2f] flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl" style={{fontFamily:'Bebas Neue, sans-serif'}}>
                    {generateInitials(form.name)}
                  </span>
                </div>
              )}
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 rounded-full text-xs text-white font-semibold" style={{fontFamily:'Gotham SSM, sans-serif'}}>Changer</span>
            </label>
            <input
              id="avatar-upload"
              name="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleInputChange}
            />
                         <div className="flex flex-col items-start">
               <span className="text-white font-bold text-xl sm:text-2xl uppercase leading-tight" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', letterSpacing:'0.04em'}}>Modifier le profil</span>
               <span className="text-[#bdbdbd] text-base font-semibold mt-1" style={{fontFamily:'Gotham SSM, sans-serif'}}>
                 {user?.username || 'Utilisateur'}
               </span>
             </div>
          </div>
          <button
            ref={closeButtonRef}
            className="text-white bg-[#629F3F] rounded-full w-10 h-10 flex items-center justify-center font-bold text-2xl z-20 shadow-lg hover:bg-[#4a7a2f] transition-colors duration-200 ml-2"
            onClick={onClose}
            aria-label="Fermer la modale"
          >
            ×
          </button>
        </div>
        {/* Form */}
        <form className="flex-1 w-full flex flex-col items-center justify-center px-4 sm:px-8 py-6 gap-4 overflow-auto" onSubmit={handleSubmit}>
          {/* Avatar Upload (handled above) */}
                     {/* Username */}
           <div className="flex flex-col w-full gap-1">
             <label htmlFor="name" className="text-white font-semibold text-base" style={{fontFamily:'Gotham SSM, sans-serif'}}>Nom d'utilisateur</label>
             <input
               id="name"
               name="name"
               type="text"
               value={form.name}
               onChange={handleInputChange}
               className="w-full rounded-lg px-4 py-2 bg-[#232323] text-white border border-[#629F3F] focus:outline-none focus:ring-2 focus:ring-[#629F3F] font-semibold"
               style={{fontFamily:'Gotham SSM, sans-serif'}}
               required
             />
           </div>
          {/* Password */}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="password" className="text-white font-semibold text-base" style={{fontFamily:'Gotham SSM, sans-serif'}}>Nouveau mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleInputChange}
              className="w-full rounded-lg px-4 py-2 bg-[#232323] text-white border border-[#629F3F] focus:outline-none focus:ring-2 focus:ring-[#629F3F] font-semibold"
              style={{fontFamily:'Gotham SSM, sans-serif'}}
              autoComplete="new-password"
            />
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="confirmPassword" className="text-white font-semibold text-base" style={{fontFamily:'Gotham SSM, sans-serif'}}>Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleInputChange}
              className="w-full rounded-lg px-4 py-2 bg-[#232323] text-white border border-[#629F3F] focus:outline-none focus:ring-2 focus:ring-[#629F3F] font-semibold"
              style={{fontFamily:'Gotham SSM, sans-serif'}}
              autoComplete="new-password"
            />
          </div>
          {/* Error */}
          {error && <div className="text-red-500 text-sm font-semibold w-full text-center">{error}</div>}
          {/* Actions */}
          <div className="flex w-full gap-4 mt-2">
            <button
              type="button"
              className="flex-1 py-3 rounded-lg bg-[#232323] border border-[#629F3F] text-white font-bold text-base hover:bg-[#2a2a2a] transition-colors duration-200"
              style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg bg-[#629F3F] text-white font-bold text-base hover:bg-[#4a7a2f] transition-colors duration-200"
              style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditProfileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default EditProfileModal; 