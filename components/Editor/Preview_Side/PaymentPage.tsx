import { FormWrapper } from './FormWrapper';
import { FormData } from './PreviewForm';

export default function PaymentPage({
  data,
  updateFields,
  imageUrls
}: {
  data: FormData;
  updateFields: (fields: Partial<FormData>) => void;
  imageUrls: string[];
}) {
  return (
    <FormWrapper title="Payment" data={data} imageUrls={imageUrls}>
      <label className="font-sans">Pay Me</label>
      <input className="border" autoFocus required type="text" />
    </FormWrapper>
  );
}
