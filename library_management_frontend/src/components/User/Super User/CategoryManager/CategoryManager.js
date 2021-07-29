import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Space, Button } from "antd";
import { authHeader } from "../../../../Services/AuthService";
const CategoryManager = () => {
  const [category, setCategory] = useState([]);
  const [loading, setloading] = useState(true);
  const [changes, setChanges] = useState(false);

const deleteCategory = categoryId =>{
  axios({
    method: "delete",
    url: `https://localhost:5001/api/category/${categoryId}`,
    headers: authHeader(),
  })
    .then(() => {
      setChanges(!changes)
    })
    .catch((err) => console.log(err));
 }
const handleDelete = (categoryId) => {
  if (window.confirm("Are you sure to delete this category?")) {
    deleteCategory(categoryId);
  }
}

  useEffect(() => {
    axios({
      method: "get",
      url: "https://localhost:5001/api/category",
      headers: authHeader(),
    })
      .then((response) => {
        setCategory(response.data);
        setloading(false);
        //setIsLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, [changes]);
  const columns = [
    {
      title: "categoryId",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "categoryName",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" >
          <a href={`/admin/detailCategory/${record.categoryId}`}>View Detail</a>
          </Button>
          <Button type="primary" danger onClick={()=> handleDelete(record.categoryId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div>
        <Button><Link to="/admin/addCategory">Add Category</Link></Button>
      </div>
      <Table columns={columns} dataSource={category} />
    </div>
  );
};
export default CategoryManager;