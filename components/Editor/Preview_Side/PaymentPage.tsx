import { FormWrapper } from './FormWrapper';
import { FormData } from './PreviewForm';

export default function PaymentPage({
  data,
  updateFields
}: {
  data: FormData;
  updateFields: (fields: Partial<FormData>) => void;
}) {
  return (
    <FormWrapper title="Payment" data={data}>
      <label className="font-sans">Pay Me</label>
      <input className="border" autoFocus required type="text" />
    </FormWrapper>
  );
}
