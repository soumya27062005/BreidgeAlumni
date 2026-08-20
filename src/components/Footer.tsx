import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">AlumniConnect</h3>
                <p className="text-sm text-muted-foreground">Digital Alumni Platform</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting generations of academic excellence through meaningful relationships, 
              mentorship, and collaborative growth.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-primary hover:text-primary-foreground">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-primary hover:text-primary-foreground">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-primary hover:text-primary-foreground">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-primary hover:text-primary-foreground">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              {[
                "Alumni Directory",
                "Upcoming Events", 
                "Mentorship Program",
                "Job Opportunities",
                "Donation Portal",
                "Success Stories"
              ].map((link, index) => (
                <Button key={index} variant="link" className="p-0 h-auto justify-start text-muted-foreground hover:text-primary">
                  {link}
                </Button>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Support</h4>
            <div className="space-y-2">
              {[
                "Help Center",
                "Contact Support",
                "Privacy Policy",
                "Terms of Service",
                "Community Guidelines",
                "Report Issue"
              ].map((link, index) => (
                <Button key={index} variant="link" className="p-0 h-auto justify-start text-muted-foreground hover:text-primary">
                  {link}
                </Button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Stay Connected</h4>
            <p className="text-sm text-muted-foreground">
              Get the latest updates, events, and opportunities delivered to your inbox.
            </p>
            <div className="space-y-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-background"
              />
              <Button className="w-full bg-gradient-primary">
                Subscribe
              </Button>
            </div>
            
            <div className="space-y-2 pt-4">
              <h5 className="font-medium text-foreground">Contact Info</h5>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@alumniconnect.edu</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 University Ave, Campus City</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 AlumniConnect Platform. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
              Privacy Policy
            </Button>
            <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
              Terms of Service
            </Button>
            <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
