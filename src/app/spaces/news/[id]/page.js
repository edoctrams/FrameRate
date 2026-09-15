import ContentDetail from "../../../../components/ContentDetail";
import { getSpacesItem } from "../../../../lib/spaces";

export default async function SpacesNewsItemPage({ params }) {
  const { id } = await params;

  return <ContentDetail type="news" id={id} initialItem={getSpacesItem("news", id)} />;
}