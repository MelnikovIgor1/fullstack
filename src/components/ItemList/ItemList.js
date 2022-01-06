import { React } from 'react';

import { useSelector } from 'react-redux';
import { ProjectItem } from '../ProjectItem';

export function ItemList(props) {
  console.log('ItemList-start', props);
  const { list, user } = props;

  // const { statusButton, filterFunc = () => true } = props;
  // const itemList = useSelector((state) => state.projectItemsList.itemsList);
  const items = useSelector((state) => state.projectItemsList.items);

  console.log('itemList-items: ', items);

  // const obj_list = items.map((el) => items[el]);

  // console.log('ItemList-return', obj_list);
  return (
    <div className='list_wrapper'>
      {list.map((el) => (
        <ProjectItem key={el.id} obj={el} user={user} />
      ))}
      {/* {obj_list.filter(filterFunc).map((el) => (
        <ProjectItem key={el.id} obj={el} statusButton={statusButton} />
      ))} */}
    </div>
  );
}
