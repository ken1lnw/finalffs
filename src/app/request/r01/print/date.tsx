import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);
dayjs.locale("th");


export default function DateConverter({ dateOriginal}:any ) {
    const formattedDate = dayjs(dateOriginal).format("DD MMMM BBBB");
    return formattedDate;
  }
