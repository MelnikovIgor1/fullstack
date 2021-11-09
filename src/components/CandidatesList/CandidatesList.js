import { React } from 'react';

import './candidatesList.css';

export function UserList(props) {
  const { userList, onClick } = props;

  return (
    <>
      {userList.map((candidate) => (
        <div
          className='candidate_item'
          key={candidate}
          onClick={() => {
            onClick(candidate);
          }}
        >
          {candidate}
        </div>
      ))}
    </>
  );
}
