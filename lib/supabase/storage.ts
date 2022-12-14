import { IProfile } from "../../types/database";
import { IStorageBucket } from "../../types/types";
import { Users } from "./db";
import supabase from "./supabase-browser";

class UserStorage {
  storage: any;
  constructor() {
    this.storage = supabase.storage;
  }

  public async updateAvatar({
    file,
    profile,
  }: {
    file: File;
    profile: IProfile;
  }): Promise<string> {
    const uploadedAvatarUrl = await this.uploadFile(file, profile, "avatars");

    const { error: updateUserError } = await Users.updateById(profile.id, {
      avatar_url: uploadedAvatarUrl,
    });

    if (updateUserError) {
      throw updateUserError;
    }

    return uploadedAvatarUrl;
  }

  public async uploadSoundSnippet({
    file,
    profile,
  }: {
    file: File;
    profile: IProfile;
  }) {
    const uploadedSoundUrl = await this.uploadFile(
      file,
      profile,
      "sound-snippets"
    );

    const { error: updateUserError } = await Users.updateById(profile.id, {
      sound_snippets: [...(profile?.sound_snippets || []), uploadedSoundUrl],
    });

    if (updateUserError) {
      throw updateUserError;
    }

    return uploadedSoundUrl;
  }

  private async uploadFile(
    file: File,
    profile: IProfile,
    bucket: IStorageBucket
  ): Promise<string> {
    const filePath = this.createFilePath(profile, file);

    const { data: uploadData, error: uploadError } = await this.storage
      .from(bucket)
      .upload(filePath, file, { upsert: true, cacheControl: "3600" });

    if (uploadError) {
      throw uploadError;
    }
    const {
      data: { publicUrl },
    } = this.storage.from(bucket).getPublicUrl(uploadData.path);

    return publicUrl;
  }

  private createFilePath(profile: IProfile, file: File): string {
    return `${profile.id}/${file.name}`;
  }
}

export default new UserStorage();
