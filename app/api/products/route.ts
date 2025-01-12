import { NextResponse } from 'next/server';
import { useInventoryStore } from '@/lib/stores/supplier-inventory-store';

export async function GET() {
  try {
    // Get products from the inventory store
    const { stockItems } = useInventoryStore.getState();
    
    // Map stock items to product format
    const products = stockItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.purchasePrice,
      quantity: item.quantity,
      store: item.store,
      isActive: item.isActive
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
