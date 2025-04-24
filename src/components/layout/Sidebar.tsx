
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, BadgeDollarSign, BookOpen, Settings, MessageSquare, HelpCircle, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarLink {
  title: string;
  icon: React.ElementType;
  path: string;
}

const sidebarLinks: SidebarLink[] = [
  { title: 'Dashboard', icon: Home, path: '/' },
  { title: 'Visits', icon: Calendar, path: '/visits' },
  { title: 'Earnings', icon: BadgeDollarSign, path: '/earnings' },
  { title: 'Learning Hub', icon: BookOpen, path: '/learning' },
  { title: 'Settings', icon: Settings, path: '/settings' },
  { title: 'Support', icon: MessageSquare, path: '/support' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <>
      {/* Mobile menu toggle button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button size="icon" variant="outline" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar content */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:relative flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-welli-main flex items-center justify-center">
              <span className="font-bold text-white">W</span>
            </div>
            <h1 className="text-xl font-bold text-welli-textPrimary">Welli</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.path;
              
              return (
                <li key={link.title}>
                  <Link
                    to={link.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-welli-main text-white"
                        : "text-welli-textSecondary hover:bg-welli-background"
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Help Section */}
        <div className="p-4 border-t">
          <Link
            to="/help"
            className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-welli-textSecondary hover:bg-welli-background transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
            <span>Help Center</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
