import Navbar from "../../../components/navbar";
import CollectionDetail from "../../../components/CollectionDetail";

export default async function CollectionPage({ params }) {
  const { id } = await params;

  return (
    <main className="fr-page">
      <Navbar />
      <CollectionDetail id={id} />
    </main>
  );
}
