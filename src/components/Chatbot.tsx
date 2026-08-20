import { useState } from "react";
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AlumniConnect assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedResponses = {
    "hello": "Hello! Welcome to AlumniConnect. How can I assist you today?",
    "hi": "Hi there! I'm here to help you with any questions about the platform.",
    "how to register": "To register, click on 'Sign In' at the top right, then select 'Sign up here' and choose your user type (Alumni, Student, or Admin).",
    "forgot password": "To reset your password, go to the sign-in page and click 'Forgot password?' below the login form.",
    "find mentors": "To find mentors, navigate to the Student Portal and click on the 'Find Mentors' tab. You can search by expertise and filter results.",
    "job opportunities": "Job opportunities are available in the Student Portal under the 'Job Opportunities' tab. Alumni regularly post internships and full-time positions.",
    "events": "Check upcoming events in any dashboard. Alumni can RSVP to reunions, tech talks, and networking events.",
    "donations": "Alumni can make donations through their dashboard. We accept one-time and recurring donations to support student programs.",
    "edit profile": "To edit your profile, click on 'Edit Profile' in your dashboard sidebar or click on your profile picture.",
    "contact support": "You can reach our support team at support@alumniconnect.edu or call +1 (555) 123-4567.",
    "privacy": "We take privacy seriously. Your data is encrypted and you can control your profile visibility in settings.",
    "mobile app": "Our mobile app is available on iOS and Android. Search for 'AlumniConnect' in your app store.",
    "networking": "Use our networking features to connect with alumni in your field or region. Check the 'Connect with Alumni' section.",
    "mentorship": "Our mentorship program connects students with experienced alumni. Students can request mentorship, and alumni can offer their expertise.",
    "default": "I'm not sure about that specific question. Here are some common topics I can help with:\n\n• Registration and login\n• Finding mentors and jobs\n• Event information\n• Profile management\n• Technical support\n\nYou can also contact our support team for personalized assistance."
  };

  const quickActions = [
    "How to register?",
    "Find mentors",
    "Job opportunities", 
    "Forgot password",
    "Contact support"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Find appropriate response
    const lowercaseInput = inputMessage.toLowerCase();
    let response = predefinedResponses.default;

    for (const [key, value] of Object.entries(predefinedResponses)) {
      if (lowercaseInput.includes(key)) {
        response = value;
        break;
      }
    }

    // Add bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-custom-lg bg-gradient-primary hover:shadow-custom-xl transition-all duration-300 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed ${isMinimized ? 'bottom-6 right-6 w-80 h-16' : 'bottom-6 right-6 w-96 h-[600px]'} shadow-custom-xl z-50 transition-all duration-300`}>
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <div>
            <CardTitle className="text-base">AlumniConnect Assistant</CardTitle>
            {!isMinimized && (
              <CardDescription className="text-primary-foreground/80 text-sm">
                Online • Usually replies instantly
              </CardDescription>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-8 h-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[400px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-2 ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div className={`max-w-[70%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                      <div className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="mt-6 space-y-2">
                  <p className="text-sm text-muted-foreground">Quick actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleQuickAction(action)}
                      >
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </ScrollArea>
          </CardContent>

          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-gradient-primary"
                disabled={!inputMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default Chatbot;
