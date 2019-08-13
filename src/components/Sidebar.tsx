import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { navigate } from 'hookrouter';
import { routes } from '../App';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export function Sidebar() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
          <List>
            {routes.map(route => (
              <ListItem button key={route.name}>
                <ListItemText primary={route.name} onClick={() => navigate(route.path)} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}