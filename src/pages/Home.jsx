import styled from 'styled-components';

import { HTMBlockWidget } from '@sitecore-search/react';
import { PAGE_EVENTS_HOME } from '../data/constants';
import withPageTracking from '../hocs/withPageTracking.jsx';
import HomeContent from '../components/HomeContent';

const Home = () => {
  return ( 
    <HomeContent />  
  );
};

export default withPageTracking(Home, PAGE_EVENTS_HOME);
