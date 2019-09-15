type Tab = 'active-orders' | 'order' | 'order-history' | 'organization';

export type TabMap<Value> = Record<Tab, Value>;;

export default Tab;