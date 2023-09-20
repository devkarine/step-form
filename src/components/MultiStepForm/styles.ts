
import { styled } from "styled-components";

export const CheckboxField = styled.div`
  margin-right: 10px;
  
`;

export const Label = styled.label`
  font-size: 16px;
  color: #004793 ;
  font-weight: bold;
  padding-right: 3px;
`
export const InputContainer = styled.div`
  color: red;
  font-size: 13px;
`
export const CheckboxContent = styled.div`
  
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
  font-size: 16px;
  color: #004793 ;
`;

export const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #f0f0f0; 
  padding: 10px;

  div {
    width: 25%; 
    height: 10px;
    background-color: #ccc;
  }

  div:nth-child(-n + ${(props) => props.currentStep}) {
    background-color: #d8cb13;
  }
`;

export const Button = styled.button`
  background-color: #ffc107;
  color: #fff; 
  border: none; 
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer; 
  transition: background-color 0.3s ease;
  margin: 2px 0;

  &:hover{
    background-color:#d8cb13;
  }
 


`
export const Subtitle =styled.span`
  font-size: 17px;
  padding-bottom: 5px;
`