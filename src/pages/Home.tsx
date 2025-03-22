
import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Guardia Security</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive digital protection for your devices and online presence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Real-time Protection</h2>
            <p className="text-gray-600">
              Continuous monitoring and protection against the latest threats
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Privacy Shield</h2>
            <p className="text-gray-600">
              Advanced privacy features to keep your data safe
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Performance Boost</h2>
            <p className="text-gray-600">
              Optimize your device performance without compromising security
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Link
            to="/one-month-payment"
            className="inline-flex items-center px-6 py-3 bg-security-primary hover:bg-security-primary/90 text-white font-medium rounded-lg shadow-md"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Get One-Month Subscription
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
