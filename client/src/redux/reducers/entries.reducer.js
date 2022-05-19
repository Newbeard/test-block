import { INIT_ENTRY } from "../types";

export function entriesReducer(state = [], action) {
  const { type, payload } = action

  switch (type) {
    case INIT_ENTRY: {
      return payload
    }

    default:
      return state
  }
}
