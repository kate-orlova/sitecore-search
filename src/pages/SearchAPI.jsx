import styled from 'styled-components';
import { PageSection } from '../components/Common';
import { PAGE_EVENTS_API } from '../data/constants';
import withPageTracking from '../hocs/withPageTracking.jsx';

const APIPageSection = styled(PageSection)`
   width: 100%;
  display: block;
  text-align: left;
  padding: 20px;
  background-color: var(--sdc-palette-common-white)
`;

const API = () => {
  return ( 
    <APIPageSection><p>TBC</p></APIPageSection>
  );
};

export default withPageTracking(API, PAGE_EVENTS_API);
