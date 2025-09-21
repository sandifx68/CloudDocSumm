import { describe, it, expect, vi, type MockedFunction } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../SignUp';


vi.mock('../../services/auth', () => ({
  doSignUpWithEmailAndPassword: vi.fn(),
}));

import { doSignUpWithEmailAndPassword } from '../../services/auth';
import { AuthContext, type AuthContextValue } from '../../features/auth/contexts/AuthContext';

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
        <SignUp />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe('SignUp', () => {
  it('calls sign up with entered fields', async () => {
    const mockedSignUp = doSignUpWithEmailAndPassword as MockedFunction<typeof doSignUpWithEmailAndPassword>;
    mockedSignUp.mockResolvedValueOnce({} as unknown as Awaited<ReturnType<typeof doSignUpWithEmailAndPassword>>);
    renderWithAuth();

    await userEvent.type(screen.getByLabelText(/email/i), 'you@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'secret123');
    await userEvent.type(screen.getByLabelText(/password confirmation/i), 'secret123');

    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(doSignUpWithEmailAndPassword).toHaveBeenCalledWith('you@example.com', 'secret123', 'secret123');
  });

  it('shows error when passwords do not match', async () => {
    const mockedSignUp = doSignUpWithEmailAndPassword as MockedFunction<typeof doSignUpWithEmailAndPassword>;
    mockedSignUp.mockRejectedValueOnce(new Error('Passwords do not match!'));
    renderWithAuth();

    await userEvent.type(screen.getByLabelText(/email/i), 'you@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'secret123');
    await userEvent.type(screen.getByLabelText(/password confirmation/i), 'different');

    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });
});
