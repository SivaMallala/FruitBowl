import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCustomer from "./addcustomer/page";
import ViewCustomers from "./viewcustomer/page";

export default function Home() {
  return (
    <div className="text-center mt-12">
      <h1 className="text-4xl font-bold text-green-700">
        Welcome to Fruit Bowl 🍉
      </h1>
      <div className="border border-black p-5 flex flex-col m-5">
        <Dialog>
          <DialogTrigger className="bg-green-700 w-fit text-white p-2 rounded-2xl font-bold">
            Add Customer
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl mb-2">
                Add New Customer
              </DialogTitle>
            </DialogHeader>
            <AddCustomer />
          </DialogContent>
        </Dialog>
        <ViewCustomers />
      </div>
    </div>
  );
}
