import { IProfile } from "../../../types/database";
import ProfileModal from "../../../ui/modals/ProfileModal";

export default function ProfileModalPage({
  params,
}: {
  params: { profile: IProfile };
}) {
  return (
    <>
      <h3>Profile!</h3>
      <ProfileModal profile={params.profile} />
    </>
  );
}
