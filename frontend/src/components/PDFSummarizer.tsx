import React, { useState, useCallback, useEffect } from 'react';
import { Upload, FileText, Loader2, Download, CheckCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getUser } from '@/utils/auth';
import UserProfile from '@/components/UserProfile';
import Footer from '@/components/Footer';
import WildlifeBackground from '@/components/WildlifeBackground';
import axios from 'axios';

const PDFSummarizer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [user, setUser] = useState(getUser());
  const { toast } = useToast();

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const pdfFile = droppedFiles.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      setFile(pdfFile);
      toast({
        title: "PDF Selected",
        description: `Selected: ${pdfFile.name}`,
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a PDF file.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      toast({
        title: "PDF Selected",
        description: `Selected: ${selectedFile.name}`,
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a PDF file.",
        variant: "destructive",
      });
    }
  };

  const handleSummarize = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a PDF file first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSummary('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/summarize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 second timeout
      });

      setSummary(response.data.summary || 'Summary generated successfully!');
      toast({
        title: "Summary Generated",
        description: "Your PDF has been successfully summarized.",
      });
    } catch (error) {
      console.error('Error summarizing PDF:', error);
      toast({
        title: "Summarization Failed",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setSummary('');
  };

  return (
    <div className="min-h-screen relative">
      <WildlifeBackground />
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-glow/10"></div>
        <div className="relative container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="animate-bounce">
                <svg className="h-8 w-8 text-primary-glow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  PDF Summarizer
                </h1>
                <p className="text-sm text-muted-foreground">
                  AI-powered document summarization
                </p>
              </div>
            </div>
            
            {/* Auth Section */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">Welcome back!</p>
                    <p className="text-xs text-muted-foreground">{user.name || user.email}</p>
                  </div>
                  <UserProfile onLogout={handleLogout} />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="btn-forest-glow border-border hover:border-primary/50">
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="moss-gradient text-primary-foreground">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Upload Section */}
          <Card className="forest-shadow border-border/50 animate-grow-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Upload className="h-5 w-5 text-primary-glow" />
                Upload Your PDF
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`
                  relative border border-dashed rounded-lg p-12 text-center forest-transition
                  ${isDragOver ? 'border-primary/50 bg-primary/5' : 'border-muted-foreground/30 hover:border-primary/30'}
                  ${file ? 'border-primary/40 bg-primary/5' : ''}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {file ? (
                  <div className="space-y-4">
                    <CheckCircle className="mx-auto h-12 w-12 text-primary-glow animate-moss-grow" />
                    <div>
                      <p className="text-lg font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={clearFile}
                      className="btn-forest-glow border-border hover:border-primary/50"
                    >
                      Change File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground animate-sway" />
                    <div>
                      <p className="text-lg font-medium text-foreground">
                        Drop your PDF here or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports PDF files up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Summarize Button */}
          <div className="text-center">
            <Button
              onClick={handleSummarize}
              disabled={!file || isLoading}
              size="lg"
              className="moss-gradient hover:scale-105 forest-transition glow-shadow btn-forest-glow text-primary-foreground font-semibold px-8 py-4 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Summary...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-5 w-5" />
                  Summarize PDF
                </>
              )}
            </Button>
          </div>

          {/* Loading Animation */}
          {isLoading && (
            <Card className="forest-shadow border-border/50">
              <CardContent className="py-12">
                <div className="text-center space-y-6">
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-primary-glow rounded-full animate-forest-pulse"></div>
                    <div className="w-3 h-3 bg-primary rounded-full animate-forest-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-primary-glow rounded-full animate-forest-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <p className="text-muted-foreground">
                    Our AI is carefully reading through your document...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Summary Output */}
          {summary && !isLoading && (
            <Card className="forest-shadow border-border/50 animate-grow-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <FileText className="h-5 w-5 text-primary-glow" />
                  Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <div className="bg-muted/50 rounded-lg p-6 moss-shadow">
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                      {summary}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(summary)}
                    className="btn-forest-glow border-border hover:border-primary/50"
                  >
                    Copy Summary
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const blob = new Blob([summary], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${file?.name}_summary.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="btn-forest-glow border-border hover:border-primary/50"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PDFSummarizer;