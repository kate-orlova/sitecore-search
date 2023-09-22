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
    <ConfigPageSection>
	
<h1>Search Configuration</h1>
<h2>How to create a content index in the Sitecore Search?</h2>
<p>In the Sitecore Search, you define your content index by creating a Source. A Source is a configuration setting that tells what content you would like to make searchable in the Sitecore Search. You can create multiple Sources within your Sitecore Search domain to access content from different locations such as your XML Sitemap, third party APIs, Sitecore Items, database, and various assets in different formats (HTML, PDF, Excel, Word, JSON etc.).</p>
<p>Once a Source is configured as expected, the Sitecore Search will create indexes and index documents behind the scenes, i.e. you do not need to worry neither about the actual physical index as the Sitecore Search will take a good care of it for you.</p>

<h2>How to configure a Source?</h2>
<p>To create and manage Sources go to the Sources section in the Customer Engagement Console (CEC). While configuring a new Source you have to specify the following settings:</p>

<h3>How to push your custom data to the Sitecore Search over API?</h3>
<p>TBC</p>

</ConfigPageSection>
  );
};

export default withPageTracking(Configuration, PAGE_EVENTS_CONFIG);
