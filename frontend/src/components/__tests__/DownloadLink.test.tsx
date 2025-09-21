import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DownloadLink from '../DownloadLink';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('DownloadLink', () => {
  it('starts a download by fetching the URL', async () => {
    const url = 'https://example.com/files/report.pdf';
    const title = 'report.pdf';

    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({
        blob: async () => new Blob(['dummy']),
      } as unknown as Response);

    // Mock createObjectURL to avoid using real Blob URLs in tests
    vi.spyOn(window.URL, 'createObjectURL').mockReturnValue('blob:mock');

    render(<DownloadLink url={url} title={title} />);
    await userEvent.click(screen.getByText(title));

    expect(fetchMock).toHaveBeenCalledWith(url);
  });
});

