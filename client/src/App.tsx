import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Landing from "./pages/Landing";
import Problem from "./pages/Problem";
import FreeOffer from "./pages/FreeOffer";
import MiniCrisis from "./pages/MiniCrisis";
import TwentyFourHourReset from "./pages/TwentyFourHourReset";
import RebuildMindset from "./pages/RebuildMindset";
import FinalSelection from "./pages/FinalSelection";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Landing} />
      <Route path={"/problem"} component={Problem} />
      <Route path={"/free-offer"} component={FreeOffer} />
      <Route path={"/mini-crisis"} component={MiniCrisis} />
      <Route path={"/24-hour-reset"} component={TwentyFourHourReset} />
      <Route path={"/rebuild-mindset"} component={RebuildMindset} />
      <Route path={"/final-selection"} component={FinalSelection} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
