import DiscussionDetail from "../../../../components/DiscussionDetail";
import { getSpacesItem } from "../../../../lib/spaces";

export default async function SpacesDiscussionPage({ params }) {
  const { id } = await params;

  return (
    <DiscussionDetail id={id} initialItem={getSpacesItem("discussion", id)} />
  );
}