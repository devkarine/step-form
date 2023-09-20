import { useState } from "react";
import { IResponse, StepOne } from "../Steps/StepOne";
import { StepTwo } from "../Steps/StepTwo";
import { StepThree } from "../Steps/StepThree";
import { api } from "../../service/api";
import { StepIndicator } from "./styles";


interface ISoftSkills extends IResponse {
  name: string;
}

interface IState extends IResponse {
  name: string;
  state_id: number;
}

interface IExperience {
  title: string;
  company_name: string;
  start_date: string;
  end_date?: string | null;
  function_performed: string;
  institution: string;
  link?: string | null;
}

export interface FormData {
  name: string;
  email: string;
  birthdate: string;
  phone: string;
  role: string;
  bio: string;
  links: string[];
  states: IState[];
  city_id: string;
  softskill_ids: ISoftSkills[];
  selectedSkills: number[];
  ability_ids: string[];
  tech_ids: string[];
  hasExperience: "sim" | "não";
  experiences_attributes: IExperience[];
}

export const MultiStepForm = () => {
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    birthdate: "",
    phone: "",
    role: "",
    bio: "",
    links: [],
    states: [],
    cities: [],
    tech_ids: [],
    softskill_ids: [],
    ability_ids: [],
    selectedSkills: [],
    hasExperience: "não",
    experiences_attributes: [
      {
        title: "",
        company_name: "",
        start_date: "",
        end_date: "",
        function_performed: "",
        institution: "",
        link: "",
      },
    ],
  });

  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = async (formData: FormData) => {
    try {
      const response = await api.post("/profiles", {
        profile: formData,
      });

      const pdfResponse = await api.get(
        `/profiles/${response.data.id}/download`
      );
      const blob = new Blob([pdfResponse.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "receipt.pdf");
      document.body.appendChild(link);
      link.click();

      console.log("response", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextStep = (newData: FormData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData: FormData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
    <StepThree next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];

  return(
    <div>
     
      <StepIndicator currentStep={currentStep + 1}>
        <div></div>
        <div></div>
        <div></div>
      </StepIndicator>
      {steps[currentStep]}
    </div>
  )
};

export interface StepProps {
  next: (values: FormData, final?: boolean) => void;
  prev?: (values: FormData) => void;
  data: FormData;
}
