import {
  Avatar as AvatarShad,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
export function Avatar({ name }: { name: string }) {
  return (
    <AvatarShad style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }}>
      <AvatarFallback>{name?.toString().charAt(0).toUpperCase()}</AvatarFallback>
    </AvatarShad>
  );
}