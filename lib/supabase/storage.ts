import { IProfile } from "../../types/database";
import { Users } from "./db";
import supabase from "./supabase-browser";

class UserStorage {
  private get storage() {
    return supabase.storage;
  }

  public async updateAvatar({
    file,
    profile,
  }: {
    file: File;
    profile: IProfile;
  }): Promise<string> {
    const filePath = `${profile.id}/${file.name}`;

    const { data: uploadData, error: uploadError } = await this.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true, cacheControl: "3600" });

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = this.storage.from("avatars").getPublicUrl(uploadData.path);

    const { error: updateUserError } = await Users.updateById(profile.id, {
      avatar_url: publicUrl,
    });

    if (updateUserError) {
      throw updateUserError;
    }

    return publicUrl;
  }

  public async uploadSoundSnippet({
    file,
    profile,
  }: {
    file: File;
    profile: IProfile;
  }) {
    const filePath = `${profile.id}/${file.name}`;

    const { data: uploadData, error: uploadError } = await this.storage
      .from("sound-snippets")
      .upload(filePath, file, { upsert: true, cacheControl: "3600" });

    if (uploadError) {
      throw uploadError;
    }
    const {
      data: { publicUrl },
    } = this.storage.from("sound-snippets").getPublicUrl(uploadData.path);

    const { error: updateUserError } = await Users.updateById(profile.id, {
      sound_snippets: [...(profile.sound_snippets || []), publicUrl],
    });

    if (updateUserError) {
      throw updateUserError;
    }

    return publicUrl;
  }
}

export default new UserStorage();
