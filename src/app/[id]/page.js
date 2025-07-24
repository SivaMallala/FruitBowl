"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import DeliveryDates from "@/components/DeliveryDates";
import EditCustomer from "@/components/Editcustomer";

export default function CustomerDetail() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/customers/${customer.cusid}/delivered`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Customer deleted successfully!");
        router.push("/");
      } else {
        toast.error("Failed to delete customer");
      }
    } catch (error) {
      toast.error("An error occurred while deleting");
      console.error(error);
    }
  };

  const handleDelivered = async () => {
    setLoadingb(true);
    try {
      const res = await fetch(`/api/customers/${customer.cusid}/delivered`, {
        method: "PUT",
      });

      const data = await res.json();

      if (res.ok) {
        toast("Delivery updated!");
        window.location.reload();
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
      <div className=" flex flex-col gap-7">
        <Button
          variant="outline"
          onClick={handleDelivered}
          className="bg-green-600 text-white px-4 py-2 h-fit rounded-md"
          disabled={loadingb}
        >
          {loadingb ? "Updating..." : "Delivered Today"}
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            
             <Button
              className="bg-blue-700  text-white py-2 h-fit rounded-md "
              variant="outline"
            >
              Edit Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl mb-2">
                Edit Customer
              </DialogTitle>
              <EditCustomer customerData={JSON.parse(JSON.stringify(customer))} />
            </DialogHeader>
           
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="bg-red-700 text-white h-fit px-4 py-2 rounded-md"
              variant="outline"
            >
              Delete Customer
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                customer and remove data from servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

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
