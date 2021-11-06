import { React } from 'react';

import { useSelector } from 'react-redux';
import { ProjectItem } from '../ProjectItem';

export function ItemList(props) {
  const { statusButton, filterFunc = () => true } = props;
  const itemList = useSelector((state) => state.projectItemsList.itemsList);
  const items = useSelector((state) => state.projectItemsList.items);
  console.log('itemList', itemList, items);

  const obj_list = itemList.map((el) => items[el]);
  console.log(obj_list);

  return (
    <div className='list_wrapper'>
      {obj_list.filter(filterFunc).map((el) => (
        <ProjectItem key={el.id} obj={el} statusButton={statusButton} />
      ))}
    </div>
  );
}
