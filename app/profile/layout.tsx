import TabMenu from "../../ui/TabMenu/TabMenu";

export default async function ProfilePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
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
