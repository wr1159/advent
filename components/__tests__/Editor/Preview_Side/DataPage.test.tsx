import { render, screen, fireEvent } from '@testing-library/react';
import { FormData } from '@/components/Editor/Preview_Side/PreviewForm';
import DataPage from '@/components/Editor/Preview_Side/DataPage';

describe('DataPage', () => {
  it('renders input elements with correct label text', () => {
    const mockedUpdateFields = jest.fn();
    const dummmyData: FormData = {
      name: '',
      email: '',
      birthday: ''
    };

    render(
      <DataPage
        updateFields={mockedUpdateFields}
        data={dummmyData}
        imageUrls={[]}
      />
    );

    const nameLabel = screen.getByLabelText(/name/i);
    const emailLabel = screen.getByLabelText(/email/i);
    const birthdayLabel = screen.getByLabelText(/date of birth/i);
    expect(nameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(birthdayLabel).toBeInTheDocument();
  });

  /*
    it('renders input elements that are typable', () => {
        let dummmyData: FormData = { name: '' };

        const updateFields = (fields: Partial<FormData>) => {
            dummmyData = { ...dummmyData, ...fields };
        };
        
        render(<DataPage updateFields={updateFields} data = {dummmyData} imageUrls={[]} />);
    
        const nameInput = screen.getByRole('textbox', { name: /name/i }) as HTMLInputElement;
        fireEvent.input(nameInput, { target: { value: "Wei Rong"}})
        expect(nameInput.value).toBe("Wei Rong");
      });
    */
});
