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

const AdminPanel = () => {
  const [categories, setCat] = useState([]);

  useEffect(() => {
    axios.get("/api/user/getdata").then((res) => {
      if (!res.data.isLoggedIn || res.data?.admin != "admin") {
        Router.push("/");
      }
    });

    fetchCategory(setCat);
  }, []);

  const openModal = (e) => {
    console.log(e.target.dataset);
  };

  return (
    <div className="AdminPanel md:grid grid-cols-6">
      <div className="col-span-2">
        <Title>Tạo chuyên mục</Title>
        <ContentWrapper>
          <Form onSubmit={createNewCategory(setCat)} className="flex flex-col">
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

      <div className="col-span-2">
        <Title>Quản lý chuyên mục</Title>
        <ContentWrapper>
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
                  onClick={openModal}
                  data-category={index}
                  data-action="edit"
                  className="font-bold"
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
