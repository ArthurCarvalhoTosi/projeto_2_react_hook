import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from ".";
import userEvent from "@testing-library/user-event";

describe('<Button />', () => {
    it('should render the button with the text "Load More"', () => {
        render(<Button text="Load more" />);
        const button = screen.getByRole('button', {
            name: /load more/i
        });
        expect(button).toBeInTheDocument();
        expect.assertions(1);
    });

    it('should call function on button click', () => {
        const fn = jest.fn();
        render(<Button text="Load more" onClick={fn} />);
        const button = screen.getByRole('button', {
            name: /load more/i
        });
        userEvent.click(button);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should be disable when disabled is true', () => {
        render(<Button text="Load more" disabled={true} />);
        const button = screen.getByRole('button', {
            name: /load more/i
        });
        expect(button).toBeDisabled();
    });

    it('should be enabled when disabled is false', () => {
        render(<Button text="Load more" disabled={false} />);
        const button = screen.getByRole('button', {
            name: /load more/i
        });
        expect(button).toBeEnabled();
    });
});