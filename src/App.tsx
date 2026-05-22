import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import NotFound from "@/pages/not-found";

import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import Dashboard from "@/pages/Dashboard";
import AITools from "@/pages/AITools";
import PromptStudio from "@/pages/PromptStudio";
import Analytics from "@/pages/Analytics";

import WritingStudio from "@/pages/tools/WritingStudio";
import ReelGenerator from "@/pages/tools/ReelGenerator";
import ThumbnailMaker from "@/pages/tools/ThumbnailMaker";
import WebsiteBuilder from "@/pages/tools/WebsiteBuilder";
import CaptionGenerator from "@/pages/tools/CaptionGenerator";
import ViralHooksGenerator from "@/pages/tools/ViralHooksGenerator";
import VideoEditor from "@/pages/tools/VideoEditor";
import ScriptGenerator from "@/pages/tools/ScriptGenerator";
import PodcastGenerator from "@/pages/tools/PodcastGenerator";
import SocialMediaPlanner from "@/pages/tools/SocialMediaPlanner";

const queryClient = new QueryClient();

function Wrap({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/dashboard"><Wrap><Dashboard /></Wrap></Route>
      <Route path="/tools"><Wrap><AITools /></Wrap></Route>
      <Route path="/prompt"><Wrap><PromptStudio /></Wrap></Route>
      <Route path="/analytics"><Wrap><Analytics /></Wrap></Route>

      <Route path="/tools/writing"><Wrap><WritingStudio /></Wrap></Route>
      <Route path="/tools/reel"><Wrap><ReelGenerator /></Wrap></Route>
      <Route path="/tools/thumbnail"><Wrap><ThumbnailMaker /></Wrap></Route>
      <Route path="/tools/website"><Wrap><WebsiteBuilder /></Wrap></Route>
      <Route path="/tools/caption"><Wrap><CaptionGenerator /></Wrap></Route>
      <Route path="/tools/hooks"><Wrap><ViralHooksGenerator /></Wrap></Route>
      <Route path="/tools/video-editor"><Wrap><VideoEditor /></Wrap></Route>
      <Route path="/tools/script"><Wrap><ScriptGenerator /></Wrap></Route>
      <Route path="/tools/podcast"><Wrap><PodcastGenerator /></Wrap></Route>
      <Route path="/tools/planner"><Wrap><SocialMediaPlanner /></Wrap></Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
