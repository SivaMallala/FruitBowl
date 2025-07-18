"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DeliveryDates from "@/components/DeliveryDates";

export default function CustomerDetail() {
  const params = useParams();
  const id = params.id;

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [loadingb, setLoadingb] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`/api/customers/${id}`);
        const data = await res.json();
        setCustomer(data.customer);
      } catch (err) {
        console.error("Error fetching customer", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCustomer();
  }, [id]);

  const handleDelivered = async () => {
    setLoadingb(true);
    try {
      const res = await fetch(`/api/customers/${customer.cusid}/delivered`, {
        method: "PUT",
      });

      const data = await res.json();

      if (res.ok) {
        toast("Delivery updated!");
        router.refresh(); // or manually update state
      } else {
        toast(data.error || "Failed to update");
      }
    } catch (err) {
      toast("Something went wrong");
    } finally {
      setLoadingb(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!customer) return <p className="text-center">Customer not found</p>;

  return (
    <div className="max-w-3xl flex justify-around  mx-auto px-4 py-8">
      <Button
        variant="outline"
        onClick={handleDelivered}
        className="bg-green-600 text-white px-4 py-2 rounded-md"
        disabled={loadingb}
      >
        {loadingb ? "Updating..." : "Delivered Today"}
      </Button>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold mb-6">Customer Details</h1>
        <p>
          <strong>ID:</strong> {customer.cusid}
        </p>
        <p>
          <strong>Name:</strong> {customer.name}
        </p>
        <p>
          <strong>Last Delivered:</strong> {customer.lastDelivered}
        </p>
        <p>
          <strong>Phone:</strong> {customer.phoneNumber}
        </p>
        <p>
          <strong>Address:</strong> {customer.address}
        </p>
        <p>
          <strong>Plan:</strong> {customer.planName}
        </p>
        <p>
          <strong>No. Bowls Remain:</strong> {customer.bowlCount}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(customer.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Delivery Time:</strong> {customer.dTime}
        </p>
        <p>
          <strong>Subscription Status:</strong> {customer.SubStatus}
        </p>
        <p>
          <strong>Duration:</strong> {customer.duration}
        </p>
        <p>
          <strong>Payment Status:</strong> {customer.paymentStatus}
        </p>
        <p>
          <strong>Order Status:</strong> {customer.orderStatus}
        </p>
        <p>
          <strong>Note:</strong> {customer.note || "--"}
        </p>
        <p>
          <strong>Total Bowl count:</strong> {customer.deliveryDates.length}
        </p>
      </div>

    <DeliveryDates deliveryDates={customer.deliveryDates || []} />




    </div>
  );
}
