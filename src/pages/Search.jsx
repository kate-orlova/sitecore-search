import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { theme } from '@sitecore-search/ui';
import { PAGE_EVENTS_SEARCH } from '../data/constants';
import withPageTracking from '../hocs/withPageTracking.jsx';
import { PageSection } from '../components/Common';
import SearchResults from '../widgets/SearchResults/index.jsx';

const SearchPageSection = styled(PageSection)`
  max-width: 1248px;
  margin: auto;
  padding-top: 40px;
`;

const SearchPageTitle = styled.h2`
  color: ${theme.vars.palette.primary.contrastText};
  font-size: ${theme.vars.typography.fontSize6.fontSize};
  width: 100%;
  text-align: left;
`;

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <SearchPageSection>
      <div>
        <SearchPageTitle>{`Showing results for "${query}"`}</SearchPageTitle>
        <SearchResults key={`${query}-search`} rfkId="rfkid_7" defaultKeyphrase={query} />
      </div>
    </SearchPageSection>
  );
};

export default withPageTracking(Search, PAGE_EVENTS_SEARCH);
