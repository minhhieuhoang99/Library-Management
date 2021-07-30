import { authHeader } from "../../../Services/AuthService";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table ,Space } from "antd";
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
  const handleRequestStatus = (status) => {
    if (status === 0) {
      return (
        <td style={{ color: "orange", fontWeight: 600, width: 100 }}>
          Pending
        </td>
      );
    } else if (status === 1) {
      return (
        <td style={{ color: "green", fontWeight: 600, width: 100 }}>Aprrove</td>
      );
    } else {
      return (
        <td style={{ color: "red", fontWeight: 600, width: 100 }}>Reject</td>
      );
    }
  };
  const columns = [
    {
      title: "Borrow Date",
      dataIndex: "borrowFromDate",
      key: "borrowDate",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Space size="middle">{handleRequestStatus(record.status)}</Space>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={status} />
    </div>
  );
};
export default ListStatus;