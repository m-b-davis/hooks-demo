import React from 'react';
import { ChildProps } from './LifeCycleWrapper';
import FakeAPI, { UserData } from './FakeApi';
import { Typography } from '@material-ui/core';

type State = { userData?: UserData };

export class LifeCycleClassComponent extends React.Component<ChildProps, State> {
  state: State = {
    userData: undefined,
  }

  componentDidMount() {
    if (this.props.username) {
      FakeAPI.fetchUser(this.props.username).then(result => {
        this.setState({
          userData: result
        });
      })
    }
  }

  componentDidUpdate(prevProps: ChildProps) {
    // Fetch user when username changes
    if (this.props.username && this.props.username !== prevProps.username) {
      this.setState({ userData: undefined });

      FakeAPI.fetchUser(this.props.username).then(result => {
        this.setState({
          userData: result
        });
      }) 
    }
  }

  render() {
    const userData = this.state.userData;
    const isLoading = this.props.username && !this.state.userData;

    return (
      <>
        {isLoading && <p>Loading...</p>}
        { userData && (
            <>
              <Typography variant="h3">Username: {userData.username}</Typography>
              <Typography variant="h4">Interests: {userData.interests}</Typography>
            </>
          )
        }
        {!isLoading && !userData && (
          <div>
            <Typography variant="body1" gutterBottom>
              No user selected!
            </Typography>
          </div>
        )}
      </>
    );
  }
}

