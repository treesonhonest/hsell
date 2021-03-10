import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IComments, defaultValue } from 'app/shared/model/comments.model';

export const ACTION_TYPES = {
  FETCH_COMMENTS_LIST: 'comments/FETCH_COMMENTS_LIST',
  FETCH_COMMENTS: 'comments/FETCH_COMMENTS',
  CREATE_COMMENTS: 'comments/CREATE_COMMENTS',
  UPDATE_COMMENTS: 'comments/UPDATE_COMMENTS',
  DELETE_COMMENTS: 'comments/DELETE_COMMENTS',
  RESET: 'comments/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IComments>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CommentsState = Readonly<typeof initialState>;

// Reducer

export default (state: CommentsState = initialState, action): CommentsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMMENTS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMMENTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_COMMENTS):
    case REQUEST(ACTION_TYPES.UPDATE_COMMENTS):
    case REQUEST(ACTION_TYPES.DELETE_COMMENTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_COMMENTS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMMENTS):
    case FAILURE(ACTION_TYPES.CREATE_COMMENTS):
    case FAILURE(ACTION_TYPES.UPDATE_COMMENTS):
    case FAILURE(ACTION_TYPES.DELETE_COMMENTS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMMENTS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMMENTS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMMENTS):
    case SUCCESS(ACTION_TYPES.UPDATE_COMMENTS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMMENTS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/comments';

// Actions

export const getEntities: ICrudGetAllAction<IComments> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMMENTS_LIST,
  payload: axios.get<IComments>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IComments> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMMENTS,
    payload: axios.get<IComments>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IComments> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMMENTS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IComments> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMMENTS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IComments> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMMENTS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
