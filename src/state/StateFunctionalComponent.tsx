import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

export function StateFunctionalComponent(){
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
      <Button onClick={() => setCount(count - 1)}>Decrement</Button>
    </div>
  );
}
