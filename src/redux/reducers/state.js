import {Colors} from '../../config/colors';

export const initialState = {
  list: [
    {
      title: 'Example1',
      description: 'Example description',
      date: new Date().toISOString(),
      done: false,
      id: 0,
    },
    {
      title: 'Example2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id dolor ac risus mattis pretium eget at lectus. Ut vel efficitur odio. Maecenas rhoncus nisi posuere, elementum tortor sed, condimentum quam. Etiam cursus est sed neque hendrerit mattis. Vestibulum et iaculis nulla, eu varius tellus. Aliquam vel augue vitae purus tincidunt condimentum.',
      date: new Date().toISOString(),
      done: false,
      id: 1,
    },
    {
      title: 'Example3',
      description: 'Example description',
      date: new Date().toISOString(),
      done: false,
      id: 2,
    },
  ],
};

const state = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NEW_ITEM':
      return {
        ...state,
        list: action.data,
      };
    case 'LOAD_LIST':
      return {
        ...state,
        list: action.data,
      };
    default:
      return state;
  }
};

export default state;
