import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { theme } from '@sitecore-search/ui';
import { PAGE_EVENTS_SEARCH } from '../data/constants';
import withPageTracking from '../hocs/withPageTracking.jsx';
import { PageSection } from '../components/Common';
import LocationSearchResults from '../widgets/LocationSearchResults/index.jsx';

const LocationSearchPageSection = styled(PageSection)`
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

const LocationSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <LocationSearchPageSection>
      <div>
        <SearchPageTitle>{`Showing results for "${query}"`}</SearchPageTitle>
        <LocationSearchResults key={`${query}-search`} rfkId="location_search"  />
      </div>
    </LocationSearchPageSection>
  );
};

export default withPageTracking(LocationSearch, PAGE_EVENTS_SEARCH);
