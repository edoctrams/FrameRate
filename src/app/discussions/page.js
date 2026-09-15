import { redirect } from "next/navigation";

/* Discussions now live inside Spaces. Old links keep working. */
export default function LegacyDiscussionsPage() {
  redirect("/spaces/discussions");
}