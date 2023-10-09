import "@styles/globals.css";

import Nav from "@components/Nav";
import { ReduxProvider } from "@redux/provider";

export const metadata = {
  title: "Blog",
  description: "Discover & Share your posts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <main className="app">
            <Nav />
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
