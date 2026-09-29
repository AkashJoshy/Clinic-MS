import type { AdminPageHeaderProps } from "@/types/admin";

const AdminPageHeader = ({
  icon: Icon,
  title,
  description,
}: AdminPageHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[#1dc465]/25 bg-[#1dc465]/15">
        <Icon size={24} className="text-[#1dc465]" />
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          {title}
        </h1>

        <p className="mt-0.5 text-sm text-[#8b9ab0]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AdminPageHeader;