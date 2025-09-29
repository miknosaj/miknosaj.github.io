import { useMemo, useReducer } from 'react';
import { getContentLevels, getHyperlinkUrls } from '../data/helpers';

type Action =
  | { type: 'toggle'; level: number; key: string }
  | { type: 'reset' };

type TriggerState = (string | null)[];

const initialState: TriggerState = [];

const reducer = (state: TriggerState, action: Action): TriggerState => {
  switch (action.type) {
    case 'reset':
      return [];
    case 'toggle': {
      const { level, key } = action;
      const current = state[level];
      if (current === key) {
        return state.slice(0, level);
      }
      const next = state.slice(0, level);
      next[level] = key;
      return next;
    }
    default:
      return state;
  }
};

export function usePortfolioState() {
  const [activeByLevel, dispatch] = useReducer(reducer, initialState);

  const contentLevels = useMemo(() => getContentLevels(), []);
  const hyperlinkUrls = useMemo(() => getHyperlinkUrls(), []);

  const handleToggleLevel = (level: number, key: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    dispatch({ type: 'toggle', level, key });
  };

  const handleGlobalClick = () => {
    if (activeByLevel[0] != null) {
      dispatch({ type: 'reset' });
    }
  };

  return {
    activeByLevel,
    hasAnyActiveTrigger: activeByLevel[0] != null,

    handleToggleLevel,
    handleGlobalClick,

    contentLevels,
    hyperlinkUrls,
  } as const;
}
