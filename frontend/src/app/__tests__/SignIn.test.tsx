import { describe, it, expect, vi, type MockedFunction } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SignIn from '../SIgnIn';
import { AuthContext, type AuthContextValue } from '../../contexts/AuthContext';

vi.mock('../../services/auth', () => ({
  doSignInWithEmailAndPassword: vi.fn(),
}));

import { doSignInWithEmailAndPassword } from '../../services/auth';

function renderWithAuth() {
  const value: AuthContextValue = {
    currentUser: null,
    userLoggedIn: false,
    loading: false,
    setCurrentUser: () => {},
  };
  return render(
    <AuthContext.Provider value={value}>
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe('SignIn', () => {
  it('calls sign in with entered fields', async () => {
    const mockedSignIn = doSignInWithEmailAndPassword as MockedFunction<typeof doSignInWithEmailAndPassword>;
    mockedSignIn.mockResolvedValueOnce({} as unknown as Awaited<ReturnType<typeof doSignInWithEmailAndPassword>>);
    renderWithAuth();

    await userEvent.type(screen.getByLabelText(/email/i), 'you@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'secret123');

    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(doSignInWithEmailAndPassword).toHaveBeenCalledWith('you@example.com', 'secret123');
  });
});
