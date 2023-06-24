import { Fragment } from 'react';
import { FormWrapper } from './FormWrapper';
import { FormData } from './PreviewForm';

export default function DataPage({
  data,
  updateFields,
  imageUrls
}: {
  data: FormData;
  updateFields: (fields: Partial<FormData>) => void;
  imageUrls: string[];
}) {
  const keysArray = Object.keys(data);
  return (
    <FormWrapper title="Attendee Details" data={data} imageUrls={imageUrls}>
      {[
        keysArray.includes('name') && 'name',
        keysArray.includes('email') && 'email',
        keysArray.includes('birthday') && 'birthday',
        ...Object.keys(data)
          .filter(
            (key) =>
              key !== 'name' &&
              key !== 'birthday' &&
              key !== 'email' &&
              key !== 'textColor' &&
              key !== 'backgroundColor' &&
              key !== 'htmlContent' &&
              key !== 'deltaState' &&
              key !== ''
          )
          .sort()
      ].map((key) => (
        <Fragment key={key || undefined}>
          {key && typeof key === 'string' && (
            <>
              <label className="font-sans capitalize">
                {key === 'birthday' ? 'Date of birth' : key}
              </label>
              <input
                className="w-full rounded-lg border-2 text-black"
                autoFocus
                required
                type={
                  key === 'birthday'
                    ? 'date'
                    : key === 'email'
                    ? 'email'
                    : 'text'
                }
                value={data[key]}
                onChange={(e) => updateFields({ [key]: e.target.value })}
              />
            </>
          )}
        </Fragment>
      ))}
    </FormWrapper>
  );
}
