import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LogoutAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDark: boolean
}

const LogoutAlert: React.FC<LogoutAlertProps> = ({
  open,
  onOpenChange,
  onConfirm,
  isDark
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={`border-none ${isDark ? "bg-gray-900" : ""} `}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary">
            Log out of your account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You'll need to sign in again to access your dashboard, bookings, and
            profile.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-400! border-none text-white! hover:bg-gray-500! hover:border-none hover:text-gray!">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-500 hover:border-none"
            onClick={onConfirm}
          >
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutAlert;
