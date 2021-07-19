import { render } from '@testing-library/react';
import React from 'react';
import Categories from './Categories';

describe('<Categories />', () => {
  it('displays the header', () => {
    const { container } = render(<Categories />);
    expect(container).toHaveTextContent(/Tea Categories/);
  });

  it('renders consistently', () => {
    const { asFragment } = render(<Categories />);
    expect(asFragment()).toMatchSnapshot();
  });
});
