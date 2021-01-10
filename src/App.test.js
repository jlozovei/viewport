import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/svelte';

import App from './App.svelte';

describe('App', () => {
  it('renders', () => {
    const { getByText } = render(App);

    expect(getByText('What is my viewport?')).toBeInTheDocument();
    expect(getByText('MDN documentation')).toBeInTheDocument();
  });
});
