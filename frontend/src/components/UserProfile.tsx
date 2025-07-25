import React from 'react';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUser, logout } from '@/utils/auth';
import { useToast } from '@/hooks/use-toast';

interface UserProfileProps {
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onLogout }) => {
  const user = getUser();
  const { toast } = useToast();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    onLogout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const getInitials = (email: string, name?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.slice(0, 2).toUpperCase();
  };

  const formatLoginTime = (loginTime: string) => {
    return new Date(loginTime).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-muted/20">
          <Avatar className="h-10 w-10 border-2 border-primary/20 hover:border-primary/50 forest-transition">
            <AvatarImage src="" alt={user.name || user.email} />
            <AvatarFallback className="bg-muted text-foreground font-semibold">
              {getInitials(user.email, user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 bg-background/95 backdrop-blur-sm border border-border/50 forest-shadow" 
        align="end"
      >
        <DropdownMenuLabel className="pb-2">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src="" alt={user.name || user.email} />
              <AvatarFallback className="bg-muted text-foreground font-semibold text-lg">
                {getInitials(user.email, user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground leading-none">
                {user.name || 'User'}
              </p>
              <p className="text-xs text-muted-foreground leading-none">
                Profile
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-border/50" />
        
        <div className="px-2 py-2 space-y-1">
          <div className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-muted/20">
            <Mail className="h-4 w-4 text-primary-glow" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm text-foreground truncate">{user.email}</p>
            </div>
          </div>
          
          {user.name && (
            <div className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-muted/20">
              <User className="h-4 w-4 text-primary-glow" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-sm text-foreground truncate">{user.name}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-muted/20">
            <Calendar className="h-4 w-4 text-primary-glow" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Last Login</p>
              <p className="text-sm text-foreground">{formatLoginTime(user.loginTime)}</p>
            </div>
          </div>
        </div>
        
        <DropdownMenuSeparator className="bg-border/50" />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10 focus:text-destructive focus:bg-destructive/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;