// @flow

import { handleActions, createAction } from 'redux-actions'

export type ModalsState = {
  [key: string]: {
    isOpened: boolean,
    data?: Object | null,
  },
}

const state: ModalsState = {}

type OpenPayload = {
  name: string,
  data?: Object | null,
}

type ClosePayload = {
  name: string,
}

const handlers = {
  MODAL_OPEN: (state, { payload }: { payload: OpenPayload }) => {
    const { name, data } = payload
    return {
      ...state,
      [name]: {
        isOpened: true,
        data,
      },
    }
  },
  MODAL_CLOSE: (state, { payload }: { payload: ClosePayload }) => {
    const { name } = payload
    return {
      ...state,
      [name]: {
        isOpened: false,
        data: null,
      },
    }
  },
}

// Actions

export const openModal = createAction('MODAL_OPEN', (name, data = {}) => ({ name, data }))
export const closeModal = createAction('MODAL_CLOSE', name => ({ name }))

// Selectors

export const isModalOpened = (state: Object, name: string) =>
  state.modals[name] && state.modals[name].isOpened

// Exporting reducer

export default handleActions(handlers, state)
