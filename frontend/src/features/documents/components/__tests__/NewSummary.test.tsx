import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewSummary from '../NewSummary';
import { AuthContext, type AuthContextValue } from '../../../../contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the React Query hook so we can assert the request
const mutateSpy = vi.fn();
vi.mock('../../hooks', () => ({
  useCreateSummary: () => ({
    mutate: mutateSpy,
    data: undefined,
    isSuccess: false,
    isPending: false,
    isError: false,
    error: null,
  }),
}));

// Helper to render with providers
function renderWithProviders(ui: React.ReactElement, auth: Partial<AuthContextValue>) {
  const authValue: AuthContextValue = {
    currentUser: null,
    userLoggedIn: false,
    loading: false,
    setCurrentUser: () => {},
    ...auth,
  };
  const qc = new QueryClient();
  return render(
    <AuthContext.Provider value={authValue}>
      <QueryClientProvider client={qc}>{ui}</QueryClientProvider>
    </AuthContext.Provider>
  );
}

describe('NewSummary', () => {
  it('disables upload control when user not logged in', () => {
    const setSummary = vi.fn();
    const { container } = renderWithProviders(<NewSummary setSummary={setSummary} />, { userLoggedIn: false });
    // Input should be disabled
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeDisabled();
    // Label should indicate login required
    expect(screen.getByText(/log in to upload a file/i)).toBeInTheDocument();
  });

  it('Get summary button is disabled without a file', () => {
    const setSummary = vi.fn();
    renderWithProviders(<NewSummary setSummary={setSummary} />, { userLoggedIn: true });
    expect(screen.getByRole('button', { name: /get summary/i })).toBeDisabled();
  });

  it('shows chosen PDF file name', async () => {
    const setSummary = vi.fn();
    renderWithProviders(<NewSummary setSummary={setSummary} />, { userLoggedIn: true });

    const input = screen.getByLabelText(/choose file to upload/i, { selector: 'input' }) as HTMLInputElement;
    const pdf = new File(["%PDF-1.4"], "doc.pdf", { type: "application/pdf" });
    await userEvent.upload(input, pdf);

    expect(await screen.findByText(/file chosen:/i)).toBeInTheDocument();
    expect(screen.getByText('doc.pdf')).toBeInTheDocument();
  });

  it('sends request when clicking Get summary after selecting a file', async () => {
    const setSummary = vi.fn();
    renderWithProviders(<NewSummary setSummary={setSummary} />, { userLoggedIn: true });
    const input = screen.getByLabelText(/choose file to upload/i, { selector: 'input' }) as HTMLInputElement;
    const pdf = new File(["%PDF-1.4"], "doc.pdf", { type: "application/pdf" });
    await userEvent.upload(input, pdf);

    const button = screen.getByRole('button', { name: /get summary/i });
    expect(button).not.toBeDisabled();

    await userEvent.click(button);
    expect(mutateSpy).toHaveBeenCalled();
    // Ensure called with a DTO carrying the selected file
    const firstCallArg = (mutateSpy.mock.calls[0] as unknown[])[0] as { file: File };
    expect(firstCallArg.file).toBeInstanceOf(File);
    expect(firstCallArg.file.name).toBe('doc.pdf');
  });
});
