import { createAction, handleActions } from 'redux-actions';

const CHANGE_NAME = 'table/changeName';

export const changeName = createAction(CHANGE_NAME);

const initialState = {
  family: {
    byId: {
      junno: {
        id: 'junno',
        name: 'junno',
        favorite: ['game', 'sleep'],
      },
      hyunju: {
        id: 'hyunju',
        name: 'hyunju',
        favorite: ['sleep'],
      },
    },
    allIds: ['junno', 'hyunju'],
  },
  hobby: {
    hbyId: {
      game: {
        id: 'game',
        playperday: 32,
      },
      sleep: {
        id: 'sleep',
        playperday: 8,
      },
    },
    hallIds: ['game', 'sleep'],
  },
};

export default handleActions(
  {
    [CHANGE_NAME]: (state, action) => ({
      ...state,
      family: {
        byId: {
          ...state.family.byId,
          [action.payload.nextId]: {
            id: action.payload.nextId,
            name: action.payload.nextId,
            favorite: state.family.byId[action.payload.id].favorite,
          },
        },
        allIds: state.family.allIds.map(e =>
          e === action.payload.id ? action.payload.nextId : e,
        ),
      },
    }),
  },
  initialState,
);
