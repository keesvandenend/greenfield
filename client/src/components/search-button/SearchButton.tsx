import React, { FC, CSSProperties } from 'react';
import { Button, Typography } from '@material-ui/core';

const SearchButton: FC<{
  style?: CSSProperties;
}> = ({ style = {} }) => {
  return (
    <Button
      type="submit"
      style={{
        background: '#1C9585',
        color: 'white',
        padding: '1rem',
        fontSize: '1rem',
        fontWeight: 500,
        ...style
      }}
    >
      <Typography>Search</Typography>
    </Button>
  );
};

export default SearchButton;
