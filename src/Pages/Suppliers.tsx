import { SupplierService } from "../Services/suppliersService/supplierService";
import { useEffect, useState, useContext } from "react";
import { ResponseModel } from "../Models/core/ResponseModel";
import Loading from "../Components/Loading";
import { Supplier } from "../Models/suppliers/SupplierModel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "antd/es/modal";
import { crudContext } from "../context/crudContext";
import { useNavigate } from "react-router-dom";

function Suppliers() {
  const suppliersService = new SupplierService();
  const [data, setData] = useState<ResponseModel[]>([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<boolean>(false);
  const [newData, setNewData] = useState<Supplier>({
    id: 0,
    companyName: "",
    contactName: "",
    contactTitle: "",
  });
  const { loggedIn } = useContext(crudContext);
  const navigate = useNavigate();

  useEffect(() => {
    suppliersService.getAll().then((res) => {
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
    setNewData({
      id: 0,
      companyName: "",
      contactName: "",
      contactTitle: "",
    });
  };

  const handleOk = (event: any) => {
    if (
      !newData.companyName.trim() ||
      !newData.contactName.trim() ||
      !newData.contactTitle.trim()
    ) {
      alert("Please fill all inputs");
      return;
    }
    event.preventDefault();
    suppliersService.add(newData).then(() => {
      suppliersService.getAll().then((res) => {
        setData(res.data);
        toast.success("Item Added Successfully");
      });
    });
    setOpen(false);
    setNewData({
      id: 0,
      companyName: "",
      contactName: "",
      contactTitle: "",
    });
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
    suppliersService
      .delete(`/suppliers/${id}`)
      .then(() =>
        suppliersService.getAll().then((res) => {
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
    setNewData({
      id: item.id,
      companyName: item.companyName,
      contactName: item.contactName,
      contactTitle: item.contactTitle,
    });
  };

  const handleUpdate = (event: any) => {
    event.preventDefault();
    setOpen(false);
    suppliersService
      .update(newData, `/suppliers/${newData.id}`)
      .then(() => {
        suppliersService.getAll().then((res) => setData(res.data));
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
              <th>Company Name</th>
              <th>Contact Name</th>
              <th>Contact Title</th>
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
              <tr key={item?.id}>
                <td>{item.id}</td>
                <td>{item.companyName}</td>
                <td>{item.contactName}</td>
                <td>{item.contactTitle}</td>
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
        title={modalType ? `Updating id:${newData.id}` : "New Supplier"}
        open={open}
        footer={""}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form
          onSubmit={modalType ? handleUpdate : handleOk}
          className="submitForm"
        >
          <label id="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            onChange={handleInput}
            value={newData.companyName}
            required
          />
          <label id="contactName">Contact Name</label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            onChange={handleInput}
            value={newData.contactName}
            required
          />
          <label id="contactTitle">Contact Title</label>
          <input
            type="text"
            id="contactTitle"
            name="contactTitle"
            onChange={handleInput}
            value={newData.contactTitle}
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

export default Suppliers;
