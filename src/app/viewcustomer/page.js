'use client';
import { useEffect, useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';

export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('cusid'); // default sort by ID

  // Fetch Customer Data
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('/api/customers');
        const data = await res.json();
        setCustomers(data.customers || []);
      } catch (err) {
        console.error('Failed to fetch customers', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter and Sort Customers (memoized for performance)
  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers;

    // Filter by Search Term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(cus =>
        cus.name.toLowerCase().includes(lowerSearch) ||
        cus.address?.toLowerCase().includes(lowerSearch) ||
        cus.dTime?.toLowerCase().includes(lowerSearch)
      );
    }

    // Sort by Selected Field
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'cusid') {
        const numA = parseInt(a.cusid.replace(/\D/g, ''), 10);
        const numB = parseInt(b.cusid.replace(/\D/g, ''), 10);
        return numA - numB;
      }
      if (sortBy === 'dTime') return a.dTime.localeCompare(b.dTime);
      if (sortBy === 'planName') return a.planName.localeCompare(b.planName);
      return 0;
    });

    return filtered;
  }, [customers, searchTerm, sortBy]);

  return (
    <div className="w-full mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Customer List</h1>

      {/* Search & Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by Name, Address, Delivery Time..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="cusid">Sort by ID</option>
          <option value="dTime">Sort by Delivery Time</option>
          <option value="planName">Sort by Plan Name</option>
        </select>
      </div>

      {/* Table Display */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredAndSortedCustomers.length === 0 ? (
        <p className="text-center text-gray-600">No customers found.</p>
      ) : (
        <Table className="border border-gray-300 w-full text-sm">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="border border-gray-300">ID</TableHead>
              <TableHead className="border border-gray-300">Name</TableHead>
              <TableHead className="border border-gray-300">Phone</TableHead>
              <TableHead className="border border-gray-300">Plan</TableHead>
              <TableHead className="border border-gray-300">Bowl</TableHead>
              <TableHead className="border border-gray-300">Start Date</TableHead>
              <TableHead className="border border-gray-300">Delivery</TableHead>
              <TableHead className="border border-gray-300">Sub Status</TableHead>
              <TableHead className="border border-gray-300">Duration</TableHead>
              <TableHead className="border border-gray-300">Payment</TableHead>
              <TableHead className="border border-gray-300">Order</TableHead>
              <TableHead className="border border-gray-300">Note</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredAndSortedCustomers.map((cus) => (
              <TableRow key={cus._id} className="hover:bg-gray-50">
                <TableCell className="border border-gray-300">{cus.cusid}</TableCell>
                <TableCell className="border border-gray-300">
                  <Link href={`/${cus.cusid}`}>{cus.name}</Link>
                </TableCell>
                <TableCell className="border border-gray-300">{cus.phoneNumber}</TableCell>
                <TableCell className="border border-gray-300">{cus.planName}</TableCell>
                <TableCell className="border border-gray-300">{cus.bowlCount}</TableCell>
                <TableCell className="border border-gray-300">
                  {new Date(cus.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="border border-gray-300">{cus.dTime}</TableCell>
                <TableCell className="border border-gray-300">{cus.SubStatus}</TableCell>
                <TableCell className="border border-gray-300">{cus.duration}</TableCell>
                <TableCell className="border border-gray-300">{cus.paymentStatus}</TableCell>
                <TableCell className="border border-gray-300">{cus.orderStatus}</TableCell>
                <TableCell className="border overflow-scroll no-scrollbar border-gray-300">{cus.note || '--'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
