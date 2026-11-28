import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  isPending?: boolean;
  isDark: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isPending = false,
  isDark,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogOverlay className="bg-black/40 backdrop-blur-sm" />

      <AlertDialogContent
        className={`max-w-md rounded-2xl border shadow-2xl ${
          isDark
            ? "border-white/10 bg-[#0d1a27] text-white"
            : "border-slate-200 bg-white text-slate-900"
        }`}
      >
        <AlertDialogHeader>
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>

          <AlertDialogTitle
            className={isDark ? "text-white" : "text-slate-900"}
          >
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription
            className={isDark ? "text-white/60" : "text-slate-500"}
          >
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            className={
              isDark
                ? "border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }
          >
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            className="bg-primary text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Please wait..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
