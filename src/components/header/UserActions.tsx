
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import UserDropdownMenu from './UserDropdownMenu';

interface UserActionsProps {
  user: any;
  setUser: (user: any) => void;
}

const UserActions = ({ user, setUser }: UserActionsProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center space-x-3">
      <LanguageSelector />
      
      {user ? (
        <>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-security-danger"></span>
          </Button>
          
          <UserDropdownMenu user={user} setUser={setUser} />
          
          <Button className="hidden md:inline-flex bg-security-primary hover:bg-security-secondary text-white">
            {t('quick_scan')}
          </Button>
        </>
      ) : (
        <div className="flex items-center space-x-2">
          <Link to="/login">
            <Button variant="outline">
              {t('login')}
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-security-primary hover:bg-security-secondary text-white">
              {t('signup')}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserActions;
