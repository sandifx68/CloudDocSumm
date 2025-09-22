import { describe, it, expect, vi, beforeEach, afterEach, type MockedFunction } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Summaries from '../Summaries';
import { SummaryProvider } from '../../contexts/SummaryProvider';
import { useSummary } from '../../contexts/useSummary';
import type { SummaryObject } from '../../types';
import type { AuthContextValue } from '../../../auth/contexts/AuthContext';
import type { UseQueryResult } from '@tanstack/react-query';

// Mock auth hook used by the component
vi.mock('../../../auth/contexts/useAuth', () => ({
  useAuth: vi.fn(),
}));

// Mock documents hooks
vi.mock('../../hooks', () => ({
  useSummaries: vi.fn(),
}));

// Get typed references to mocks
import { useAuth } from '../../../auth/contexts/useAuth';
import { useSummaries } from '../../hooks';

const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;
const mockUseSummaries = useSummaries as MockedFunction<typeof useSummaries>;

function makeSummary(overrides: Partial<SummaryObject> = {}): SummaryObject {
  const base: SummaryObject = {
    title: 'Doc.pdf',
    summary: 'Short summary',
    url: 'https://example.com/file.pdf',
    dateUnix: Date.now(),
    userId: 'user-1',
  };
  return { ...base, ...overrides };
}

function renderWithProvider(ui: React.ReactElement) {
  return render(<SummaryProvider>{ui}</SummaryProvider>);
}

describe('Sidebar Summaries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("user not logged in doesn't see summaries", () => {
    const authValue: Partial<AuthContextValue> = { userLoggedIn: false };
    mockUseAuth.mockReturnValue(authValue as AuthContextValue);
    mockUseSummaries.mockReturnValue({} as unknown as UseQueryResult<SummaryObject[], Error>);

    renderWithProvider(<Summaries />);
    expect(
      screen.getByText(/you must be logged in to see summaries/i)
    ).toBeInTheDocument();
  });

  it('logged in without summaries sees empty message', () => {
    const authValue: Partial<AuthContextValue> = { userLoggedIn: true };
    mockUseAuth.mockReturnValue(authValue as AuthContextValue);
    const q: Partial<UseQueryResult<SummaryObject[], Error>> = { isLoading: false, error: null, data: undefined };
    mockUseSummaries.mockReturnValue(q as UseQueryResult<SummaryObject[], Error>);

    renderWithProvider(<Summaries />);
    expect(
      screen.getByText(/you have no past summaries to display/i)
    ).toBeInTheDocument();
  });

  it('logged in can see their summaries', () => {
    mockUseAuth.mockReturnValue({ userLoggedIn: true } as AuthContextValue);
    const s1 = makeSummary({ title: 'Alpha', dateUnix: 3 });
    const s2 = makeSummary({ title: 'Bravo', dateUnix: 2 });
    const q: Partial<UseQueryResult<SummaryObject[], Error>> = { isLoading: false, error: null, data: [s1, s2] };
    mockUseSummaries.mockReturnValue(q as UseQueryResult<SummaryObject[], Error>);

    renderWithProvider(<Summaries />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Bravo')).toBeInTheDocument();
  });

  it('displays error message when error occurs', () => {
    mockUseAuth.mockReturnValue({ userLoggedIn: true } as AuthContextValue);
    const err = new Error('Boom');
    const q: Partial<UseQueryResult<SummaryObject[], Error>> = { isLoading: false, error: err, data: undefined };
    mockUseSummaries.mockReturnValue(q as UseQueryResult<SummaryObject[], Error>);

    renderWithProvider(<Summaries />);
    expect(screen.getByText(/boom/i)).toBeInTheDocument();
  });

  it('renders summaries in descending order of date', () => {
    mockUseAuth.mockReturnValue({ userLoggedIn: true } as AuthContextValue);
    const newest = makeSummary({ title: 'Newest', dateUnix: 300 });
    const middle = makeSummary({ title: 'Middle', dateUnix: 200 });
    const oldest = makeSummary({ title: 'Oldest', dateUnix: 100 });
    const q: Partial<UseQueryResult<SummaryObject[], Error>> = { isLoading: false, error: null, data: [newest, middle, oldest] };
    mockUseSummaries.mockReturnValue(q as UseQueryResult<SummaryObject[], Error>);

    const { container } = renderWithProvider(<Summaries />);
    const text = container.textContent || '';
    expect(text.indexOf('Newest')).toBeLessThan(text.indexOf('Middle'));
    expect(text.indexOf('Middle')).toBeLessThan(text.indexOf('Oldest'));
  });

  it('scroll container is present for many summaries', () => {
    mockUseAuth.mockReturnValue({ userLoggedIn: true } as AuthContextValue);
    const many = Array.from({ length: 50 }, (_, i) => makeSummary({ title: `Item ${i}`, dateUnix: 1000 - i }));
    const q: Partial<UseQueryResult<SummaryObject[], Error>> = { isLoading: false, error: null, data: many };
    mockUseSummaries.mockReturnValue(q as UseQueryResult<SummaryObject[], Error>);

    const { container } = renderWithProvider(<Summaries />);
    const scrollingDiv = Array.from(container.querySelectorAll('div')).find((d) =>
      (d.getAttribute('class') || '').includes('overflow-y-auto')
    );
    expect(scrollingDiv).toBeTruthy();
  });

  it('updates SummaryProvider when a summary is clicked', () => {
    mockUseAuth.mockReturnValue({ userLoggedIn: true } as AuthContextValue);
    const first = makeSummary({ title: 'First', url: 'https://a', dateUnix: 2 });
    const second = makeSummary({ title: 'Second', url: 'https://b', dateUnix: 1 });
    const q: Partial<UseQueryResult<SummaryObject[], Error>> = { isLoading: false, error: null, data: [first, second] };
    mockUseSummaries.mockReturnValue(q as UseQueryResult<SummaryObject[], Error>);

    const Probe = () => {
      const { currentSummary } = useSummary();
      return <div data-testid="probe">{currentSummary?.title ?? 'none'}</div>;
    };

    render(
      <SummaryProvider>
        <Probe />
        <Summaries />
      </SummaryProvider>
    );

    expect(screen.getByTestId('probe').textContent).toBe('none');
    // Click on the second item
    fireEvent.click(screen.getByText('Second'));
    expect(screen.getByTestId('probe').textContent).toBe('Second');
  });
});
