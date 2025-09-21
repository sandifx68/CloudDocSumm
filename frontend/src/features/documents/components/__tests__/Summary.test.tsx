import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Summary from '../Summary';
import { useSummary } from '../../contexts/useSummary';
import type { SummaryObject } from '../../types';
import { SummaryProvider } from '../../contexts/SummaryProvider';

describe('Summary page', () => {
  const base: SummaryObject = {
    title: 'My Doc.pdf',
    summary: 'This is a concise summary.',
    url: 'https://example.com/file.pdf',
    dateUnix: 1_725_000_000_000, // fixed timestamp for predictable output
    userId: 'user-1',
  };

  let logSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    logSpy.mockRestore();
  });

  const renderWithProvider = (summary: SummaryObject) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      const { setCurrentSummary } = useSummary();
      setCurrentSummary(summary);
      return children;
    };

    return render(
      <SummaryProvider>
        <Wrapper>
          <Summary />
        </Wrapper>
      </SummaryProvider>
    );
  };

  it('displays the formatted date', () => {
    renderWithProvider(base);
    const d = new Date(base.dateUnix);
    const expected = `${d.toDateString()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('shows summary text', () => {
    renderWithProvider(base);
    expect(screen.getByText(base.summary)).toBeInTheDocument();
  });

  it('shows the title', () => {
    renderWithProvider(base);
    expect(screen.getByText(base.title)).toBeInTheDocument();
  });
});

