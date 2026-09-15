import { redirect } from "next/navigation";

export default async function LegacyDiscussionPage({ params }) {
  const { id } = await params;
  redirect(`/spaces/discussions/${id}`);
}