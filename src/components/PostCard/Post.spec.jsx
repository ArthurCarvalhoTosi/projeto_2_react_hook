import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { postCardPropsMock } from "./mock";
import { configure } from '@testing-library/react'

configure({ reactStrictMode: true })
const props = postCardPropsMock;

describe('<PostCard/>', () => {
    it('should render PostCard correctly', () => {
        render(<PostCard {...props} />);

        expect(screen.getByRole('img', { name: /title1/i })).toHaveAttribute('src', 'img/img.png');
        expect(screen.getByRole('heading', { name: /title1/i })).toBeInTheDocument();
        expect(screen.getByText('body1')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<PostCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});