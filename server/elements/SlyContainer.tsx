import { SlyResource } from "./SlyResource";

export function SlyContainer({ name }: { name: string }) {
  return SlyResource({ name, resourceType: "mysite/components/container" });
}