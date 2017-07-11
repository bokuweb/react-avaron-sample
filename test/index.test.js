import test from 'ava';
import React from 'react';
import { readFileSync } from 'fs';
import { render } from 'react-dom';
import { screenshot, isAvaron, getCurrentWindow } from 'avaron';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

let datePicker;

const Example = () => (
    <MuiThemeProvider>
        <DatePickerDialog
            ref={(e) => { datePicker = e; }}
            initialDate={new Date(2017, 4, 1)}
            firstDayOfWeek={0}
            mode="landscape"
        />
    </MuiThemeProvider>
);

test('should capture react component screenshot', async t => {
    render(<Example />, document.querySelector('.main'));
    datePicker.show();
    const path = 'screenshots/date-picker-dialog.png';
    await new Promise((resolve) => setTimeout(() => resolve(), 200));
    await screenshot(path);
    try {
        const png = readFileSync(path);
        t.is(!!png, true);
    } catch (e) {
        console.error(e);
        t.fail();
    }
});
