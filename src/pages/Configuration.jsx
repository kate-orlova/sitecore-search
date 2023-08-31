import styled from 'styled-components';
import { PageSection } from '../components/Common';
import { PAGE_EVENTS_CONFIG } from '../data/constants';
import withPageTracking from '../hocs/withPageTracking.jsx';

const ConfigPageSection = styled(PageSection)`
   width: 100%;
  display: block;
  text-align: left;
  padding: 20px;
  background-color: var(--sdc-palette-common-white)
`;

const Configuration = () => {
  return ( 
    <ConfigPageSection><p>TBC</p></ConfigPageSection>
  );
};

export default withPageTracking(Configuration, PAGE_EVENTS_CONFIG);
