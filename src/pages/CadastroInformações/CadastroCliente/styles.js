import styled from "styled-components";

export const FormClient = styled.form`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 2rem;
    margin-top: 2rem;
`

export const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
export const LabelField = styled.label`
    font-size: 15px;
`

export const FieldText = styled.input`
    padding: 0.7rem;
    max-width: 20rem;
    width: 20rem;
    outline: none;
    border-radius: 5px;
    border: 1px solid #D9D9D9;
`

export const FieldSelect = styled.select`
    padding: 0.5rem;
    max-width: 15rem;
    width: 15rem;
    outline: none;
    border-radius: 5px;
    border: 1px solid #D9D9D9;
`

export const ButtonNextSection = styled.button`
    background-color: #454B60;
    color: #fff;
    padding: 0.5rem 2rem;
    height: fit-content;
    position: absolute;
    bottom: 5%;
    right: 3%;
`