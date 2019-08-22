import Action from './Action';
import Bool from './Bool';
import Form from './Form';
import Langage from './Language';
import Tab from './Tab';
import StencilForm from './stencilForm/StencilForm';

interface Type {
    action: Action,
    bool: Bool,
    form: Form,
    language: Langage,
    tab: Tab,
    stencilForm: StencilForm
}

export default Type;