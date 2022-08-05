import React from 'react';
import { queryByTestId, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.queryByTestId('loader')).toBeInTheDocument();
});
