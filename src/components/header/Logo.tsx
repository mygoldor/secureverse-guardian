
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  user: any;
}

const Logo = ({ user }: LogoProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Link to={user ? "/dashboard" : "/"}>
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/a79c46d3-f1c2-4593-967d-8c6176e58cbc.png" 
            alt="Guardia" 
            className="h-10 w-auto"
          />
          <span className="font-bold text-2xl text-security-primary">Guardia</span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
