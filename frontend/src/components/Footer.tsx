import React from 'react';
import { FileText, Github, Heart, Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-border/30 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary-glow" />
              </div>
              <div>
                <h3 className="text-lg font-bold emerald-gradient bg-clip-text text-transparent">
                  PDF Summarizer
                </h3>
                <p className="text-xs text-muted-foreground">AI-Powered Analysis</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transform lengthy documents into concise, actionable summaries with our advanced AI technology. 
              Built for professionals who value efficiency and precision.
            </p>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Leaf className="h-3 w-3 text-primary-glow" />
                Lightning-fast processing
              </li>
              <li className="flex items-center gap-2">
                <Leaf className="h-3 w-3 text-primary-glow" />
                Advanced AI algorithms
              </li>
              <li className="flex items-center gap-2">
                <Leaf className="h-3 w-3 text-primary-glow" />
                Secure document handling
              </li>
              <li className="flex items-center gap-2">
                <Leaf className="h-3 w-3 text-primary-glow" />
                Multiple export formats
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Connect</h4>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-glow forest-transition group"
              >
                <Github className="h-4 w-4 group-hover:scale-110 forest-transition" />
                GitHub
              </a>
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                Built with <Heart className="h-3 w-3 text-red-500 animate-pulse" /> for nature
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>© 2024 PDF Summarizer</span>
              <span className="hidden md:inline">•</span>
              <span>Dark Forest Theme</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Powered by AI</span>
              <Leaf className="h-3 w-3 text-primary-glow animate-sway" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;