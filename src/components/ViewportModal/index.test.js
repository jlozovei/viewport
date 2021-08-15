import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/svelte';

import ViewportModal from './index.svelte';

describe('ViewportModal', () => {
  it('renders', () => {
    const { getByTestId } = render(ViewportModal);

    expect(getByTestId('viewport-name')).toBeInTheDocument();
    expect(getByTestId('viewport-size')).toBeInTheDocument();
  });
});
