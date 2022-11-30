export default function AboutPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 min-h-screen">
      {children}
    </section>
  );
}
