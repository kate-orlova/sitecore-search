import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import { ThemeContext } from '../../contexts/theme-context.js';
import HeaderInput from '../HeaderInput/index.jsx';
import { HeaderContent, HeaderContentWrapper, HeaderWrapper } from './styled';

const Header = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);
  setTheme('dark');

  return (
    <HeaderWrapper>
      <HeaderContentWrapper>
        <HeaderContent>
          <a href="#" onClick={() => navigate(``)} tabIndex={1}>
            <img src="/search-icon.svg" tabIndex={-1} alt="Sitecore Search" />
          </a>
          <HeaderInput />
        </HeaderContent>
      </HeaderContentWrapper>
    </HeaderWrapper>
  );
};

export default Header;
