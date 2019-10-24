import React from 'react';
import {storiesOf} from '@storybook/react';
import {withSmartKnobs} from 'storybook-addon-smart-knobs'
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';
import BB_Button from './../../src/js/components/controls/BB_Button';
import BB_TextField from "../js/components/controls/BB_TextField";
import {MemoryRouter} from 'react-router';
import BB_ButtonLink from "../js/components/controls/BB_ButtonLink";

const stories = storiesOf('controls', module);


stories
    .addDecorator(withSmartKnobs)
    .addDecorator(withKnobs)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>));

stories.add('Button', () => <BB_Button/>);

stories.add('Button Link', () => <BB_ButtonLink/>);

// stories
//     .addDecorator(withSmartKnobs)
//     .addDecorator(withKnobs)
//     .addDecorator(story => (
//         <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>))
//     .add('Select', () => <BB_Select />);

stories.add('Text Field', () => <BB_TextField />);


