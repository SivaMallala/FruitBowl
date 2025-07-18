'use client';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';

export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
     <div className="w-full mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Customer List</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : customers.length === 0 ? (
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
    {customers.map((cus) => (
      <TableRow key={cus._id} className="hover:bg-gray-50">
        <TableCell className="border border-gray-300">{cus.cusid}</TableCell>
        <TableCell className="border border-gray-300 ">
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
