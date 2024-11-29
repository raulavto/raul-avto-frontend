'use client';
import { Provider } from 'react-redux';
import store from '@/Redux/store';

export interface RootLayoutProps {
  children: React.ReactNode;
}

const ReduxProvider = ({ children }: RootLayoutProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
