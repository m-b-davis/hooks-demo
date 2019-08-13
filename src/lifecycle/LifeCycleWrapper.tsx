import React from 'react';
import Select from '@material-ui/core/Select';
import { MenuItem, Typography, Button } from '@material-ui/core';

const usernames = ['Matt', 'Chris', 'Conaill'];

type Props = {
  child: React.ComponentType<ChildProps>;
}

export type ChildProps = {
  username?: string;
}

export function LifeCycleWrapper(props: Props) {
  const [selectedUsername, setUsername] = React.useState<string | undefined>(undefined);

  function handleChange(event: React.ChangeEvent<{ value: string}>) {
    setUsername(event.target.value);
  }

  return (
    <div>
      <Typography variant="body1" gutterBottom>Set Username</Typography>
       <Select
          value={selectedUsername || 'Select....'}
          onChange={handleChange as any}
        >
          {usernames.map(username => <MenuItem value={username}>{username}</MenuItem>)}
        </Select>

        <Button onClick={() => setUsername(undefined)}> Reset </Button>

        <props.child username={selectedUsername}/>
    </div>
  );
}
