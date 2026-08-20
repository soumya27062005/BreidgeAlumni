import { useState } from "react";
import { User, Settings, LogOut, Bell, MessageSquare, Heart, Calendar, Award, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProfileSectionProps {
  userType: 'alumni' | 'student' | 'admin';
  userName?: string;
  userRole?: string;
  userEmail?: string;
}

const ProfileSection = ({ userType, userName = "John Doe", userRole = "Alumni", userEmail = "john.doe@example.com" }: ProfileSectionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleNavigation = (path: string, action: string) => {
    toast({
      title: action,
      description: `Navigating to ${action.toLowerCase()}...`,
    });
    // In a real app, you would navigate to the appropriate page
  };

  const getProfileStats = () => {
    switch (userType) {
      case 'alumni':
        return [
          { label: "Mentorships", value: "12", icon: MessageSquare },
          { label: "Events", value: "8", icon: Calendar },
          { label: "Donations", value: "$2.5K", icon: Heart },
        ];
      case 'student':
        return [
          { label: "Mentors", value: "3", icon: MessageSquare },
          { label: "Applications", value: "5", icon: Award },
          { label: "Events", value: "12", icon: Calendar },
        ];
      case 'admin':
        return [
          { label: "Alumni", value: "1.2K", icon: User },
          { label: "Students", value: "890", icon: User },
          { label: "Events", value: "45", icon: Calendar },
        ];
      default:
        return [];
    }
  };

  if (!isLoggedIn) {
    return (
      <Card className="w-full max-w-sm shadow-custom-md">
        <CardHeader className="text-center">
          <Avatar className="w-16 h-16 mx-auto mb-2">
            <AvatarFallback className="bg-muted text-muted-foreground">
              <User className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg">Welcome to AlumniConnect</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={handleSignIn} className="w-full bg-gradient-primary">
            Sign In
          </Button>
          <Button variant="outline" className="w-full">
            Create Account
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm shadow-custom-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{userName}</h3>
              <p className="text-sm text-muted-foreground">{userRole}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleEditProfile}>
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation('/notifications', 'Notifications')}>
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation('/messages', 'Messages')}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Badge variant="secondary" className="w-fit">
          {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          {getProfileStats().map((stat, index) => (
            <div key={index} className="text-center p-2 bg-secondary rounded-lg">
              <stat.icon className="w-4 h-4 mx-auto mb-1 text-primary" />
              <div className="text-sm font-semibold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Quick Actions</h4>
          <div className="space-y-1">
            {userType === 'alumni' && (
              <>
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleNavigation('/mentorship', 'Mentorship Requests')}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View Mentorship Requests
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleNavigation('/events', 'Upcoming Events')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Upcoming Events
                </Button>
              </>
            )}
            
            {userType === 'student' && (
              <>
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleNavigation('/mentors', 'Find Mentors')}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Find Mentors
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleNavigation('/jobs', 'Job Opportunities')}>
                  <Award className="w-4 h-4 mr-2" />
                  Job Opportunities
                </Button>
              </>
            )}
            
            {userType === 'admin' && (
              <>
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleNavigation('/analytics', 'Analytics Dashboard')}>
                  <Award className="w-4 h-4 mr-2" />
                  Analytics Dashboard
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleNavigation('/manage-events', 'Manage Events')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Manage Events
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
