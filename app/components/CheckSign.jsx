import { useRouter } from "next/navigation";

export function CheckSign(props) {
  const router = useRouter();
  return (
    <div>
      {props.sign ? (
        <button
          onClick={() => {
            router.push("/account");
          }}
          className="absolute top-[8px] right-[16px] text-[25px] flex h-[50px] w-[100px] justify-center backdrop-blur-lg rounded-lg bg-[transparent] items-center hover:bg-[#696969] transition-all duration-300 border-[white] border-2"
        >
          {props.sign}
        </button>
      ) : (
        <button
          onClick={() => {
            router.push("/login");
          }}
          className="absolute top-[8px] right-[16px] text-[25px] flex h-[50px] w-[100px] justify-center backdrop-blur-lg rounded-lg bg-[transparent] items-center hover:bg-[#696969] transition-all duration-300 border-[white] border-2"
        >
          login
        </button>
      )}
    </div>
  );
}
