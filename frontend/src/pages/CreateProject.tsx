// src/pages/CreateProject.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import styled, { useTheme } from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../api/axios";

const FormContainer = styled.div`
  max-width: 600px;
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
  font-size: ${(props) => props.theme.typography.small.fontSize};
  color: ${(props) => props.theme.colors.neutral.text};
`;

const ErrorText = styled.div`
  color: ${(props) => props.theme.colors.feedback.error};
  margin-top: ${(props) => props.theme.spacing(0.5)};
`;

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const ProjectSchema = Yup.object().shape({
    name: Yup.string().required("Project name is required"),
    description: Yup.string().required("Description is required"),
  });

  return (
    <AppLayout>
      <h1>Create New Project</h1>
      <FormContainer>
        <Formik
          initialValues={{ name: "", description: "" }}
          validationSchema={ProjectSchema}
          onSubmit={async (values) => {
            try {
              await axiosInstance.post("/projects", values);
              navigate("/projects");
            } catch (err) {
              console.error("Failed to create project", err);
            }
          }}
        >
          {() => (
            <Form>
              <FormGroup>
                <Label htmlFor="name">Project Name</Label>
                <Field type="text" name="name" as={Input} id="name" />
                <ErrorMessage name="name" component={ErrorText} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Field
                  type="textarea"
                  name="description"
                  rows={4}
                  as={Input}
                  id="description"
                />
                <ErrorMessage name="description" component={ErrorText} />
              </FormGroup>
              <Button type="submit" primary space="projects" size="medium">
                Save Project
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </AppLayout>
  );
};

export default CreateProject;
