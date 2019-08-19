import Language from './Language';
import bg from './bg';

const en: Language = {
    language: {
        bg: 'Bulgarian',
        en: 'English',
        language: 'Language'
    },
    forms: {
        stencilForm: bg.forms.stencilForm,
        notSelected: _ => 'Not selected',
        fieldError: {
            required: 'Field is required',
            min: min => `Minimal value for the field is ${min}`
        },
        warning: {
            formIsInvalid: 'Form is invalid',
            fieldValueIsInvalid: 'There is field with invalid value'
        }
    },
    action: {
        ok: 'OK',
        makeOrder: 'Make Order'
    },
    bool: b => b ? 'Yes' : 'No',
    tab: {
        order: 'Order',
        activeOrders: 'Active orders',
        orderHistory: 'Order history'
    }
}

export default en;