import { API_URL } from '../../constants';

export const Landing = () => {
  return <a href={`${API_URL}/v1/auth/github`}>Login</a>;
};
