import Select, { SelectProps }  from './../../Select'; 
import { connect } from 'react-redux';
import form, { SheetThickness, State } from './../../../store/stencilForm';
import { formField } from './../../../store/form/reducer';
import { configure } from './../utils';

const {
    value,
    error,
    setValue
} = formField(form, 'sheetThickness');

const SheetThicknessSelect: React.FC<SelectProps<SheetThickness>> = Select;

const Field = configure(SheetThicknessSelect, {
    id: form.id('sheetThickness'),
    required: true,
    options: [
        30 as 30,
        40 as 40,
        50 as 50,
        80 as 80,
        90 as 90,
        100 as 100,
        110 as 110,
        120 as 120,
        130 as 130,
        150 as 150,
        180 as 180,
        200 as 200,
        250 as 250,
        300 as 300
    ].map(thickness => ({
        value: thickness,
        text: `${thickness} μm`
    }))
});

export default connect(
    (state: State) => ({
        value: value(state),
        error: error(state),
        label: 'Дебелина на листа (μm)',
        notSelectedText: 'Не избрана'
    }),
    {
        onValueChange: setValue
    }
)(Field);