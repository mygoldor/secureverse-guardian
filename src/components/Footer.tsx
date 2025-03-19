
import React from 'react';
import { Shield, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#003366] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-white" />
              <span className="font-bold text-xl text-white">Guardia</span>
            </div>
            <p className="text-gray-300 text-sm">
              Votre solution de cybersécurité complète pour protéger vos données et vos appareils contre les menaces numériques.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-gray-300 hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Fonctionnalités</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Tarifs</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Témoignages</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Informations légales</h4>
            <ul className="space-y-2">
              <li><Link to="/mentions-legales" className="text-gray-300 hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Politique de confidentialité</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Conditions d'utilisation</Link></li>
              <li><Link to="/cookies" className="text-gray-300 hover:text-white transition-colors">Gestion des cookies</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-300" />
                <span className="text-gray-300">123 Avenue de la Cybersécurité, 75001 Paris</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-300" />
                <span className="text-gray-300">+33 (0)1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-300" />
                <span className="text-gray-300">contact@guardia-security.com</span>
              </li>
            </ul>
            
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-gray-300">© {new Date().getFullYear()} Guardia Security. Tous droits réservés.</p>
          <div className="mt-4 md:mt-0">
            <img src="/placeholder.svg" alt="Paiement sécurisé" className="h-8 inline-block" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
