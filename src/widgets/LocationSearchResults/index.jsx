import React, { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, GridIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { Presence } from '@radix-ui/react-presence';
import { PageController, FilterGeo, WidgetDataType, useSearchResults, useSearchResultsSelectedFacets, widget } from '@sitecore-search/react';
import { AccordionFacets, CardViewSwitcher, Pagination, Select, SortSelect } from '@sitecore-search/ui';

import styled from 'styled-components';
import { theme } from '@sitecore-search/ui';

import { LanguageContext } from '../../contexts/languageContext';
import { DEFAULT_IMAGE, HIGHLIGHT_DATA } from '../../data/constants';
import { HighlightComponent, getDescription } from '../utils';
import distances from '../../data/distances.js';
import locations from '../../data/locations.js';

import {
  AccordionFacetsStyled,
  ArticleCardRowStyled,
  ArticleCardStyled,
  CardViewSwitcherStyled,
  FiltersStyled,
  GridStyled,
  LoaderAnimation,
  LoaderContainer,
  PageControlsStyled,
  PaginationStyled,
  QuerySummaryStyled,
  RowStyled,
  SearchResultsLayout,
  SelectStyled,
  SortSelectStyled,
} from './styled';
import PropTypes from 'prop-types';

const SearchPageTitle = styled.div`
  color: ${theme.vars.palette.primary.contrastText};
  font-size: ${theme.vars.typography.fontSize6.fontSize};
  width: 100%;
  text-align: left;
`;

export const LocationSearchResults = ({
  defaultSortType = 'distance_asc',
  defaultPage = 1,
  defaultKeyphrase = '',
  defaultItemsPerPage = 24,
  defaultDistance = distances.find((d) => {let [searchParams] = useSearchParams(); return d.value === (searchParams.get('distance') || '10mi')}),
  defaultLocation = locations.find((l) => {let [searchParams] = useSearchParams(); return l.label === (searchParams.get('location') || 'Cardiff')})
}) => {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const {
	widgetRef,
    actions: {
      onResultsPerPageChange,
      onPageNumberChange,
      onItemClick,
      onFilterClick,
      onSortChange,
      onFacetClick,
      onClearFilters
    },
    state: { sortType, page, itemsPerPage },
    queryResult: {
      isLoading,
      isFetching,
      data: {
        total_item: totalItems = 0, 
        sort: { choices: sortChoices = [] } = {},
        facet: facets = [], 
        content: articles = [] 
	  } = {},
    },
	query: query,
	onDistanceChange = (distanceOption) => {
	  setDistance(distanceOption);
	  query.getRequest().setSearchFilter(new FilterGeo('location', distanceOption.value, location.lat, location.lon));
    },
	onLocationChange = (locationOption) => {
	  setLocation(locationOption);
	  query.getRequest().setSearchFilter(new FilterGeo('location', distance.value, locationOption.lat, locationOption.lon));
    }
  } = useSearchResults({
      query: (query) => {	  
        query
          .getRequest()
          .setSearchFilter( new FilterGeo('location', defaultDistance.value, defaultLocation.lat, defaultLocation.lon) )
          .setSearchQueryHighlightFragmentSize(500)
          .setSearchQueryHighlightFields(['subtitle', 'description'])
          .setSearchQueryHighlightPreTag(HIGHLIGHT_DATA.pre)
          .setSearchQueryHighlightPostTag(HIGHLIGHT_DATA.post);
      },
      state: {
          sortType: defaultSortType,
          page: defaultPage,
          itemsPerPage: defaultItemsPerPage,
          keyphrase: defaultKeyphrase,
      },
  });
  const totalPages = Math.ceil(totalItems / (itemsPerPage !== 0 ? itemsPerPage : 1));
  const selectedSortIndex = sortChoices.findIndex((s) => s.name === sortType);
  const selectedFacetsFromApi = useSearchResultsSelectedFacets();
  const defaultCardView = CardViewSwitcher.CARD_VIEW_LIST;
  const [dir, setDir] = useState(defaultCardView);
  const [distance, setDistance] = useState(defaultDistance);
  const [location, setLocation] = useState(defaultLocation);
  const onToggle = (value = defaultCardView) => setDir(value);
  
  PageController.getContext().setGeoLocationLat(location.lat);
  PageController.getContext().setGeoLocationLon(location.lon);

  return (
    <>	
	  <SearchPageTitle>{`Showing results for `}
		<SelectStyled.Root defaultValue={defaultLocation} onValueChange={onLocationChange}>
			<SelectStyled.Trigger>
			  <SelectStyled.SelectValue>{location.label}</SelectStyled.SelectValue>
			  <SelectStyled.Icon />
			</SelectStyled.Trigger>
			<SelectStyled.Content>
			  <SelectStyled.Viewport>
				  {locations.map((option) => (
				  <SelectStyled.Option value={option} key={`${option.label}`}>
					<SelectStyled.OptionText>{option.label}</SelectStyled.OptionText>
				  </SelectStyled.Option>
				  ))}
			  </SelectStyled.Viewport>
			</SelectStyled.Content>
		  </SelectStyled.Root>
		  {` in `}
		  <SelectStyled.Root defaultValue={defaultDistance} onValueChange={onDistanceChange}>
			<SelectStyled.Trigger>
			  <SelectStyled.SelectValue>{distance.label}</SelectStyled.SelectValue>
			  <SelectStyled.Icon />
			</SelectStyled.Trigger>
			<SelectStyled.Content>
			  <SelectStyled.Viewport>
				{distances.map((option) => (
				  <SelectStyled.Option value={option} key={`${option.value}`}>
					<SelectStyled.OptionText>{option.label}</SelectStyled.OptionText>
				  </SelectStyled.Option>
				))}
			  </SelectStyled.Viewport>
			</SelectStyled.Content>
		  </SelectStyled.Root>
	  </SearchPageTitle>	
      {isLoading && (
        <LoaderContainer>
          <Presence present={isLoading}>
            <LoaderAnimation
              aria-busy={isLoading}
              aria-hidden={!isLoading}
              focusable="false"
              role="progressbar"
              viewBox="0 0 20 20"
            >
              <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
            </LoaderAnimation>
          </Presence>
        </LoaderContainer>
      )}
      {!isLoading && (
        <>		  
          <SearchResultsLayout.MainArea ref={widgetRef}>
            {isFetching && (
              <LoaderContainer>
                <Presence present={true}>
                  <LoaderAnimation
                    aria-busy={true}
                    aria-hidden={false}
                    focusable="false"
                    role="progressbar"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
                  </LoaderAnimation>
                </Presence>
              </LoaderContainer>
            )}			
			{totalItems > 0 && (
			<>	
            <SearchResultsLayout.LeftArea>
              {selectedFacetsFromApi.length > 0 && (
                <FiltersStyled.ClearFilters onClick={onClearFilters}>Clear Filters</FiltersStyled.ClearFilters>
              )}
              <FiltersStyled.SelectedFiltersList>
                {selectedFacetsFromApi.map((selectedFacet) =>
                  selectedFacet.values.map((v) => (
                    <FiltersStyled.SelectedFiltersListItem key={`${selectedFacet.id}@${v.id}`}>
                      <FiltersStyled.SelectedFiltersListItemText>
                        {selectedFacet.name}: {v.text}
                      </FiltersStyled.SelectedFiltersListItemText>
                      <FiltersStyled.SelectedFiltersListItemButton
                        onClick={() => onFilterClick({ facetId: selectedFacet.id, facetValueId: v.id, checked: false })}
                      >
                        X
                      </FiltersStyled.SelectedFiltersListItemButton>
                    </FiltersStyled.SelectedFiltersListItem>
                  )),
                )}
              </FiltersStyled.SelectedFiltersList>
              <AccordionFacetsStyled.Root
                defaultFacetTypesExpandedList={[]}
                onFacetTypesExpandedListChange={() => {}}
                onFacetValueClick={onFacetClick}
              >
                {facets.map((f) => (
                  <AccordionFacetsStyled.Facet facetId={f.name} key={f.name}>
                    <AccordionFacetsStyled.Header>
                      <AccordionFacetsStyled.Trigger>{f.label}</AccordionFacetsStyled.Trigger>
                    </AccordionFacetsStyled.Header>
                    <AccordionFacets.Content>
                      <AccordionFacetsStyled.ValueList>
                        {f.value.map((v, index) => (
                          <AccordionFacetsStyled.Item {...{ index, facetValueId: v.id }} key={v.id}>
                            <AccordionFacetsStyled.ItemCheckbox>
                              <AccordionFacetsStyled.ItemCheckboxIndicator>
                                <CheckIcon />
                              </AccordionFacetsStyled.ItemCheckboxIndicator>
                            </AccordionFacetsStyled.ItemCheckbox>
                            <AccordionFacetsStyled.ItemCheckboxLabel>
                              {v.text} {v.count && `(${v.count})`}
                            </AccordionFacetsStyled.ItemCheckboxLabel>
                          </AccordionFacetsStyled.Item>
                        ))}
                      </AccordionFacetsStyled.ValueList>
                    </AccordionFacets.Content>
                  </AccordionFacetsStyled.Facet>
                ))}
              </AccordionFacetsStyled.Root>
            </SearchResultsLayout.LeftArea>
            <SearchResultsLayout.RightArea>
              <SearchResultsLayout.RightTopArea>
                {totalItems && (
                  <QuerySummaryStyled>
                    <b>
                      Showing {itemsPerPage * (page - 1) + 1} - {itemsPerPage * (page - 1) + articles.length} of{' '}
                      {totalItems} results
                    </b>
                  </QuerySummaryStyled>
                )}

                <SearchResultsLayout.Toolbar>
                  {/* Card View Switcher */}
                  <CardViewSwitcherStyled.Root onValueChange={onToggle} defaultValue={defaultCardView}>
                    <CardViewSwitcherStyled.Item value="grid" aria-label="Grid View">
                      <GridIcon />
                    </CardViewSwitcherStyled.Item>
                    <CardViewSwitcherStyled.Item value="list" aria-label="List View">
                      <ListBulletIcon />
                    </CardViewSwitcherStyled.Item>
                  </CardViewSwitcherStyled.Root>

                  {/* Sort Select */}
                  <SortSelect.Root defaultValue={sortChoices[selectedSortIndex]?.name} onValueChange={onSortChange}>
                    <SortSelectStyled.Trigger>
                      <SortSelectStyled.SelectValue>
					    {selectedSortIndex > -1 ? sortChoices[selectedSortIndex].label : ''}
                      </SortSelectStyled.SelectValue>
                      <SortSelectStyled.Icon />
                    </SortSelectStyled.Trigger>
                    <SortSelectStyled.Content>
                      <SortSelectStyled.Viewport>
                        {sortChoices.map((option) => (
                          <SortSelectStyled.Option value={option} key={`${option.label}@${language}`}>
                            <SortSelectStyled.OptionText>{option.label}</SortSelectStyled.OptionText>
                          </SortSelectStyled.Option>
                        ))}
                      </SortSelectStyled.Viewport>
                    </SortSelectStyled.Content>
                  </SortSelect.Root>
                </SearchResultsLayout.Toolbar>
              </SearchResultsLayout.RightTopArea>

              {/* Results */}
              {dir === CardViewSwitcher.CARD_VIEW_GRID ? (
                <GridStyled>
                  {articles.map((a, index) => (
                    <ArticleCardStyled.Root key={`${a.id}@${a.source_id}@${language}`}>
                      <ArticleCardStyled.ImageWrapper>
                        <ArticleCardStyled.Image src={a.image_url || a.image || DEFAULT_IMAGE} />
                      </ArticleCardStyled.ImageWrapper>
                      <ArticleCardStyled.Title>
                        <ArticleCardStyled.Link
                          title={a.title}
                          to={`/detail/${a.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onItemClick({ id: a.id || '', index });
                            navigate(`/detail/${a.id}`);
                          }}
                        >
                          {a.title}
                        </ArticleCardStyled.Link>
                      </ArticleCardStyled.Title>
                      <ArticleCardStyled.Subtitle>
                        <HighlightComponent
                          text={getDescription(a, 'subtitle')}
                          preSeparator={HIGHLIGHT_DATA.pre}
                          postSeparator={HIGHLIGHT_DATA.post}
                          highlightElement={HIGHLIGHT_DATA.highlightTag}
                        />
						<p>{a.from_price ? '£' + a.from_price : ''}</p>
                      </ArticleCardStyled.Subtitle>					  
                      <ArticleCardStyled.Type>{a.location ? a.location : 'Unknown'}</ArticleCardStyled.Type>
                    </ArticleCardStyled.Root>
                  ))}
                </GridStyled>
              ) : (
                <RowStyled>
                  {articles.map((a, index) => (
                    <ArticleCardRowStyled.Root key={`${a.id}@${a.source_id}@${language}`}>
                      <ArticleCardRowStyled.Left>
                        <ArticleCardRowStyled.Image src={a.image_url || a.image || DEFAULT_IMAGE} />
                      </ArticleCardRowStyled.Left>
                      <ArticleCardRowStyled.Right>
                        <ArticleCardRowStyled.Title>
                          <ArticleCardRowStyled.Link
                            to={`/detail/${a.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              onItemClick({ id: a.id || '', index });
                              navigate(`/detail/${a.id}`);
                            }}
                          >
                            {a.title}
                          </ArticleCardRowStyled.Link>
                        </ArticleCardRowStyled.Title>
                        <ArticleCardRowStyled.Content>
                          <HighlightComponent
                            text={getDescription(a, 'description')}
                            preSeparator={HIGHLIGHT_DATA.pre}
                            postSeparator={HIGHLIGHT_DATA.post}
                            highlightElement={HIGHLIGHT_DATA.highlightTag}
                          />
						  <p>{a.from_price ? '£' + a.from_price : ''}</p>
                        </ArticleCardRowStyled.Content>
                        <ArticleCardRowStyled.Type>{a.location ? a.location : 'Unknown'}</ArticleCardRowStyled.Type>
                      </ArticleCardRowStyled.Right>
                    </ArticleCardRowStyled.Root>
                  ))}
                </RowStyled>
              )}
              <PageControlsStyled>
                <div>
                  <label>Results Per Page</label>
                  <Select.Root
                    defaultValue={String(defaultItemsPerPage)}
                    onValueChange={(v) => onResultsPerPageChange({ numItems: Number(v) })}
                  >
                    <SelectStyled.Trigger>
                      <SelectStyled.SelectValue />
                      <SelectStyled.Icon />
                    </SelectStyled.Trigger>
                    <SelectStyled.Content>
                      <SelectStyled.Viewport>
                        <SelectStyled.Option value="24">
                          <SelectStyled.OptionText>24</SelectStyled.OptionText>
                        </SelectStyled.Option>

                        <SelectStyled.Option value="48">
                          <SelectStyled.OptionText>48</SelectStyled.OptionText>
                        </SelectStyled.Option>

                        <SelectStyled.Option value="64">
                          <SelectStyled.OptionText>64</SelectStyled.OptionText>
                        </SelectStyled.Option>
                      </SelectStyled.Viewport>
                    </SelectStyled.Content>
                  </Select.Root>
                </div>
                <PaginationStyled.Root
                  currentPage={page}
                  defaultCurrentPage={1}
                  totalPages={totalPages}
                  onPageChange={(v) => onPageNumberChange({ page: v })}
                >
                  <PaginationStyled.PrevPage onClick={(e) => e.preventDefault()}>
                    <ArrowLeftIcon />
                  </PaginationStyled.PrevPage>
                  <PaginationStyled.Pages>
                    {(pagination) =>
                      Pagination.paginationLayout(pagination, {}).map(({ page, type }) =>
                        type === 'page' ? (
                          <PaginationStyled.Page
                            key={page}
                            aria-label={`Page ${page}`}
                            page={page}
                            onClick={(e) => e.preventDefault()}
                          >
                            {page}
                          </PaginationStyled.Page>
                        ) : (
                          <span key={type}>...</span>
                        ),
                      )
                    }
                  </PaginationStyled.Pages>
                  <PaginationStyled.NextPage onClick={(e) => e.preventDefault()}>
                    <ArrowRightIcon />
                  </PaginationStyled.NextPage>
                </PaginationStyled.Root>
              </PageControlsStyled>
            </SearchResultsLayout.RightArea>
			</>
			)}
          </SearchResultsLayout.MainArea>
        </>
      )}
    </>
  );
};

LocationSearchResults.propTypes = {
  defaultSortType: PropTypes.string,
  defaultPage: PropTypes.number,
  defaultItemsPerPage: PropTypes.number,
  defaultKeyphrase: PropTypes.string,
};

const LocationSearchResultsWidget = widget(LocationSearchResults, WidgetDataType.SEARCH_RESULTS, 'content');

export default LocationSearchResultsWidget;
