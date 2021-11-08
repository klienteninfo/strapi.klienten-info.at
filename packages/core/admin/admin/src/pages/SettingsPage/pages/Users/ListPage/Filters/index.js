import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button } from '@strapi/design-system/Button';
import { Box } from '@strapi/design-system/Box';
import Filter from '@strapi/icons/Filter';
import { FilterListURLQuery, FilterPopoverURLQuery } from '@strapi/helper-plugin';

const Filters = ({ displayedFilters }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { formatMessage } = useIntl();
  const buttonRef = useRef();

  const handleBlur = e => {
    // TO FIX - select's modals prevent blur to work correctly
    const notNull = e.currentTarget !== null && e.relatedTarget !== null;
    const ulListBox = document.querySelector('[role="listbox"]');

    if (
      !e.currentTarget.contains(e.relatedTarget) &&
      e.relatedTarget !== buttonRef.current &&
      e.relatedTarget !== ulListBox &&
      notNull
    ) {
      setIsVisible(false);
    }
  };

  const handleToggle = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <>
      <Box paddingTop={1} paddingBottom={1}>
        <Button
          variant="tertiary"
          ref={buttonRef}
          startIcon={<Filter />}
          onClick={handleToggle}
          size="S"
        >
          {formatMessage({ id: 'app.utils.filters', defaultMessage: 'Filters' })}
        </Button>
        {isVisible && (
          <FilterPopoverURLQuery
            displayedFilters={displayedFilters}
            isVisible={isVisible}
            onBlur={handleBlur}
            onToggle={handleToggle}
            source={buttonRef}
          />
        )}
      </Box>
      <FilterListURLQuery filtersSchema={displayedFilters} />
    </>
  );
};

Filters.propTypes = {
  displayedFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      metadatas: PropTypes.shape({ label: PropTypes.string }),
      fieldSchema: PropTypes.shape({ type: PropTypes.string }),
    })
  ).isRequired,
};

export default Filters;