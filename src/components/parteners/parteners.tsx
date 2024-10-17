'use client';

import React from 'react';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
} from 'react-table';
import Button from '@/components/ui/button';
import Scrollbar from '@/components/ui/scrollbar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LongArrowLeft } from '@/components/icons/long-arrow-left';
import { LinkIcon } from '@/components/icons/link-icon';

interface TransactionData {
  id: number;
  filters: string;
  type: string;
  date: string;
  idDetail: string;
  program: string;
  level: string;
  wallet: string;
  busdProfit: string;
  description: string;
}

const transactions: TransactionData[] = [
  {
    id: 1710397,
    filters: "Type",
    type: "Date",
    date: "ID",
    idDetail: "Program",
    program: "Level",
    level: "Wallet",
    wallet: "BUSD / BNB profit",
    busdProfit: "2024.07.09 04:05",
    description: "ID 1716829",
  },
  {
    id: 1716829,
    filters: "x3",
    type: "3",
    date: "0x0a724...c5eA7",
    idDetail: "20 BUSD",
    program: "2024.07.09 03:59",
    level: "x3",
    wallet: "3",
    busdProfit: "0xf6D47...fd85b",
    description: "upgrade",
  },
  {
    id: 1716829,
    filters: "x3",
    type: "2",
    date: "0x0a724...c5eA7",
    idDetail: "10 BUSD",
    program: "2024.07.08 13:32",
    level: "x4",
    wallet: "1",
    busdProfit: "0x0a724...c5eA7",
    description: "send to upline",
  },
  {
    id: 1755104,
    filters: "x4",
    type: "1",
    date: "0xcF76A...55175",
    idDetail: "recycle",
    program: "2024.07.05 18:25",
    level: "x3",
    wallet: "1",
    busdProfit: "5 BUSD",
    description: "2024.06.14 16:46",
  }
];

const COLUMNS = [
  {
    Header: 'ID',
    accessor: 'id',
    minWidth: 60,
    maxWidth: 80,
  },
  {
    Header: 'Filters',
    accessor: 'filters',
    minWidth: 60,
    maxWidth: 80,
  },
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Type</div>,
    accessor: 'type',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-right rtl:text-left">{value}</div>
    ),
    minWidth: 160,
    maxWidth: 220,
  },
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Date</div>,
    accessor: 'date',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-right rtl:text-left">{value}</div>
    ),
    minWidth: 80,
    maxWidth: 120,
  },
  {
    Header: () => <div className="hidden">ID Detail</div>,
    accessor: 'idDetail',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="hidden">{value}</div>
    ),
    minWidth: 100,
    maxWidth: 180,
  },
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Program</div>,
    accessor: 'program',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-end">
        {value}
      </div>
    ),
    minWidth: 220,
    maxWidth: 280,
  },
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Level</div>,
    accessor: 'level',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-end">
        {value}
      </div>
    ),
    minWidth: 220,
    maxWidth: 280,
  },
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Wallet</div>,
    accessor: 'wallet',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-end">
        {value}
      </div>
    ),
    minWidth: 220,
    maxWidth: 280,
  },
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">BUSD / BNB Profit</div>,
    accessor: 'busdProfit',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-end">
        {value}
      </div>
    ),
    minWidth: 220,
    maxWidth: 280,
  },
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Description</div>,
    accessor: 'description',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-end">
        {value}
      </div>
    ),
    minWidth: 220,
    maxWidth: 280,
  },
];

export default function Parteners() {
  const data = React.useMemo(() => transactions, []);
  const columns = React.useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  );

  const { pageIndex } = state;

  return (
    <div className="">
      <div className="rounded-tl-lg rounded-tr-lg bg-white px-4 pt-6 dark:bg-light-dark md:px-8 md:pt-8">
        <div className="flex flex-col items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 md:flex-row">
        <h2 className="mb-3 shrink-0 text-lg font-medium uppercase text-black dark:text-green sm:text-xl md:mb-0 md:text-2xl bg-grey-500 text-white p-2 rounded-lg shadow-lg">
  Partners
</h2>

        </div>
      </div>
      <div className="-mx-0.5 dark:[&_.os-scrollbar_.os-scrollbar-track_.os-scrollbar-handle:before]:!bg-white/50">
        <Scrollbar style={{ width: '100%' }} autoHide="never">
          <div className="px-0.5">
            <table
              {...getTableProps()}
              className="transaction-table w-full border-separate border-0"
            >
              <thead className="text-sm text-gray-500 dark:text-gray-300">
                {headerGroups.map((headerGroup, idx) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                    {headerGroup.headers.map((column, idx) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={idx}
                        className="group  bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8 dark:bg-light-dark md:px-4"
                      >
                        <div className="flex items-center">
                          {column.render('Header')}
                          {column.canResize && (
                            <div
                              {...column.getResizerProps()}
                              className={`resizer ${
                                column.isResizing ? 'isResizing' : ''
                              }`}
                            />
                          )}
                          <span className="ltr:ml-1 rtl:mr-1">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ChevronDown />
                              ) : (
                                <ChevronDown className="rotate-180" />
                              )
                            ) : (
                              <ChevronDown className="rotate-180 opacity-0 transition group-hover:opacity-50" />
                            )}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="text-xs font-medium text-gray-900 dark:text-white 3xl:text-sm"
              >
                {page.map((row, idx) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={idx}
                      className="mb-3 items-center rounded-lg bg-white uppercase shadow-card last:mb-0 dark:bg-light-dark"
                    >
                      {row.cells.map((cell, idx) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={idx}
                            className="px-2 py-4 tracking-[1px] ltr:first:pl-4 ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5"
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Scrollbar>
      </div>
      <div className="mt-3 flex items-center justify-center rounded-lg bg-white px-5 py-4 text-sm shadow-card dark:bg-light-dark lg:py-6">
        <div className="flex items-center gap-5">
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            title="Previous"
            shape="circle"
            variant="transparent"
            size="small"
            className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
          >
            <LongArrowLeft className="h-auto w-4 rtl:rotate-180" />
          </Button>
          <div>
            Page{' '}
            <strong className="font-semibold">
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </div>
          <Button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            title="Next"
            shape="circle"
            variant="transparent"
            size="small"
            className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
          >
            <LongArrowRight className="h-auto w-4 rtl:rotate-180 " />
          </Button>
        </div>
      </div>
    </div>
  );
}
