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
// export default function DataPage({ updateFields, ...formData} : DataPageProps) {
//     Object.keys(formData).forEach((key) => {
//     console.log(key, formData[key]);
//     });

//     return (
//     <FormWrapper title = "Attendee Details">
//       <label className="font-sans">Name</label>
//       <input className="border-2 rounded-lg" autoFocus required type="text" onChange = {e => updateFields({name: e.target.value})} />
//       <label className="font-sans">Age</label>
//       <input className="border-2 rounded-lg" required min={1} type="number"  onChange = {e => updateFields({age: e.target.value})}/>
//       <label className="font-sans">Email</label>
//       <input className="border-2 rounded-lg" autoFocus required type="email" onChange = {e => updateFields({email: e.target.value})}/>

//     </FormWrapper>
//   );
// }
