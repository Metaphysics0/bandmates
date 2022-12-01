import TabMenu from "../../ui/TabMenu/TabMenu";

export default function ProfilePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
      <TabMenu
        path="/profile"
        items={[
          {
            text: "Profile",
          },
          {
            text: "Liked Artists",
            slug: "likes",
          },
        ]}
      />

      {children}
    </section>
  );
}
