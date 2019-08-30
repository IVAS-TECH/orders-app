type Tab = 'active-orders' | 'order' | 'order-history';

export type TabMap<Value> = Record<Tab, Value>;;

export default Tab;