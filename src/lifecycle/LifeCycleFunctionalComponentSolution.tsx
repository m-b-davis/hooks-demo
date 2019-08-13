import React, { useState, useEffect, useRef } from "react";
import { ChildProps } from "./LifeCycleWrapper";
import FakeAPI, { UserData } from "./FakeApi";
import { Typography } from "@material-ui/core";

function usePrevious<T>(value: T) {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export function LifeCycleFunctionalComponent(props: ChildProps) {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  const previousUsername = usePrevious(props.username);

  const fetchUserData = () => {
    setUserData(undefined);

    if (props.username && previousUsername !== props.username) {
      FakeAPI.fetchUser(props.username).then(setUserData);
    }
  };

  useEffect(fetchUserData, [props.username]);

  const isLoading = props.username && !userData;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {userData && (
        <>
          <Typography variant="h3">Username: {userData.username}</Typography>
          <Typography variant="h4">Interests: {userData.interests}</Typography>
        </>
      )}
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
