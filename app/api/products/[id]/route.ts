import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const deleted = await Product.findByIdAndDelete(params.id);

    if (!deleted) {
      return Response.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Product deleted" }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    return Response.json(
      { success: false, error: "Unknown error" },
      { status: 500 }
    );
  }
}
