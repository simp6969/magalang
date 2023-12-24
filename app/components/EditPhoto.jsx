import Image from "next/image";

export function EditPhoto(props) {
  return (
    <Image
      priority={true}
      alt="photo"
      width={140}
      height={140}
      src={props.src}
      sizes="100vh"
    />
  );
}
