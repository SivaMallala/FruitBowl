// src/app/api/customers/[id]/delivered/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Customer from "@/model/Customer";

export async function PUT(request, context) {
  await dbConnect();
  const { id } = await context.params; // ✅ No need to await context.params

  try {
    const customer = await Customer.findOne({ cusid: id });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }
    const now = new Date();
    const istNow = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    const year = istNow.getFullYear();
    const month = String(istNow.getMonth() + 1).padStart(2, "0");
    const date = String(istNow.getDate()).padStart(2, "0");

    let hours = istNow.getHours();
    const minutes = String(istNow.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12

    const formatted = `${year}-${month}-${date} ${String(hours).padStart(
      2,
      "0"
    )}:${minutes} ${ampm}`;

  

    if (!Array.isArray(customer.deliveryDates)) {
      customer.deliveryDates = [];
    }

    const isTodayDelivered = customer.deliveryDates.some((dateStr) =>
      dateStr.startsWith(`${yyyy}-${mm}-${dd}`)
    );
    if (!isTodayDelivered) {
      if (customer.bowlCount > 0) customer.bowlCount -= 1;
     
customer.deliveryDates.unshift(formatted);
customer.markModified('deliveryDates');
      customer.lastDelivered = formatted;
      await customer.save();
    }

    return NextResponse.json({ message: "Delivery updated", customer });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
