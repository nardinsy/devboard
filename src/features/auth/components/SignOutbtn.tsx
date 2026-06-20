import { Spinner } from '@/components/ui/spinner';
import { useLogout } from '../hooks/useLogout';

export const SignOutBtn = () => {
  const { mutate: logout, isPending } = useLogout();
  return (
    <button
      onClick={() => logout()}
      disabled={isPending}
      className="min-w-24 h-9 px-4 py-2 flex justify-center items-center text-gray-800 font-medium border border-gray-300 hover:bg-gray-300 rounded-md shadow-xs cursor-pointer disabled:opacity-50"
    >
      {isPending ? <Spinner /> : 'Sign out'}
    </button>
  );
};
