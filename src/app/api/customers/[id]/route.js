import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/model/Customer';

export async function GET(request, context) {
  await dbConnect();
  
  const { id } = await context.params;

  try {
   const customer = await Customer.findOne({ cusid: id });
   

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json({ customer });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching customer' }, { status: 500 });
  }
}


export async function PUT(request, { params }) {
  await dbConnect();
   const { id } = await params;
  try {
    const body = await request.json();
const updatedCustomer = await Customer.findOneAndUpdate(
      { cusid: id },
      {
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
      },
      { new: true } // return the updated document
    );

    if (!updatedCustomer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Customer updated', data: updatedCustomer }, { status: 200 });
  } catch (error) {
    console.error('Customer update error:', error);
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 400 });
  }
}
