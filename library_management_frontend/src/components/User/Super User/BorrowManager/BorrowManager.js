import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authHeader } from "../../../../Services/AuthService";
import { Table ,Alert ,Spin ,Button , Space } from 'antd';
const BorrowManager=()=> {
  const [borrowRequests, setBorrowRequests] = useState();
  const [changes, setChanges] = useState(false);
  

  const handleRejectRequest = (requestId) => {
      axios({
        method: "put",
        url: `https://localhost:5001/api/borrow/reject/${requestId}`,
        headers: authHeader(),
      })
        .then(() => {
          setChanges(!changes);
        })
        .catch((err) => console.log(err));
  };

  const handleApproveRequest = (requestId) => {
      axios({
        method: "put",
        url: `https://localhost:5001/api/borrow/approve/${requestId}`,
        headers: authHeader(),
      })
        .then(() => {
          setChanges(!changes);
        })
        .catch((err) => console.log(err));
  };

  useEffect(() => {
      axios({
        method: "get",
        url: "https://localhost:5001/api/borrow",
        headers: authHeader(),
      })
        .then((res) => {
          console.log(res.data);
          setBorrowRequests(res.data);
        })
        .catch((err) => console.log(err));
  }, [changes]);
  const columns = [
    {
        title: "borrowRequestId",
        dataIndex: "borrowRequestId",
        key: "borrowRequestId",
      },
      {
        title: "userId",
        dataIndex: "userId",
        key: "userId",
      },
      {
        title: "borrowFromDate",
        dataIndex: "borrowFromDate",
        key: "borrowFromDate",
      },
      {
        title: "status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Action",
        dataIndex: "Action",
        key: "Action",
        render: (text, record) => (
          <Space size="middle">
            <Button type="primary" >
              <a href={`/admin/detailBorrow/${record.borrowRequestId}`}>View Detail</a>
          </Button>
            <Button disabled={record.status === 2 && true} type="primary" danger onClick={()=> handleRejectRequest(record.borrowRequestId)}>
            Reject
            </Button>
            <Button disabled={record.status === 1 && true} type="primary"  onClick={()=> handleApproveRequest(record.borrowRequestId)}>
            Approve
            </Button>
          </Space>
        ),
      },   
  ];
  return (
    <Table dataSource={borrowRequests} columns={columns}/>
  );
}

export default BorrowManager;
