import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { X, Users, Target, RefreshCw, Settings, Trophy, Users as Friends, ArrowRight, ArrowLeft, CheckCircle, Star, Award, Zap, HelpCircle, BookOpen, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

const HelpModal = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState('tutorial');
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const tutorialSteps = [
    {
      title: "Composez votre équipe",
      description: "Utilisez votre budget de 100 VP pour recruter 15 joueurs, puis choisissez votre système préféré.",
      icon: <Users size={48} className="text-[#629F3F]" />,
      color: "from-blue-600/20 to-blue-800/20",
      borderColor: "border-blue-500"
    },
    {
      title: "Sélectionnez votre capitaine",
      description: "À chaque journée, le score du capitaine compte double.",
      icon: <Target size={48} className="text-[#629F3F]" />,
      color: "from-purple-600/20 to-purple-800/20",
      borderColor: "border-purple-500"
    },
    {
      title: "Effectuez vos transferts",
      description: "Faites tourner votre effectif en effectuant des transferts. Gérez votre équipe.",
      icon: <RefreshCw size={48} className="text-[#629F3F]" />,
      color: "from-green-600/20 to-green-800/20",
      borderColor: "border-green-500"
    },
    {
      title: "Gérez votre équipe",
      description: "Vous pouvez effectuer des changements en pleine journée afin de marquer le plus de points possible. N'oubliez pas de gérer votre équipe après chaque rencontre de la compétition !",
      icon: <Settings size={48} className="text-[#629F3F]" />,
      color: "from-orange-600/20 to-orange-800/20",
      borderColor: "border-orange-500"
    },
    {
      title: "Marquez des points",
      description: "Remportez des points grâce aux performances de vos joueurs sur le terrain (buts, passes décisives, et bien plus encore).",
      icon: <Trophy size={48} className="text-[#629F3F]" />,
      color: "from-yellow-600/20 to-yellow-800/20",
      borderColor: "border-yellow-500"
    },
    {
      title: "Défiez vos amis",
      description: "Créez des championnats privés pour défier vos amis. C'est tout bon ! Bonne chance !",
      icon: <Friends size={48} className="text-[#629F3F]" />,
      color: "from-red-600/20 to-red-800/20",
      borderColor: "border-red-500"
    }
  ];

  const faqItems = [
    {
      question: "Qu'est-ce que Passione 12 ?",
      answer: "Passione 12 est la première plateforme 100% tunisienne dédiée aux passionnés du football local. Notre mission est d'offrir une expérience immersive, ludique et compétitive autour de la Ligue Tunisienne de Football."
    },
    {
      question: "Le jeu TikiTaka Tunisie est-il gratuit ?",
      answer: "Oui, le jeu TikiTaka Tunisie est gratuit. Vous pouvez créer votre équipe et participer sans frais."
    },
    {
      question: "Comment créer une équipe ?",
      answer: "Après vous être connecté, vous serez automatiquement dirigé vers l'écran de 'Création d'Équipe'. Vous y sélectionnerez 15 joueurs (11 titulaires et 4 remplaçants) en respectant les contraintes de budget et de composition."
    },
    {
      question: "Quel est le budget initial pour créer une équipe ?",
      answer: "Le budget initial pour la création de votre équipe est de 100 VP (Valeurs Passione)."
    },
    {
      question: "Combien de joueurs dois-je avoir dans mon équipe ?",
      answer: "Votre équipe doit être composée de 15 joueurs au total : 11 titulaires et 4 remplaçants."
    },
    {
      question: "Y a-t-il des limites sur le nombre de joueurs que je peux choisir d'un même club ?",
      answer: "Oui, vous ne pouvez pas choisir plus de 3 joueurs de la même équipe de Ligue."
    },
    {
      question: "Puis-je changer la formation de mon équipe après la configuration initiale ?",
      answer: "Oui, vous pouvez modifier la composition de votre équipe (titulaires et remplaçants) à tout moment avant le deadline de chaque journée."
    },
    {
      question: "Que se passe-t-il si je dépasse le budget de 100 VP ?",
      answer: "Le système vous empêchera de dépasser le budget de 100VP lors de la sélection de vos joueurs. Les options de joueurs qui vous feraient dépasser le budget seront désactivées."
    },
    {
      question: "Comment fonctionnent le Capitaine et le Deuxième Capitaine ?",
      answer: "Vous devez choisir un Capitaine dont les points seront doublés s'il joue. Si le Capitaine ne joue pas, le Deuxième Capitaine prend le relais et ses points sont doublés."
    },
    {
      question: "Puis-je faire des substitutions et changer mon Capitaine ou Deuxième Capitaine pendant une journée de match en direct ?",
      answer: "Les substitutions et les changements de Capitaine/Deuxième Capitaine doivent être effectués avant le deadline de la journée (60 minutes avant le coup d'envoi du premier match). Aucune modification n'est possible pendant une journée de match en direct."
    },
    {
      question: "Que se passe-t-il si je dépasse mon allocation de transferts ?",
      answer: "Vous disposez de 3 transferts gratuits par journée (après la première journée). Au-delà de ces 3 transferts, des points seront retirés de votre score total selon un barème spécifique (par exemple, 4 points pour le 4ème changement, 9 points pour le 5ème, etc.). La limite est de 8 changements au total (3 gratuits + 5 supplémentaires)."
    },
    {
      question: "Comment les prix des joueurs évoluent-ils ?",
      answer: "Les prix des joueurs peuvent augmenter ou diminuer en fonction de leur popularité sur le marché des transferts. Si un joueur est sélectionné plus de 400 fois, son prix augmente de 0,1 VP. S'il est vendu moins de 200 fois, son prix baisse de 0,1 VP. Le prix d'un joueur ne peut jamais dépasser 14 VP."
    },
    {
      question: "Comment les points sont-ils attribués ?",
      answer: "Les joueurs gagnent des points basés sur leurs performances réelles en Ligue 1. Les points sont attribués pour des actions spécifiques (temps de jeu, clean sheet, buts, passes décisives, penalties arrêtés, etc.) et des points négatifs sont appliqués pour des actions comme les cartons, les buts contre son camp, ou les penalties manqués."
    }
  ];

  const gameInstructions = [
    {
      title: "Introduction",
      content: "Bienvenue dans le jeu de fantasy football ! Créez votre équipe, gérez votre budget, effectuez des transferts et défiez vos amis. Le but est de marquer le plus de points possible grâce aux performances réelles de vos joueurs."
    },
    {
      title: "Inscription et Connexion",
      content: "Créez votre compte en quelques clics. Connectez-vous avec votre email et mot de passe. Votre profil vous permet de gérer vos équipes, voir vos statistiques et participer aux ligues."
    },
    {
      title: "Création de l'Équipe",
      content: "Construisez votre équipe de 15 joueurs en respectant votre budget de 100 VP. Choisissez judicieusement vos joueurs en fonction de leurs performances, de leur club et de leur calendrier de matchs."
    },
    {
      title: "Budget et Prix des Joueurs",
      content: "Chaque joueur a une valeur VP (Valeur de Performance) basée sur ses performances réelles. Les stars coûtent plus cher mais marquent plus de points. Gérez votre budget de 100 VP pour optimiser votre équipe."
    },
    {
      title: "Capitaine et Vice-Capitaine",
      content: "Désignez un capitaine (double points) et un vice-capitaine (1.5x points). Le capitaine marque le double de points à chaque journée. Changez-les avant chaque journée selon les matchs à venir."
    },
    {
      title: "Gestion de l'Effectif",
      content: "Votre équipe compte 15 joueurs maximum. Surveillez les blessures, suspensions et performances. Une équipe équilibrée avec des joueurs de différents clubs maximise vos chances de points."
    },
    {
      title: "Remplacements Automatiques",
      content: "Si un joueur ne joue pas, le système le remplace automatiquement par votre premier remplaçant disponible. Configurez vos remplaçants dans l'ordre de priorité souhaité."
    },
    {
      title: "Remplacements Manuels - Avant Match",
      content: "Avant chaque journée, vous pouvez modifier votre équipe titulaire et vos remplaçants. Analysez les calendriers et les statistiques pour optimiser vos chances."
    },
    {
      title: "Remplacements Manuels - Pendant Match",
      content: "Pendant la journée, vous pouvez effectuer des changements en temps réel. Remplacez des joueurs blessés ou sous-performants par vos remplaçants pour maximiser vos points."
    },
    {
      title: "Transferts",
      content: "Effectuez des transferts gratuits et illimités avant chaque journée. Vendez des joueurs sous-performants et achetez des joueurs en forme. Respectez toujours votre budget de 100 VP."
    },
    {
      title: "Verrouillage",
      content: "Une fois la journée commencée, certains transferts sont verrouillés. Les remplacements restent possibles mais les achats/ventes sont bloqués jusqu'à la prochaine journée."
    },
    {
      title: "Attribution des Points",
      content: "Les points sont basés sur les performances réelles : Buts (4-6 pts), Passes décisives (3 pts), Clean sheets (4 pts), Cartons rouges (-3 pts), etc. Le capitaine marque le double, le vice-capitaine 1.5x."
    },
    {
      title: "Classement Général",
      content: "Compétitionnez dans le classement général avec tous les joueurs. Votre position dépend de vos points totaux. Plus vous marquez de points, plus vous montez au classement."
    },
    {
      title: "Ligues Entre Amis",
      content: "Créez des ligues privées avec vos amis ou rejoignez des ligues existantes. Partagez des codes d'invitation et défiez-vous en privé. Les ligues privées ont leurs propres classements."
    }
  ];

  // Focus management and keyboard navigation
  useEffect(() => {
    if (!open) return;

    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (activeTab === 'tutorial' && e.key === 'ArrowRight' && currentStep < tutorialSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else if (activeTab === 'tutorial' && e.key === 'ArrowLeft' && currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose, currentStep, tutorialSteps.length, activeTab]);

  if (!open) return null;

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSuccessModal(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    setShowSuccessModal(false);
    onClose();
    setCurrentStep(0);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const currentStepData = tutorialSteps[currentStep];

  const renderTutorialTab = () => (
    <div className="text-center">
      {/* Step Icon and Content */}
      <div className={`mb-8 p-8 rounded-2xl bg-gradient-to-br ${currentStepData.color} border-2 ${currentStepData.borderColor} transition-all duration-500 ease-out`}>
        <div className="mb-6">
          {currentStepData.icon}
        </div>
        <h3 
          className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl mb-4"
          style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}
        >
          {currentStepData.title}
        </h3>
        <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
          {currentStepData.description}
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center space-x-2 mb-8">
        {tutorialSteps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentStep 
                ? 'bg-[#629F3F] scale-125' 
                : index < currentStep 
                  ? 'bg-[#629F3F]/50' 
                  : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Aller à l'étape ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
            currentStep === 0
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-white hover:text-[#629F3F] hover:bg-[#629F3F]/10'
          }`}
        >
          <ArrowLeft size={20} />
          Précédent
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-[#629F3F] hover:bg-[#4a7a2f] text-white font-bold rounded-lg transition-all duration-200"
        >
          {currentStep === tutorialSteps.length - 1 ? (
            <>
              Terminer
              <CheckCircle size={20} />
            </>
          ) : (
            <>
              Suivant
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderFaqTab = () => (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <div key={index} className="border border-[#2a2a2a] rounded-lg overflow-hidden">
          <button
            onClick={() => toggleFaq(index)}
            className="w-full px-6 py-4 text-left bg-[#232323] hover:bg-[#2a2a2a] transition-colors duration-200 flex items-center justify-between"
          >
            <span className="text-white font-bold text-lg">{item.question}</span>
            {expandedFaq === index ? (
              <ChevronUp size={20} className="text-[#629F3F]" />
            ) : (
              <ChevronDown size={20} className="text-[#629F3F]" />
            )}
          </button>
          {expandedFaq === index && (
            <div className="px-6 py-4 bg-[#181818] border-t border-[#2a2a2a]">
              <p className="text-gray-300 leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderInstructionsTab = () => (
    <div className="space-y-6">
      {gameInstructions.map((instruction, index) => (
        <div key={index} className="bg-gradient-to-br from-[#232323] to-[#2a2a2a] border border-[#629F3F] rounded-lg p-6">
          <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#629F3F] rounded-full flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </div>
            {instruction.title}
          </h3>
          <p className="text-gray-300 leading-relaxed">{instruction.content}</p>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 transition-opacity duration-300 ease-out"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-modal-title"
      >
        <div
          ref={modalRef}
          className={`
            bg-[#181818] rounded-t-2xl sm:rounded-2xl shadow-2xl relative border border-[#629F3F]
            w-full max-w-full sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[900px] xl:max-w-[1000px]
            max-h-[95vh] lg:max-h-[90vh] xl:max-h-[85vh]
            flex flex-col
            min-w-[280px]
            sm:overflow-hidden
            transition-all duration-300 ease-out
            ${typeof window !== 'undefined' && window.innerWidth < 640 ? 'rounded-b-none' : ''}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-6 sm:pt-6 pb-3 sm:pb-4 border-b border-[#2a2a2a] bg-gradient-to-b from-[#2d4a1e] to-[#181818] rounded-t-2xl min-h-[70px] sm:min-h-[unset]" style={{minHeight:'70px'}}>
            <h2
              id="help-modal-title"
              className="text-white text-2xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight break-words leading-tight"
              style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif', letterSpacing: '0.04em' }}
            >
              CENTRE D'AIDE
            </h2>
            <button
              ref={closeButtonRef}
              className="text-white bg-[#629F3F] rounded-full w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-2xl sm:text-xl z-20 shadow-lg hover:bg-[#4a7a2f] transition-colors duration-200 touch-manipulation ml-2"
              onClick={onClose}
              aria-label="Fermer la modale"
            >
              ×
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#2a2a2a] bg-[#181818]">
            <button
              className={`flex-1 py-4 px-6 text-center font-bold text-sm lg:text-base uppercase transition-colors duration-200 ${
                activeTab === 'tutorial' 
                  ? 'text-[#629F3F] border-b-2 border-[#629F3F]' 
                  : 'text-white hover:text-[#629F3F]'
              }`}
              style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}
              onClick={() => { setActiveTab('tutorial'); setCurrentStep(0); }}
            >
              <div className="flex items-center justify-center gap-2">
                <BookOpen size={18} />
                Tutoriel
              </div>
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-bold text-sm lg:text-base uppercase transition-colors duration-200 ${
                activeTab === 'faq' 
                  ? 'text-[#629F3F] border-b-2 border-[#629F3F]' 
                  : 'text-white hover:text-[#629F3F]'
              }`}
              style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}
              onClick={() => setActiveTab('faq')}
            >
              <div className="flex items-center justify-center gap-2">
                <HelpCircle size={18} />
                FAQ
              </div>
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-bold text-sm lg:text-base uppercase transition-colors duration-200 ${
                activeTab === 'instructions' 
                  ? 'text-[#629F3F] border-b-2 border-[#629F3F]' 
                  : 'text-white hover:text-[#629F3F]'
              }`}
              style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}
              onClick={() => setActiveTab('instructions')}
            >
              <div className="flex items-center justify-center gap-2">
                <MessageCircle size={18} />
                Instructions
              </div>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            {activeTab === 'tutorial' && renderTutorialTab()}
            {activeTab === 'faq' && renderFaqTab()}
            {activeTab === 'instructions' && renderInstructionsTab()}
          </div>
        </div>
      </div>

      {/* Enhanced Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-70 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 transition-opacity duration-300 ease-out">
          <div className="bg-[#181818] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#629F3F] w-full max-w-full sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-lg xl:max-w-lg mx-2 sm:mx-0 animate-fade-in-up">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a]">
              <h3 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>
                🎉 Tutoriel Terminé !
              </h3>
              <button
                className="text-white bg-[#629F3F] rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-[#4a7a2f] transition-colors duration-200"
                onClick={handleFinish}
              >
                ×
              </button>
            </div>
            <div className="p-6 sm:p-8 text-center">
              {/* Animated Success Icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#629F3F] to-[#4a7a2f] rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <CheckCircle size={40} className="text-white" />
                </div>
                {/* Floating stars */}
               
              </div>

              {/* Success Message */}
              <h4 className="text-white font-bold text-2xl sm:text-3xl mb-4" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>
                Félicitations !
              </h4>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Vous avez terminé le tutoriel avec succès. Vous êtes maintenant prêt à jouer et à défier vos amis !
              </p>

             
             

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  className="w-full bg-gradient-to-r from-[#629F3F] to-[#4a7a2f] hover:from-[#4a7a2f] hover:to-[#629F3F] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={handleFinish}
                >
                  Commencer à Jouer
                </button>
               
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

HelpModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HelpModal; 