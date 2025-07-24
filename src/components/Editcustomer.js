'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

export default function EditCustomer({ customerData }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '', phoneNumber: '', address: '', planName: '', bowlCount: '',
    startDate: '', dTime: '', SubStatus: '', duration: '', paymentStatus: '',
    orderStatus: '', note: ''
  });

  useEffect(() => {
    if (customerData) {
      setForm({
        name: customerData.name || '',
        phoneNumber: customerData.phoneNumber || '',
        address: customerData.address || '',
        planName: customerData.planName || '',
        bowlCount: customerData.bowlCount || 0,
        startDate: customerData.startDate ? customerData.startDate.split('T')[0] : '',
        dTime: customerData.dTime || '',
        SubStatus: customerData.SubStatus || '',
        duration: customerData.duration || '',
        paymentStatus: customerData.paymentStatus || '',
        orderStatus: customerData.orderStatus || '',
        note: customerData.note || '',
      });
    }
  }, [customerData]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name.trim() === '') {
      toast.error('Name is required!');
      return;
    }

    const res = await fetch(`/api/customers/${customerData.cusid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, bowlCount: Number(form.bowlCount) }),
    });

    if (res.ok) {
      toast.success('Customer updated!');
      router.push('/'); 
    } else {
      toast.error('Failed to update');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
      
      <div>
        <label className="block mb-1 text-sm font-medium">Name</label>
        <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Phone Number</label>
        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Address</label>
        <input name="address" value={form.address} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Plan Name</label>
        <select name="planName" value={form.planName} onChange={handleChange} className="w-full p-2 border rounded text-sm">
          <option value="">Select Plan</option>
          <option value="Basic - 15 days @ 899">Basic - 15 days @ 899</option>
          <option value="Basic - 30 days @ 1599">Basic - 30 days @ 1599</option>
          <option value="Standard - 15 days @ 1199">Standard - 15 days @ 1199</option>
          <option value="Standard - 30 days @ 2099">Standard - 30 days @ 2099</option>
          <option value="Premium - 15 days @ 1499">Premium - 15 days @ 1499</option>
          <option value="Premium - 30 days @ 2699">Premium - 30 days @ 2699</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">No. Bowls Remain</label>
        <input name="bowlCount" type="number" value={form.bowlCount} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Start Date</label>
        <input name="startDate" type="date" value={form.startDate} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Delivery Time</label>
        <select name="dTime" value={form.dTime} onChange={handleChange} className="w-full p-2 border rounded text-sm">
          <option value="">Select Time</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Subscription Status</label>
        <select name="SubStatus" value={form.SubStatus} onChange={handleChange} className="w-full p-2 border rounded text-sm">
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Duration</label>
        <select name="duration" value={form.duration} onChange={handleChange} className="w-full p-2 border rounded text-sm">
          <option value="">Select Duration</option>
          <option value="Half-Month">Half-Month</option>
          <option value="1 Month">1 Month</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Payment Status</label>
        <select name="paymentStatus" value={form.paymentStatus} onChange={handleChange} className="w-full p-2 border rounded text-sm">
          <option value="">Select Payment</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Order Status</label>
        <select name="orderStatus" value={form.orderStatus} onChange={handleChange} className="w-full p-2 border rounded text-sm">
          <option value="">Select Order</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="col-span-full">
        <label className="block mb-1 text-sm font-medium">Note</label>
        <textarea name="note" value={form.note} onChange={handleChange} className="w-full p-2 border rounded text-sm" rows={2} />
      </div>

      <div className="col-span-full">
        <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Update Customer</Button>
      </div>
    </form>
  );
}
