type Tab = 'active-orders' | 'order' | 'order-history';

export type TabMap<Value> = {
    [T in Tab]: Value;
};

export default Tab;