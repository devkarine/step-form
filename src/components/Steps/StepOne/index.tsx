import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { FormData, StepProps } from "../../MultiStepForm";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { api } from "../../../service/api";
import { Button, InputContainer, Label } from "../../MultiStepForm/styles";

export interface IResponse {
  id: number;
  created_at: string;
  updated_at: string;
}

interface IState extends IResponse {
  name: string;
  state_id: number;
}

interface ICity extends IResponse {
  name: string;
  acronym: string;
}

export const StepOne: React.FC<StepProps> = ({ next, data }) => {
  const [states, setStates] = useState<IState[] | undefined>();
  const [cities, setCities] = useState<ICity[] | undefined>();

  const dataSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Nome deve ter no mínimo 4 caracteres")
      .required("Nome é um campo obrigatório"),
    email: Yup.string()
      .test("email", "Formato de email inválido", (value) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value || "");
      })
      .required("Campo obrigatório"),
    birthdate: Yup.date()
      .max(new Date(), "A data de nascimento não pode estar no futuro")
      .required("A data de nascimento é obrigatória")
      .typeError("Por favor, insira uma data válida"),
    phone: Yup.string()
      .matches(
        /^\d{11}$/,
        "O número de telefone deve conter exatamente 10 dígitos"
      )
      .required("O número de telefone é obrigatório"),
    bio: Yup.string()
      .required("O campo de comentário é obrigatório")
      .min(50, "O comentário deve ter pelo menos 50 caracteres"),
    links: Yup.array().of(Yup.string().url("Insira um URL válido")),
    state: Yup.string().required("Selecione um estado"),
    city_id: Yup.string().required("Selecione uma cidade"),
  });

  const handleSubmit = (values: FormData) => {
    next(values);
  };

  useEffect(() => {
    const fetchState = async () => {
      try {
        const responseState = await api.get("/states");
        setStates(responseState.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchState();
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: FormikHelpers<FormData>["setFieldValue"]
  ) => {
    const selectedStateId = e.target.value;

    setFieldValue("state", selectedStateId);
    setFieldValue("city_id", "");

    const fetchCities = async () => {
      try {
        if (selectedStateId) {
          const response = await api.get(`/states/${selectedStateId}/cities`);
          setCities(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCities();
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={dataSchema}
    >
      {({ setFieldValue }) => (
        
        <Form>
          <InputContainer>
            <Label htmlFor="name">Nome:</Label>
            <Field type="text" name="name" placeholder="Digite seu nome" />
            <br />
            <ErrorMessage name="name" />
          </InputContainer>
          <br />
          <InputContainer>
            <Label htmlFor="email">Email:</Label>
            <Field type="email" name="email" placeholder="Digite seu email" />
            <br />
            <ErrorMessage name="email" />
          </InputContainer>
          <br />
          <InputContainer>
            <Label htmlFor="birthdate">Data de Nascimento:</Label>
            <Field
              type="date"
              name="birthdate"
              placeholder="Data de Nascimento"
            />
            <br />
            <ErrorMessage name="birthdate" />
          </InputContainer>
          <br />
          <InputContainer>
            <Label htmlFor="phone">Telefone:</Label>
            <Field type="text" name="phone" placeholder="Insira seu telefone" />
            <br />
            <ErrorMessage name="phone" />
          </InputContainer>
          <br />
          <InputContainer>
            <Label htmlFor="bio">Bio:</Label>
            <Field
              as="textarea"
              name="bio"
              placeholder="Digite sua bio"
              rows="4"
              cols="45"
            />
            <br />
            <ErrorMessage name="bio" />
          </InputContainer>
          <br />
          <InputContainer>
            <Label htmlFor="links">Links:</Label>
            <Field type="text" name="links" placeholder="Insira seus links" />
            <br />
            <ErrorMessage name="links" />
          </InputContainer>
          <br />
          <InputContainer>
            <Label htmlFor="state">Selecione um estado:</Label>
            <Field
              as="select"
              name="state"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onChange(e, setFieldValue)
              }
            >
              <option value="" disabled>
                Selecione um estado
              </option>
              {states
                ? states.map((state: IState) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))
                : null}
            </Field>
            <br />
            <ErrorMessage name="state" />
          </InputContainer>
          <br />
          <InputContainer>
            <Label htmlFor="city_id">Cidade:</Label>
            <Field as="select" name="city_id">
              <option value="" disabled>
                Selecione uma cidade
              </option>
              {cities
                ? cities.map((city: ICity) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))
                : null}
            </Field>
            <br />
            <ErrorMessage name="city_id" />
          </InputContainer>
          <br />
          <Button type="submit">Próximo</Button>
        </Form>
      )}
    </Formik>
  );
};
