import React from 'react';
import { useTable } from 'react-table';

type AttendeeTableProps = {
  attendees: Record<string, any>[] | undefined;
};
const capitalizeFirstLetter = (str: string): string =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const AttendeeTable: React.FC<AttendeeTableProps> = ({ attendees }) => {
  const sortedAttendees = React.useMemo(() => {
    if (!attendees) {
      return [];
    }

    // Sort the attendees array based on the submitTime key
    const sortedData = [...attendees].sort((a, b) => {
      const timeA = new Date(a.submitTime).getTime();
      const timeB = new Date(b.submitTime).getTime();
      return timeB - timeA;
    });

    return sortedData;
  }, [attendees]);

  const columns = React.useMemo(() => {
    const keys = Object.keys(sortedAttendees?.[0] || {});
    const orderedKeys = [
      'submitTime',
      'name',
      'email',
      ...keys
        .filter(
          (key) => key !== 'submitTime' && key !== 'name' && key !== 'email'
        )
        .sort()
    ];
    return orderedKeys.map((key) => ({
      Header: capitalizeFirstLetter(key),
      accessor: key,
      Cell: ({ value }: any) =>
        key === 'submitTime' ? new Date(value).toLocaleString() : value,
      ...(key !== 'key' && { key })
    }));
  }, [attendees]);

  const data = React.useMemo(
    () => sortedAttendees || [],
    [attendees, sortedAttendees]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data
    });
  return (
    <table {...getTableProps()} className="w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={headerGroup.id}
            className="bg-secondary"
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="border-2 px-4 py-2 text-left font-medium"
                key={column.id}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  className="border px-4 py-2"
                  key={cell.getCellProps().key}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AttendeeTable;
