import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useReadCategoryQuery,
} from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";

import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created`);
      }
    } catch (error) {
      console.error(error);
      toast.error("creating category failed, try again");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("updating category failed, try again");
    }
  };

  const handleDeleteCategory = async (e) => {
    try{
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is deleted`);
        setSelectedCategory(null);
        setModalVisible(false);
      }



    }catch(error){
      console.error(error);
      toast.error("deleting category failed, try again");
    }
  }

  return (
    <div className="ml-[1rem] md:ml-[10rem] flex flex-col md:flex-row">
      {/* AdminMenu */}
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="mx-auto items-center justify-center flex h-12">Manage Category</div>
        <CategoryForm 
        value={name}
        setValue={setName}
        handleSubmit={ handleCreateCategory}
        />
        <br />
        <br />
        <div className="flex flex-wrap space-x-2 gap-2">
          {categories?.map((category) => (
            <div key={category._id}>
              <button className='bg-pink-500 text-white py-2 px-4 space-x-2 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-pink-500 focud:ring-opcaity-50 gap-2'
              onClick={() => {
                {
                  setModalVisible(true)
                  setSelectedCategory(category);
                  setUpdatingName(category.name)
                }
              }}
              >
                {category.name}
                </button>
            </div>
          ))}
       
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm 
          value={updatingName}
          setValue={(value) => setUpdatingName(value)}
          handleSubmit={handleUpdateCategory}
          buttonText="update"
          handleDelete={handleDeleteCategory}
          />
          
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
