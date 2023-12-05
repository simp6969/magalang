import Image from "next/image";

export function CardContainer(props) {
  return (
    <div className="card_container">
      {props.property.map((element, index) => {
        return (
          <div
            key={element?.id}
            className="cards"
            style={element?.clicked ? { transform: "rotateY(180deg)" } : {}}
            onClick={() =>
              props.handleCardClick(element.id, element.path, element.solved)
            }
          >
            {element?.clicked ? (
              <Image
                width={110}
                height={140}
                draggable={false}
                alt={index}
                src={element.path}
                className="rounded-[10px]"
              />
            ) : (
              <Image
                className="rounded-[10px]"
                width={110}
                height={140}
                draggable={false}
                alt={index}
                src="/images/blank.webp"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
