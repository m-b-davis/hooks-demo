import React from 'react';
import Button from '@material-ui/core/Button';

export class StateClassComponent extends React.Component {
  state = {
    count: 0,
  }

  setCount = (count: number) => {
    this.setState({ count });
  }

  render() {
    const { count } = this.state;

    return (
      <div>
        <h1>Count: {count}</h1>
        <Button onClick={() => this.setCount(count + 1)}>Increment</Button>
        <Button onClick={() => this.setCount(count - 1)}>Decrement</Button>
      </div>
    )
  }
}
