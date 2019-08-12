import React, { ComponentType, ReactNode, Fragment } from 'react';
import { connect } from 'react-redux';
import { Constraint, Form, FormState, formField } from '../../../../store/form/reducer';
import { State } from '../../../../store/reducer';

const ShowContent: React.FC<{
    show: boolean,
    children: ReactNode
}> = ({ show, children }) => (<Fragment>
    {show && children}
</Fragment>);

export default function showContent<
    Fields extends Constraint<Fields>,
    FieldKey extends keyof Fields
>({ form, showWhenFieldValueFormKey, extractFormState }: {
    form: Form<Fields>,
    showWhenFieldValueFormKey: FieldKey,
    extractFormState: (state: State) => FormState<Fields>
}):  ComponentType<{ children: ReactNode }> {
    const { value: fieldValue } = formField(form, showWhenFieldValueFormKey);
    
    return connect(
        (state: State, { children }: { children: ReactNode } ) => ({
            show: !!fieldValue(extractFormState(state)),
            children
        })
    )(ShowContent);
}