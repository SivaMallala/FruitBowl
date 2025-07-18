import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/model/Customer';

export async function GET() {
  await dbConnect();
  try {
    const customers = await Customer.find().sort({ startDate: -1 }); // Latest first
    console.log(customers);
    return NextResponse.json({ customers });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Failed to load customers' }, { status: 500 });
  }
}


export async function POST(request) {
  await dbConnect();
  
  try {
    const body = await request.json();

    // Parse bowlCount to Number just to ensure consistency
    const customer = new Customer({
      name: body.name,
      phoneNumber: body.phoneNumber,
      address: body.address,
      planName: body.planName,
      bowlCount: Number(body.bowlCount),
      startDate: body.startDate,
      dTime: body.dTime,
      SubStatus: body.SubStatus,
      duration: body.duration,
      paymentStatus: body.paymentStatus,
      orderStatus: body.orderStatus,
      note: body.note,
    });

    await customer.save();

    return NextResponse.json({ message: 'Customer saved', data: customer }, { status: 201 });
  } catch (error) {
    console.error('Customer save error:', error);
    return NextResponse.json({ error: 'Failed to save customer' }, { status: 400 });
  }
}
