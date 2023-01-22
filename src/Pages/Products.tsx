import { ProductService } from "../Services/productsService/productService";
import { useEffect, useState, useContext } from "react";
import { ResponseModel } from "../Models/core/ResponseModel";
import Loading from "../Components/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "antd/es/modal";
import { Product } from "../Models/products/ProductsModel";
import { crudContext } from "../context/crudContext";
import { useNavigate } from "react-router-dom";

function Products() {
  const productService = new ProductService();
  const [data, setData] = useState<ResponseModel[]>([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<boolean>(false);
  const [newData, setNewData] = useState<Product>({
    id: 0,
    name: "",
    unitPrice: 0,
    supplierId: 0,
    unitsInStock: 0,
  });

  const { loggedIn } = useContext(crudContext);
  const navigate = useNavigate();

  useEffect(() => {
    productService.getAll().then((res) => {
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
      name: "",
      supplierId: 0,
      unitPrice: 0,
      unitsInStock: 0,
    });
  };

  const handleOk = (event: any) => {
    if (!newData.name.trim()) {
      alert("Please fill all inputs");
      return;
    }
    event.preventDefault();
    productService.add(newData).then(() => {
      productService.getAll().then((res) => {
        setData(res.data);
        toast.success("Item Added Successfully");
      });
    });
    setOpen(false);
    setNewData({
      id: 0,
      name: "",
      unitPrice: 0,
      supplierId: 0,
      unitsInStock: 0,
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
    productService
      .delete(`/products/${id}`)
      .then(() =>
        productService.getAll().then((res) => {
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
      name: item.name,
      supplierId: item.supplierId,
      unitPrice: item.unitPrice,
      unitsInStock: item.unitsInStock,
    });
  };

  const handleUpdate = (event: any) => {
    event.preventDefault();
    setOpen(false);
    productService
      .update(newData, `/products/${newData.id}`)
      .then(() => {
        productService.getAll().then((res) => setData(res.data));
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
              <th>Unit Price</th>
              <th>Supplier Id</th>
              <th>Units In Stock</th>
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
                <td>{item.unitPrice}</td>
                <td>{item.supplierId}</td>
                <td>{item.unitsInStock}</td>
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
        title={modalType ? `Updating id:${newData.id}` : "New Product"}
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
          <label id="unitPrice">Unit Price</label>
          <input
            type="text"
            id="unitPrice"
            name="unitPrice"
            onChange={handleInput}
            value={newData.unitPrice}
            required
          />
          <label id="supplierId">Supplier Id</label>
          <input
            type="text"
            id="supplierId"
            name="supplierId"
            onChange={handleInput}
            value={newData.supplierId}
            required
          />
          <label id="unitsInStock">Units in Stock</label>
          <input
            type="text"
            id="unitsInStock"
            name="unitsInStock"
            onChange={handleInput}
            value={newData.unitsInStock}
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

export default Products;
