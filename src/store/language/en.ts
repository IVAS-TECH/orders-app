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
        }
    }
}

export default en;