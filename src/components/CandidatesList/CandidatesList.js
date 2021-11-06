import { React } from 'react';

import './candidatesList.css';

import { fetchItems } from '../../actions/projectItemsList';
// import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';

export function CandidatesList(props) {
  const dispatch = props.dispatch;

  const item_ = props.item;
  const items = useSelector((state) => state.projectItemsList.items);
  const item = items[item_.id];
  console.log('ITEM', item);

  const Updater = (candidate, item) => {
    var index = item.candidates.indexOf(candidate);
    if (index > -1) {
      item.candidates.splice(index, 1);
    }
    item.participants.push(candidate);

    const ll = fetch(`http://localhost:3000/posts/${item.id}`, {
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(item),
      method: 'PUT',
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(fetchItems());
      });
    console.log(ll);
  };
  return (
    <>
      {item.candidates.map((candidate) => (
        <div
          key={candidate}
          onClick={() => {
            Updater(candidate, item);
          }}
        >
          {candidate}
        </div>
      ))}
    </>
  );
}

export function ParticipantsList(props) {
  const dispatch = props.dispatch;
  // const [state, setState] = useState(1);
  // useState()

  const item_ = props.item;
  const items = useSelector((state) => state.projectItemsList.items);
  const item = items[item_.id];
  console.log('ITEM', item);

  const Updater = (candidate, item) => {
    var index = item.participants.indexOf(candidate);
    if (index > -1) {
      item.participants.splice(index, 1);
    }
    item.candidates.push(candidate);

    const ll = fetch(`http://localhost:3000/posts/${item.id}`, {
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(item),
      method: 'PUT',
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(fetchItems());
      });
    console.log(ll);
  };
  return (
    <>
      {item.participants.map((candidate) => (
        <div
          key={candidate}
          onClick={() => {
            Updater(candidate, item);
          }}
        >
          {candidate}
        </div>
      ))}
    </>
  );
}

// function CandidateBlock(candidate, item, Updater) {
//   console.log('here');
//   const real_items = useSelector((state) => state.projectItemsList.items);
//   console.log('again', real_items, candidate, item);
//   const real_item = real_items[item.id];

//   console.log('again', real_items, real_item);
//   const exists = real_item.candidates.includes(candidate);

//   if (!exists) {
//     return <></>;
//   }
//   return (
//     <div
//       onClick={() => {
//         Updater(candidate, item);
//       }}
//     >
//       {candidate}
//     </div>
//   );
// }
