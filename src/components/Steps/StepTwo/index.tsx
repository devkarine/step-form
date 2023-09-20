import React, { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Styled from "../../MultiStepForm/styles";
import * as Yup from "yup";
import { api } from "../../../service/api";
import { FormData, StepProps } from "../../MultiStepForm";
import { IResponse } from "../StepOne";
import { Button, InputContainer, Label, Subtitle } from "../../MultiStepForm/styles";

interface ITech extends IResponse {
  name: string;
}

interface IAbility extends IResponse {
  name: string;
  role: string;
  description: string;
}

interface ISoftSkills extends IResponse {
  name: string;
}

export const StepTwo: React.FC<StepProps> = ({ next, prev, data }) => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [techs, setTechs] = useState<ITech[] | undefined>();
  const [abilities, setAbilities] = useState<IAbility[] | undefined>();
  const [softSkills, setSoftSkills] = useState<ISoftSkills[] | undefined>();

  const dataSchema = Yup.object().shape({
    tech_ids: Yup.array()
      .required("Selecione pelo menos uma tecnologia.")
      .min(1, "Selecione pelo menos uma tecnologia."),
    ability_ids: Yup.array()
      .required("Selecione pelo menos uma habilidade.")
      .min(3, "Selecione pelo menos três habilidades."),
    softskill_ids: Yup.array()
      .required("Selecione pelo menos uma softskill.")
      .min(3, "Selecione pelo menos três softskills."),
  });

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const response = await api.get("/techs");
        setTechs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAbilities = async () => {
      try {
        const response = await api.get("/abilities", {
          params: { role: selectedRole },
        });
        setAbilities(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSoftSkills = async () => {
      try {
        const response = await api.get("/softskills");
        setSoftSkills(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTechs();
    fetchAbilities();
    fetchSoftSkills();
  }, [selectedRole]);

  const handleSubmit = (
    values: FormData,
    { setSubmitting }: FormikHelpers<FormData>
  ) => {
    next(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={dataSchema}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <InputContainer>
            <Label htmlFor="role">Selecione uma Função:</Label>
            <Field
              as="select"
              name="role"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedRole(e.target.value);
                setFieldValue("role", e.target.value);
              }}
            >
              <option value="" disabled>
                Selecione uma Função
              </option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
              <option value="mobile">Mobile</option>
              <option value="designer">Designer</option>
              <option value="qa">QA</option>
            </Field>
            <br />
            <ErrorMessage name="role" />
          </InputContainer>
          <br />

          <InputContainer>
            <Label htmlFor="tech_ids">Selecione uma Tecnologia:</Label>
            <Field
              as="select"
              name="tech_ids"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFieldValue("tech_ids", [e.target.value])
              }
              disabled={!techs}
            >
              <option value="" disabled>
                Selecione uma tecnologia
              </option>
              {techs
                ? techs.map((tech: ITech) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.name}
                    </option>
                  ))
                : null}
            </Field>
            <br />
            <ErrorMessage name="tech_ids" />
          </InputContainer>

          <Styled.CheckboxField>
          
            <br />
            <Subtitle>Escolha pelo menos 3 habilidades</Subtitle>
            
            <br />
            <Styled.CheckboxContent>
              {abilities?.map((ability) => (
                <InputContainer key={ability.id}>
                  <Field
                    type="checkbox"
                    name="ability_ids"
                    value={String(ability.id)}
                    checked={values.ability_ids.includes(ability.id)}
                    onChange={(e) => {
                      const skillId = ability.id;
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        setFieldValue("ability_ids", [
                          ...values.ability_ids,
                          skillId,
                        ]);
                      } else {
                        setFieldValue(
                          "ability_ids",
                          values.ability_ids.filter((id) => id !== skillId)
                        );
                      }
                    }}
                  />
                  {ability.name}
                </InputContainer>
              ))}
              
              <br />
              <ErrorMessage name="ability_ids" />
            </Styled.CheckboxContent>
          </Styled.CheckboxField>

          <Styled.CheckboxField>
            
            <br />
            <Subtitle>Escolha pelo menos 3 Softskills</Subtitle>
            
            <br />
            <Styled.CheckboxContent>
              {softSkills?.map((skill) => (
                <InputContainer key={skill.id}>
                  <Field
                    type="checkbox"
                    name="softskill_ids"
                    value={String(skill.id)}
                    checked={values.softskill_ids.includes(skill.id)}
                    onChange={(e) => {
                      const skillId = skill.id;
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        setFieldValue("softskill_ids", [
                          ...values.softskill_ids,
                          skillId,
                        ]);
                      } else {
                        setFieldValue(
                          "softskill_ids",
                          values.softskill_ids.filter((id) => id !== skillId)
                        );
                      }
                    }}
                  />
                  {skill.name}
                </InputContainer>
              ))}
              <br />
              <ErrorMessage name="softskill_ids" />
            </Styled.CheckboxContent>
          </Styled.CheckboxField>

          <br />

          <Button type="button" onClick={() => prev && prev(data)}>
            Voltar
          </Button>
          <br />
          <Button type="submit">Próximo</Button>
        </Form>
      )}
    </Formik>
  );
};
