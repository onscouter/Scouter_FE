import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "@/routes";
import theme from "@/styles/theme";
import AuthBootstrap from "@/providers/AuthBootstrap";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthBootstrap>
          <AppRoutes />
        </AuthBootstrap>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
