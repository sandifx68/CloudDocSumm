import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Authenticator from '../UserStatus';
import type { User } from 'firebase/auth';

vi.mock('../../../../services/auth', () => ({
  doSignOut: vi.fn(),
}));
import { doSignOut } from '../../../../services/auth';
import { AuthContext, type AuthContextValue } from '../../contexts/AuthContext';
import { SummaryProvider } from '../../../documents/contexts/SummaryProvider';

function renderWithAuth(ui: React.ReactElement, auth: Partial<AuthContextValue> = {}) {
  const value: AuthContextValue = {
    currentUser: null,
    userLoggedIn: false,
    loading: false,
    setCurrentUser: () => {},
    ...auth,
  };
  return render(
    <AuthContext.Provider value={value}>
      <SummaryProvider>
        <MemoryRouter>
          {ui}
        </MemoryRouter>
      </SummaryProvider>
    </AuthContext.Provider>
  );
}

describe('UserStatus Authenticator', () => {
  it('shows Sign Up and Sign In when not logged in', () => {
    renderWithAuth(<Authenticator />, { userLoggedIn: false });
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });
  it('shows email and allows sign out when logged in', async () => {
    const mockUser = { email: 'test@gmail.com' } as unknown as User;
    const { container } = renderWithAuth(<Authenticator />, {
      userLoggedIn: true,
      currentUser: mockUser,
    });

    expect(screen.getByText('test@gmail.com')).toBeInTheDocument();

    const signOutIcon = container.querySelector('.cursor-pointer') as HTMLElement;
    expect(signOutIcon).toBeTruthy();
    await userEvent.click(signOutIcon);
    expect(doSignOut).toHaveBeenCalled();
  });
});
