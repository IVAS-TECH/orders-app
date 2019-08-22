import Tab, { TabMap } from './../type/Tab';
import { createReducer } from './utils';

export const CHANGE_TAB = 'ivas-tech/orders-app/tab/CHANGE_TAB';

export interface ChangeTab {
    type: typeof CHANGE_TAB,
    tab: Tab
};

export function changeTab(tab: Tab): ChangeTab {
    return { type: CHANGE_TAB, tab };
};

const reducer = createReducer('active-orders' as Tab, {
    [CHANGE_TAB]: (
        state: Tab,
        { tab }: ChangeTab
    ) => tab !== state ? tab : state
});

export default reducer;


const tabIndex: TabMap<number> = {
    'active-orders': 0,
    'order': 1,
    'order-history': 2
};

const tabs: ['active-orders', 'order', 'order-history']
          = ['active-orders', 'order', 'order-history'];

export { tabIndex, tabs };