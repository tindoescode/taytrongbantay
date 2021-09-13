import Title from "../../components/Title";
import ContentWrapper from "../../components/ContentWrapper";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import Item from "../../components/Item";
import Form from "../../components/Form";
import Router from "next/router";
import { useEffect, useState } from "react";
import { createNewCategory, fetchCategory } from "../../lib/admin";
import axios from "axios";
import Link from "next/link";
import Modal from "../../components/Modal";
import FacebookLoading from "../../components/FacebookLoading";
import tw, { styled } from "twin.macro";
import { toast } from "react-toastify";
const AdminPanel = () => {
  // Creating Model
  const [categories, setCat] = useState([]);

  // Edit model
  const [editModal, setEditModal] = useState(false);
  const [targetCat, setTargetCat] = useState();

  useEffect(() => {
    axios.get("/api/user/get_login_session").then((res) => {
      if (!res.data.isLoggedIn || res.data?.admin != "admin") {
        Router.push("/");
      }
    });

    fetchCategory(setCat);
  }, []);

  const toggleEditModal = (e) => {
    setTargetCat({ ...categories[e?.target?.dataset?.category] });
    console.log(targetCat);
    setEditModal(!editModal);
  };

  const editTargetCategory =
    () =>
    ({ id, name, slug, description }) => {
      console.log(id, name, slug, description);

      axios
        .put("/api/category/edit", { id, name, slug, description })
        .then((response) => {
          if (!response.data.error?.message) {
            toast.success("Chỉnh sửa bài viết thành công");
            toggleEditModal();
            setCat([]);
            Router.push("/admin");
          } else {
            toast.error(response.data.error?.message);
          }
        });
    };

  return (
    <div className="AdminPanel" tw="md:(grid grid-cols-6 gap-3)">
      {editModal && (
        <Modal
          title="Edit Category"
          onCancel={{ f: toggleEditModal }}
          noSubmitButton
        >
          <Form
            defaultValues={{
              id: targetCat._id,
              name: targetCat.name,
              slug: targetCat.slug,
              description: targetCat.description,
            }}
            onSubmit={editTargetCategory(setCat)}
            tw="flex flex-col gap-1"
          >
            <Input type="hidden" name="id" />
            <label>Tên chuyên mục:</label>
            <Input placeholder="Thông báo" name="name" />
            <label>Slug (URL):</label>
            <Input name="slug" />
            <label>Mô tả:</label>
            <TextArea name="description" />
            <Button>Sửa</Button>
          </Form>
        </Modal>
      )}
      <div tw="col-span-2">
        <Title>Tạo chuyên mục</Title>
        <ContentWrapper>
          <Form onSubmit={createNewCategory(setCat)} tw="flex flex-col">
            <label>Tên chuyên mục:</label>
            <Input placeholder="Thông báo" name="name" />
            <label>Slug (URL):</label>
            <Input name="slug" />
            <label>Mô tả:</label>
            <TextArea name="description" />
            <Button>Tạo</Button>
          </Form>
        </ContentWrapper>
      </div>

      <div tw="col-span-2">
        <Title>Quản lý chuyên mục</Title>
        <ContentWrapper>
          {!categories && (
            <p tw="flex items-center justify-center text-lg">
              Loading... <FacebookLoading />
            </p>
          )}
          {categories &&
            categories.map((category, index) => (
              <Item key={category.slug}>
                <Link href={`/category/${category.slug}`}>
                  <a>
                    {category.name} ({category.slug})
                  </a>
                </Link>
                &nbsp;
                <a
                  onClick={toggleEditModal}
                  data-category={index}
                  data-action="edit"
                  tw="font-bold hover:cursor-pointer"
                >
                  [Sửa]
                </a>
              </Item>
            ))}
        </ContentWrapper>
      </div>

      {/* <Modal /> */}
    </div>
  );
};

export default AdminPanel;
