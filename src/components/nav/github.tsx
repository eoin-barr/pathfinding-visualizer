import { FiGithub } from 'react-icons/fi';
import React, { useContext, useEffect } from 'react';

import { AuthContext } from '../../hooks';
import { supabase } from '../../lib/client';
import { FillLoadingSpinner } from '../loading';

interface Props {
  disabled: boolean;
  signInLoading: boolean;
  setSignInLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function GithubAuth(props: Props) {
  const { disabled, signInLoading, setSignInLoading } = props;
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const disabledTheme = `${
    disabled
      ? 'cursor-default	pointer-events-none text-gray-400 dark:text-system-grey5'
      : ''
  }`;
  const baseTheme = `flex items-center lg:min-w-[175px] lg:max-w-[175px] min-w-[192px] max-w-[192px] bg-system-grey2 dark:bg-system-grey6 text-gray-700 dark:text-system-grey2 hover:bg-system-grey3 dark:hover:bg-system-grey5 focus:outline-none px-3.5 rounded-lg py-2 text-sm leading-5`;
  const classes = `${baseTheme} ${disabledTheme}`;

  async function signInWithGitHub() {
    const url =
      process && process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_DEV_URL
        : process.env.NEXT_PUBLIC_PROD_URL;
    setSignInLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: url,
      },
    });

    if (error) {
      setSignInLoading(false);
      console.log('error', error);
    }
    if (data) {
      setIsAuthenticated(true);
    }
  }

  async function signout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Error signing out:', error.message);
    setIsAuthenticated(false);
  }

  const checkUser = async () => {
    const {
      error,
      data: { user },
    } = await supabase.auth.getUser();
    if (error) {
      console.log('error', error);
      return;
    }
    if (user) {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', () => {
      checkUser();
    });
  }, []);

  return (
    <>
      {signInLoading ? (
        <button onClick={signout} className={`${classes} justify-center min-h-[36px]`}>
          <FillLoadingSpinner size="small" />
        </button>
      ) : isAuthenticated ? (
        <button onClick={signout} className={`${classes} justify-start `}>
          <p>Logout</p>
        </button>
      ) : (
        <button onClick={signInWithGitHub} className={`${classes} justify-center`}>
          <p className="pr-2">Login with Github</p> <FiGithub className="h-4 w-4" />{' '}
        </button>
      )}
    </>
  );
}
