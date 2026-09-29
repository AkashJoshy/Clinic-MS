import { UserRound } from "lucide-react";

const ProfileHeader = () => {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1DC465]/10 text-[#1DC465]">
        <UserRound className="size-5" />
      </div>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          My Profile
        </h1>

        <p className="text-sm text-gray-500">
          Manage your personal information and account settings.
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;