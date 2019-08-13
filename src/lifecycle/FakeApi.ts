export type UserData = {
  username: string;
  interests: string;
}

const users: UserData[] = [
  { username: 'Matt', interests: 'Hooks' },
  { username: 'Chris', interests: 'PWAs' },
  { username: 'Conaill', interests: 'World domination' },
  { username: 'Ben', interests: 'High calibre sandwiches' },
];

const getNetworkDelay = () => (Math.random() * 1000) + 500;

export default {
  fetchUser: (username: string) => 
    new Promise<UserData>(res => {
      setTimeout(() => {
        const result = users.find(user => user.username === username);
        res(result);
      }, getNetworkDelay());
    }),
};
