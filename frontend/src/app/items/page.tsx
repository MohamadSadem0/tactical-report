import ItemsDashboard from "@/components/ItemsDashboard";

const ItemsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
        <ItemsDashboard />
      </main>
    </div>
  );
};

export default ItemsPage;
