import DeleteButton from "./deletebutton/page";
import EditButton from "./editbutton/page";
import PrintButton from "./printbutton/page";

export default function History() {
  return (
    <>
      <div className="overflow-x-auto">
        <div className="pt-4 relative mx-auto text-black container">
          <input
            className="border-2 border-gray-500 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none w-full md:w-1/4"
            type="search"
            name="search"
            placeholder="Search"
          />
          <button type="submit" className="absolute right-0 top-0"></button>
        </div>

        <div className="bg-white mx-auto container pt-4">
          <div className="border-x overflow-x-auto border-t">
            <table className="table-auto w-full ">
              <thead className="border-b">
                <tr className="bg-blue-400">
                  <th className="text-left p-4 font-medium">คำร้อง</th>
                  <th className="text-left p-4 font-medium">รหัสนักศึกษาผู้ยื่น</th>
                  <th className="text-left p-4 font-medium">วันที่</th>
                  <th className="text-left p-4 font-medium">สถานะ</th>
                  <th className="text-left p-4 font-medium">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">R.01 คำร้องทั่วไป</td>
                  <td className="p-4">62172110041-1</td>
                  <td className="p-4">20/1/2567</td>
                  <td className="p-4">กำลังดำเนินการ</td>
                  <td className="p-4">
                    <PrintButton /> <EditButton /> <DeleteButton />
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    R.11 คำร้องขอลงทะเบียนเรียนเทียบรายวิชา
                  </td>
                  <td className="p-4">62172110041-1</td>
                  <td className="p-4">20/1/2567</td>
                  <td className="p-4">สำเร็จ</td>
                  <td className="p-4">
                    <PrintButton /> <EditButton /> <DeleteButton />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
