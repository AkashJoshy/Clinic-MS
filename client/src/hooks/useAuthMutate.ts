import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth/index";

interface UseMutateOptions<TData> {
  onSuccess?: (data: TData) => void;
}

export const useAuthMutate = <TData, TVariables>(
  service: (data: TVariables) => Promise<TData>,
  options?: UseMutateOptions<TData>,
) => {
  const login = useAuthStore(state => state.login);
  const setLoading = useAuthStore(state => state.setLoading);
  const user = useAuthStore(state => state.user);
  const updateToken = useAuthStore(state => state.updateToken)

  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: service,
    onSuccess: (data: any) => {
      setLoading(false);
      if (data.message) toast.success(data.message);
      if (data?.data?.accessToken) {
        if (!user) {
          login(data.data.accessToken, data.data.user, data.data.role);
        } else {
          if (data.data?.user) {
            const role = data.data.user.role.toLowerCase()
            updateToken(data.data.accessToken, role)
          }
        }
      }
      options?.onSuccess?.(data);
    },
    onError: (error: any) => {
      setLoading(false);
      toast.error(error.message);
    },
    onMutate: () => {
      setLoading(true);
    },
  });

  return { mutate, mutateAsync, isPending, setLoading };
};
