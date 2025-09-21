import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Summary from '../Summary';
import type { SummaryObject } from '../../types';

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

  it('displays the formatted date', () => {
    render(<Summary summary={base} />);
    const d = new Date(base.dateUnix);
    const expected = `${d.toDateString()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('shows summary text', () => {
    render(<Summary summary={base} />);
    expect(screen.getByText(base.summary)).toBeInTheDocument();
  });

  it('shows the title', () => {
    render(<Summary summary={base} />);
    expect(screen.getByText(base.title)).toBeInTheDocument();
  });
});

