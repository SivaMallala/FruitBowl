import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/model/Customer';

export async function GET(request, context) {
  await dbConnect();
  
  const { id } = await context.params;

  try {
   const customer = await Customer.findOne({ cusid: id });
   console.log(customer)

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json({ customer });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching customer' }, { status: 500 });
  }
}
