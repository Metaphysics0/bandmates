export default async function ProfilePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="p-2">{children}</section>;
}
