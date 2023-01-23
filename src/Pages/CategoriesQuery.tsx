import { Category } from "../Models/categories/CategoriesModel";
import { useQuery } from "react-query";
import { CategoryService } from "../Services/categoryService/categoryService";
import Load from "../Components/Loading";

function CategoriesQuery() {
  let categoryService = new CategoryService();
  const { data, isLoading } = useQuery<Category[]>("categories", async () => {
    return categoryService.getAll().then((res) => {
      return res.data;
    });
  });

  return (
    <>
      {isLoading ? (
        <Load />
      ) : data ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>Categories list is empty</h1>
      )}
    </>
  );
}

export default CategoriesQuery;
