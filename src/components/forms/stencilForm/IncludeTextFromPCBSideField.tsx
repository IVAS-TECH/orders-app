import CheckboxWithLabel from '../../CheckboxWithLabel'; 
import { connect } from 'react-redux';
import form, { State } from '../../../store/stencilForm';
import { formField } from '../../../store/form/reducer';

const {
    value,
    setValue
} = formField(form, 'includeTextFromPCBSide');

export default connect(
    (state: State) => ({
        checked: value(state),
        label: 'Добави текст от страната на платката'
    }),
    {
        onToggle: setValue
    }
)(CheckboxWithLabel);