import ContentDetail from "../../../../components/ContentDetail";
import { getSpacesItem } from "../../../../lib/spaces";

export default async function SpacesTrailerPage({ params }) {
  const { id } = await params;

  return <ContentDetail type="trailer" id={id} initialItem={getSpacesItem("trailer", id)} />;
}