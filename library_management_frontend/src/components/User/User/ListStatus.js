import { authHeader } from "../../../Services/AuthService";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table } from "antd";
import UserContext from "../../../Context/UserContext";

const ListStatus = () => {
  const [status, setStatus] = useState([]);
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    axios({
      method: "get",
      url: `https://localhost:5001/api/borrowBy/${currentUser.userId}`,
      headers: authHeader(),
    })
      .then((response) => {
        setStatus(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);
  const columns = [
    {
      title: "Borrow Date",
      dataIndex: "borrowFromDate",
      key: "borrowDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={status} />
    </div>
  );
};
export default ListStatus;