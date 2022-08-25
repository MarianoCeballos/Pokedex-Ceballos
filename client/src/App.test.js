import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store/store';
import SearchBar from '../src/components/SearchBar';

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);
describe('SearchBar', () => {
  it('Render component <SearchBar />', () => {
    const component = render(<SearchBar />);
    component.debug();
  });
});
