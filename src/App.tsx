import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "@/routes";
import theme from "@/styles/theme";
import AuthProvider from "@/providers/AuthProvider";
import Auth0ProviderWithNavigate from "@/providers/Auth0Provider";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRoutes />
          </ThemeProvider>
        </AuthProvider>
      </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  </Provider>
);

export default App;
