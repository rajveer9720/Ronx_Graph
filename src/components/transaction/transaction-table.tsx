'use client';

import React, { useEffect, useState } from 'react';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
} from 'react-table';
import Button from '@/components/ui/button';
import Scrollbar from '@/components/ui/scrollbar';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LongArrowLeft } from '@/components/icons/long-arrow-left';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider';
import axios from 'axios';

const COLUMNS = [
  {
    Header: 'User ID',
    accessor: 'userId',
    minWidth: 60,
    maxWidth: 80,
  },
  {
    Header: 'Action',
    accessor: 'action',
    minWidth: 100,
    maxWidth: 150,
  },
  {
    Header: 'Matrix',
    accessor: 'matrix',
    minWidth: 60,
    maxWidth: 100,
  },
  {
    Header: 'Level',
    accessor: 'level',
    minWidth: 60,
    maxWidth: 80,
  },
  {
    Header: 'Timestamp',
    accessor: 'timestamp',
    minWidth: 160,
    maxWidth: 220,
    // Align timestamp to the left
    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <div className="text-left">{value}</div>
    ),
  },
];


const BSC_SCAN_API_KEY = "Y8CW8PKJNV15RH999SPQB83BHEPKHD3ANK";     // Replace with your BscScan API key
const BSC_ADDRESS = "0xf7f5dC128E57d1Def75A79AEeF89b5ED7dbE714C";  // Address to fetch transactions for

// Function to fetch transactions
const getTransactions = async () => {
  try {
    // BscScan API URL for fetching transactions
    const url = `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${BSC_ADDRESS}&startblock=0&endblock=99999999&sort=asc&apikey=${BSC_SCAN_API_KEY}`;

    // Fetch transaction data
    const response = await axios.get(url);

    if (response.data.status === "1") {
      const transactions = response.data.result;
      // console.log("Transaction List:", transactions);

      // Filter transactions with status "success"
      const successfulTransactions = transactions.filter(tx => tx.txreceipt_status === "1");

      // Example: Process each successful transaction as needed
      successfulTransactions.forEach((tx) => {
        // console.log(`Tx Hash: ${tx.hash}, From: ${tx.from}, To: ${tx.to}, Value: ${ethers.utils.formatEther(tx.value)} BNB`);
      });
      return successfulTransactions;
    } else {
      console.log("No transactions found or an error occurred:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

// Call the function
getTransactions();





export default function TransactionTable() {
  const { getPlatformRecentActivity } = useSmartContract();
  const [tableData, setTableData] = useState([]);
  const columns = React.useMemo(() => COLUMNS, []);

  // Fetch platform recent activity data
  useEffect(() => {
    const fetchPlatformActivity = async () => {
      try {
        const data = await getPlatformRecentActivity();
        if (data) {
          const activityLines = data.split("\n");

          const formattedActivities = activityLines
            .map((line: string) => {
              const regex =
                /User ID: (\d+) - Action: ([\w\s]+) - Matrix: (\d+) - Level: (\d+) - Timestamp: (\d+)/;
              const match = line.match(regex);

              if (match) {
                const [, userId, action, matrix, level, timestamp] = match;

                return {
                  userId,
                  action,
                  matrix,
                  level,
                  timestamp: new Date(parseInt(timestamp, 10) * 1000).toLocaleString(), // Convert to readable date
                };
              }
              return null;
            })
            .filter(Boolean);

          setTableData(formattedActivities);
        }
      } catch (error) {
        console.error('Error fetching platform activity:', error);
      }
    };

    fetchPlatformActivity();
  }, [getPlatformRecentActivity]);

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
      columns,
      data: tableData,
      initialState: { pageSize: 5 },
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  );

  const { pageIndex } = state;

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <div className="rounded-t-lg bg-white px-6 py-4 shadow-lg dark:bg-light-dark">
        <div className="flex justify-between items-center border-b border-gray-300 pb-3 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Platform Recent Activity
          </h2>
        </div>
      </div>
      <div className="my-6 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-light-dark">
        <Scrollbar style={{ width: '100%' }} autoHide="never">
          <div className="min-w-full">
            <table
              {...getTableProps()}
              className="table-auto w-full text-left border-separate border-spacing-0"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        key={column.id}
                        className="px-4 py-2 text-sm font-semibold"
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="text-gray-800 dark:text-gray-200">
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={row.id}>
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          key={cell.column.id}
                          className="px-4 py-3 text-sm"
                        >
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        </Scrollbar>
      </div>

      <div className="flex justify-center mt-4">
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          title="Previous"
          shape="circle"
          variant="transparent"
          size="small"
          className="mr-4 text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
        >
          <LongArrowLeft className="h-auto w-4 rtl:rotate-180" />
        </Button>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length}</strong>
        </div>
        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          title="Next"
          shape="circle"
          variant="transparent"
          size="small"
          className="ml-4 text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
        >
          <LongArrowRight className="h-auto w-4 rtl:rotate-180" />
        </Button>
      </div>
    </div>
  );
}
