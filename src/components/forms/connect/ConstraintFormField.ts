import { Constraint } from '../../../store/form/reducer';

type Intersection<A, B> = A & B;

type ConstraintFormField<
    Fields extends Constraint<Fields>,
    FieldKey extends keyof Fields,
    Field extends {
        value: Field['value'],
        validation: Field['validation']
    }
> = Intersection<Constraint<Fields>, {
    [key in FieldKey]: Field
}>;

export default ConstraintFormField;