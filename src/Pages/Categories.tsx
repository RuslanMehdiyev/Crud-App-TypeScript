import { CategoryService } from "../Services/categoryService/categoryService";
import { useEffect, useState, useContext } from "react";
import { ResponseModel } from "../Models/core/ResponseModel";
import Loading from "../Components/Loading";
import { Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Category } from "../Models/categories/CategoriesModel";
import { crudContext } from "../context/crudContext";
import { useNavigate } from "react-router-dom";

function Categories() {
  const categoryService = new CategoryService();
  const [data, setData] = useState<ResponseModel[]>([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<boolean>(false);
  const [newData, setNewData] = useState<Category>({
    id: 0,
    name: "",
    description: "",
  });

  const { loggedIn } = useContext(crudContext);
  const navigate = useNavigate();

  useEffect(() => {
    categoryService.getAll().then((res) => {
      setData(res.data);
      setError(res.errorMessage);
    });
  }, []);

  if (error) {
    return (
      <>
        <h1 style={{ textAlign: "center", marginTop: "2rem" }}>{error}</h1>
      </>
    );
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setNewData({ ...newData, [name]: value });
  };

  const showModal = () => {
    if (!loggedIn) {
      alert("Please login before making changes");
      navigate("/login");
      return;
    }
    setOpen(true);
    setModalType(false);
    setNewData({ id: 0, name: "", description: "" });
  };

  const handleOk = (event: any) => {
    if (!newData.name.trim() || !newData.description.trim()) {
      alert("Please fill all inputs");
      return;
    }
    event.preventDefault();
    categoryService.add(newData).then(() => {
      categoryService.getAll().then((res) => {
        setData(res.data);
        toast.success("Item Added Successfully");
      });
    });
    setOpen(false);
    setNewData({ id: 0, name: "", description: "" });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!loggedIn) {
      alert("Please login before making changes");
      navigate("/login");
      return;
    }
    categoryService
      .delete(`/categories/${id}`)
      .then(() =>
        categoryService.getAll().then((res) => {
          setData(res.data);
          toast.error("Item Deleted Successfully");
        })
      )
      .catch((err) => toast.error(err.message));
  };

  const showModal2 = (item: any) => {
    if (!loggedIn) {
      alert("Please login before making changes");
      navigate("/login");
      return;
    }
    setOpen(true);
    setModalType(true);
    setNewData({ id: item.id, name: item.name, description: item.description });
  };

  const handleUpdate = (event: any) => {
    event.preventDefault();
    setOpen(false);
    categoryService
      .update(newData, `/categories/${newData.id}`)
      .then(() => {
        categoryService.getAll().then((res) => setData(res.data));
        toast.success("Item Updated Successfully");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <>
      <ToastContainer />
      {data.length ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Update</th>
              <th>Delete</th>
              <th>
                <button className="add" onClick={showModal}>
                  Add
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <button className="update" onClick={() => showModal2(item)}>
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Loading />
      )}
      <Modal
        title={modalType ? `Updating id:${newData.id}` : "New Category"}
        open={open}
        footer={""}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form
          onSubmit={modalType ? handleUpdate : handleOk}
          className="submitForm"
        >
          <label id="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInput}
            value={newData.name}
            required
          />
          <label id="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleInput}
            value={newData.description}
            required
          />
          <div>
            <button className="add">{modalType ? "Update" : "Add"}</button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Categories;
