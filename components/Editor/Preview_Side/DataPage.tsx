import { Fragment } from 'react';
import { FormWrapper } from './FormWrapper';
import { FormData } from './PreviewForm';
// type UserData = {
//     name: string
//     age: string
//     email: string
// }

export default function DataPage({
  data,
  updateFields
}: {
  data: FormData;
  updateFields: (fields: Partial<FormData>) => void;
}) {
  // Object.keys(data).forEach((key) => {
  //   console.log(key, data[key]);
  // });

  return (
    <FormWrapper title="Attendee Details" data={data}>
      {[
        'name',
        'email',
        'birthday',
        ...Object.keys(data)
          .filter(
            (key) =>
              key !== 'name' &&
              key !== 'birthday' &&
              key !== 'email' &&
              key !== 'textColor' &&
              key !== 'bgColor'
          )
          .sort()
      ].map((key) => (
        <Fragment key={key}>
          <label className="font-sans capitalize">
            {key == 'birthday' ? 'Date of birth' : key}
          </label>
          <input
            className="rounded-lg border-2"
            autoFocus
            required
            type={
              key == 'birthday' ? 'date' : key == 'email' ? 'email' : 'text'
            }
            value={data[key]}
            onChange={(e) => updateFields({ [key]: e.target.value })}
          />
        </Fragment>
      ))}
    </FormWrapper>
  );
}
