import { render, screen } from "@testing-library/react";
import { TextInput } from ".";
import userEvent from "@testing-library/user-event";

// const props = {
//     posts: [
//         {
//             id: 1,
//             title: 'title1',
//             body: 'body1',
//             cover: 'img/img1.png',
//         },
//         {
//             id: 2,
//             title: 'title2',
//             body: 'body2',
//             cover: 'img/img2.png',
//         },
//         {
//             id: 3,
//             title: 'title3',
//             body: 'body3',
//             cover: 'img/img3.png',
//         },
//     ]
// }

describe('Posts/>', () => {
    it('should have a value of searchValue', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={'testando'} />);

        const input = screen.getByPlaceholderText(/type your search/i);
        expect(input.value).toBe('testando');
    });

    it('should call handleChange function on each key pressed', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} />);

        const input = screen.getByPlaceholderText(/type your search/i);
        const value = 'o valor';

        userEvent.type(input, value);
        expect(input.value).toBe(value);
        expect(fn).toHaveBeenCalledTimes(value.length);
    });

    it('should match snapshot', () => {
        const fn = jest.fn();
        const { container } = render(<TextInput handleChange={fn} />);
        expect(container).toMatchSnapshot();
    });
});