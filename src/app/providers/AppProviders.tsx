import type { ReactNode } from "react";
import { HashRouter } from "react-router-dom";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return <HashRouter>{children}</HashRouter>;
}
