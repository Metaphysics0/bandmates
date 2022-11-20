import NavMenu from "../ui/NavMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <NavMenu />
        {children}
      </body>
    </html>
  );
}
