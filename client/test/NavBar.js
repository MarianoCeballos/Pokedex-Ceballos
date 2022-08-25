import { render as rtlRender, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store/store';
const store = createStore(rootReducer, initialState);
const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

it('Render component <SearchBar />', () => {
  const component = render(<SearchBar />);
  component.debug();
});
