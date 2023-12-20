import axios from "axios";

axios
  .get("https://backend-one-lemon.vercel.app/user/photo/" + getCookie("sign"))
  .then((res) => {
    const filt = path.map((element) => {
      return res.data.filter((e) => e.orignalPath === element.path);
    });
    console.log(filt);
  });
