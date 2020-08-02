import React, { useState } from 'react';
import { MenuItem, Menu, Button } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import languages from '../../../../utils/language';

const useStyles = makeStyles(theme => ({
  container: { margin: '15px 20px 15px 0' },
  button: { color: theme.palette.primary.white, '&:hover': { backgroundColor: '#3A1D83' } }
}));

const LanguageSelector = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { i18n } = useTranslation();

  const [currentLanguage] = languages.filter(lang => lang.code === i18n.language);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = languageCode => {
    i18n.changeLanguage(languageCode);
    setAnchorEl(null);
  };
  return (
    <div className={classes.container}>
      <Button
        onClick={handleClick}
        aria-controls="language-menu"
        aria-haspopup="true"
        endIcon={<ExpandMore />}
        className={classes.button}
      >
        {currentLanguage.name}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map(({ code, name }) => (
          <MenuItem key={code} onClick={() => handleClose(code)}>
            {name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSelector;
