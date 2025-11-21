import { useGetMeQuery } from '../../store';

export const Dashboard = () => {
  const { data } = useGetMeQuery();
  if (!data) {
    return null;
  }

  return <div>{data.user.username}</div>;
};
