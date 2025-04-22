
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-netflix-black py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <h2 className="text-xl font-bold text-netflix-red">
                Maflix<span className="text-white">Theater</span>
              </h2>
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              The ultimate streaming experience with the latest movies, TV shows, and original content.
              Watch anywhere, anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-medium mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/movies" className="text-gray-400 hover:text-white transition-colors">Movies</Link></li>
                <li><Link to="/series" className="text-gray-400 hover:text-white transition-colors">TV Shows</Link></li>
                <li><Link to="/mylist" className="text-gray-400 hover:text-white transition-colors">My List</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-medium mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/devices" className="text-gray-400 hover:text-white transition-colors">Devices</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Use</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Preferences</Link></li>
                <li><Link to="/corporate" className="text-gray-400 hover:text-white transition-colors">Corporate Information</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-medium mb-4">Account</h3>
              <ul className="space-y-2">
                <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors">Profile</Link></li>
                <li><Link to="/membership" className="text-gray-400 hover:text-white transition-colors">Membership</Link></li>
                <li><Link to="/billing" className="text-gray-400 hover:text-white transition-colors">Billing</Link></li>
                <li><Link to="/settings" className="text-gray-400 hover:text-white transition-colors">Settings</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-netflix-gray">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Maflix Theater. All rights reserved.
            <br />
            <span className="text-xs">
              This is a demo project. Not affiliated with any actual streaming service.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
