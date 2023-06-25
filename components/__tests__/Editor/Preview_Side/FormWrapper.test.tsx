import { render, screen } from '@testing-library/react';
import { FormWrapper } from '@/components/Editor/Preview_Side/FormWrapper';
import { ReactNode } from 'react';
import { FormData } from '@/components/Editor/Preview_Side/PreviewForm';
// const dummmyData = jest.fn()
describe('FormWrapper', () => {
  it('renders heading with correct text', () => {
    const dummyChildren: ReactNode = <div> Placeholder content </div>;
    const dummmyData: FormData = {
      key1: 'value1',
      key2: 'value2'
    };
    render(
      <FormWrapper
        title="Demo"
        children={dummyChildren}
        data={dummmyData}
        imageUrls={[]}
      />
    );

    const FormHeading = screen.getByText(/demo/i);
    expect(FormHeading).toBeInTheDocument();
  });

  it('renders background image with correct URL', () => {
    const dummyImageUrls = ['https://example.com/image1.jpg'];

    render(
      <FormWrapper
        title="Demo"
        children={null}
        data={{}}
        imageUrls={dummyImageUrls}
      />
    );

    const backgroundImageElement = screen.getByTestId('background-image');

    expect(backgroundImageElement).toHaveStyle(
      `background-image: url(${dummyImageUrls[0]})`
    );
  });

  it('does not render background image when imageUrls prop is an empty array', () => {
    render(
      <FormWrapper title="Demo" children={null} data={{}} imageUrls={[]} />
    );

    const backgroundImageElement = screen.queryByTestId('background-image');

    expect(backgroundImageElement).toHaveStyle(
      `background-image: url(${undefined})`
    );
  });
});
