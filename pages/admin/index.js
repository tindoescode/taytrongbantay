import Title from "../../components/Title";
import ContentWrapper from "../../components/ContentWrapper";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Router from "next/router";
import { useEffect, useState } from "react";
import { createNewCategory, fetchCategory } from "../../lib/admin";
import axios from "axios";
import Link from "next/link";

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
        <Title style="pink">Tạo chuyên mục</Title>
        <ContentWrapper style="pink">
          <Form onSubmit={createNewCategory(setCat)} className="flex flex-col">
            <label>Tên chuyên mục:</label>
            <Input style="pink" placeholder="Thông báo" name="name" />
            <label>Slug (URL):</label>
            <Input style="pink" name="slug" />
            <label>Mô tả:</label>
            <TextArea style="pink" name="description" />
            <Button>Tạo</Button>
          </Form>
        </ContentWrapper>
      </div>

      <div className="col-span-2">
        <Title>Quản lý chuyên mục</Title>
        <ContentWrapper>
          {categories.map((category, index) => (
            <div key={category.slug}>
              <Link href={`/category/${category.slug}`}>
                <a>
                  {category.name} ({category.slug})
                </a>
              </Link>
              &nbsp;
              <a onClick={openModal} data-category={index} data-action="edit">
                [Sửa]
              </a>
            </div>
          ))}
        </ContentWrapper>
      </div>
    </div>
  );
};

export default AdminPanel;
