import { createMuiTheme } from '@material-ui/core';

const baseTheme = createMuiTheme();

const appTheme = createMuiTheme({
    ...baseTheme,
    typography: {
        fontSize: 20
    }
});

const datePickerTheme = createMuiTheme({
    ...baseTheme,
    overrides: {
        MuiInputBase: {
            input: {
                fontSize: 25
            }
        }
    }
});

export { appTheme, datePickerTheme };