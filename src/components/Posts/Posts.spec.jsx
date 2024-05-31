import { render } from "@testing-library/react";
import { Posts } from ".";

const props = {
    posts: [
        {
            id: 1,
            title: 'title1',
            body: 'body2',
            cover: 'img/'
        }
    ]
}

describe('Posts/>', () => {
    it('should render posts', () => {
        render(<Posts />)
    });
})