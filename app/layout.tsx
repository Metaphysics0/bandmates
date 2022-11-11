import "../styles/globals.css";
import NavBar from "../ui/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
