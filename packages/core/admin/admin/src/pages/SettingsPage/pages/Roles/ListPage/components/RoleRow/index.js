import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { Td, Tr } from '@strapi/design-system/Table';
import { Text, EllipsisText } from '@strapi/design-system/Text';
import { IconButton } from '@strapi/design-system/IconButton';
import { stopPropagation, onRowClick, pxToRem } from '@strapi/helper-plugin';
import { useIntl } from 'react-intl';

const RoleRow = ({ id, name, description, usersCount, icons }) => {
  const { formatMessage } = useIntl();

  const usersCountText = formatMessage(
    {
      id: `Roles.RoleRow.user-count.${usersCount > 1 ? 'plural' : 'singular'}`,
      defaultMessage: '{number} user',
    },
    { number: usersCount }
  );

  return (
    <Tr
      key={id}
      {...onRowClick({
        fn: icons[1].onClick,
      })}
    >
      <Td maxWidth={pxToRem(130)}>
        <EllipsisText textColor="neutral800">{name}</EllipsisText>
      </Td>
      <Td maxWidth={pxToRem(250)}>
        <EllipsisText textColor="neutral800">{description}</EllipsisText>
      </Td>
      <Td>
        <Text textColor="neutral800">{usersCountText}</Text>
      </Td>
      <Td>
        <Flex justifyContent="flex-end" {...stopPropagation}>
          {icons.map((icon, i) =>
            icon ? (
              <Box key={icon.label} paddingLeft={i === 0 ? 0 : 1}>
                <IconButton onClick={icon.onClick} label={icon.label} noBorder icon={icon.icon} />
              </Box>
            ) : null
          )}
        </Flex>
      </Td>
    </Tr>
  );
};

RoleRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  usersCount: PropTypes.number.isRequired,
  icons: PropTypes.array.isRequired,
};

export default RoleRow;