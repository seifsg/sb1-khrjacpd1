import React from 'react';
import { LayoutDashboard, MapPin, Bell, History, Settings, LogOut, Users, FileText, TestTube } from 'lucide-react';
import Logo from './Logo';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: 'dashboard' | 'locations' | 'notifications' | 'history' | 'settings' | 'accounts' | 'logs' | 'tester') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <Logo />
      </div>
      
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            active={currentPage === 'dashboard'}
            onClick={() => onNavigate('dashboard')}
          />
          <SidebarLink
            icon={<Users size={20} />}
            text="Google Accounts"
            active={currentPage === 'accounts'}
            onClick={() => onNavigate('accounts')}
          />
          <SidebarLink
            icon={<MapPin size={20} />}
            text="Locations"
            active={currentPage === 'locations'}
            onClick={() => onNavigate('locations')}
          />
          <SidebarLink
            icon={<Bell size={20} />}
            text="Notifications"
            active={currentPage === 'notifications'}
            onClick={() => onNavigate('notifications')}
          />
          <SidebarLink
            icon={<History size={20} />}
            text="History"
            active={currentPage === 'history'}
            onClick={() => onNavigate('history')}
          />
          <SidebarLink
            icon={<Settings size={20} />}
            text="Alerts"
            active={currentPage === 'settings'}
            onClick={() => onNavigate('settings')}
          />
          <SidebarLink
            icon={<FileText size={20} />}
            text="Logs"
            active={currentPage === 'logs'}
            onClick={() => onNavigate('logs')}
          />
          <SidebarLink
            icon={<TestTube size={20} />}
            text="API Tester"
            active={currentPage === 'tester'}
            onClick={() => onNavigate('tester')}
          />
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center text-gray-600 hover:text-gray-900 w-full">
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, text, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-3 text-gray-600 rounded-lg transition-colors w-full ${
        active
          ? 'bg-blue-50 text-blue-600'
          : 'hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </button>
  );
};

export default Sidebar;