import { SignOutBtn } from '@/features/auth/components/SignOutbtn';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { UserProfileBtn } from '@/features/auth/components/UserProfileBtn';
import { capitalize } from '@/utils/helpers';
import { Board } from '../types';

export const BoardHeader = ({ board }: { board: Board }) => {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;

  return (
    <header className="flex justify-between items-center bg-white p-4 border-b-2 shadow-2xs">
      <h3 className="font-semibold text-lg text-gray-900">{board?.title}</h3>

      <div className="flex items-center gap-4">
        <UserProfileBtn />
        <div className="text-gray-600">{capitalize(user.role)}</div>
        <SignOutBtn />
      </div>
    </header>
  );
};
