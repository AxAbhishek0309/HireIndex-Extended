import { useState, lazy, Suspense } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/AuthContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ResumeAnalyzer from "@/pages/ResumeAnalyzer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/layout/ChatWidget";

const Resources = lazy(() => import("./pages/Resources"));
const About = lazy(() => import("./pages/About"));
const History = lazy(() => import("./pages/History"));
const Login = lazy(() => import("./pages/Login"));

const Loading: React.FC = () => <div className="container mx-auto p-8 text-center">Loading...</div>;

function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/resume-analyzer" component={ResumeAnalyzer} />
        <Route path="/resources" component={Resources} />
        <Route path="/history" component={History} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header onChatToggle={() => setIsChatOpen(prev => !prev)} />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
