import { render, screen } from '@testing-library/react';
import { FormWrapper } from '@/components/Editor/Preview_Side/FormWrapper';
import { ReactNode } from 'react';
import { FormData } from '@/components/Editor/Preview_Side/PreviewForm';
import { Form } from 'react-router-dom';

const dummyChildren: ReactNode = <div> Placeholder content </div>;
describe('FormWrapper', () => {
  it('renders heading with correct text', () => {
    const dummmyData: FormData = {
      key1: 'value1',
      key2: 'value2'
    };
    render(
      <FormWrapper title="Demo" data={dummmyData} imageUrls={[]}>
        {dummyChildren}
      </FormWrapper>
    );

    const FormHeading = screen.getByText(/demo/i);
    expect(FormHeading).toBeInTheDocument();
  });

  it('renders background image with correct URL', () => {
    const dummyImageUrls = ['https://example.com/image1.jpg'];

    render(
      <FormWrapper title="Demo" data={{}} imageUrls={dummyImageUrls}>
        {dummyChildren}
      </FormWrapper>
    );

    const backgroundImageElement = screen.getByTestId('background-image');

    expect(backgroundImageElement).toHaveStyle(
      `background-image: url(${dummyImageUrls[0]})`
    );
  });

  it('does not render background image when imageUrls prop is an empty array', () => {
    render(
      <FormWrapper title="Demo" data={{}} imageUrls={[]}>
        {dummyChildren}
      </FormWrapper>
    );

    const backgroundImageElement = screen.queryByTestId('background-image');

    expect(backgroundImageElement).toHaveStyle(
      `background-image: url(${undefined})`
    );
  });
});
