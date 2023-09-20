import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { FormData, StepProps } from "../../MultiStepForm";
import { Button, Label } from "../../MultiStepForm/styles";

export const StepThree: React.FC<StepProps> = ({ next, prev, data }) => {
  const handleSubmit = (
    values: FormData,
    { setSubmitting }: FormikHelpers<FormData>
  ) => {
    next(values, true);
    setSubmitting(false);
  };

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <div>
            <label>Você possui experiência?</label>
            <Field as="select" name="hasExperience">
              <option value="não">Não</option>
              <option value="sim">Sim</option>
            </Field>
          </div>

          {values.hasExperience === "sim" && (
            <div>
              <h2>Experiência</h2>
              <br />
              {values.experiences_attributes.map((experience, index) => (
                <div key={index}>
                  <Label>Nome da empresa:</Label>
                  <Field
                    type="text"
                    name={`experiences_attributes[${index}].company_name`}
                  />
                  <br />
                  <ErrorMessage
                    name={`experiences_attributes[${index}].company_name`}
                  />
                  <br />
                  <Label>Período (Data de início):</Label>
                  <Field
                    type="date"
                    name={`experiences_attributes[${index}].start_date`}
                  />
                  <br />
                  <ErrorMessage
                    name={`experiences_attributes[${index}].start_date`}
                  />
                  <br />
                  <Label>Período (Data de fim):</Label>
                  <Field
                    type="date"
                    name={`experiences_attributes[${index}].end_date`}
                  />
                  <br />
                  <ErrorMessage
                    name={`experiences_attributes[${index}].end_date`}
                  />
                  <br />

                  <Label>Cargo:</Label>
                  <Field
                    type="text"
                    name={`experiences_attributes[${index}].title`}
                  />
                  <br />
                  <ErrorMessage
                    name={`experiences_attributes[${index}].title`}
                  />
                  <br />

                  <Label>Função:</Label>
                  <Field
                    type="text"
                    name={`experiences_attributes[${index}].function_performed`}
                  />
                  <br />
                  <ErrorMessage
                    name={`experiences_attributes[${index}].function_performed`}
                  />
                  <br />
                  <Label
                    htmlFor={`experiences_attributes[${index}].institution`}
                  >
                    Instituição:
                  </Label>
                  <Field
                    type="text"
                    name={`experiences_attributes[${index}].institution`}
                  />
                  <br />
                  <ErrorMessage
                    name={`experiences_attributes[${index}].institution`}
                  />
                  <br />
                  <Label>Período (Data de início):</Label>
                  <br />
                  <Field
                    type="date"
                    name={`experiences_attributes[${index}].start_date`}
                  />
                  <br />
                  <ErrorMessage
                    name={`experiences_attributes[${index}].start_date`}
                  />
                  <br />
                  <Label>Período (Data de fim):</Label>
                  <Field
                    type="date"
                    name={`experiences_attributes[${index}].end_date`}
                  />
                  <br />
                  <ErrorMessage
                    name={`experiences_attributes[${index}].end_date`}
                  />
                  <br />

                  <Label htmlFor={`experiences_attributes[${index}].link`}>
                    Link (opcional):
                  </Label>
                  <Field
                    type="text"
                    name={`experiences_attributes[${index}].link`}
                  />
                  <br />
                  <ErrorMessage
                    name={`experiences_attributes[${index}].link`}
                  />
                </div>
              ))}
              <br />
              <button
                type="button"
                onClick={() =>
                  setFieldValue("experiences_attributes", [
                    ...values.experiences_attributes,
                    {
                      title: "",
                      company_name: "",
                      start_date: "",
                      end_date: "",
                      function_performed: "",
                      institution: "",
                      link: "",
                    },
                  ])
                }
              >
                Adicionar Experiência
              </button>
              <br />
            </div>
          )}

          <br />
          <br />
          <Button type="button" onClick={() => prev && prev(data)}>
            Voltar
          </Button>
          <br />
          <Button type="submit" disabled={isSubmitting}>
            Salvar e baixar PDF
          </Button>
        </Form>
      )}
    </Formik>
  );
};
