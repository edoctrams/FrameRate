import Navbar from "../../../components/navbar";
import DiscussionDetail from "../../../components/DiscussionDetail";

export default async function DiscussionPage({ params }) {
  const { id } = await params;

  return (
    <main className="fr-page">
      <Navbar />
      <DiscussionDetail id={id} />
    </main>
  );
}
