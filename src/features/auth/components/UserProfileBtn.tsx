import { useAuthStore } from '@/features/auth/store/auth.store';

export const UserProfileBtn = () => {
  const user = useAuthStore((state) => state.user);
  //TODO: Button onCLick should go to user profile page
  return (
    <button className="w-8 h-8 rounded-full bg-sky-200 text-sky-700 text-sm">
      {user?.name.slice(0, 2)}
    </button>
  );
};
