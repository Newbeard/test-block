import { INIT_TASK } from "../types";

export function taskReducer(state = [], action) {
  const { type, payload } = action

  switch (type) {
    case INIT_TASK: {
      return payload
    }

    default:
      return state
  }
}
