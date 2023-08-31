import {
  FooterWrapper,
  FooterColumnList,
  FooterColumnTitle,
  FooterColumn,
  FooterColumnItem,
  FooterColumnLink,
  FooterContent,
} from './styled';

import footerData from '../../data/footer.json';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        {footerData.map((list, index) => (
          <FooterColumn key={`${list.mainTitle}-${index}`}>
            <FooterColumnTitle>{list.mainTitle}</FooterColumnTitle>
            <FooterColumnList>
              {list.items.map((item, index) => (
                <FooterColumnItem key={`${item}-${index}`}>
                  <FooterColumnLink href={item}>{item}</FooterColumnLink>
                </FooterColumnItem>
              ))}
            </FooterColumnList>
          </FooterColumn>
        ))}
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
